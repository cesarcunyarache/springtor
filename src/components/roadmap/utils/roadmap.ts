import { LearningStep, Topic } from "@/type";
import type { Node, Edge } from "reactflow";
import { Position } from "reactflow";

interface PositionedNode extends Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

export function generateNodesWithSteps(
  learningSteps: LearningStep[],
  topics: Topic[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];

  const stepX = 500; // X central para los pasos (columna del spine)
  const leftX = 200; // X para topics a la izquierda
  const rightX = 700; // X para topics a la derecha
  const baseTopicSpacingY = 120; // espacio mínimo entre topics
  const minStepSpacing = 120; // espaciado mínimo entre pasos
  const extraSpacingPerTopic = 80; // espacio adicional por cada topic

  // Agrupar topics por stepId primero para calcular espaciados
  const topicsGroupedByStep = new Map<string, Topic[]>();
  const topicsWithoutStep: Topic[] = [];

  topics.forEach((topic) => {
    if (topic.stepId && learningSteps.find(step => step.id === topic.stepId)) {
      if (!topicsGroupedByStep.has(topic.stepId)) {
        topicsGroupedByStep.set(topic.stepId, []);
      }
      topicsGroupedByStep.get(topic.stepId)!.push(topic);
    } else {
      topicsWithoutStep.push(topic);
    }
  });

  // Calcular espaciado dinámico entre pasos
  const stepPositions: Record<string, number> = {};
  let currentY = 100; // Margen superior inicial

  learningSteps.forEach((step, idx) => {
    stepPositions[step.id] = currentY;

    // Calcular cuánto espacio necesita este paso
    const topicsInThisStep = topicsGroupedByStep.get(step.id) || [];
    const topicsCount = topicsInThisStep.length;
    
    // El espacio para el siguiente paso depende de la cantidad de topics
    const dynamicSpacing = minStepSpacing + (topicsCount * extraSpacingPerTopic);
    currentY += dynamicSpacing;
  });

  // 1. Crear nodos para los pasos (learningSteps)
  learningSteps.forEach((step, idx) => {
    const y = stepPositions[step.id];
    
    nodes.push({
      id: step.id,
      type: "timeline",
      position: { x: stepX, y },
      data: {
        label: step.name,
        description: step.description,
      },
     /*  sourcePosition: Position.Right,
      targetPosition: Position.Left, */
    });

    // Crear edges que conecten los pasos entre sí (spine vertical)
    if (idx > 0) {
      edges.push({
        id: `spine-${learningSteps[idx - 1].id}-${step.id}`,
        source: learningSteps[idx - 1].id,
        target: step.id,
        type: "straight",
        style: { stroke: "#6366f1", strokeWidth: 4 },
      });
    }
  });

  // 2. Crear nodos para topics agrupados cerca de su step con distribución inteligente
  topicsGroupedByStep.forEach((groupedTopics, stepId) => {
    const stepY = stepPositions[stepId];
    const topicsCount = groupedTopics.length;

    groupedTopics.forEach((topic, idx) => {
      // Alternar entre izquierda y derecha
      const isLeft = idx % 2 === 0;
      const x = isLeft ? leftX : rightX;
      
      // Distribuir verticalmente alrededor del paso
      // Si hay pocos topics, los centramos más cerca del paso
      // Si hay muchos, los distribuimos más ampliamente
      const totalHeight = Math.max((topicsCount - 1) * baseTopicSpacingY, 0);
      const startY = stepY - totalHeight / 2;
      const y = startY + (Math.floor(idx / 2) * baseTopicSpacingY * (isLeft ? 1 : 1));

      nodes.push({
        id: topic.id,
        type: "custom",
        position: { x, y },
        data: {
          id: topic.id,
          label: topic.title,
          description: topic.description,
          icon: topic.icon,
          level: topic.level,
          position: isLeft ? Position.Right : Position.Left,
        },
       /*  sourcePosition: Position.Right,
        targetPosition: Position.Left, */
      });

      // Crear edge entre el paso y cada topic
      edges.push({
        id: `edge-${stepId}-${topic.id}`,
        source: stepId,
        target: topic.id,
        type: "straight",
        animated: true,
        style: {
          stroke: getStrokeColorByLevel(topic.level),
          strokeWidth: 2,
          strokeDasharray: "5,5",
        },
      });
    });
  });

  // 3. Crear nodos para topics sin stepId al final
  const orphanTopicsStartY = currentY + 100;
  topicsWithoutStep.forEach((topic, idx) => {
    const isLeft = idx % 2 === 0;
    const x = isLeft ? leftX : rightX;
    const y = orphanTopicsStartY + (Math.floor(idx / 2) * baseTopicSpacingY);

    nodes.push({
      id: topic.id,
      type: "custom",
      position: { x, y },
      data: {
        id: topic.id,
        label: topic.title,
        description: topic.description,
        icon: topic.icon,
        level: topic.level,
        position: isLeft ? Position.Right : Position.Left,
      },
    /*   sourcePosition: Position.Right,
      targetPosition: Position.Left, */
    });

    // Si no hay step, podrías conectarlo al último step o dejarlo sin conexión
    // Aquí lo dejo sin conexión, pero puedes modificarlo según tus necesidades
  });

  return { nodes, edges };
}

// Versión alternativa con distribución más equilibrada
export function generateNodesWithBalancedDistribution(
  learningSteps: LearningStep[],
  topics: Topic[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];

  const stepX = 500;
  const leftX = 150;
  const rightX = 850;
  const baseTopicSpacingY = 100;
  const minStepSpacing = 200;
  const spacingMultiplier = 60;

  // Agrupar y calcular distribución equilibrada
  const topicsGroupedByStep = new Map<string, { left: Topic[], right: Topic[] }>();
  const topicsWithoutStep: Topic[] = [];

  topics.forEach((topic) => {
    if (topic.stepId && learningSteps.find(step => step.id === topic.stepId)) {
      if (!topicsGroupedByStep.has(topic.stepId)) {
        topicsGroupedByStep.set(topic.stepId, { left: [], right: [] });
      }
      
      const group = topicsGroupedByStep.get(topic.stepId)!;
      // Distribuir equilibradamente entre izquierda y derecha
      if (group.left.length <= group.right.length) {
        group.left.push(topic);
      } else {
        group.right.push(topic);
      }
    } else {
      topicsWithoutStep.push(topic);
    }
  });

  // Calcular posiciones de pasos
  const stepPositions: Record<string, number> = {};
  let currentY = 150;

  learningSteps.forEach((step) => {
    stepPositions[step.id] = currentY;
    
    const topicsGroup = topicsGroupedByStep.get(step.id);
    const maxTopicsOnOneSide = topicsGroup 
      ? Math.max(topicsGroup.left.length, topicsGroup.right.length)
      : 0;
    
    currentY += minStepSpacing + (maxTopicsOnOneSide * spacingMultiplier);
  });

  // Crear nodos de pasos
  learningSteps.forEach((step, idx) => {
    const y = stepPositions[step.id];
    
    nodes.push({
      id: step.id,
      type: "timeline",
      position: { x: stepX, y },
      data: {
        label: step.name,
        description: step.description,
      },
      /* sourcePosition: Position.Right,
      targetPosition: Position.Left, */
    });

    if (idx > 0) {
      edges.push({
        id: `spine-${learningSteps[idx - 1].id}-${step.id}`,
        source: learningSteps[idx - 1].id,
        target: step.id,
        type: "straight",
        style: { stroke: "#6366f1", strokeWidth: 4 },
      });
    }
  });

  // Crear nodos de topics con distribución equilibrada
  topicsGroupedByStep.forEach((group, stepId) => {
    const stepY = stepPositions[stepId];
    
    // Procesar lado izquierdo
    group.left.forEach((topic, idx) => {
      const y = stepY - (group.left.length - 1) * baseTopicSpacingY / 2 + idx * baseTopicSpacingY;
      
      nodes.push({
        id: topic.id,
        type: "custom",
        position: { x: leftX, y },
        data: {
          id: topic.id,
          label: topic.title,
          description: topic.description,
          icon: topic.icon,
          level: topic.level,
          position: Position.Right,
        },
      /*   sourcePosition: Position.Right,
        targetPosition: Position.Left, */
      });

      edges.push({
        id: `edge-${stepId}-${topic.id}`,
        source: stepId,
        target: topic.id,
        type: "straight",
        animated: true,
        style: {
          stroke: getStrokeColorByLevel(topic.level),
          strokeWidth: 2,
          strokeDasharray: "5,5",
        },
      });
    });

    // Procesar lado derecho
    group.right.forEach((topic, idx) => {
      const y = stepY - (group.right.length - 1) * baseTopicSpacingY / 2 + idx * baseTopicSpacingY;
      
      nodes.push({
        id: topic.id,
        type: "custom",
        position: { x: rightX, y },
        data: {
          id: topic.id,
          label: topic.title,
          description: topic.description,
          icon: topic.icon,
          level: topic.level,
          position: Position.Left,
        },
      /*   sourcePosition: Position.Right,
        targetPosition: Position.Left, */
      });

      edges.push({
        id: `edge-${stepId}-${topic.id}`,
        source: stepId,
        target: topic.id,
        type: "straight",
        animated: true,
        style: {
          stroke: getStrokeColorByLevel(topic.level),
          strokeWidth: 2,
          strokeDasharray: "5,5",
        },
      });
    });
  });

  return { nodes, edges };
}

// Función auxiliar para asignar color según nivel
function getStrokeColorByLevel(level: number): string {
  switch (level) {
    case 1:
      return "#3b82f6"; // azul claro (Fundamentos)
    case 2:
      return "#10b981"; // verde (Roles)
    case 3:
      return "#8b5cf6"; // morado (Eventos)
    case 4:
      return "#f59e0b"; // naranja (Artefactos)
    case 5:
      return "#ef4444"; // rojo (Maestría)
    default:
      return "#999999"; // gris por defecto
  }
}