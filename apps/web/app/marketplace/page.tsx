'use client';

import { useState } from 'react';
import { Search, Sparkles, Star, ShieldCheck, ArrowRight, Filter, Cpu, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function MarketplacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const agents = [
    { id: '1', name: 'Web Research Swarm', category: 'Research', price: '0.05 USDC', rating: 4.9, hires: 1240, desc: 'Aggregates multiple search engines and verifies claims with citations.' },
    { id: '2', name: 'Sales Lead Finder', category: 'Sales', price: '0.10 USDC', rating: 4.8, hires: 890, desc: 'Scrapes targeted company profiles, extracts decision maker contacts, and scores leads.' },
    { id: '3', name: 'Compliance Brief Parser', category: 'Legal', price: '0.15 USDC', rating: 5.0, hires: 420, desc: 'Parses contracts, identifies liability markers, and verifies terms against EU GDPR rules.' },
    { id: '4', name: 'Portfolio Risk Analyzer', category: 'Finance', price: '0.08 USDC', rating: 4.7, hires: 670, desc: 'Computes Sharpe ratio, drawdown risk, and variance metrics for web3 portfolios.' },
    { id: '5', name: 'Multi-Channel Copy Scribe', category: 'Marketing', price: '0.04 USDC', rating: 4.9, hires: 1530, desc: 'Generates ad variants, social media posts, and landing page headlines.' },
    { id: '6', name: 'Clinical EHR Mapper', category: 'Healthcare', price: '0.20 USDC', rating: 4.9, hires: 310, desc: 'Converts unstructured clinical notes to standardized FHIR data structures.' },
  ];

  const categories = ['All', 'Research', 'Sales', 'Legal', 'Finance', 'Marketing', 'Healthcare'];

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleHireAgent = (agentName: string) => {
    toast(`Hired "${agentName}" for workflow execution.`, 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>Agent Node Marketplace</span>
            <Sparkles className="w-5 h-5 text-[#4EA3FF]" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Browse and hire decentralized autonomous AI worker nodes paid per execution in USDC.
          </p>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search agent capabilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#4EA3FF] text-black border-[#4EA3FF]'
                : 'bg-[#111111] text-gray-400 border-[#232323] hover:border-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-5 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-[#4EA3FF] border border-white/5">
                  {agent.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{agent.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                {agent.name}
              </h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {agent.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-mono">Execution Fee</span>
                <span className="text-xs font-bold font-mono text-white">{agent.price}</span>
              </div>
              <button
                onClick={() => handleHireAgent(agent.name)}
                className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer border-0 shadow"
              >
                <span>Hire Node</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
