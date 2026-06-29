'use client';

import { useState, useEffect } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { Agent } from '@nexus-ai/types';
import AgentDetailModal from '../../components/AgentDetailModal';
import { Search, Award, Layers, Sparkles, ArrowRight, Star, SlidersHorizontal, ArrowUpDown, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function MarketplacePage() {
  const agents = useNexusStore((state) => state.agents);
  const initialize = useNexusStore((state) => state.initialize);
  
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [minTrustScore, setMinTrustScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0.5);
  const [sortBy, setSortBy] = useState<string>('trustScore');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Matchmaker State
  const [matchmakerPrompt, setMatchmakerPrompt] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchedStack, setMatchedStack] = useState<{
    chain: string[];
    cost: number;
    time: string;
  } | null>(null);

  const categories = ['All', 'Research', 'Finance', 'Legal', 'Coding', 'Security', 'Translation'];

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
  }, [initialize]);

  const toggleFavorite = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated = [...favorites];
    if (favorites.includes(agentId)) {
      updated = updated.filter(id => id !== agentId);
    } else {
      updated.push(agentId);
    }
    setFavorites(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbit_favorites', JSON.stringify(updated));
    }
  };

  const handleMatchmaker = () => {
    if (!matchmakerPrompt.trim()) return;
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchedStack({
        chain: ['InsightFinder Pro', 'LexGuard', 'ConsensuVerify'],
        cost: 0.60,
        time: '2m 15s'
      });
    }, 1200);
  };

  // Filter Logic
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.skills && agent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (agent.tags && agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    const matchesVerified = !onlyVerified || agent.trustScore >= 95;
    const matchesTrust = agent.trustScore >= minTrustScore;
    const matchesPrice = agent.price <= maxPrice;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(agent.id);

    return matchesSearch && matchesCategory && matchesVerified && matchesTrust && matchesPrice && matchesFavorites;
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
            <span className="text-primary-neon text-lg font-extrabold mt-1">96.3%</span>
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

        {matchedStack && (
          <div className="border border-border-dark bg-black/80 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2 transition-all relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Recommended Swarm Execution Flow:</span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-white font-mono">
                {matchedStack.chain.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="bg-white/5 border border-border-dark px-3 py-1.5 rounded-lg text-primary-neon font-bold">
                      {step}
                    </span>
                    {idx < matchedStack.chain.length - 1 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 shrink-0 font-mono text-xs border-t md:border-t-0 pt-3 md:pt-0 border-border-dark w-full md:w-auto justify-between md:justify-start">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase">EST. BUDGET</span>
                <span className="text-secondary-neon font-bold text-sm mt-0.5">{matchedStack.cost.toFixed(2)} USDC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 uppercase">EST. LATENCY</span>
                <span className="text-white font-bold text-sm mt-0.5">{matchedStack.time}</span>
              </div>
              <Link
                href={`/workflow?prompt=${encodeURIComponent(matchmakerPrompt)}`}
                className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all font-sans"
              >
                Create Workflow
              </Link>
            </div>
          </div>
        )}
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
          <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
            <span>Found {sortedAgents.length} active swarm agent nodes</span>
            <span>Sorted by {sortBy}</span>
          </div>

          {sortedAgents.length === 0 ? (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAgents.map((agent) => {
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
                              <ShieldCheck className="w-3 h-3" />
                              VERIFIED
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-white mb-2 flex items-center gap-1.5 leading-tight">
                        {agent.name}
                        <span className="text-[10px] text-gray-500 font-mono font-normal">v{agent.version}</span>
                      </h3>
                      
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
          )}
        </div>
        
      </div>

      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

    </div>
  );
}
