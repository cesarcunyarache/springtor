import { NextResponse } from "next/server";
import md5 from "md5";
import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "@/utils/embeddings"; // tu función para llamar a OpenAI/Gemini
import { chunkedUpsert } from "@/utils/chunkedUpsert";

// Dataset de Scrum y Casuísticas
const scrumData: string[] = [
  // 🔹 FUNDAMENTOS
  "Scrum es un marco de trabajo ágil basado en el empirismo, que promueve la transparencia, la inspección y la adaptación.",
  "El objetivo de Scrum es maximizar el valor entregado al cliente mediante iteraciones cortas llamadas Sprints.",
  "Los valores fundamentales de Scrum son: compromiso, coraje, enfoque, apertura y respeto.",
  "El empirismo en Scrum se basa en tomar decisiones basadas en la experiencia y los resultados observables.",
  "Scrum promueve la autoorganización y la colaboración entre los miembros del equipo.",
  "Scrum es liviano, fácil de entender, pero difícil de dominar.",

  // 🔹 ROLES
  "Scrum define tres roles principales: Product Owner, Scrum Master y Equipo de Desarrollo.",
  "El Product Owner es responsable de maximizar el valor del producto y gestionar el Product Backlog.",
  "El Scrum Master actúa como facilitador y coach ágil, ayudando a eliminar impedimentos y promoviendo buenas prácticas.",
  "El Equipo de Desarrollo es multidisciplinario y se encarga de entregar incrementos potencialmente liberables al final de cada Sprint.",
  "Los Stakeholders son las partes interesadas externas que aportan retroalimentación al producto.",

  // 🔹 EVENTOS
  "Los eventos de Scrum son: Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective.",
  "El Sprint Planning define el objetivo del Sprint y qué trabajo se realizará.",
  "La Daily Scrum es una reunión diaria de 15 minutos para inspeccionar el progreso y ajustar el plan de trabajo.",
  "La Sprint Review permite mostrar el incremento y obtener retroalimentación de los stakeholders.",
  "La Sprint Retrospective es una reunión para identificar mejoras en el proceso y fomentar la mejora continua.",
  "El Sprint tiene una duración fija (timebox) de entre 1 y 4 semanas.",

  // 🔹 ARTEFACTOS
  "Scrum utiliza tres artefactos principales: Product Backlog, Sprint Backlog e Incremento.",
  "El Product Backlog es una lista priorizada de funcionalidades, mejoras y correcciones pendientes.",
  "El Sprint Backlog contiene los elementos del Product Backlog seleccionados para el Sprint y un plan para entregarlos.",
  "El Incremento es el resultado del trabajo completado durante el Sprint y debe cumplir con la Definition of Done.",
  "La Definition of Done (DoD) es un acuerdo que garantiza la calidad y completitud del trabajo.",
  "La Definition of Ready (DoR) indica cuándo un elemento del backlog está listo para ser trabajado.",

  // 🔹 ESTIMACIÓN Y PLANIFICACIÓN
  "La estimación en Scrum se hace frecuentemente usando puntos de historia o T-Shirt Sizes.",
  "El Planning Poker es una técnica colaborativa para estimar el esfuerzo de las historias de usuario.",
  "La velocidad del equipo se calcula en base a los puntos completados en sprints anteriores.",
  "El refinamiento del backlog (Backlog Grooming) es una práctica continua para mantener los ítems actualizados y bien definidos.",
  "El Sprint Goal (Objetivo del Sprint) orienta al equipo hacia un propósito común durante el Sprint.",

  // 🔹 HERRAMIENTAS Y MÉTRICAS
  "Los tableros Scrum pueden ser físicos o digitales y muestran las columnas To Do, In Progress y Done.",
  "Los límites de Work In Progress (WIP) ayudan a evitar la sobrecarga y mantener el flujo de trabajo.",
  "Las métricas comunes en Scrum incluyen el burndown chart, burnup chart y cumulative flow diagram.",
  "El lead time mide el tiempo total desde que se solicita una tarea hasta que se entrega.",
  "El cycle time mide el tiempo desde que se inicia el trabajo hasta su finalización.",
  "El throughput mide la cantidad de trabajo completado por Sprint.",

  // 🔹 CALIDAD Y PRUEBAS
  "Scrum fomenta la integración continua, la entrega continua y las pruebas automatizadas.",
  "El desarrollo basado en pruebas (TDD) mejora la calidad del software y reduce la deuda técnica.",
  "El refactoring ayuda a mantener el código limpio y sostenible a largo plazo.",
  "La revisión de código y el pair programming promueven el aprendizaje compartido y la calidad del producto.",

  // 🔹 CASUÍSTICAS FRECUENTES
  "Caso práctico: en la Daily Scrum, un desarrollador reporta un impedimento y el Scrum Master ayuda a resolverlo rápidamente.",
  "Caso práctico: el Product Owner cambia prioridades a mitad del Sprint; el equipo debe renegociar sin aceptar cambios unilaterales.",
  "Caso práctico: un miembro nuevo se incorpora en medio del Sprint y el equipo ajusta su capacidad.",
  "Caso práctico: el equipo enfrenta dependencia externa que retrasa la entrega del incremento.",
  "Caso práctico: el Sprint es cancelado debido a un cambio estratégico en la organización.",
  "Caso práctico: un Stakeholder no asiste a la Sprint Review, afectando la retroalimentación del producto.",

  // 🔹 ANTI-PATRONES
  "Anti-patrón: el Scrum Master actúa como jefe en lugar de facilitador.",
  "Anti-patrón: el Product Owner no prioriza adecuadamente el backlog.",
  "Anti-patrón: el equipo realiza testing solo al final del Sprint.",
  "Anti-patrón: reuniones diarias se convierten en informes de estado para el Scrum Master.",
  "Anti-patrón: historias de usuario demasiado grandes o sin criterios de aceptación claros.",
  "Anti-patrón: backlog con ítems duplicados o sin valor para el cliente.",
  "Anti-patrón: falta de Definition of Done clara y pública.",
  "Anti-patrón: equipo dependiente de aprobaciones externas para avanzar.",

  // 🔹 BUENAS PRÁCTICAS
  "Buena práctica: mantener historias de usuario pequeñas y enfocadas en valor.",
  "Buena práctica: definir claramente la Definition of Done y de Ready.",
  "Buena práctica: realizar retrospectivas efectivas con acciones de mejora concretas.",
  "Buena práctica: involucrar QA desde el inicio del Sprint.",
  "Buena práctica: visualizar impedimentos y responsables en el tablero.",
  "Buena práctica: revisar el backlog semanalmente junto con el Product Owner.",

  // 🔹 ESCALADO Y ENTORNOS COMPLEJOS
  "Scrum puede escalarse mediante frameworks como SAFe, LeSS o Nexus para equipos grandes.",
  "Scrum de Scrums coordina el trabajo entre múltiples equipos.",
  "La gestión de arquitectura a escala requiere sincronización y comunicación constante.",
  "Los Product Owners pueden dividirse por dominios o líneas de producto en entornos grandes.",
  "La colaboración entre equipos requiere herramientas comunes como Jira, Trello o Azure DevOps.",

  // 🔹 DOCUMENTACIÓN Y CONTRATOS
  "La documentación en Scrum debe ser ligera y enfocada en el valor, no en la burocracia.",
  "Los contratos ágiles priorizan la colaboración sobre la negociación de cláusulas fijas.",
  "Los contratos por tiempo y materiales son más flexibles que los contratos por alcance cerrado.",

  // 🔹 CULTURA Y COACHING
  "El Scrum Master actúa también como coach del equipo, promoviendo la mentalidad ágil.",
  "El coaching del Product Owner ayuda a mejorar la gestión del valor del producto.",
  "La mejora continua (Kaizen) es parte central de la cultura Scrum.",
  "La retroalimentación y la apertura fomentan equipos saludables y productivos.",

  // 🔹 CHECKLISTS Y TEMPLATES
  "Checklist de planificación de Sprint: definir objetivo, capacidad y compromiso del equipo.",
  "Checklist de revisión de Sprint: demostrar incremento, recoger feedback y actualizar backlog.",
  "Checklist de retrospectiva: revisar procesos, generar ideas y definir acciones de mejora.",
  "Plantilla de historia de usuario: Como [rol], quiero [acción], para [beneficio].",
  "Ejemplo de criterios de aceptación: se considera completado cuando el usuario puede guardar su progreso y no ocurren errores.",

  // 🔹 CONCLUSIÓN
  "Scrum no es una metodología, sino un marco adaptable que se combina con buenas prácticas para lograr equipos más eficientes.",
  "El éxito en Scrum depende del aprendizaje continuo, la colaboración y la entrega de valor real.",
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
    await chunkedUpsert(index, vectors, "", 100);

    return NextResponse.json({
      success: true,
      message: "Datos de Scrum insertados correctamente en Pinecone 🚀",
      inserted: vectors.length,
    });
  } catch (error: any) {
    console.error("Error insertando datos:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
