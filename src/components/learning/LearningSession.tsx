import React, { useState, useEffect } from 'react';
import { LearningSession as LearningSessionType, LearningSection, ViewMode } from './types';

import { ContentVisualization } from './ContentVisualization';
import { AssessmentPanel } from './AssessmentPanel';

import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Target, 
  Award,
  ArrowLeft,
  ArrowRight,
  Eye,
  Brain,
  BarChart3,
  GitBranch
} from 'lucide-react';
import { useAI } from './hooks/useAI';
import { ProgressBar } from './ProgressBar';
import { Button } from '../ui/button';
import { Chip } from './Chip';

interface LearningSessionProps {
  session: LearningSessionType | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const LearningSession: React.FC<LearningSessionProps> = ({
  session,
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>('mindmap');
  const [showAssessment, setShowAssessment] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { generateContent, isLoading } = useAI();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  useEffect(() => {
    if (session && isOpen) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [session, isOpen]);

  if (!session) return null;

  const currentSection = session.sections[currentSectionIndex];
  const viewModes: { mode: ViewMode; icon: any; label: string }[] = [
    { mode: 'mindmap', icon: Brain, label: 'Mapa Mental' },
    { mode: 'diagram', icon: GitBranch, label: 'Diagrama' },
    { mode: 'comparison', icon: BarChart3, label: 'Comparación' },
    { mode: 'flowchart', icon: Eye, label: 'Flujo' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionComplete = () => {
    // Marcar sección como completada
    if (currentSectionIndex < session.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleAssessmentComplete = (score: number) => {
    setShowAssessment(false);
    if (score >= 70) {
      handleSectionComplete();
    }
  };

  const getVisualizationForMode = (mode: ViewMode) => {
    return currentSection.content?.visualizations.find(v => v.type === mode);
  };

  return (
   /*  <Modal isOpen={isOpen} onClose={onClose} size="full" title={session.title}>
      <div className="flex h-[85vh]">
       
        <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col">
         
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Progreso de Sesión</h3>
              <div className="flex items-center text-slate-300">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{formatTime(sessionTime)}</span>
              </div>
            </div>
            <ProgressBar 
              progress={(currentSectionIndex / session.sections.length) * 100} 
              showLabel={false}
            />
            <p className="text-sm text-slate-400 mt-2">
              {currentSectionIndex + 1} de {session.sections.length} secciones
            </p>
          </div>

         
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Contenido de la Sesión
            </h4>
            <div className="space-y-2">
              {session.sections.map((section, index) => {
                const isActive = index === currentSectionIndex;
                const isCompleted = session.progress.completedSections.includes(section.id);
                const isAccessible = index <= currentSectionIndex;

                return (
                  <button
                    key={section.id}
                    onClick={() => isAccessible && setCurrentSectionIndex(index)}
                    disabled={!isAccessible}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-emerald-600 text-white' 
                        : isCompleted
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : isAccessible
                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {section.type === 'content' && <BookOpen className="w-4 h-4 mr-2" />}
                        {section.type === 'activity' && <Target className="w-4 h-4 mr-2" />}
                        {section.type === 'assessment' && <Award className="w-4 h-4 mr-2" />}
                        <div>
                          <p className="font-medium text-sm">{section.title}</p>
                          <p className="text-xs opacity-75">{section.duration} min</p>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        
          <div className="p-4 border-t border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Evaluaciones
            </h4>
            <div className="space-y-2">
              {session.assessments.map((assessment) => (
                <button
                  key={assessment.id}
                  onClick={() => setShowAssessment(true)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    assessment.isCompleted
                      ? 'bg-emerald-600 text-white'
                      : assessment.type === 'practical'
                      ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white hover:from-purple-600 hover:to-purple-500'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{assessment.title}</span>
                      {assessment.type === 'practical' && (
                        <p className="text-xs opacity-75">Casos reales de Scrum</p>
                      )}
                    </div>
                    {assessment.isCompleted && <CheckCircle className="w-4 h-4" />}
                  </div>
                  {assessment.bestScore > 0 && (
                    <p className="text-xs opacity-75">Mejor: {assessment.bestScore}%</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>


        <div className="flex-1 flex flex-col">

          <div className="p-6 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentSection.title}</h2>
                <p className="text-slate-300">
                  Sección {currentSectionIndex + 1} • {currentSection.duration} minutos
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}

                  size="sm"
                >
                  {isPlaying ? 'Pausar' : 'Continuar'}
                </Button>
              </div>
            </div>

            {currentSection.content && (
              <div className="flex space-x-2">
                {viewModes.map(({ mode, icon: Icon, label }) => (
                  <Chip
                    key={mode}
                    isActive={selectedViewMode === mode}
                    onClick={() => setSelectedViewMode(mode)}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </Chip>
                ))}
              </div>
            )}
          </div>


          <div className="flex-1 overflow-y-auto p-6">
            {currentSection.type === 'content' && currentSection.content && (
              <div className="space-y-6">
             
                <div className="bg-slate-800 rounded-lg p-6">
                  <p className="text-slate-300 leading-relaxed">
                    {currentSection.content.text}
                  </p>
                </div>

                
                <ContentVisualization
                  visualization={getVisualizationForMode(selectedViewMode)}
                  mode={selectedViewMode}
                />

               
                {currentSection.content.examples.length > 0 && (
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Ejemplos Prácticos
                    </h3>
                    <div className="space-y-3">
                      {currentSection.content.examples.map((example, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-slate-300">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentSection.type === 'activity' && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 text-center">
                <Target className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Actividad Práctica</h3>
                <p className="text-blue-100 mb-6">
                  Aplica los conceptos aprendidos a través de ejercicios interactivos
                </p>
                <Button variant="secondary" size="lg">
                  Comenzar Actividad
                </Button>
              </div>
            )}

            {currentSection.type === 'assessment' && (
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-8 text-center">
                <Award className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Evaluación</h3>
                <p className="text-purple-100 mb-6">
                  Demuestra tu comprensión de los conceptos aprendidos
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => setShowAssessment(true)}
                >
                  Iniciar Evaluación
                </Button>
              </div>
            )}
          </div>

         
          <div className="p-6 border-t border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                disabled={currentSectionIndex === 0}
            
              >
                Anterior
              </Button>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleSectionComplete}
                >
                  Marcar como Completada
                </Button>

                <Button
                
                  onClick={() => {
                    if (currentSectionIndex < session.sections.length - 1) {
                      setCurrentSectionIndex(prev => prev + 1);
                    } else {
                      onComplete();
                    }
                  }}
               
                >
                  {currentSectionIndex === session.sections.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {showAssessment && (
        <AssessmentPanel
          assessment={session.assessments[0]}
          onClose={() => setShowAssessment(false)}
          onComplete={handleAssessmentComplete}
        />
      )}
    </Modal> */
    <h1>LearningSession</h1>
  );
};