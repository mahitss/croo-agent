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

const PLANNING_STAGES = [
  { name: 'Intent Detection', desc: 'Parsing natural language semantics & intent tags' },
  { name: 'Capability Matching', desc: 'Mapping requirements to defined CAP schemas' },
  { name: 'Marketplace Search', desc: 'Scanning registry database for suitable nodes' },
  { name: 'Cost Optimization', desc: 'Balancing execution rates against SLA constraints' },
  { name: 'Parallelization', desc: 'Resolving dependency trees and async paths' },
  { name: 'Risk Analysis', desc: 'Evaluating historical failure rates and safety scores' },
  { name: 'Workflow Generation', desc: 'Compiling structural JSON schema DAG layout' },
];

export default function WorkflowPage() {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  const isRunning = useNexusStore((state) => state.isRunning);
  const resetExecution = useNexusStore((state) => state.resetExecution);
  const generateWorkflow = useNexusStore((state) => state.generateWorkflow);
  const startExecution = useNexusStore((state) => state.startExecution);
  const agents = useNexusStore((state) => state.agents);
  const promptTokens = useNexusStore((state) => state.promptTokens);
  const completionTokens = useNexusStore((state) => state.completionTokens);
  const totalTokens = useNexusStore((state) => state.totalTokens);
  const estimatedCost = useNexusStore((state) => state.estimatedCost);
  const initialize = useNexusStore((state) => state.initialize);
  
  // Custom Node Operations
  const renameNode = useNexusStore((state) => state.renameNode);
  const deleteNode = useNexusStore((state) => state.deleteNode);
  const retryNode = useNexusStore((state) => state.retryNode);
  const cancelWorkflow = useNexusStore((state) => state.cancelWorkflow);
  
  // Persistence operations
  const isWorkflowSaved = useNexusStore((state) => state.isWorkflowSaved);
  const saveWorkflow = useNexusStore((state) => state.saveWorkflow);

  const { toast } = useToast();

  // States
  const [promptInput, setPromptInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [optimizationMode, setOptimizationMode] = useState<'cost' | 'speed' | 'accuracy'>('accuracy');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  
  const [isPlanning, setIsPlanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nodeNameInput, setNodeNameInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveWorkflow = async () => {
    setIsSaving(true);
    try {
      await saveWorkflow();
      toast('Workflow successfully persisted in database!', 'success');
    } catch (err: any) {
      toast(`Save failed: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Check URL query parameters and initialize store
  useEffect(() => {
    initialize();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPrompt = params.get('prompt');
      if (urlPrompt) {
        setPromptInput(urlPrompt);
        setShowExplanation(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleDemoCompleted = (e: any) => {
      toast('Workflow completed successfully.', 'success');
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
    console.log("CLICK_HANDLER STEP A: enter");
    if (!promptInput.trim()) {
      console.log("CLICK_HANDLER STEP B: empty prompt return");
      return;
    }
    setIsPlanning(true);
    setSelectedNode(null);
    setShowExplanation(false);
    setErrorMsg(null);
    
    try {
      console.log("CLICK_HANDLER STEP C: about to call generateWorkflow");
      await generateWorkflow(promptInput, 'balanced', 2.0);
      console.log("CLICK_HANDLER STEP D: generateWorkflow completed");
      setShowExplanation(true);
      toast('Workflow DAG generated successfully from backend!', 'success');
      
      console.log("CLICK_HANDLER STEP D2: automatically starting execution run");
      await startExecution(promptInput, 'balanced', 2.0);
    } catch (err: any) {
      console.error("CLICK_HANDLER STEP E: caught error", err);
      if (err && err.stack) {
        console.error(err.stack);
      }
      const msg = err.message || err || 'Failed to connect to backend AI services';
      setErrorMsg(msg);
      toast(`Generation failed: ${msg}`, 'error');
    } finally {
      setIsPlanning(false);
      console.log("CLICK_HANDLER STEP F: finally completed");
    }
  };

  const handleLaunchSwarm = () => {
    startExecution(promptInput, 'balanced', 2.0);
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

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
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
        {activeWorkflow && (
          <button
            onClick={() => {
              resetExecution();
              setSelectedNode(null);
            }}
            className="text-xs bg-white/5 border border-border-dark hover:bg-white/10 hover:border-secondary-neon/40 px-4 py-2 rounded-xl text-gray-400 hover:text-white font-mono flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            CLEAR_ACTIVE_WORKFLOW
          </button>
        )}
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
          className="flex-grow bg-black/40 border border-border-dark focus:border-primary-neon/50 px-4 py-2 rounded-lg text-xs text-white outline-none font-mono"
          placeholder="Describe the multi-agent task sequence, e.g. Research NVIDIA Blackwell and verify findings..."
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
        />
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleGenerateWorkflow}
            disabled={!promptInput.trim()}
            className="bg-white/5 border border-border-dark text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/10 font-mono disabled:opacity-50"
          >
            Generate Workflow
          </button>
          {!activeWorkflow && !isRunning && (
            <button
              onClick={handleLaunchSwarm}
              disabled={!promptInput.trim()}
              className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-5 py-2 rounded-lg hover:brightness-110 font-mono disabled:opacity-50 transition-all"
            >
              Run Swarm
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Canvas container */}
        <div className="lg:col-span-3 flex flex-col">
          <Canvas onSelectNode={setSelectedNode} />
        </div>

        {/* Sidebar details panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* WOW Feature: Node execution inspector (GitHub Actions style) */}
          {selectedNode ? (
            <div className="glass-card p-5 rounded-xl border border-primary-neon/40 bg-primary-neon/5 flex flex-col gap-4 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-border-dark pb-3">
                <h3 className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary-neon animate-pulse" />
                  Node Inspector
                </h3>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-white hover:bg-white/5 p-1 rounded-md transition-all"
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

                {/* Operations & Expand Panel */}
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

                {/* Node Operations */}
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
                        className="bg-yellow-400 text-black text-[10px] font-extrabold px-3 py-1.5 rounded-lg hover:brightness-110 transition-all flex-1 text-center"
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
                      className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-extrabold px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all flex-grow text-center"
                    >
                      Delete Node
                    </button>
                  </div>
                </div>

                {/* Token Usage & Cost per Node details */}
                <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">Token Accounting</span>
                    <span className="text-white font-bold">
                      {promptTokens > 0 ? `${promptTokens.toLocaleString()} input | ${completionTokens.toLocaleString()} output` : 'No logs yet'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase">AI Trust Confidence</span>
                    <span className="text-primary-neon font-bold">{(assignedAgent?.trustScore || 95.0)}%</span>
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

                {/* Alternative suggestions */}
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

                {/* Simulated Timeline Logs */}
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

                {/* Outputs detail */}
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
              {/* AI Thinking Loader */}
              {isPlanning && (
                <div className="glass-card p-5 rounded-xl border border-primary-neon/40 bg-black/60 flex flex-col items-center justify-center py-10 gap-3 text-xs font-mono text-center">
                  <Loader2 className="w-8 h-8 text-primary-neon animate-spin" />
                  <span className="text-white font-bold uppercase tracking-wider">AI Swarm Planner</span>
                  <span className="text-gray-500">Querying OpenRouter LLM, evaluating candidate bids, and generating optimal DAG template in real-time...</span>
                </div>
              )}

              {/* Dynamic Planning Failure Alert */}
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
              <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-4 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5 border-b border-border-dark pb-2.5">
                  <Sliders className="w-4 h-4 text-primary-neon" />
                  SLA Configurations
                </h3>

                {activeWorkflow ? (
                  <div className="flex flex-col gap-3 font-mono">
                    {isDemoMode && (
                      <div className="bg-primary-neon/10 border border-primary-neon/30 text-primary-neon rounded-lg px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(0,255,204,0.05)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-pulse" />
                        <span>Demo Mode - No funds required</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase">Workflow Name</span>
                      <span className="text-white font-bold truncate">{activeWorkflow.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase">Routing Policy</span>
                      <span className="text-primary-neon font-bold uppercase">{activeWorkflow.routingMode}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase">Budget Cap</span>
                      <span className="text-secondary-neon font-bold">{activeWorkflow.budget.toFixed(2)} USDC</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase">Status</span>
                      <span className={`font-bold capitalize ${
                        activeWorkflow.status === 'completed' || activeWorkflow.status === 'Demo Completed'
                          ? 'text-primary-neon' 
                          : activeWorkflow.status === 'failed'
                            ? 'text-red-500'
                            : activeWorkflow.status === 'running'
                              ? 'text-blue-400'
                              : 'text-yellow-400'
                      }`}>
                        {isDemoMode && activeWorkflow.status === 'running'
                          ? 'Running simulated workflow...'
                          : activeWorkflow.status === 'Demo Completed'
                            ? 'Demo completed successfully'
                            : activeWorkflow.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 gap-2 text-center text-gray-500 italic">
                    <AlertTriangle className="w-8 h-8 text-yellow-500/50 mb-1" />
                    <span>No workflow is currently active in this session.</span>
                    <Link href="/" className="text-primary-neon not-italic hover:underline mt-2 font-mono text-[10px]">
                      GO_TO_PORTAL →
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

