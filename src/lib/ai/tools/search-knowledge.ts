import { getContext } from "@/utils/context";
import { tool } from "ai";
import z from "zod";

export const searchKnowledge = tool({
  description:
    "Busca información relevante en la base de conocimiento vectorial según la consulta del usuario.",
  parameters: z.object({
    query: z
      .string()
      .describe("Texto o pregunta para buscar en la base vectorial"),
  }),
  execute: async ({ query }) => {
    const result = await getContext(query, "", 3000, 0.4, true);

   /*  console.log("PINECOME CONTEXT", result);
     dataStream.writeData({
        type: "context",
        content: result,
      }); */


  },
});
