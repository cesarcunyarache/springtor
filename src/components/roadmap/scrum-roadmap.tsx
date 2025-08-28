"use client"

import type React from "react"

import { useCallback, useEffect } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Position,
} from "reactflow"
import "reactflow/dist/style.css"
import { CustomNode } from "./custom-node"
import { TimelineNode } from "./timeline-node"
import { LearningStep, Topic } from "@/type"
import { generateNodesWithSteps } from "./utils/roadmap"


const nodeTypes = {
  custom: CustomNode,
  timeline: TimelineNode,
}

interface ScrumRoadmapProps {
  topics: Topic[]
  learningSteps: LearningStep[]
 /*  onTopicSelect: (topicId: string) => void */
  /* completedTopics: Set<string> */
}

const initialNodes: Node[] = [
  // Timeline spine nodes (invisible connectors) - más espaciados
  { id: "spine-1", type: "timeline", position: { x: 500, y: 50 }, data: { label: "Inicio" } },
  { id: "spine-2", type: "timeline", position: { x: 500, y: 250 }, data: { label: "Fundamentos" } },
  { id: "spine-3", type: "timeline", position: { x: 500, y: 450 }, data: { label: "Roles" } },
  { id: "spine-4", type: "timeline", position: { x: 500, y: 850 }, data: { label: "Eventos" } },
  { id: "spine-5", type: "timeline", position: { x: 500, y: 1200 }, data: { label: "Artefactos" } },
  { id: "spine-6", type: "timeline", position: { x: 500, y: 1500 }, data: { label: "Maestría" } },

  // Foundation level - bien separados horizontalmente
 {
    id: "intro-scrum",
    type: "custom",
    position: { x: 200, y: 250 },
    data: {
      label: "Introducción a Scrum",
      description: "Principios y valores ágiles",
      icon: "🎯",
      category: "foundation",
      level: 1,
      
    },
  },
  {
    id: "agile-mindset",
    type: "custom",
    position: { x: 700, y: 350 },
    data: {
      label: "Mentalidad Ágil",
      description: "Manifiesto y valores",
      icon: "🧠",
      category: "foundation",
      level: 1,
      position: Position.Left,
    },
  },

  // Nivel 2: Roles - distribuidos horizontalmente
  {
    id: "product-owner",
    type: "custom",
    position: { x: 200, y: 500 },
    data: {
      label: "Product Owner",
      description: "Dueño del producto",
      icon: "👑",
      category: "roles",
      level: 2,
      position: Position.Right,
    },
  },
  {
    id: "scrum-master",
    type: "custom",
    position: { x: 200, y: 700 },
    data: {
      label: "Scrum Master",
      description: "Facilitador del proceso",
      icon: "🎓",
      category: "roles",
      level: 2,
      position: Position.Right,
    },
  },
  {
    id: "dev-team",
    type: "custom",
    position: { x: 700, y: 600 },
    data: {
      label: "Development Team",
      description: "Equipo de desarrollo",
      icon: "👥",
      category: "roles",
      level: 2,
      position: Position.Left,
    },
  },

  // Nivel 3: Eventos - distribuidos horizontalmente
  {
    id: "sprint-planning",
    type: "custom",
    position: { x: 200, y: 950 },
    data: {
      label: "Sprint Planning",
      description: "Planificación del Sprint",
      icon: "📋",
      category: "events",
      level: 3,
      position: Position.Top,
    },
  },
  {
    id: "daily-scrum",
    type: "custom",
    position: { x: 0, y: 950 },
    data: {
      label: "Daily Scrum",
      description: "Reunión diaria",
      icon: "☀️",
      category: "events",
      level: 3,
      position: Position.Top,
    },
  },
  {
    id: "sprint-review",
    type: "custom",
    position: { x: 700, y: 950 },
    data: {
      label: "Sprint Review",
      description: "Revisión del Sprint",
      icon: "👀",
      category: "events",
      level: 3,
      position: Position.Top,
    },
  },
  {
    id: "sprint-retrospective",
    type: "custom",
    position: { x: 900, y: 950 },
    data: {
      label: "Sprint Retrospective",
      description: "Retrospectiva del equipo",
      icon: "🔄",
      category: "events",
      level: 3,
      position: Position.Top,
    },
  },

  // Nivel 4: Artefactos - distribuidos horizontalmente
  {
    id: "product-backlog",
    type: "custom",
    position: { x: 200, y: 1200 },
    data: {
      label: "Product Backlog",
      description: "Lista de funcionalidades",
      icon: "📊",
      category: "artifacts",
      level: 4,
      position: Position.Right,
    },
  },
  {
    id: "increment",
    type: "custom",
    position: { x: 200, y: 1400 },
    data: {
      label: "Increment",
      description: "Producto funcional",
      icon: "🚀",
      category: "artifacts",
      level: 4,
      position: Position.Right,
    },
  },
  {
    id: "sprint-backlog",
    type: "custom",
    position: { x: 700, y: 1200 },
    data: {
      label: "Sprint Backlog",
      description: "Trabajo del Sprint",
      icon: "📈",
      category: "artifacts",
      level: 4,
      position: Position.Left,
    },
  },

  // Nivel 5: Maestría - centrado al final
  {
    id: "scrum-mastery",
    type: "custom",
    position: { x: 700, y: 1600 },
    data: {
      label: "Maestría en Scrum",
      description: "Dominio completo",
      icon: "🏆",
      category: "mastery",
      level: 5,
      position: Position.Left,
    },
  },
]

const initialEdges: Edge[] = [
  // Timeline spine (main vertical line)
  {
    id: "spine-1-2",
    source: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
    target: "3fa0c25f-b87b-47f4-a763-b9d1d487ef51",
    /* style: { stroke: "#6366f1", strokeWidth: 4 }, */
    type: "straight",
  },
  {
    id: "spine-2-3",
    source: "spine-2",
    target: "spine-3",
    style: { stroke: "#6366f1", strokeWidth: 4 },
    type: "straight",
  },
  {
    id: "spine-3-4",
    source: "spine-3",
    target: "spine-4",
    style: { stroke: "#6366f1", strokeWidth: 4 },
    type: "straight",
  },
  {
    id: "spine-4-5",
    source: "spine-4",
    target: "spine-5",
    style: { stroke: "#6366f1", strokeWidth: 4 },
    type: "straight",
  },
  {
    id: "spine-5-6",
    source: "spine-5",
    target: "spine-6",
    style: { stroke: "#6366f1", strokeWidth: 4 },
    type: "straight",
  },

  // Foundation branches
  {
    id: "spine-2-intro",
    source: "3fa0c25f-b87b-47f4-a763-b9d1d487ef51",
    target: "agile-mindset",
    /* style: { stroke: "#3b82f6", strokeWidth: 2, strokeDasharray: "5,5" }, */
    animated: true,
  },
  {
    id: "spine-2-agile",
    source: "3fa0c25f-b87b-47f4-a763-b9d1d487ef51",
    target: "agile-mindset",
    /* style: { stroke: "#3b82f6", strokeWidth: 2, strokeDasharray: "5,5" }, */
    animated: true,
  },

  // Roles branches
  {
    id: "spine-3-po",
    source: "spine-3",
    target: "product-owner",
  /*   style: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "5,5" }, */
 /*    animated: true, */
  },
  {
    id: "spine-3-sm",
    source: "spine-3",
    target: "scrum-master",
  /*   style: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "5,5" }, */
    animated: true,
  },
  {
    id: "spine-3-dev",
    source: "spine-3",
    target: "dev-team",
    style: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },

  // Events branches
  {
    id: "spine-4-planning",
    source: "spine-4",
    target: "sprint-planning",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
  {
    id: "spine-4-daily",
    source: "spine-4",
    target: "daily-scrum",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
  {
    id: "spine-4-review",
    source: "spine-4",
    target: "sprint-review",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
  {
    id: "spine-4-retro",
    source: "spine-4",
    target: "sprint-retrospective",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },

  // Artifacts branches
  {
    id: "spine-5-pb",
    source: "spine-5",
    target: "product-backlog",
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
  {
    id: "spine-5-sb",
    source: "spine-5",
    target: "sprint-backlog",
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
  {
    id: "spine-5-inc",
    source: "spine-5",
    target: "increment",
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },

  // Mastery connection
  {
    id: "spine-6-mastery",
    source: "spine-6",
    target: "scrum-mastery",
    style: { stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "5,5" },
    animated: true,
  },
]



export function ScrumRoadmap({ /* onTopicSelect */ /* completedTopics */ topics, learningSteps }: ScrumRoadmapProps) {

   const { nodes: initialNode, edges: init } = generateNodesWithSteps(learningSteps, topics);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Topic>(init);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

 /*  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.type === "custom") {
        onTopicSelect(node.id)
      }
    },
    [onTopicSelect],
  ) */

    const onNodeClick = () => {
      console.log("clicked");
    }

  // Update nodes with completion status
  /* useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          completed: completedTopics.has(node.id),
        },
      })),
    )
  }, [completedTopics, setNodes]) */

  return (
    <div className="h-[90vh] w-full rounded-xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gradient-to-b from-slate-50 via-blue-50 to-purple-50"
        minZoom={0.2}
        maxZoom={1.0}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
      >
        <Controls className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg" />
        <MiniMap
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg"
          nodeColor={(node) => {
          /*   if (tre.has(node.id)) return "#10b981" */
            if (node.type === "timeline") return "#6366f1"
            return "#6b7280"
          }}
        />
        <Background  gap={30} size={1} color="#e2e8f0" />
      </ReactFlow>
    </div>
  )
}
