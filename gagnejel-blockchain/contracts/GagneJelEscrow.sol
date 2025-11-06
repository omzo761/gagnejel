// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GagneJelEscrow
 * @author GagneJèl Team
 * @notice Smart Contract pour gérer les dépôts/retraits USDC de manière sécurisée
 * @dev Compatible avec OpenZeppelin 5.4.0
 * 
 * Architecture Hybrid Web2/Web3:
 * - Ce contract = Coffre-fort sécurisé pour l'USDC
 * - Backend Node.js = Logique métier (paris, groupes, matchmaking)
 * - Les utilisateurs déposent/retirent de l'USDC
 * - Le backend distribue les gains en appelant batchTransfer()
 */
contract GagneJelEscrow is ReentrancyGuard, Pausable, Ownable {
    
    // ============ STATE VARIABLES ============
    
    /// @notice Adresse du token USDC sur Base
    IERC20 public immutable usdc;
    
    /// @notice Balance de chaque utilisateur dans le contract
    mapping(address => uint256) public balances;
    
    /// @notice Total des fonds dans le contract
    uint256 public totalDeposits;
    
    /// @notice Frais de plateforme (5% = 500 basis points)
    uint256 public platformFeePercent = 500; // 5.00%
    uint256 public constant BASIS_POINTS = 10000;
    
    /// @notice Adresse pour collecter les frais
    address public feeCollector;
    
    /// @notice Montant minimum de dépôt (1 USDC)
    uint256 public minDeposit = 1 * 10**6; // USDC a 6 decimals
    
    /// @notice Montant maximum de dépôt pour la sécurité (10,000 USDC)
    uint256 public maxDeposit = 10000 * 10**6;
    
    // ============ EVENTS ============
    
    event Deposit(
        address indexed user, 
        uint256 amount, 
        uint256 newBalance,
        uint256 timestamp
    );
    
    event Withdrawal(
        address indexed user, 
        uint256 amount, 
        uint256 newBalance,
        uint256 timestamp
    );
    
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 amount,
        uint256 timestamp
    );
    
    event BatchTransferCompleted(
        uint256 indexed batchId,
        uint256 totalLosers,
        uint256 totalWinners,
        uint256 totalAmount,
        uint256 platformFee,
        uint256 timestamp
    );
    
    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event FeeCollectorUpdated(address oldCollector, address newCollector);
    event DepositLimitsUpdated(uint256 minDeposit, uint256 maxDeposit);
    
    // ============ ERRORS ============
    
    error InsufficientBalance(uint256 requested, uint256 available);
    error AmountTooLow(uint256 amount, uint256 minimum);
    error AmountTooHigh(uint256 amount, uint256 maximum);
    error InvalidAddress();
    error ArrayLengthMismatch();
    error TransferFailed();
    error InvalidFeePercent();
    
    // ============ CONSTRUCTOR ============
    
    /**
     * @notice Initialise le contract avec l'adresse USDC
     * @param _usdc Adresse du token USDC sur Base
     * @param _feeCollector Adresse qui recevra les frais de plateforme
     */
    constructor(address _usdc, address _feeCollector) Ownable(msg.sender) {
        if (_usdc == address(0) || _feeCollector == address(0)) {
            revert InvalidAddress();
        }
        
        usdc = IERC20(_usdc);
        feeCollector = _feeCollector;
    }
    
    // ============ USER FUNCTIONS ============
    
    /**
     * @notice Déposer de l'USDC dans le contract
     * @param amount Montant en USDC (avec 6 decimals)
     * @dev L'utilisateur doit d'abord approuver ce contract pour dépenser son USDC
     */
    function deposit(uint256 amount) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        if (amount < minDeposit) {
            revert AmountTooLow(amount, minDeposit);
        }
        if (amount > maxDeposit) {
            revert AmountTooHigh(amount, maxDeposit);
        }
        
        // Transfer USDC du user vers ce contract
        bool success = usdc.transferFrom(msg.sender, address(this), amount);
        if (!success) {
            revert TransferFailed();
        }
        
        // Mettre à jour les balances
        balances[msg.sender] += amount;
        totalDeposits += amount;
        
        emit Deposit(msg.sender, amount, balances[msg.sender], block.timestamp);
    }
    
    /**
     * @notice Retirer de l'USDC du contract
     * @param amount Montant à retirer
     */
    function withdraw(uint256 amount) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        if (balances[msg.sender] < amount) {
            revert InsufficientBalance(amount, balances[msg.sender]);
        }
        
        // Mettre à jour les balances
        balances[msg.sender] -= amount;
        totalDeposits -= amount;
        
        // Transfer USDC au user
        bool success = usdc.transfer(msg.sender, amount);
        if (!success) {
            revert TransferFailed();
        }
        
        emit Withdrawal(msg.sender, amount, balances[msg.sender], block.timestamp);
    }
    
    /**
     * @notice Obtenir la balance d'un utilisateur
     * @param user Adresse de l'utilisateur
     * @return Balance en USDC
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
    
    // ============ BACKEND FUNCTIONS (onlyOwner) ============
    
    /**
     * @notice Transférer des fonds entre deux utilisateurs
     * @dev Utilisé par le backend pour transférer les gains après résolution d'un pari
     * @param from Perdant du pari
     * @param to Gagnant du pari
     * @param amount Montant à transférer
     */
    function transferBetween(
        address from, 
        address to, 
        uint256 amount
    ) 
        external 
        onlyOwner 
        nonReentrant 
    {
        if (from == address(0) || to == address(0)) {
            revert InvalidAddress();
        }
        if (balances[from] < amount) {
            revert InsufficientBalance(amount, balances[from]);
        }
        
        balances[from] -= amount;
        balances[to] += amount;
        
        emit Transfer(from, to, amount, block.timestamp);
    }
    
    /**
     * @notice Distribution des gains d'un pari en une seule transaction (batch)
     * @dev Optimisé pour économiser du gas lors de la résolution de paris multiples
     * @param batchId ID unique du batch (pour le tracking)
     * @param losers Tableau des adresses perdantes
     * @param winners Tableau des adresses gagnantes
     * @param loserAmounts Montants perdus par chaque perdant
     * @param winnerAmounts Montants gagnés par chaque gagnant
     */
    function batchTransfer(
        uint256 batchId,
        address[] calldata losers,
        address[] calldata winners,
        uint256[] calldata loserAmounts,
        uint256[] calldata winnerAmounts
    ) 
        external 
        onlyOwner 
        nonReentrant 
    {
        // Vérifications
        if (losers.length != loserAmounts.length || 
            winners.length != winnerAmounts.length) {
            revert ArrayLengthMismatch();
        }
        
        uint256 totalLost = 0;
        uint256 totalWon = 0;
        
        // Retirer des perdants
        for (uint256 i = 0; i < losers.length; i++) {
            address loser = losers[i];
            uint256 loseAmount = loserAmounts[i];
            
            if (balances[loser] < loseAmount) {
                revert InsufficientBalance(loseAmount, balances[loser]);
            }
            
            balances[loser] -= loseAmount;
            totalLost += loseAmount;
        }
        
        // Calculer les frais de plateforme
        uint256 platformFee = (totalLost * platformFeePercent) / BASIS_POINTS;
        
        // Transférer les frais au fee collector
        balances[feeCollector] += platformFee;
        
        // Distribuer aux gagnants
        for (uint256 i = 0; i < winners.length; i++) {
            address winner = winners[i];
            uint256 winAmount = winnerAmounts[i];
            
            balances[winner] += winAmount;
            totalWon += winAmount;
        }
        
        emit BatchTransferCompleted(
            batchId,
            losers.length,
            winners.length,
            totalLost,
            platformFee,
            block.timestamp
        );
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    /**
     * @notice Mettre à jour les frais de plateforme
     * @param newFeePercent Nouveaux frais en basis points (500 = 5%)
     */
    function setPlatformFee(uint256 newFeePercent) external onlyOwner {
        if (newFeePercent > 1000) { // Max 10%
            revert InvalidFeePercent();
        }
        
        uint256 oldFee = platformFeePercent;
        platformFeePercent = newFeePercent;
        
        emit PlatformFeeUpdated(oldFee, newFeePercent);
    }
    
    /**
     * @notice Mettre à jour l'adresse du fee collector
     * @param newCollector Nouvelle adresse
     */
    function setFeeCollector(address newCollector) external onlyOwner {
        if (newCollector == address(0)) {
            revert InvalidAddress();
        }
        
        address oldCollector = feeCollector;
        feeCollector = newCollector;
        
        emit FeeCollectorUpdated(oldCollector, newCollector);
    }
    
    /**
     * @notice Mettre à jour les limites de dépôt
     * @param _minDeposit Nouveau minimum
     * @param _maxDeposit Nouveau maximum
     */
    function setDepositLimits(uint256 _minDeposit, uint256 _maxDeposit) 
        external 
        onlyOwner 
    {
        require(_minDeposit < _maxDeposit, "Invalid limits");
        
        minDeposit = _minDeposit;
        maxDeposit = _maxDeposit;
        
        emit DepositLimitsUpdated(_minDeposit, _maxDeposit);
    }
    
    /**
     * @notice Mettre en pause le contract (emergency)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Reprendre le contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Récupérer des tokens ERC20 envoyés par erreur
     * @param token Adresse du token à récupérer
     * @param amount Montant à récupérer
     */
    function recoverERC20(address token, uint256 amount) 
        external 
        onlyOwner 
    {
        require(token != address(usdc), "Cannot recover USDC");
        IERC20(token).transfer(owner(), amount);
    }
}
