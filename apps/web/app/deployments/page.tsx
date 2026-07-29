'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Rocket, 
  Server, 
  Cpu, 
  HardDrive, 
  Globe, 
  Clock, 
  RotateCcw, 
  Sliders, 
  Play, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Code, 
  Layers, 
  Search, 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Share2,
  TrendingUp,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AICloudService, 
  AIDeploymentApp, 
  GPUWorkerPool, 
  CronJobTask, 
  EnvironmentType 
} from '../../services/ai-cloud.service';

export default function DeploymentsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'deployments' | 'canary' | 'gpu' | 'cron' | 'domains' | 'logs'>('deployments');
  const [selectedEnv, setSelectedEnv] = useState<string>('all');
  const [deployments, setDeployments] = useState<AIDeploymentApp[]>([]);
  const [gpuPools, setGpuPools] = useState<GPUWorkerPool[]>([]);
  const [cronJobs, setCronJobs] = useState<CronJobTask[]>([]);
  const [trafficSplit, setTrafficSplit] = useState<{ [appId: string]: number }>({ 'app-agent-sec-audit': 90 });

  useEffect(() => {
    fetchCloudData();
  }, [selectedEnv]);

  const fetchCloudData = async () => {
    try {
      const apps = await AICloudService.getDeployments(selectedEnv);
      setDeployments(apps);
      const gpus = await AICloudService.getGPUPools();
      setGpuPools(gpus);
      const jobs = await AICloudService.getScheduledJobs();
      setCronJobs(jobs);
    } catch (e) {
      console.warn('[AI_CLOUD] Fetch warning:', e);
    }
  };

  const handleRollback = async (app: AIDeploymentApp) => {
    const targetVer = 'v2.3.9';
    const res = await AICloudService.rollbackDeployment(app.id, targetVer);
    toast(res.message, 'success');
    setDeployments(prev => prev.map(a => a.id === app.id ? { ...a, version: targetVer } : a));
  };

  const handleTrafficSplitChange = async (app: AIDeploymentApp, mainPercent: number) => {
    const canaryPercent = 100 - mainPercent;
    setTrafficSplit(prev => ({ ...prev, [app.id]: mainPercent }));
    const res = await AICloudService.updateTrafficSplit(app.id, mainPercent, canaryPercent);
    toast(res.message, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#4EA3FF]" /> AI Cloud Platform & Application Runtime
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Host, deploy, auto-scale, and monitor AI Agents, Workflows, MCP Servers, and APIs across Kubernetes, Serverless, and NVIDIA GPU clusters.
          </p>
        </div>

        {/* Environment Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#111111] p-1 rounded-xl border border-[#232323] font-mono text-xs">
          {['all', 'production', 'staging', 'development'].map(env => (
            <button
              key={env}
              onClick={() => setSelectedEnv(env)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                selectedEnv === env 
                  ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] font-bold border border-[#4EA3FF]/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {env}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'deployments', label: 'Active AI Deployments', icon: Rocket },
          { id: 'canary', label: 'Canary & Traffic Splitting', icon: Sliders },
          { id: 'gpu', label: 'GPU Cluster Pools', icon: Cpu },
          { id: 'cron', label: 'Scheduled Cron Jobs', icon: Clock },
          { id: 'domains', label: 'Custom Domains & SSL', icon: Globe },
          { id: 'logs', label: 'Telemetry & Pod Logs', icon: Terminal },
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

      {/* TAB 1: ACTIVE AI DEPLOYMENTS */}
      {activeTab === 'deployments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deployments.map(app => (
              <div key={app.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                      {app.targetType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                      {app.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{app.name}</h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-gray-400">
                      <span>Version: <strong className="text-white">{app.version}</strong></span>
                      <span>•</span>
                      <span>Infra: <strong className="text-purple-300">{app.infra}</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] font-mono text-[10px]">
                    <div>
                      <span className="text-gray-500 block">Replicas</span>
                      <span className="text-white font-bold block">{app.replicas.current} Pods</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">CPU Load</span>
                      <span className="text-amber-300 font-bold block">{app.cpuPercent}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Latency</span>
                      <span className="text-emerald-400 font-bold block">{app.latencyMs}ms</span>
                    </div>
                  </div>

                  {/* Endpoints List */}
                  <div className="space-y-1.5 pt-2 border-t border-[#232323] font-mono text-[10px]">
                    <span className="text-gray-500 uppercase block font-bold text-[9px]">Generated Application Endpoints</span>
                    <div className="bg-[#050505] p-2 rounded-lg border border-[#232323] text-[#4EA3FF] truncate select-all">
                      REST: {app.endpoints.rest}
                    </div>
                    {app.endpoints.mcp && (
                      <div className="bg-[#050505] p-2 rounded-lg border border-[#232323] text-purple-300 truncate select-all">
                        MCP: {app.endpoints.mcp}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                  <span className="text-[10px] font-mono text-gray-500">Domain: <strong className="text-gray-300">{app.customDomain || 'orbit-app.internal'}</strong></span>
                  <button
                    onClick={() => handleRollback(app)}
                    className="flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Rollback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CANARY & TRAFFIC SPLITTING */}
      {activeTab === 'canary' && (
        <div className="space-y-6 font-mono text-xs">
          {deployments.map(app => {
            const mainSplit = trafficSplit[app.id] ?? 90;
            const canarySplit = 100 - mainSplit;
            return (
              <div key={app.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#232323] pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{app.name}</h3>
                    <span className="text-[10px] text-gray-500">Active Release: {app.activeRelease.version} | Canary: {app.canaryRelease?.version || 'N/A'}</span>
                  </div>

                  <button
                    onClick={() => handleRollback(app)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Instant Rollback to {app.activeRelease.version}
                  </button>
                </div>

                {app.canaryRelease && (
                  <div className="space-y-3 bg-[#050505] p-4 rounded-xl border border-[#232323]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Traffic Distribution Slider:</span>
                      <span className="font-bold text-[#4EA3FF]">
                        {mainSplit}% Primary ({app.activeRelease.version}) / {canarySplit}% Canary ({app.canaryRelease.version})
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={mainSplit}
                      onChange={(e) => handleTrafficSplitChange(app, parseInt(e.target.value))}
                      className="w-full h-2 bg-[#232323] rounded-lg appearance-none cursor-pointer accent-[#4EA3FF]"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: GPU CLUSTER POOLS */}
      {activeTab === 'gpu' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gpuPools.map(pool => (
              <div key={pool.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-400" /> {pool.gpuModel} Worker Pool
                  </h3>
                  <span className="text-[10px] text-gray-500">{pool.region}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-[#050505] p-3 rounded-xl border border-[#232323]">
                  <div>
                    <span className="text-gray-500 text-[10px] block">Nodes Active</span>
                    <span className="text-white font-bold block">{pool.activeNodes} / {pool.totalNodes}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">GPU Load</span>
                    <span className="text-emerald-400 font-bold block">{pool.gpuUtilization}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">VRAM Allocated</span>
                    <span className="text-purple-300 font-bold block">{pool.vramAllocatedGb} GB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULED CRON JOBS */}
      {activeTab === 'cron' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" /> Enterprise Job Scheduler & Dead Letter Queue (DLQ)
          </h3>

          <div className="space-y-3 pt-2">
            {cronJobs.map(job => (
              <div key={job.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{job.name}</span>
                  <span className="text-emerald-400 font-bold">{job.status.toUpperCase()}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>Cron Expression: <strong className="text-[#4EA3FF]">{job.cronExpression}</strong></span>
                  <span>Target Workflow: <strong className="text-gray-300">{job.targetWorkflowId}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CUSTOM DOMAINS */}
      {activeTab === 'domains' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#4EA3FF]" /> Custom Domain SSL / TLS Manager
          </h3>

          <div className="space-y-2 pt-2">
            {['sec-audit.orbit.ai', 'ledger-mcp.orbit.ai', 'research-api.orbit.ai'].map((domain, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <span className="font-bold text-white">{domain}</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  SSL Active (Let&apos;s Encrypt ECC)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TELEMETRY & POD LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#4EA3FF]" /> Cluster Pod Log Telemetry Stream
          </h3>

          <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl font-mono text-[11px] text-gray-300 space-y-1.5 h-64 overflow-y-auto">
            <div className="text-gray-500">[2026-07-30T00:28:44Z] [INFO] [k8s-pod-sec-audit-v2-4a] GET /api/v1/deployments/sec-auditor 200 OK (124ms)</div>
            <div className="text-emerald-400">[2026-07-30T00:28:45Z] [SUCCESS] [gpu-h100-worker-1] Executed RAG embedding vector search on pgvector cluster.</div>
            <div className="text-purple-300">[2026-07-30T00:28:46Z] [CANARY] Route 10% traffic to v2.5.0-canary worker replica.</div>
          </div>
        </div>
      )}

    </div>
  );
}
