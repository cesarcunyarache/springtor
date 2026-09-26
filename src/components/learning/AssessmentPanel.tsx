import React, { useState, useEffect } from 'react';

import { PracticalAssessment } from './PracticalAssessment';
import { CheckCircle, XCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { Assessment } from './types';
import { Button } from '../ui/button';
import { ProgressBar } from './ProgressBar';

interface AssessmentPanelProps {
  assessment: Assessment;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export const AssessmentPanel = ({
  assessment,
  onClose,
  onComplete
}: AssessmentPanelProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimit ? assessment.timeLimit * 60 : 0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (assessment.timeLimit && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults, assessment.timeLimit]);

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    let correctAnswers = 0;
    assessment.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(assessment.timeLimit ? assessment.timeLimit * 60 : 0);
    setScore(0);
  };

  const handleFinish = () => {
    onComplete(score);
  };

  // Si es una evaluación práctica, mostrar el componente especializado
  if (assessment.type === 'practical' && assessment.practicalCase) {
    return (
      <PracticalAssessment
        practicalCase={assessment.practicalCase}
        onClose={onClose}
        onComplete={onComplete}
      />
    );
  }

  if (showResults) {
    return (
     /*  <Modal isOpen={true} onClose={onClose} size="lg" title="Resultados de la Evaluación">
        <div className="text-center space-y-6">
        
          <div className="bg-slate-800 rounded-lg p-8">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
              score >= assessment.passingScore ? 'bg-emerald-600' : 'bg-red-600'
            }`}>
              {score >= assessment.passingScore ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : (
                <XCircle className="w-12 h-12 text-white" />
              )}
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-2">{score}%</h3>
            <p className={`text-lg ${
              score >= assessment.passingScore ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {score >= assessment.passingScore ? '¡Aprobado!' : 'No Aprobado'}
            </p>
            <p className="text-slate-400 mt-2">
              Puntaje mínimo: {assessment.passingScore}%
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Resumen Detallado</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  {assessment.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length}
                </div>
                <div className="text-slate-400">Correctas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {assessment.questions.filter(q => selectedAnswers[q.id] !== q.correctAnswer).length}
                </div>
                <div className="text-slate-400">Incorrectas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-400">
                  {totalQuestions}
                </div>
                <div className="text-slate-400">Total</div>
              </div>
            </div>
          </div>

         
          <div className="bg-slate-800 rounded-lg p-6 text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Revisión de Respuestas</h4>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {assessment.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border-l-4 border-slate-600 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className={`text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                          Tu respuesta: {question.options[userAnswer] || 'Sin respuesta'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-slate-400">
                            Correcta: {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

       
          <div className="flex justify-center space-x-4">
            {score < assessment.passingScore && (
              <Button
                variant="outline"
                onClick={handleRetry}
               
              >
                Intentar de Nuevo
              </Button>
            )}
            <Button
           
              onClick={handleFinish}
              icon={Award}
            >
              {score >= assessment.passingScore ? 'Continuar' : 'Finalizar'}
            </Button>
          </div>
        </div>
      </Modal> */
      <h1> Resultados de la Evaluación</h1>
    );
  }

  return (
    {/* <Modal isOpen={true} onClose={onClose} size="lg" title={assessment.title}>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </h3>
            <p className="text-slate-400">
              Tipo: {assessment.type === 'initial' ? 'Evaluación Inicial' : assessment.type === 'final' ? 'Evaluación Final' : 'Casuística Práctica'}
            </p>
          </div>
          {assessment.timeLimit && (
            <div className="flex items-center text-slate-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className={timeLeft < 300 ? 'text-red-400' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

  
        <ProgressBar progress={progress} showLabel={false} />

       
        <div className={`rounded-lg p-6 ${
          assessment.type === 'practical' 
            ? 'bg-gradient-to-br from-purple-900 to-slate-800 border border-purple-700' 
            : 'bg-slate-800'
        }`}>
          {assessment.type === 'practical' && (
            <div className="flex items-center mb-4 text-purple-300">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold uppercase tracking-wide">Caso Práctico</span>
            </div>
          )}
          <h4 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h4>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion.id] === index
                    ? 'border-emerald-500 bg-emerald-600/20 text-white'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswers[currentQuestion.id] === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span>{String.fromCharCode(65 + index)}. {option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>


        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">
              {Object.keys(selectedAnswers).length} de {totalQuestions} respondidas
            </span>
          </div>

          <Button

            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </Modal> */}
   
  );
};