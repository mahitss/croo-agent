'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  Play, 
  Terminal, 
  Activity, 
  Cpu, 
  HardDrive, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  GitBranch, 
  Search, 
  FileText, 
  Share2, 
  TrendingUp, 
  X,
  Code
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  RuntimeKernelEngine, 
  RuntimeProcess, 
  KernelEvent 
} from '../../../services/runtime-kernel.engine';

export default function ExecutionsRuntimePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'processes' | 'migration' | 'debugger' | 'healing' | 'events'>('processes');
  const [processes, setProcesses] = useState<RuntimeProcess[]>([]);
  const [selectedPid, setSelectedPid] = useState<RuntimeProcess | null>(null);
  const [events, setEvents] = useState<KernelEvent[]>([]);
  
  // Migration Target state
  const [targetNode, setTargetNode] = useState('cls-gcp-europe-west1');
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    fetchKernelData();
  }, []);

  const fetchKernelData = async () => {
    try {
      const list = await RuntimeKernelEngine.getRunningProcesses();
      setProcesses(list);
      if (list.length > 0) setSelectedPid(list[0]);
      setEvents(RuntimeKernelEngine.getKernelEventStream());
    } catch (e) {
      console.warn('[KERNEL] Load warning:', e);
    }
  };

  const handlePauseProcess = async (pid: string) => {
    try {
      const updated = await RuntimeKernelEngine.pauseProcess(pid);
      setProcesses(prev => prev.map(p => p.pid === pid ? updated : p));
      toast(`Kernel PAUSED process ${pid}!`, 'success');
    } catch (e) {
      toast('Failed to pause process.', 'error');
    }
  };

  const handleResumeProcess = async (pid: string) => {
    try {
      const updated = await RuntimeKernelEngine.resumeProcess(pid);
      setProcesses(prev => prev.map(p => p.pid === pid ? updated : p));
      toast(`Kernel RESUMED process ${pid}!`, 'success');
    } catch (e) {
      toast('Failed to resume process.', 'error');
    }
  };

  const handleMigrateProcess = async () => {
    if (!selectedPid) return;
    setIsMigrating(true);
    try {
      const res = await RuntimeKernelEngine.migrateProcess(selectedPid.pid, targetNode);
      setProcesses(prev => prev.map(p => p.pid === selectedPid.pid ? { ...p, nodeLocation: res.newLocation } : p));
      toast(`Migrated process ${selectedPid.pid} to ${res.newLocation} without state loss!`, 'success');
    } catch (e) {
      toast('Migration failed.', 'error');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#4EA3FF]" /> Enterprise AI Runtime OS Kernel & Execution Manager
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Universal process scheduler, zero-state-loss migration, live process debugging, and automated self-healing deadlock recovery.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Kernel Scheduler:</span>
          <span className="text-emerald-400 font-bold">PREEMPTIVE FAIR SHARE (3 PIDs)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'processes', label: 'Live Process Control Board', icon: Activity },
          { id: 'migration', label: 'Zero-Loss Process Migration', icon: Globe },
          { id: 'debugger', label: 'Runtime Debugger Console', icon: Terminal },
          { id: 'healing', label: 'Self-Healing & Deadlock Monitor', icon: AlertTriangle },
          { id: 'events', label: 'Kernel Event Bus Telemetry', icon: Share2 },
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

      {/* TAB 1: LIVE PROCESS CONTROL BOARD */}
      {activeTab === 'processes' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Active Process Control Blocks ({processes.length} PIDs)</h3>
              <span className="text-[10px] text-gray-500">Live CPU %, RAM allocation, VRAM usage, and scheduler state.</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              KERNEL SCHEDULER ACTIVE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#232323] text-gray-500 uppercase text-[10px]">
                  <th className="py-2.5 px-3 font-bold">PID</th>
                  <th className="py-2.5 px-3 font-bold">Process Name</th>
                  <th className="py-2.5 px-3 font-bold">State</th>
                  <th className="py-2.5 px-3 font-bold">CPU %</th>
                  <th className="py-2.5 px-3 font-bold">RAM</th>
                  <th className="py-2.5 px-3 font-bold">Node Location</th>
                  <th className="py-2.5 px-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232323]">
                {processes.map(proc => (
                  <tr key={proc.pid} className="hover:bg-white/5 text-gray-200">
                    <td className="py-3 px-3 font-bold text-emerald-400">{proc.pid}</td>
                    <td className="py-3 px-3 font-bold text-white">{proc.name}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        proc.state === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        proc.state === 'Paused' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                        'bg-purple-500/10 text-purple-300 border-purple-500/20'
                      }`}>
                        {proc.state.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-300">{proc.cpuPercent}%</td>
                    <td className="py-3 px-3 font-bold text-white">{proc.memoryMb} MB</td>
                    <td className="py-3 px-3 font-bold text-gray-400">{proc.nodeLocation}</td>
                    <td className="py-3 px-3 text-right">
                      {proc.state === 'Running' ? (
                        <button
                          onClick={() => handlePauseProcess(proc.pid)}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded text-[10px] cursor-pointer font-mono"
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResumeProcess(proc.pid)}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded text-[10px] cursor-pointer font-mono"
                        >
                          Resume
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ZERO-LOSS PROCESS MIGRATION */}
      {activeTab === 'migration' && selectedPid && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#4EA3FF]" /> Live Process Migration Studio
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Serializes process memory snapshots and transfers active execution state across nodes and cloud providers with zero progress loss.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Target Process PID</label>
                <div className="bg-[#050505] border border-[#232323] p-3 rounded-xl text-white font-bold">
                  {selectedPid.pid} - {selectedPid.name}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Destination Cluster Node</label>
                <select
                  value={targetNode}
                  onChange={(e) => setTargetNode(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white outline-none font-mono text-xs"
                >
                  <option value="cls-gcp-europe-west1">GCP GKE europe-west1 (Belgium)</option>
                  <option value="cls-onprem-gpu-pool">On-Prem NVIDIA H100 Accelerator Pool</option>
                  <option value="cls-aws-us-east-1">AWS EKS us-east-1 (N. Virginia)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleMigrateProcess}
              disabled={isMigrating}
              className="px-5 py-2.5 bg-[#4EA3FF] text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono"
            >
              {isMigrating ? 'Migrating Memory Snapshot...' : 'Execute Live Process Migration'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: RUNTIME DEBUGGER CONSOLE */}
      {activeTab === 'debugger' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" /> Interactive Runtime Debugger Console
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Pause active execution threads to inspect variable states, agent memory buffers, and tool stack frames.
          </p>

          <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2 text-gray-300 font-mono text-[11px]">
            <div className="text-[#4EA3FF] font-bold">[DEBUGGER] Process PID-9421 paused at breakpoint L42.</div>
            <div className="text-purple-300">[STACK FRAME] Agent: Senior Security Coder | Model: Claude 3.5 Sonnet</div>
            <div className="text-emerald-400">[VARIABLES] code_snippet: &quot;function transfer(...)&quot; | ruleset: &quot;OWASP_2024&quot;</div>
          </div>
        </div>
      )}

      {/* TAB 4: SELF-HEALING & DEADLOCK MONITOR */}
      {activeTab === 'healing' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-emerald-400" /> Self-Healing &amp; Deadlock Monitor
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { incident: 'Infinite Loop Detected in Agent Tool Thread', resolution: 'Terminated hung thread & restored checkpoint chk-9421-v3', status: 'AUTO-HEALED' },
              { incident: 'Memory Leak Alert in Node Vector Buffer', resolution: 'Flushed vector cache & rescheduled PID-9390', status: 'AUTO-HEALED' }
            ].map((inc, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{inc.incident}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">{inc.resolution}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  {inc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KERNEL EVENT BUS TELEMETRY */}
      {activeTab === 'events' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-400" /> Kernel Event Bus Telemetry Log Stream
          </h3>

          <div className="space-y-2 pt-2">
            {events.map(e => (
              <div key={e.id} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[#4EA3FF] font-bold">[{e.type}] ({e.pid})</span>
                  <span className="text-gray-300 block font-sans mt-0.5">{e.summary}</span>
                </div>
                <span className="text-gray-500 text-[10px]">{e.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
