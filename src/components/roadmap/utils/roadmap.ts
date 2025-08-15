import { LearningStep, Topic } from "@/type";
import type { Node } from "reactflow";
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
): Node[] {
  const nodes: PositionedNode[] = [];

  const stepX = 100;        // X fijo para los pasos
  const topicBaseX = 400;   // X base para topics a la derecha del step
  const verticalSpacing = 150; // espacio vertical entre pasos
  const topicSpacingY = 50; // espacio vertical entre topics relacionados a un step
  const noStepYOffset = 50; // Y inicial para topics sin stepId

  // Mapea stepId a posición Y para usar en topics
  const stepPositionMap: Record<string, number> = {};

  // 1. Crear nodos para learningSteps, distribuidos verticalmente
  learningSteps.forEach((step, idx) => {
    const y = idx * verticalSpacing + 100; // margen superior de 100
    stepPositionMap[step.id] = y;

    nodes.push({
      id: step.id,
      type: "timeline",  // o el tipo que uses para steps
      position: { x: stepX, y },
      data: {
        label: step.name,
        description: step.description,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  // 2. Agrupar topics por stepId y crear nodos cerca de su step
  // Para topics sin stepId, guardamos en otra lista para posicionar al final
  const topicsGroupedByStep = new Map<string, Topic[]>();
  const topicsWithoutStep: Topic[] = [];

  topics.forEach((topic) => {
    if (topic.stepId && stepPositionMap[topic.stepId]) {
      if (!topicsGroupedByStep.has(topic.stepId)) {
        topicsGroupedByStep.set(topic.stepId, []);
      }
      topicsGroupedByStep.get(topic.stepId)!.push(topic);
    } else {
      topicsWithoutStep.push(topic);
    }
  });

  // Añadir topics posicionados junto a su step
  topicsGroupedByStep.forEach((groupedTopics, stepId) => {
    const baseY = stepPositionMap[stepId];
    groupedTopics.forEach((topic, idx) => {
      // Cada topic colocado con separación vertical respecto al step
      const y = baseY + idx * topicSpacingY - (groupedTopics.length * topicSpacingY) / 2; // centra grupo respecto al step
      const x = topicBaseX;

      nodes.push({
        id: topic.id,
        type: "custom", // tu tipo custom para topics
        position: { x, y },
        data: {
          label: topic.title,
          description: topic.description,
          icon: topic.icon,
          level: topic.level,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    });
  });

  // 3. Posicionar topics sin stepId al final, verticalmente
  const startY = learningSteps.length * verticalSpacing + 100;
  topicsWithoutStep.forEach((topic, idx) => {
    const x = topicBaseX;
    const y = startY + idx * topicSpacingY;

    nodes.push({
      id: topic.id,
      type: "custom",
      position: { x, y },
      data: {
        label: topic.title,
        description: topic.description,
        icon: topic.icon,
        level: topic.level,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  return nodes;
}
