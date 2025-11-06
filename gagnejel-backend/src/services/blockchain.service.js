// ============================================
// BLOCKCHAIN SERVICE - Interaction avec le Smart Contract
// ============================================

const { ethers } = require('ethers');

// ABI du contract GagneJelEscrow (simplifié)
const ESCROW_ABI = [
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function getBalance(address user) external view returns (uint256)",
  "function balances(address user) external view returns (uint256)",
  "function totalDeposits() external view returns (uint256)",
  "function platformFeePercent() external view returns (uint256)",
  "function minDeposit() external view returns (uint256)",
  "function maxDeposit() external view returns (uint256)",
  "function transferBetween(address from, address to, uint256 amount) external",
  "function batchTransfer(uint256 batchId, address[] calldata losers, address[] calldata winners, uint256[] calldata loserAmounts, uint256[] calldata winnerAmounts) external",
  "event Deposit(address indexed user, uint256 amount, uint256 newBalance, uint256 timestamp)",
  "event Withdrawal(address indexed user, uint256 amount, uint256 newBalance, uint256 timestamp)",
  "event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp)",
  "event BatchTransferCompleted(uint256 indexed batchId, uint256 totalLosers, uint256 totalWinners, uint256 totalAmount, uint256 platformFee, uint256 timestamp)"
];

class BlockchainService {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.escrowContract = null;
    this.initialized = false;
  }

  // Initialiser la connexion blockchain
  async initialize() {
    try {
      // Créer le provider
      this.provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC);
      
      // Créer le wallet
      this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      
      // Créer l'instance du contract
      this.escrowContract = new ethers.Contract(
        process.env.ESCROW_CONTRACT_ADDRESS,
        ESCROW_ABI,
        this.wallet
      );
      
      this.initialized = true;
      
      console.log('✅ Blockchain service initialized');
      console.log(`📍 Contract: ${process.env.ESCROW_CONTRACT_ADDRESS}`);
      console.log(`🔗 Network: Base Sepolia (${process.env.CHAIN_ID})`);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize blockchain service:', error);
      throw error;
    }
  }

  // Vérifier si le service est initialisé
  ensureInitialized() {
    if (!this.initialized) {
      throw new Error('Blockchain service not initialized. Call initialize() first.');
    }
  }

  // Obtenir la balance d'un utilisateur dans le contract
  async getUserBalance(userAddress) {
    this.ensureInitialized();
    
    try {
      const balance = await this.escrowContract.balances(userAddress);
      return ethers.formatUnits(balance, 6); // USDC has 6 decimals
    } catch (error) {
      console.error('Error getting user balance:', error);
      throw error;
    }
  }

  // Obtenir les infos du contract
  async getContractInfo() {
    this.ensureInitialized();
    
    try {
      const [totalDeposits, platformFee, minDeposit, maxDeposit] = await Promise.all([
        this.escrowContract.totalDeposits(),
        this.escrowContract.platformFeePercent(),
        this.escrowContract.minDeposit(),
        this.escrowContract.maxDeposit()
      ]);
      
      return {
        totalDeposits: ethers.formatUnits(totalDeposits, 6),
        platformFeePercent: platformFee.toString(),
        platformFeeReadable: `${Number(platformFee) / 100}%`,
        minDeposit: ethers.formatUnits(minDeposit, 6),
        maxDeposit: ethers.formatUnits(maxDeposit, 6)
      };
    } catch (error) {
      console.error('Error getting contract info:', error);
      throw error;
    }
  }

  // Transférer entre deux utilisateurs (backend only)
  async transferBetween(fromAddress, toAddress, amount) {
    this.ensureInitialized();
    
    try {
      // Convertir le montant en format USDC (6 decimals)
      const amountInWei = ethers.parseUnits(amount.toString(), 6);
      
      console.log(`💸 Transferring ${amount} USDC from ${fromAddress} to ${toAddress}`);
      
      // Envoyer la transaction
      const tx = await this.escrowContract.transferBetween(
        fromAddress,
        toAddress,
        amountInWei
      );
      
      console.log(`⏳ Transaction sent: ${tx.hash}`);
      
      // Attendre la confirmation
      const receipt = await tx.wait();
      
      console.log(`✅ Transaction confirmed in block ${receipt.blockNumber}`);
      
      return {
        success: true,
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        from: fromAddress,
        to: toAddress,
        amount: amount
      };
    } catch (error) {
      console.error('Error transferring between users:', error);
      throw error;
    }
  }

  // Distribution batch (pour résolution de paris)
  async batchTransfer(batchId, losers, winners, loserAmounts, winnerAmounts) {
    this.ensureInitialized();
    
    try {
      // Convertir les montants en format USDC
      const loserAmountsInWei = loserAmounts.map(amt => 
        ethers.parseUnits(amt.toString(), 6)
      );
      const winnerAmountsInWei = winnerAmounts.map(amt => 
        ethers.parseUnits(amt.toString(), 6)
      );
      
      console.log(`🎰 Batch transfer #${batchId}: ${losers.length} losers, ${winners.length} winners`);
      
      // Envoyer la transaction
      const tx = await this.escrowContract.batchTransfer(
        batchId,
        losers,
        winners,
        loserAmountsInWei,
        winnerAmountsInWei
      );
      
      console.log(`⏳ Transaction sent: ${tx.hash}`);
      
      // Attendre la confirmation
      const receipt = await tx.wait();
      
      console.log(`✅ Batch transfer confirmed in block ${receipt.blockNumber}`);
      
      return {
        success: true,
        batchId: batchId,
        transactionHash: tx.hash,
        blockNumber: receipt.blockNumber,
        losersCount: losers.length,
        winnersCount: winners.length
      };
    } catch (error) {
      console.error('Error in batch transfer:', error);
      throw error;
    }
  }

  // Écouter les events du contract
  listenToEvents() {
    this.ensureInitialized();
    
    // Event: Deposit
    this.escrowContract.on('Deposit', (user, amount, newBalance, timestamp, event) => {
      console.log('📥 Deposit event:', {
        user,
        amount: ethers.formatUnits(amount, 6),
        newBalance: ethers.formatUnits(newBalance, 6),
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        txHash: event.log.transactionHash
      });
    });
    
    // Event: Withdrawal
    this.escrowContract.on('Withdrawal', (user, amount, newBalance, timestamp, event) => {
      console.log('📤 Withdrawal event:', {
        user,
        amount: ethers.formatUnits(amount, 6),
        newBalance: ethers.formatUnits(newBalance, 6),
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        txHash: event.log.transactionHash
      });
    });
    
    // Event: BatchTransferCompleted
    this.escrowContract.on('BatchTransferCompleted', (batchId, totalLosers, totalWinners, totalAmount, platformFee, timestamp, event) => {
      console.log('🎰 Batch Transfer completed:', {
        batchId: batchId.toString(),
        totalLosers: totalLosers.toString(),
        totalWinners: totalWinners.toString(),
        totalAmount: ethers.formatUnits(totalAmount, 6),
        platformFee: ethers.formatUnits(platformFee, 6),
        timestamp: new Date(Number(timestamp) * 1000).toISOString(),
        txHash: event.log.transactionHash
      });
    });
    
    console.log('👂 Listening to smart contract events...');
  }
}

// Export singleton instance
const blockchainService = new BlockchainService();

module.exports = blockchainService;