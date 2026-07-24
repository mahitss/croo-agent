'use client';

import { useState, useEffect } from 'react';
import Canvas from '../../components/Canvas';
import { useActiveWorkflow } from '../../hooks/useActiveWorkflow';
import { useNexusStore } from '../../store/nexusStore';
import { DemoWorkflowRepository } from '../../services/demo/DemoWorkflowRepository';
import { useAgents } from '../../hooks/useAgents';
import { Play, RotateCcw, AlertTriangle, Sparkles, CheckCircle2, X, Terminal, Clock, ShieldAlert, Loader2, ArrowRight, Save, Compass } from 'lucide-react';
import { useToast } from '../../components/Toast';

const PLANNING_STEPS = [
  { label: 'Generating prompt...', desc: 'Optimizing query variables and intent markers' },
  { label: 'Selecting capabilities...', desc: 'Scanning intent schema templates and routing options' },
  { label: 'Matching agents...', desc: 'Evaluating live registry candidate pricing, latency, and bids' },
  { label: 'Building DAG...', desc: 'Compiling Directed Acyclic Graph structure and node coordinates' },
  { label: 'Optimizing execution...', desc: 'Validating cost constraints and resource allocation limits' },
  { label: 'Completed', desc: 'DAG compiled. Escrow contracts initialized.' }
];

export default function WorkflowPage() {
  const { agents } = useAgents();
  const {
    activeWorkflow,
    isRunning,
    generateWorkflow,
    startExecution,
    resetExecution,
    renameNode,
    deleteNode,
    retryNode
  } = useActiveWorkflow();

  const { toast } = useToast();

  // States
  const [promptInput, setPromptInput] = useState('');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStage, setPlanningStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nodeNameInput, setNodeNameInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlWorkflowId = params.get('workflowId');
    if (!urlWorkflowId) {
      resetExecution();
    } else {
      const repo = new DemoWorkflowRepository();
      repo.getWorkflow(urlWorkflowId).then((wf) => {
        if (wf) {
          useNexusStore.setState({
            activeWorkflow: wf,
            appState: wf.status === 'completed' ? 'completed' : 'running'
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (selectedNode) {
      setNodeNameInput(selectedNode.name);
    }
  }, [selectedNode]);

  const handleGenerateWorkflow = async () => {
    if (!promptInput.trim()) return;
    setIsPlanning(true);
    setSelectedNode(null);
    setErrorMsg(null);
    setPlanningStage(0);
    
    try {
      // Step through planning stages
      for (let i = 0; i <= 5; i++) {
        setPlanningStage(i);
        await new Promise(r => setTimeout(r, 600));
      }
      
      await generateWorkflow(promptInput, 'balanced', 2.0);
      toast('Workflow generated successfully.', 'success');
      await startExecution(promptInput, 'balanced', 2.0);
    } catch (err: any) {
      const msg = err.message || err || 'Failed to connect to backend AI services';
      setErrorMsg(msg);
      toast(`Generation failed: ${msg}`, 'error');
    } finally {
      setIsPlanning(false);
    }
  };

  const handleLaunchSwarm = async () => {
    if (activeWorkflow) {
      toast('Launching execution swarm...', 'info');
      await startExecution(activeWorkflow.query, activeWorkflow.routingMode || 'balanced', activeWorkflow.budget || 2.0);
    }
  };

  const handleSaveWorkflow = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast('Workflow successfully saved.', 'success');
    }, 800);
  };

  const handleDeployWorkflow = () => {
    toast('Workflow deployed to active workspace swarms.', 'success');
  };

  const liveSelectedNode = (selectedNode && activeWorkflow)
    ? activeWorkflow.nodes.find((n: any) => n.id === selectedNode.id) || selectedNode
    : selectedNode;

  const assignedAgent = liveSelectedNode 
    ? agents.find(a => a.id === liveSelectedNode.assignedAgentId) 
    : null;

  return (
    <div className="flex-1 flex flex-col bg-[#050505] min-h-[calc(100vh-80px)] selection:bg-[#4EA3FF]/30 relative font-sans">
      
      {/* 1. TOP HEADER PANEL */}
      <div className="h-[64px] border-b border-[#232323] bg-[#050505] px-8 flex items-center justify-between z-20">
        {/* LEFT: Info Badges */}
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-white truncate max-w-[180px]">
            {activeWorkflow ? activeWorkflow.name : 'Untitled Workflow'}
          </h2>
          <span className="bg-[#111111] border border-[#232323] text-gray-400 text-[10px] font-mono px-2 py-0.5 rounded-lg select-none">
            v1.0.0
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg select-none flex items-center gap-1.5 border ${
            isRunning 
              ? 'bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]' 
              : activeWorkflow?.status === 'completed'
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-[#111111] border-[#232323] text-gray-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-[#4EA3FF] animate-pulse' : 'bg-gray-500'}`} />
            <span>{isRunning ? 'Running' : activeWorkflow?.status ? activeWorkflow.status.toUpperCase() : 'Idle'}</span>
          </span>
        </div>

        {/* MIDDLE: Collaborators */}
        <div className="hidden md:flex items-center -space-x-2">
          {['MS', 'AI', 'JD'].map((initials, index) => (
            <div 
              key={initials}
              className={`w-7 h-7 rounded-full border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold select-none ${
                index === 0 ? 'bg-[#4EA3FF] text-black' : 'bg-[#111111] text-gray-400'
              }`}
            >
              {initials}
            </div>
          ))}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {activeWorkflow && (
            <>
              <button
                onClick={handleSaveWorkflow}
                disabled={isSaving}
                className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                onClick={handleLaunchSwarm}
                disabled={isRunning}
                className="flex items-center justify-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer disabled:opacity-50 border-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run</span>
              </button>
              <button
                onClick={handleDeployWorkflow}
                className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer"
              >
                Deploy
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. BODY CONTENT (Canvas or Planning or Empty) */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* EMPTY STATE */}
        {!activeWorkflow && !isPlanning && (
          <div className="flex-1 max-w-lg mx-auto flex flex-col items-center justify-center p-6 gap-8 text-center min-h-[60vh] select-none">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#232323] flex items-center justify-center text-[#4EA3FF]">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-semibold text-white tracking-tight">Generate Execution Workflow</h2>
              <p className="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
                Describe the autonomous agents swarm workflow you want to construct. The AI swarm architect will compile the nodes.
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              <textarea
                rows={3}
                placeholder="e.g. Conduct a comprehensive compliance audit of our active contracts repository and compile a PDF brief..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full bg-[#111111] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-2xl p-4 text-xs text-white placeholder-gray-500 outline-none resize-none transition-all"
              />
              <button
                onClick={handleGenerateWorkflow}
                disabled={!promptInput.trim()}
                className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-3 rounded-2xl transition-all cursor-pointer disabled:opacity-50 border-0"
              >
                Generate Swarm Nodes
              </button>
            </div>
          </div>
        )}

        {/* PLANNING LOADER */}
        {isPlanning && (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#050505] p-6 z-10 select-none">
            <div className="max-w-md w-full flex flex-col gap-8 bg-[#111111] border border-[#232323] p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 border-b border-[#232323] pb-4">
                <Loader2 className="w-5 h-5 text-[#4EA3FF] animate-spin" />
                <h3 className="text-sm font-semibold text-white">Compiling Agent Workflow</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {PLANNING_STEPS.map((step, idx) => {
                  const isActive = idx === planningStage;
                  const isDone = idx < planningStage;
                  return (
                    <div 
                      key={step.label}
                      className={`flex items-start gap-3 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : isDone ? 'opacity-50' : 'opacity-20'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#4EA3FF]" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-[#4EA3FF] animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-600" />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white">{step.label}</span>
                        {isActive && <span className="text-[10px] text-gray-500">{step.desc}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE CANVAS & SIDEBAR */}
        {activeWorkflow && !isPlanning && (
          <>
            {/* ReactFlow Canvas container */}
            <div className="flex-1 relative h-full">
              <Canvas onSelectNode={setSelectedNode} />
            </div>

            {/* MINIMAL NODE DETAIL PANEL */}
            {liveSelectedNode && (
              <div className="w-[340px] border-l border-[#232323] bg-[#111111] p-6 flex flex-col gap-6 overflow-y-auto z-10 animate-slide-in select-none">
                <div className="flex items-center justify-between border-b border-[#232323] pb-4">
                  <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
                    Agent Node Config
                  </h3>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white cursor-pointer bg-transparent border-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between bg-[#050505] border border-[#232323] px-4 py-3 rounded-xl">
                  <span className="text-xs text-[#9CA3AF]">Status</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${
                    liveSelectedNode.status === 'completed'
                      ? 'bg-white/10 border-white/20 text-white'
                      : liveSelectedNode.status === 'running'
                        ? 'bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]'
                        : 'bg-[#111111] border-[#232323] text-gray-400'
                  }`}>
                    {liveSelectedNode.status ? liveSelectedNode.status.toUpperCase() : 'PENDING'}
                  </span>
                </div>

                {/* Edit Form */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-mono uppercase">Node Identifier</label>
                  <input
                    type="text"
                    value={nodeNameInput}
                    onChange={(e) => {
                      setNodeNameInput(e.target.value);
                      renameNode(liveSelectedNode.id, e.target.value);
                    }}
                    className="w-full bg-[#050505] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Assigned Agent Details */}
                {assignedAgent && (
                  <div className="flex flex-col gap-3 border-t border-[#232323] pt-5">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Assigned AI Worker</span>
                    <div className="flex items-start gap-3 bg-[#050505] border border-[#232323] p-3 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#4EA3FF] shrink-0 font-bold text-xs select-none">
                        {assignedAgent.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-white">{assignedAgent.name}</span>
                        <span className="text-[10px] text-gray-500 font-sans leading-relaxed">{assignedAgent.description}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col gap-2.5 mt-auto pt-6 border-t border-[#232323]">
                  {liveSelectedNode.status === 'failed' && (
                    <button
                      onClick={() => {
                        retryNode(liveSelectedNode.id);
                        toast('Retrying node execution...', 'info');
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-2.5 rounded-xl cursor-pointer border-0"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Node</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteNode(liveSelectedNode.id);
                      setSelectedNode(null);
                      toast('Removed node from canvas.', 'info');
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-red-500/10 border border-[#232323] hover:border-red-500/30 text-red-400 text-xs font-semibold py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>Delete Node</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
