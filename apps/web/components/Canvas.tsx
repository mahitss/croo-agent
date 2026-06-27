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

export default function Canvas() {
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
          position: { x: 80, y: 30 },
          data: { name: 'Identify Capabilities', capability: 'intent', status: 'idle', costEstimate: 0.00 }
        },
        {
          id: 'def-2',
          type: 'agentNode',
          position: { x: 80, y: 180 },
          data: { name: 'Execute Task Nodes', capability: 'collaboration', status: 'idle', costEstimate: 0.00 }
        },
        {
          id: 'def-3',
          type: 'agentNode',
          position: { x: 80, y: 330 },
          data: { name: 'Aggregate & Verify', capability: 'settlement', status: 'idle', costEstimate: 0.00 }
        }
      ];
      const defaultEdges = [
        { id: 'de-1', source: 'def-1', target: 'def-2', animated: true, style: { stroke: '#1b1e25' } },
        { id: 'de-2', source: 'def-2', target: 'def-3', animated: true, style: { stroke: '#1b1e25' } }
      ];
      setNodes(defaultNodes);
      setEdges(defaultEdges);
      return;
    }

    // Map workflow nodes to React Flow nodes with vertical spacing
    const mappedNodes = activeWorkflow.nodes.map((node, index) => ({
      id: node.id,
      type: 'agentNode',
      position: { x: 80, y: 30 + index * 160 },
      data: { 
        name: node.name, 
        capability: node.capability, 
        status: node.status, 
        costEstimate: node.costEstimate,
        assignedAgentId: node.assignedAgentId
      }
    }));

    // Map workflow edges to React Flow edges with colored animation states
    const mappedEdges = activeWorkflow.edges.map((edge) => {
      const sourceNode = activeWorkflow.nodes.find(n => n.id === edge.source);
      const isAnimated = sourceNode?.status === 'completed' || sourceNode?.status === 'running';
      
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: isAnimated,
        style: { 
          stroke: isAnimated ? '#00ffcc' : '#1b1e25',
          strokeWidth: 2
        }
      };
    });

    setNodes(mappedNodes);
    setEdges(mappedEdges);
  }, [activeWorkflow]);

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
