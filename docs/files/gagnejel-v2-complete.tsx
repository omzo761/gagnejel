import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Shield, Zap, Home, History, Wallet, User, Phone, ArrowLeft,
  Trophy, TrendingUp, Gift, Users, Settings, LogOut, Bell, Check, X, DollarSign,
  Star, Clock, Filter, Copy, ChevronDown, Plus, Sparkles, Award, HelpCircle,
  Lock, Globe, Volume2, CreditCard, UserX, AlertCircle, Eye, Send, MessageCircle,
  Target, Crown, Flame, Activity, Swords, Shield as ShieldIcon, Timer, Link2,
  Search, Calendar, MapPin, Share2, Zap as Lightning, Hash, TrendingDown,
  BarChart3, Medal, PlusCircle, MinusCircle, Edit, Trash2, ExternalLink
} from 'lucide-react';

const GagneJelV2 = () => {
  // États de base
  const [currentScreen, setCurrentScreen] = useState('onboarding1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [walletBalance, setWalletBalance] = useState(1250.50);
  const [notification, setNotification] = useState('');
  
  // États pour les sports et paris
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedBetType, setSelectedBetType] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  
  // États pour les groupes
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMaxPlayers, setGroupMaxPlayers] = useState('unlimited');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  
  // États pour la gamification
  const [userLevel, setUserLevel] = useState('Legend');
  const [userXP, setUserXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(3000);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // États pour le wallet Web3
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('0x7a8f...9c2d');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const GagnejelLogo = ({ size = 'normal', variant = 'color' }) => {
    const fontSize = size === 'large' ? 'text-5xl' : size === 'normal' ? 'text-3xl' : 'text-xl';
    const colorClass = variant === 'white' ? 'text-white' : 'text-green-600';
    
    return (
      <div className={`font-black ${fontSize} tracking-tight`}>
        <span className={colorClass}>Ga</span>
        <span className="text-yellow-400">g</span>
        <span className={colorClass}>neJël</span>
      </div>
    );
  };

  const sports = [
    { id: 'all', name: 'Tous', icon: '🌐', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'wrestling', name: 'Lutte', icon: '🤼', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'football', name: 'Football', icon: '⚽', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'basketball', name: 'Basket', icon: '🏀', color: 'bg-gradient-to-r from-orange-400 to-amber-500' },
    { id: 'mma', name: 'MMA', icon: '🥊', color: 'bg-gradient-to-r from-red-600 to-rose-600' },
    { id: 'other', name: 'Autres', icon: '⭐', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' }
  ];

  const betTypes = [
    { id: 'duo', name: 'Pari DUO', icon: '👥', minBet: 10, multiplier: 2.0, description: 'Pariez à 2', players: 2, color: 'from-blue-500 to-cyan-500' },
    { id: 'trio', name: 'Pari TRIO', icon: '🥉', minBet: 20, multiplier: 3.0, description: 'Pariez à 3', players: 3, color: 'from-purple-500 to-pink-500' },
    { id: 'quatro', name: 'Pari QUATRO', icon: '🎯', minBet: 30, multiplier: 4.0, description: 'Pariez à 4', players: 4, color: 'from-orange-500 to-red-500' },
    { id: 'penta', name: 'Pari à 5', icon: '⭐', minBet: 50, multiplier: 5.0, description: 'Pariez à 5', players: 5, color: 'from-yellow-500 to-amber-500' },
    { id: 'group', name: 'Groupe Illimité', icon: '🚀', minBet: 10, multiplier: 'Var', description: 'Créez votre groupe', players: '∞', color: 'from-green-500 to-emerald-500' }
  ];

  const matches = [
    {
      id: 1, sport: 'wrestling', team1: 'Modou Lô', team2: 'Balla Gaye 2', logo1: '🦁', logo2: '🐅',
      date: '2025-02-15', time: '20:00', venue: 'Arène Nationale', odds1: 1.85, odds2: 2.20,
      totalBets: 342, totalAmount: 48750.00, closesIn: '2h 30m', category: 'Combat Principal'
    },
    {
      id: 2, sport: 'football', team1: 'Liverpool', team2: 'Man City', logo1: '🔴', logo2: '🔵',
      date: '2025-02-10', time: '21:00', venue: 'Anfield', odds1: 2.10, odds2: 1.90,
      totalBets: 567, totalAmount: 125340.50, closesIn: '45m', category: 'Premier League'
    },
    {
      id: 3, sport: 'basketball', team1: 'Lakers', team2: 'Warriors', logo1: '💛', logo2: '💙',
      date: '2025-02-08', time: '03:30', venue: 'Crypto Arena', odds1: 1.75, odds2: 2.35,
      totalBets: 234, totalAmount: 67890.00, closesIn: '1h 15m', category: 'NBA'
    },
    {
      id: 4, sport: 'mma', team1: 'Conor McGregor', team2: 'Dustin Poirier', logo1: '🥊', logo2: '💎',
      date: '2025-02-20', time: '04:00', venue: 'T-Mobile Arena', odds1: 2.50, odds2: 1.65,
      totalBets: 189, totalAmount: 98450.00, closesIn: '3h 20m', category: 'UFC 300'
    }
  ];

  const betGroups = [
    {
      id: 1, name: 'Les Guerriers du Dimanche', matchId: 1, creator: 'Abdou', members: 12,
      maxMembers: null, totalPool: 450.00, status: 'open', closesIn: '2h 30m',
      chat: [
        { user: 'Abdou', message: 'Qui mise sur Modou Lô ? 🦁', time: '14:32' },
        { user: 'Fatou', message: 'Moi ! Il est en forme 💪', time: '14:35' },
        { user: 'Mamadou', message: 'Balla Gaye va gagner', time: '14:40' }
      ]
    },
    {
      id: 2, name: 'Premier League Fans 🔴', matchId: 2, creator: 'Vous', members: 8,
      maxMembers: null, totalPool: 820.50, status: 'open', closesIn: '45m',
      chat: [
        { user: 'Vous', message: 'Liverpool va tout casser !', time: '15:10' },
        { user: 'Khadija', message: "J'ai misé 50 USDT sur City", time: '15:15' }
      ]
    }
  ];

  const levels = [
    { name: 'Rookie', minXP: 0, maxXP: 100, icon: '🌱', color: 'text-gray-500', bgColor: 'bg-gray-100' },
    { name: 'Pro', minXP: 100, maxXP: 500, icon: '⚡', color: 'text-blue-500', bgColor: 'bg-blue-100' },
    { name: 'Expert', minXP: 500, maxXP: 2000, icon: '🔥', color: 'text-orange-500', bgColor: 'bg-orange-100' },
    { name: 'Legend', minXP: 2000, maxXP: 5000, icon: '👑', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { name: 'God', minXP: 5000, maxXP: null, icon: '⚡', color: 'text-purple-500', bgColor: 'bg-purple-100' }
  ];

  const badges = [
    { id: 1, name: 'First Blood', description: 'Premier pari gagné', icon: '🎯', unlocked: true },
    { id: 2, name: 'Winning Streak', description: '5 paris gagnés d\'affilée', icon: '🔥', unlocked: true },
    { id: 3, name: 'Group Leader', description: '10 groupes créés', icon: '👑', unlocked: true },
    { id: 4, name: 'Whale', description: '+1000 USDT misés', icon: '🐋', unlocked: false },
    { id: 5, name: 'Lucky Seven', description: '7 victoires consécutives', icon: '🍀', unlocked: false },
    { id: 6, name: 'Multi-Sport Master', description: 'Parier sur 4 sports', icon: '🌟', unlocked: true }
  ];

  const leaderboard = [
    { rank: 1, username: 'AbdouTheBest', xp: 4850, wins: 127, winRate: 78, level: 'Legend', avatar: '👑' },
    { rank: 2, username: 'FatouQueen', xp: 3920, wins: 98, winRate: 72, level: 'Expert', avatar: '💎' },
    { rank: 3, username: 'Vous', xp: 2450, wins: 65, winRate: 68, level: 'Legend', avatar: '🔥' },
    { rank: 4, username: 'MamadouPro', xp: 2100, wins: 56, winRate: 65, level: 'Legend', avatar: '⚡' },
    { rank: 5, username: 'KhadijaWin', xp: 1890, wins: 51, winRate: 62, level: 'Expert', avatar: '🌟' }
  ];

  const betHistory = [
    { id: 1, date: '2025-02-01', sport: 'wrestling', match: 'Modou Lô vs Eumeu Sène', type: 'DUO', amount: 50, status: 'won', winAmount: 100, xpEarned: 50 },
    { id: 2, date: '2025-01-28', sport: 'football', match: 'PSG vs Marseille', type: 'TRIO', amount: 75, status: 'won', winAmount: 225, xpEarned: 75 },
    { id: 3, date: '2025-01-25', sport: 'basketball', match: 'Lakers vs Celtics', type: 'Group', amount: 30, status: 'lost', winAmount: 0, xpEarned: 10 }
  ];

  const getCurrentLevel = () => {
    return levels.find(level => 
      userXP >= level.minXP && (level.maxXP === null || userXP < level.maxXP)
    ) || levels[0];
  };

  const getProgressPercentage = () => {
    const currentLevel = getCurrentLevel();
    if (currentLevel.maxXP === null) return 100;
    return ((userXP - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;
  };

  const getSportIcon = (sportId) => {
    return sports.find(s => s.id === sportId)?.icon || '⭐';
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpCode];
      newOtp[index] = value;
      setOtpCode(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleCreateGroup = () => {
    if (groupName && selectedMatch) {
      setNotification('Groupe créé avec succès! 🎉');
      setShowCreateGroup(false);
      setCurrentScreen('home');
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setNotification('Message envoyé!');
      setChatMessage('');
    }
  };

  const handlePlaceBet = () => {
    if (betAmount && selectedMatch && selectedBetType && selectedTeam) {
      setWalletBalance(prev => prev - parseFloat(betAmount));
      const xpGain = Math.floor(parseFloat(betAmount) * 0.5);
      setUserXP(prev => prev + xpGain);
      setNotification(`Pari placé! +${xpGain} XP 🎯`);
      setBetAmount('');
      setSelectedTeam(null);
      setCurrentScreen('home');
    }
  };

  const MobileContainer = ({ children }) => (
    <div className="w-full max-w-md mx-auto h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {notification && (
        <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl z-50 shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 animate-pulse" />
            <span className="text-sm font-bold">{notification}</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );

  const FooterNav = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-3">
        {[
          { screen: 'home', icon: Home, label: 'Accueil' },
          { screen: 'groups', icon: Users, label: 'Groupes' },
          { screen: 'history', icon: History, label: 'Historique' },
          { screen: 'wallet', icon: Wallet, label: 'Wallet' },
          { screen: 'profile', icon: User, label: 'Profil' }
        ].map(({ screen, icon: Icon, label }) => (
          <button 
            key={screen}
            onClick={() => setCurrentScreen(screen)} 
            className="flex flex-col items-center p-2 transition-all hover:scale-110"
          >
            <Icon className={`w-6 h-6 ${currentScreen === screen ? 'text-green-600' : 'text-gray-400'}`} />
            <span className={`text-xs mt-1 ${currentScreen === screen ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  if (currentScreen === 'onboarding1') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="mb-8 animate-bounce">
              <GagnejelLogo size="large" variant="white" />
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
              <div className="text-6xl mb-4 animate-pulse">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-3">Paris Sportifs Web3</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Pariez sur la Lutte, le Foot, le Basket, le MMA et plus encore.
                Créez des groupes illimités avec vos amis!
              </p>
            </div>

            <div className="w-full space-y-4">
              {[
                { icon: Shield, title: 'Blockchain Sécurisée', subtitle: 'Transactions en USDT' },
                { icon: Users, title: 'Groupes Illimités', subtitle: 'Pariez avec vos amis' },
                { icon: Trophy, title: 'Système de Niveaux', subtitle: 'Gagnez XP et badges' }
              ].map(({ icon: Icon, title, subtitle }, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 border border-white/20">
                  <div className="bg-yellow-400 rounded-full p-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{title}</p>
                    <p className="text-white/80 text-xs">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('phoneInput')}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Commencer
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </MobileContainer>
    );
  }

  if (currentScreen === 'phoneInput') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white p-6">
          <button onClick={() => setCurrentScreen('onboarding1')} className="self-start mb-8">
            <ArrowLeft className="w-6 h-6 text-green-800" />
          </button>

          <div className="flex-1">
            <div className="mb-8"><GagnejelLogo /></div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">Votre numéro</h2>
            <p className="text-green-700 mb-8">Entrez votre numéro de téléphone pour continuer</p>

            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="77 123 45 67"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">Vous recevrez un code de vérification par SMS</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setCurrentScreen('otpVerification')}
            disabled={phoneNumber.length < 9}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            Continuer
          </button>
        </div>
      </MobileContainer>
    );
  }

  if (currentScreen === 'otpVerification') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white p-6">
          <button onClick={() => setCurrentScreen('phoneInput')} className="self-start mb-8">
            <ArrowLeft className="w-6 h-6 text-green-800" />
          </button>

          <div className="flex-1">
            <div className="mb-8"><GagnejelLogo /></div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">Code de vérification</h2>
            <p className="text-green-700 mb-8">Entrez le code envoyé au +221 {phoneNumber}</p>

            <div className="flex gap-3 mb-8">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none"
                />
              ))}
            </div>

            <button className="text-green-600 font-semibold hover:underline">Renvoyer le code</button>
          </div>

          <button 
            onClick={() => setCurrentScreen('home')}
            disabled={otpCode.some(d => !d)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            Vérifier
          </button>
        </div>
      </MobileContainer>
    );
  }

  // HOME SCREEN - Continuons avec le reste...
  if (currentScreen === 'home') {
    const filteredMatches = selectedSport === 'all' ? matches : matches.filter(m => m.sport === selectedSport);

    return (
      <MobileContainer>
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <GagnejelLogo variant="white" />
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowLeaderboard(true)}
                  className="bg-white/20 backdrop-blur-xl rounded-full p-2 hover:scale-110 transition-all"
                >
                  <Trophy className="w-5 h-5 text-white" />
                </button>
                <button className="bg-white/20 backdrop-blur-xl rounded-full p-2 hover:scale-110 transition-all">
                  <Bell className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getCurrentLevel().icon}</div>
                  <div>
                    <p className="text-white font-bold text-lg">{getCurrentLevel().name}</p>
                    <p className="text-white/80 text-sm">{userXP} / {nextLevelXP} XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-xs">Solde</p>
                  <p className="text-white font-bold text-xl">${walletBalance.toFixed(2)}</p>
                  <p className="text-white/60 text-xs">USDT</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {sports.map(sport => (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedSport === sport.id
                      ? `${sport.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="space-y-4">
              {filteredMatches.map((match, index) => (
                <div 
                  key={match.id}
                  onClick={() => {
                    setSelectedMatch(match);
                    setCurrentScreen('matchDetails');
                  }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-2 border-transparent hover:border-green-500"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getSportIcon(match.sport)}</span>
                        <span className="text-xs font-semibold text-gray-600">{match.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-orange-600">{match.closesIn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.logo1}</div>
                        <p className="font-bold text-green-900">{match.team1}</p>
                        <div className="mt-2 bg-green-100 rounded-lg px-3 py-1 inline-block">
                          <span className="text-green-700 font-bold">{match.odds1}</span>
                        </div>
                      </div>

                      <div className="px-4">
                        <div className="text-2xl font-black text-gray-400">VS</div>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.logo2}</div>
                        <p className="font-bold text-green-900">{match.team2}</p>
                        <div className="mt-2 bg-blue-100 rounded-lg px-3 py-1 inline-block">
                          <span className="text-blue-700 font-bold">{match.odds2}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{match.date} à {match.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{match.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-around mt-3 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Paris</p>
                        <p className="font-bold text-green-900">{match.totalBets}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Cagnotte</p>
                        <p className="font-bold text-green-900">${match.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowCreateGroup(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="font-bold">Créer un groupe</span>
              </button>
              <button 
                onClick={() => setCurrentScreen('groups')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg"
              >
                <Users className="w-5 h-5" />
                <span className="font-bold">Mes groupes</span>
              </button>
            </div>
          </div>

          <FooterNav />
        </div>

        {showLeaderboard && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black">🏆 Leaderboard</h3>
                  <button 
                    onClick={() => setShowLeaderboard(false)}
                    className="bg-white/20 rounded-full p-2 hover:scale-110 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">Top parieurs de la semaine</p>
              </div>

              <div className="p-4 overflow-y-auto max-h-96">
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div 
                      key={player.rank}
                      className={`rounded-xl p-4 flex items-center gap-4 ${
                        player.username === 'Vous' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className={`text-2xl font-black ${
                        player.rank === 1 ? 'text-yellow-500' :
                        player.rank === 2 ? 'text-gray-400' :
                        player.rank === 3 ? 'text-orange-600' : 'text-gray-400'
                      }`}>
                        #{player.rank}
                      </div>
                      
                      <div className="text-3xl">{player.avatar}</div>
                      
                      <div className="flex-1">
                        <p className="font-bold text-green-900">{player.username}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{player.xp} XP</span>
                          <span>•</span>
                          <span>{player.wins} wins</span>
                          <span>•</span>
                          <span className="text-green-600 font-semibold">{player.winRate}%</span>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        levels.find(l => l.name === player.level)?.bgColor
                      } ${levels.find(l => l.name === player.level)?.color}`}>
                        {player.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {showCreateGroup && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black">Créer un groupe</h3>
                  <button 
                    onClick={() => setShowCreateGroup(false)}
                    className="bg-white/20 rounded-full p-2 hover:scale-110 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">Invitez vos amis à parier ensemble</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du groupe</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ex: Les Champions 🏆"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Match</label>
                  <select 
                    value={selectedMatch?.id || ''}
                    onChange={(e) => setSelectedMatch(matches.find(m => m.id === parseInt(e.target.value)))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none"
                  >
                    <option value="">Sélectionnez un match</option>
                    {matches.map(match => (
                      <option key={match.id} value={match.id}>
                        {match.team1} vs {match.team2}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre max de participants</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['unlimited', '5', '10', '20'].map(option => (
                      <button
                        key={option}
                        onClick={() => setGroupMaxPlayers(option)}
                        className={`py-3 rounded-xl font-bold transition-all ${
                          groupMaxPlayers === option
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option === 'unlimited' ? '∞' : option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    Le groupe se fermera automatiquement 30 minutes avant le début du match
                  </p>
                </div>

                <button 
                  onClick={handleCreateGroup}
                  disabled={!groupName || !selectedMatch}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50"
                >
                  Créer le groupe
                </button>
              </div>
            </div>
          </div>
        )}
      </MobileContainer>
    );
  }

  // Je vais continuer dans un prochain message avec les autres écrans...
  return null;
};

export default GagneJelV2;

  // MATCH DETAILS SCREEN
  if (currentScreen === 'matchDetails' && selectedMatch) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <button onClick={() => setCurrentScreen('home')} className="mb-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center justify-between text-white mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getSportIcon(selectedMatch.sport)}</span>
                <span className="text-sm font-semibold">{selectedMatch.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full px-3 py-1">
                <Clock className="w-4 h-4 text-orange-300" />
                <span className="text-sm font-bold">Ferme dans {selectedMatch.closesIn}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <div className="text-5xl mb-3">{selectedMatch.logo1}</div>
                  <p className="font-bold text-white text-lg">{selectedMatch.team1}</p>
                </div>
                
                <div className="px-6">
                  <div className="text-2xl font-black text-white/60">VS</div>
                </div>

                <div className="flex-1 text-center">
                  <div className="text-5xl mb-3">{selectedMatch.logo2}</div>
                  <p className="font-bold text-white text-lg">{selectedMatch.team2}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/20 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedMatch.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMatch.time}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedMatch.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <h3 className="text-xl font-black text-green-900 mb-4">Choisissez votre type de pari</h3>
            
            <div className="space-y-3">
              {betTypes.map((type, index) => (
                <div 
                  key={type.id}
                  onClick={() => {
                    setSelectedBetType(type);
                    setCurrentScreen('placeBet');
                  }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border-2 border-transparent hover:border-green-500"
                >
                  <div className={`bg-gradient-to-r ${type.color} p-4`}>
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{type.icon}</span>
                        <div>
                          <p className="font-black text-lg">{type.name}</p>
                          <p className="text-white/90 text-sm">{type.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-around text-center">
                      <div>
                        <p className="text-xs text-gray-500">Min Bet</p>
                        <p className="font-bold text-green-900">${type.minBet}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Multiplicateur</p>
                        <p className="font-bold text-green-900">x{type.multiplier}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Joueurs</p>
                        <p className="font-bold text-green-900">{type.players}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
              <h4 className="font-bold text-green-900 mb-3">Statistiques en temps réel</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total des paris</span>
                  <span className="font-bold text-green-900">{selectedMatch.totalBets}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cagnotte totale</span>
                  <span className="font-bold text-green-900">${selectedMatch.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cote {selectedMatch.team1}</span>
                  <span className="font-bold text-green-600">{selectedMatch.odds1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cote {selectedMatch.team2}</span>
                  <span className="font-bold text-blue-600">{selectedMatch.odds2}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // PLACE BET SCREEN
  if (currentScreen === 'placeBet' && selectedBetType && selectedMatch) {
    const potentialWin = betAmount && selectedTeam ? (parseFloat(betAmount) * (selectedTeam === 1 ? selectedMatch.odds1 : selectedMatch.odds2)).toFixed(2) : '0.00';
    const xpGain = betAmount ? Math.floor(parseFloat(betAmount) * 0.5) : 0;

    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <button onClick={() => setCurrentScreen('matchDetails')} className="mb-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-3 text-white mb-3">
                <span className="text-3xl">{selectedBetType.icon}</span>
                <div>
                  <p className="font-black text-lg">{selectedBetType.name}</p>
                  <p className="text-white/90 text-sm">{selectedMatch.team1} vs {selectedMatch.team2}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Clock className="w-4 h-4" />
                <span>Ferme dans {selectedMatch.closesIn}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Votre prédiction</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedTeam(1)}
                  className={`rounded-xl p-4 transition-all ${
                    selectedTeam === 1
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-2">{selectedMatch.logo1}</div>
                  <p className="font-bold text-sm">{selectedMatch.team1}</p>
                  <p className={`text-xs mt-1 ${selectedTeam === 1 ? 'text-white/90' : 'text-gray-500'}`}>
                    Cote: {selectedMatch.odds1}
                  </p>
                </button>
                <button 
                  onClick={() => setSelectedTeam(2)}
                  className={`rounded-xl p-4 transition-all ${
                    selectedTeam === 2
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-2">{selectedMatch.logo2}</div>
                  <p className="font-bold text-sm">{selectedMatch.team2}</p>
                  <p className={`text-xs mt-1 ${selectedTeam === 2 ? 'text-white/90' : 'text-gray-500'}`}>
                    Cote: {selectedMatch.odds2}
                  </p>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Montant du pari (USDT)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="0.00"
                  min={selectedBetType.minBet}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-bold focus:border-green-600 focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Mise minimum: ${selectedBetType.minBet} USDT</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-2">Montants rapides</p>
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount.toString())}
                    className="py-3 bg-gray-100 hover:bg-green-100 rounded-xl font-bold text-gray-700 hover:text-green-700 transition-all"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 border-2 border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-3">Récapitulatif</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mise</span>
                  <span className="font-bold text-gray-900">${betAmount || '0.00'} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cote</span>
                  <span className="font-bold text-gray-900">
                    {selectedTeam ? (selectedTeam === 1 ? selectedMatch.odds1 : selectedMatch.odds2) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">XP à gagner</span>
                  <span className="font-bold text-green-600">+{xpGain} XP</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Gain potentiel</span>
                  <span className="font-black text-green-600 text-lg">${potentialWin} USDT</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900">
                Votre pari sera verrouillé 30 minutes avant le début du match
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border-t">
            <button 
              onClick={handlePlaceBet}
              disabled={!betAmount || !selectedTeam || parseFloat(betAmount) < selectedBetType.minBet || parseFloat(betAmount) > walletBalance}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer le pari
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // GROUPS SCREEN
  if (currentScreen === 'groups') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-white">Mes Groupes</h2>
              <button 
                onClick={() => setShowCreateGroup(true)}
                className="bg-white/20 backdrop-blur-xl rounded-full p-3 hover:scale-110 transition-all"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
            <p className="text-white/90">Gérez vos groupes de paris</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            {betGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Users className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">Aucun groupe pour le moment</p>
                <button 
                  onClick={() => setShowCreateGroup(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
                >
                  Créer mon premier groupe
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {betGroups.map((group, index) => {
                  const match = matches.find(m => m.id === group.matchId);
                  return (
                    <div 
                      key={group.id}
                      onClick={() => {
                        setSelectedGroup(group);
                        setCurrentScreen('groupChat');
                      }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500"
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-t-2xl">
                        <div className="flex items-center justify-between text-white mb-2">
                          <h3 className="font-bold text-lg">{group.name}</h3>
                          {group.creator === 'Vous' && (
                            <span className="bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full text-xs font-semibold">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-white/90 text-sm">{match?.team1} vs {match?.team2}</p>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {group.members} {group.maxMembers ? `/ ${group.maxMembers}` : 'participants'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-bold text-orange-600">{group.closesIn}</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Cagnotte totale</span>
                            <span className="font-bold text-green-700 text-lg">${group.totalPool.toFixed(2)}</span>
                          </div>
                        </div>

                        {group.chat.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-semibold">Dernier message</span>
                            </div>
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">{group.chat[group.chat.length - 1].user}:</span>{' '}
                              {group.chat[group.chat.length - 1].message}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <FooterNav />
        </div>
      </MobileContainer>
    );
  }

  // GROUP CHAT SCREEN
  if (currentScreen === 'groupChat' && selectedGroup) {
    const match = matches.find(m => m.id === selectedGroup.matchId);

    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <button onClick={() => setCurrentScreen('groups')} className="mb-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <h3 className="font-bold text-white text-lg mb-2">{selectedGroup.name}</h3>
              <p className="text-white/90 text-sm mb-3">{match?.team1} vs {match?.team2}</p>
              <div className="flex items-center justify-between text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{selectedGroup.members} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-300" />
                  <span>Ferme dans {selectedGroup.closesIn}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-3">
              {selectedGroup.chat.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.user === 'Vous' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${
                    msg.user === 'Vous' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                      : 'bg-white text-gray-900'
                  } rounded-2xl p-3 shadow-md`}>
                    {msg.user !== 'Vous' && (
                      <p className="font-bold text-xs mb-1 text-gray-500">{msg.user}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.user === 'Vous' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-xl hover:scale-110 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // WALLET SCREEN - Continuons...
  if (currentScreen === 'wallet') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h2 className="text-2xl font-black text-white mb-4">Mon Wallet</h2>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Solde disponible</p>
              <p className="text-4xl font-black text-white mb-1">${walletBalance.toFixed(2)}</p>
              <p className="text-white/60 text-sm">USDT (Tether)</p>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/80 text-xs mb-1">Adresse du wallet</p>
                <div className="flex items-center gap-2">
                  <p className="text-white font-mono text-sm">{walletAddress}</p>
                  <button className="hover:scale-110 transition-all">
                    <Copy className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => setShowWalletModal('deposit')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 hover:scale-105 transition-all shadow-lg"
              >
                <PlusCircle className="w-8 h-8 mb-2 mx-auto" />
                <p className="font-bold">Déposer</p>
              </button>
              <button 
                onClick={() => setShowWalletModal('withdraw')}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 hover:scale-105 transition-all shadow-lg"
              >
                <MinusCircle className="w-8 h-8 mb-2 mx-auto" />
                <p className="font-bold">Retirer</p>
              </button>
            </div>

            <h3 className="font-bold text-green-900 mb-4">Transactions récentes</h3>
            <div className="space-y-3">
              {[
                { type: 'win', amount: 100, date: '2025-02-01', desc: 'Gain Pari DUO' },
                { type: 'bet', amount: -50, date: '2025-02-01', desc: 'Mise Pari DUO' },
                { type: 'deposit', amount: 200, date: '2025-01-30', desc: 'Dépôt USDT' },
                { type: 'withdraw', amount: -150, date: '2025-01-28', desc: 'Retrait USDT' }
              ].map((tx, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${
                      tx.type === 'win' ? 'bg-green-100' :
                      tx.type === 'deposit' ? 'bg-blue-100' :
                      tx.type === 'withdraw' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      {tx.type === 'win' ? <Trophy className="w-5 h-5 text-green-600" /> :
                       tx.type === 'deposit' ? <PlusCircle className="w-5 h-5 text-blue-600" /> :
                       tx.type === 'withdraw' ? <MinusCircle className="w-5 h-5 text-orange-600" /> :
                       <DollarSign className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{tx.desc}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-gray-700'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <ShieldIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-blue-900 mb-1">Sécurisé par la Blockchain</p>
                  <p className="text-sm text-blue-700">
                    Toutes vos transactions sont cryptées et sécurisées sur la blockchain Ethereum
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FooterNav />
        </div>

        {showWalletModal && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className={`${
                showWalletModal === 'deposit' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                  : 'bg-gradient-to-r from-orange-600 to-red-600'
              } p-6 text-white rounded-t-2xl`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black">
                    {showWalletModal === 'deposit' ? 'Déposer' : 'Retirer'}
                  </h3>
                  <button 
                    onClick={() => setShowWalletModal(false)}
                    className="bg-white/20 rounded-full p-2 hover:scale-110 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">
                  {showWalletModal === 'deposit' 
                    ? 'Ajoutez des USDT à votre wallet' 
                    : 'Retirez vos USDT'}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Montant (USDT)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={showWalletModal === 'deposit' ? depositAmount : withdrawAmount}
                      onChange={(e) => showWalletModal === 'deposit' 
                        ? setDepositAmount(e.target.value) 
                        : setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-bold focus:border-green-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 200, 500].map(amount => (
                    <button
                      key={amount}
                      onClick={() => showWalletModal === 'deposit' 
                        ? setDepositAmount(amount.toString()) 
                        : setWithdrawAmount(amount.toString())}
                      className="py-3 bg-gray-100 hover:bg-green-100 rounded-xl font-bold text-gray-700 hover:text-green-700 transition-all"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {showWalletModal === 'withdraw' && (
                  <div className="bg-orange-50 rounded-xl p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-900">
                      Les retraits sont traités sous 24h. Frais de réseau: 0.5 USDT
                    </p>
                  </div>
                )}

                <button 
                  onClick={() => {
                    if (showWalletModal === 'deposit') {
                      setWalletBalance(prev => prev + parseFloat(depositAmount || 0));
                      setNotification('Dépôt effectué avec succès! 💰');
                    } else {
                      setWalletBalance(prev => prev - parseFloat(withdrawAmount || 0));
                      setNotification('Retrait en cours de traitement! ⏳');
                    }
                    setShowWalletModal(false);
                    setDepositAmount('');
                    setWithdrawAmount('');
                  }}
                  className={`w-full ${
                    showWalletModal === 'deposit'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                      : 'bg-gradient-to-r from-orange-600 to-red-600'
                  } text-white py-4 rounded-xl font-bold hover:scale-105 transition-all`}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </MobileContainer>
    );
  }

  // HISTORY SCREEN
  if (currentScreen === 'history') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
            <h2 className="text-2xl font-black text-white mb-2">Historique</h2>
            <p className="text-white/90">Tous vos paris</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 text-center border-2 border-green-200">
                <p className="text-3xl font-black text-green-700">{betHistory.filter(b => b.status === 'won').length}</p>
                <p className="text-xs text-green-600 font-semibold mt-1">Victoires</p>
              </div>
              <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-xl p-4 text-center border-2 border-red-200">
                <p className="text-3xl font-black text-red-700">{betHistory.filter(b => b.status === 'lost').length}</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Défaites</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 text-center border-2 border-yellow-200">
                <p className="text-3xl font-black text-yellow-700">
                  {betHistory.filter(b => b.status === 'won').length > 0 
                    ? Math.round((betHistory.filter(b => b.status === 'won').length / betHistory.length) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-yellow-600 font-semibold mt-1">Win Rate</p>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-4">Tous les paris</h3>
            <div className="space-y-3">
              {betHistory.map((bet) => (
                <div 
                  key={bet.id}
                  className="bg-white rounded-xl shadow-md p-4 border-2 border-gray-100 hover:border-green-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getSportIcon(bet.sport)}</span>
                      <div>
                        <p className="font-bold text-gray-900">{bet.match}</p>
                        <p className="text-xs text-gray-500">{bet.date}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      bet.status === 'won' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {bet.status === 'won' ? '✓ Gagné' : '✗ Perdu'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-bold text-gray-900 ml-2">{bet.type}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Mise:</span>
                      <span className="font-bold text-gray-900 ml-2">${bet.amount}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">
                        {bet.status === 'won' ? 'Gain:' : 'XP:'}
                      </span>
                      <span className={`font-bold ml-2 ${
                        bet.status === 'won' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {bet.status === 'won' ? `$${bet.winAmount}` : `+${bet.xpEarned} XP`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FooterNav />
        </div>
      </MobileContainer>
    );
  }

  // PROFILE SCREEN
  if (currentScreen === 'profile') {
    const currentLevel = getCurrentLevel();

    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-full p-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Utilisateur</h2>
                <p className="text-white/80">+221 {phoneNumber || '77 123 45 67'}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{currentLevel.icon}</div>
                  <div>
                    <p className="text-white font-black text-xl">{currentLevel.name}</p>
                    <p className="text-white/80 text-sm">{userXP} / {nextLevelXP} XP</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLeaderboard(true)}
                  className="bg-yellow-400 rounded-full p-3 hover:scale-110 transition-all"
                >
                  <Trophy className="w-6 h-6 text-yellow-900" />
                </button>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <h3 className="font-bold text-green-900 mb-3">Mes Badges</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {badges.filter(b => b.unlocked).map((badge) => (
                <div 
                  key={badge.id}
                  className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center border-2 border-yellow-300 hover:scale-105 transition-all"
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-xs font-bold text-gray-800">{badge.name}</p>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-green-900 mb-3">Statistiques</h3>
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total paris</span>
                  <span className="font-bold text-green-900">{betHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Victoires</span>
                  <span className="font-bold text-green-600">{betHistory.filter(b => b.status === 'won').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-bold text-yellow-600">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Groupes créés</span>
                  <span className="font-bold text-purple-600">{betGroups.filter(g => g.creator === 'Vous').length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Parrainage</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Paramètres</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentScreen('onboarding1')}
                className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-600">Déconnexion</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200">
              <h4 className="font-bold text-green-900 mb-2">Code de parrainage</h4>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="font-mono font-bold text-green-900">GAGNE2025</span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-semibold">Copier</span>
                </button>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Partagez et gagnez 10 USDT par parrainage actif 🎁
              </p>
            </div>
          </div>

          <FooterNav />
        </div>
      </MobileContainer>
    );
  }

  return null;
};

export default GagneJelV2;
