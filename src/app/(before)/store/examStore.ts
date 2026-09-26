// @/app/(app)/scrum/evaluacion-practica/store/examStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ExamType = 'pre-test' | 'post-test' | 'practica-pre-test' | 'practica-post-test';

interface ExamState {
  currentExam: ExamType | null;
  isExamActive: boolean;
  startExam: (examType: ExamType) => void;
  endExam: () => void;
  resetExam: () => void;
  isExamInProgress: (examType: ExamType) => boolean;
  getActiveExamType: () => ExamType | null;
  hasAnyExamActive: () => boolean;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      currentExam: null,
      isExamActive: false,

      startExam: (examType: ExamType) => {
        set({
          currentExam: examType,
          isExamActive: true,
        });
      },

      endExam: () => {
        set({
          currentExam: null,
          isExamActive: false,
        });
      },

      resetExam: () => {
        set({
          currentExam: null,
          isExamActive: false,
        });
      },

      isExamInProgress: (examType: ExamType) => {
        const state = get();
        return state.isExamActive && state.currentExam === examType;
      },

      getActiveExamType: () => {
        const state = get();
        return state.isExamActive ? state.currentExam : null;
      },

      hasAnyExamActive: () => {
        const state = get();
        return state.isExamActive && state.currentExam !== null;
      },
    }),
    {
      name: 'exam-store',
    }
  )
);