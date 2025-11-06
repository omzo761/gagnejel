// ============================================
// BET ROUTES
// ============================================

const express = require('express');
const router = express.Router();
const betController = require('../controllers/bet.controller');

// Public routes
router.get('/', betController.getAllBets);
router.get('/:id', betController.getBetById);
router.get('/user/:userId', betController.getUserBets);

// User routes
router.post('/', betController.placeBet);

// Admin routes
router.post('/match/:matchId/resolve', betController.resolveBetsForMatch);

module.exports = router;