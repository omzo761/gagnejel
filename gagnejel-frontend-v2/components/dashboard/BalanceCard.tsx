'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function BalanceCard({ balance, onDeposit, onWithdraw }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card gradient className="border-2 border-green-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white shadow-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Solde disponible</h3>
            <div className="flex items-center gap-2">
              {showBalance ? (
                <p className="text-3xl font-bold text-gray-900">
                  {balance.toFixed(2)} <span className="text-xl text-gray-600">USDC</span>
                </p>
              ) : (
                <p className="text-3xl font-bold text-gray-900">••••••</p>
              )}
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                {showBalance ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button
          variant="primary"
          size="sm"
          onClick={onDeposit}
          className="flex items-center justify-center gap-2"
        >
          <ArrowDownLeft className="w-4 h-4" />
          Déposer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onWithdraw}
          className="flex items-center justify-center gap-2"
        >
          <ArrowUpRight className="w-4 h-4" />
          Retirer
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-green-200">
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Connexion blockchain sécurisée
        </p>
      </div>
    </Card>
  );
}
