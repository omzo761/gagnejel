const hre = require("hardhat");

async function main() {
  console.log("🔍 Vérification de votre balance sur", hre.network.name);
  console.log("=".repeat(50));

  const [deployer] = await hre.ethers.getSigners();
  
  console.log("📍 Adresse:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const balanceInEth = hre.ethers.formatEther(balance);
  
  console.log("💰 Balance:", balanceInEth, "ETH");
  
  if (parseFloat(balanceInEth) < 0.01) {
    console.log("⚠️  ATTENTION: Balance trop basse pour déployer!");
    console.log("💡 Obtenez de l'ETH gratuit sur:");
    console.log("   - https://portal.cdp.coinbase.com/products/faucet");
    console.log("   - https://www.alchemy.com/faucets/base-sepolia");
  } else {
    console.log("✅ Vous avez assez d'ETH pour déployer!");
  }
  
  console.log("=".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erreur:", error);
    process.exit(1);
  });
