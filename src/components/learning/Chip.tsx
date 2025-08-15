import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const Chip: React.FC<ChipProps> = ({
  children,
  isActive = false,
  onClick,
  variant = 'default',
  size = 'md'
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200 cursor-pointer';
  
  const variants = {
    default: isActive 
      ? 'bg-emerald-600 text-white' 
      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};