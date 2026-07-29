'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  BackgroundVariant,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useActiveWorkflow } from '../hooks/useActiveWorkflow';
import { useNexusStore } from '../store/nexusStore';
import AgentNode from './AgentNode';
import dagre from '@dagrejs/dagre';
import { 
  Undo2, 
  Redo2, 
  LayoutGrid, 
  Map as MapIcon, 
  Copy, 
  Clipboard, 
  Trash2, 
  Plus, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  History, 
  MessageSquare, 
  Users, 
  Settings2, 
  Sliders, 
  ShieldCheck, 
  Layers, 
  Zap, 
  X,
  RefreshCw
} from 'lucide-react';

interface CanvasProps {
  onSelectNode?: (nodeData: any) => void;
}

// Custom Comment Sticky Note Component
function CommentNode({ data }: { data: any }) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl max-w-xs shadow-lg backdrop-blur-md text-amber-200 text-xs font-sans space-y-1">
      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> Canvas Note
        </span>
        <span>{data.author || 'Author'}</span>
      </div>
      <p className="leading-tight text-[11px] text-gray-300">{data.label || 'Annotation note'}</p>
    </div>
  );
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  
  dagreGraph.setGraph({ 
    rankdir: direction, 
    ranksep: 180, 
    nodesep: 220 
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
    const x = nodeWithPosition && typeof nodeWithPosition.x === 'number' && !isNaN(nodeWithPosition.x)
      ? nodeWithPosition.x - 120
      : node.position?.x || 0;
    const y = nodeWithPosition && typeof nodeWithPosition.y === 'number' && !isNaN(nodeWithPosition.y)
      ? nodeWithPosition.y - 70
      : node.position?.y || 0;

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
  const { activeWorkflow } = useActiveWorkflow();
  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    agentNode: AgentNode,
    commentNode: CommentNode
  }), []);

  // ReactFlow controlled state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  // Editor features state
  const [layoutDir, setLayoutDir] = useState<'TB' | 'LR'>('TB');
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Clipboard & History Stack
  const [clipboard, setClipboard] = useState<any[]>([]);
  const [history, setHistory] = useState<{ nodes: any[]; edges: any[] }[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [versionSnapshots, setVersionSnapshots] = useState<{ id: string; label: string; time: string; nodes: any[]; edges: any[] }[]>([]);

  // Push history snapshot
  const pushHistory = useCallback((newNodes: any[], newEdges: any[]) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIdx + 1);
      return [...sliced, { nodes: newNodes, edges: newEdges }];
    });
    setHistoryIdx(prev => prev + 1);
  }, [historyIdx]);

  // Undo / Redo
  const handleUndo = useCallback(() => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setNodes(prev.nodes);
      setEdges(prev.edges);
      setHistoryIdx(historyIdx - 1);
    }
  }, [history, historyIdx, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setNodes(next.nodes);
      setEdges(next.edges);
      setHistoryIdx(historyIdx + 1);
    }
  }, [history, historyIdx, setNodes, setEdges]);

  // Auto Layout
  const handleAutoLayout = useCallback((dir: 'TB' | 'LR' = layoutDir) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, dir);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    pushHistory(layoutedNodes, layoutedEdges);
    setTimeout(() => fitView({ padding: 0.2, duration: 250 }), 100);
  }, [nodes, edges, layoutDir, setNodes, setEdges, fitView, pushHistory]);

  // Sync state from Zustand activeWorkflow
  useEffect(() => {
    if (!activeWorkflow || activeWorkflow.nodes.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const mappedNodes = activeWorkflow.nodes.map((node, idx) => {
      const nodeTask = node.task || node.name || `Task ${idx + 1}`;
      const assignedAgent = node.assignedAgent || node.assignedAgentId || 'Orbit Core Agent';

      return {
        id: node.id,
        type: 'agentNode',
        position: { x: node.positionX || 0, y: node.positionY || 0 },
        data: { 
          id: node.id,
          index: idx,
          name: node.name || nodeTask, 
          task: nodeTask,
          assignedAgent: assignedAgent,
          capability: node.capability || 'general', 
          status: node.status || 'pending', 
          costEstimate: node.costEstimate || 0.15,
          assignedAgentId: node.assignedAgentId || 'agent-core',
          trustScore: (node as any).trustScore || 94,
          output: node.output,
          error: node.error,
          retryCount: node.status === 'failed' ? 2 : 0,
        }
      };
    });

    const mappedEdges = activeWorkflow.edges.map((edge, idx) => {
      const src = edge.source || (edge as any).sourceNode;
      const tgt = edge.target || (edge as any).targetNode;
      const sourceNode = activeWorkflow.nodes.find(n => n.id === src);
      const isCompleted = sourceNode?.status === 'completed';
      const isRunning = sourceNode?.status === 'running';

      return {
        id: edge.id || `e-${idx}`,
        source: src,
        target: tgt,
        animated: isRunning || isSimulating,
        label: isCompleted ? 'Completed' : (isRunning ? 'Processing' : '0.05 USDC'),
        labelStyle: { fill: '#9CA3AF', fontSize: 10, fontFamily: 'monospace' },
        labelBgStyle: { fill: '#050505', rx: 4, ry: 4 },
        labelBgPadding: [6, 4],
        style: { 
          stroke: isCompleted ? '#34D399' : (isRunning ? '#4EA3FF' : '#232323'),
          strokeWidth: isRunning || isCompleted ? 2.5 : 1.5
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isCompleted ? '#34D399' : (isRunning ? '#4EA3FF' : '#444')
        }
      };
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(mappedNodes, mappedEdges, layoutDir);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Initial Snapshot
    setHistory([{ nodes: layoutedNodes, edges: layoutedEdges }]);
    setHistoryIdx(0);

    setVersionSnapshots(prev => {
      if (prev.length === 0) {
        return [{
          id: 'v1.0',
          label: 'Initial Generated DAG',
          time: new Date().toLocaleTimeString(),
          nodes: layoutedNodes,
          edges: layoutedEdges
        }];
      }
      return prev;
    });

    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 250 }).catch(() => {});
    }, 120);

    return () => clearTimeout(timer);
  }, [activeWorkflow, fitView]);

  // Graph Validation Engine
  const graphValidation = useMemo(() => {
    if (nodes.length === 0) return { valid: true, warnings: [] };
    const warnings: string[] = [];
    const connectedNodeIds = new Set<string>();

    edges.forEach(e => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });

    nodes.forEach(n => {
      if (n.type === 'agentNode' && !connectedNodeIds.has(n.id) && nodes.length > 1) {
        warnings.push(`Node "${n.data?.name || n.id}" is disconnected from the DAG flow.`);
      }
    });

    return {
      valid: warnings.length === 0,
      warnings
    };
  }, [nodes, edges]);

  // Node Selection Handler
  const handleNodeClick = (_event: any, node: any) => {
    setSelectedNodeData(node.data);
    setInspectorOpen(true);
    if (onSelectNode) {
      onSelectNode(node.data);
    }
  };

  // Add Dynamic Node
  const handleAddNode = () => {
    const newId = `node-custom-${Date.now()}`;
    const newNode = {
      id: newId,
      type: 'agentNode',
      position: { x: 250 + Math.random() * 80, y: 150 + Math.random() * 80 },
      data: {
        id: newId,
        index: nodes.length,
        name: `Custom Agent Node ${nodes.length + 1}`,
        task: 'Execute custom capability task',
        assignedAgent: 'Orbit Custom Worker',
        capability: 'custom_processing',
        status: 'pending',
        costEstimate: 0.10,
        assignedAgentId: 'agent-custom-1',
        trustScore: 95
      }
    };
    const nextNodes = [...nodes, newNode];
    setNodes(nextNodes);
    pushHistory(nextNodes, edges);
  };

  // Add Comment Note
  const handleAddComment = () => {
    const newId = `comment-${Date.now()}`;
    const newComment = {
      id: newId,
      type: 'commentNode',
      position: { x: 100 + Math.random() * 60, y: 80 + Math.random() * 60 },
      data: {
        label: 'Parallel capability barrier: Verification & audit must resolve before synthesis.',
        author: 'Mahit Saxena'
      }
    };
    const nextNodes = [...nodes, newComment];
    setNodes(nextNodes);
    pushHistory(nextNodes, edges);
  };

  // Delete Selected Node
  const handleDeleteSelected = () => {
    if (!selectedNodeData) return;
    const nextNodes = nodes.filter(n => n.id !== selectedNodeData.id);
    const nextEdges = edges.filter(e => e.source !== selectedNodeData.id && e.target !== selectedNodeData.id);
    setNodes(nextNodes);
    setEdges(nextEdges);
    setSelectedNodeData(null);
    setInspectorOpen(false);
    pushHistory(nextNodes, nextEdges);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (isCmdOrCtrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      } else if (isCmdOrCtrl && e.key === 'l') {
        e.preventDefault();
        handleAutoLayout();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          handleDeleteSelected();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleAutoLayout, selectedNodeData]);

  // Dry-Run Simulation Mode Toggle
  const handleToggleSimulation = () => {
    setIsSimulating(prev => !prev);
    setEdges(prev => prev.map(e => ({ ...e, animated: !isSimulating })));
  };

  // Create Snapshot
  const handleCreateSnapshot = () => {
    const newVer = `v1.${versionSnapshots.length}`;
    const snap = {
      id: newVer,
      label: `Checkpoint (${nodes.length} nodes)`,
      time: new Date().toLocaleTimeString(),
      nodes: [...nodes],
      edges: [...edges]
    };
    setVersionSnapshots(prev => [snap, ...prev]);
  };

  return (
    <div className="w-full min-h-[520px] h-[580px] bg-[#050505] border border-[#232323] rounded-2xl relative overflow-hidden flex flex-col font-sans select-none shadow-2xl">
      
      {/* Top Bar Navigation & Tools */}
      <div className="h-12 bg-[#111111] border-b border-[#232323] px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs bg-black/60 border border-[#232323] text-gray-300 px-2.5 py-1 rounded-xl font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4EA3FF] animate-pulse"></span>
            WORKFLOW_CANVAS_V2
          </span>

          {/* Validation Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {graphValidation.valid ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DAG Valid</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400">{graphValidation.warnings[0]}</span>
              </>
            )}
          </div>
        </div>

        {/* Action Toolbar Buttons */}
        <div className="flex items-center gap-1">
          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIdx <= 0}
            title="Undo (Ctrl+Z)"
            className="p-1.5 bg-[#050505] hover:bg-white/5 disabled:opacity-30 border border-[#232323] text-gray-300 rounded-lg transition-all cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIdx >= history.length - 1}
            title="Redo (Ctrl+Y)"
            className="p-1.5 bg-[#050505] hover:bg-white/5 disabled:opacity-30 border border-[#232323] text-gray-300 rounded-lg transition-all cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-[#232323] mx-1" />

          {/* Auto Layout */}
          <button
            onClick={() => handleAutoLayout()}
            title="Auto Layout DAG (Ctrl+L)"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 text-xs font-mono rounded-lg transition-all cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#4EA3FF]" />
            <span>Auto Layout</span>
          </button>

          {/* Add Node */}
          <button
            onClick={handleAddNode}
            title="Add Custom Node"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 text-xs font-mono rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Node</span>
          </button>

          {/* Add Comment */}
          <button
            onClick={handleAddComment}
            title="Add Sticky Note"
            className="p-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 rounded-lg transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* MiniMap Toggle */}
          <button
            onClick={() => setShowMiniMap(prev => !prev)}
            title="Toggle MiniMap"
            className={`p-1.5 border rounded-lg transition-all cursor-pointer ${
              showMiniMap ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/30' : 'bg-[#050505] text-gray-400 border-[#232323]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
          </button>

          {/* Dry Run Simulation Toggle */}
          <button
            onClick={handleToggleSimulation}
            title="Execution Simulation Preview"
            className={`flex items-center gap-1 px-2.5 py-1 border text-xs font-mono rounded-lg transition-all cursor-pointer ${
              isSimulating ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' : 'bg-[#050505] text-gray-300 border-[#232323]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Simulating...' : 'Preview'}</span>
          </button>

          {/* Version History */}
          <button
            onClick={() => setVersionDrawerOpen(prev => !prev)}
            title="Version History"
            className="p-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 rounded-lg transition-all cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main ReactFlow Canvas */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          selectionOnDrag
          panOnScroll
        >
          <Controls 
            className="bg-[#111111] border border-[#232323] text-white rounded-xl p-1 shadow-xl" 
            showInteractive={true}
          />
          
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={18} 
            size={1} 
            color="#232323" 
          />

          {showMiniMap && (
            <MiniMap 
              style={{
                backgroundColor: '#050505',
                border: '1px solid #232323',
                borderRadius: '12px'
              }}
              nodeColor="#4EA3FF"
              maskColor="rgba(0, 0, 0, 0.75)"
            />
          )}

          {/* Collaborative Presence Indicator */}
          <Panel position="bottom-right" className="bg-[#111111]/90 border border-[#232323] p-2 rounded-xl text-[10px] font-mono text-gray-400 flex items-center gap-2 backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-[#4EA3FF]" />
            <span>Live Collaborators: <strong>Mahit S.</strong> (Active)</span>
          </Panel>
        </ReactFlow>
      </div>

      {/* Node Inspector Side Panel */}
      {inspectorOpen && selectedNodeData && (
        <div className="absolute top-14 right-4 bottom-4 w-72 bg-[#111111] border border-[#232323] rounded-2xl p-5 shadow-2xl z-30 flex flex-col justify-between backdrop-blur-xl animate-fade-in font-sans">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232323]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Sliders className="w-4 h-4 text-[#4EA3FF]" /> Node Inspector
              </span>
              <button 
                onClick={() => setInspectorOpen(false)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase">Node Title</label>
                <input
                  type="text"
                  value={selectedNodeData.name || ''}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setSelectedNodeData({ ...selectedNodeData, name: newName });
                    setNodes(prev => prev.map(n => n.id === selectedNodeData.id ? { ...n, data: { ...n.data, name: newName } } : n));
                  }}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-lg px-3 py-1.5 text-white font-sans outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase">Capability</label>
                <input
                  type="text"
                  value={selectedNodeData.capability || ''}
                  onChange={(e) => {
                    const newCap = e.target.value;
                    setSelectedNodeData({ ...selectedNodeData, capability: newCap });
                    setNodes(prev => prev.map(n => n.id === selectedNodeData.id ? { ...n, data: { ...n.data, capability: newCap } } : n));
                  }}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-lg px-3 py-1.5 text-white font-mono text-[11px] outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase">Assigned Agent</label>
                <input
                  type="text"
                  value={selectedNodeData.assignedAgent || ''}
                  readOnly
                  className="w-full bg-[#050505] border border-[#232323] rounded-lg px-3 py-1.5 text-gray-400 font-mono text-[11px] outline-none mt-1 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="bg-[#050505] p-2 rounded-lg border border-[#232323]">
                  <span className="text-gray-500 text-[9px] block">Cost</span>
                  <span className="text-white font-bold">{selectedNodeData.costEstimate ? `${selectedNodeData.costEstimate} USDC` : '0.15 USDC'}</span>
                </div>
                <div className="bg-[#050505] p-2 rounded-lg border border-[#232323]">
                  <span className="text-gray-500 text-[9px] block">Trust Score</span>
                  <span className="text-emerald-400 font-bold">{selectedNodeData.trustScore || 95}%</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDeleteSelected}
            className="w-full flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold py-2 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Node
          </button>
        </div>
      )}

      {/* Version History Drawer */}
      {versionDrawerOpen && (
        <div className="absolute top-14 left-4 bottom-4 w-64 bg-[#111111] border border-[#232323] rounded-2xl p-4 shadow-2xl z-30 flex flex-col justify-between backdrop-blur-xl animate-fade-in font-sans">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#232323]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <History className="w-4 h-4 text-[#4EA3FF]" /> Snapshots & History
              </span>
              <button 
                onClick={() => setVersionDrawerOpen(false)}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {versionSnapshots.map((snap) => (
                <div
                  key={snap.id}
                  onClick={() => {
                    setNodes(snap.nodes);
                    setEdges(snap.edges);
                  }}
                  className="bg-[#050505] hover:bg-white/5 border border-[#232323] p-2.5 rounded-xl cursor-pointer transition-all flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{snap.id}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{snap.time}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{snap.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateSnapshot}
            className="w-full flex items-center justify-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-2 rounded-xl transition-all cursor-pointer border-0"
          >
            <Plus className="w-3.5 h-3.5" /> Save Checkpoint
          </button>
        </div>
      )}

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
