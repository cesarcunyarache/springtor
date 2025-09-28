import { getContext } from "@/utils/context";
import { tool } from "ai";
import z from "zod";

export const searchKnowledge = tool({
    description:
      "Busca en Pinecone información relacionada con la pregunta del usuario",
    parameters: z.object({
      question: z.string(),
    }),
    execute: async ({ question }) => {
      console.log("Buscando información sobre: ", question);
      const context = await getContext(question, "", 3000, 0.7, true);

      console.log("Context: ", context);
      return context || "No se encontró información relevante.";
    },
  });
