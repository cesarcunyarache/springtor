import React, { useEffect } from "react";
import { useExamTimer } from "../store";
// ajusta la ruta según tu estructura

const ExamTimerDisplay = () => {
  const { timeLeft, status, tick } = useExamTimer();

  // Actualiza el temporizador cada segundo mientras esté corriendo
  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [status, tick]);

  // Formatear el tiempo (HH:MM:SS)
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-2 rounded-xl font-semibold border-2
        border-accent w-40
      "
    >
      ⏱ {" "} {formatTime(timeLeft)}
    </div>
  );
};

export default ExamTimerDisplay;
