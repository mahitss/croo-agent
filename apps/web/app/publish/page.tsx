'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Code, 
  Terminal, 
  Key, 
  Share2, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  Copy, 
  Check, 
  Play, 
  Plus, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  FileText, 
  Activity, 
  TrendingUp, 
  Zap, 
  X,
  Cpu
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  DeveloperPlatformService, 
  DeveloperApp, 
  PluginManifest, 
  SDKLanguage 
} from '../../services/developer-platform.service';

export default function DeveloperPortalPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sdks' | 'cli' | 'plugins' | 'webhooks' | 'revenue'>('dashboard');
  const [selectedLang, setSelectedLang] = useState<SDKLanguage>('typescript');
  const [developerApps, setDeveloperApps] = useState<DeveloperApp[]>([]);
  const [plugins, setPlugins] = useState<PluginManifest[]>([]);
  const [cliInput, setCliInput] = useState('orbit status');
  const [cliLogs, setCliLogs] = useState<string[]>(['$ orbit status', 'Orbit Cloud Infrastructure: All Systems Operational (SLA 99.99%).']);
  const [copiedSdk, setCopiedSdk] = useState(false);

  useEffect(() => {
    fetchDevData();
  }, []);

  const fetchDevData = async () => {
    try {
      const apps = await DeveloperPlatformService.getDeveloperApps();
      setDeveloperApps(apps);
      const plugList = await DeveloperPlatformService.getPlugins();
      setPlugins(plugList);
    } catch (e) {
      console.warn('[DEVELOPER_PORTAL] Fetch warning:', e);
    }
  };

  const handleRunCLI = async () => {
    if (!cliInput.trim()) return;
    const inputCmd = cliInput;
    setCliLogs(prev => [...prev, `$ ${inputCmd}`]);
    const res = await DeveloperPlatformService.executeCLICommand(inputCmd);
    setCliLogs(prev => [...prev, res.output]);
    setCliInput('');
  };

  const handleCopySDK = () => {
    const snippet = DeveloperPlatformService.getSDKSnippet(selectedLang);
    navigator.clipboard.writeText(snippet);
    setCopiedSdk(true);
    toast(`Copied ${selectedLang.toUpperCase()} SDK snippet!`, 'success');
    setTimeout(() => setCopiedSdk(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Code className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Developer Platform & Extension Ecosystem
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Build applications, plugins, agents, and connectors using Orbit SDKs (TypeScript, Python, Go, Rust, Java), Orbit CLI, OAuth apps, and event webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Revenue Share:</span>
          <span className="text-emerald-400 font-bold">80% Developer / 20% Platform</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'dashboard', label: 'Developer Apps & OAuth', icon: Key },
          { id: 'sdks', label: 'Multi-Language SDKs', icon: Code },
          { id: 'cli', label: 'Orbit CLI Terminal', icon: Terminal },
          { id: 'plugins', label: 'Plugin Publishing Studio', icon: Layers },
          { id: 'webhooks', label: 'Platform Event Webhooks', icon: Share2 },
          { id: 'revenue', label: 'Monetization & Billing', icon: DollarSign },
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

      {/* TAB 1: DEVELOPER APPS & OAUTH */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Registered OAuth Developer Applications</span>
            <button className="px-3 py-1.5 bg-[#4EA3FF] text-black font-semibold rounded-xl text-xs flex items-center gap-1 cursor-pointer border-0 shadow">
              <Plus className="w-3.5 h-3.5" /> Create OAuth App
            </button>
          </div>

          <div className="space-y-4">
            {developerApps.map(app => (
              <div key={app.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{app.name}</h3>
                    <span className="text-[10px] text-gray-500">Client ID: <strong className="text-purple-300">{app.clientId}</strong></span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px]">
                    ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-[#050505] p-3 rounded-xl border border-[#232323] text-[11px]">
                  <div>
                    <span className="text-gray-500 text-[9px] block">Total Invocations</span>
                    <span className="text-white font-bold block">{app.totalInvocations.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] block">Monthly Earnings</span>
                    <span className="text-emerald-400 font-bold block">${app.monthlyRevenueUsdc} USDC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-LANGUAGE SDKS */}
      {activeTab === 'sdks' && (
        <div className="space-y-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            {(['typescript', 'python', 'go', 'rust', 'java', 'csharp', 'flutter', 'swift', 'kotlin'] as SDKLanguage[]).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3.5 py-1.5 rounded-xl border uppercase cursor-pointer transition-all ${
                  selectedLang === lang
                    ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/30 font-bold'
                    : 'bg-[#111111] text-gray-400 border-[#232323] hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase flex items-center gap-2">
                <Code className="w-4 h-4 text-[#4EA3FF]" /> Official Orbit AI {selectedLang.toUpperCase()} SDK Boilerplate
              </span>
              <button
                onClick={handleCopySDK}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl cursor-pointer text-xs"
              >
                {copiedSdk ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSdk ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-[#050505] border border-[#232323] p-4 rounded-xl text-amber-300 text-xs overflow-x-auto leading-relaxed">
{DeveloperPlatformService.getSDKSnippet(selectedLang)}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: ORBIT CLI TERMINAL */}
      {activeTab === 'cli' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#4EA3FF]" /> Orbit Command-Line Interface (CLI) Playground
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Run Orbit CLI commands directly in the terminal: <code className="text-[#4EA3FF]">orbit status</code>, <code className="text-[#4EA3FF]">orbit deploy</code>, <code className="text-[#4EA3FF]">orbit logs</code>, <code className="text-[#4EA3FF]">orbit whoami</code>.
          </p>

          <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl font-mono text-xs text-gray-300 space-y-2 h-64 overflow-y-auto">
            {cliLogs.map((log, i) => (
              <div key={i} className={log.startsWith('$') ? 'text-[#4EA3FF] font-bold' : 'text-gray-300'}>
                {log}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. orbit status or orbit deploy"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunCLI()}
              className="flex-1 bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-2.5 text-white outline-none font-mono"
            />
            <button
              onClick={handleRunCLI}
              className="px-4 py-2.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold rounded-xl cursor-pointer text-xs border-0"
            >
              Run CLI
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PLUGIN PUBLISHING STUDIO */}
      {activeTab === 'plugins' && (
        <div className="space-y-4 font-mono text-xs">
          {plugins.map(plug => (
            <div key={plug.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{plug.name}</h3>
                  <span className="text-[10px] text-gray-500">v{plug.version} • Author: {plug.author}</span>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] uppercase">
                  {plug.status}
                </span>
              </div>

              <p className="text-xs text-gray-300 font-sans">{plug.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: PLATFORM EVENT WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#4EA3FF]" /> Real-Time Platform Event Webhook Subscriptions
          </h3>

          <div className="space-y-2 pt-2">
            {['WorkflowExecuted', 'AgentStarted', 'DeploymentFinished', 'KnowledgeUpdated'].map((evt, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <span className="font-bold text-white">{evt} Event</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  SUBSCRIBED
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MONETIZATION & BILLING */}
      {activeTab === 'revenue' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-2">
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Total Developer Earnings</span>
            <span className="text-3xl font-bold text-emerald-400 block">$1,420.50 USDC</span>
          </div>
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-2">
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Revenue Share</span>
            <span className="text-3xl font-bold text-[#4EA3FF] block">80% Dev / 20% Platform</span>
          </div>
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-2">
            <span className="text-[10px] text-gray-500 uppercase block font-bold">Marketplace Installs</span>
            <span className="text-3xl font-bold text-purple-300 block">1,240 Installs</span>
          </div>
        </div>
      )}

    </div>
  );
}
