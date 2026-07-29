'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  Users, 
  Bot, 
  MessageSquare, 
  ShieldCheck, 
  Play, 
  Sparkles, 
  Activity, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Brain, 
  DollarSign, 
  Clock, 
  Layers, 
  Terminal, 
  FileText, 
  Share2, 
  Sliders, 
  X,
  Vote,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  SwarmOrchestratorEngine, 
  SwarmExecutionState, 
  SwarmAgentRole, 
  SwarmSimulationResult, 
  ConsensusStrategy 
} from '../../../services/swarm-orchestrator.engine';

export default function SwarmPage() {
  const { toast } = useToast();
  const [queryGoal, setQueryGoal] = useState('Audit smart contract codebase for SAST vulnerabilities and EU GDPR compliance.');
  const [selectedRoles, setSelectedRoles] = useState<SwarmAgentRole[]>(['CEO Agent', 'Planner', 'Architect', 'Coder', 'Security', 'Reviewer']);
  const [consensusStrategy, setConsensusStrategy] = useState<ConsensusStrategy>('confidence_score');
  const [activeSwarmState, setActiveSwarmState] = useState<SwarmExecutionState | null>(null);
  const [simulationResult, setSimulationResult] = useState<SwarmSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'live' | 'graph' | 'messages' | 'analytics'>('live');

  const presetTeams = SwarmOrchestratorEngine.getPresetTeams();

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await SwarmOrchestratorEngine.simulateSwarm(queryGoal, selectedRoles);
      setSimulationResult(res);
      toast('Swarm dry-run simulation complete.', 'info');
    } catch (e) {
      toast('Simulation failed.', 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleExecuteSwarm = async () => {
    setIsExecuting(true);
    try {
      const state = await SwarmOrchestratorEngine.executeSwarm(
        'Autonomous Cybersecurity & Audit Swarm',
        queryGoal,
        selectedRoles,
        consensusStrategy
      );
      setActiveSwarmState(state);
      toast('Swarm team execution launched successfully!', 'success');
    } catch (e) {
      toast('Swarm execution error.', 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#4EA3FF]" /> Autonomous Swarm Intelligence & Team Runtime
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Transform workflows into autonomous AI employee teams (1-100+ agents) with inter-agent messaging, task delegation, and consensus voting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer font-mono"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isSimulating ? 'Simulating...' : 'Simulate Swarm'}</span>
          </button>

          <button
            onClick={handleExecuteSwarm}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold cursor-pointer border-0 shadow font-mono"
          >
            <Play className="w-4 h-4" />
            <span>{isExecuting ? 'Launching...' : 'Launch Swarm Team'}</span>
          </button>
        </div>
      </div>

      {/* Preset AI Employee Squads */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Preset Enterprise AI Employee Squads</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presetTeams.map((team, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedRoles(team.roles);
                toast(`Loaded squad: "${team.name}" (${team.roles.length} agents)`, 'info');
              }}
              className="bg-[#111111] hover:bg-white/5 border border-[#232323] hover:border-[#4EA3FF]/40 p-4 rounded-2xl cursor-pointer transition-all space-y-2"
            >
              <h4 className="text-xs font-bold text-white flex items-center justify-between">
                <span>{team.name}</span>
                <span className="text-[10px] text-[#4EA3FF] font-mono">{team.roles.length} Agents</span>
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">{team.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Result Preview Banner */}
      {simulationResult && (
        <div className="bg-[#111111] border border-amber-500/30 p-5 rounded-2xl space-y-3 font-mono text-xs animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Swarm Execution Dry-Run Simulation Preview
            </span>
            <span className="text-emerald-400 font-bold">{simulationResult.successProbability}% Success Probability</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div className="bg-[#050505] p-2.5 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[9px] block">Estimated Cost</span>
              <span className="text-white font-bold">${simulationResult.estimatedCostUsdc} USDC</span>
            </div>
            <div className="bg-[#050505] p-2.5 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[9px] block">Estimated Latency</span>
              <span className="text-white font-bold">{simulationResult.estimatedTimeSeconds}s</span>
            </div>
            <div className="bg-[#050505] p-2.5 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[9px] block">Token Throughput</span>
              <span className="text-[#4EA3FF] font-bold">{(simulationResult.estimatedPromptTokens + simulationResult.estimatedCompletionTokens).toLocaleString()} tokens</span>
            </div>
            <div className="bg-[#050505] p-2.5 rounded-xl border border-[#232323]">
              <span className="text-gray-500 text-[9px] block">Failure Risk</span>
              <span className="text-emerald-400 font-bold">{simulationResult.failureProbability}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Active Swarm Visualization & Communication Console */}
      {activeSwarmState && (
        <div className="space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs">
            {[
              { id: 'live', label: 'Live Team Roster', icon: Users },
              { id: 'messages', label: 'Inter-Agent Chat Stream', icon: MessageSquare },
              { id: 'graph', label: 'Delegation Graph', icon: Share2 },
              { id: 'analytics', label: 'Swarm Analytics', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
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

          {/* TAB 1: LIVE TEAM ROSTER */}
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {activeSwarmState.agents.map((agent) => (
                <div key={agent.id} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{agent.name}</span>
                    <span className="text-[10px] bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 px-2 py-0.5 rounded font-bold">
                      {agent.role}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 font-sans line-clamp-2">{agent.goal}</p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#050505] p-2.5 rounded-xl border border-[#232323]">
                    <div>
                      <span className="text-gray-500 block">Model</span>
                      <span className="text-purple-300 font-bold truncate block">{agent.model}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Confidence</span>
                      <span className="text-emerald-400 font-bold block">{agent.confidenceScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: INTER-AGENT CHAT STREAM */}
          {activeTab === 'messages' && (
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3 font-mono text-xs">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Inter-Agent Messaging Protocol</span>
              
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {activeSwarmState.messages.map(msg => (
                  <div key={msg.id} className="bg-[#050505] border border-[#232323] p-3 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#4EA3FF] font-bold">{msg.senderAgentName}</span>
                      <span className="text-amber-400 font-bold uppercase">[{msg.type}]</span>
                    </div>
                    <p className="text-gray-200 text-[11px] font-sans">{msg.content}</p>
                    {msg.reasoningSnippet && (
                      <div className="text-[10px] text-purple-300 italic pt-1 border-t border-[#232323]">
                        Reasoning: &quot;{msg.reasoningSnippet}&quot;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DELEGATION GRAPH */}
          {activeTab === 'graph' && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#4EA3FF]" /> Live Agent Delegation & Task Hierarchy
              </h3>

              <div className="space-y-2">
                {activeSwarmState.agents.map((agent, i) => (
                  <div key={agent.id} className="bg-[#050505] border border-[#232323] p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-white font-bold">{agent.name}</span>
                    </div>
                    <span className="text-gray-400 text-[10px]">-[ DELEGATED SUB-TASK ]-&gt;</span>
                    <span className="text-emerald-400 font-bold text-[10px]">{agent.role} Execution Gate</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SWARM ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Total Swarm Cost</span>
                <span className="text-2xl font-bold text-emerald-400 block">${activeSwarmState.totalCostUsdc} USDC</span>
              </div>
              <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Consensus Gate</span>
                <span className="text-2xl font-bold text-[#4EA3FF] block uppercase">{activeSwarmState.consensusStrategy}</span>
              </div>
              <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Active Delegations</span>
                <span className="text-2xl font-bold text-purple-400 block">{activeSwarmState.activeDelegationCount} active</span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
