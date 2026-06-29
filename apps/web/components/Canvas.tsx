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

interface CanvasProps {
  onSelectNode?: (nodeData: any) => void;
}

export default function Canvas({ onSelectNode }: CanvasProps) {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  
  // Custom node types
  const nodeTypes = useMemo(() => ({
    agentNode: AgentNode
  }), []);

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  // Sync state from Zustand activeWorkflow
  useEffect(() => {
    if (!activeWorkflow) {
      // Setup a default skeleton when idle
      const defaultNodes = [
        {
          id: 'def-1',
          type: 'agentNode',
          position: { x: 150, y: 30 },
          data: { id: 'def-1', name: 'Identify Capabilities', capability: 'intent', status: 'idle', costEstimate: 0.00, retryCount: 0 }
        },
        {
          id: 'def-2',
          type: 'agentNode',
          position: { x: 30, y: 180 },
          data: { id: 'def-2', name: 'Execute Task Nodes (A)', capability: 'research', status: 'idle', costEstimate: 0.00, retryCount: 0 }
        },
        {
          id: 'def-3',
          type: 'agentNode',
          position: { x: 270, y: 180 },
          data: { id: 'def-3', name: 'Execute Task Nodes (B)', capability: 'finance', status: 'idle', costEstimate: 0.00, retryCount: 0 }
        },
        {
          id: 'def-4',
          type: 'agentNode',
          position: { x: 150, y: 330 },
          data: { id: 'def-4', name: 'Aggregate & Verify', capability: 'verify', status: 'idle', costEstimate: 0.00, retryCount: 0 }
        }
      ];
      const defaultEdges = [
        { id: 'de-1', source: 'def-1', target: 'def-2', animated: true, style: { stroke: '#1b1e25' } },
        { id: 'de-2', source: 'def-1', target: 'def-3', animated: true, style: { stroke: '#1b1e25' } },
        { id: 'de-3', source: 'def-2', target: 'def-4', animated: true, style: { stroke: '#1b1e25' } },
        { id: 'de-4', source: 'def-3', target: 'def-4', animated: true, style: { stroke: '#1b1e25' } }
      ];
      setNodes(defaultNodes);
      setEdges(defaultEdges);
      return;
    }

    // --- Dynamic Leveled Auto-Layout Algorithm (Parallel Flow Nodes Layout) ---
    // 1. Calculate parents and indegrees
    const indegree: Record<string, number> = {};
    const parents: Record<string, string[]> = {};
    
    activeWorkflow.nodes.forEach(n => {
      indegree[n.id] = 0;
      parents[n.id] = [];
    });

    activeWorkflow.edges.forEach(e => {
      indegree[e.target] = (indegree[e.target] || 0) + 1;
      parents[e.target].push(e.source);
    });

    // 2. Assign nodes to levels topographically
    const levels: Record<string, number> = {};
    const queue: string[] = [];

    activeWorkflow.nodes.forEach(n => {
      if (indegree[n.id] === 0) {
        levels[n.id] = 0;
        queue.push(n.id);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentLevel = levels[current];

      activeWorkflow.edges.forEach(e => {
        if (e.source === current) {
          const nextLevel = Math.max(levels[e.target] || 0, currentLevel + 1);
          levels[e.target] = nextLevel;
          queue.push(e.target);
        }
      });
    }

    // 3. Group nodes by their levels
    const nodesByLevel: Record<number, string[]> = {};
    activeWorkflow.nodes.forEach(n => {
      const lvl = levels[n.id] || 0;
      if (!nodesByLevel[lvl]) {
        nodesByLevel[lvl] = [];
      }
      nodesByLevel[lvl].push(n.id);
    });

    // 4. Calculate layouts coordinates
    const spacingX = 240;
    const spacingY = 160;
    const centerX = 200;

    const mappedNodes = activeWorkflow.nodes.map(node => {
      const lvl = levels[node.id] || 0;
      const levelNodes = nodesByLevel[lvl];
      const indexInLevel = levelNodes.indexOf(node.id);
      
      // Align horizontally relative to the center of the level
      const totalWidth = (levelNodes.length - 1) * spacingX;
      const x = centerX - totalWidth / 2 + indexInLevel * spacingX;
      const y = 30 + lvl * spacingY;

      return {
        id: node.id,
        type: 'agentNode',
        position: { x, y },
        data: { 
          id: node.id,
          name: node.name, 
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

    // Map workflow edges to React Flow edges with colored animation states
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
        animated: isRunning || isCompleted,
        style: { 
          stroke: strokeColor,
          strokeWidth: isRunning || isCompleted ? 3 : 2
        }
      };
    });

    setNodes(mappedNodes);
    setEdges(mappedEdges);
  }, [activeWorkflow]);

  const handleNodeClick = (_event: any, node: any) => {
    if (onSelectNode) {
      onSelectNode(node.data);
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-black/40 border border-border-dark rounded-xl relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="text-xs bg-black/60 border border-border-dark text-gray-400 px-2.5 py-1 rounded font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary-neon animate-pulse"></span>
          WORKFLOW_CANVAS_ACTIVE
        </span>
      </div>

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
