import { ScrumRoadmap } from '@/components/roadmap/scrum-roadmap';
import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
function Flow(props: any) {
  // you can access the internal state here
  const reactFlowInstance = useReactFlow();
 
  return <ScrumRoadmap completedTopics={new Set()} {...props} />;
}
 
// wrapping with ReactFlowProvider is done outside of the component
function FlowWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
 
export default FlowWithProvider;