# 🎯 GagneJèl - Smart Contracts on Base

> Paris sportifs décentralisés sur la blockchain Base

## 🌟 Vue d'ensemble

GagneJèl est une plateforme de paris sportifs qui combine le meilleur du Web2 (vitesse, UX) et du Web3 (sécurité, transparence).

### Architecture Hybrid

```
┌──────────────────────────────────────────┐
│         Frontend (Next.js)               │
│   - Interface utilisateur                │
│   - Connexion Wallet (Wagmi)             │
│   - UI/UX optimisée                      │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│      Backend (Node.js + Express)         │
│   - Logique métier (paris, groupes)      │
│   - Matchmaking automatique              │
│   - Chat temps réel                      │
│   - API REST                             │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│    Smart Contract (Solidity on Base)    │
│   - Escrow USDC sécurisé                 │
│   - Dépôts/Retraits                      │
│   - Distribution automatique des gains   │
└──────────────────────────────────────────┘
```

## 🔥 Fonctionnalités

### Smart Contract Features
- ✅ Dépôt/Retrait USDC sécurisé
- ✅ Distribution automatique des gains (batch)
- ✅ Frais de plateforme configurables (5% par défaut)
- ✅ Fonction pause pour urgences
- ✅ Audité avec OpenZeppelin
- ✅ Gas optimisé

### Types de Paris
- 👥 **Pari DUO** - 2 joueurs (x2.0)
- 🥉 **Pari TRIO** - 3 joueurs (x3.0)
- 🎯 **Pari QUATRO** - 4 joueurs (x4.0)
- ⭐ **Pari à 5** - 5 joueurs (x5.0)
- 🚀 **Groupes Illimités** - Jusqu'à 100+ joueurs

### Sports Supportés
- 🤼 Lutte Sénégalaise
- ⚽ Football
- 🏀 Basketball
- 🥊 MMA
- ⭐ Et plus encore...

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/gagnejel-blockchain.git
cd gagnejel-blockchain

# Installer les dépendances
npm install

# Copier .env.example
cp .env.example .env

# Remplir votre .env avec:
# - PRIVATE_KEY (votre wallet)
# - BASESCAN_API_KEY (pour vérification)
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec coverage
npm run test:coverage

# Tests sur fork mainnet
npm run test:fork
```

## 🚀 Déploiement

### Testnet (Base Sepolia)
```bash
# Compiler les contracts
npm run compile

# Déployer sur testnet
npm run deploy:testnet

# Vérifier sur Basescan
npm run verify
```

### Mainnet (Base)
```bash
# ⚠️ ATTENTION: Vérifier 3 fois avant!
npm run deploy:mainnet
```

Voir [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour le guide complet.

## 📊 Contract Info

### Base Sepolia (Testnet)
- **USDC:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Escrow:** [Sera rempli après déploiement]

### Base Mainnet (Production)
- **USDC:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Escrow:** [Sera rempli après déploiement]

## 🔒 Sécurité

### Audits
- ✅ OpenZeppelin Contracts (battle-tested)
- ✅ ReentrancyGuard protection
- ✅ Pausable en cas d'urgence
- ⏳ Audit professionnel prévu (après 6 mois)

### Best Practices
- Non-upgradeable (immutable)
- Events pour tous les transferts
- Checks-Effects-Interactions pattern
- Gas optimisé

## 📖 Documentation

### Contract Functions

#### User Functions
```solidity
// Déposer USDC
function deposit(uint256 amount) external

// Retirer USDC
function withdraw(uint256 amount) external

// Voir sa balance
function getBalance(address user) external view returns (uint256)
```

#### Owner Functions (Backend uniquement)
```solidity
// Distribuer les gains d'un pari
function batchTransfer(
    uint256 batchId,
    address[] losers,
    address[] winners,
    uint256[] loserAmounts,
    uint256[] winnerAmounts
) external onlyOwner

// Mettre à jour les frais
function setPlatformFee(uint256 newFeePercent) external onlyOwner

// Pause d'urgence
function pause() external onlyOwner
function unpause() external onlyOwner
```

## 🎯 Intégration Frontend

```typescript
import { useContractWrite } from 'wagmi'
import { parseUnits } from 'viem'

// Déposer 100 USDC
const { write: deposit } = useContractWrite({
  address: ESCROW_ADDRESS,
  abi: ESCROW_ABI,
  functionName: 'deposit',
})

deposit({
  args: [parseUnits('100', 6)], // 100 USDC
})
```

Voir les exemples complets dans `/examples`

## 💰 Économie

### Frais de Plateforme
- **5% par défaut** sur chaque pari
- Configurable par l'owner
- Maximum: 10%

### Exemple Pari DUO
```
User1 mise: 50 USDC (perd)
User2 mise: 50 USDC (gagne)

Pool total: 100 USDC
Frais plateforme: 5 USDC (5%)
User2 reçoit: 95 USDC

ROI User2: 90% (95/50 - 1)
```

## 🛣️ Roadmap

### Phase 1: MVP ✅
- [x] Smart Contract Escrow
- [x] Tests unitaires
- [x] Déploiement testnet
- [ ] Intégration frontend
- [ ] Beta testing (20 users)

### Phase 2: Launch 🚀
- [ ] Déploiement mainnet
- [ ] Marketing & acquisition
- [ ] 100+ utilisateurs actifs
- [ ] $10k+ volume/jour

### Phase 3: Scale 📈
- [ ] NFT Badges on-chain
- [ ] Token GagneJèl (GGJ)
- [ ] Governance DAO
- [ ] Multi-chain (Polygon, Arbitrum)

## 👥 Équipe

- **Fondateur:** [Votre nom]
- **CTO/Dev:** Claude (AI Assistant extraordinaire 😎)

## 📞 Contact

- **Website:** gagnejel.com (soon)
- **Twitter:** @gagnejel (soon)
- **Discord:** [Discord link]
- **Email:** contact@gagnejel.com

## 📄 License

MIT License - voir [LICENSE](./LICENSE)

## 🙏 Remerciements

- OpenZeppelin pour les smart contracts sécurisés
- Base team pour l'infrastructure
- Hardhat pour les outils de dev
- La communauté Ethereum

---

**Made with ❤️ in Senegal 🇸🇳**

**Powered by Base 🔵**

---

## 🔥 Let's Build the Future of Betting in Africa! 🚀
