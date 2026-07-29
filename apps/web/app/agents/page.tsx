'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Server, 
  Cpu, 
  Activity, 
  Clock, 
  RefreshCw, 
  Terminal, 
  Globe, 
  ShieldCheck, 
  Search,
  Play,
  Square,
  Pause,
  Copy,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Box,
  Layers,
  ArrowUpRight,
  RotateCcw,
  SlidersHorizontal,
  Key,
  Database,
  Code,
  Check,
  X
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AgentRuntimeService, 
  AgentRuntimeEntity, 
  AgentLifecycleState 
} from '../../services/agent-runtime.service';

export default function InfrastructureAgentsPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [agents, setAgents] = useState<AgentRuntimeEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogsPod, setSelectedLogsPod] = useState<AgentRuntimeEntity | null>(null);
  const [selectedConfigPod, setSelectedConfigPod] = useState<AgentRuntimeEntity | null>(null);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const list = await AgentRuntimeService.getAgents();
      setAgents(list);
    } catch (e) {
      console.warn('[AGENTS] Failed to fetch agent pods:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleStart = async (pod: AgentRuntimeEntity) => {
    const updated = await AgentRuntimeService.startAgent(pod.id);
    toast(`Agent pod "${pod.name}" started successfully.`, 'success');
    setAgents(prev => prev.map(p => p.id === pod.id ? updated : p));
  };

  const handleStop = async (pod: AgentRuntimeEntity) => {
    const updated = await AgentRuntimeService.stopAgent(pod.id);
    toast(`Agent pod "${pod.name}" stopped.`, 'info');
    setAgents(prev => prev.map(p => p.id === pod.id ? updated : p));
  };

  const handleRestart = async (pod: AgentRuntimeEntity) => {
    const updated = await AgentRuntimeService.restartAgent(pod.id);
    toast(`Restart signal sent to pod "${pod.name}".`, 'success');
    setAgents(prev => prev.map(p => p.id === pod.id ? updated : p));
  };

  const handlePause = async (pod: AgentRuntimeEntity) => {
    const updated = await AgentRuntimeService.pauseAgent(pod.id);
    toast(`Pod "${pod.name}" paused.`, 'info');
    setAgents(prev => prev.map(p => p.id === pod.id ? updated : p));
  };

  const handleResume = async (pod: AgentRuntimeEntity) => {
    const updated = await AgentRuntimeService.resumeAgent(pod.id);
    toast(`Pod "${pod.name}" resumed.`, 'success');
    setAgents(prev => prev.map(p => p.id === pod.id ? updated : p));
  };

  const handleClone = async (pod: AgentRuntimeEntity) => {
    const cloned = await AgentRuntimeService.cloneAgent(pod.id);
    toast(`Replica pod "${cloned.name}" created.`, 'success');
    setAgents(prev => [cloned, ...prev]);
  };

  const filteredPods = agents.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.region.toLowerCase().includes(search.toLowerCase()) ||
    p.model.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: AgentLifecycleState) => {
    switch (status) {
      case 'healthy':
      case 'idle':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Healthy
          </span>
        );
      case 'busy':
      case 'running':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4EA3FF] animate-ping"></span> Executing Swarm
          </span>
        );
      case 'booting':
      case 'scaling':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold">
            <RefreshCw className="w-3 h-3 animate-spin" /> Booting Pod
          </span>
        );
      case 'waiting':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold">
            <Pause className="w-3 h-3" /> Paused
          </span>
        );
      case 'offline':
      case 'stopping':
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-500/10 text-gray-400 border border-gray-500/20 text-[10px] font-mono font-bold">
            <Square className="w-3 h-3" /> Stopped
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-emerald-400" /> Agent Operating System & Pod Cluster Runtime
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            K8s Pod-style AI worker runtime entities, model context switching, live heartbeat telemetry, and resource allocation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search pods by region, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
            />
          </div>
          <button 
            onClick={fetchAgents}
            className="p-2.5 bg-[#111111] hover:bg-white/5 border border-[#232323] text-gray-300 rounded-xl cursor-pointer"
            title="Refresh Cluster State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cluster Overview Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-[#111111] border border-[#232323] p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-gray-500 uppercase block">Active Worker Pods</span>
          <span className="text-xl font-bold text-white block">{agents.filter(a => a.status !== 'offline').length} / {agents.length} Online</span>
        </div>
        <div className="bg-[#111111] border border-[#232323] p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-gray-500 uppercase block">Average Latency</span>
          <span className="text-xl font-bold text-emerald-400 block">
            {agents.length > 0 ? `${Math.round(agents.reduce((acc, c) => acc + c.averageLatencyMs, 0) / agents.length)}ms` : '340ms'}
          </span>
        </div>
        <div className="bg-[#111111] border border-[#232323] p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-gray-500 uppercase block">Tokens Processed</span>
          <span className="text-xl font-bold text-[#4EA3FF] block">
            {agents.reduce((acc, c) => acc + c.tokenUsageTotal, 0).toLocaleString()} tokens
          </span>
        </div>
        <div className="bg-[#111111] border border-[#232323] p-4 rounded-2xl space-y-1">
          <span className="text-[10px] text-gray-500 uppercase block">Cluster SLA Success Rate</span>
          <span className="text-xl font-bold text-purple-400 block">99.6% SLA</span>
        </div>
      </div>

      {/* Kubernetes / Runner Style Pod Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPods.map((pod) => (
          <div 
            key={pod.id}
            className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-5 transition-all duration-300"
          >
            <div className="space-y-4">
              
              {/* Pod Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#4EA3FF]" />
                    <h3 className="text-base font-bold text-white">{pod.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <span>ID: <strong className="text-gray-400">{pod.id}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Globe className="w-3 h-3 text-[#4EA3FF]" /> {pod.region}
                    </span>
                  </div>
                </div>

                {getStatusBadge(pod.status)}
              </div>

              <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                {pod.description}
              </p>

              {/* Model & Config Badges */}
              <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                <span className="bg-[#050505] px-2 py-1 rounded border border-[#232323] text-purple-300 font-bold">
                  🤖 {pod.model} ({pod.provider})
                </span>
                <span className="bg-[#050505] px-2 py-1 rounded border border-[#232323] text-gray-300">
                  Window: {pod.contextWindow}
                </span>
                <span className="bg-[#050505] px-2 py-1 rounded border border-[#232323] text-gray-300">
                  Memory: {pod.memoryType}
                </span>
                <span className="bg-[#050505] px-2 py-1 rounded border border-[#232323] text-emerald-400">
                  ${pod.costPerExecution} USDC / run
                </span>
              </div>

              {/* Resource Gauges */}
              <div className="grid grid-cols-2 gap-3 bg-[#050505] p-3 rounded-xl border border-[#232323] text-[10px] font-mono">
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-400">
                    <span>CPU Utilization</span>
                    <span className="text-white font-bold">{pod.cpuUsage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pod.cpuUsage}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-gray-400">
                    <span>Memory Allocation</span>
                    <span className="text-white font-bold">{pod.memoryUsageMb} MB</span>
                  </div>
                  <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-[#4EA3FF] rounded-full" style={{ width: `${Math.min(100, (pod.memoryUsageMb / 4000) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Tool Permissions */}
              <div className="space-y-1 text-[10px] font-mono">
                <span className="text-gray-500 uppercase block font-bold">Tool Permissions</span>
                <div className="flex gap-1 flex-wrap">
                  {pod.toolPermissions.map((tool, i) => (
                    <span key={i} className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Pod Controls Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedLogsPod(pod)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all"
                  title="View Pod Terminal Logs"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Logs</span>
                </button>

                <button
                  onClick={() => setSelectedConfigPod(pod)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all"
                  title="Configure Model & Env Secrets"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#4EA3FF]" />
                  <span>Config</span>
                </button>

                <button
                  onClick={() => handleClone(pod)}
                  className="p-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 hover:text-white rounded-xl cursor-pointer transition-all"
                  title="Clone Pod Replica"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lifecycle Actions */}
              <div className="flex items-center gap-1.5">
                {pod.status === 'offline' ? (
                  <button
                    onClick={() => handleStart(pod)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-xl cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> Start
                  </button>
                ) : (
                  <>
                    {pod.status === 'waiting' ? (
                      <button
                        onClick={() => handleResume(pod)}
                        className="p-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl cursor-pointer"
                        title="Resume Pod"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePause(pod)}
                        className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl cursor-pointer"
                        title="Pause Pod"
                      >
                        <Pause className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleRestart(pod)}
                      className="p-1.5 bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-xl cursor-pointer"
                      title="Restart Pod"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleStop(pod)}
                      className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl cursor-pointer"
                      title="Stop Pod"
                    >
                      <Square className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Live Terminal Logs Drawer */}
      {selectedLogsPod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#232323]">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-mono">Live Terminal Logs: {selectedLogsPod.name}</h3>
              </div>
              <button onClick={() => setSelectedLogsPod(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl font-mono text-xs text-gray-300 space-y-1.5 max-h-80 overflow-y-auto">
              {selectedLogsPod.logs.map((log, i) => (
                <div key={i} className="text-emerald-400/90 text-[11px]">{log}</div>
              ))}
            </div>

            <button
              onClick={() => setSelectedLogsPod(null)}
              className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl cursor-pointer text-xs transition-all"
            >
              Close Log Viewer
            </button>
          </div>
        </div>
      )}

      {/* Pod Configuration Drawer */}
      {selectedConfigPod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#232323]">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#4EA3FF]" />
                <h3 className="text-sm font-bold text-white font-mono">Pod Specs & Model Config: {selectedConfigPod.name}</h3>
              </div>
              <button onClick={() => setSelectedConfigPod(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[10px] text-gray-500 uppercase block font-bold">LLM Model Provider</label>
                <input 
                  type="text" 
                  value={selectedConfigPod.model} 
                  readOnly 
                  className="w-full bg-[#050505] border border-[#232323] rounded-lg px-3 py-2 text-white outline-none mt-1 cursor-not-allowed" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase block font-bold">Temperature</label>
                  <input 
                    type="number" 
                    value={selectedConfigPod.temperature} 
                    readOnly 
                    className="w-full bg-[#050505] border border-[#232323] rounded-lg px-3 py-2 text-white outline-none mt-1 cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase block font-bold">Max Tokens</label>
                  <input 
                    type="number" 
                    value={selectedConfigPod.maxTokens} 
                    readOnly 
                    className="w-full bg-[#050505] border border-[#232323] rounded-lg px-3 py-2 text-white outline-none mt-1 cursor-not-allowed" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase block font-bold">Environment Variables</label>
                <pre className="bg-[#050505] border border-[#232323] p-3 rounded-lg text-amber-300 text-[10px] mt-1">
{JSON.stringify(selectedConfigPod.envVars, null, 2)}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setSelectedConfigPod(null)}
              className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl cursor-pointer text-xs transition-all"
            >
              Close Config
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
