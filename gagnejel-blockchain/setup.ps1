# Script PowerShell pour configurer GagneJèl automatiquement
# Enregistrer ce fichier comme setup.ps1
# Exécuter : .\setup.ps1

Write-Host "🚀 CONFIGURATION AUTOMATIQUE DE GAGNEJÈL" -ForegroundColor Cyan
Write-Host "=" * 50

# Vérifier qu'on est dans le bon dossier
if (!(Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé" -ForegroundColor Red
    Write-Host "💡 Assurez-vous d'être dans le dossier gagnejel-blockchain" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ package.json trouvé" -ForegroundColor Green

# Créer le dossier contracts
Write-Host ""
Write-Host "📁 Création du dossier contracts..." -ForegroundColor Cyan
if (!(Test-Path "contracts")) {
    New-Item -ItemType Directory -Path "contracts" | Out-Null
    Write-Host "✅ Dossier contracts créé" -ForegroundColor Green
} else {
    Write-Host "✅ Dossier contracts existe déjà" -ForegroundColor Green
}

# Déplacer GagneJelEscrow.sol vers contracts/
Write-Host ""
Write-Host "📝 Déplacement de GagneJelEscrow.sol..." -ForegroundColor Cyan
if (Test-Path "GagneJelEscrow.sol") {
    Move-Item -Path "GagneJelEscrow.sol" -Destination "contracts/" -Force
    Write-Host "✅ GagneJelEscrow.sol déplacé vers contracts/" -ForegroundColor Green
} elseif (Test-Path "contracts/GagneJelEscrow.sol") {
    Write-Host "✅ GagneJelEscrow.sol déjà dans contracts/" -ForegroundColor Green
} else {
    Write-Host "⚠️  GagneJelEscrow.sol non trouvé" -ForegroundColor Yellow
}

# Copier .env.example vers .env si pas déjà fait
Write-Host ""
Write-Host "⚙️  Configuration .env..." -ForegroundColor Cyan
if (!(Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Fichier .env créé (à remplir avec votre clé privée)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env.example non trouvé" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Fichier .env existe déjà" -ForegroundColor Green
}

# Vérifier Node.js
Write-Host ""
Write-Host "🔍 Vérification de Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non installé" -ForegroundColor Red
    Write-Host "💡 Téléchargez-le sur https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Vérifier npm
Write-Host ""
Write-Host "🔍 Vérification de npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm non installé" -ForegroundColor Red
    exit 1
}

# Vérifier la structure
Write-Host ""
Write-Host "📋 Vérification de la structure du projet..." -ForegroundColor Cyan
$requiredFiles = @(
    "package.json",
    "hardhat.config.js",
    "contracts/GagneJelEscrow.sol",
    "scripts/deploy.js",
    "scripts/check-balance.js"
)

$allGood = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file manquant" -ForegroundColor Red
        $allGood = $false
    }
}

if (!$allGood) {
    Write-Host ""
    Write-Host "⚠️  Certains fichiers manquent" -ForegroundColor Yellow
    Write-Host "💡 Téléchargez-les depuis les liens fournis" -ForegroundColor Yellow
    exit 1
}

# Tout est bon !
Write-Host ""
Write-Host "=" * 50
Write-Host "🎉 CONFIGURATION TERMINÉE !" -ForegroundColor Green
Write-Host "=" * 50
Write-Host ""
Write-Host "📝 PROCHAINES ÉTAPES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Éditer le fichier .env et ajouter votre clé privée:" -ForegroundColor Yellow
Write-Host "   notepad .env" -ForegroundColor White
Write-Host ""
Write-Host "2. Installer les dépendances:" -ForegroundColor Yellow
Write-Host "   npm install" -ForegroundColor White
Write-Host ""
Write-Host "3. Compiler le smart contract:" -ForegroundColor Yellow
Write-Host "   npx hardhat compile" -ForegroundColor White
Write-Host ""
Write-Host "4. Vérifier votre balance testnet:" -ForegroundColor Yellow
Write-Host "   npx hardhat run scripts/check-balance.js --network baseSepolia" -ForegroundColor White
Write-Host ""
Write-Host "5. Déployer sur Base Sepolia testnet:" -ForegroundColor Yellow
Write-Host "   npm run deploy:testnet" -ForegroundColor White
Write-Host ""
Write-Host "🚀 LET'S GO!" -ForegroundColor Cyan
