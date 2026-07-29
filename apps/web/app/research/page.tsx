'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Brain, 
  Target, 
  GitBranch, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Play, 
  FileText, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  Search,
  Code
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AIEarningEngine, 
  GoalStrategyPlan, 
  ReasoningMode, 
  DebateStatement, 
  PreExecutionSimulation 
} from '../../services/ai-reasoning.engine';

export default function AIReasoningPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'planner' | 'debate' | 'graph' | 'simulation' | 'memory'>('planner');
  const [goalInput, setGoalInput] = useState('Reduce enterprise cloud & LLM inference expenditure by 20% across multi-cloud clusters.');
  const [reasoningMode, setReasoningMode] = useState<ReasoningMode>('GraphOfThoughts');
  const [strategyPlan, setStrategyPlan] = useState<GoalStrategyPlan | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const [debateStatements, setDebateStatements] = useState<DebateStatement[]>([]);
  const [simulationResult, setSimulationResult] = useState<PreExecutionSimulation | null>(null);

  useEffect(() => {
    handleSynthesizeGoal();
  }, []);

  const handleSynthesizeGoal = async () => {
    setIsSynthesizing(true);
    try {
      const plan = await AIEarningEngine.synthesizeGoal(goalInput, reasoningMode);
      setStrategyPlan(plan);
      setDebateStatements(AIEarningEngine.getDebateSession(goalInput));
      setSimulationResult(AIEarningEngine.simulateExecution(plan.id));
      toast('Synthesized strategic reasoning plan with 94.8% confidence!', 'success');
    } catch (e) {
      toast('Reasoning synthesis error.', 'error');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#4EA3FF]" /> Enterprise AI Reasoning Platform & Decision Engine
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Tree/Graph of Thoughts decomposition, Multi-Agent Consensus Debate, Pre-Execution Simulations, and Decision Memory.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Reasoning Engine:</span>
          <span className="text-emerald-400 font-bold">GRAPH OF THOUGHTS (GoT)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'planner', label: 'Goal Synthesizer & Planner', icon: Target },
          { id: 'debate', label: 'Multi-Agent Consensus Debate', icon: MessageSquare },
          { id: 'graph', label: 'Visual Decision Graph (GoT)', icon: GitBranch },
          { id: 'simulation', label: 'Pre-Execution Simulator', icon: Activity },
          { id: 'memory', label: 'Decision Memory & Reflection', icon: Brain },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-white/10 text-white border-white/20 font-bold' 
                  : 'bg-transparent text-gray-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GOAL SYNTHESIZER & PLANNER */}
      {activeTab === 'planner' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#4EA3FF]" /> Autonomous Goal Synthesizer &amp; Milestone Planner
            </h3>

            <div className="space-y-3">
              <textarea
                rows={2}
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white outline-none font-mono text-xs"
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px]">Reasoning Mode:</span>
                  <select
                    value={reasoningMode}
                    onChange={(e) => setReasoningMode(e.target.value as any)}
                    className="bg-[#050505] border border-[#232323] text-white rounded-lg px-3 py-1 text-xs outline-none"
                  >
                    <option value="GraphOfThoughts">Graph of Thoughts (GoT)</option>
                    <option value="TreeOfThoughts">Tree of Thoughts (ToT)</option>
                    <option value="MultiAgentDebate">Multi-Agent Debate Consensus</option>
                    <option value="ChainOfThought">Chain of Thought (CoT)</option>
                  </select>
                </div>

                <button
                  onClick={handleSynthesizeGoal}
                  disabled={isSynthesizing}
                  className="px-5 py-2.5 bg-[#4EA3FF] text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSynthesizing ? 'Synthesizing Decision Graph...' : 'Synthesize Execution Strategy'}</span>
                </button>
              </div>
            </div>
          </div>

          {strategyPlan && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#232323] pb-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Strategic Execution Plan ({strategyPlan.id})</h4>
                  <span className="text-[10px] text-gray-500">Mode: {strategyPlan.reasoningMode} • Confidence Score: <strong className="text-emerald-400">{strategyPlan.confidenceScorePercent}%</strong></span>
                </div>

                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-gray-400">Total Duration: <strong className="text-white">{strategyPlan.totalDurationMin} min</strong></span>
                  <span className="text-gray-400">Est. Cost: <strong className="text-amber-300">${strategyPlan.totalCostUsdc} USDC</strong></span>
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Decomposed Execution Milestones</span>
                {strategyPlan.milestones.map(m => (
                  <div key={m.stepNumber} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-bold text-white text-xs">Step {m.stepNumber}: {m.title}</span>
                      <span className="text-[10px] text-gray-400 font-sans block">Assigned: <strong className="text-[#4EA3FF]">{m.assignedAgent}</strong> • Risk: {m.riskLevel}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-gray-400 font-bold">{m.estimatedDurationMin} mins</span>
                      <span className="text-emerald-400 font-bold">${m.estimatedCostUsdc} USDC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MULTI-AGENT CONSENSUS DEBATE */}
      {activeTab === 'debate' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" /> Multi-Agent Consensus Debate Chamber
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Planner, Security, Finance, and Legal agents independently debate the solution to reach enterprise consensus.
          </p>

          <div className="space-y-3 pt-2">
            {debateStatements.map((d, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 text-xs">Agent: {d.agentRole}</span>
                  <span className="text-[10px] text-purple-300 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                    Consensus: {d.consensusScore}%
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">{d.statement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL DECISION GRAPH (GoT) */}
      {activeTab === 'graph' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#4EA3FF]" /> Visual Graph of Thoughts (GoT) Decision Tree
          </h3>

          <div className="bg-[#050505] border border-[#232323] p-6 rounded-xl space-y-4 text-center">
            <div className="inline-block bg-[#111111] border border-[#4EA3FF]/40 p-4 rounded-xl text-left space-y-1">
              <span className="text-[10px] text-[#4EA3FF] font-bold block uppercase">Root Goal Node</span>
              <span className="text-xs font-bold text-white">Reduce Cloud Expenditure by 20%</span>
            </div>

            <div className="text-gray-500 text-xs font-bold">↓↓ DECOMPOSED SUB-GRAPH DECISIONS ↓↓</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold block">Branch A: Idle GPU Suspension</span>
                <span className="text-xs text-gray-300 font-sans block">Suspend H100 pools when queue depth = 0 for &gt; 5 mins.</span>
                <span className="text-[10px] text-purple-300 font-bold">Confidence: 96.4%</span>
              </div>

              <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl space-y-1">
                <span className="text-[10px] text-amber-300 font-bold block">Branch B: vLLM Batch Size Tuning</span>
                <span className="text-xs text-gray-300 font-sans block">Increase continuous batching size from 16 to 32 tokens.</span>
                <span className="text-[10px] text-purple-300 font-bold">Confidence: 93.1%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRE-EXECUTION SIMULATOR */}
      {activeTab === 'simulation' && simulationResult && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" /> Pre-Execution Monte Carlo Simulation Engine
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505] p-4 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[10px] block">Success Probability</span>
              <span className="text-xl font-bold text-emerald-400 block mt-1">{simulationResult.successProbabilityPercent}%</span>
            </div>
            <div className="bg-[#050505] p-4 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[10px] block">Est. Token Budget</span>
              <span className="text-xl font-bold text-amber-300 block mt-1">{simulationResult.tokenUsageEstimate.toLocaleString()} tokens</span>
            </div>
            <div className="bg-[#050505] p-4 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[10px] block">Infra Load Impact</span>
              <span className="text-xl font-bold text-purple-300 block mt-1">{simulationResult.infraLoadImpact}</span>
            </div>
          </div>

          <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2 font-sans text-xs">
            <span className="font-bold text-white block">Business KPI Impact:</span>
            <p className="text-gray-300">{simulationResult.businessKpiImpact}</p>
            <span className="font-bold text-white block pt-2">Trade-Off Analysis:</span>
            <p className="text-gray-300">{simulationResult.tradeOffSummary}</p>
          </div>
        </div>
      )}

      {/* TAB 5: DECISION MEMORY & REFLECTION */}
      {activeTab === 'memory' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" /> Persistent Decision Memory Bank &amp; Self-Reflection
          </h3>

          <div className="space-y-3 pt-2">
            <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-1 font-sans">
              <span className="font-bold text-white text-xs block font-mono text-emerald-400">[LESSON LEARNED #402]</span>
              <p className="text-gray-300 text-xs leading-relaxed">
                When scaling down idle GPU worker nodes, always serialize open pgvector index connections first to avoid transient 503 gateway timeouts during heavy web search queries.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
