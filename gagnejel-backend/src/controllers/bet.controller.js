// ============================================
// BET CONTROLLER
// ============================================

const { PrismaClient } = require('@prisma/client');
const blockchainService = require('../services/blockchain.service');
const prisma = new PrismaClient();

// Calcul des odds selon le type de pari
const BET_ODDS = {
  'DUO': 1.8,      // 1 adversaire
  'TRIO': 2.5,     // 2 adversaires
  'QUATRO': 3.2,   // 3 adversaires
  '5': 4.0         // 4 adversaires
};

// Place a bet
exports.placeBet = async (req, res) => {
  try {
    const {
      userId,
      matchId,
      type,          // "DUO", "TRIO", "QUATRO", "5"
      prediction,    // "home", "away", "draw"
      amount,        // en USDC
      groupId        // optionnel
    } = req.body;
    
    // Validation
    if (!userId || !matchId || !type || !prediction || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Vérifier que le match existe et est "upcoming"
    const match = await prisma.match.findUnique({
      where: { id: matchId }
    });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }
    
    if (match.status !== 'upcoming') {
      return res.status(400).json({
        success: false,
        error: 'Cannot bet on this match (already started or finished)'
      });
    }
    
    // Vérifier que le match n'a pas déjà commencé
    if (new Date(match.startTime) <= new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Match has already started'
      });
    }
    
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Vérifier que le type est valide
    if (!BET_ODDS[type]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bet type'
      });
    }
    
    // Calculer les odds et potential win
    const odds = BET_ODDS[type];
    const potentialWin = parseFloat(amount) * odds;
    
    // Créer le pari
    const bet = await prisma.bet.create({
      data: {
        userId,
        matchId,
        groupId: groupId || null,
        type,
        prediction,
        amount: parseFloat(amount),
        odds,
        potentialWin,
        status: 'pending'
      },
      include: {
        match: {
          select: {
            homeTeam: true,
            awayTeam: true,
            startTime: true
          }
        },
        user: {
          select: {
            username: true,
            walletAddress: true
          }
        }
      }
    });
    
    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalBets: { increment: 1 }
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Bet placed successfully',
      data: bet
    });
  } catch (error) {
    console.error('Error placing bet:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all bets (avec filtres)
exports.getAllBets = async (req, res) => {
  try {
    const { userId, matchId, status, limit = 20 } = req.query;
    
    const where = {};
    if (userId) where.userId = userId;
    if (matchId) where.matchId = matchId;
    if (status) where.status = status;
    
    const bets = await prisma.bet.findMany({
      where,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            username: true,
            walletAddress: true
          }
        },
        match: {
          select: {
            homeTeam: true,
            awayTeam: true,
            startTime: true,
            status: true,
            winner: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      count: bets.length,
      data: bets
    });
  } catch (error) {
    console.error('Error getting bets:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get bet by ID
exports.getBetById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const bet = await prisma.bet.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            walletAddress: true
          }
        },
        match: true
      }
    });
    
    if (!bet) {
      return res.status(404).json({
        success: false,
        error: 'Bet not found'
      });
    }
    
    res.json({
      success: true,
      data: bet
    });
  } catch (error) {
    console.error('Error getting bet:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get user bets
exports.getUserBets = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;
    
    const where = { userId };
    if (status) where.status = status;
    
    const bets = await prisma.bet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        match: {
          select: {
            homeTeam: true,
            awayTeam: true,
            startTime: true,
            status: true,
            winner: true
          }
        }
      }
    });
    
    // Calculer les stats
    const stats = {
      total: bets.length,
      pending: bets.filter(b => b.status === 'pending').length,
      won: bets.filter(b => b.status === 'won').length,
      lost: bets.filter(b => b.status === 'lost').length,
      totalWagered: bets.reduce((sum, b) => sum + parseFloat(b.amount), 0),
      totalWon: bets.filter(b => b.status === 'won').reduce((sum, b) => sum + parseFloat(b.payout || 0), 0)
    };
    
    res.json({
      success: true,
      stats,
      data: bets
    });
  } catch (error) {
    console.error('Error getting user bets:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Resolve bets for a match (appelé après résolution du match)
exports.resolveBetsForMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    
    // Vérifier que le match est terminé
    const match = await prisma.match.findUnique({
      where: { id: matchId }
    });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }
    
    if (match.status !== 'finished') {
      return res.status(400).json({
        success: false,
        error: 'Match is not finished yet'
      });
    }
    
    if (!match.winner) {
      return res.status(400).json({
        success: false,
        error: 'Match winner not determined'
      });
    }
    
    // Récupérer tous les paris du match
    const bets = await prisma.bet.findMany({
      where: { 
        matchId,
        status: 'pending'
      },
      include: {
        user: true
      }
    });
    
    if (bets.length === 0) {
      return res.json({
        success: true,
        message: 'No pending bets to resolve'
      });
    }
    
    let winners = 0;
    let losers = 0;
    
    // Résoudre chaque pari
    for (const bet of bets) {
      const isWinner = bet.prediction === match.winner;
      
      await prisma.bet.update({
        where: { id: bet.id },
        data: {
          status: isWinner ? 'won' : 'lost',
          isWinner,
          payout: isWinner ? bet.potentialWin : 0,
          settledAt: new Date()
        }
      });
      
      // Update user stats
      if (isWinner) {
        winners++;
        await prisma.user.update({
          where: { id: bet.userId },
          data: {
            totalWins: { increment: 1 },
            winRate: {
              set: await calculateWinRate(bet.userId)
            }
          }
        });
      } else {
        losers++;
        await prisma.user.update({
          where: { id: bet.userId },
          data: {
            totalLosses: { increment: 1 },
            winRate: {
              set: await calculateWinRate(bet.userId)
            }
          }
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Bets resolved successfully',
      stats: {
        total: bets.length,
        winners,
        losers
      }
    });
  } catch (error) {
    console.error('Error resolving bets:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Helper: Calculate win rate
async function calculateWinRate(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      totalWins: true,
      totalLosses: true
    }
  });
  
  const totalGames = user.totalWins + user.totalLosses;
  if (totalGames === 0) return 0;
  
  return (user.totalWins / totalGames) * 100;
}