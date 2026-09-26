import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  color?: 'green' | 'blue' | 'red' | 'yellow';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showLabel = true,
  color = 'green'
}) => {
  const colors = {
    green: 'bg-emerald-600',
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-slate-300">
            Progreso
          </span>
        )}
        <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${colors[color]}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};