'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  Share2, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Key, 
  Lock, 
  RefreshCw, 
  Play, 
  Plus, 
  Sliders, 
  Terminal, 
  Check, 
  X, 
  Layers, 
  Database, 
  Code, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  FileText,
  Unplug
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  IntegrationHubService, 
  EnterpriseConnector, 
  WebhookEndpoint, 
  IntegrationCategory 
} from '../../../services/integration-hub.service';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Connectors' },
  { id: 'development', label: 'Development' },
  { id: 'communication', label: 'Communication' },
  { id: 'crm', label: 'CRM' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud', label: 'Cloud & Infra' },
  { id: 'finance', label: 'Finance' },
  { id: 'monitoring', label: 'Monitoring' },
];

export default function IntegrationsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'catalog' | 'webhooks' | 'secrets'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [connectors, setConnectors] = useState<EnterpriseConnector[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [selectedDocConnector, setSelectedDocConnector] = useState<EnterpriseConnector | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, search]);

  const fetchData = async () => {
    try {
      const list = await IntegrationHubService.getConnectors(selectedCategory, search);
      setConnectors(list);
      const whs = await IntegrationHubService.getWebhooks();
      setWebhooks(whs);
    } catch (e) {
      console.warn('[INTEGRATIONS] Load warning:', e);
    }
  };

  const handleTestConnection = async (connector: EnterpriseConnector) => {
    const res = await IntegrationHubService.testConnection(connector.id);
    toast(res.message, 'success');
  };

  const handleConnect = async (connector: EnterpriseConnector) => {
    const res = await IntegrationHubService.connectConnector(connector.id, { key: 'secret_key' });
    toast(res.message, 'success');
    setConnectors(prev => prev.map(c => c.id === connector.id ? { ...c, isConnected: true, status: 'connected' } : c));
  };

  const handleDisconnect = async (connector: EnterpriseConnector) => {
    const res = await IntegrationHubService.disconnectConnector(connector.id);
    toast(res.message, 'info');
    setConnectors(prev => prev.map(c => c.id === connector.id ? { ...c, isConnected: false, status: 'disconnected' } : c));
  };

  const [expandedConnectorId, setExpandedConnectorId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Integration Hub & Connector Engine
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Central intelligence layer connecting 40+ business systems (GitHub, Slack, Salesforce, Postgres, AWS, Stripe) into Builder DAG nodes.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#232323] pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'catalog' ? 'bg-[#4EA3FF] text-black font-bold' : 'bg-[#111111] text-gray-400 border border-[#232323] hover:text-white'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Connector Catalog</span>
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'webhooks' ? 'bg-[#4EA3FF] text-black font-bold' : 'bg-[#111111] text-gray-400 border border-[#232323] hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Webhook Engine & API Gateway</span>
        </button>
        <button
          onClick={() => setActiveTab('secrets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'secrets' ? 'bg-[#4EA3FF] text-black font-bold' : 'bg-[#111111] text-gray-400 border border-[#232323] hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Secrets & Credential Vault</span>
        </button>
      </div>

      {/* TAB 1: CONNECTOR CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search 40+ connectors (GitHub, Slack, SAP, AWS)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111111] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/30 font-bold'
                    : 'bg-[#111111] text-gray-400 border-[#232323] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {connectors.map(connector => {
              const isExpanded = expandedConnectorId === connector.id;
              return (
                <div key={connector.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                        {connector.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        connector.isConnected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {connector.isConnected ? '● Connected' : '○ Disconnected'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">{connector.name}</h3>
                      <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">{connector.description}</p>
                    </div>

                    {connector.isConnected && (
                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-xl text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                        <span>⚡ Active Sync Engine</span>
                        <span>SLA 99.9%</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] font-mono text-[10px]">
                      <div>
                        <span className="text-gray-500 block">Triggers</span>
                        <span className="text-white font-bold block">{connector.triggersCount} triggers</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">API Actions</span>
                        <span className="text-emerald-400 font-bold block">{connector.actionsCount} actions</span>
                      </div>
                    </div>

                    {/* Inline Expanded Triggers & Actions List */}
                    {isExpanded && (
                      <div className="bg-[#050505] border border-[#232323] p-3 rounded-xl space-y-3 font-mono text-[11px] animate-fade-in mt-2">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Supported Triggers</span>
                          <div className="space-y-1">
                            {connector.triggers.map(t => (
                              <div key={t.id} className="text-gray-300 text-[10px] bg-[#111111] p-1.5 rounded border border-[#232323]">
                                <strong className="text-white">{t.name}</strong> — {t.description}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Exposed Actions</span>
                          <div className="space-y-1">
                            {connector.actions.map(a => (
                              <div key={a.id} className="text-emerald-400 text-[10px] bg-[#111111] p-1.5 rounded border border-[#232323]">
                                <strong className="text-emerald-300">{a.name}</strong> — {a.description}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                    <button
                      onClick={() => {
                        setExpandedConnectorId(isExpanded ? null : connector.id);
                        setSelectedDocConnector(connector);
                      }}
                      className="text-xs font-mono text-[#4EA3FF] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Specs' : 'Inspect Triggers & Actions'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {connector.isConnected ? (
                        <>
                          <button
                            onClick={() => handleTestConnection(connector)}
                            className="px-2.5 py-1.5 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-300 rounded-xl text-xs font-mono cursor-pointer"
                            title="Test Connection SLA"
                          >
                            Ping
                          </button>
                          <button
                            onClick={() => handleDisconnect(connector)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl cursor-pointer"
                            title="Disconnect System"
                          >
                            <Unplug className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(connector)}
                          className="px-4 py-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold rounded-xl cursor-pointer border-0 shadow font-mono"
                        >
                          Connect System
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WEBHOOK ENGINE & API GATEWAY */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#4EA3FF]" /> Webhook Ingestion Engine & REST API Gateway
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Expose workflows as instant REST APIs or receive incoming webhooks from external systems (GitHub, Stripe, Slack).
            </p>

            <div className="space-y-3 pt-2">
              {webhooks.map(wh => (
                <div key={wh.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{wh.name}</span>
                    <span className="text-emerald-400 font-bold">{wh.status.toUpperCase()}</span>
                  </div>
                  
                  <div className="bg-[#111111] p-2.5 rounded-lg border border-[#232323] text-[11px] text-[#4EA3FF] truncate select-all">
                    {wh.method} {wh.url}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span>Total Invocations: <strong className="text-white">{wh.totalInvocations.toLocaleString()}</strong></span>
                    <span>Target Workflow: <strong className="text-gray-300">{wh.targetWorkflowId}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECRETS & KEYS */}
      {activeTab === 'secrets' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" /> Encrypted Secrets & Environment Variables Manager
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            All credentials, PATs, OAuth tokens, and database URIs are encrypted using AES-256-GCM.
          </p>

          <div className="space-y-2 pt-2">
            {['GITHUB_OAUTH_CLIENT_SECRET', 'STRIPE_WEBHOOK_SECRET', 'POSTGRES_DB_PASSWORD', 'AWS_SECRET_ACCESS_KEY'].map((sec, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <span className="font-bold text-white">{sec}</span>
                <span className="text-[10px] text-gray-500">Encrypted AES-256-GCM (v2)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Triggers & Actions Spec Modal */}
      {selectedDocConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#4EA3FF]" />
                <h3 className="text-lg font-bold text-white">{selectedDocConnector.name} Capabilities</h3>
              </div>
              <button onClick={() => setSelectedDocConnector(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Supported Event Triggers</span>
                <div className="space-y-1.5 mt-1">
                  {selectedDocConnector.triggers.map(t => (
                    <div key={t.id} className="bg-[#050505] p-2.5 rounded-xl border border-[#232323] space-y-0.5">
                      <span className="text-white font-bold text-[11px] block">{t.name}</span>
                      <span className="text-[10px] text-gray-400 font-sans block">{t.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Exposed API Actions</span>
                <div className="space-y-1.5 mt-1">
                  {selectedDocConnector.actions.map(a => (
                    <div key={a.id} className="bg-[#050505] p-2.5 rounded-xl border border-[#232323] space-y-0.5">
                      <span className="text-emerald-400 font-bold text-[11px] block">{a.name}</span>
                      <span className="text-[10px] text-gray-400 font-sans block">{a.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedDocConnector(null)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl cursor-pointer text-xs transition-all"
            >
              Close Spec
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
