// ============================================
// GAGNEJÈL BACKEND - SERVER
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Initialize
const app = express();
const prisma = new PrismaClient();
const blockchainService = require('./services/blockchain.service');
const blockchainRoutes = require('./routes/blockchain.routes');
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Blockchain routes
app.use('/api/blockchain', blockchainRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🔥 GagneJèl API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API status
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Disconnected',
      error: error.message
    });
  }
});

// Test route - Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Test route - Create a user
app.post('/api/users', async (req, res) => {
  try {
    const { walletAddress, username } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'walletAddress is required'
      });
    }
    
    const user = await prisma.user.create({
      data: {
        walletAddress,
        username: username || null
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// ============================================
// INITIALIZE BLOCKCHAIN
// ============================================

(async () => {
  try {
    await blockchainService.initialize();
// blockchainService.listenToEvents(); // Désactivé pour éviter les erreurs RPC public
  } catch (error) {
    console.error('⚠️  Warning: Blockchain service failed to initialize:', error.message);
    console.error('   The API will work but blockchain features will be disabled.');
  }
})();

// ============================================
// START SERVER
// ============================================

const server = app.listen(PORT, () => {
  console.log('');
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  console.log('🔥                                      🔥');
  console.log('🔥    GAGNEJÈL BACKEND API STARTED!    🔥');
  console.log('🔥                                      🔥');
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  console.log('');
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Database: Connected to PostgreSQL`);
  console.log(`🔗 Blockchain: Base Sepolia (${process.env.ESCROW_CONTRACT_ADDRESS})`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('');
  console.log('📝 Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/users`);
  console.log(`   POST http://localhost:${PORT}/api/users`);
  console.log('');
  console.log('🚀 Ready to accept requests!');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Server closed');
    process.exit(0);
  });
});