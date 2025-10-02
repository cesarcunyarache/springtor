import { getContext } from "@/utils/context";
import { tool } from "ai";
import z from "zod";

export const searchKnowledge = tool({
  description:
    "Obtiene información de tu base de conocimiento para responder preguntas.",
  parameters: z.object({
    question: z.string(),
  }),
  execute: async ({ question }) => {
    const context = await getContext(question, "", 3000, 0.7, true);
    return context;
  },
});
