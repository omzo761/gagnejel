// ============================================
// MATCH ROUTES
// ============================================

const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

// Public routes
router.get('/', matchController.getAllMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/:id', matchController.getMatchById);

// Admin routes (pas de middleware auth pour le MVP)
router.post('/', matchController.createMatch);
router.patch('/:id/resolve', matchController.resolveMatch);

module.exports = router;