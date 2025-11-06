const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GagneJelEscrow", function () {
  let escrow;
  let usdc;
  let owner;
  let feeCollector;
  let user1;
  let user2;
  let user3;

  const USDC_DECIMALS = 6;
  const toUSDC = (amount) => ethers.parseUnits(amount.toString(), USDC_DECIMALS);

  beforeEach(async function () {
    // Get signers
    [owner, feeCollector, user1, user2, user3] = await ethers.getSigners();

    // Deploy Mock USDC (pour les tests)
    const MockUSDC = await ethers.getContractFactory("MockERC20");
    usdc = await MockUSDC.deploy("USD Coin", "USDC", USDC_DECIMALS);

    // Deploy Escrow
    const GagneJelEscrow = await ethers.getContractFactory("GagneJelEscrow");
    escrow = await GagneJelEscrow.deploy(await usdc.getAddress(), feeCollector.address);

    // Mint USDC to users for testing
    await usdc.mint(user1.address, toUSDC(10000));
    await usdc.mint(user2.address, toUSDC(10000));
    await usdc.mint(user3.address, toUSDC(10000));
  });

  describe("Deployment", function () {
    it("Should set the correct USDC address", async function () {
      expect(await escrow.usdc()).to.equal(await usdc.getAddress());
    });

    it("Should set the correct fee collector", async function () {
      expect(await escrow.feeCollector()).to.equal(feeCollector.address);
    });

    it("Should set platform fee to 5%", async function () {
      expect(await escrow.platformFeePercent()).to.equal(500);
    });
  });

  describe("Deposits", function () {
    it("Should allow users to deposit USDC", async function () {
      const depositAmount = toUSDC(100);

      // Approve escrow to spend USDC
      await usdc.connect(user1).approve(await escrow.getAddress(), depositAmount);

      // Deposit
      await expect(escrow.connect(user1).deposit(depositAmount))
        .to.emit(escrow, "Deposit")
        .withArgs(user1.address, depositAmount, depositAmount, await ethers.provider.getBlock("latest").then(b => b.timestamp + 1));

      // Check balance
      expect(await escrow.balances(user1.address)).to.equal(depositAmount);
      expect(await escrow.totalDeposits()).to.equal(depositAmount);
    });

    it("Should reject deposits below minimum", async function () {
      const tooLow = toUSDC(0.5); // Less than 1 USDC

      await usdc.connect(user1).approve(await escrow.getAddress(), tooLow);

      await expect(
        escrow.connect(user1).deposit(tooLow)
      ).to.be.reverted;
    });

    it("Should reject deposits above maximum", async function () {
      const tooHigh = toUSDC(15000); // More than 10,000 USDC

      await usdc.connect(user1).approve(await escrow.getAddress(), tooHigh);

      await expect(
        escrow.connect(user1).deposit(tooHigh)
      ).to.be.reverted;
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // User1 deposits 100 USDC
      const depositAmount = toUSDC(100);
      await usdc.connect(user1).approve(await escrow.getAddress(), depositAmount);
      await escrow.connect(user1).deposit(depositAmount);
    });

    it("Should allow users to withdraw their balance", async function () {
      const withdrawAmount = toUSDC(50);

      await expect(escrow.connect(user1).withdraw(withdrawAmount))
        .to.emit(escrow, "Withdrawal");

      expect(await escrow.balances(user1.address)).to.equal(toUSDC(50));
    });

    it("Should reject withdrawals exceeding balance", async function () {
      const tooMuch = toUSDC(200);

      await expect(
        escrow.connect(user1).withdraw(tooMuch)
      ).to.be.reverted;
    });
  });

  describe("Batch Transfers (Bet Resolution)", function () {
    beforeEach(async function () {
      // Setup: 3 users deposit 100 USDC each
      const depositAmount = toUSDC(100);

      for (const user of [user1, user2, user3]) {
        await usdc.connect(user).approve(await escrow.getAddress(), depositAmount);
        await escrow.connect(user).deposit(depositAmount);
      }
    });

    it("Should distribute winnings correctly (DUO bet)", async function () {
      // Scenario: DUO bet
      // User1 bets 50 USDC and loses
      // User2 bets 50 USDC and wins
      // Total pool: 100 USDC
      // Platform fee: 5 USDC (5%)
      // User2 gets: 95 USDC

      const batchId = 1;
      const losers = [user1.address];
      const loserAmounts = [toUSDC(50)];
      const winners = [user2.address];
      const winnerAmounts = [toUSDC(95)];

      await expect(
        escrow.connect(owner).batchTransfer(
          batchId,
          losers,
          winners,
          loserAmounts,
          winnerAmounts
        )
      ).to.emit(escrow, "BatchTransferCompleted");

      // Check balances
      expect(await escrow.balances(user1.address)).to.equal(toUSDC(50)); // 100 - 50
      expect(await escrow.balances(user2.address)).to.equal(toUSDC(195)); // 100 + 95
      expect(await escrow.balances(feeCollector.address)).to.equal(toUSDC(5)); // 5% fee
    });

    it("Should distribute winnings correctly (TRIO bet)", async function () {
      // Scenario: TRIO bet
      // User1 and User2 lose 30 USDC each
      // User3 wins 57 USDC (60 - 5% fee)

      const batchId = 2;
      const losers = [user1.address, user2.address];
      const loserAmounts = [toUSDC(30), toUSDC(30)];
      const winners = [user3.address];
      const winnerAmounts = [toUSDC(57)];

      await escrow.connect(owner).batchTransfer(
        batchId,
        losers,
        winners,
        loserAmounts,
        winnerAmounts
      );

      expect(await escrow.balances(user1.address)).to.equal(toUSDC(70));
      expect(await escrow.balances(user2.address)).to.equal(toUSDC(70));
      expect(await escrow.balances(user3.address)).to.equal(toUSDC(157));
    });

    it("Should reject batch transfer if user has insufficient balance", async function () {
      const batchId = 3;
      const losers = [user1.address];
      const loserAmounts = [toUSDC(200)]; // More than user1 has
      const winners = [user2.address];
      const winnerAmounts = [toUSDC(190)];

      await expect(
        escrow.connect(owner).batchTransfer(
          batchId,
          losers,
          winners,
          loserAmounts,
          winnerAmounts
        )
      ).to.be.reverted;
    });

    it("Should reject batch transfer from non-owner", async function () {
      const batchId = 4;
      const losers = [user1.address];
      const loserAmounts = [toUSDC(50)];
      const winners = [user2.address];
      const winnerAmounts = [toUSDC(47.5)];

      await expect(
        escrow.connect(user1).batchTransfer(
          batchId,
          losers,
          winners,
          loserAmounts,
          winnerAmounts
        )
      ).to.be.reverted;
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to update platform fee", async function () {
      await expect(escrow.connect(owner).setPlatformFee(300))
        .to.emit(escrow, "PlatformFeeUpdated")
        .withArgs(500, 300);

      expect(await escrow.platformFeePercent()).to.equal(300);
    });

    it("Should reject platform fee above 10%", async function () {
      await expect(
        escrow.connect(owner).setPlatformFee(1100)
      ).to.be.reverted;
    });

    it("Should allow owner to pause contract", async function () {
      await escrow.connect(owner).pause();

      const depositAmount = toUSDC(100);
      await usdc.connect(user1).approve(await escrow.getAddress(), depositAmount);

      await expect(
        escrow.connect(user1).deposit(depositAmount)
      ).to.be.reverted;
    });

    it("Should allow owner to unpause contract", async function () {
      await escrow.connect(owner).pause();
      await escrow.connect(owner).unpause();

      const depositAmount = toUSDC(100);
      await usdc.connect(user1).approve(await escrow.getAddress(), depositAmount);

      await expect(
        escrow.connect(user1).deposit(depositAmount)
      ).to.not.be.reverted;
    });
  });
});

// Mock ERC20 for testing
// (Vous aurez besoin de créer ce fichier séparément)
