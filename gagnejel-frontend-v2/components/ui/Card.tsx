import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function Card({ children, className = '', hover = false, gradient = false }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl shadow-md p-6';
  const hoverClass = hover ? 'card-hover cursor-pointer' : '';
  const gradientClass = gradient ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClass} ${gradientClass} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function CardHeader({ title, subtitle, icon }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {icon && (
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );
}
