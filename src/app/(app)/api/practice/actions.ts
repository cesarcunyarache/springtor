"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const evaluateScrumPractice = async (answers: any) => {
  const result = await generateObject({
    model: google("gemini-2.5-pro"),
    schema: z.object({
      rubricScore: z
        .number()
        .describe("Puntaje total basado en la rúbrica (1–20 puntos)"),
      checklistScore: z
        .number()
        .describe("Puntaje total basado en la lista de verificación (0–10 puntos)"),
      feedback: z
        .string()
        .describe("Retroalimentación breve sobre fortalezas y aspectos por mejorar"),
      justification: z
        .string()
        .describe(
          "Justificación detallada en texto plano, explicando ítem por ítem la evaluación de la lista de verificación (10 ítems) y la rúbrica (4 criterios)."
        ),
    }),
    prompt: `
Eres un **evaluador experto en Scrum**. Evalúa las siguientes respuestas del estudiante
de acuerdo con los instrumentos oficiales que se detallan a continuación.

---

## 🧾 INSTRUMENTO 1: Lista de Verificación (0–10 puntos)

**Título:** Agente de IA basado en casuísticas para el aprendizaje del marco Scrum en el sector tecnológico de Piura.  
**Objetivo:** Registrar de forma dicotómica (Cumple / No cumple) la simulación de un Sprint guiado por el Agente de IA.

**Investigadores:**  
- Abad Abad Thalia del Pilar  
- Cunyarache Castillo Cesar Efraín  

**Variable:** Aprendizaje del marco Scrum  
**Dimensión:** Aplicación práctica  
**Indicador:** Cumplimiento de eventos del Sprint  

**Puntuación:**  
- 0 = No cumple  
- 1 = Cumple  
(Suma total: 10 ítems = 0–10 puntos)

**Lista de Verificación de Prácticas a Evaluar:**

1. Define un Sprint Goal claro.  
2. Revisa y prioriza el Product Backlog para el próximo Sprint.  
3. Estima el esfuerzo de cada ítem (por ejemplo, story points).  
4. Asigna roles y responsabilidades para las tareas del Sprint.  
5. Elabora un Sprint Backlog con todos los ítems seleccionados.  
6. Presenta el Incremento terminado al Product Owner y Stakeholders.  
7. Recoge feedback y documenta mejoras o ajustes sugeridos.  
8. Compara el entregable con el Sprint Goal y la Definition of Done.  
9. Identifica al menos cuatro lecciones aprendidas del Sprint.  
10. Detalla acciones de mejora para el próximo Sprint.  

---

## 🧮 INSTRUMENTO 2: Rúbrica Analítica (1–20 puntos)

**Título:** Agente de IA basado en casuísticas para el aprendizaje del marco Scrum en el sector tecnológico de Piura.  
**Objetivo:** Evaluar la adecuación de la planificación del Sprint con la intervención del agente de IA, considerando cuatro criterios esenciales.

**Investigadores:**  
- Abad Abad Thalia del Pilar  
- Cunyarache Castillo Cesar Efraín  

**Variable:** Aprendizaje del marco Scrum  
**Dimensión:** Aplicación práctica  
**Indicador:** Adecuación de la planificación del Sprint  

**Escala:**  
1 = Muy bajo  
2 = Bajo  
3 = Medio  
4 = Alto  
5 = Excelente  
(Total máximo: 20 puntos)

**Criterios de Evaluación:**

**C1. Priorización de tareas**  
1 - No establece ningún orden.  
2 - Ordena al azar o “porque sí”.  
3 - Ordena por valor o urgencia y da una explicación sencilla.  
4 - Ordena por valor y riesgo; argumenta con ejemplos claros.  
5 - Usa datos (valor, riesgo, dependencias), documenta y justifica cada elección.  

**C2. Estimación de esfuerzo**  
1 - No realiza estimaciones.  
2 - Da cifras sueltas sin método ni justificación.  
3 - Aplica un método simple para la mayoría de tareas.  
4 - Aplica un método estructurado (por ejemplo, story points), compara con tareas parecidas y ajusta las que se desvían.  
5 - Usa un método estructurado, registra cada estimación y su razón.  

**C3. Definición de objetivos (Sprint Goal)**  
1 - No define ningún objetivo.  
2 - Objetivo vago; no se puede medir.  
3 - Objetivo claro, pero incompleto como SMART.  
4 - Objetivo SMART completo (específico, medible, alcanzable, relevante, tiempo).  
5 - Objetivo SMART + criterios de aceptación detallados y alineados al valor del negocio.  

**C4. Gestión de impedimentos**  
1 - No detecta impedimentos.  
2 - Enumera bloqueos, pero sin plan.  
3 - Identifica bloqueos y propone un plan genérico.  
4 - Define plan de acción con responsables y plazos concretos.  
5 - Prioriza riesgos, propone acciones preventivas y documenta seguimiento proactivo.  

---

## 📋 Respuestas del estudiante:
${JSON.stringify(answers, null, 2)}

---

## 🧠 Instrucciones para tu evaluación:

1. Evalúa las respuestas del estudiante comparándolas con **cada ítem** de la lista de verificación (10 ítems) y los **4 criterios** de la rúbrica.  
2. Asigna los puntajes totales:  
   - **checklistScore (0–10)**: número total de ítems cumplidos.  
   - **rubricScore (1–20)**: suma total de los cuatro criterios (1–5 cada uno).  
3. En el campo **feedback**, redacta un resumen breve sobre las principales fortalezas y debilidades observadas.  
4. En el campo **justification**, redacta una explicación detallada (texto plano, sin formato JSON) describiendo ítem por ítem:  
   - En la **lista de verificación**, indica si cumplió o no cada ítem (1–10) y explica brevemente por qué.  
   - En la **rúbrica**, analiza cada criterio (C1–C4) explicando el nivel alcanzado y justificando con ejemplos del desempeño observado.  

No incluyas texto fuera del JSON de salida. Tu salida debe seguir exactamente el esquema definido (rubricScore, checklistScore, feedback, justification).
    `,
  });

  return result.object;
};
