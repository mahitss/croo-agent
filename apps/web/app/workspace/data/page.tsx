'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  Database, 
  Sparkles, 
  Search, 
  Share2, 
  CheckCircle2, 
  FileText, 
  Code, 
  Table, 
  Layers, 
  Terminal, 
  Activity, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  GitBranch,
  X,
  Play,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  DataPlatformService, 
  CatalogDataset, 
  NaturalLanguageQueryResult 
} from '../../../services/data-platform.service';

export default function DataPlatformPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'catalog' | 'copilot' | 'lineage' | 'quality' | 'features'>('catalog');
  const [search, setSearch] = useState('');
  const [datasets, setDatasets] = useState<CatalogDataset[]>([]);
  const [copilotPrompt, setCopilotPrompt] = useState('Which customers and workflows generated the highest revenue in the last 30 days?');
  const [copilotResult, setCopilotResult] = useState<NaturalLanguageQueryResult | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  useEffect(() => {
    fetchCatalogData();
  }, [search]);

  const fetchCatalogData = async () => {
    try {
      const list = await DataPlatformService.getDatasets(search);
      setDatasets(list);
    } catch (e) {
      console.warn('[DATA] Catalog fetch warning:', e);
    }
  };

  const handleRunCopilotQuery = async () => {
    if (!copilotPrompt.trim()) return;
    setIsQuerying(true);
    try {
      const res = await DataPlatformService.queryDataCopilot(copilotPrompt);
      setCopilotResult(res);
      toast('AI Data Copilot query executed successfully!', 'success');
    } catch (e) {
      toast('Copilot query error.', 'error');
    } finally {
      setIsQuerying(false);
    }
  };

  const lineageData = DataPlatformService.getDataLineage();

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Data Intelligence & Analytics Platform
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Central data layer indexing PostgreSQL, Snowflake, BigQuery, and S3 datasets with Natural Language AI Data Copilot and Data Lineage.
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search datasets, tables, and schemas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'catalog', label: 'Data Catalog & Datasets', icon: Database },
          { id: 'copilot', label: 'Natural Language AI Data Copilot', icon: Sparkles },
          { id: 'lineage', label: 'End-to-End Data Lineage', icon: GitBranch },
          { id: 'quality', label: 'Data Quality & Drift', icon: ShieldCheck },
          { id: 'features', label: 'Feature Store Registry', icon: Layers },
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

      {/* TAB 1: DATA CATALOG */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs">
          {datasets.map(ds => (
            <div key={ds.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                    {ds.sourceType}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    Quality: {ds.qualityScorePercent}%
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{ds.name}</h3>
                  <span className="text-[10px] text-gray-500">Sensitivity: <strong className="text-purple-300 uppercase">{ds.sensitivityLevel}</strong></span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px]">
                  <div>
                    <span className="text-gray-500 block">Tables</span>
                    <span className="text-white font-bold block">{ds.tableCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Total Rows</span>
                    <span className="text-amber-300 font-bold block">{(ds.totalRows / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Size</span>
                    <span className="text-emerald-400 font-bold block">{ds.sizeGb} GB</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#232323] text-[10px] text-gray-500">
                <span>Owner: <strong className="text-gray-300">{ds.owner}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: NATURAL LANGUAGE AI DATA COPILOT */}
      {activeTab === 'copilot' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Natural Language to SQL AI Data Copilot
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Ask natural language business questions across PostgreSQL, Snowflake, and BigQuery datasets to generate instant SQL queries and dashboards.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask any data query in plain English..."
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunCopilotQuery()}
                className="flex-1 bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-3 text-white outline-none font-sans text-sm"
              />
              <button
                onClick={handleRunCopilotQuery}
                disabled={isQuerying}
                className="px-5 py-3 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold rounded-xl cursor-pointer text-xs border-0 font-mono"
              >
                {isQuerying ? 'Analyzing...' : 'Run Query'}
              </button>
            </div>
          </div>

          {copilotResult && (
            <div className="space-y-6">
              {/* Generated SQL Code Box */}
              <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Auto-Generated SQL Query</span>
                <pre className="bg-[#050505] border border-[#232323] p-4 rounded-xl text-amber-300 text-xs overflow-x-auto leading-relaxed">
{copilotResult.generatedSql}
                </pre>
              </div>

              {/* AI Insight & Result Table */}
              <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-4">
                <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 text-xs font-sans">
                  <strong>AI Executive Insight:</strong> {copilotResult.aiInsight}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#232323] text-gray-500 uppercase text-[10px]">
                        {copilotResult.dataColumns.map((col, idx) => (
                          <th key={idx} className="py-2 px-3 font-bold">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#232323]">
                      {copilotResult.dataRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/5 text-gray-200">
                          {copilotResult.dataColumns.map((col, cIdx) => (
                            <td key={cIdx} className="py-2.5 px-3">{String(row[col])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DATA LINEAGE VISUALIZER */}
      {activeTab === 'lineage' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#232323]">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-400" /> End-to-End Data Lineage & DAG Tracing
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 font-sans">
                Traces data origin from Source DB -&gt; CDC Ingestion -&gt; RAG Vector Store -&gt; Agent Execution.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {lineageData.edges.map(e => (
              <div key={e.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex items-center justify-between">
                <span className="text-white font-bold">{e.source}</span>
                <span className="text-[#4EA3FF] text-[10px] font-bold">-[ {e.transformation} ]-&gt;</span>
                <span className="text-purple-300 font-bold">{e.target}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DATA QUALITY & DRIFT */}
      {activeTab === 'quality' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Data Quality & Schema Drift Inspector
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { check: 'PostgreSQL Wallet Ledger Freshness', status: 'Passed (0.4s lag)', score: '100%' },
              { check: 'Snowflake DW Schema Drift Detection', status: 'Passed (0 breaking diffs)', score: '99.8%' },
              { check: 'Null Value & Duplicate Checker', status: 'Passed (0.01% anomaly rate)', score: '99.9%' }
            ].map((c, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <span className="font-bold text-white">{c.check}</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FEATURE STORE REGISTRY */}
      {activeTab === 'features' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Machine Learning Feature Store Registry
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { name: 'user_30d_transaction_sum', type: 'Offline Feature', entity: 'User', dataType: 'FLOAT64' },
              { name: 'agent_sast_vulnerability_count', type: 'Online Feature', entity: 'Agent', dataType: 'INT64' }
            ].map((f, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{f.name}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">Entity: {f.entity} | Type: {f.dataType}</span>
                </div>
                <span className="text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                  {f.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
