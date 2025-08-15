import React, { useState, useEffect } from 'react';
import { PracticalCase, PracticalTask, UserStory, BacklogItem } from './types';

import { 
  Users, 
  Calendar, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Edit3, 
  Move, 
  MessageSquare,
  Lightbulb,
  Award,
  ArrowLeft,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAI } from './hooks/useAI';
import { ProgressBar } from './ProgressBar';
import { Button } from '../ui/button';

interface PracticalAssessmentProps {
  practicalCase: PracticalCase;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export const PracticalAssessment: React.FC<PracticalAssessmentProps> = ({
  practicalCase,
  onClose,
  onComplete
}) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { generateContent, isLoading } = useAI();

  const currentTask = practicalCase.tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / practicalCase.tasks.length) * 100;

  const handleTaskResponse = (taskId: string, response: any) => {
    setResponses(prev => ({
      ...prev,
      [taskId]: response
    }));
  };

  const handleNextTask = () => {
    if (currentTaskIndex < practicalCase.tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsEvaluating(true);
    
    // Simular evaluación con IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const evaluation = {
      totalScore: 85,
      taskScores: {
        'user-story-review': 28,
        'backlog-prioritization': 22,
        'retrospective-analysis': 20,
        'story-improvement': 15
      },
      feedback: {
        strengths: [
          'Excelente identificación de problemas en historias de usuario',
          'Buena comprensión de dependencias en el backlog',
          'Análisis crítico sólido de la retrospectiva'
        ],
        improvements: [
          'Considera más el valor de negocio en la priorización',
          'Profundiza en técnicas de facilitación específicas',
          'Incluye métricas cuantificables en criterios de aceptación'
        ],
        detailedAnalysis: {
          'user-story-review': 'Identificaste correctamente que la primera historia es muy vaga y carece de valor de negocio claro. Tu propuesta de dividir la segunda historia es acertada.',
          'backlog-prioritization': 'Buena reorganización considerando dependencias. Podrías haber considerado más el riesgo técnico.',
          'retrospective-analysis': 'Análisis completo de los problemas. Las técnicas de facilitación propuestas son apropiadas.',
          'story-improvement': 'La historia mejorada sigue el formato INVEST correctamente, aunque podría ser más específica en algunos criterios.'
        }
      }
    };
    
    setAiEvaluation(evaluation);
    setIsEvaluating(false);
    setShowResults(true);
  };

  if (isEvaluating) {
    return (
     /*  <Modal isOpen={true} onClose={onClose} size="lg" title="Evaluando tu trabajo...">
        <div className="text-center py-12">
          <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-white mb-4">Analizando tus respuestas</h3>
          <p className="text-slate-300 mb-6">
            Nuestra IA está evaluando la calidad de tu análisis y proporcionando retroalimentación personalizada...
          </p>
          <div className="bg-slate-800 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </Modal> */
      <h1>Evaluando tu trabajo...</h1>
    );
  }

  if (showResults && aiEvaluation) {
    return (
    /*   <Modal isOpen={true} onClose={onClose} size="xl" title="Resultados del Taller Práctico">
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 text-center">
            <Award className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">{aiEvaluation.totalScore}/100</h3>
            <p className="text-emerald-100">¡Excelente trabajo en el análisis práctico!</p>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practicalCase.tasks.map((task, index) => (
              <div key={task.id} className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{task.title}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">Puntuación</span>
                  <span className="text-emerald-400 font-semibold">
                    {aiEvaluation.taskScores[task.id]}/{task.maxScore}
                  </span>
                </div>
                <ProgressBar 
                  progress={(aiEvaluation.taskScores[task.id] / task.maxScore) * 100} 
                  showLabel={false}
                  color="green"
                />
              </div>
            ))}
          </div>

     
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Fortalezas</h4>
              </div>
              <ul className="space-y-2">
                {aiEvaluation.feedback.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Áreas de Mejora</h4>
              </div>
              <ul className="space-y-2">
                {aiEvaluation.feedback.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Análisis Detallado</h4>
            <div className="space-y-4">
              {Object.entries(aiEvaluation.feedback.detailedAnalysis).map(([taskId, analysis]) => {
                const task = practicalCase.tasks.find(t => t.id === taskId);
                return (
                  <div key={taskId} className="border-l-4 border-emerald-500 pl-4">
                    <h5 className="font-medium text-white mb-1">{task?.title}</h5>
                    <p className="text-slate-300 text-sm">{analysis as string}</p>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowResults(false);
                setCurrentTaskIndex(0);
                setResponses({});
                setAiEvaluation(null);
              }}
            >
              Intentar de Nuevo
            </Button>
            <Button
           
              onClick={() => onComplete(aiEvaluation.totalScore)}
            >
              Continuar
            </Button>
          </div>
        </div>
      </Modal> */
      <h1>Resultados del Taller Práctico</h1>
    );
  }

  return (
   /*  <Modal isOpen={true} onClose={onClose} size="full" title={practicalCase.title}>
      <div className="flex h-[85vh]">
    
        <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col">
          
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Contexto del Caso</h3>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{practicalCase.context.teamSize} desarrolladores</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Sprints de {practicalCase.context.sprintDuration}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Target className="w-4 h-4 mr-2" />
                <span className="text-sm">{practicalCase.context.projectType}</span>
              </div>
            </div>
          </div>

        
          <div className="p-6 border-b border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Progreso del Taller
            </h4>
            <ProgressBar progress={progress} showLabel={false} />
            <p className="text-sm text-slate-400 mt-2">
              {currentTaskIndex + 1} de {practicalCase.tasks.length} tareas
            </p>
          </div>

  
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
              Tareas del Taller
            </h4>
            <div className="space-y-2">
              {practicalCase.tasks.map((task, index) => {
                const isActive = index === currentTaskIndex;
                const isCompleted = responses[task.id] !== undefined;
                const isAccessible = index <= currentTaskIndex;

                return (
                  <button
                    key={task.id}
                    onClick={() => isAccessible && setCurrentTaskIndex(index)}
                    disabled={!isAccessible}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : isCompleted
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : isAccessible
                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {task.type === 'user-story-analysis' && <Edit3 className="w-4 h-4 mr-2" />}
                        {task.type === 'backlog-prioritization' && <Move className="w-4 h-4 mr-2" />}
                        {task.type === 'retrospective-analysis' && <MessageSquare className="w-4 h-4 mr-2" />}
                        {task.type === 'text-improvement' && <Lightbulb className="w-4 h-4 mr-2" />}
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs opacity-75">{task.maxScore} puntos</p>
                        </div>
                      </div>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        <div className="flex-1 flex flex-col">

          <div className="p-6 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentTask.title}</h2>
                <p className="text-slate-300">{currentTask.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">{currentTask.maxScore}</div>
                <div className="text-sm text-slate-400">puntos máx.</div>
              </div>
            </div>
          </div>

     
          <div className="flex-1 overflow-y-auto p-6">
            <TaskContent
              task={currentTask}
              response={responses[currentTask.id]}
              onResponseChange={(response) => handleTaskResponse(currentTask.id, response)}
            />
          </div>

   
          <div className="p-6 border-t border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handlePreviousTask}
                disabled={currentTaskIndex === 0}
     
              >
                Anterior
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Tarea {currentTaskIndex + 1} de {practicalCase.tasks.length}
                </p>
              </div>

              <Button
     
                onClick={handleNextTask}
                icon={ArrowRight}
              >
                {currentTaskIndex === practicalCase.tasks.length - 1 ? 'Finalizar Taller' : 'Siguiente'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal> */
    <h1>Taller Práctico</h1>
  );
};

// Component for rendering different task types
const TaskContent: React.FC<{
  task: PracticalTask;
  response: any;
  onResponseChange: (response: any) => void;
}> = ({ task, response, onResponseChange }) => {
  switch (task.type) {
    case 'user-story-analysis':
      return <UserStoryAnalysisTask task={task} response={response} onResponseChange={onResponseChange} />;
    case 'backlog-prioritization':
      return <BacklogPrioritizationTask task={task} response={response} onResponseChange={onResponseChange} />;
    case 'retrospective-analysis':
      return <RetrospectiveAnalysisTask task={task} response={response} onResponseChange={onResponseChange} />;
    case 'text-improvement':
      return <TextImprovementTask task={task} response={response} onResponseChange={onResponseChange} />;
    default:
      return <div>Tipo de tarea no reconocido</div>;
  }
};

// User Story Analysis Component
const UserStoryAnalysisTask: React.FC<{
  task: PracticalTask;
  response: any;
  onResponseChange: (response: any) => void;
}> = ({ task, response, onResponseChange }) => {
  const stories = task.data.stories as UserStory[];

  const handleStoryAnalysis = (storyId: string, analysis: any) => {
    onResponseChange({
      ...response,
      [storyId]: analysis
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Criterios INVEST</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-100">
          <div><strong>I</strong>ndependent</div>
          <div><strong>N</strong>egotiable</div>
          <div><strong>V</strong>aluable</div>
          <div><strong>E</strong>stimable</div>
          <div><strong>S</strong>mall</div>
          <div><strong>T</strong>estable</div>
        </div>
      </div>

      {stories.map((story) => (
        <div key={story.id} className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">{story.id}: {story.title}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Story Points:</span>
              <span className="bg-slate-700 px-2 py-1 rounded text-white">{story.storyPoints}</span>
            </div>
          </div>

          <div className="bg-slate-700 rounded p-4 mb-4">
            <p className="text-slate-300 mb-2"><strong>Descripción:</strong> {story.description}</p>
            <div className="mb-2">
              <strong className="text-slate-300">Criterios de Aceptación:</strong>
              <ul className="list-disc list-inside text-slate-400 mt-1">
                {story.acceptanceCriteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Problemas identificados (selecciona todos los que apliquen):
              </label>
              <div className="space-y-2">
                {story.issues?.map((issue, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={response?.[story.id]?.issues?.includes(issue) || false}
                      onChange={(e) => {
                        const currentIssues = response?.[story.id]?.issues || [];
                        const newIssues = e.target.checked
                          ? [...currentIssues, issue]
                          : currentIssues.filter((i: string) => i !== issue);
                        handleStoryAnalysis(story.id, {
                          ...response?.[story.id],
                          issues: newIssues
                        });
                      }}
                      className="mr-2"
                    />
                    <span className="text-slate-300">{issue}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Propuesta de mejora:
              </label>
              <textarea
                value={response?.[story.id]?.improvement || ''}
                onChange={(e) => handleStoryAnalysis(story.id, {
                  ...response?.[story.id],
                  improvement: e.target.value
                })}
                placeholder="Reescribe la historia de usuario aplicando los criterios INVEST..."
                className="w-full h-32 px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Backlog Prioritization Component
const BacklogPrioritizationTask: React.FC<{
  task: PracticalTask;
  response: any;
  onResponseChange: (response: any) => void;
}> = ({ task, response, onResponseChange }) => {
  const [items, setItems] = useState<BacklogItem[]>(task.data.items);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text/plain');
    const draggedIndex = items.findIndex(item => item.id === draggedItemId);
    
    if (draggedIndex !== -1) {
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);
      
      setItems(newItems);
      onResponseChange({
        prioritizedItems: newItems,
        justification: response?.justification || ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{task.data.teamCapacity}</div>
            <div className="text-slate-400">Story Points Disponibles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">
              {items.reduce((sum, item) => sum + item.storyPoints, 0)}
            </div>
            <div className="text-slate-400">Total Actual</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-400">
              {task.data.sprintGoal}
            </div>
            <div className="text-slate-400">Sprint Goal</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Arrastra y suelta para priorizar (orden de mayor a menor prioridad)
        </h4>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="bg-slate-700 rounded-lg p-4 cursor-move hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-medium text-white">{item.title}</h5>
                    <p className="text-sm text-slate-400">{item.description}</p>
                    {item.dependencies.length > 0 && (
                      <p className="text-xs text-yellow-400">
                        Depende de: {item.dependencies.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">{item.storyPoints}</div>
                  <div className="text-xs text-slate-400">SP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Justifica tu priorización:
        </label>
        <textarea
          value={response?.justification || ''}
          onChange={(e) => onResponseChange({
            ...response,
            justification: e.target.value
          })}
          placeholder="Explica los criterios que usaste para priorizar (valor de negocio, dependencias, riesgo técnico, etc.)..."
          className="w-full h-32 px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

// Retrospective Analysis Component
const RetrospectiveAnalysisTask: React.FC<{
  task: PracticalTask;
  response: any;
  onResponseChange: (response: any) => void;
}> = ({ task, response, onResponseChange }) => {
  const handleAnswerChange = (questionIndex: number, answer: string) => {
   /*  const newAnswers = { ...response?.answers } || {};
    newAnswers[questionIndex] = answer;
    onResponseChange({
      ...response,
      answers: newAnswers
    }); */
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-600 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-3">Escenario Problemático</h3>
        <div className="bg-red-700 rounded p-4 text-red-100 whitespace-pre-line">
          {task.data.scenario}
        </div>
      </div>

      <div className="space-y-6">
        {task.data.questions.map((question: string, index: number) => (
          <div key={index} className="bg-slate-800 rounded-lg p-6">
            <label className="block text-lg font-medium text-white mb-3">
              {index + 1}. {question}
            </label>
            <textarea
              value={response?.answers?.[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Escribe tu análisis y propuesta..."
              className="w-full h-32 px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Text Improvement Component
const TextImprovementTask: React.FC<{
  task: PracticalTask;
  response: any;
  onResponseChange: (response: any) => void;
}> = ({ task, response, onResponseChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Historia Original (Problemática)</h3>
        <div className="bg-red-900 border border-red-700 rounded p-4">
          <h4 className="font-medium text-red-100 mb-2">{task.data.originalStory.title}</h4>
          <p className="text-red-200 mb-2">{task.data.originalStory.description}</p>
          <div className="text-sm text-red-300">
            <strong>Criterios de Aceptación:</strong>
            <ul className="list-disc list-inside mt-1">
              {task.data.originalStory.acceptanceCriteria.map((criteria: string, index: number) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">Contexto Adicional</h4>
        <p className="text-blue-100">{task.data.context}</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Tu Historia Mejorada</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Título de la Historia:
            </label>
            <input
              type="text"
              value={response?.improvedStory?.title || ''}
              onChange={(e) => onResponseChange({
                ...response,
                improvedStory: {
                  ...response?.improvedStory,
                  title: e.target.value
                }
              })}
              placeholder="Como [usuario], quiero [funcionalidad] para [beneficio]"
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descripción Detallada:
            </label>
            <textarea
              value={response?.improvedStory?.description || ''}
              onChange={(e) => onResponseChange({
                ...response,
                improvedStory: {
                  ...response?.improvedStory,
                  description: e.target.value
                }
              })}
              placeholder="Describe el contexto, la necesidad del usuario y el valor de negocio..."
              className="w-full h-24 px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Criterios de Aceptación (uno por línea):
            </label>
            <textarea
              value={response?.improvedStory?.acceptanceCriteria || ''}
              onChange={(e) => onResponseChange({
                ...response,
                improvedStory: {
                  ...response?.improvedStory,
                  acceptanceCriteria: e.target.value
                }
              })}
              placeholder="- Dado que... cuando... entonces...&#10;- El sistema debe...&#10;- La funcionalidad debe..."
              className="w-full h-32 px-3 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-600 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">💡 Consejos INVEST</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-100">
          {task.data.hints.map((hint: string, index: number) => (
            <div key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {hint}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};