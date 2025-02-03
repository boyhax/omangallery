import React from 'react';
import { FilterType } from '../types';

interface FilterChipProps {
  type: FilterType;
  label: string;
  icon?: React.ElementType;
  isActive: boolean;
  onClick: (type: FilterType) => void;
}

export function FilterChip({ type, label, icon: Icon, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={() => onClick(type)}
      className={`
        px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300
        ${isActive 
          ? 'bg-white text-black shadow-lg scale-105' 
          : 'bg-white/10 text-white hover:bg-white/20'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}