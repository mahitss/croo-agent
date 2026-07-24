'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, Search, CheckCircle2, ArrowRight, FileText, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function ResearchPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLaunchResearch = () => {
    if (!query.trim()) return;
    setIsExecuting(true);
    toast('Research Consensus Agent swarm launched!', 'info');
    setTimeout(() => {
      setIsExecuting(false);
      router.push('/workflow');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 select-none animate-fade-in">
      {/* Hero Header */}
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Research Consensus Engine
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Deploy multi-model research swarms to aggregate live web sources, perform cross-verification, and compile cited executive briefs.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Research Intention</label>
        <textarea
          rows={3}
          placeholder="e.g. Compare sovereign AI infrastructure investments across EU countries for 2026..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3.5 text-xs text-white placeholder-gray-500 outline-none resize-none"
        />
        <button
          onClick={handleLaunchResearch}
          disabled={!query.trim() || isExecuting}
          className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-3 rounded-xl transition-all cursor-pointer border-0 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isExecuting ? 'Initializing Swarm Nodes...' : 'Launch Research Swarm'}</span>
        </button>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'Multi-Source Synthesis', desc: 'Queries Perplexity, OpenRouter, and Google Search in parallel.', icon: Globe },
          { title: 'Citation Verification', desc: 'Validates claim accuracy score and flags conflicting data.', icon: CheckCircle2 },
          { title: 'Automated Briefs', desc: 'Compiles structured PDF & Markdown executive summaries.', icon: FileText }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-3">
              <Icon className="w-5 h-5 text-[#4EA3FF]" />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
