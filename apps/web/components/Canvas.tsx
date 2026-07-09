'use client';

import { useEffect, useState, useMemo } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  BackgroundVariant 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNexusStore } from '../store/nexusStore';
import AgentNode from './AgentNode';
import dagre from '@dagrejs/dagre';

interface CanvasProps {
  onSelectNode?: (nodeData: any) => void;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  // Use professional vertical separation (260px center-to-center, leaving exactly 120px gap)
  dagreGraph.setGraph({ 
    rankdir: direction, 
    ranksep: 260, 
    nodesep: 120 
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 240, height: 140 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - 120, // 240 / 2
        y: nodeWithPosition.y - 70,  // 140 / 2
      },
    };
  });

  return { nodes: newNodes, edges };
};

export default function Canvas({ onSelectNode }: CanvasProps) {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  
  // Custom node types
  const nodeTypes = useMemo(() => ({
    agentNode: AgentNode
  }), []);

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [canvasHeight, setCanvasHeight] = useState(450);

  // Sync state from Zustand activeWorkflow
  useEffect(() => {
    if (!activeWorkflow || activeWorkflow.nodes.length === 0) {
      setNodes([]);
      setEdges([]);
      setCanvasHeight(450);
      return;
    }

    const mappedNodes = activeWorkflow.nodes.map((node, idx) => {
      const nodeTask = node.task || node.name;
      const assignedAgent = node.assignedAgent || node.assignedAgentId;

      console.log(`[DEBUG] Node ID: ${node.id} | Capability: ${node.capability} | Task: ${nodeTask} | Assigned Agent: ${assignedAgent} | Status: ${node.status}`);

      return {
        id: node.id,
        type: 'agentNode',
        position: { x: 0, y: 0 },
        data: { 
          id: node.id,
          index: idx,
          name: node.name, 
          task: nodeTask,
          assignedAgent: assignedAgent,
          capability: node.capability, 
          status: node.status, 
          costEstimate: node.costEstimate,
          assignedAgentId: node.assignedAgentId,
          output: node.output,
          error: node.error,
          retryCount: node.status === 'failed' ? 2 : 0,
        }
      };
    });

    // Map workflow edges to React Flow edges with colored animation states and clean routing
    const mappedEdges = activeWorkflow.edges.map((edge) => {
      const sourceNode = activeWorkflow.nodes.find(n => n.id === edge.source);
      const isCompleted = sourceNode?.status === 'completed';
      const isRunning = sourceNode?.status === 'running';
      
      let strokeColor = '#1b1e25';
      if (isCompleted) strokeColor = '#00ffcc';
      else if (isRunning) strokeColor = '#ff007f';

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep', // Orthogonal edge routing around cards
        animated: isRunning || isCompleted,
        style: { 
          stroke: strokeColor,
          strokeWidth: isRunning || isCompleted ? 3 : 2
        }
      };
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      mappedNodes,
      mappedEdges,
      'TB'
    );

    const maxY = layoutedNodes.length > 0
      ? Math.max(...layoutedNodes.map(n => n.position.y), 0)
      : 0;
    const computedHeight = Math.max(maxY + 220, 450);
    setCanvasHeight(computedHeight);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [activeWorkflow]);

  const handleNodeClick = (_event: any, node: any) => {
    if (onSelectNode) {
      onSelectNode(node.data);
    }
  };

  return (
    <div 
      style={{ height: `${canvasHeight}px` }}
      className="w-full min-h-[450px] bg-black/40 border border-border-dark rounded-xl relative overflow-hidden transition-all duration-300"
    >
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="text-xs bg-black/60 border border-border-dark text-gray-400 px-2.5 py-1 rounded font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary-neon animate-pulse"></span>
          WORKFLOW_CANVAS_ACTIVE
        </span>
      </div>

      {!activeWorkflow && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 font-mono text-xs text-gray-400 gap-2">
          <span>No active workflow.</span>
          <span>Describe a task above and click "Generate Workflow" to begin.</span>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls 
          className="bg-card-dark border border-border-dark text-white rounded-lg p-1" 
          showInteractive={false}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          color="#1b1e25" 
        />
      </ReactFlow>
    </div>
  );
}
