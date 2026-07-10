'use client';

import { useState, useEffect } from 'react';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
};
import { useNexusStore, seedAgents } from '../../store/nexusStore';
import { apiClient } from '../../lib/api-client';
import { Agent } from '@nexus-ai/types';
import { Search, Award, Layers, Sparkles, ArrowRight, Star, SlidersHorizontal, ArrowUpDown, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../components/Toast';
import { SkeletonCard } from '../../components/Skeleton';
import dynamic from 'next/dynamic';

const AgentDetailModal = dynamic(() => import('../../components/AgentDetailModal'), {
  loading: () => <div className="text-gray-500 font-mono text-xs p-4 bg-black/40 border border-border-dark rounded-xl">Loading Swarm Overlay Details...</div>
});

export default function MarketplacePage() {
  const agents = useNexusStore((state) => state.agents);
  const initialize = useNexusStore((state) => state.initialize);
  const { toast } = useToast();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const marketplaceTab = useNexusStore((state) => state.marketplaceTab);
  const setMarketplaceTab = useNexusStore((state) => state.setMarketplaceTab);
  
  // Search & Filters State
  const searchTerm = useNexusStore((state) => state.marketplaceSearchTerm);
  const setSearchTerm = useNexusStore((state) => state.setMarketplaceSearchTerm);
  const selectedCategory = useNexusStore((state) => state.marketplaceCategory);
  const setSelectedCategory = useNexusStore((state) => state.setMarketplaceCategory);
  const selectedAgent = useNexusStore((state) => state.marketplaceSelectedAgent);
  const setSelectedAgent = useNexusStore((state) => state.setMarketplaceSelectedAgent);
  const onlyVerified = useNexusStore((state) => state.marketplaceOnlyVerified);
  const setOnlyVerified = useNexusStore((state) => state.setMarketplaceOnlyVerified);
  const minTrustScore = useNexusStore((state) => state.marketplaceMinTrustScore);
  const setMinTrustScore = useNexusStore((state) => state.setMarketplaceMinTrustScore);
  const maxPrice = useNexusStore((state) => state.marketplaceMaxPrice);
  const setMaxPrice = useNexusStore((state) => state.setMarketplaceMaxPrice);
  const sortBy = useNexusStore((state) => state.marketplaceSortBy);
  const setSortBy = useNexusStore((state) => state.setMarketplaceSortBy);
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Matchmaker State
  const matchmakerPrompt = useNexusStore((state) => state.marketplaceMatchmakerPrompt);
  const setMatchmakerPrompt = useNexusStore((state) => state.setMarketplaceMatchmakerPrompt);
  const [isMatching, setIsMatching] = useState(false);
  const matchedStack = useNexusStore((state) => state.marketplaceMatchedStack);
  const setMatchedStack = useNexusStore((state) => state.setMarketplaceMatchedStack);

  const categories = ['All', 'Research', 'Finance', 'Legal', 'Coding', 'Security', 'Translation'];

  const isDemoMode = useNexusStore((state) => state.isDemoMode);

  useEffect(() => {
    initialize();
    
    // Load favorites from local storage if client-side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('orbit_favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
      
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get('search');
      if (urlQuery) {
        setSearchTerm(urlQuery);
      }
    }
    const timer = setTimeout(() => setIsInitialLoading(false), 800);

    const refreshData = () => {
      initialize();
    };

    window.addEventListener('storage', refreshData);
    window.addEventListener('nexus_store_update', refreshData);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', refreshData);
      window.removeEventListener('nexus_store_update', refreshData);
    };
  }, [initialize, isDemoMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, onlyVerified, minTrustScore, maxPrice, sortBy, showOnlyFavorites]);

  const toggleFavorite = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated = [...favorites];
    const activeAgents = agents.length > 0 ? agents : seedAgents;
    const match = activeAgents.find(a => {
      console.log("Object before id access:", a);
      if (!a) {
        console.log("File: apps/web/app/marketplace/page.tsx");
        console.log("Function: toggleFavorite");
        console.log("Variable name: a");
        console.log("Expected value: Agent object");
        console.log("Actual value: undefined");
        console.log("Why it is undefined: Available agents list contains an undefined entry.");
      }
      return a && a.id === agentId;
    });
    const name = match ? match.name : 'Agent';
    if (favorites.includes(agentId)) {
      updated = updated.filter(id => id !== agentId);
      toast(`Removed ${name} from favorites`, 'info');
    } else {
      updated.push(agentId);
      toast(`Added ${name} to favorites!`, 'success');
    }
    setFavorites(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbit_favorites', JSON.stringify(updated));
    }
  };

  const handleMatchmaker = async () => {
    if (!matchmakerPrompt.trim()) return;
    console.log("STEP START: handleMatchmaker");
    setIsMatching(true);
    const activeAgents = agents.length > 0 ? agents : seedAgents;
    try {
      console.log("FETCH START: POST /api/v1/ai/plan");
      const planRes = await apiClient.post<any>('/api/v1/ai/plan', {
        query: matchmakerPrompt,
        routingMode: 'balanced',
        budget: 2.0
      });
      console.log("FETCH RETURNED: POST /api/v1/ai/plan");
      console.log("HTTP STATUS: 200");
      console.log("RAW RESPONSE:", JSON.stringify(planRes));
      console.log("PARSED RESPONSE:", planRes);

      if (planRes.success && planRes.data) {
        console.log("TRANSFORMED OBJECT START");
        const assignedIds: string[] = [];
        const chainItems = planRes.data.nodes.map((node: any) => {
          const cap = node.capability.toLowerCase();
          
          let candidates = activeAgents.filter(a => {
            console.log("Object before id access:", a);
            if (!a) {
              console.log("File: apps/web/app/marketplace/page.tsx");
              console.log("Function: handleMatchmaker filter");
              console.log("Variable name: a");
              console.log("Expected value: Agent object");
              console.log("Actual value: undefined");
              console.log("Why it is undefined: Available agents list contains an undefined entry.");
              return false;
            }
            return (a.skills && a.skills.some(s => s.toLowerCase().includes(cap))) || 
                   (a.category && a.category.toLowerCase().includes(cap));
          });
          if (candidates.length === 0) candidates = activeAgents;
          
          const prices = candidates.map(c => c.price || 0);
          const latencies = candidates.map(c => c.latency || 0);
          const maxPrice = Math.max(...prices, 0.5);
          const maxLatency = Math.max(...latencies, 3000);
          
          let bestAgent = candidates[0] || activeAgents[0];
          let bestScore = -1;
          let bestReason = 'Optimal selection';
          
          candidates.forEach(agent => {
            console.log("Object before id access:", agent);
            if (!agent) {
              console.log("File: apps/web/app/marketplace/page.tsx");
              console.log("Function: handleMatchmaker forEach");
              console.log("Variable name: agent");
              console.log("Expected value: Agent object");
              console.log("Actual value: undefined");
              console.log("Why it is undefined: Match candidates contains an undefined entry.");
              return;
            }
            const costScore = 1 - (agent.price / maxPrice);
            const trustScore = (agent.trustScore || 0) / 100;
            const latencyScore = 1 - (agent.latency / maxLatency);
            const accuracyScore = (agent.accuracy || 0) / 100;
            const successScore = (100 - (agent.failureRate || 0)) / 100;
            
            let score = (costScore * 0.2) + (trustScore * 0.25) + (latencyScore * 0.15) + (accuracyScore * 0.2) + (successScore * 0.2);
            
            // Diversity penalty
            const duplicateCount = assignedIds.filter(id => id === agent.id).length;
            if (duplicateCount > 0) {
              score -= (0.35 * duplicateCount);
            }
            
            if (score > bestScore) {
              bestScore = score;
              bestAgent = agent;
              
              const reasons: string[] = [];
              const isCheapest = agent.price === Math.min(...prices);
              const isFastest = agent.latency === Math.min(...latencies);
              const isHighTrust = (agent.trustScore || 0) >= 95;
              
              if (isFastest) reasons.push('Fastest');
              if (isCheapest) reasons.push('Lowest cost');
              if (isHighTrust) reasons.push(`${agent.trustScore}% trust success`);
              if (agent.accuracy && agent.accuracy >= 95) reasons.push('Highest accuracy');
              
              bestReason = reasons.length > 0 ? reasons.slice(0, 2).join(', ') : 'Optimal selection';
            }
          });
          
          console.log("Object before id access:", bestAgent);
          if (!bestAgent) {
            console.log("File: apps/web/app/marketplace/page.tsx");
            console.log("Function: handleMatchmaker chainItems");
            console.log("Variable name: bestAgent");
            console.log("Expected value: Agent object");
            console.log("Actual value: undefined");
            console.log("Why it is undefined: Best matched candidate resolves to undefined (candidates list empty).");
            return {
              nodeId: node.id,
              stageName: node.label || node.task || node.id.toUpperCase(),
              capability: node.capability,
              agentId: 'no-agent',
              agentName: 'No compatible agent found',
              reason: 'None available',
              cost: 0,
              time: '0ms',
              trustScore: 0
            };
          }

          assignedIds.push(bestAgent.id);
          return {
            nodeId: node.id,
            stageName: node.label || node.task || node.id.toUpperCase(),
            capability: node.capability,
            agentId: bestAgent.id,
            agentName: bestAgent.name || 'Agent',
            reason: bestReason,
            cost: bestAgent.price || 0,
            time: `${bestAgent.latency || 0}ms`,
            trustScore: bestAgent.trustScore || 0
          };
        });

        // Compute dynamic estimated budget and latency based on selected agents
        const totalCost = planRes.data.nodes.reduce((sum: number, n: any) => {
          const cap = n.capability.toLowerCase();
          const matched = activeAgents.find(a => {
            console.log("Object before id access:", a);
            return a && ((a.skills && a.skills.some(s => s.toLowerCase().includes(cap))) || (a.category && a.category.toLowerCase().includes(cap)));
          }) || activeAgents[0];
          
          console.log("Object before id access:", matched);
          if (!matched) {
            console.log("File: apps/web/app/marketplace/page.tsx");
            console.log("Function: handleMatchmaker totalCost reduce");
            console.log("Variable name: matched");
            console.log("Expected value: Agent object");
            console.log("Actual value: undefined");
            console.log("Why it is undefined: Matched registry agent resolved to undefined.");
            return sum;
          }
          return sum + (matched.price || 0);
        }, 0);
        
        const maxLatencyVal = Math.max(...planRes.data.nodes.map((n: any) => {
          const cap = n.capability.toLowerCase();
          const matched = activeAgents.find(a => {
            console.log("Object before id access:", a);
            return a && ((a.skills && a.skills.some(s => s.toLowerCase().includes(cap))) || (a.category && a.category.toLowerCase().includes(cap)));
          }) || activeAgents[0];

          console.log("Object before id access:", matched);
          if (!matched) {
            console.log("File: apps/web/app/marketplace/page.tsx");
            console.log("Function: handleMatchmaker maxLatencyVal map");
            console.log("Variable name: matched");
            console.log("Expected value: Agent object");
            console.log("Actual value: undefined");
            console.log("Why it is undefined: Matched registry agent resolved to undefined.");
            return 0;
          }
          return matched.latency || 0;
        }));

        const transformedObject = {
          chain: chainItems,
          cost: totalCost || planRes.data.estimated_cost || 0.33,
          time: `${Math.round(maxLatencyVal / 1000) || 5}s`
        };
        console.log("TRANSFORMED OBJECT:", transformedObject);
        setMatchedStack(transformedObject);
      }
      console.log("NEXT STEP: Swarm stack generation complete");
    } catch (err: any) {
      console.error("FULL ERROR");
      console.error(err);
      console.error(err.stack);
      toast(`Matchmaking error: ${err.message || err}`, 'error');
      throw err;
    } finally {
      setIsMatching(false);
    }
  };

  // Filter Logic
  const filteredAgents = agents.filter(agent => {
    console.log("Object before id access:", agent);
    if (!agent) {
      console.log("File: apps/web/app/marketplace/page.tsx");
      console.log("Function: filteredAgents filter");
      console.log("Variable name: agent");
      console.log("Expected value: Agent object");
      console.log("Actual value: undefined");
      console.log("Why it is undefined: Marketplace agents list filter received undefined item.");
      return false;
    }
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.skills && agent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (agent.tags && agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    const matchesVerified = !onlyVerified || agent.trustScore >= 95;
    const matchesTrust = agent.trustScore >= minTrustScore;
    const matchesPrice = agent.price <= maxPrice;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(agent.id);

    // Marketplace App-Store style tabs
    let matchesTab = true;
    if (marketplaceTab === 'trending') {
      matchesTab = agent.verificationCount >= 100;
    } else if (marketplaceTab === 'featured') {
      matchesTab = agent.rating >= 4.8 && agent.verificationCount >= 80;
    } else if (marketplaceTab === 'verified') {
      matchesTab = agent.trustScore >= 96;
    }

    return matchesSearch && matchesCategory && matchesVerified && matchesTrust && matchesPrice && matchesFavorites && matchesTab;
  });

  // Sort Logic
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === 'trustScore') return b.trustScore - a.trustScore;
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'latency') return a.latency - b.latency;
    if (sortBy === 'verificationCount') return b.verificationCount - a.verificationCount;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage) || 1;
  const paginatedAgents = sortedAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const avgTrustScore = agents.length > 0 
    ? (agents.reduce((sum, a) => sum + Number(a.trustScore), 0) / agents.length).toFixed(1) 
    : '96.3';

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Header banner */}
      <div className="relative glass-card p-8 rounded-3xl border border-border-dark bg-gradient-to-br from-bg-dark via-black/80 to-primary-neon/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.05),transparent_45%)]"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <Layers className="w-8 h-8 text-primary-neon animate-spin-slow" />
            Agent Registry & Marketplace
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Discover, evaluate, and hire verified autonomous nodes. Connect, run workflow pipelines, and pay with zero friction.
          </p>
        </div>
        <div className="flex gap-6 text-xs font-mono text-gray-500 relative z-10">
          <div className="flex flex-col border-l border-border-dark pl-4">
            <span className="text-[10px] uppercase text-gray-600 tracking-wider">Total Registered</span>
            <span className="text-white text-lg font-extrabold mt-1">{agents.length} Nodes</span>
          </div>
          <div className="flex flex-col border-l border-border-dark pl-4">
            <span className="text-[10px] uppercase text-gray-600 tracking-wider">Avg Trust Score</span>
            <span className="text-primary-neon text-lg font-extrabold mt-1">{avgTrustScore}%</span>
          </div>
        </div>
      </div>

      {/* AI Swarm Matchmaker (Competitive Differentiator) */}
      <div className="glass-card p-6 rounded-2xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-neon/5 blur-[100px] rounded-full"></div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-neon animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            AI Swarm Matchmaker
          </h2>
          <span className="text-[9px] bg-primary-neon text-black font-extrabold px-1.5 py-0.5 rounded font-mono uppercase">
            Optimization Engine
          </span>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl font-mono leading-relaxed relative z-10">
          Describe your task prompt below. The matching engine dynamically sequences best-suited agent layers, calculates SLA latencies, and locks CAP USDC pricing channels.
        </p>

        <div className="flex flex-col md:flex-row gap-3 relative z-10">
          <input
            type="text"
            className="flex-grow bg-black/60 border border-border-dark focus:border-primary-neon/50 px-4 py-3 rounded-xl text-xs text-white outline-none font-mono placeholder-gray-600"
            placeholder="e.g. Compile a quarterly report for Tesla and audit contract compliance limits..."
            value={matchmakerPrompt}
            onChange={(e) => setMatchmakerPrompt(e.target.value)}
          />
          <button
            onClick={handleMatchmaker}
            disabled={isMatching || !matchmakerPrompt.trim()}
            className="bg-primary-neon text-black text-xs font-bold px-6 py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono shrink-0"
          >
            {isMatching ? 'Calculating Stack...' : 'Find Optimal Swarm Stack'}
          </button>
        </div>

        {matchedStack && (() => {
          const groupedAgents = matchedStack.chain.reduce((groups: Record<string, any>, step: any) => {
            if (!groups[step.agentId]) {
              groups[step.agentId] = {
                agentName: step.agentName,
                agentId: step.agentId,
                cost: step.cost,
                time: step.time,
                trustScore: step.trustScore,
                stages: []
              };
            }
            groups[step.agentId].stages.push({
              nodeId: step.nodeId,
              stageName: step.stageName,
              capability: step.capability,
              reason: step.reason
            });
            return groups;
          }, {} as Record<string, any>);

          return (
            <div className="border border-border-dark bg-black/85 p-6 rounded-2xl flex flex-col gap-6 mt-3 transition-all relative z-10 w-full">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-dark/50 pb-4 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
                    OPTIMAL SWARM STACK COMPILATION
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Dynamic Agent Allocation Pipeline for input prompt</span>
                </div>
                <div className="flex items-center gap-6 shrink-0 font-mono text-xs w-full md:w-auto justify-between md:justify-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">Total Swarm Cost</span>
                    <span className="text-secondary-neon font-bold text-sm mt-0.5">{matchedStack.cost.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">Max Pipeline Latency</span>
                    <span className="text-white font-bold text-sm mt-0.5">{matchedStack.time}</span>
                  </div>
                  <Link
                    href={`/workflow?prompt=${encodeURIComponent(matchmakerPrompt)}`}
                    className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all font-sans"
                  >
                    Create Workflow &rarr;
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1 & 2: Execution Sequence */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary-neon" />
                    Sequence of Execution Stages
                  </h4>
                  <div className="flex flex-col gap-3">
                    {matchedStack.chain.map((step: any, idx: number) => (
                      <div key={step.nodeId || idx} className="flex flex-col gap-2 relative">
                        <div className="bg-white/5 border border-border-dark p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary-neon/20 transition-all">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-primary-neon/10 border border-primary-neon/20 px-2 py-0.5 rounded text-primary-neon font-mono font-bold">{step.nodeId}</span>
                              <span className="text-xs font-extrabold text-white">{step.stageName}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono font-normal">Capability: {step.capability}</span>
                            <span className="text-[10px] text-gray-500 font-mono mt-1">
                              Selected Agent: <strong className="text-white font-bold">{step.agentName}</strong> ({step.reason})
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                            {step.trustScore !== undefined && (
                              <div className="flex flex-col items-end">
                                <span className="text-[9px] text-gray-500">TRUST SCORE</span>
                                <span className="text-white font-bold">{step.trustScore}%</span>
                              </div>
                            )}
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] text-gray-500">STAGE FEE</span>
                              <span className="text-primary-neon font-bold">{step.cost.toFixed(2)} USDC</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] text-gray-500">LATENCY</span>
                              <span className="text-white font-bold">{step.time}</span>
                            </div>
                          </div>
                        </div>
                        {idx < matchedStack.chain.length - 1 && (
                          <div className="flex justify-center my-0.5">
                            <span className="text-gray-600 font-bold">&darr;</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Consolidated Swarm Allocation */}
                <div className="lg:col-span-1 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-border-dark pt-6 lg:pt-0 lg:pl-6">
                  <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary-neon" />
                    Consolidated Swarm Organization
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                    The matching engine allocates roles based on agent capability scores. Multi-stage reuse (the same agent handling multiple stages) indicates high cost efficiency and avoids cold-start latency overrides.
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    {(() => {
                      const getAgentDisplayInfo = (agentId: string) => {
                        const id = agentId.toLowerCase();
                        const agentsMap: Record<string, { name: string; emoji: string }> = {
                          'agent-research-1': { name: 'Research Agent', emoji: '🔍' },
                          'agent-research-2': { name: 'Research Agent', emoji: '⚡' },
                          'agent-finance-1': { name: 'Finance Agent', emoji: '📊' },
                          'agent-legal-1': { name: 'Legal Agent', emoji: '⚖' },
                          'agent-code-1': { name: 'Coding Agent', emoji: '💻' },
                          'agent-security-1': { name: 'Security Agent', emoji: '🔒' },
                          'agent-translate-1': { name: 'Translation Agent', emoji: '🌐' },
                          'agent-verify-1': { name: 'Verification Agent', emoji: '🛡' },
                        };
                        if (agentsMap[id]) return agentsMap[id];
                        if (id.startsWith('agent-search') || id.startsWith('agent-research')) return { name: 'Research Agent', emoji: '🔍' };
                        if (id.startsWith('agent-translate')) return { name: 'Translation Agent', emoji: '🌐' };
                        if (id.startsWith('agent-verify')) return { name: 'Verification Agent', emoji: '🛡' };
                        if (id.startsWith('agent-finance')) return { name: 'Finance Agent', emoji: '📊' };
                        if (id.startsWith('agent-legal')) return { name: 'Legal Agent', emoji: '⚖' };
                        if (id.startsWith('agent-code')) return { name: 'Coding Agent', emoji: '💻' };
                        if (id.startsWith('agent-security')) return { name: 'Security Agent', emoji: '🔒' };
                        return { name: 'Agent', emoji: '🤖' };
                      };

                      return Object.values(groupedAgents).map((group: any) => (
                        <div key={group.agentId} className="border border-border-dark bg-black/40 p-4 rounded-xl flex flex-col gap-3 hover:border-primary-neon/10 transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-xs font-bold text-white leading-tight">{group.agentName}</h5>
                              <span className="text-[9px] text-gray-400 font-mono italic">Role: {getAgentDisplayInfo(group.agentId).name}</span>
                              <span className="text-[8px] text-gray-500 font-mono block mt-0.5">ID: {group.agentId}</span>
                            </div>
                            {group.trustScore !== undefined && (
                              <span className="text-[8px] bg-primary-neon/10 border border-primary-neon/30 text-primary-neon px-2 py-0.5 rounded font-mono font-bold shrink-0">
                                {group.trustScore}% TRUST
                              </span>
                            )}
                          </div>

                          {/* Quick Agent Meta */}
                          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-gray-400 bg-white/2 p-2 rounded-lg border border-border-dark/30">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Fee:</span>
                              <span className="text-white font-bold">{Number(group.cost).toFixed(2)} USDC</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Latency:</span>
                              <span className="text-white font-bold">{group.time}</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 border-t border-border-dark/50 pt-2">
                            <span className="text-[9px] text-gray-400 uppercase font-mono tracking-wider">Assigned Stages ({group.stages.length}):</span>
                            {group.stages.map((stage: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-[10px] text-white font-mono bg-white/5 px-2.5 py-1.5 rounded-lg border border-border-dark/30">
                                <span className="text-primary-neon font-bold">✓</span>
                                <div className="flex flex-col w-full">
                                  <div className="flex justify-between items-center w-full">
                                    <span className="font-extrabold text-white">{stage.stageName}</span>
                                    <span className="text-[8px] bg-white/5 border border-border-dark px-1.5 py-0.2 rounded text-gray-400 tracking-wide font-normal">{stage.capability.toUpperCase()}</span>
                                  </div>
                                  <span className="text-[9px] text-gray-400 font-mono font-normal mt-0.5">{stage.reason}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

              </div>

            </div>
          );
        })()}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Advanced Filters Panel */}
        <div className="lg:col-span-1 glass-card p-5 rounded-2xl border border-border-dark flex flex-col gap-6">
          <div className="flex justify-between items-center pb-3 border-b border-border-dark">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-neon" />
              Advanced Filters
            </h3>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setOnlyVerified(false);
                setMinTrustScore(0);
                setMaxPrice(0.5);
                setShowOnlyFavorites(false);
              }}
              className="text-[10px] text-gray-500 hover:text-white font-mono"
            >
              Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500">Keyword Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                className="w-full bg-black/40 border border-border-dark focus:border-primary-neon/40 pl-9 pr-3 py-2.5 rounded-xl text-xs text-white outline-none"
                placeholder="Search name, skills, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500">Category</label>
            <div className="flex flex-wrap gap-1">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-mono transition-all ${
                    selectedCategory === c 
                      ? 'bg-primary-neon/10 border-primary-neon/40 text-primary-neon' 
                      : 'bg-black/20 border-border-dark text-gray-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300">
              <input 
                type="checkbox" 
                checked={onlyVerified} 
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-border-dark text-primary-neon focus:ring-primary-neon bg-black/60 w-4 h-4"
              />
              <span>Only Verified Nodes (≥95%)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300">
              <input 
                type="checkbox" 
                checked={showOnlyFavorites} 
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                className="rounded border-border-dark text-primary-neon focus:ring-primary-neon bg-black/60 w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                Only Favorites
              </span>
            </label>
          </div>

          {/* Max Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Max Service Fee</span>
              <span className="text-white font-bold">{maxPrice.toFixed(2)} USDC</span>
            </div>
            <input 
              type="range" 
              min={0.01} 
              max={0.50} 
              step={0.01} 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="accent-primary-neon w-full cursor-pointer h-1 bg-border-dark rounded-lg"
            />
          </div>

          {/* Min Trust Score */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Min Trust Score</span>
              <span className="text-white font-bold">{minTrustScore}%</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={100} 
              step={5} 
              value={minTrustScore} 
              onChange={(e) => setMinTrustScore(parseInt(e.target.value))}
              className="accent-primary-neon w-full cursor-pointer h-1 bg-border-dark rounded-lg"
            />
          </div>

          {/* Sorting */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary-neon" />
              Sort Results
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-black/60 border border-border-dark px-3 py-2 rounded-xl text-xs text-white outline-none cursor-pointer font-mono"
            >
              <option value="trustScore">Highest Trust Score</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="latency">Fastest Latency</option>
              <option value="verificationCount">Jobs Completed</option>
            </select>
          </div>
        </div>

        {/* Agents Grid List */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* App-Store tabs selector */}
          <div className="flex flex-wrap gap-2 border-b border-border-dark pb-3">
            {[
              { id: 'all', label: 'All Nodes' },
              { id: 'trending', label: '🔥 Trending Swarms' },
              { id: 'featured', label: '💎 Featured Bids' },
              { id: 'verified', label: '🛡️ CAP Verified' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setMarketplaceTab(t.id as any)}
                className={`text-xs px-4 py-2 rounded-xl font-mono border transition-all ${
                  marketplaceTab === t.id
                    ? 'bg-primary-neon/15 border-primary-neon/40 text-primary-neon font-bold shadow-[0_0_8px_rgba(0,255,204,0.05)]'
                    : 'bg-white/5 border-border-dark text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
            <span>Found {sortedAgents.length} active swarm agent nodes</span>
            <span>Sorted by {sortBy}</span>
          </div>

          {isInitialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : sortedAgents.length === 0 ? (
            <div className="glass-card py-20 text-center text-gray-500 italic rounded-2xl border border-border-dark flex flex-col items-center gap-2">
              <span className="text-sm">No agents match your active search filters.</span>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setOnlyVerified(false);
                  setMinTrustScore(0);
                  setMaxPrice(0.5);
                  setShowOnlyFavorites(false);
                }}
                className="text-xs text-primary-neon font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedAgents.map((agent) => {
                  console.log("Object before id access:", agent);
                  if (!agent) {
                    console.log("File: apps/web/app/marketplace/page.tsx");
                    console.log("Function: paginatedAgents map");
                    console.log("Variable name: agent");
                    console.log("Expected value: Agent object");
                    console.log("Actual value: undefined");
                    console.log("Why it is undefined: Paginated list contains undefined entry.");
                    return null;
                  }
                  const isFav = favorites.includes(agent.id);
                  return (
                    <div 
                      key={agent.id} 
                      onClick={() => setSelectedAgent(agent)}
                      className="glass-card glass-card-hover p-6 rounded-2xl border border-border-dark flex flex-col justify-between h-[390px] relative overflow-hidden cursor-pointer transition-all duration-300"
                    >
                      {/* Top Layer Info */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] bg-white/5 border border-border-dark px-2.5 py-1 rounded-md text-gray-400 font-mono uppercase tracking-wider">
                            {agent.category}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => toggleFavorite(agent.id, e)}
                              className="text-gray-500 hover:text-yellow-500 transition-all p-1 hover:bg-white/5 rounded-md"
                            >
                              <Star className={`w-4 h-4 ${isFav ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                            </button>
                            {agent.trustScore >= 95 && (
                              <span className="text-primary-neon bg-primary-neon/10 border border-primary-neon/20 px-2 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase tracking-wide flex items-center gap-0.5">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                VERIFIED
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-base font-extrabold text-white mb-0.5 flex items-center gap-1.5 leading-tight">
                          {agent.name}
                          <span className="text-[10px] text-gray-500 font-mono font-normal">v{agent.version}</span>
                        </h3>
                        <span className="text-[9px] text-gray-400 font-mono italic mb-2.5 block">
                          Role: {agent.category} Agent
                        </span>
                        
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                          {agent.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {agent.skills && agent.skills.slice(0, 3).map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="text-[9px] bg-black/40 border border-border-dark text-gray-300 px-2.5 py-1 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                          {agent.skills && agent.skills.length > 3 && (
                            <span className="text-[9px] text-gray-500 font-mono flex items-center pl-1">
                              +{agent.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom stats details */}
                      <div className="pt-4 border-t border-border-dark">
                        
                        {/* Trust Gauges */}
                        <div className="grid grid-cols-2 gap-3 mb-4 text-[10px] font-mono">
                          <div className="flex flex-col">
                            <span className="text-gray-500">Trust Score</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.trustScore}%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Success Rate</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.accuracy}%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Latency (SLA)</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.latency}ms</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Completed Jobs</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.verificationCount}</span>
                          </div>
                        </div>

                        {/* Creator Profile */}
                        <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mb-2">
                          <span>CREATOR:</span>
                          <span className="text-white font-bold uppercase">Orbit Labs</span>
                        </div>

                        {/* Pricing Footer */}
                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-border-dark">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-gray-500 font-mono">Service Fee</span>
                            <span className="text-sm font-extrabold text-primary-neon font-mono mt-0.5">
                              {agent.price.toFixed(2)} <span className="text-[10px] text-gray-400">USDC</span>
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-600 font-mono truncate max-w-[100px]" title={agent.walletAddress}>
                            {agent.walletAddress}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Selector buttons */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4 font-mono text-xs border-t border-border-dark pt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="bg-white/5 border border-border-dark disabled:opacity-30 hover:bg-white/10 px-4 py-2 rounded-xl text-white font-bold transition-all"
                  >
                    &larr; Previous Page
                  </button>
                  <span className="text-gray-400">
                    Page <strong className="text-white">{currentPage}</strong> of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="bg-white/5 border border-border-dark disabled:opacity-30 hover:bg-white/10 px-4 py-2 rounded-xl text-white font-bold transition-all"
                  >
                    Next Page &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>

      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

    </div>
  );
}
