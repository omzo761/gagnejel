// ============================================
// MATCH CONTROLLER
// ============================================

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all matches (avec filtres)
exports.getAllMatches = async (req, res) => {
  try {
    const { sport, status, limit = 20 } = req.query;
    
    const where = {};
    if (sport) where.sport = sport;
    if (status) where.status = status;
    
    const matches = await prisma.match.findMany({
      where,
      take: parseInt(limit),
      orderBy: { startTime: 'asc' },
      include: {
        _count: {
          select: { bets: true }
        }
      }
    });
    
    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error('Error getting matches:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get match by ID
exports.getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        bets: {
          select: {
            id: true,
            amount: true,
            prediction: true,
            status: true,
            user: {
              select: {
                username: true,
                walletAddress: true
              }
            }
          }
        },
        _count: {
          select: { bets: true }
        }
      }
    });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    console.error('Error getting match:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create match (admin only - pour le MVP, pas de vérif auth)
exports.createMatch = async (req, res) => {
  try {
    const {
      sport,
      league,
      homeTeam,
      awayTeam,
      startTime,
      venue
    } = req.body;
    
    // Validation
    if (!sport || !league || !homeTeam || !awayTeam || !startTime) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const match = await prisma.match.create({
      data: {
        sport,
        league,
        homeTeam,
        awayTeam,
        startTime: new Date(startTime),
        venue: venue || null,
        status: 'upcoming'
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: match
    });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Resolve match (admin only)
exports.resolveMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { homeScore, awayScore } = req.body;
    
    // Validation
    if (homeScore === undefined || awayScore === undefined) {
      return res.status(400).json({
        success: false,
        error: 'homeScore and awayScore are required'
      });
    }
    
    // Déterminer le gagnant
    let winner;
    if (homeScore > awayScore) {
      winner = 'home';
    } else if (awayScore > homeScore) {
      winner = 'away';
    } else {
      winner = 'draw';
    }
    
    // Update match
    const match = await prisma.match.update({
      where: { id },
      data: {
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        winner,
        status: 'finished'
      }
    });
    
    // Résoudre les paris (on va créer ce service après)
    // await resolveBetsForMatch(id, winner);
    
    res.json({
      success: true,
      message: 'Match resolved successfully',
      data: match
    });
  } catch (error) {
    console.error('Error resolving match:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get upcoming matches
exports.getUpcomingMatches = async (req, res) => {
  try {
    const { sport } = req.query;
    
    const where = {
      status: 'upcoming',
      startTime: {
        gte: new Date()
      }
    };
    
    if (sport) where.sport = sport;
    
    const matches = await prisma.match.findMany({
      where,
      take: 20,
      orderBy: { startTime: 'asc' }
    });
    
    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    console.error('Error getting upcoming matches:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};