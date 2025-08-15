import React from 'react';

import * as Icons from 'lucide-react';
import { Topic } from './types';
import { Chip } from './Chip';


interface TopicNodeProps {
  topic: Topic;
  onClick: () => void;
  isUnlocked: boolean;
  position: { x: number; y: number };
}

export const TopicNode: React.FC<TopicNodeProps> = ({
  topic,
  onClick,
  isUnlocked,
  position
}) => {
  const IconComponent = Icons[topic.icon as keyof typeof Icons] as React.ComponentType<any>;
  
  const getStatusColor = () => {
    if (!isUnlocked) return 'bg-slate-600 border-slate-500';
    if (topic.isCompleted) return 'bg-emerald-600 border-emerald-500';
    if (topic.progress > 0) return 'bg-blue-600 border-blue-500';
    return 'bg-slate-700 border-slate-600 hover:bg-slate-600';
  };

  const getLevelColor = () => {
    switch (topic.level) {
      case 'basico': return 'success';
      case 'intermedio': return 'warning';
      case 'avanzado': return 'error';
      default: return 'default';
    }
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div
        onClick={isUnlocked ? onClick : undefined}
        className={`
          relative p-6 rounded-2xl border-2 shadow-lg cursor-pointer transition-all duration-300
          ${getStatusColor()}
          ${isUnlocked ? 'hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}
        `}
      >
        {/* Icono */}
        <div className="flex items-center justify-center w-12 h-12 mb-4 mx-auto">
          {IconComponent && (
            <IconComponent 
              className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-slate-400'}`} 
            />
          )}
        </div>
        
        {/* Título */}
        <h3 className={`text-lg font-semibold text-center mb-2 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
          {topic.title}
        </h3>
        
        {/* Nivel */}
        <div className="flex justify-center mb-3">
          <Chip variant={getLevelColor()} size="sm">
            {topic.level.charAt(0).toUpperCase() + topic.level.slice(1)}
          </Chip>
        </div>
        
        {/* Progreso */}
        {isUnlocked && topic.progress > 0 && (
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
            <div
              className="h-2 rounded-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${topic.progress}%` }}
            />
          </div>
        )}
        
        {/* Estado */}
        <div className="text-center">
          {!isUnlocked && (
            <span className="text-xs text-slate-400">Bloqueado</span>
          )}
          {isUnlocked && topic.isCompleted && (
            <span className="text-xs text-emerald-300">Completado</span>
          )}
          {isUnlocked && !topic.isCompleted && topic.progress > 0 && (
            <span className="text-xs text-blue-300">En progreso</span>
          )}
          {isUnlocked && !topic.isCompleted && topic.progress === 0 && (
            <span className="text-xs text-slate-300">Disponible</span>
          )}
        </div>
      </div>
      
      {/* Líneas de conexión */}
      {topic.prerequisites.length > 0 && isUnlocked && (
        <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-slate-600"></div>
      )}
    </div>
  );
};