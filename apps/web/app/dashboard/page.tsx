'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { Search, Plus, ArrowRight, BookOpen, Layers, Terminal, Sparkles, Shield, Cpu, Activity, TrendingUp, Wallet, CheckCircle2, Play } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayName = user?.displayName || user?.username || 'User';

  const mockWorkflows = [
    { id: 'research-agent', name: 'Research Consensus Agent', category: 'Research', status: 'Active', updated: 'Updated 2 hours ago', executions: 142 },
    { id: 'sales-outreach', name: 'Sales Outreach Swarm', category: 'Marketing', status: 'Running', updated: 'Updated yesterday', executions: 89 },
    { id: 'compliance-audit', name: 'Legal Compliance Audit', category: 'Legal', status: 'Idle', updated: 'Updated 3 days ago', executions: 34 },
  ];

  const filteredWorkflows = mockWorkflows.filter(wf => 
    wf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Dashboard Overview 👋
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Welcome back, {displayName}. Here is the telemetry for your autonomous agent swarms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-gray-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all no-underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Templates</span>
          </Link>
          <Link
            href="/marketplace"
            className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-gray-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all no-underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-gray-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all no-underline"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </Link>
          <button
            onClick={() => router.push('/workspace/new')}
            className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer border-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Swarm</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Active Swarms', value: '12', change: '+3 this week', icon: Cpu, color: 'text-[#4EA3FF]' },
          { title: 'Total Executions', value: '1,428', change: '+18.4%', icon: Activity, color: 'text-emerald-400' },
          { title: 'USDC Spent', value: '$42.50', change: 'Balance: 150.00 USDC', icon: Wallet, color: 'text-purple-400' },
          { title: 'Success Rate', value: '99.4%', change: 'SLA Compliant', icon: Shield, color: 'text-amber-400' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2 rounded-xl bg-white/5 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white tracking-tight">{card.value}</span>
                <span className="text-[10px] text-gray-500 font-mono">{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section: Search & Workflows */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
            Active Workspace Swarms
          </h2>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
            <input 
              type="text"
              placeholder="Filter swarms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden">
          {filteredWorkflows.map((wf) => (
            <div 
              key={wf.id}
              className="flex items-center justify-between px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#4EA3FF]/10 text-[#4EA3FF] flex items-center justify-center font-mono text-xs font-bold">
                  {wf.category.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">{wf.name}</span>
                  <span className="text-xs text-[#9CA3AF]">{wf.updated} • {wf.executions} executions</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]">
                  {wf.status}
                </span>
                <Link 
                  href={`/workspace/${wf.id}`}
                  className="flex items-center gap-1.5 text-xs text-[#4EA3FF] hover:underline no-underline"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
