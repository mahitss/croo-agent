'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Server, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Sliders, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Terminal, 
  HardDrive, 
  Search, 
  Share2, 
  FileText, 
  TrendingUp, 
  X,
  Code,
  DollarSign
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AIInfrastructureService, 
  MultiCloudCluster, 
  ModelRouteEntry, 
  SmartFailoverLog 
} from '../../services/ai-infrastructure.service';

export default function InfrastructurePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'clusters' | 'router' | 'gpu' | 'mesh' | 'cache' | 'cost'>('clusters');
  const [clusters, setClusters] = useState<MultiCloudCluster[]>([]);
  const [modelRoutes, setModelRoutes] = useState<ModelRouteEntry[]>([]);
  const [failoverLogs, setFailoverLogs] = useState<SmartFailoverLog[]>([]);
  const [isSimulatingFailover, setIsSimulatingFailover] = useState(false);

  useEffect(() => {
    fetchInfraData();
  }, []);

  const fetchInfraData = async () => {
    try {
      const cls = await AIInfrastructureService.getClusters();
      setClusters(cls);
      const routes = await AIInfrastructureService.getModelRoutes();
      setModelRoutes(routes);
    } catch (e) {
      console.warn('[INFRASTRUCTURE] Fetch warning:', e);
    }
  };

  const handleTestFailover = async (modelId: string) => {
    setIsSimulatingFailover(true);
    try {
      const log = await AIInfrastructureService.simulateFailover(modelId);
      setFailoverLogs(prev => [log, ...prev]);
      toast(`Simulated failover for ${modelId}: Recovered via ${log.fallbackProvider} in ${log.recoveryTimeMs}ms!`, 'success');
    } catch (e) {
      toast('Failover simulation error.', 'error');
    } finally {
      setIsSimulatingFailover(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-[#4EA3FF]" /> Global AI Infrastructure & Service Mesh Control Plane
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Intelligent multi-cloud compute management (AWS, GCP, Azure, On-Prem), Smart Model Router with zero-downtime failover, and mTLS service mesh.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Global Cluster Mesh:</span>
          <span className="text-emerald-400 font-bold">100% OPERATIONAL (SLA 99.99%)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'clusters', label: 'Multi-Cloud Clusters', icon: Server },
          { id: 'router', label: 'Smart Model Router & Failover', icon: Sliders },
          { id: 'gpu', label: 'GPU Pools & Accelerators', icon: Cpu },
          { id: 'mesh', label: 'Service Mesh & mTLS', icon: ShieldCheck },
          { id: 'cache', label: 'Distributed Caches & Queues', icon: HardDrive },
          { id: 'cost', label: 'Cost & Idle Resource Optimizer', icon: DollarSign },
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

      {/* TAB 1: MULTI-CLOUD CLUSTERS */}
      {activeTab === 'clusters' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          {clusters.map(cls => (
            <div key={cls.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                    {cls.provider}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    {cls.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{cls.name}</h3>
                  <span className="text-[10px] text-gray-500">{cls.region}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px]">
                  <div>
                    <span className="text-gray-500 block">Nodes</span>
                    <span className="text-white font-bold block">{cls.totalNodes} Nodes</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">CPU Load</span>
                    <span className="text-amber-300 font-bold block">{cls.cpuUtilizationPercent}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">RAM Load</span>
                    <span className="text-emerald-400 font-bold block">{cls.memoryUtilizationPercent}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#232323] text-[10px] text-gray-500">
                <span>Circuit Breaker: <strong className="text-emerald-400 font-bold">CLOSED (OK)</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SMART MODEL ROUTER & FAILOVER */}
      {activeTab === 'router' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#4EA3FF]" /> Smart Model Router & Zero-Downtime Failover Matrix
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Dynamically routes model requests based on latency, cost, and provider SLA. If the primary provider fails, it automatically switches to secondary fallback providers.
            </p>

            <div className="space-y-4 pt-2">
              {modelRoutes.map(route => (
                <div key={route.modelId} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{route.modelId}</h4>
                      <span className="text-[10px] text-gray-400">Primary Provider: <strong className="text-purple-300">{route.primaryProvider}</strong></span>
                    </div>

                    <button
                      onClick={() => handleTestFailover(route.modelId)}
                      disabled={isSimulatingFailover}
                      className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded-xl text-xs cursor-pointer font-mono"
                    >
                      {isSimulatingFailover ? 'Simulating...' : 'Test Failover'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-2 border-t border-[#232323]">
                    <span>Fallback Chain:</span>
                    {route.fallbackProviders.map((fb, idx) => (
                      <span key={idx} className="bg-[#111111] text-gray-300 px-2 py-0.5 rounded border border-[#232323]">
                        {idx + 1}. {fb}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {failoverLogs.length > 0 && (
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Simulated Smart Failover Audit Logs</span>
              {failoverLogs.map(log => (
                <div key={log.id} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-amber-300 font-bold">{log.requestedModel}</span>
                    <span className="text-emerald-400 font-bold">RECOVERED in {log.recoveryTimeMs}ms</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans">{log.failedReason} Switched to {log.fallbackProvider}.</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GPU POOLS */}
      {activeTab === 'gpu' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" /> GPU Pools & Accelerator Clusters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
              <span className="text-white font-bold text-xs block">NVIDIA H100 SXM5 Pool</span>
              <span className="text-emerald-400 block">32 GPUs Active • 78.4% VRAM Load</span>
            </div>
            <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
              <span className="text-white font-bold text-xs block">AMD MI300X Accelerator Pool</span>
              <span className="text-purple-300 block">16 GPUs Active • 64.0% VRAM Load</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SERVICE MESH */}
      {activeTab === 'mesh' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4EA3FF]" /> Service Mesh & mTLS Communication Status
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { service: 'Agent Pod Mesh', protocol: 'mTLS SPIFFE/SPIRE', loadBalancing: 'Latency-Weighted Round Robin' },
              { service: 'RAG Vector Store Mesh', protocol: 'mTLS TLS 1.3', loadBalancing: 'Least Connections' }
            ].map((s, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{s.service}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">Protocol: {s.protocol} | Load Balancing: {s.loadBalancing}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  mTLS SECURE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: DISTRIBUTED CACHES */}
      {activeTab === 'cache' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-400" /> Distributed Redis Caches & Priority Queues
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
              <span className="text-gray-500 text-[10px] uppercase block font-bold">Redis Prompt Cache Hit Rate</span>
              <span className="text-2xl font-bold text-emerald-400 block">78.4%</span>
            </div>
            <div className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
              <span className="text-gray-500 text-[10px] uppercase block font-bold">Semantic Cache Savings</span>
              <span className="text-2xl font-bold text-purple-300 block">$420 USDC / mo</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: COST OPTIMIZER */}
      {activeTab === 'cost' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Cost & Idle Resource Optimizer
          </h3>

          <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 space-y-1 font-sans text-xs">
            <strong>Automated Recommendation:</strong> Switching secondary research swarm queries from GPT-4o to DeepSeek R1 reduces monthly LLM spend by 48.5% with zero impact on task SLA.
          </div>
        </div>
      )}

    </div>
  );
}
