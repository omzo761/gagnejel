'use client';

import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  gradient?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  trend, 
  subtitle,
  gradient = 'from-green-500 to-emerald-500' 
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white shadow-lg`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-bold">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}
