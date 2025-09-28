import { NextResponse } from "next/server";
import md5 from "md5";
import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "@/utils/embeddings"; // tu función para llamar a OpenAI/Gemini
import { chunkedUpsert } from "@/utils/chunkedUpsert";

// Dataset de Scrum y Casuísticas
const scrumData: string[] = [
  "Scrum es un marco ágil que organiza el trabajo en Sprints de 1 a 4 semanas.",
  "Roles en Scrum: Product Owner, Scrum Master y Equipo de Desarrollo.",
  "Artefactos en Scrum: Product Backlog, Sprint Backlog, Incremento.",
  "Eventos en Scrum: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.",
  "Caso práctico: un Product Owner cambia requisitos en medio de un Sprint, el equipo debe renegociar con él y no aceptar cambios unilaterales.",
  "Caso práctico: en la Daily Scrum, un desarrollador reporta un impedimento y el Scrum Master ayuda a desbloquearlo.",
  "Error común: un Scrum Master actuando como jefe en lugar de facilitador.",
  "Error común: un Product Owner que no prioriza adecuadamente el backlog.",
];

export async function GET(request: Request) {
  try {
    // 🔹 Inicializar Pinecone
    const pinecone = new Pinecone();
    const indexName = "springtor"; // tu índice
    const index = pinecone.Index(indexName);

    // 🔹 Generar embeddings y vectors
    const vectors = await Promise.all(
      scrumData.map(async (text) => {
        const embedding = await getEmbeddings(text);
        return {
          id: md5(text), // ID único
          values: embedding, // vector numérico
          metadata: {
            chunk: text, // el contenido
            category: "scrum", // puedes usar tags
          },
        };
      })
    );

    // 🔹 Insertar en Pinecone
    await chunkedUpsert(index, vectors, "", 10);

    return NextResponse.json({
      success: true,
      message: "Datos de Scrum insertados correctamente en Pinecone 🚀",
      inserted: vectors.length,
    });
  } catch (error: any) {
    console.error("Error insertando datos:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
