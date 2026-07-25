'use client';

import { useState } from 'react';
import AppLayout from '../../components/AppLayout';
import { Rocket, ShieldCheck, RefreshCw, Key, Layers, Globe, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function VercelStyleDeploymentsPage() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'releases' | 'environments' | 'versions'>('releases');
  const [isEnvModalOpen, setIsEnvModalOpen] = useState(false);
  const [envKeyInput, setEnvKeyInput] = useState('');
  const [envValInput, setEnvValInput] = useState('');

  const [envVars, setEnvVars] = useState([
    { key: 'CROO_MAINNET_RPC', value: 'https://rpc.croo.network/v2/live', env: 'Production' },
    { key: 'OPENAI_API_KEY', value: 'sk-proj-••••••••••••••••', env: 'Production' },
    { key: 'MAX_ESCROW_CAP', value: '150.00 USDC', env: 'Production' },
  ]);

  const deployments = [
    { id: 'dep-101', name: 'Research Consensus Agent Swarm', version: 'v2.4.0', env: 'Production', region: 'us-east-1', traffic: '100%', status: 'Deployed', deployedAt: 'Today 09:30 AM', url: 'https://research.orbitai.dev' },
    { id: 'dep-102', name: 'Sales Lead Outreach Swarm', version: 'v1.8.1', env: 'Production', region: 'us-west-2', traffic: '100%', status: 'Deployed', deployedAt: 'Yesterday 02:15 PM', url: 'https://sales.orbitai.dev' },
    { id: 'dep-103', name: 'Legal GDPR Compliance Audit', version: 'v3.0.0', env: 'Staging', region: 'eu-west-1', traffic: '50% Split', status: 'Deployed', deployedAt: 'Jul 21, 2026', url: 'https://staging-legal.orbitai.dev' },
  ];

  const handleRollback = (id: string, name: string) => {
    toast(`Initiating rollback for deployment "${name}" to previous stable release...`, 'info');
  };

  const handleAddEnvVar = () => {
    if (!envKeyInput || !envValInput) return;
    setEnvVars(prev => [...prev, { key: envKeyInput, value: envValInput, env: 'Production' }]);
    setEnvKeyInput('');
    setEnvValInput('');
    setIsEnvModalOpen(false);
    toast(`Added environment variable "${envKeyInput}".`, 'success');
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Rocket className="w-6 h-6 text-purple-400" /> Enterprise Release & Environment Center
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Vercel & Kubernetes style release manifests, traffic split routing, environment variables, and 1-click rollbacks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEnvModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-white/5 border border-[#232323] text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Add Env Var</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-[#232323] pb-2 text-xs font-semibold">
          <button
            onClick={() => setSelectedTab('releases')}
            className={`pb-2 border-b-2 transition-all cursor-pointer ${
              selectedTab === 'releases' ? 'border-[#4EA3FF] text-[#4EA3FF]' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Production Releases
          </button>
          <button
            onClick={() => setSelectedTab('environments')}
            className={`pb-2 border-b-2 transition-all cursor-pointer ${
              selectedTab === 'environments' ? 'border-[#4EA3FF] text-[#4EA3FF]' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Environment Variables ({envVars.length})
          </button>
        </div>

        {/* Tab 1: Production Releases */}
        {selectedTab === 'releases' && (
          <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 px-6 py-3.5 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
              <span className="col-span-4">Deployment Manifest & Domain</span>
              <span className="col-span-2">Environment & Region</span>
              <span className="col-span-2">Traffic Split</span>
              <span className="col-span-2">Status & Release Date</span>
              <span className="col-span-2 text-right">Rollback Control</span>
            </div>

            {deployments.map((dep) => (
              <div key={dep.id} className="grid grid-cols-12 items-center px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
                <div className="col-span-4 flex flex-col gap-0.5">
                  <span className="font-bold text-white text-xs">{dep.name} ({dep.version})</span>
                  <a href={dep.url} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-[#4EA3FF] hover:underline flex items-center gap-1">
                    <span>{dep.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="col-span-2 font-mono">
                  <span className="text-purple-400">{dep.env}</span> • <span className="text-gray-500">{dep.region}</span>
                </div>

                <div className="col-span-2 font-mono text-gray-300 font-bold">{dep.traffic}</div>

                <div className="col-span-2 font-mono">
                  <span className="text-emerald-400 font-bold block">{dep.status}</span>
                  <span className="text-gray-500 text-[10px]">{dep.deployedAt}</span>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => handleRollback(dep.id, dep.name)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 hover:text-amber-400 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Rollback</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Environment Variables */}
        {selectedTab === 'environments' && (
          <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 px-6 py-3.5 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
              <span className="col-span-5">Variable Key</span>
              <span className="col-span-5">Encrypted Value</span>
              <span className="col-span-2 text-right">Scope</span>
            </div>

            {envVars.map((v) => (
              <div key={v.key} className="grid grid-cols-12 items-center px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
                <div className="col-span-5 font-mono font-bold text-white">{v.key}</div>
                <div className="col-span-5 font-mono text-gray-400 text-[11px] truncate">{v.value}</div>
                <div className="col-span-2 text-right font-mono text-purple-400">{v.env}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add Env Var Modal */}
        {isEnvModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#232323] pb-3">
                <h3 className="text-sm font-bold text-white">Add Production Environment Variable</h3>
                <button onClick={() => setIsEnvModalOpen(false)} className="text-gray-400 bg-transparent border-0 cursor-pointer">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">KEY</label>
                  <input
                    type="text"
                    placeholder="e.g. OPENAI_API_KEY"
                    value={envKeyInput}
                    onChange={(e) => setEnvKeyInput(e.target.value)}
                    className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white font-mono outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">VALUE</label>
                  <input
                    type="password"
                    placeholder="Secret value..."
                    value={envValInput}
                    onChange={(e) => setEnvValInput(e.target.value)}
                    className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-[#232323]">
                <button onClick={() => setIsEnvModalOpen(false)} className="px-4 py-2 bg-transparent text-gray-400 hover:text-white text-xs font-semibold rounded-xl border border-[#232323] cursor-pointer">Cancel</button>
                <button onClick={handleAddEnvVar} className="px-4 py-2 bg-[#4EA3FF] text-black font-bold rounded-xl border-0 text-xs cursor-pointer">Add Secret</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
