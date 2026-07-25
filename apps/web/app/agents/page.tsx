'use client';

import { useState } from 'react';
import AppLayout from '../../components/AppLayout';
import { Bot, ShieldCheck, Clock, Cpu, Search, Plus, Filter, Activity } from 'lucide-react';
import { useToast } from '../../components/Toast';
import Link from 'next/link';

export default function AgentsPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const agents = [
    { id: 'ag-1', name: 'Web Search Engine AI', category: 'Search', status: 'Online', latency: '380ms', trust: '98%', runs: 1420, creator: 'Orbit Core' },
    { id: 'ag-2', name: 'Claim Verification QA', category: 'Analysis', status: 'Online', latency: '420ms', trust: '96%', runs: 890, creator: 'Orbit Core' },
    { id: 'ag-3', name: 'Lead Score Classifier', category: 'Scoring', status: 'Online', latency: '290ms', trust: '97%', statusColor: 'text-emerald-400', runs: 670, creator: 'Outreach Lab' },
    { id: 'ag-[#7BC9FF]-1', name: 'SEO Keyword Analyzer', category: 'Marketing', status: 'Idle', latency: '310ms', trust: '95%', runs: 1530, creator: 'CopyCraft' },
    { id: 'ag-legal-1', name: 'Contract PDF Parser', category: 'Legal', status: 'Online', latency: '510ms', trust: '99%', runs: 420, creator: 'Legal AI Inc' },
    { id: 'ag-med-1', name: 'EHR Progress Note Extractor', category: 'Healthcare', status: 'Online', latency: '600ms', trust: '99%', runs: 310, creator: 'HealthOpen' },
  ];

  const filtered = agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-emerald-400" /> Active Worker Agent Nodes
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Operational status, SLA latency, and execution history for all registered worker nodes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/publish"
              className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all border-0 shadow cursor-pointer no-underline"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Agent Node</span>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search agent node roster..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ag) => (
            <div key={ag.id} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/10 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-[#4EA3FF]">
                    {ag.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {ag.status}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white">{ag.name}</h3>
                  <span className="text-[10px] text-gray-500 font-mono">by {ag.creator}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px] font-mono">
                <div><span className="text-gray-500">Latency:</span> <span className="text-white font-bold">{ag.latency}</span></div>
                <div><span className="text-gray-500">SLA Trust:</span> <span className="text-emerald-400 font-bold">{ag.trust}</span></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
