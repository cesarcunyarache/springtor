import { useState } from 'react';

// Simulando integración con SDK AI de Vercel
export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async (prompt: string, context?: any): Promise<string> => {
    setIsLoading(true);
    
    // Simulando llamada a IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = {
      summary: "Esta sección te introduce a los conceptos fundamentales de Scrum, una metodología ágil que revoluciona la gestión de proyectos. Descubrirás cómo los equipos autoorganizados pueden entregar valor de manera iterativa y adaptarse rápidamente a los cambios del mercado.",
      priorKnowledge: [
        "Conceptos básicos de gestión de proyectos",
        "Experiencia en trabajo en equipo",
        "Familiaridad con metodologías tradicionales",
        "Conocimientos básicos de desarrollo de software"
      ],
      learningObjectives: [
        "Comprender los principios fundamentales de la metodología Scrum",
        "Identificar los roles clave y sus responsabilidades",
        "Aplicar los eventos y ceremonias de Scrum efectivamente",
        "Utilizar los artefactos para maximizar la transparencia"
      ],
      keyConcepts: [
        {
          id: "1",
          icon: "Users",
          title: "Equipo Autoorganizado",
          description: "Los equipos tienen la autonomía para decidir cómo realizar su trabajo de la mejor manera."
        },
        {
          id: "2",
          icon: "Zap",
          title: "Iteración Continua",
          description: "El trabajo se desarrolla en ciclos cortos llamados Sprints para entregar valor constantemente."
        },
        {
          id: "3",
          icon: "Eye",
          title: "Transparencia",
          description: "Todos los aspectos del proceso deben ser visibles para quienes son responsables del resultado."
        },
        {
          id: "4",
          icon: "RefreshCw",
          title: "Adaptabilidad",
          description: "La capacidad de responder rápidamente a los cambios y retroalimentación del cliente."
        }
      ]
    };

    setIsLoading(false);
    
    if (prompt.includes('summary')) return templates.summary;
    if (prompt.includes('objectives')) return JSON.stringify(templates.learningObjectives);
    if (prompt.includes('concepts')) return JSON.stringify(templates.keyConcepts);
    if (prompt.includes('knowledge')) return JSON.stringify(templates.priorKnowledge);
    
    return "Respuesta generada por IA basada en tu consulta sobre Scrum y metodologías ágiles.";
  };

  const askQuestion = async (question: string): Promise<string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    return `Excelente pregunta sobre "${question}". En Scrum, este concepto se relaciona directamente con los principios ágiles de transparencia, inspección y adaptación. Te recomiendo revisar la documentación oficial y practicar con ejemplos reales.`;
  };

  return {
    generateContent,
    askQuestion,
    isLoading
  };
};