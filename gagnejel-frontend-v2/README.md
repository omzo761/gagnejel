# GagneJèl Frontend

Plateforme de paris sportifs décentralisée construite avec Next.js 14, Wagmi et RainbowKit.

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.local.example .env.local
```

Éditer `.env.local` et ajouter votre WalletConnect Project ID :
- Aller sur https://cloud.walletconnect.com
- Créer un compte gratuit
- Créer un projet
- Copier le Project ID

### 3. Lancer l'application

```bash
npm run dev
```

Ouvrir http://localhost:3000

## 📚 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript 5.x
- **Styling** : Tailwind CSS 3.x
- **Web3** : Wagmi 2.x + Viem 2.x + RainbowKit 2.x
- **State** : React Query (TanStack Query)
- **HTTP** : Axios
- **Icons** : Lucide React
- **Notifications** : React Hot Toast

## 🎨 Charte Graphique

- **Vert principal** : #10b981 (from-green-500 to-emerald-500)
- **Jaune/Orange** : #f59e0b / #f97316
- **Design** : Mobile-first responsive
- **Style** : Coins arrondis, ombres douces, gradients

## 📝 Prérequis

- Node.js 18+
- Un wallet (MetaMask, Coinbase Wallet)
- Backend GagneJèl sur http://localhost:5000

## 🏗️ Structure

```
app/              # Pages Next.js (App Router)
components/       # Composants réutilisables
lib/              # Librairies et utilitaires
public/           # Assets statiques
```

---

**Développé avec 💚 par THE LEAD DEV**
