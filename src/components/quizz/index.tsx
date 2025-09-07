"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import QuizScore from "./quzz-score";
import QuizReview from "./quiz-overview";
import { Question } from "@/type";
import { QuestionCard } from "./quizz-card";

export type QuizResult = {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
};

type QuizProps = {
  title?: string;
  questions: Question[];
  onSubmit: (answers: QuizResult[]) => void;
  isViewingResults?: boolean;
  questionResults?: QuizResult[];
  allowReset?: boolean;
};

export default function Quiz({
  title,
  questions,
  onSubmit,
  isViewingResults = true,
  questionResults,
  allowReset = false,
}: QuizProps) {

  const initialAnswers =
    questionResults && questionResults.length > 0
      ? questionResults
      : questions.map((q) => ({
        questionId: q.id,
        selectedOption: null,
        isCorrect: false,
      }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult[]>(initialAnswers);
  const [isSubmitted, setIsSubmitted] = useState(
    questionResults && questionResults.length > 0
  );

  const [score, setScore] = useState<number | null>(
    questionResults ? questionResults.filter((a) => a.isCorrect).length : null
  );
  const [progress, setProgress] = useState(
    questionResults ? 100 : 0
  );

  useEffect(() => {
    if (!isSubmitted) {
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex, questions.length, isSubmitted]);

  const handleSelectAnswer = (answer: string) => {
    /*  if (!isSubmitted) { */
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      selectedOption: answer,
      isCorrect: questions[currentQuestionIndex].answer === answer,
    };
    setAnswers(newAnswers);
    /*  } */
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    setScore(correctAnswers);
    onSubmit?.(answers);
  };

  const handleOmit = () => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    setScore(correctAnswers);
    onSubmit?.(answers);
  };

  const handleReset = () => {
    setAnswers(
      questions.map((q) => ({
        questionId: q.id,
        selectedOption: null,
        isCorrect: false,
      }))
    );
    setIsSubmitted(false);
    setScore(null);
    setCurrentQuestionIndex(0);
    setProgress(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex]?.selectedOption;

  if (questions.length === 0) return null;

  return (
    <div className="bg-background text-foreground h-screen flex justify-center items-center">
      <main className="container px-4 py-12 max-w-4xl">
        {title && (
          <div className="relative mb-8">
            <h1 className="text-3xl font-bold text-center text-foreground">
              {title}
            </h1>
            {!isSubmitted && (
              <Button
                onClick={handleOmit}
                variant="ghost"
                className="absolute right-0 top-0 flex items-center"
                title="Saltar al final"
              >
                <span className="mr-1">Omitir</span>
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>
        )}
        <div className="relative">
          {!isSubmitted && <Progress value={progress} className="h-1 mb-8" />}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSubmitted ? "results" : currentQuestionIndex}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {!isSubmitted || !isViewingResults ? (
                  <div className="space-y-8">
                    <QuestionCard
                      question={currentQuestion}
                      selectedAnswer={currentAnswer}
                      onSelectAnswer={handleSelectAnswer}
                      isSubmitted={isSubmitted}
                      showCorrectAnswer={false}
                    />
                    <div className="flex justify-between items-center pt-4">
                      <Button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="ghost"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                      </Button>
                      <span className="text-sm font-medium">
                        {currentQuestionIndex + 1} / {questions.length}
                      </span>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!currentAnswer}
                        variant="ghost"
                      >
                        {currentQuestionIndex === questions.length - 1
                          ? "Enviar"
                          : "Siguiente"}{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <QuizScore
                      correctAnswers={score ?? 0}
                      totalQuestions={questions.length}
                    />
                    <div className="space-y-12">
                      <QuizReview questions={questions} userAnswers={answers} />
                    </div>
                    {allowReset && (
                      <div className="flex justify-center space-x-4 pt-4">
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="bg-muted hover:bg-muted/80 w-full"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
