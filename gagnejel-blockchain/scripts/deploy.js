const hre = require("hardhat");

async function main() {
  console.log("🚀 Déploiement de GagneJelEscrow sur", hre.network.name);
  console.log("=".repeat(50));

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Déployé par:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", hre.ethers.formatEther(balance), "ETH");
  console.log("=".repeat(50));

  // Adresses USDC selon le réseau
  const USDC_ADDRESSES = {
    base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC sur Base Mainnet
    baseSepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC sur Base Sepolia
  };

  const usdcAddress = USDC_ADDRESSES[hre.network.name];
  
  if (!usdcAddress) {
    throw new Error(`❌ Adresse USDC non configurée pour ${hre.network.name}`);
  }

  console.log("💵 USDC Address:", usdcAddress);

  // Fee Collector = deployer address (vous pouvez changer plus tard)
  const feeCollector = deployer.address;
  console.log("🏦 Fee Collector:", feeCollector);
  console.log("=".repeat(50));

  // Déployer le contract
  console.log("⏳ Déploiement en cours...");
  
  const GagneJelEscrow = await hre.ethers.getContractFactory("GagneJelEscrow");
  const escrow = await GagneJelEscrow.deploy(usdcAddress, feeCollector);

  await escrow.waitForDeployment();

  const contractAddress = await escrow.getAddress();

  console.log("✅ GagneJelEscrow déployé à:", contractAddress);
  console.log("=".repeat(50));

  // Afficher les informations importantes
  console.log("\n📋 INFORMATIONS DU CONTRACT:");
  console.log("- Contract Address:", contractAddress);
  console.log("- USDC Address:", usdcAddress);
  console.log("- Fee Collector:", feeCollector);
  console.log("- Platform Fee:", "5% (500 basis points)");
  console.log("- Min Deposit:", "1 USDC");
  console.log("- Max Deposit:", "10,000 USDC");
  console.log("=".repeat(50));

  // Vérifier sur Basescan (si mainnet ou sepolia)
  if (hre.network.name !== "localhost") {
    console.log("\n⏳ Attente de 5 blocs avant vérification...");
    await escrow.deploymentTransaction().wait(5);

    console.log("🔍 Vérification sur Basescan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [usdcAddress, feeCollector],
      });
      console.log("✅ Contract vérifié sur Basescan!");
    } catch (error) {
      console.log("⚠️  Erreur de vérification:", error.message);
      console.log("💡 Vous pouvez vérifier manuellement plus tard");
    }
  }

  // Sauvegarder les adresses dans un fichier
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    usdcAddress: usdcAddress,
    feeCollector: feeCollector,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
  };

  const filename = `deployment-${hre.network.name}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n💾 Informations sauvegardées dans: ${filename}`);

  console.log("\n🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!");
  console.log("=".repeat(50));
  console.log("\n📝 PROCHAINES ÉTAPES:");
  console.log("1. Copier l'adresse du contract dans votre .env:");
  console.log(`   ESCROW_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("\n2. Utiliser cette adresse dans votre frontend/backend");
  console.log("\n3. Tester avec de petits montants d'abord!");
  console.log("\n4. Explorer le contract sur Basescan:");
  
  if (hre.network.name === "base") {
    console.log(`   https://basescan.org/address/${contractAddress}`);
  } else if (hre.network.name === "baseSepolia") {
    console.log(`   https://sepolia.basescan.org/address/${contractAddress}`);
  }
  
  console.log("=".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ ERREUR:", error);
    process.exit(1);
  });
