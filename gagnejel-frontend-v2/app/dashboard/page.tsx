'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { BottomNav } from '@/components/ui/BottomNav';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Award,
  ChevronRight,
  Zap,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api/client';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [balance, setBalance] = useState(1250.50);
  const [userStats, setUserStats] = useState({
    totalBets: 23,
    wins: 15,
    winRate: 68,
    totalEarnings: 450.75,
  });
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadDashboardData();
    }
  }, [isConnected, address]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger le solde blockchain
      // const balanceRes = await api.getBalance(address!);
      // setBalance(balanceRes.data.balance);

      // Charger les matchs à venir
      // const matchesRes = await api.getUpcomingMatches();
      // setUpcomingMatches(matchesRes.data.slice(0, 3));

      // Pour l'instant, données de test
      setUpcomingMatches([
        {
          id: '1',
          sport: 'Football',
          homeTeam: 'PSG',
          awayTeam: 'OM',
          startTime: new Date(Date.now() + 3600000),
        },
        {
          id: '2',
          sport: 'Basket',
          homeTeam: 'Lakers',
          awayTeam: 'Warriors',
          startTime: new Date(Date.now() + 7200000),
        },
      ]);

    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = () => {
    toast('Fonctionnalité de dépôt à venir! 💰');
  };

  const handleWithdraw = () => {
    toast('Fonctionnalité de retrait à venir! 💸');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue sur Gagne Jël
              </h1>
              <p className="text-gray-600">
                Connectez votre wallet pour commencer à parier
              </p>
            </div>
            
            <div className="mb-6 flex justify-center">
              <WalletConnect />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">🔒</div>
                <p className="text-xs text-gray-600 mt-1">Sécurisé</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">⚡</div>
                <p className="text-xs text-gray-600 mt-1">Rapide</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">🎯</div>
                <p className="text-xs text-gray-600 mt-1">Transparent</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
              <p className="text-green-100 text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        {/* Balance Card */}
        <div className="mb-6">
          <BalanceCard
            balance={balance}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatsCard
            title="Total Paris"
            value={userStats.totalBets}
            icon={<Target className="w-6 h-6" />}
            gradient="from-green-500 to-emerald-500"
          />
          <StatsCard
            title="Victoires"
            value={userStats.wins}
            icon={<Trophy className="w-6 h-6" />}
            gradient="from-yellow-500 to-orange-500"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Win Rate"
            value={`${userStats.winRate}%`}
            icon={<TrendingUp className="w-6 h-6" />}
            gradient="from-emerald-500 to-green-600"
          />
          <StatsCard
            title="Gains"
            value={`${userStats.totalEarnings} USDC`}
            icon={<Award className="w-6 h-6" />}
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader
            title="Actions rapides"
            icon={<Zap className="w-5 h-5" />}
          />
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push('/matches')}
            >
              <Trophy className="w-4 h-4" />
              Parier
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/groups')}
            >
              <Award className="w-4 h-4" />
              Groupes
            </Button>
          </div>
        </Card>

        {/* Upcoming Matches */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardHeader
              title="Matchs à venir"
              subtitle="Placez vos paris maintenant"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/matches')}
            >
              Voir tout
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-24" />
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => router.push(`/matches/${match.id}`)}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 hover:border-green-300 cursor-pointer transition-all card-hover"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="info" size="sm">
                      {match.sport}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {new Date(match.startTime).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{match.homeTeam}</p>
                      <p className="text-sm text-gray-600">vs</p>
                      <p className="font-bold text-gray-900">{match.awayTeam}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">Aucun match disponible</p>
            </div>
          )}
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
