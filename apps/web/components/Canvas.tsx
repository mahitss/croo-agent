'use client';

import { useEffect, useState, useMemo, useRef } from 'react';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
};
import { 
  ReactFlow, 
  Controls, 
  Background, 
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow
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
  
  console.log('[DEBUG] Layout execution - Nodes to arrange:', nodes.map(n => n.id));
  console.log('[DEBUG] Layout execution - Edges connecting:', edges.map(e => `${e.source} -> ${e.target}`));

  dagreGraph.setGraph({ 
    rankdir: direction, 
    ranksep: 180, 
    nodesep: 240 
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 240, height: 140 });
  });

  edges.forEach((edge) => {
    const src = edge.source || (edge as any).sourceNode;
    const tgt = edge.target || (edge as any).targetNode;
    if (src && tgt) {
      dagreGraph.setEdge(src, tgt);
    }
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // Safety checks against NaN/undefined layout coordinates
    const x = nodeWithPosition && typeof nodeWithPosition.x === 'number' && !isNaN(nodeWithPosition.x)
      ? nodeWithPosition.x - 120
      : 0;
    const y = nodeWithPosition && typeof nodeWithPosition.y === 'number' && !isNaN(nodeWithPosition.y)
      ? nodeWithPosition.y - 70
      : 0;

    console.log(`[DEBUG] Node placement - Node ID: ${node.id} | Position: { x: ${x}, y: ${y} }`);

    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: { x, y },
    };
  });

  return { nodes: newNodes, edges };
};

function CanvasInner({ onSelectNode }: CanvasProps) {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const { fitView } = useReactFlow();
  
  // Render count tracking
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`[DEBUG] CanvasInner Render Count: ${renderCountRef.current}`);

  // Custom node types
  const nodeTypes = useMemo(() => ({
    agentNode: AgentNode
  }), []);

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [canvasHeight, setCanvasHeight] = useState(450);

  // Sync state from Zustand activeWorkflow
  useEffect(() => {
    console.log('[DEBUG] activeWorkflow changed - state updated:', activeWorkflow);

    if (!activeWorkflow || activeWorkflow.nodes.length === 0) {
      console.log('[DEBUG] Empty workflow state - clearing canvas elements');
      setNodes([]);
      setEdges([]);
      setCanvasHeight(450);
      return;
    }

    console.log('[DEBUG] Planner nodes count:', activeWorkflow.nodes.length);
    console.log('[DEBUG] Planner edges count:', activeWorkflow.edges.length);

    const mappedNodes = activeWorkflow.nodes.map((node, idx) => {
      const nodeTask = node.task || node.name || `Task ${idx + 1}`;
      const assignedAgent = node.assignedAgent || node.assignedAgentId || 'no-agent';

      return {
        id: node.id,
        type: 'agentNode',
        position: { x: 0, y: 0 },
        data: { 
          id: node.id,
          index: idx,
          name: node.name || nodeTask, 
          task: nodeTask,
          assignedAgent: assignedAgent,
          capability: node.capability, 
          status: node.status || 'pending', 
          costEstimate: node.costEstimate,
          assignedAgentId: node.assignedAgentId,
          output: node.output,
          error: node.error,
          retryCount: node.status === 'failed' ? 2 : 0,
        }
      };
    });

    console.log('[DEBUG] Converted React Flow Nodes:', mappedNodes);

    // Map workflow edges to React Flow edges with colored animation states and clean routing
    const mappedEdges = activeWorkflow.edges.map((edge) => {
      const src = edge.source || (edge as any).sourceNode;
      const tgt = edge.target || (edge as any).targetNode;
      const sourceNode = activeWorkflow.nodes.find(n => n.id === src);
      const isCompleted = sourceNode?.status === 'completed';
      const isRunning = sourceNode?.status === 'running';
      
      let strokeColor = '#1b1e25';
      if (isCompleted) strokeColor = '#00ffcc';
      else if (isRunning) strokeColor = '#ff007f';

      return {
        id: edge.id,
        source: src,
        target: tgt,
        animated: isRunning || isCompleted,
        style: { 
          stroke: strokeColor,
          strokeWidth: isRunning || isCompleted ? 3 : 2
        }
      };
    });

    console.log('[DEBUG] Converted React Flow Edges:', mappedEdges);

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

    // Run fitView asynchronously after elements have mounted
    const timer = setTimeout(() => {
      console.log('[DEBUG] Executing fitView on layouted elements');
      fitView({ padding: 0.2, duration: 200 }).catch(err => {
        console.warn('[DEBUG] fitView execution failed or was interrupted:', err);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [activeWorkflow, fitView]);

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

export default function Canvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
}
