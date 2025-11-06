import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Shield, 
  Zap, 
  Home, 
  History, 
  Wallet, 
  User,
  Phone,
  ArrowLeft,
  Trophy,
  TrendingUp,
  Gift,
  Users,
  Settings,
  LogOut,
  Bell,
  Check,
  X,
  DollarSign,
  Star,
  Clock,
  Filter,
  Copy,
  ChevronDown,
  Plus,
  Sparkles,
  Award,
  HelpCircle,
  Lock,
  Globe,
  Volume2,
  CreditCard,
  UserX,
  AlertCircle,
  Eye
} from 'lucide-react';

const GagnejelApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [walletBalance, setWalletBalance] = useState(15000);
  const [betAmount, setBetAmount] = useState('');
  const [selectedBet, setSelectedBet] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawNumber, setWithdrawNumber] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [notification, setNotification] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNumber, setDepositNumber] = useState('');
  const [selectedDepositOperator, setSelectedDepositOperator] = useState('');
  const [selectedFighters, setSelectedFighters] = useState([]);
  const [animateCard, setAnimateCard] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedExistingBet, setSelectedExistingBet] = useState(null);

  // Animation pour les notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Logo Component
  const GagnejelLogo = ({ size = 'normal' }) => {
    const fontSize = size === 'large' ? 'text-5xl' : size === 'normal' ? 'text-3xl' : 'text-xl';
    return (
      <div className={`font-black ${fontSize} tracking-tight`}>
        <span className="text-green-600">Ga</span>
        <span className="text-yellow-400">g</span>
        <span className="text-green-600">neJël</span>
      </div>
    );
  };

  // Paris disponibles entre parieurs
  const bets = [
    { id: 1, name: 'Pari DUO', icon: '👥', minBet: 100, maxWin: 5000, odds: 2.0, description: 'Pariez à 2 parieurs', players: 2 },
    { id: 2, name: 'Pari Triple', icon: '🥉', minBet: 200, maxWin: 15000, odds: 3.0, description: 'Pariez à 3 parieurs', players: 3 },
    { id: 3, name: 'Pari Quatro', icon: '🎯', minBet: 300, maxWin: 30000, odds: 4.0, description: 'Pariez à 4 parieurs', players: 4 },
    { id: 4, name: 'Pari à 5', icon: '⭐', minBet: 500, maxWin: 50000, odds: 5.0, description: 'Pariez à 5 parieurs', players: 5 },
  ];

  // Paris existants sur des combats
  const existingBets = [
    { 
      id: 1, 
      fighter1: 'Modou Lô', 
      fighter2: 'Balla Gaye 2', 
      date: '15 Février 2025',
      time: '20:00',
      totalBets: 142,
      totalAmount: 250000,
      odds1: 1.8,
      odds2: 2.2,
      arena: 'Arène Nationale'
    },
    { 
      id: 2, 
      fighter1: 'Eumeu Sène', 
      fighter2: 'Lac de Guiers', 
      date: '22 Février 2025',
      time: '21:00',
      totalBets: 89,
      totalAmount: 180000,
      odds1: 2.1,
      odds2: 1.9,
      arena: 'Stade Demba Diop'
    },
    { 
      id: 3, 
      fighter1: 'Tapha Tine', 
      fighter2: 'Bombardier', 
      date: '1er Mars 2025',
      time: '20:30',
      totalBets: 67,
      totalAmount: 120000,
      odds1: 1.7,
      odds2: 2.3,
      arena: 'Arène Nationale'
    }
  ];

  const betHistory = [
    { id: 1, date: '2025-01-15', bet: 'Pari DUO - Modou Lô vs Balla Gaye', amount: 500, status: 'won', winAmount: 1000, players: 2 },
    { id: 2, date: '2025-01-14', bet: 'Pari Triple - Combat Royal', amount: 1000, status: 'lost', winAmount: 0, players: 3 },
    { id: 3, date: '2025-01-14', bet: 'Pari Flash - Eumeu Sène', amount: 200, status: 'won', winAmount: 600, players: 1 },
    { id: 4, date: '2025-01-13', bet: 'Pari Quatro - Grand Combat', amount: 300, status: 'won', winAmount: 1200, players: 4 },
    { id: 5, date: '2025-01-12', bet: 'Pari à 5 - Championnat', amount: 500, status: 'lost', winAmount: 0, players: 5 },
  ];

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

  const handlePlaceBet = () => {
    if (betAmount && selectedBet) {
      setWalletBalance(prev => prev - parseInt(betAmount));
      setCurrentScreen('betConfirmation');
      setNotification('Pari placé avec succès!');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount && withdrawNumber && selectedOperator) {
      setWalletBalance(prev => prev - parseInt(withdrawAmount));
      setNotification('Retrait effectué avec succès!');
      setCurrentScreen('home');
    }
  };

  const handleDeposit = () => {
    if (depositAmount && depositNumber && selectedDepositOperator) {
      setWalletBalance(prev => prev + parseInt(depositAmount));
      setNotification('Dépôt effectué avec succès!');
      setCurrentScreen('home');
    }
  };

  const handleCardAnimation = (betId) => {
    setAnimateCard(prev => ({ ...prev, [betId]: true }));
    setTimeout(() => {
      setAnimateCard(prev => ({ ...prev, [betId]: false }));
    }, 500);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setNotification('Compte supprimé avec succès');
    setCurrentScreen('onboarding1');
  };

  // Container pour simuler un écran mobile
  const MobileContainer = ({ children }) => (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 relative overflow-hidden">
      {notification && (
        <div className="absolute top-4 left-4 right-4 bg-green-600 text-white p-3 rounded-lg z-50 shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );

  // Footer Navigation
  const FooterNav = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <button onClick={() => setCurrentScreen('home')} className="flex flex-col items-center p-2 transition-all hover:scale-110">
          <Home className={`w-5 h-5 ${currentScreen === 'home' ? 'text-green-600' : 'text-gray-500'}`} />
          <span className="text-xs mt-1 text-green-900">Accueil</span>
        </button>
        <button onClick={() => setCurrentScreen('history')} className="flex flex-col items-center p-2 transition-all hover:scale-110">
          <History className={`w-5 h-5 ${currentScreen === 'history' ? 'text-green-600' : 'text-gray-500'}`} />
          <span className="text-xs mt-1 text-green-900">Mes Paris</span>
        </button>
        <button onClick={() => setCurrentScreen('withdraw')} className="flex flex-col items-center p-2 transition-all hover:scale-110">
          <Wallet className={`w-5 h-5 ${currentScreen === 'withdraw' ? 'text-green-600' : 'text-gray-500'}`} />
          <span className="text-xs mt-1 text-green-900">Retrait</span>
        </button>
        <button onClick={() => setCurrentScreen('profile')} className="flex flex-col items-center p-2 transition-all hover:scale-110">
          <User className={`w-5 h-5 ${currentScreen === 'profile' ? 'text-green-600' : 'text-gray-500'}`} />
          <span className="text-xs mt-1 text-green-900">Profil</span>
        </button>
      </div>
    </div>
  );

  // Écrans Onboarding
  if (currentScreen === 'onboarding1') {
    return (
      <MobileContainer>
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-green-600 to-green-700">
          <div className="mb-8">
            <GagnejelLogo size="large" />
          </div>
          <p className="text-xl text-white mb-4 animate-fade-in">Parie. Gagne. Prends.</p>
          <p className="text-sm text-white/80 mb-8 animate-fade-in">Spécialiste des paris sur la lutte sénégalaise</p>
          <button 
            onClick={() => setCurrentScreen('onboarding2')}
            className="bg-white text-green-600 px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-bounce"
          >
            Commencer
          </button>
        </div>
      </MobileContainer>
    );
  }

  if (currentScreen === 'onboarding2') {
    return (
      <MobileContainer>
        <div className="flex flex-col items-center justify-center h-full p-8 bg-white">
          <div className="mb-8 animate-bounce">
            <div className="bg-green-100 rounded-full p-8">
              <Users className="w-24 h-24 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
            Pariez entre amis
          </h2>
          <p className="text-green-800 text-center mb-12">
            Créez ou rejoignez des groupes de paris sur vos combats de lutte favoris
          </p>
          <div className="flex gap-2 mb-8">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <button 
            onClick={() => setCurrentScreen('onboarding3')}
            className="bg-green-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg w-full max-w-xs hover:scale-105 transition-all"
          >
            Suivant
          </button>
        </div>
      </MobileContainer>
    );
  }

  if (currentScreen === 'onboarding3') {
    return (
      <MobileContainer>
        <div className="flex flex-col items-center justify-center h-full p-8 bg-white">
          <div className="mb-8 flex gap-4">
            <div className="bg-green-100 rounded-full p-6 animate-bounce" style={{ animationDelay: '0.1s' }}>
              <Shield className="w-16 h-16 text-green-600" />
            </div>
            <div className="bg-green-100 rounded-full p-6 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Zap className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
            Sécurisé et Rapide
          </h2>
          <p className="text-green-800 text-center mb-12">
            Tes paiements sont sécurisés avec Wave et Orange Money. Gains instantanés!
          </p>
          <div className="flex gap-2 mb-8">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-green-600 rounded-full animate-pulse"></div>
          </div>
          <button 
            onClick={() => setCurrentScreen('login')}
            className="bg-green-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg w-full max-w-xs hover:scale-105 transition-all"
          >
            Se connecter
          </button>
        </div>
      </MobileContainer>
    );
  }

  // Écran de connexion
  if (currentScreen === 'login') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full p-6 bg-white">
          <div className="flex flex-col items-center mb-8 mt-8">
            <GagnejelLogo size="normal" />
            <h2 className="text-xl font-bold text-green-900 mt-4">Connexion</h2>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <label className="block text-green-800 mb-2">Numéro de téléphone</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-green-800 mr-2">+221</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="77 123 45 67"
                  className="flex-1 outline-none text-green-900"
                />
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentScreen('otp')}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Recevoir un code
            </button>
            
            <p className="text-center text-green-700 text-sm mt-6">
              En continuant, vous acceptez nos conditions d'utilisation
            </p>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Écran OTP
  if (currentScreen === 'otp') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full p-6 bg-white">
          <div className="flex items-center mb-8 mt-8">
            <button onClick={() => setCurrentScreen('login')}>
              <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
            </button>
            <h2 className="text-2xl font-bold text-green-900">Vérification</h2>
          </div>
          
          <div className="flex-1">
            <p className="text-green-800 mb-8">
              Entrez le code envoyé au +221 {phoneNumber}
            </p>
            
            <div className="flex justify-between mb-8">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none transition-all text-green-900"
                  maxLength="1"
                />
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentScreen('home')}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Valider
            </button>
            
            <p className="text-center text-green-700 text-sm mt-6">
              Renvoyer le code dans 30s
            </p>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Écran d'accueil
  if (currentScreen === 'home') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gray-50">
          {/* Header avec solde */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-b-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <GagnejelLogo size="small" />
              <button onClick={() => setCurrentScreen('notifications')} className="animate-pulse">
                <Bell className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <p className="text-white/80 text-sm mb-1">Solde disponible</p>
              <p className="text-3xl font-bold text-white animate-pulse">{walletBalance.toLocaleString()} CFA</p>
              <button 
                onClick={() => setCurrentScreen('deposit')}
                className="mt-3 bg-white text-green-600 px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-all"
              >
                Déposer
              </button>
            </div>
          </div>

          {/* Pari Flash */}
          <div className="px-4 mt-4">
            <button 
              onClick={() => {
                setSelectedBet({ id: 'flash', name: 'Pari Flash', icon: '⚡', minBet: 50, maxWin: 2000, odds: 3.0, description: 'Pari rapide sur le prochain combat' });
                setCurrentScreen('betDetail');
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 shadow-lg flex items-center justify-between animate-pulse hover:scale-105 transition-all"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                <div className="text-left">
                  <p className="font-bold text-lg">Pari Flash!</p>
                  <p className="text-sm opacity-90">Prochain combat dans 5 min</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Liste des paris */}
          <div className="flex-1 overflow-y-auto p-4 pb-20">
            {/* Combats disponibles */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Combats disponibles</h3>
              <div className="space-y-2">
                {existingBets.slice(0, 2).map((combat) => (
                  <button
                    key={combat.id}
                    onClick={() => {
                      setSelectedExistingBet(combat);
                      setCurrentScreen('existingBetDetail');
                    }}
                    className="w-full bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-semibold text-green-900 text-sm">
                          {combat.fighter1} vs {combat.fighter2}
                        </p>
                        <p className="text-xs text-green-600">{combat.date} • {combat.time}</p>
                        <p className="text-xs text-gray-500">{combat.totalBets} parieurs • {(combat.totalAmount/1000).toFixed(0)}k CFA</p>
                      </div>
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Types de paris groupés */}
            <h3 className="text-lg font-semibold text-green-900 mb-3">Créer un groupe de paris</h3>
            <div className="space-y-3">
              {bets.map((bet) => (
                <div 
                  key={bet.id} 
                  className={`bg-white rounded-xl p-4 shadow-sm transition-all hover:shadow-lg hover:scale-105 ${
                    animateCard[bet.id] ? 'animate-pulse' : ''
                  }`}
                  onMouseEnter={() => handleCardAnimation(bet.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl animate-bounce" style={{ animationDelay: `${bet.id * 0.1}s` }}>
                        {bet.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">{bet.name}</p>
                        <p className="text-sm text-green-700">{bet.description}</p>
                        <p className="text-xs text-green-600">Min: {bet.minBet} CFA • Cote: {bet.odds}x</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedBet(bet);
                        setCurrentScreen('betDetail');
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:scale-110 transition-all"
                    >
                      Créer
                    </button>
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

  // Détail d'un combat existant
  if (currentScreen === 'existingBetDetail' && selectedExistingBet) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <button onClick={() => setCurrentScreen('home')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Détail du combat</h2>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Info combat */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-white mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold mb-1">{selectedExistingBet.fighter1}</p>
                  <div className="bg-white/20 rounded-full px-3 py-1 inline-block">
                    <span className="text-sm">Cote: {selectedExistingBet.odds1}</span>
                  </div>
                </div>
                <div className="text-3xl mx-4">⚔️</div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold mb-1">{selectedExistingBet.fighter2}</p>
                  <div className="bg-white/20 rounded-full px-3 py-1 inline-block">
                    <span className="text-sm">Cote: {selectedExistingBet.odds2}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/20 pt-3 mt-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedExistingBet.date} • {selectedExistingBet.time}</span>
                </div>
                <div className="text-center text-sm opacity-90">
                  📍 {selectedExistingBet.arena}
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-green-900 mb-3">Statistiques du pari</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Total des parieurs</span>
                  <span className="font-semibold text-green-900">{selectedExistingBet.totalBets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Montant total misé</span>
                  <span className="font-semibold text-green-900">{selectedExistingBet.totalAmount.toLocaleString()} CFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Mise moyenne</span>
                  <span className="font-semibold text-green-900">
                    {Math.round(selectedExistingBet.totalAmount / selectedExistingBet.totalBets).toLocaleString()} CFA
                  </span>
                </div>
              </div>
            </div>

            {/* Choix du lutteur */}
            <div className="mb-6">
              <label className="block text-green-800 mb-3">Choisissez votre lutteur</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 transition-all">
                  <p className="font-semibold text-green-900">{selectedExistingBet.fighter1}</p>
                  <p className="text-sm text-green-600">Cote: {selectedExistingBet.odds1}</p>
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 transition-all">
                  <p className="font-semibold text-green-900">{selectedExistingBet.fighter2}</p>
                  <p className="text-sm text-green-600">Cote: {selectedExistingBet.odds2}</p>
                </button>
              </div>
            </div>

            {/* Montant */}
            <div className="mb-6">
              <label className="block text-green-800 mb-2">Montant à parier</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Entrez le montant"
                  className="flex-1 outline-none text-green-900"
                />
                <span className="text-green-800">CFA</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceBet}
              disabled={!betAmount || betAmount < 100}
              className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all hover:scale-105 ${
                betAmount && betAmount >= 100
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              Placer le pari
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Écran de dépôt
  if (currentScreen === 'deposit') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <button onClick={() => setCurrentScreen('home')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Déposer des fonds</h2>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="bg-green-50 rounded-xl p-4 mb-6 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <p className="text-green-900 font-semibold">Dépôt rapide et sécurisé</p>
              </div>
              <p className="text-sm text-green-700">Les fonds seront disponibles instantanément</p>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Montant à déposer</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Montant"
                  className="flex-1 outline-none text-green-900"
                />
                <span className="text-green-800">CFA</span>
              </div>
              <div className="flex gap-2 mt-2">
                {[500, 1000, 5000, 10000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount.toString())}
                    className="flex-1 py-1 px-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-all"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Opérateur</label>
              <div className="space-y-3">
                {['Wave', 'Orange Money'].map((op) => (
                  <button
                    key={op}
                    onClick={() => setSelectedDepositOperator(op)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      selectedDepositOperator === op
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-900">{op}</span>
                      {selectedDepositOperator === op && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Numéro de paiement</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={depositNumber}
                  onChange={(e) => setDepositNumber(e.target.value)}
                  placeholder="77 123 45 67"
                  className="flex-1 outline-none text-green-900"
                />
              </div>
            </div>

            <button 
              onClick={handleDeposit}
              disabled={!depositAmount || !selectedDepositOperator || !depositNumber}
              className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all hover:scale-105 ${
                depositAmount && selectedDepositOperator && depositNumber
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              Confirmer le dépôt
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Détail d'un pari groupé
  if (currentScreen === 'betDetail' && selectedBet) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <button onClick={() => setCurrentScreen('home')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Créer un groupe de pari</h2>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3 animate-bounce">{selectedBet.icon}</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">{selectedBet.name}</h3>
              <p className="text-green-700">{selectedBet.description}</p>
            </div>

            {/* Info du groupe */}
            {selectedBet.id !== 'flash' && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <p className="font-semibold text-green-900">Comment ça marche ?</p>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Créez un groupe de {selectedBet.players} parieurs</li>
                  <li>• Chaque parieur mise le même montant</li>
                  <li>• Le gagnant remporte la cagnotte x{selectedBet.odds}</li>
                  <li>• Partagez le code pour inviter vos amis</li>
                </ul>
              </div>
            )}

            {/* Sélection du combat */}
            <div className="mb-6">
              <label className="block text-green-800 mb-2">Choisir le combat</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-lg text-green-900 focus:border-green-600">
                <option>Modou Lô vs Balla Gaye 2 - 15 Fév</option>
                <option>Eumeu Sène vs Lac de Guiers - 22 Fév</option>
                <option>Tapha Tine vs Bombardier - 1er Mars</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-green-700">Mise par parieur</span>
                <span className="font-semibold text-green-900">{selectedBet.minBet} CFA min</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-green-700">Nombre de parieurs</span>
                <span className="font-semibold text-green-900">{selectedBet.players} personnes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Gain pour le gagnant</span>
                <span className="font-semibold text-green-600">x{selectedBet.odds}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Montant par parieur</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="Entrez le montant"
                  className="flex-1 outline-none text-green-900"
                />
                <span className="text-green-800">CFA</span>
              </div>
              {betAmount && (
                <div className="mt-2 text-sm">
                  <p className="text-green-600">Cagnotte totale: {(betAmount * selectedBet.players).toLocaleString()} CFA</p>
                  <p className="text-green-600 animate-pulse">Gain potentiel: {(betAmount * selectedBet.odds).toLocaleString()} CFA</p>
                </div>
              )}
            </div>

            <button 
              onClick={handlePlaceBet}
              disabled={!betAmount || betAmount < selectedBet.minBet}
              className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all hover:scale-105 ${
                betAmount && betAmount >= selectedBet.minBet
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              Créer le groupe
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Confirmation de pari
  if (currentScreen === 'betConfirmation' && selectedBet) {
    const isWin = Math.random() > 0.5;
    return (
      <MobileContainer>
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
          <div className={`rounded-full p-8 mb-6 ${isWin ? 'bg-green-100 animate-bounce' : 'bg-red-100 animate-pulse'}`}>
            {isWin ? (
              <Trophy className="w-24 h-24 text-green-600" />
            ) : (
              <X className="w-24 h-24 text-red-600" />
            )}
          </div>
          
          <h2 className={`text-3xl font-bold mb-4 ${isWin ? 'text-green-600 animate-pulse' : 'text-red-600'}`}>
            {isWin ? 'Félicitations!' : 'Dommage!'}
          </h2>
          
          <p className="text-green-800 text-center mb-6">
            {isWin 
              ? `Vous avez gagné ${(parseInt(betAmount) * selectedBet.odds).toLocaleString()} CFA!`
              : `Vous avez perdu ${parseInt(betAmount).toLocaleString()} CFA. Tentez à nouveau votre chance!`
            }
          </p>

          {isWin && (
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}

          {selectedBet.players && (
            <div className="bg-gray-50 rounded-xl p-4 w-full mb-6">
              <p className="text-sm text-green-700 text-center mb-2">
                Code du groupe: <span className="font-mono font-bold">BET2025XY</span>
              </p>
              <p className="text-xs text-green-600 text-center">
                Partagez ce code avec {selectedBet.players - 1} ami(s)
              </p>
            </div>
          )}

          <div className="flex gap-3 w-full">
            {isWin ? (
              <button 
                onClick={() => setCurrentScreen('withdraw')}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all"
              >
                Retirer mes gains
              </button>
            ) : (
              <button 
                onClick={() => setCurrentScreen('betDetail')}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all"
              >
                Parier à nouveau
              </button>
            )}
            <button 
              onClick={() => setCurrentScreen('home')}
              className="flex-1 bg-gray-200 text-green-800 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Écran de retrait
  if (currentScreen === 'withdraw') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-green-900">Retrait</h2>
            <p className="text-sm text-green-700 mt-1">
              Solde disponible: {walletBalance.toLocaleString()} CFA
            </p>
          </div>

          <div className="flex-1 p-6">
            <div className="mb-6">
              <label className="block text-green-800 mb-2">Montant à retirer</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Montant"
                  className="flex-1 outline-none text-green-900"
                />
                <span className="text-green-800">CFA</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Opérateur</label>
              <div className="space-y-3">
                {['Wave', 'Orange Money', 'Free Money'].map((op) => (
                  <button
                    key={op}
                    onClick={() => setSelectedOperator(op)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                      selectedOperator === op
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-green-900">{op}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-green-800 mb-2">Numéro de retrait</label>
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 focus-within:border-green-600 transition-all">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={withdrawNumber}
                  onChange={(e) => setWithdrawNumber(e.target.value)}
                  placeholder="77 123 45 67"
                  className="flex-1 outline-none text-green-900"
                />
              </div>
            </div>

            <button 
              onClick={handleWithdraw}
              disabled={!withdrawAmount || !selectedOperator || !withdrawNumber}
              className={`w-full py-4 rounded-lg font-semibold shadow-lg transition-all hover:scale-105 ${
                withdrawAmount && selectedOperator && withdrawNumber
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              Confirmer le retrait
            </button>
          </div>

          <FooterNav />
        </div>
      </MobileContainer>
    );
  }

  // Historique des paris
  if (currentScreen === 'history') {
    const filteredHistory = betHistory.filter(bet => {
      if (historyFilter === 'won') return bet.status === 'won';
      if (historyFilter === 'lost') return bet.status === 'lost';
      return true;
    });

    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gray-50">
          <div className="bg-white p-6 border-b">
            <h2 className="text-xl font-bold text-green-900 mb-4">Mes Paris</h2>
            <div className="flex gap-2">
              {['all', 'won', 'lost'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setHistoryFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    historyFilter === filter
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-green-800'
                  }`}
                >
                  {filter === 'all' ? 'Tous' : filter === 'won' ? 'Gagnés' : 'Perdus'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="space-y-3">
              {filteredHistory.map((bet, index) => (
                <div 
                  key={bet.id} 
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-green-900">{bet.bet}</p>
                      <p className="text-sm text-green-700">{bet.date}</p>
                      {bet.players && (
                        <p className="text-xs text-green-600">{bet.players} parieurs</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bet.status === 'won'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {bet.status === 'won' ? 'Gagné' : 'Perdu'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Mise: {bet.amount} CFA</span>
                    {bet.status === 'won' && (
                      <span className="text-green-600 font-medium animate-pulse">
                        +{bet.winAmount} CFA
                      </span>
                    )}
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

  // Écran de parrainage
  if (currentScreen === 'referral') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-white">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <button onClick={() => setCurrentScreen('profile')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Parrainage</h2>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 rounded-full p-6 inline-block mb-4 animate-bounce">
                <Gift className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Invitez vos amis</h3>
              <p className="text-green-700">Gagnez 500 CFA pour chaque ami qui s'inscrit!</p>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white mb-6">
              <p className="text-sm mb-2">Votre code de parrainage</p>
              <div className="flex items-center justify-between bg-white/20 backdrop-blur rounded-lg p-3">
                <span className="font-mono font-bold text-2xl">GAG2025</span>
                <button className="bg-white text-green-600 p-2 rounded-lg hover:scale-110 transition-all">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-800">Amis parrainés</span>
                  <span className="font-bold text-green-900">12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-800">Gains totaux</span>
                  <span className="font-bold text-green-600 text-xl">6,000 CFA</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:scale-105 transition-all">
              Partager le code
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Écran des paramètres
  if (currentScreen === 'settings') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gray-50">
          <div className="bg-white p-6 border-b">
            <div className="flex items-center">
              <button onClick={() => setCurrentScreen('profile')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Paramètres</h2>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm mb-4">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-green-900">Compte</h3>
              </div>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Informations personnelles</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Sécurité</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Moyens de paiement</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <UserX className="w-5 h-5 text-red-600" />
                  <span className="text-red-600">Supprimer le compte</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-green-900">Préférences</h3>
              </div>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Notifications</span>
                </div>
                <div className="bg-green-600 rounded-full p-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </button>
              <button className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Langue</span>
                </div>
                <span className="text-green-700 text-sm">Français</span>
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Sons</span>
                </div>
                <div className="bg-green-600 rounded-full p-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </button>
            </div>

            <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
              <button className="w-full flex items-center justify-between hover:bg-gray-50 transition-all p-2">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-green-900">Centre d'aide</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Modal de confirmation de suppression */}
          {showDeleteConfirm && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <h3 className="text-lg font-bold text-green-900">Supprimer le compte</h3>
                </div>
                <p className="text-green-700 mb-6">
                  Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 bg-gray-200 text-green-800 rounded-lg font-semibold"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MobileContainer>
    );
  }

  // Profil utilisateur
  if (currentScreen === 'profile') {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gray-50">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-full p-4 animate-pulse">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Utilisateur</h2>
                <p className="text-white/80">+221 {phoneNumber || '77 123 45 67'}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 mt-4">
              <p className="text-white/80 text-sm">Solde wallet</p>
              <p className="text-2xl font-bold text-white animate-pulse">{walletBalance.toLocaleString()} CFA</p>
            </div>
          </div>

          <div className="flex-1 p-4 pb-20">
            <div className="bg-white rounded-xl shadow-sm">
              <button 
                onClick={() => setCurrentScreen('referral')}
                className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-green-900">Parrainage</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-green-900">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentScreen('settings')}
                className="w-full p-4 flex items-center justify-between border-b hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-green-900">Paramètres</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentScreen('onboarding1')}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-600">Déconnexion</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-green-900">Code de parrainage</h3>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="font-mono font-semibold text-green-900">GAG2025</span>
                <button className="text-green-600 hover:scale-110 transition-all">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Partagez ce code et gagnez 500 CFA par parrainage
              </p>
            </div>

            <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-white" />
                <div>
                  <p className="text-white font-semibold">Niveau Bronze</p>
                  <p className="text-white/80 text-xs">12 paris gagnés</p>
                </div>
              </div>
            </div>
          </div>

          <FooterNav />
        </div>
      </MobileContainer>
    );
  }

  // Écran de notifications
  if (currentScreen === 'notifications') {
    const notifications = [
      { id: 1, type: 'win', title: 'Groupe complet!', desc: 'Votre Pari DUO est prêt - Combat ce soir', time: 'Il y a 2h' },
      { id: 2, type: 'promo', title: 'Combat ce soir!', desc: 'Balla Gaye vs Eumeu Sène à 20h', time: 'Il y a 5h' },
      { id: 3, type: 'payment', title: 'Retrait confirmé', desc: 'Retrait de 5000 CFA effectué', time: 'Hier' },
      { id: 4, type: 'flash', title: 'Pari Flash disponible!', desc: 'Combat dans 10 minutes', time: 'Maintenant' },
    ];

    return (
      <MobileContainer>
        <div className="flex flex-col h-full bg-gray-50">
          <div className="bg-white p-6 border-b">
            <div className="flex items-center">
              <button onClick={() => setCurrentScreen('home')}>
                <ArrowLeft className="w-6 h-6 text-green-800 mr-4" />
              </button>
              <h2 className="text-xl font-bold text-green-900">Notifications</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div 
                  key={notif.id} 
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 animate-pulse ${
                      notif.type === 'win' ? 'bg-green-100' :
                      notif.type === 'promo' ? 'bg-blue-100' :
                      notif.type === 'flash' ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      {notif.type === 'win' ? <Trophy className="w-5 h-5 text-green-600" /> :
                       notif.type === 'promo' ? <Bell className="w-5 h-5 text-blue-600" /> :
                       notif.type === 'flash' ? <Sparkles className="w-5 h-5 text-yellow-600" /> :
                       <Wallet className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900">{notif.title}</p>
                      <p className="text-sm text-green-700">{notif.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return null;
};

export default GagnejelApp;