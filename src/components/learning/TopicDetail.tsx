import React, { useState, useEffect } from 'react';
import { Topic, DifficultyLevel, KeyConcept } from './types';

import { Chip } from './Chip';
import { ProgressBar } from './ProgressBar';

import * as Icons from 'lucide-react';
import { Play, MessageCircle, Loader2, CheckCircle, Clock, Lock } from 'lucide-react';
import { useAI } from './hooks/useAI';
import { Button } from '../ui/button';

interface TopicDetailProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onStartLesson: () => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({
  topic,
  isOpen,
  onClose,
  onStartLesson
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('basico');
  const [summary, setSummary] = useState('');
  const [priorKnowledge, setPriorKnowledge] = useState<string[]>([]);
  const [topicsToAddress, setTopicsToAddress] = useState<any[]>([]);
  const [keyConcepts, setKeyConcepts] = useState<KeyConcept[]>([]);
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  
  const { generateContent, askQuestion, isLoading } = useAI();

  useEffect(() => {
    if (topic && isOpen) {
      loadContent();
    }
  }, [topic, selectedDifficulty, isOpen]);

  const loadContent = async () => {
    if (!topic) return;

    try {
      const [summaryRes, knowledgeRes, objectivesRes, conceptsRes] = await Promise.all([
        generateContent(`summary for ${topic.title} at ${selectedDifficulty} level`),
        generateContent(`prior knowledge for ${topic.title}`),
        generateContent(`learning objectives for ${topic.title}`),
        generateContent(`key concepts for ${topic.title}`)
      ]);

      setSummary(summaryRes);
      setPriorKnowledge(JSON.parse(knowledgeRes));
      setLearningObjectives(JSON.parse(objectivesRes));
      setKeyConcepts(JSON.parse(conceptsRes));
      
      // Generar temas a abordar basado en la dificultad
      const topics = generateTopicsToAddress(selectedDifficulty);
      setTopicsToAddress(topics);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const generateTopicsToAddress = (difficulty: DifficultyLevel) => {
    const baseTopic = {
      title: 'Fundamentos Básicos',
      description: 'Conceptos esenciales y definiciones',
      subtopics: ['Definiciones clave', 'Principios básicos', 'Beneficios']
    };

    switch (difficulty) {
      case 'intermedio':
        return [
          baseTopic,
          {
            title: 'Aplicación Práctica',
            description: 'Implementación en proyectos reales',
            subtopics: ['Casos de uso', 'Mejores prácticas', 'Herramientas']
          },
          {
            title: 'Resolución de Problemas',
            description: 'Superación de obstáculos comunes',
            subtopics: ['Desafíos típicos', 'Estrategias de solución']
          }
        ];
      case 'avanzado':
        return [
          baseTopic,
          {
            title: 'Técnicas Avanzadas',
            description: 'Métodos especializados y optimizaciones',
            subtopics: ['Técnicas especializadas', 'Optimización', 'Innovación']
          },
          {
            title: 'Liderazgo y Mentoría',
            description: 'Guiar equipos y entrenar a otros',
            subtopics: ['Coaching', 'Facilitación', 'Transformación']
          },
          {
            title: 'Integración Organizacional',
            description: 'Implementación a nivel empresarial',
            subtopics: ['Cultura organizacional', 'Gestión del cambio']
          }
        ];
      default:
        return [baseTopic];
    }
  };

  const handleAIQuestion = async () => {
    if (!chatQuestion.trim()) return;
    
    const response = await askQuestion(chatQuestion);
    setChatResponse(response);
    setChatQuestion('');
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'basico': return 'success';
      case 'intermedio': return 'warning';
      case 'avanzado': return 'error';
    }
  };

  if (!topic) return null;

  const IconComponent = Icons[topic.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
   /*  <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-6">
      
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-700 rounded-lg">
              {IconComponent && <IconComponent className="w-8 h-8 text-emerald-400" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{topic.title}</h2>
              <p className="text-slate-300">{topic.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {topic.isCompleted && <CheckCircle className="w-6 h-6 text-emerald-400" />}
            {topic.progress > 0 && !topic.isCompleted && <Clock className="w-6 h-6 text-blue-400" />}
            {topic.progress === 0 && <Lock className="w-6 h-6 text-slate-400" />}
          </div>
        </div>

       
        {topic.progress > 0 && (
          <ProgressBar progress={topic.progress} />
        )}


        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Nivel de Dificultad</h3>
          <div className="flex space-x-3">
            {(['basico', 'intermedio', 'avanzado'] as DifficultyLevel[]).map((level) => (
              <Chip
                key={level}
                isActive={selectedDifficulty === level}
                onClick={() => setSelectedDifficulty(level)}
                variant={getDifficultyColor(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Chip>
            ))}
          </div>
        </div>


        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            <span className="ml-2 text-slate-300">Generando contenido...</span>
          </div>
        )}


        {!isLoading && (
          <div className="space-y-6">
  
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Resumen</h3>
              <p className="text-slate-300 leading-relaxed">{summary}</p>
            </div>

      
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Saberes Previos</h3>
              <ul className="space-y-2">
                {priorKnowledge.map((item, index) => (
                  <li key={index} className="flex items-center text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Temas a Abordar</h3>
              <div className="space-y-4">
                {topicsToAddress.map((topic, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{topic.title}</h4>
                    <p className="text-slate-300 text-sm mb-3">{topic.description}</p>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {topic.subtopics.map((subtopic: string, subIndex: number) => (
                        <li key={subIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                          {subtopic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Conceptos Clave</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyConcepts.map((concept) => {
                  const ConceptIcon = Icons[concept.icon as keyof typeof Icons] as React.ComponentType<any>;
                  return (
                    <div key={concept.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        {ConceptIcon && <ConceptIcon className="w-5 h-5 text-emerald-400 mr-2" />}
                        <h4 className="font-semibold text-white">{concept.title}</h4>
                      </div>
                      <p className="text-slate-300 text-sm">{concept.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>


            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Resultados de Aprendizaje</h3>
              <ul className="space-y-2">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-center text-slate-300">
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

         
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Microactividad Inicial</h3>
              <p className="text-blue-100 mb-4">
                ¿Cuál consideras que es el mayor beneficio de implementar {topic.title}?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Mayor transparencia en el proceso',
                  'Mejor colaboración del equipo',
                  'Entrega de valor más frecuente',
                  'Adaptabilidad a cambios'
                ].map((option, index) => (
                  <button
                    key={index}
                    className="text-left p-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors"
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      
        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <Button
            variant="ghost"
         
            onClick={() => setShowAIChat(!showAIChat)}
          >
            Preguntar a IA
          </Button>
          
          <Button
            variant="default"
           
            onClick={onStartLesson}
            size="lg"
          >
            Iniciar Lección
          </Button>
        </div>

       
        {showAIChat && (
          <div className="bg-slate-700 rounded-lg p-4 space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                placeholder="Haz una pregunta sobre este tema..."
                className="flex-1 px-3 py-2 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAIQuestion()}
              />
              <Button
                onClick={handleAIQuestion}
                disabled={isLoading || !chatQuestion.trim()}
              >
                Preguntar
              </Button>
            </div>
            
            {chatResponse && (
              <div className="bg-slate-600 rounded-lg p-3">
                <p className="text-slate-300">{chatResponse}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal> */

    <h1> {topic.title}</h1>
  );
};