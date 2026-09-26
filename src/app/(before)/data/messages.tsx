// src/constants/alertMessages.ts

export enum AlertDialogType {
  StartExam = "startExam",
  ExamHidden = "examHidden",
  ExamCompleted = "examCompleted",
}

export const alertMessages = {
  [AlertDialogType.StartExam]: {
    type: "warning",
    title: "¿Deseas iniciar el examen?",
    description:
      "El examen tiene una duración de 45 minutos y evalúa tus conocimientos teóricos de Scrum.",
    confirmText: "Comenzar examen",
    cancelText: "Cancelar",
  },
  [AlertDialogType.ExamHidden]: {
    type: "warning",
    title: "El examen está temporalmente oculto",
    description:
      "El sistema de supervisión detectó una irregularidad. No podrás continuar hasta restablecer las condiciones requeridas.",
    confirmText: "Continuar examen",
  },
  [AlertDialogType.ExamCompleted]: {
    type: "success",
    title: "¡Ya desarrollaste este examen!",
    description:
      "Has completado este examen previamente. No es necesario volver a intentarlo.",
    confirmText: "Entendido",
  },
} as const;
