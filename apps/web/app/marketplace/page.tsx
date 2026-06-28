'use client';

import { useState, useEffect } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { Agent } from '@nexus-ai/types';
import AgentDetailModal from '../../components/AgentDetailModal';
import { Search, Award, Layers, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MarketplacePage() {
  const agents = useNexusStore((state) => state.agents);
  const initialize = useNexusStore((state) => state.initialize);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Matchmaker State
  const [matchmakerPrompt, setMatchmakerPrompt] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchedStack, setMatchedStack] = useState<{
    chain: string[];
    cost: number;
    time: string;
  } | null>(null);

  const categories = ['All', 'Research', 'Finance', 'Legal', 'Coding', 'Security', 'Translation'];

  // Check URL query search parameters safely
  useEffect(() => {
    initialize();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get('search');
      if (urlQuery) {
        setSearchTerm(urlQuery);
      }
    }
  }, [initialize]);

  const handleMatchmaker = () => {
    if (!matchmakerPrompt.trim()) return;
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchedStack({
        chain: ['Web Research Pro', 'Smart Audit Validator', 'Presentation slides compiler'],
        cost: 1.82,
        time: '2m 15s'
      });
    }, 1200);
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Header banner */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary-neon animate-spin-slow" />
            Agent Registry & Marketplace
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Discover, evaluate, and hire verified autonomous nodes.
          </p>
        </div>
        <div className="flex gap-4 text-xs font-mono text-gray-500">
          <div className="flex flex-col border-l border-border-dark pl-3">
            <span className="text-[10px] uppercase text-gray-600">Total Registered</span>
            <span className="text-white font-bold">{agents.length} Nodes</span>
          </div>
          <div className="flex flex-col border-l border-border-dark pl-3">
            <span className="text-[10px] uppercase text-gray-600">Avg Trust Score</span>
            <span className="text-primary-neon font-bold">96.3%</span>
          </div>
        </div>
      </div>

      {/* AI Swarm Matchmaker (Competitive Differentiator) */}
      <div className="glass-card p-6 rounded-2xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-neon animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            AI Swarm Matchmaker
          </h2>
          <span className="text-[9px] bg-primary-neon text-black font-extrabold px-1.5 py-0.5 rounded font-mono uppercase">
            Optimization Engine
          </span>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl font-mono leading-relaxed">
          Describe your task prompt below. The matching engine dynamically sequences best-suited agent layers, calculates SLA latencies, and locks CAP USDC pricing channels.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            className="flex-grow bg-black/60 border border-border-dark focus:border-primary-neon/50 px-4 py-2.5 rounded-xl text-xs text-white outline-none font-mono"
            placeholder="e.g. Compile a quarterly report for Tesla and audit contract compliance limits..."
            value={matchmakerPrompt}
            onChange={(e) => setMatchmakerPrompt(e.target.value)}
          />
          <button
            onClick={handleMatchmaker}
            disabled={isMatching || !matchmakerPrompt.trim()}
            className="bg-primary-neon text-black text-xs font-bold px-6 py-2.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono shrink-0"
          >
            {isMatching ? 'Calculating Stack...' : 'Find Optimal Swarm Stack'}
          </button>
        </div>

        {matchedStack && (
          <div className="border border-border-dark bg-black/40 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2 transition-all">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Recommended Swarm Execution Flow:</span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-white font-mono">
                {matchedStack.chain.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="bg-white/5 border border-border-dark px-2.5 py-1 rounded text-primary-neon font-bold">
                      {step}
                    </span>
                    {idx < matchedStack.chain.length - 1 && <ArrowRight className="w-4 h-4 text-gray-600" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500">EST. BUDGET</span>
                <span className="text-secondary-neon font-bold">{matchedStack.cost.toFixed(2)} USDC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500">EST. LATENCY</span>
                <span className="text-white font-bold">{matchedStack.time}</span>
              </div>
              <Link
                href={`/workflow?prompt=${encodeURIComponent(matchmakerPrompt)}`}
                className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all"
              >
                Create Workflow
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Filter and search bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="md:col-span-3 relative">
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            className="w-full bg-black/40 border border-border-dark focus:border-primary-neon/40 pl-10 pr-4 py-3 rounded-xl text-xs text-white outline-none"
            placeholder="Search agents by name, skill, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category selector */}
        <div className="md:col-span-1">
          <select
            className="w-full bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-3 rounded-xl text-xs text-white outline-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-bg-dark text-white">{c} Category</option>
            ))}
          </select>
        </div>

      </div>

      {/* Agents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgents.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 italic">
            No agents match your active search terms.
          </div>
        ) : (
          filteredAgents.map((agent) => (
            <div 
              key={agent.id} 
              onClick={() => setSelectedAgent(agent)}
              className="glass-card glass-card-hover p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[360px] relative overflow-hidden cursor-pointer"
            >
              {/* Badge if verified */}
              {agent.trustScore >= 95 && (
                <div className="absolute top-0 right-0 bg-primary-neon/20 border-b border-l border-primary-neon/30 text-primary-neon text-[8px] font-mono px-2 py-1 uppercase tracking-wider rounded-bl-lg font-bold">
                  Verified Top
                </div>
              )}

              {/* Top details */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                    {agent.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-pulse"></span>
                    <span className="text-[9px] font-mono text-gray-400 uppercase">ONLINE</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1">
                  {agent.name}
                  <span className="text-[9px] text-gray-500 font-mono font-normal">v{agent.version}</span>
                </h3>
                
                <p className="text-[11px] text-gray-400 leading-normal line-clamp-3 mb-3">
                  {agent.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] bg-white/3 border border-border-dark text-gray-300 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats details */}
              <div className="pt-3 border-t border-border-dark">
                {/* Score indicators */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-[10px] font-mono text-gray-500">
                  <div className="flex flex-col">
                    <span>Trust Score</span>
                    <span className="text-white font-bold">{agent.trustScore}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Avg Latency</span>
                    <span className="text-white font-bold">{agent.latency}ms</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Accuracy</span>
                    <span className="text-white font-bold">{agent.accuracy}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Completed Jobs</span>
                    <span className="text-white font-bold">{agent.verificationCount}</span>
                  </div>
                </div>

                {/* Action details */}
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-border-dark">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-mono">Service Fee</span>
                    <span className="text-sm font-bold text-primary-neon font-mono">
                      {agent.price.toFixed(2)} <span className="text-xs text-gray-400">USDC</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono truncate max-w-[100px]">
                    {agent.walletAddress}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

    </div>
  );
}
