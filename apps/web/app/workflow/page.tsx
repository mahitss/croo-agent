'use client';

import { useState, useEffect } from 'react';
import Canvas from '../../components/Canvas';
import { useNexusStore } from '../../store/nexusStore';
import { Layers, Sliders, Play, RotateCcw, AlertTriangle, Sparkles, CheckCircle2, X, Terminal, Clock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function WorkflowPage() {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const isRunning = useNexusStore((state) => state.isRunning);
  const resetExecution = useNexusStore((state) => state.resetExecution);
  const startExecution = useNexusStore((state) => state.startExecution);
  const agents = useNexusStore((state) => state.agents);

  // States
  const [promptInput, setPromptInput] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [optimizationMode, setOptimizationMode] = useState<'cost' | 'speed' | 'accuracy'>('accuracy');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  // Check URL query parameters to bind Swarm Matchmaker from Marketplace
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPrompt = params.get('prompt');
      if (urlPrompt) {
        setPromptInput(urlPrompt);
        setShowExplanation(true);
      }
    }
  }, []);

  const handleGenerateWorkflow = () => {
    if (!promptInput.trim()) return;
    setShowExplanation(true);
  };

  const handleLaunchSwarm = () => {
    startExecution(promptInput, 'balanced', 2.0);
  };

  const assignedAgent = selectedNode 
    ? agents.find(a => a.id === selectedNode.assignedAgentId) 
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
        <div className="lg:col-span-3 h-[600px] flex flex-col">
          <Canvas onSelectNode={setSelectedNode} />
        </div>

        {/* Sidebar details panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* WOW Feature: Node execution inspector (GitHub Actions style) */}
          {selectedNode ? (
            <div className="glass-card p-5 rounded-xl border border-primary-neon/40 bg-primary-neon/5 flex flex-col gap-4 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-border-dark pb-3">
                <h3 className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-primary-neon" />
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
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Step Name</span>
                  <span className="text-white font-bold text-[11px] mt-0.5">{selectedNode.name}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Execution Status</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      selectedNode.status === 'completed' ? 'bg-primary-neon' :
                      selectedNode.status === 'running' ? 'bg-secondary-neon animate-ping' :
                      selectedNode.status === 'failed' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
                    }`}></span>
                    <span className={`uppercase font-bold ${
                      selectedNode.status === 'completed' ? 'text-primary-neon' :
                      selectedNode.status === 'running' ? 'text-secondary-neon' :
                      selectedNode.status === 'failed' ? 'text-red-500' : 'text-gray-500'
                    }`}>{selectedNode.status}</span>
                  </div>
                </div>

                {assignedAgent && (
                  <div className="flex flex-col border-t border-border-dark pt-2.5 gap-2">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase">Assigned Node</span>
                      <span className="text-white block mt-0.5">{assignedAgent.name}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Rating: {assignedAgent.rating}⭐</span>
                      <span>SLA Fee: {selectedNode.costEstimate} USDC</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col border-t border-border-dark pt-2.5">
                  <span className="text-[9px] text-gray-500 uppercase">Retry Attempts</span>
                  <span className="text-white font-bold mt-0.5">
                    {selectedNode.retryCount > 0 ? `${selectedNode.retryCount} Retries` : '0 Retries'}
                  </span>
                </div>

                {/* Simulated Timeline Logs */}
                <div className="flex flex-col gap-1 border-t border-border-dark pt-2.5">
                  <span className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Timeline Logs
                  </span>
                  <div className="bg-black/60 p-2.5 rounded border border-border-dark text-[9px] text-gray-400 flex flex-col gap-1 font-mono max-h-[120px] overflow-y-auto leading-normal">
                    <span>[14:12:01] Init intention channel...</span>
                    {selectedNode.status !== 'pending' && (
                      <>
                        <span>[14:12:03] Locking SLA budget escrow...</span>
                        <span>[14:12:05] Calling node capability: {selectedNode.capability}...</span>
                      </>
                    )}
                    {selectedNode.status === 'completed' && (
                      <>
                        <span>[14:12:08] Node output verified by Consensus node.</span>
                        <span>[14:12:09] Settlement released payout to agent.</span>
                      </>
                    )}
                    {selectedNode.status === 'failed' && (
                      <span className="text-red-400 flex items-center gap-1 mt-1">
                        <ShieldAlert className="w-3 h-3 text-red-500" />
                        [FATAL] Swarm execution timed out.
                      </span>
                    )}
                  </div>
                </div>

                {/* Outputs detail */}
                {selectedNode.status === 'completed' && (
                  <div className="flex flex-col gap-1 border-t border-border-dark pt-2.5">
                    <span className="text-[9px] text-gray-500 uppercase">Step Output Payload</span>
                    <div className="bg-black/40 border border-border-dark p-2 rounded text-[10px] text-primary-neon max-h-[100px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                      {selectedNode.output || 'Success. Output payloads generated.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* WOW Feature: AI Planner Explanation Panel */}
              {showExplanation && (
                <div className="glass-card p-5 rounded-xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col gap-4 text-xs font-mono">
                  <h3 className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-border-dark pb-2.5">
                    <Sparkles className="w-4 h-4 text-primary-neon" />
                    AI Swarm Planner Logic
                  </h3>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-gray-500 uppercase">✓ Selected Research Node</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        Selected <strong className="text-white">InsightFinder Pro</strong>: Lowest cost with 95% success rate SLA rating.
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-gray-500 uppercase">✓ Selected Verify Node</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        Selected <strong className="text-white">ConsensuVerify</strong>: Highest trust coefficient for independent verification.
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border-dark">
                      <span className="text-gray-500">EST. BUDGET:</span>
                      <span className="text-secondary-neon font-bold">0.60 USDC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">EST. DURATION:</span>
                      <span className="text-white font-bold">2m 15s</span>
                    </div>
                  </div>

                  {/* Optimization Controllers */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-border-dark">
                    <span className="text-[9px] text-gray-500 uppercase">Regenerate Objectives:</span>
                    <div className="flex flex-col gap-1">
                      {[
                        { mode: 'cost', label: 'Optimize for Lower Cost' },
                        { mode: 'speed', label: 'Optimize for Faster Execution' },
                        { mode: 'accuracy', label: 'Optimize for Higher Accuracy' }
                      ].map((opt) => (
                        <button
                          key={opt.mode}
                          onClick={() => setOptimizationMode(opt.mode as any)}
                          className={`text-[9px] text-left px-2 py-1.5 rounded border transition-all uppercase font-bold ${
                            optimizationMode === opt.mode
                              ? 'border-primary-neon text-primary-neon bg-primary-neon/5'
                              : 'border-border-dark text-gray-400 hover:text-white bg-black/20'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
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
                      <span className={`font-bold uppercase ${
                        activeWorkflow.status === 'completed' ? 'text-primary-neon' : 'text-yellow-400'
                      }`}>{activeWorkflow.status}</span>
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
