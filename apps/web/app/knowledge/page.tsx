'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Database, 
  Brain, 
  Search, 
  FileText, 
  Network, 
  Sliders, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Folder, 
  Tag, 
  CheckCircle2, 
  RefreshCw, 
  Share2, 
  Zap, 
  Cpu, 
  HardDrive, 
  Layers, 
  BookOpen, 
  Code, 
  Server,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  KnowledgeMemoryService, 
  KnowledgeBase, 
  MemoryRecord, 
  RAGSearchResult, 
  VectorProvider, 
  MemoryLayerType 
} from '../../services/knowledge-memory.service';

export default function KnowledgePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'kbs' | 'memory' | 'search' | 'graph' | 'vector'>('kbs');
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [memoryRecords, setMemoryRecords] = useState<MemoryRecord[]>([]);
  const [selectedMemoryLayer, setSelectedMemoryLayer] = useState<MemoryLayerType>('workspace');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RAGSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVectorProvider, setSelectedVectorProvider] = useState<VectorProvider>('pgvector');
  const [createKbModalOpen, setCreateKbModalOpen] = useState(false);
  const [newKbName, setNewKbName] = useState('');
  const [newKbDesc, setNewKbDesc] = useState('');

  useEffect(() => {
    fetchKnowledgeData();
  }, []);

  const fetchKnowledgeData = async () => {
    try {
      const kbs = await KnowledgeMemoryService.getKnowledgeBases();
      setKnowledgeBases(kbs);
      const mems = await KnowledgeMemoryService.getMemoryRecords(selectedMemoryLayer);
      setMemoryRecords(mems);
      setSelectedVectorProvider(KnowledgeMemoryService.getVectorProvider());
    } catch (e) {
      console.warn('[KNOWLEDGE] Load warning:', e);
    }
  };

  const handleSearchRAG = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await KnowledgeMemoryService.searchRAG(searchQuery);
      setSearchResults(results);
    } catch (e) {
      toast('RAG Search failed.', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateKb = async () => {
    if (!newKbName.trim()) return;
    const created = await KnowledgeMemoryService.createKnowledgeBase({
      name: newKbName,
      description: newKbDesc
    });
    toast(`Knowledge Base "${created.name}" created.`, 'success');
    setKnowledgeBases(prev => [created, ...prev]);
    setCreateKbModalOpen(false);
    setNewKbName('');
    setNewKbDesc('');
  };

  const handleVectorProviderChange = (provider: VectorProvider) => {
    KnowledgeMemoryService.setVectorProvider(provider);
    setSelectedVectorProvider(provider);
    toast(`Switched runtime vector database to ${provider.toUpperCase()}`, 'info');
  };

  const graphData = KnowledgeMemoryService.getKnowledgeGraph();

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Memory & Knowledge Architecture
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Hybrid RAG pipeline, 8-layer persistent memory, knowledge graph explorer, and runtime vector database provider switching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateKbModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold cursor-pointer border-0 shadow"
          >
            <Plus className="w-4 h-4" /> New Knowledge Base
          </button>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'kbs', label: 'Knowledge Bases', icon: Database },
          { id: 'memory', label: 'Memory Layers', icon: Brain },
          { id: 'search', label: 'Hybrid RAG Search', icon: Search },
          { id: 'vector', label: 'Vector Engine Switcher', icon: HardDrive },
          { id: 'graph', label: 'Knowledge Graph', icon: Network },
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

      {/* TAB 1: KNOWLEDGE BASES */}
      {activeTab === 'kbs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {knowledgeBases.map((kb) => (
            <div key={kb.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                    {kb.vectorProvider}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">{kb.documentsCount} Docs</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{kb.name}</h3>
                  <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">{kb.description}</p>
                </div>

                <div className="flex items-center gap-1 flex-wrap font-mono text-[9px]">
                  {kb.tags.map((t, i) => (
                    <span key={i} className="bg-[#050505] text-gray-400 border border-[#232323] px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Documents List */}
                <div className="space-y-1.5 pt-2 border-t border-[#232323]">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">Attached Document Sources</span>
                  {kb.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between bg-[#050505] p-2 rounded-lg border border-[#232323] text-[10px] font-mono">
                      <span className="text-gray-300 truncate max-w-[180px]">{doc.name}</span>
                      <span className="text-emerald-400 font-bold">{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-3 border-t border-[#232323]">
                <span>Total Tokens: <strong>{(kb.totalTokens / 1000).toFixed(0)}k</strong></span>
                <span>Owner: <strong className="text-gray-300">{kb.owner}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MEMORY LAYERS */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          {/* Layer Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            {(['global', 'workspace', 'workflow', 'agent', 'conversation', 'user', 'session', 'long_term'] as const).map(layer => (
              <button
                key={layer}
                onClick={() => {
                  setSelectedMemoryLayer(layer);
                  KnowledgeMemoryService.getMemoryRecords(layer).then(setMemoryRecords);
                }}
                className={`px-3 py-1.5 rounded-xl border capitalize cursor-pointer transition-all ${
                  selectedMemoryLayer === layer
                    ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/30 font-bold'
                    : 'bg-[#111111] text-gray-400 border-[#232323] hover:text-white'
                }`}
              >
                {layer.replace('_', ' ')} Layer
              </button>
            ))}
          </div>

          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
              Memory Store Entries ({selectedMemoryLayer.toUpperCase()})
            </span>

            {memoryRecords.map(mem => (
              <div key={mem.id} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{mem.key}</span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                      Entity: {mem.entityId}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Importance: {mem.importanceScore}/100</span>
                </div>

                <p className="text-xs text-gray-300 font-sans">{mem.summary || 'Structured memory payload recorded.'}</p>

                <pre className="bg-[#050505] border border-[#232323] p-3 rounded-xl text-amber-300 text-[10px] overflow-x-auto">
{JSON.stringify(mem.value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HYBRID RAG SEARCH */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="relative max-w-2xl w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Query enterprise documents, legal compliance, code SAST, and RAG knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchRAG()}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-2xl pl-12 pr-28 py-3.5 text-sm text-white outline-none font-sans shadow-lg"
            />
            <button
              onClick={handleSearchRAG}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer border-0 font-mono"
            >
              {isSearching ? 'RAG Searching...' : 'RAG Search'}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                Hybrid RAG Query Results ({selectedVectorProvider.toUpperCase()})
              </span>

              {searchResults.map(res => (
                <div key={res.id} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#4EA3FF]" />
                      <span className="font-bold text-white">{res.documentName}</span>
                      <span className="text-[10px] text-gray-500">({res.kbName})</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                      {res.confidenceScore}% Match Confidence
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed bg-[#050505] p-3 rounded-xl border border-[#232323]">
                    {res.contentSnippet}
                  </p>

                  <div className="text-[10px] text-purple-300 font-mono">
                    Citation: <strong>{res.citation}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VECTOR ENGINE SWITCHER */}
      {activeTab === 'vector' && (
        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-[#4EA3FF]" /> Runtime Vector Database Provider Switcher
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Select the active vector database engine for RAG embedding storage, ANN index lookup, and hybrid similarity search.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
              {(['pgvector', 'pinecone', 'qdrant', 'weaviate', 'milvus', 'chroma'] as VectorProvider[]).map(provider => {
                const isSelected = selectedVectorProvider === provider;
                return (
                  <div
                    key={provider}
                    onClick={() => handleVectorProviderChange(provider)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-[#4EA3FF]/10 border-[#4EA3FF] shadow-lg'
                        : 'bg-[#050505] border-[#232323] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white uppercase">{provider}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#4EA3FF]" />}
                    </div>
                    <span className="text-[10px] text-gray-500 block">
                      {provider === 'pgvector' ? 'PostgreSQL Native Vector' : `${provider.toUpperCase()} Enterprise Cluster`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KNOWLEDGE GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" /> Enterprise Knowledge & Entity Graph
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Automatically maps semantic relationships between Organizations, Users, Workflows, Agents, Documents, and Executions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Graph Entity Nodes ({graphData.nodes.length})</span>
              <div className="space-y-1.5">
                {graphData.nodes.map(n => (
                  <div key={n.id} className="bg-[#050505] border border-[#232323] p-3 rounded-xl flex items-center justify-between">
                    <span className="text-white font-bold">{n.label}</span>
                    <span className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/10">{n.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Semantic Relationships ({graphData.edges.length})</span>
              <div className="space-y-1.5">
                {graphData.edges.map(e => (
                  <div key={e.id} className="bg-[#050505] border border-[#232323] p-3 rounded-xl flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">{e.source}</span>
                    <span className="text-purple-400 font-bold text-[10px]">-[ {e.relationship} ]-&gt;</span>
                    <span className="text-gray-400">{e.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Knowledge Base */}
      {createKbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#232323]">
              <h3 className="text-sm font-bold text-white font-mono">Create RAG Knowledge Base</h3>
              <button onClick={() => setCreateKbModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase block">Knowledge Base Name</label>
                <input
                  type="text"
                  placeholder="e.g. EU Legal & Regulatory Compliance Base"
                  value={newKbName}
                  onChange={(e) => setNewKbName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-lg px-3 py-2 text-white outline-none mt-1 font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase block">Description</label>
                <textarea
                  placeholder="Describe knowledge contents and RAG context rules..."
                  value={newKbDesc}
                  onChange={(e) => setNewKbDesc(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-lg px-3 py-2 text-white outline-none mt-1 font-sans h-20 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleCreateKb}
              className="w-full py-2.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold rounded-xl cursor-pointer text-xs transition-all border-0"
            >
              Initialize Knowledge Base
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
