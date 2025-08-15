import React from 'react';
import { Visualization, ViewMode } from './types';
import { Brain, GitBranch, BarChart3, Eye } from 'lucide-react';

interface ContentVisualizationProps {
  visualization?: Visualization;
  mode: ViewMode;
}

export const ContentVisualization: React.FC<ContentVisualizationProps> = ({
  visualization,
  mode
}) => {
  if (!visualization) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 text-center">
        <div className="text-slate-400 mb-4">
          {mode === 'mindmap' && <Brain className="w-12 h-12 mx-auto" />}
          {mode === 'diagram' && <GitBranch className="w-12 h-12 mx-auto" />}
          {mode === 'comparison' && <BarChart3 className="w-12 h-12 mx-auto" />}
          {mode === 'flowchart' && <Eye className="w-12 h-12 mx-auto" />}
        </div>
        <p className="text-slate-400">Cargando visualización...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{visualization.title}</h3>
      
      {mode === 'mindmap' && <MindMapView data={visualization.data} />}
      {mode === 'diagram' && <DiagramView data={visualization.data} />}
      {mode === 'comparison' && <ComparisonView data={visualization.data} />}
      {mode === 'flowchart' && <FlowchartView data={visualization.data} />}
    </div>
  );
};

const MindMapView: React.FC<{ data: any }> = ({ data }) => (
  <div className="flex flex-col items-center space-y-6">
    {/* Nodo Central */}
    <div className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-lg">
      {data.center}
    </div>
    
    {/* Ramas */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {data.branches.map((branch: any, index: number) => (
        <div key={index} className="bg-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3 text-center">{branch.title}</h4>
          <div className="space-y-2">
            {branch.items.map((item: string, itemIndex: number) => (
              <div key={itemIndex} className="bg-slate-600 text-slate-300 px-3 py-2 rounded text-sm text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DiagramView: React.FC<{ data: any }> = ({ data }) => (
  <div className="flex flex-col space-y-4">
    <div className="flex flex-wrap justify-center gap-4">
      {data.nodes.map((node: any) => (
        <div
          key={node.id}
          className={`px-4 py-2 rounded-lg font-medium ${
            node.type === 'start' ? 'bg-green-600 text-white' :
            node.type === 'end' ? 'bg-red-600 text-white' :
            'bg-blue-600 text-white'
          }`}
        >
          {node.label}
        </div>
      ))}
    </div>
    <div className="text-center text-slate-400 text-sm">
      Flujo de proceso secuencial
    </div>
  </div>
);

const ComparisonView: React.FC<{ data: any }> = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-600">
          {data.columns.map((column: string, index: number) => (
            <th key={index} className="text-left py-3 px-4 font-semibold text-white">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: string[], index: number) => (
          <tr key={index} className="border-b border-slate-700">
            {row.map((cell: string, cellIndex: number) => (
              <td key={cellIndex} className="py-3 px-4 text-slate-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FlowchartView: React.FC<{ data: any }> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.steps.map((step: any, index: number) => (
      <div key={step.id} className="relative">
        <div
          className={`p-4 rounded-lg text-center font-medium ${
            step.type === 'input' ? 'bg-green-600 text-white' :
            step.type === 'output' ? 'bg-red-600 text-white' :
            step.type === 'data' ? 'bg-yellow-600 text-white' :
            'bg-blue-600 text-white'
          }`}
        >
          <div className="text-sm font-bold mb-1">{index + 1}</div>
          {step.text}
        </div>
        {index < data.steps.length - 1 && (
          <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-slate-600"></div>
        )}
      </div>
    ))}
  </div>
);