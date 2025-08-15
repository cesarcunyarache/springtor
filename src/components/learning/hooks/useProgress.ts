import { useState, useEffect } from 'react';
import { UserProgress, Topic } from '../types';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedTopics: [],
    currentTopic: null,
    assessmentScores: {},
    totalProgress: 0
  });

  const completeLesson = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: [...prev.completedTopics, topicId],
      totalProgress: Math.min(prev.totalProgress + (100 / 8), 100)
    }));
  };

  const updateAssessmentScore = (assessmentId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      assessmentScores: {
        ...prev.assessmentScores,
        [assessmentId]: Math.max(prev.assessmentScores[assessmentId] || 0, score)
      }
    }));
  };

  const isTopicUnlocked = (topicIndex: number, topics: Topic[]) => {
    if (topicIndex === 0) return true;
    const previousTopic = topics[topicIndex - 1];
    return progress.completedTopics.includes(previousTopic.id);
  };

  return {
    progress,
    completeLesson,
    updateAssessmentScore,
    isTopicUnlocked
  };
};