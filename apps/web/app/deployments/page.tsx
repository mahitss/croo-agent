'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Globe, 
  Cpu, 
  ShoppingBag, 
  Code, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Sliders, 
  Play, 
  RotateCcw, 
  TrendingUp, 
  FileText, 
  Copy, 
  Check, 
  Sparkles,
  BarChart3,
  Search,
  Download
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  GlobalCloudPlatformService, 
  CloudRegionNode, 
  ModelRoutingDecision, 
  MarketplaceBundleItem 
} from '../../services/global-cloud-platform.service';

export default function GlobalCloudPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'network' | 'router' | 'tenancy' | 'marketplace' | 'terraform'>('network');
  const [regions, setRegions] = useState<CloudRegionNode[]>([]);
  const [bundles, setBundles] = useState<MarketplaceBundleItem[]>([]);
  
  // Model Router state
  const [routeQuery, setRouteQuery] = useState('Audit Smart Contract for Reentrancy Vulnerabilities');
  const [priority, setPriority] = useState<'latency' | 'cost' | 'accuracy'>('latency');
  const [routingDecision, setRoutingDecision] = useState<ModelRoutingDecision | null>(null);

  useEffect(() => {
    fetchCloudData();
  }, []);

  const fetchCloudData = async () => {
    try {
      const list = await GlobalCloudPlatformService.getGlobalRegions();
      setRegions(list);
      setBundles(GlobalCloudPlatformService.getMarketplaceBundles());
      handleTestRouter();
    } catch (e) {
      console.warn('[GLOBAL_CLOUD] Load warning:', e);
    }
  };

  const handleTestRouter = () => {
    const decision = GlobalCloudPlatformService.routeModelInference(routeQuery, priority);
    setRoutingDecision(decision);
    toast(`GLOBAL MODEL ROUTER: Selected ${decision.selectedModel} (${decision.latencyMs}ms)!`, 'success');
  };

  const handleInstallBundle = (bundleTitle: string) => {
    toast(`Installed ${bundleTitle} to global workspace!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#4EA3FF]" /> Global AI Cloud Platform &amp; Control Plane
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Multi-region Anycast Edge, Intelligent Multi-Model Router (OpenAI, Anthropic, DeepSeek), Multi-Tenant Isolation, and Global Marketplace.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Global Execution Engine:</span>
          <span className="text-emerald-400 font-bold text-sm">1,000,000,000+ EXECUTIONS</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'network', label: 'Multi-Region Edge Topology', icon: Globe },
          { id: 'router', label: 'Global Intelligent Model Router', icon: Cpu },
          { id: 'tenancy', label: 'Multi-Tenant Isolation Matrix', icon: Layers },
          { id: 'marketplace', label: 'Global AI Marketplace', icon: ShoppingBag },
          { id: 'terraform', label: 'Terraform & Infrastructure APIs', icon: Code },
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

      {/* TAB 1: MULTI-REGION EDGE TOPOLOGY */}
      {activeTab === 'network' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Active Multi-Region Infrastructure Clusters ({regions.length})</h3>
              <span className="text-[10px] text-gray-500">Live SLA latency, active execution throughput, and anycast routing.</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              99.99% ANYCAST ROUTING ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map(r => (
              <div key={r.regionId} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">{r.name}</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Provider: {r.provider}</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                    {r.latencyMs}ms LATENCY
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#232323] text-[10px]">
                  <span className="text-gray-400">Active Workloads: <strong className="text-amber-300">{r.activeExecutionsCount.toLocaleString()} PIDs</strong></span>
                  <span className="text-emerald-400 font-bold">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL INTELLIGENT MODEL ROUTER */}
      {activeTab === 'router' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#4EA3FF]" /> Global Multi-Provider Intelligent Model Router
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Dynamically routes inference requests across OpenAI, Anthropic, Google, Meta, DeepSeek, and vLLM based on latency, cost, and compliance.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                value={routeQuery}
                onChange={(e) => setRouteQuery(e.target.value)}
                className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-3 text-white outline-none font-mono text-xs"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px]">Routing Priority:</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="bg-[#050505] border border-[#232323] text-white rounded-lg px-3 py-1 text-xs outline-none"
                  >
                    <option value="latency">Optimize for Latency (Sub-200ms)</option>
                    <option value="cost">Optimize for Cost Efficiency ($ USDC)</option>
                    <option value="accuracy">Optimize for Max Reasoning Accuracy</option>
                  </select>
                </div>

                <button
                  onClick={handleTestRouter}
                  className="px-5 py-2.5 bg-[#4EA3FF] text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono"
                >
                  Test Model Routing
                </button>
              </div>
            </div>
          </div>

          {routingDecision && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Optimal Inference Route Selected</span>
              <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{routingDecision.selectedModel}</span>
                  <span className="text-[#4EA3FF] font-bold text-xs bg-[#4EA3FF]/10 border border-[#4EA3FF]/20 px-2 py-0.5 rounded">
                    {routingDecision.provider}
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-sans">{routingDecision.selectedReason}</p>
                <div className="flex items-center justify-between pt-2 text-[10px] border-t border-[#232323]">
                  <span>Latency: <strong className="text-emerald-400">{routingDecision.latencyMs}ms</strong></span>
                  <span>Est. Cost: <strong className="text-amber-300">${routingDecision.costUsdc} / run</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MULTI-TENANT ISOLATION MATRIX */}
      {activeTab === 'tenancy' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Multi-Tenant Isolation &amp; Environment Tiers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { tier: 'Personal / Startup Tier', isolation: 'Logical VPC Isolation', limit: '10M Tokens / mo' },
              { tier: 'Enterprise Tier', isolation: 'Dedicated Single-Tenant H100 Pool', limit: '1B Tokens / mo' },
              { tier: 'Government Vault', isolation: 'FedRAMP High & Air-Gapped Cloud', limit: 'Unlimited' }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                <span className="font-bold text-white text-xs block">{t.tier}</span>
                <span className="text-[10px] text-emerald-400 block font-sans">{t.isolation}</span>
                <span className="text-[10px] text-gray-500 block">{t.limit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL AI MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" /> Global AI Marketplace &amp; Developer Hub
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {bundles.map(b => (
              <div key={b.id} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-300 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                      {b.category}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">★ {b.ratingScore}</span>
                  </div>
                  <span className="font-bold text-white text-sm block">{b.title}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">Author: {b.author} • Installs: {b.installsCount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#232323]">
                  <span className="font-bold text-emerald-400 text-xs">{b.priceUsdc === 0 ? 'FREE' : `$${b.priceUsdc} USDC`}</span>
                  <button
                    onClick={() => handleInstallBundle(b.title)}
                    className="px-3 py-1 bg-[#4EA3FF] text-black font-bold rounded-lg cursor-pointer text-[10px] font-mono"
                  >
                    Install Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TERRAFORM & INFRASTRUCTURE APIS */}
      {activeTab === 'terraform' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-[#4EA3FF]" /> Official Orbit Terraform Provider &amp; Infrastructure Schema
          </h3>

          <pre className="bg-[#050505] border border-[#232323] p-4 rounded-xl text-amber-300 overflow-x-auto text-[11px] font-mono leading-relaxed">
            {GlobalCloudPlatformService.getTerraformHCL()}
          </pre>
        </div>
      )}

    </div>
  );
}
