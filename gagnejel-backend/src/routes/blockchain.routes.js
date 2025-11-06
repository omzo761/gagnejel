// ============================================
// BLOCKCHAIN ROUTES
// ============================================

const express = require('express');
const router = express.Router();
const blockchainService = require('../services/blockchain.service');

// Get contract info
router.get('/contract/info', async (req, res) => {
  try {
    const info = await blockchainService.getContractInfo();
    res.json({
      success: true,
      data: info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get user balance on blockchain
router.get('/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await blockchainService.getUserBalance(address);
    
    res.json({
      success: true,
      address: address,
      balance: balance,
      currency: 'USDC'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;