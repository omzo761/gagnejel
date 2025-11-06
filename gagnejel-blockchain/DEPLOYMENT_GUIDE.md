# 🚀 GUIDE DE DÉPLOIEMENT GAGNEJÈL SUR BASE

## 📋 TABLE DES MATIÈRES
1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Tests](#tests)
5. [Déploiement Testnet](#déploiement-testnet)
6. [Déploiement Mainnet](#déploiement-mainnet)
7. [Vérification](#vérification)
8. [Intégration Frontend](#intégration-frontend)

---

## 🔧 PRÉREQUIS

### 1. Installer Node.js
```bash
# Vérifier la version (besoin v18+)
node --version

# Si pas installé, télécharger sur nodejs.org
```

### 2. Créer un wallet MetaMask
- Installer MetaMask: https://metamask.io
- Créer un nouveau wallet
- **SAUVEGARDER VOTRE PHRASE SECRÈTE** (24 mots)
- Copier votre clé privée (Settings > Advanced > Export Private Key)

### 3. Ajouter le réseau Base Sepolia à MetaMask

**Network Name:** Base Sepolia  
**RPC URL:** https://sepolia.base.org  
**Chain ID:** 84532  
**Currency Symbol:** ETH  
**Block Explorer:** https://sepolia.basescan.org

### 4. Obtenir de l'ETH gratuit (testnet)
- Aller sur: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- Ou: https://sepoliafaucet.com
- Obtenir ~0.1 ETH (gratuit)

### 5. Obtenir de l'USDC testnet
- Aller sur: https://faucet.circle.com
- Connecter votre wallet
- Claim USDC gratuit

---

## 📦 INSTALLATION

### 1. Installer les dépendances
```bash
cd gagnejel-blockchain
npm install
```

### 2. Créer le fichier .env
```bash
cp .env.example .env
```

### 3. Remplir le .env
```env
PRIVATE_KEY=votre_clé_privée_ici
BASESCAN_API_KEY=votre_api_key_basescan
```

**⚠️ IMPORTANT:** Ne JAMAIS commiter votre .env sur Git!

---

## 🧪 TESTS

### Lancer les tests
```bash
npm run test
```

### Tests attendus:
✅ Deployment
✅ Deposits
✅ Withdrawals
✅ Batch Transfers (Bet Resolution)
✅ Admin Functions

Si tous les tests passent ✅, vous êtes prêt à déployer!

---

## 🌐 DÉPLOIEMENT TESTNET (Base Sepolia)

### 1. Vérifier votre balance
```bash
npx hardhat run scripts/check-balance.js --network baseSepolia
```

### 2. Compiler les contracts
```bash
npm run compile
```

### 3. Déployer sur Base Sepolia
```bash
npm run deploy:testnet
```

### 4. Résultat attendu:
```
🚀 Déploiement de GagneJelEscrow sur baseSepolia
==================================================
📍 Déployé par: 0xYourAddress...
💰 Balance: 0.05 ETH
==================================================
💵 USDC Address: 0x036CbD...
🏦 Fee Collector: 0xYourAddress...
==================================================
⏳ Déploiement en cours...
✅ GagneJelEscrow déployé à: 0xContractAddress...
==================================================

📋 INFORMATIONS DU CONTRACT:
- Contract Address: 0x...
- USDC Address: 0x...
- Fee Collector: 0x...
- Platform Fee: 5% (500 basis points)
==================================================
```

### 5. Sauvegarder l'adresse du contract
Le fichier `deployment-baseSepolia.json` contient toutes les infos.

### 6. Vérifier sur Basescan
```bash
npm run verify
```

Ou vérifier manuellement sur:
https://sepolia.basescan.org/address/VOTRE_ADRESSE_CONTRACT

---

## 🎯 TESTER LE CONTRACT SUR TESTNET

### 1. Approuver le contract à dépenser votre USDC
```javascript
// Dans votre frontend ou via Ethers.js
const usdcContract = new ethers.Contract(
  USDC_ADDRESS,
  USDC_ABI,
  signer
);

await usdcContract.approve(
  ESCROW_CONTRACT_ADDRESS,
  ethers.parseUnits("100", 6) // 100 USDC
);
```

### 2. Déposer de l'USDC
```javascript
const escrowContract = new ethers.Contract(
  ESCROW_CONTRACT_ADDRESS,
  ESCROW_ABI,
  signer
);

await escrowContract.deposit(
  ethers.parseUnits("100", 6) // 100 USDC
);
```

### 3. Vérifier votre balance
```javascript
const balance = await escrowContract.balances(yourAddress);
console.log("Balance:", ethers.formatUnits(balance, 6), "USDC");
```

### 4. Retirer de l'USDC
```javascript
await escrowContract.withdraw(
  ethers.parseUnits("50", 6) // Retirer 50 USDC
);
```

---

## 🚀 DÉPLOIEMENT MAINNET (Base Production)

### ⚠️ CHECKLIST AVANT MAINNET

- [ ] Tous les tests passent
- [ ] Testé sur Base Sepolia pendant au moins 1 semaine
- [ ] Aucun bug critique détecté
- [ ] Contract vérifié sur Basescan Sepolia
- [ ] Backend testé avec le contract testnet
- [ ] Frontend testé avec le contract testnet
- [ ] Vous avez de l'ETH sur Base Mainnet (~$100)
- [ ] Vous comprenez que c'est IRREVERSIBLE

### 1. Ajouter Base Mainnet à MetaMask

**Network Name:** Base  
**RPC URL:** https://mainnet.base.org  
**Chain ID:** 8453  
**Currency Symbol:** ETH  
**Block Explorer:** https://basescan.org

### 2. Acheter de l'ETH sur Base Mainnet
- Option 1: Bridge depuis Ethereum
  - https://bridge.base.org
  - ~$10-20 min
  
- Option 2: Acheter sur Coinbase
  - Acheter ETH
  - Envoyer sur Base Mainnet
  
- Option 3: CEX → Base
  - Binance, Kraken supportent Base

### 3. Vérifier votre balance
Vous avez besoin de ~0.01 ETH (~$50) pour déployer.

### 4. DÉPLOYER SUR MAINNET
```bash
npm run deploy:mainnet
```

### 5. Vérifier le contract
```bash
npm run verify -- --network base VOTRE_ADRESSE_CONTRACT
```

### 6. CÉLÉBRER! 🎉
Votre contract est maintenant LIVE sur Base Mainnet!

---

## 🔗 INTÉGRATION FRONTEND

### 1. Installer Wagmi
```bash
npm install wagmi viem @tanstack/react-query
```

### 2. Configuration Wagmi
```typescript
// wagmi.config.ts
import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [coinbaseWallet({ appName: 'GagneJèl' })],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})
```

### 3. Utiliser le contract
```typescript
// useEscrow.ts
import { useContractRead, useContractWrite } from 'wagmi'
import { parseUnits } from 'viem'

const ESCROW_ADDRESS = '0xVotreAdresseContract'

export function useDeposit() {
  const { write: deposit } = useContractWrite({
    address: ESCROW_ADDRESS,
    abi: ESCROW_ABI,
    functionName: 'deposit',
  })

  return {
    deposit: (amount: string) => {
      deposit({
        args: [parseUnits(amount, 6)],
      })
    },
  }
}

export function useBalance(address: string) {
  const { data: balance } = useContractRead({
    address: ESCROW_ADDRESS,
    abi: ESCROW_ABI,
    functionName: 'balances',
    args: [address],
  })

  return balance
}
```

---

## 📊 MONITORING

### Outils recommandés:
1. **Basescan:** Voir toutes les transactions
   - https://basescan.org/address/VOTRE_CONTRACT

2. **Tenderly:** Monitoring avancé
   - https://tenderly.co
   - Alertes en temps réel
   - Simulation de transactions

3. **The Graph:** Indexer les events
   - Créer un subgraph pour query l'historique

---

## 🔒 SÉCURITÉ

### Bonnes pratiques:
1. ✅ Commencer avec des petits montants
2. ✅ Limiter maxDeposit au début (ex: $100)
3. ✅ Tester chaque fonction individuellement
4. ✅ Avoir une fonction pause() pour urgences
5. ✅ Monitorer les transactions 24/7
6. ✅ Audit de sécurité après 3-6 mois

### Red flags:
- ❌ Transactions qui fail
- ❌ Gas fees anormalement élevés
- ❌ Balances qui ne matchent pas
- ❌ Events qui ne sont pas émis

---

## 🆘 TROUBLESHOOTING

### "Insufficient funds for gas"
→ Vous n'avez pas assez d'ETH pour payer le gas. Ajoutez de l'ETH.

### "Transaction reverted"
→ Le contract a rejeté la transaction. Vérifiez les conditions (montants, approvals, etc.)

### "Nonce too high"
→ Resetez votre wallet dans MetaMask (Settings > Advanced > Reset Account)

### "Contract not verified"
→ Attendez 5-10 minutes après déploiement, puis reverify.

---

## 📞 SUPPORT

- GitHub Issues: [Votre repo]
- Discord: [Votre Discord]
- Email: [Votre email]

---

## 🎉 FÉLICITATIONS!

Vous avez déployé GagneJèl sur Base! 🚀

**Prochaines étapes:**
1. Intégrer avec le frontend
2. Tester avec des vrais utilisateurs
3. Collecter du feedback
4. Itérer et améliorer
5. SCALE! 📈

**LET'S GO! 💪**
