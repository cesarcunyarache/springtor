import { create } from "zustand";
import { persist } from "zustand/middleware";

type TimerStatus = "idle" | "running" | "paused" | "finished";

interface ExamTimerState {
  name: string;
  duration: number; 
  timeLeft: number;
  startTime: number | null;
  endTime: number | null;
  status: TimerStatus;

  start: (duration: number, name: string) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  finish: () => void;
  tick: () => void;
}

export const useExamTimer = create<ExamTimerState>()(
  persist(
    (set, get) => ({
      duration: 0,
      timeLeft: 0,
      startTime: null,
      endTime: null,
      status: "idle",
      name: "",

      start: (duration, name  ) => {
        const now = Date.now();
        const end = now + duration * 1000;
        set({
          duration,
          timeLeft: duration,
          startTime: now,
          endTime: end,
          status: "running",
          name,
        });
      },

      pause: () => {
        if (get().status === "running") {
          set({ status: "paused" });
        }
      },

      resume: () => {
        if (get().status === "paused") {
          const newEnd = Date.now() + get().timeLeft * 1000;
          set({
            endTime: newEnd,
            status: "running",
          });
        }
      },

      finish: () => {
        set({
          status: "finished",
          timeLeft: 0,
          name: "",
        });
      },

      reset: () => {
        set({
          duration: 0,
          timeLeft: 0,
          startTime: null,
          endTime: null,
          status: "idle",
        });
      },

      tick: () => {
        const { status, endTime } = get();
        if (status !== "running" || !endTime) return;

        const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        set({ timeLeft: diff });

        if (diff <= 0) {
          get().finish();
        }
      },
    }),
    {
      name: "exam-timer-storage", // nombre en localStorage
    }
  )
);
