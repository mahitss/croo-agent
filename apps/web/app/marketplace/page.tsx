'use client';

import { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Cpu, 
  Layers, 
  Download, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Code
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';
import { useNexusStore } from '../../store/nexusStore';

export default function MarketplacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedDocAgent, setSelectedDocAgent] = useState<any | null>(null);

  const agents = [
    { id: '1', name: 'Web Research Swarm', category: 'Research', tag: 'Featured', price: '0.05 USDC', rating: 4.9, hires: 1240, latency: '380ms', version: 'v2.1.0', creator: 'Orbit Core', verified: true, desc: 'Aggregates multiple search engines and verifies claims with citations.', docs: 'Input: { query: string }. Returns citations JSON array with domain trust scores.' },
    { id: '2', name: 'Sales Lead Finder', category: 'Sales', tag: 'Trending', price: '0.10 USDC', rating: 4.8, hires: 890, latency: '420ms', version: 'v1.4.2', creator: 'Outreach Lab', verified: true, desc: 'Scrapes targeted company profiles, extracts decision maker contacts, and scores leads.', docs: 'Input: { domain: string, icp: string }. Returns enriched contact cards with fit score.' },
    { id: '3', name: 'Compliance Brief Parser', category: 'Legal', tag: 'Enterprise', price: '0.15 USDC', rating: 5.0, hires: 420, latency: '510ms', version: 'v3.0.1', creator: 'Legal AI Inc', verified: true, desc: 'Parses contracts, identifies liability markers, and verifies terms against EU GDPR rules.', docs: 'Input: { documentUrl: string }. Flags uncapped liabilities and breach indemnities.' },
    { id: '4', name: 'Portfolio Risk Analyzer', category: 'Finance', tag: 'Verified', price: '0.08 USDC', rating: 4.7, hires: 670, latency: '290ms', version: 'v2.0.0', creator: 'FinTech Swarm', verified: true, desc: 'Computes Sharpe ratio, drawdown risk, and variance metrics for web3 portfolios.', docs: 'Input: { walletAddress: string }. Computes Sharpe ratio and 30-day VAR bounds.' },
    { id: '5', name: 'Multi-Channel Copy Scribe', category: 'Marketing', tag: 'Community', price: '0.04 USDC', rating: 4.9, hires: 1530, latency: '310ms', version: 'v1.2.0', creator: 'CopyCraft', verified: false, desc: 'Generates ad variants, social media posts, and landing page headlines.', docs: 'Input: { topic: string, brandVoice: string }. Output: 5 social post variants.' },
    { id: '6', name: 'Clinical EHR Mapper', category: 'Healthcare', tag: 'Open Source', price: '0.20 USDC', rating: 4.9, hires: 310, latency: '600ms', version: 'v1.0.4', creator: 'HealthOpen', verified: true, desc: 'Converts unstructured clinical notes to standardized FHIR data structures.', docs: 'Input: { rawClinicalNote: string }. Outputs ICD-10 diagnostic codes & FHIR JSON.' },
  ];

  const filterTags = ['All', 'Featured', 'Trending', 'Verified', 'Enterprise', 'Community', 'Open Source'];

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || a.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const [selectedAgentForHire, setSelectedAgentForHire] = useState<any | null>(null);
  const [selectedTargetWorkflow, setSelectedTargetWorkflow] = useState<string>('new');
  const [customTaskName, setCustomTaskName] = useState<string>('');

  const handleOpenHireModal = (agent: any) => {
    setSelectedAgentForHire(agent);
    setCustomTaskName(agent.name);
  };

  const handleConfirmHire = () => {
    if (!selectedAgentForHire) return;

    if (selectedTargetWorkflow === 'new') {
      const newWfId = `wf-marketplace-${selectedAgentForHire.id}-${Date.now()}`;
      const newWf = {
        id: newWfId,
        name: `${customTaskName || selectedAgentForHire.name} Swarm`,
        query: `Executed via Marketplace Node: ${selectedAgentForHire.name}`,
        budget: 1.50,
        routingMode: 'balanced' as const,
        retryCount: 0,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        nodes: [
          {
            id: `n-${Date.now()}`,
            name: customTaskName || selectedAgentForHire.name,
            task: selectedAgentForHire.name,
            description: selectedAgentForHire.desc,
            capability: selectedAgentForHire.category.toLowerCase(),
            costEstimate: 0.10,
            timeEstimate: 450,
            trustScore: 98,
            status: 'pending' as const,
            positionX: 100,
            positionY: 200
          }
        ],
        edges: []
      };
      useNexusStore.setState({ activeWorkflow: newWf, appState: 'draft' });
      toast(`Created new workspace with node "${selectedAgentForHire.name}".`, 'success');
      router.push(`/workspace/${newWfId}`);
    } else {
      const currentActive = useNexusStore.getState().activeWorkflow;
      if (currentActive) {
        const newNodeId = `n-${Date.now()}`;
        const newNode = {
          id: newNodeId,
          name: customTaskName || selectedAgentForHire.name,
          task: selectedAgentForHire.name,
          description: selectedAgentForHire.desc,
          capability: selectedAgentForHire.category.toLowerCase(),
          costEstimate: 0.10,
          timeEstimate: 450,
          trustScore: 98,
          status: 'pending' as const,
          positionX: (currentActive.nodes.length + 1) * 180,
          positionY: 200
        };
        const updatedNodes = [...currentActive.nodes, newNode];
        const lastNode = currentActive.nodes[currentActive.nodes.length - 1];
        const updatedEdges = lastNode ? [...currentActive.edges, { id: `e-${Date.now()}`, source: lastNode.id, target: newNodeId }] : currentActive.edges;
        useNexusStore.setState({
          activeWorkflow: { ...currentActive, nodes: updatedNodes, edges: updatedEdges }
        });
        toast(`Inserted node "${selectedAgentForHire.name}" into active workflow canvas.`, 'success');
        router.push(`/workspace/${currentActive.id}`);
      } else {
        router.push(`/workspace/${selectedTargetWorkflow}`);
      }
    }
    setSelectedAgentForHire(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 select-none animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Enterprise Agent Node Registry</span>
            <Sparkles className="w-5 h-5 text-[#4EA3FF]" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Verified autonomous AI worker node catalog with SLA ratings, latency benchmarks, and instant canvas installation.
          </p>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search node capabilities & creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#232323]">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              selectedTag === tag
                ? 'bg-[#4EA3FF] text-black border-[#4EA3FF]'
                : 'bg-[#111111] text-gray-400 border-[#232323] hover:border-white/10 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-5 transition-all duration-300 group"
          >
            <div className="flex flex-col gap-3">
              {/* Badges Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#4EA3FF] border border-white/5">
                    {agent.category}
                  </span>
                  {agent.verified && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-gray-500">{agent.version}</span>
              </div>

              {/* Node Title & Creator */}
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                  {agent.name}
                </h3>
                <span className="text-[10px] text-gray-500 font-mono">by {agent.creator}</span>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {agent.desc}
              </p>

              {/* Benchmarks Bar */}
              <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px] font-mono">
                <div className="flex flex-col">
                  <span className="text-gray-500">Rating</span>
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-current" /> {agent.rating}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Downloads</span>
                  <span className="text-gray-300 font-bold flex items-center gap-0.5">
                    <Download className="w-3 h-3 text-gray-400" /> {agent.hires}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Avg Latency</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-emerald-400" /> {agent.latency}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-mono">Execution Fee</span>
                <span className="text-xs font-bold font-mono text-white">{agent.price}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDocAgent(agent)}
                  className="p-2 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                  title="View Specs & Docs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenHireModal(agent)}
                  className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer border-0 shadow"
                >
                  <span>Install Node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Node Installation Modal */}
      {selectedAgentForHire && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-[#232323] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#4EA3FF] font-bold uppercase">{selectedAgentForHire.category} Node</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedAgentForHire.name}</h3>
              </div>
              <button onClick={() => setSelectedAgentForHire(null)} className="text-gray-400 hover:text-white bg-transparent border-0 text-base cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <p className="leading-relaxed text-gray-400">{selectedAgentForHire.desc}</p>
              
              <div className="space-y-2">
                <label className="font-semibold text-white">Configured Task Label</label>
                <input
                  type="text"
                  value={customTaskName}
                  onChange={(e) => setCustomTaskName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-white">Destination Target Workspace</label>
                <select
                  value={selectedTargetWorkflow}
                  onChange={(e) => setSelectedTargetWorkflow(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="new">Create New Swarm Canvas</option>
                  <option value="research-agent">Research Consensus Agent Swarm</option>
                  <option value="sales-outreach">Sales Lead Outreach Swarm</option>
                  <option value="compliance-audit">Legal Compliance Audit Swarm</option>
                </select>
              </div>

              <div className="p-3 bg-[#050505] rounded-xl border border-[#232323] space-y-1 font-mono text-[10px]">
                <div className="flex justify-between text-gray-400"><span>Execution Fee:</span> <span className="text-white font-bold">{selectedAgentForHire.price}</span></div>
                <div className="flex justify-between text-gray-400"><span>SLA Benchmark:</span> <span className="text-emerald-400 font-bold">{selectedAgentForHire.latency} Latency</span></div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#232323] pt-4">
              <button
                onClick={() => setSelectedAgentForHire(null)}
                className="px-4 py-2 bg-transparent text-gray-400 hover:text-white text-xs font-semibold rounded-xl border border-[#232323] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHire}
                className="px-4 py-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-bold rounded-xl border-0 cursor-pointer"
              >
                Insert Node into Canvas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Node Documentation Modal */}
      {selectedDocAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-[#232323] pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Technical Specs & Documentation</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedDocAgent.name} ({selectedDocAgent.version})</h3>
              </div>
              <button onClick={() => setSelectedDocAgent(null)} className="text-gray-400 hover:text-white bg-transparent border-0 text-base cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#050505] rounded-xl border border-[#232323] font-mono text-[11px] text-gray-300 space-y-2">
                <div className="text-gray-500 font-bold uppercase text-[10px]">JSON Interface Spec</div>
                <div className="text-[#4EA3FF]">{selectedDocAgent.docs}</div>
              </div>

              <div className="space-y-1 text-gray-400 text-[11px]">
                <div>• Created by <span className="text-white font-semibold">{selectedDocAgent.creator}</span></div>
                <div>• Verified SLA Rating: <span className="text-amber-400 font-bold">★ {selectedDocAgent.rating}</span></div>
                <div>• Microservice SLA Latency: <span className="text-emerald-400 font-mono">{selectedDocAgent.latency}</span></div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#232323] pt-4">
              <button
                onClick={() => setSelectedDocAgent(null)}
                className="px-4 py-2 bg-[#111111] hover:bg-white/5 border border-[#232323] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Close Docs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
