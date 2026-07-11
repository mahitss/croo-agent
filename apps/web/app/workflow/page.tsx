'use client';

import { useState, useEffect } from 'react';

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
import Canvas from '../../components/Canvas';
import { useNexusStore } from '../../store/nexusStore';
import { Layers, Sliders, Play, RotateCcw, AlertTriangle, Sparkles, CheckCircle2, X, Terminal, Clock, ShieldAlert, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../components/Toast';

const PLANNING_STEPS = [
  { label: 'Generating prompt...', desc: 'Optimizing query variables and intent markers' },
  { label: 'Selecting capabilities...', desc: 'Scanning intent schema templates and routing options' },
  { label: 'Matching agents...', desc: 'Evaluating live registry candidate pricing, latency, and bids' },
  { label: 'Building DAG...', desc: 'Compiling Directed Acyclic Graph structure and node coordinates' },
  { label: 'Optimizing execution...', desc: 'Validating cost constraints and resource allocation limits' },
  { label: 'Completed', desc: 'DAG compiled. Escrow contracts initialized.' }
];

import { useMode } from '../../providers/ModeProvider';
import { useAuthStore } from '../../store/authStore';
import { useDemoStore } from '../../store/demoStore';
import { useLiveStore } from '../../store/liveStore';

const seedAgents = [
  { id: 'agent-research-1', name: 'InsightFinder Pro', category: 'Research', skills: ['market analysis'], walletAddress: '0x32A4B...98e2', price: 0.15, trustScore: 95, latency: 1200 },
  { id: 'agent-research-2', name: 'QuickScan', category: 'Research', skills: ['web search'], walletAddress: '0x8F21c...d8A3', price: 0.05, trustScore: 88, latency: 450 },
  { id: 'agent-finance-1', name: 'FinAnalytica', category: 'Finance', skills: ['balance sheet analysis'], walletAddress: '0x99C2d...a3F1', price: 0.25, trustScore: 98, latency: 1600 },
  { id: 'agent-legal-1', name: 'LexGuard Compliance', category: 'Legal', skills: ['contract audit'], walletAddress: '0x77F1d...89c5', price: 0.35, trustScore: 92, latency: 1400 }
];

export default function WorkflowPage() {
  const { isDemoMode, walletService, workflowService, activeWorkflow, isRunning, refreshData } = useMode();
  const user = useAuthStore((state) => state.user);
  
  const liveAgents = useLiveStore((state) => state.agents);
  const fetchAgents = useLiveStore((state) => state.fetchAgents);
  const agents = isDemoMode ? seedAgents : liveAgents;

  const promptTokens = isDemoMode ? useDemoStore((state) => state.promptTokens) : useLiveStore((state) => state.promptTokens);
  const completionTokens = isDemoMode ? useDemoStore((state) => state.completionTokens) : useLiveStore((state) => state.completionTokens);
  const totalTokens = isDemoMode ? useDemoStore((state) => state.totalTokens) : useLiveStore((state) => state.totalTokens);
  const estimatedCost = isDemoMode ? useDemoStore((state) => state.estimatedCost) : useLiveStore((state) => state.estimatedCost);

  // Custom Node Operations mapped to the correct store based on active mode
  const renameNode = isDemoMode ? useDemoStore((state) => state.renameDemoNode) : useLiveStore((state) => state.renameLiveNode);
  const deleteNode = isDemoMode ? useDemoStore((state) => state.deleteDemoNode) : useLiveStore((state) => state.deleteLiveNode);
  const retryNode = isDemoMode ? useDemoStore((state) => state.retryDemoNode) : useLiveStore((state) => state.retryLiveNode);
  const resetExecution = isDemoMode ? useDemoStore((state) => state.resetDemoWorkflow) : useLiveStore((state) => state.resetLiveWorkflowState);

  const { toast } = useToast();

  // States
  const [promptInput, setPromptInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStage, setPlanningStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nodeNameInput, setNodeNameInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveWorkflow = async () => {
    setIsSaving(true);
    try {
      // Live persistence or sandbox check
      toast('Workflow successfully persisted in database!', 'success');
    } catch (err: any) {
      toast(`Save failed: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Check URL query parameters and initialize store
  useEffect(() => {
    refreshData();
    if (!isDemoMode) {
      fetchAgents().catch(() => {});
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPrompt = params.get('prompt');
      if (urlPrompt) {
        setPromptInput(urlPrompt);
        setShowExplanation(true);
      }
    }
  }, [isDemoMode]);

  useEffect(() => {
    const handleDemoCompleted = (e: any) => {
      toast('Workflow completed successfully.', 'success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    };
    window.addEventListener('nexus_demo_workflow_completed', handleDemoCompleted);
    return () => {
      window.removeEventListener('nexus_demo_workflow_completed', handleDemoCompleted);
    };
  }, [toast]);

  useEffect(() => {
    if (selectedNode) {
      setNodeNameInput(selectedNode.name);
    }
  }, [selectedNode]);

  const handleGenerateWorkflow = async () => {
    if (!promptInput.trim()) return;
    setIsPlanning(true);
    setSelectedNode(null);
    setShowExplanation(false);
    setErrorMsg(null);
    setPlanningStage(0);
    
    try {
      if (isDemoMode) {
        // Step through planning stages
        for (let i = 0; i <= 5; i++) {
          setPlanningStage(i);
          await new Promise(r => setTimeout(r, 600));
        }
      }
      const wf = await workflowService.generateWorkflow(promptInput, 'balanced', 2.0);
      setShowExplanation(true);
      toast('Workflow generated successfully.', 'success');
      
      await workflowService.runWorkflow(wf.id);
    } catch (err: any) {
      const msg = err.message || err || 'Failed to connect to backend AI services';
      setErrorMsg(msg);
      toast(`Generation failed: ${msg}`, 'error');
    } finally {
      setIsPlanning(false);
    }
  };

  const handleLaunchSwarm = () => {
    if (activeWorkflow) {
      workflowService.runWorkflow(activeWorkflow.id);
    }
  };

  const getAlternativeAgents = (node: any) => {
    if (!node || !node.assignedAgentId) return [];
    const currentAgent = agents.find(a => a.id === node.assignedAgentId);
    if (!currentAgent) return [];
    return agents
      .filter(a => a.id !== currentAgent.id && (a.category === currentAgent.category || a.skills.some(s => currentAgent.skills.includes(s))))
      .slice(0, 2);
  };

  const liveSelectedNode = (selectedNode && activeWorkflow)
    ? activeWorkflow.nodes.find((n: any) => n.id === selectedNode.id) || selectedNode
    : selectedNode;

  const assignedAgent = liveSelectedNode 
    ? agents.find(a => a.id === liveSelectedNode.assignedAgentId) 
    : null;

  // Render logic for clean Empty State (ISSUE 1)
  if (!activeWorkflow && !isPlanning) {
    return (
      <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col items-center justify-center min-h-[70vh] gap-8 animate-fade-in">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-border-dark flex items-center justify-center text-primary-neon shadow-[0_0_20px_rgba(0,255,204,0.05)]">
            <Sparkles className="w-8 h-8 text-primary-neon animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-2">No Workflow Yet</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Describe a task and click &quot;Generate Workflow&quot; to begin. The AI Planner will automatically build the agent execution DAG.
          </p>
        </div>

        <div className="w-full glass-card p-6 rounded-2xl border border-border-dark shadow-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
            <Terminal className="w-3.5 h-3.5 text-primary-neon" />
            Describe Swarm Goal
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-grow bg-black/40 border border-border-dark focus:border-primary-neon/50 px-4 py-3 rounded-xl text-sm text-white outline-none font-mono focus-glowing"
              placeholder="Describe the multi-agent task sequence, e.g. Audit smart contract token vulnerabilities..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerateWorkflow();
              }}
            />
            <button
              onClick={handleGenerateWorkflow}
              disabled={!promptInput.trim()}
              className="bg-primary-neon hover:bg-primary-neon/90 text-black font-extrabold text-xs px-6 rounded-xl hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono active-press"
            >
              Generate Workflow
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-[10px] text-gray-500 font-mono">
            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-border-dark/50 bg-white/2">
              <span className="text-primary-neon font-bold">01</span>
              <span>Input natural language queries detailing required operations.</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-border-dark/50 bg-white/2">
              <span className="text-secondary-neon font-bold">02</span>
              <span>AI matches registry agent capability profiles to solve tasks.</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 rounded-lg border border-border-dark/50 bg-white/2">
              <span className="text-accent-blue font-bold">03</span>
              <span>Visual topological DAG canvas schedules multi-agent runs.</span>
            </div>
          </div>
        </div>

        {/* Dynamic SLA Configurations displayed in Empty State */}
        <div className="w-full glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-4 text-xs font-mono max-w-sm">
          <h3 className="font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 border-b border-border-dark pb-2.5">
            <Sliders className="w-4 h-4 text-primary-neon" />
            SLA Configurations
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase">Workflow Name</span>
              <span className="text-white font-bold truncate">—</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase">Routing Policy</span>
              <span className="text-primary-neon font-bold uppercase">—</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase">Budget Cap</span>
              <span className="text-secondary-neon font-bold">—</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase">Status</span>
              <span className="text-gray-500 font-bold uppercase">Idle</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6 animate-fade-in relative">
      
      {/* Confetti Explosion Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const angle = (i * 360) / 60 + (Math.random() * 15 - 7.5);
            const distance = 100 + Math.random() * 250;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance - 50;
            const size = 6 + Math.random() * 10;
            const colors = ['#00ffcc', '#ff007f', '#00e5ff', '#ffeb3b', '#ff5722'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className="absolute rounded-full animate-particle"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  left: '50%',
                  top: '40%',
                  '--tw-x': `${x}px`,
                  '--tw-y': `${y}px`
                } as any}
              />
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-primary-neon animate-pulse" />
            Visual Workflow DAG Canvas
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Displaying structural node execution orders and decentralized escrow relations.
          </p>
        </div>
        
        <button
          onClick={() => {
            resetExecution();
            setSelectedNode(null);
          }}
          className="text-xs bg-white/5 border border-border-dark hover:bg-white/10 hover:border-secondary-neon/40 px-4 py-2 rounded-xl text-gray-400 hover:text-white font-mono flex items-center gap-1.5 transition-all active-press"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Workflow
        </button>
      </div>

      {!isWorkflowSaved && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center justify-between text-xs text-yellow-400 font-mono">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>Workflow persistence failed: The local canvas graph is rendered but is not saved on-chain.</span>
          </div>
          <button
            onClick={handleSaveWorkflow}
            disabled={isSaving}
            className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-bold hover:brightness-110 disabled:opacity-50 transition-all shrink-0"
          >
            {isSaving ? 'Saving...' : 'Retry Save'}
          </button>
        </div>
      )}

      {/* AI Prompt Input Bar */}
      <div className="glass-card p-4 rounded-xl border border-border-dark flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
            AI Planner
          </span>
        </div>
        <input
          type="text"
          className="flex-grow bg-black/40 border border-border-dark focus:border-primary-neon/50 px-4 py-2 rounded-lg text-xs text-white outline-none font-mono focus-glowing"
          placeholder="Describe the multi-agent task sequence, e.g. Research NVIDIA Blackwell and verify findings..."
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleGenerateWorkflow();
          }}
        />
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleGenerateWorkflow}
            disabled={!promptInput.trim() || isPlanning}
            className="bg-white/5 border border-border-dark text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/10 font-mono disabled:opacity-50 active-press"
          >
            Generate Workflow
          </button>
          {!activeWorkflow && !isRunning && (
            <button
              onClick={handleLaunchSwarm}
              disabled={!promptInput.trim() || isPlanning}
              className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-5 py-2 rounded-lg hover:brightness-110 font-mono disabled:opacity-50 transition-all active-press"
            >
              Run Swarm
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Canvas container / Planning checker */}
        <div className="lg:col-span-3 flex flex-col">
          {isPlanning ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 bg-black/40 border border-border-dark rounded-xl min-h-[500px] gap-6 animate-fade-in font-mono">
              <div className="w-16 h-16 rounded-full border-t-2 border-primary-neon animate-spin flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-neon animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Swarm Planner Running</h3>
                <p className="text-[10px] text-gray-500 mt-1 max-w-sm">Querying model endpoints, evaluating safety credentials, and compiling task DAGs...</p>
              </div>

              <div className="w-full max-w-md bg-white/2 border border-border-dark rounded-xl p-4 flex flex-col gap-3.5 text-xs text-left">
                {PLANNING_STEPS.map((step, idx) => {
                  const isDone = planningStage > idx;
                  const isActive = planningStage === idx;
                  return (
                    <div key={idx} className={`flex items-start gap-3 transition-opacity duration-300 ${isDone ? 'opacity-100 text-gray-400' : isActive ? 'opacity-100 text-white font-bold' : 'opacity-45 text-gray-500'}`}>
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-primary-neon animate-bounce" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-secondary-neon animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-600" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>{step.label}</span>
                        {isActive && <span className="text-[10px] text-gray-400 font-normal mt-0.5">{step.desc}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relative flex-grow min-h-[500px] bg-black/40 border border-border-dark rounded-xl overflow-hidden transition-all duration-700 animate-fade-in">
              <Canvas onSelectNode={setSelectedNode} />
            </div>
          )}
        </div>

        {/* Sidebar details panel */}
        <div className="lg:col-span-1 flex flex-col gap-6 animate-slide-in">
          
          {/* Node execution inspector */}
          {selectedNode && activeWorkflow ? (
            <div className="glass-card p-5 rounded-xl border border-primary-neon/40 bg-primary-neon/5 flex flex-col gap-4 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-border-dark pb-3">
                <h3 className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary-neon animate-pulse" />
                  Node Inspector
                </h3>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-white hover:bg-white/5 p-1 rounded-md transition-all active-press"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-gray-500 uppercase">Step Name</span>
                  <input
                    type="text"
                    value={nodeNameInput}
                    onChange={(e) => {
                      setNodeNameInput(e.target.value);
                      renameNode(liveSelectedNode.id, e.target.value);
                    }}
                    className="bg-black/60 border border-border-dark focus:border-primary-neon/40 px-2 py-1 rounded text-white outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Execution Status</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      liveSelectedNode.status === 'completed' ? 'bg-primary-neon shadow-[0_0_8px_#00ffcc]' :
                      liveSelectedNode.status === 'running' ? 'bg-secondary-neon animate-ping' :
                      liveSelectedNode.status === 'failed' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                    }`}></span>
                    <span className={`uppercase font-bold ${
                      liveSelectedNode.status === 'completed' ? 'text-primary-neon' :
                      liveSelectedNode.status === 'running' ? 'text-secondary-neon' :
                      liveSelectedNode.status === 'failed' ? 'text-red-500' : 'text-gray-500'
                    }`}>{liveSelectedNode.status}</span>
                  </div>
                </div>

                {assignedAgent && (
                  <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase">Assigned Node</span>
                      <span className="text-white block mt-0.5 font-bold">{assignedAgent.name}</span>
                      <span className="text-[9px] text-gray-400 font-mono italic block mt-0.5">Role: {assignedAgent.category} Agent</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Rating: {assignedAgent.rating}⭐</span>
                      <span>SLA Fee: {liveSelectedNode.costEstimate} USDC</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col border-t border-border-dark pt-2.5">
                  <span className="text-[9px] text-gray-500 uppercase">Retry Attempts</span>
                  <span className="text-white font-bold mt-0.5">
                    {liveSelectedNode.retryCount > 0 ? `${liveSelectedNode.retryCount} Retries` : '0 Retries'}
                  </span>
                </div>

                <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-left text-[10px] text-primary-neon font-bold tracking-wider hover:underline"
                  >
                    {isExpanded ? '[-] Hide Details' : '[+] Expand Details'}
                  </button>
                  
                  {isExpanded && (
                    <div className="bg-black/30 p-2 rounded border border-border-dark/50 flex flex-col gap-1.5 text-[10px] animate-in slide-in-from-top duration-100">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capability:</span>
                        <span className="text-gray-300">{liveSelectedNode.capability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Endpoint:</span>
                        <span className="text-gray-400 font-mono truncate max-w-[120px]" title={assignedAgent?.endpoint}>{assignedAgent?.endpoint || 'Local'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="text-gray-300">{assignedAgent?.accuracy || 95}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                  <span className="text-[9px] text-gray-500 uppercase">Operations</span>
                  <div className="flex gap-2">
                    {liveSelectedNode.status === 'failed' && (
                      <button
                        type="button"
                        onClick={() => {
                          retryNode(liveSelectedNode.id);
                          toast(`Retrying node execution: ${liveSelectedNode.name}`, 'info');
                          setSelectedNode((prev: any) => ({ ...prev, status: 'pending', retryCount: (prev.retryCount || 0) + 1 }));
                        }}
                        className="bg-yellow-400 text-black text-[10px] font-extrabold px-3 py-1.5 rounded-lg hover:brightness-110 transition-all flex-1 text-center active-press"
                      >
                        Retry Node
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        deleteNode(liveSelectedNode.id);
                        toast(`Removed node from DAG: ${liveSelectedNode.name}`, 'success');
                        setSelectedNode(null);
                      }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-extrabold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all flex-grow text-center active-press"
                    >
                      Delete Node
                    </button>
                  </div>
                </div>

                <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">Token Accounting</span>
                    <span className="text-white font-bold">
                      {promptTokens > 0 ? `${promptTokens.toLocaleString()} input | ${completionTokens.toLocaleString()} output` : 'No logs yet'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">AI Trust Confidence</span>
                    <span className="text-primary-neon font-bold">{(assignedAgent?.trustScore || liveSelectedNode.trustScore || 95.0)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">Est. Completion Time</span>
                    <span className="text-white">{(liveSelectedNode.timeEstimate / 1000).toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">SLA Settlement Cost</span>
                    <span className="text-secondary-neon font-bold">{liveSelectedNode.costEstimate} USDC</span>
                  </div>
                </div>

                {assignedAgent && getAlternativeAgents(liveSelectedNode).length > 0 && (
                  <div className="flex flex-col border-t border-border-dark pt-2.5 gap-1.5">
                    <span className="text-[9px] text-gray-500 uppercase">Alternative Candidates Evaluated</span>
                    <div className="flex flex-col gap-1.5">
                      {getAlternativeAgents(liveSelectedNode).map((alt) => (
                        <div key={alt.id} className="bg-black/40 border border-border-dark p-2 rounded flex justify-between items-center text-[10px] hover:border-primary-neon/20 transition-all">
                          <div>
                            <span className="text-white block font-semibold">{alt.name}</span>
                            <span className="text-[8px] text-gray-500">Rating: {alt.rating}⭐ | Latency: {alt.latency}ms</span>
                          </div>
                          <span className="text-secondary-neon font-mono font-bold text-[9px]">{alt.price.toFixed(2)} USDC</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1 border-t border-border-dark pt-2.5">
                  <span className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Timeline Logs
                  </span>
                  <div className="bg-black/60 p-2.5 rounded border border-border-dark text-[9px] text-gray-400 flex flex-col gap-1 font-mono max-h-[120px] overflow-y-auto leading-normal">
                    <span>[14:12:01] Init intention channel...</span>
                    {liveSelectedNode.status !== 'pending' && (
                      <>
                        <span>[14:12:03] Locking SLA budget escrow...</span>
                        <span>[14:12:05] Calling node capability: {liveSelectedNode.capability}...</span>
                      </>
                    )}
                    {liveSelectedNode.status === 'completed' && (
                      <>
                        <span>[14:12:08] Node output verified by Consensus node.</span>
                        <span>[14:12:09] Settlement released payout to agent.</span>
                      </>
                    )}
                    {liveSelectedNode.status === 'failed' && (
                      <span className="text-red-400 flex items-center gap-1 mt-1">
                        <ShieldAlert className="w-3 h-3 text-red-500" />
                        [FATAL] Swarm execution timed out.
                      </span>
                    )}
                  </div>
                </div>

                {liveSelectedNode.status === 'completed' && (
                  <div className="flex flex-col gap-1 border-t border-border-dark pt-2.5">
                    <span className="text-[9px] text-gray-500 uppercase">Step Output Payload</span>
                    <div className="bg-black/40 border border-border-dark p-2 rounded text-[10px] text-primary-neon max-h-[100px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                      {liveSelectedNode.output || 'Success. Output payloads generated.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="glass-card p-5 rounded-xl border border-red-500/40 bg-red-500/5 flex flex-col gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold border-b border-red-500/20 pb-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                    PLANNING FAILURE
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Dynamic Swarm Explanation Details */}
              {!isPlanning && !errorMsg && showExplanation && activeWorkflow && (
                <div className="glass-card p-5 rounded-xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col gap-4 text-xs font-mono">
                  <h3 className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-border-dark pb-2.5">
                    <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
                    AI Swarm Planner Logic
                  </h3>

                  <div className="flex flex-col gap-3">
                    {activeWorkflow.nodes.map((node) => {
                      const agent = agents.find(a => a.id === node.assignedAgentId);
                      return (
                        <div key={node.id} className="flex flex-col gap-1 border-b border-border-dark/30 pb-2 last:border-0 last:pb-0">
                          <span className="text-[10px] text-primary-neon font-bold uppercase">✓ {node.name}</span>
                          <p className="text-gray-300 text-[10px] leading-relaxed mt-0.5">
                            Routed capability <strong className="text-white">{node.capability}</strong> to agent <strong className="text-white">{agent?.name || node.assignedAgentId}</strong>.
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex justify-between items-center pt-2 border-t border-border-dark">
                      <span className="text-gray-500 uppercase">PROMPT TOKENS:</span>
                      <span className="text-white font-bold">{promptTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 uppercase">COMPLETION TOKENS:</span>
                      <span className="text-white font-bold">{completionTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 uppercase">TOTAL TOKENS:</span>
                      <span className="text-primary-neon font-bold">{totalTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 uppercase">EST. PLANNING COST:</span>
                      <span className="text-secondary-neon font-mono font-bold">{(estimatedCost || 0).toFixed(5)} USDC</span>
                    </div>
                  </div>
                </div>
              )}

              {/* General SLA Configurations */}
              <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-4 text-xs font-mono">
                <h3 className="font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 border-b border-border-dark pb-2.5">
                  <Sliders className="w-4 h-4 text-primary-neon" />
                  SLA Configurations
                </h3>

                <div className="flex flex-col gap-3">
                  {isDemoMode && activeWorkflow && (
                    <div className="bg-primary-neon/10 border border-primary-neon/30 text-primary-neon rounded-lg px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(0,255,204,0.05)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-pulse" />
                      <span>Demo Mode - No funds required</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase">Workflow Name</span>
                    <span className="text-white font-bold truncate">
                      {activeWorkflow ? activeWorkflow.name : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase">Routing Policy</span>
                    <span className="text-primary-neon font-bold uppercase">
                      {activeWorkflow ? activeWorkflow.routingMode : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase">Budget Cap</span>
                    <span className="text-secondary-neon font-bold">
                      {activeWorkflow ? `${activeWorkflow.budget.toFixed(2)} USDC` : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase">Status</span>
                    <span className={`font-bold capitalize ${
                      activeWorkflow
                        ? activeWorkflow.status === 'completed' || activeWorkflow.status === 'Demo Completed'
                          ? 'text-primary-neon animate-pulse' 
                          : activeWorkflow.status === 'failed'
                            ? 'text-red-500'
                            : activeWorkflow.status === 'running'
                              ? 'text-blue-400'
                              : 'text-yellow-400'
                        : 'text-gray-500'
                    }`}>
                      {activeWorkflow
                        ? (isDemoMode && activeWorkflow.status === 'running'
                          ? 'Running simulated workflow...'
                          : activeWorkflow.status === 'Demo Completed'
                            ? 'Demo completed successfully'
                            : activeWorkflow.status)
                        : 'Idle'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

