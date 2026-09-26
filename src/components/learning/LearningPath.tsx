import React from 'react';
import { Topic } from './types';
import { TopicNode } from './TopicNode';
import { ProgressBar } from './ProgressBar';

interface LearningPathProps {
  topics: Topic[];
  onTopicClick: (topic: Topic) => void;
  isTopicUnlocked: (topicIndex: number) => boolean;
  totalProgress: number;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  topics,
  onTopicClick,
  isTopicUnlocked,
  totalProgress
}) => {
  // Posiciones para crear un camino serpenteante
  const positions = [
    { x: 20, y: 15 },   // Mentalidad Ágil
    { x: 45, y: 30 },   // Roles
    { x: 75, y: 20 },   // Eventos
    { x: 80, y: 45 },   // Artefactos
    { x: 55, y: 60 },   // Escalado
    { x: 25, y: 70 },   // Métricas
    { x: 15, y: 85 },   // Prácticas Avanzadas
    { x: 50, y: 90 }    // Scrum Master Avanzado
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Ruta de Aprendizaje Scrum
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            Domina la metodología ágil más popular paso a paso
          </p>
          <div className="max-w-md mx-auto">
            <ProgressBar progress={totalProgress} />
          </div>
        </div>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {topics.filter(t => t.isCompleted).length}
            </div>
            <div className="text-slate-300">Completados</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {topics.filter(t => t.progress > 0 && !t.isCompleted).length}
            </div>
            <div className="text-slate-300">En Progreso</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-slate-400">
              {topics.filter(t => !isTopicUnlocked(topics.indexOf(t))).length}
            </div>
            <div className="text-slate-300">Bloqueados</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {topics.length}
            </div>
            <div className="text-slate-300">Total</div>
          </div>
        </div>
      </div>

      {/* Mapa de Ruta */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative h-[800px] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          {/* Líneas de conexión */}
          <svg className="absolute inset-0 w-full h-full">
            {positions.slice(0, -1).map((pos, index) => {
              const nextPos = positions[index + 1];
              return (
                <line
                  key={index}
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2={`${nextPos.x}%`}
                  y2={`${nextPos.y}%`}
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>
          
          {/* Nodos de temas */}
          {topics.map((topic, index) => (
            <TopicNode
              key={topic.id}
              topic={topic}
              onClick={() => onTopicClick(topic)}
              isUnlocked={isTopicUnlocked(index)}
              position={positions[index]}
            />
          ))}
        </div>
      </div>
      
      {/* Leyenda */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Leyenda</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-600 rounded mr-2"></div>
              <span className="text-slate-300">Completado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span className="text-slate-300">En Progreso</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-slate-700 rounded mr-2"></div>
              <span className="text-slate-300">Disponible</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-slate-600 rounded mr-2"></div>
              <span className="text-slate-300">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};