'use client';

import { useState, useEffect } from 'react';
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
import { apiClient } from '../../lib/api-client';

export default function MarketplacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedDocAgent, setSelectedDocAgent] = useState<any | null>(null);

  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await apiClient.get<any>('/api/v1/agents');
        const list = res && Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        setAgents(list);
      } catch (e) {
        console.warn('[MARKETPLACE] Failed to fetch agents:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filterTags = ['All', 'Featured', 'Trending', 'Verified', 'Enterprise', 'Community', 'Open Source'];

  const filteredAgents = agents.filter(a => {
    const nameStr = a.name || a.title || '';
    const descStr = a.desc || a.description || '';
    const tagStr = a.tag || a.category || 'All';
    const matchesSearch = nameStr.toLowerCase().includes(search.toLowerCase()) || descStr.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || tagStr === selectedTag;
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

      {/* Agents Grid */}
      {filteredAgents.length > 0 ? (
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
                      {agent.category || agent.tag || 'AGENT'}
                    </span>
                    {(agent.verified ?? true) && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{agent.version || 'v1.0.0'}</span>
                </div>

                {/* Node Title & Creator */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                    {agent.name || agent.title}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">by {agent.creator || agent.author || 'Orbit Community'}</span>
                </div>

                <p className="text-xs text-[#9CA3AF] leading-relaxed truncate">
                  {agent.desc || agent.description || 'Autonomous AI capability node.'}
                </p>

                {/* Benchmarks Bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px] font-mono">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Rating</span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" /> {agent.rating || 4.9}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Deployments</span>
                    <span className="text-white font-bold">{agent.hires || agent.executions || 120}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Latency</span>
                    <span className="text-emerald-400 font-bold">{agent.latency || '320ms'}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                <span className="text-xs font-mono font-bold text-white">
                  {agent.price ? (typeof agent.price === 'number' ? `${agent.price} USDC` : agent.price) : '0.05 USDC'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDocAgent(agent)}
                    className="p-2 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedAgentForHire(agent)}
                    className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer border-0"
                  >
                    <span>Install Node</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#111111] border border-[#232323] rounded-2xl space-y-2 font-mono text-xs text-gray-500">
          <div className="text-white font-bold text-sm font-sans">No Agent Capabilities Found</div>
          <div>No agents matching tag filter &quot;{selectedTag}&quot; or search &quot;{search}&quot;. Register your custom capability to publish to Orbit Marketplace.</div>
        </div>
      )}

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
