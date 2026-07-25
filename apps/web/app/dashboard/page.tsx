'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { 
  Search, 
  Plus, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Wallet, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Bell, 
  Rocket, 
  Store, 
  Terminal, 
  Clock, 
  Bot 
} from 'lucide-react';
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

  const displayName = user?.displayName || user?.username || 'Executive Operator';

  const runningWorkflows = [
    { id: 'research-agent', name: 'Research Consensus Agent Swarm', category: 'Research', status: 'Running', duration: '42s', executions: 142, cost: '$0.35' },
    { id: 'sales-outreach', name: 'Sales Lead Outreach Swarm', category: 'Sales', status: 'Running', duration: '12m', executions: 89, cost: '$0.50' },
    { id: 'compliance-audit', name: 'Legal GDPR Compliance Audit', category: 'Legal', status: 'Idle', duration: '3d ago', executions: 34, cost: '$0.25' },
    { id: 'wf-template-finance-1740', name: 'Finance Portfolio Risk Swarm', category: 'Finance', status: 'Completed', duration: '1h ago', executions: 210, cost: '$0.80' },
  ];

  const activeAgents = [
    { name: 'Web Search Engine AI', category: 'Search', latency: '380ms', trust: '98%', status: 'Active' },
    { name: 'Claim Verification QA', category: 'Analysis', latency: '420ms', trust: '96%', status: 'Active' },
    { name: 'Lead Score Classifier', category: 'Scoring', latency: '290ms', trust: '97%', status: 'Active' },
    { name: 'EHR Progress Note Extractor', category: 'Healthcare', latency: '510ms', trust: '99%', status: 'Active' },
  ];

  const systemEvents = [
    { id: '1', type: 'EXECUTION', text: 'Research Swarm completed step 3 (PDF Brief Synthesis)', time: '2m ago', color: 'text-emerald-400' },
    { id: '2', type: 'ESCROW', text: 'Released 1.50 USDC escrow to agent-search-1 node', time: '14m ago', color: 'text-[#4EA3FF]' },
    { id: '3', type: 'DEPLOYMENT', text: 'Deployed "Finance Risk Swarm" into production workspace', time: '1h ago', color: 'text-purple-400' },
    { id: '4', type: 'MARKETPLACE', text: 'Hired "Clinical EHR Mapper" for active canvas', time: '3h ago', color: 'text-amber-400' },
  ];

  const filteredWorkflows = runningWorkflows.filter(wf => 
    wf.name.toLowerCase().includes(searchQuery.toLowerCase()) || wf.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 select-none animate-fade-in font-sans">
      
      {/* 1. TOP HEADER & SYSTEM HEALTH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Enterprise Executive Overview
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Cluster Healthy
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF]">
            Real-time operations telemetry for <span className="text-white font-semibold">{displayName}</span> across 4 microservice clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/workspace/new')}
            className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create Swarm Workflow</span>
          </button>
        </div>
      </div>

      {/* 2. EXECUTIVE METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Running Workflows', value: '4 Active', change: '2 swarms currently executing', icon: Cpu, color: 'text-[#4EA3FF]' },
          { title: 'Worker Agents', value: '18 Deployed', change: 'Avg Latency: 385ms', icon: Bot, color: 'text-emerald-400' },
          { title: 'USDC Credit Balance', value: '$150.00', change: 'Escrow Locked: $12.50', icon: Wallet, color: 'text-purple-400' },
          { title: 'SLA Success Rate', value: '99.82%', change: '0 SLA breaches in 30 days', icon: Shield, color: 'text-amber-400' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col justify-between gap-3 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2 rounded-xl bg-white/5 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white tracking-tight font-mono">{card.value}</span>
                <span className="text-[10px] text-gray-500 font-mono">{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MAIN DASHBOARD CONTENT: WORKFLOWS & LIVE AGENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLUMNS: ACTIVE WORKFLOWS */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#4EA3FF]" /> Active Workspace Workflows
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
              <input 
                type="text"
                placeholder="Filter workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
              <span className="col-span-5">Workflow Name</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Duration</span>
              <span className="col-span-2">Est. Cost</span>
              <span className="col-span-1 text-right">Action</span>
            </div>

            {filteredWorkflows.map((wf) => (
              <div 
                key={wf.id}
                className="grid grid-cols-12 items-center px-5 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#4EA3FF]/10 text-[#4EA3FF] flex items-center justify-center font-mono text-[10px] font-bold">
                    {wf.category.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white truncate max-w-[200px]">{wf.name}</span>
                    <span className="text-[10px] text-gray-500">{wf.executions} total runs</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                    wf.status === 'Running' 
                      ? 'bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}>
                    {wf.status}
                  </span>
                </div>

                <div className="col-span-2 font-mono text-gray-400 text-[11px]">{wf.duration}</div>
                <div className="col-span-2 font-mono text-gray-300 font-semibold">{wf.cost}</div>

                <div className="col-span-1 flex justify-end">
                  <Link 
                    href={`/workspace/${wf.id}`}
                    className="text-[#4EA3FF] hover:underline no-underline"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE AGENTS & RECENT SYSTEM EVENTS */}
        <div className="flex flex-col gap-6">
          
          {/* Active Agents Telemetry */}
          <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" /> Active Worker Nodes
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">4 Online</span>
            </div>

            <div className="flex flex-col gap-3">
              {activeAgents.map((ag) => (
                <div key={ag.name} className="flex items-center justify-between p-3 bg-[#050505] border border-[#232323] rounded-xl text-xs">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-[11px]">{ag.name}</span>
                    <span className="text-[10px] text-gray-500">{ag.category} • Latency: {ag.latency}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SLA {ag.trust}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Audit Event Feed */}
          <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#4EA3FF]" /> Recent Audit Stream
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              {systemEvents.map((ev) => (
                <div key={ev.id} className="flex flex-col gap-1 pb-2 border-b border-[#232323] last:border-b-0">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={`font-bold ${ev.color}`}>{ev.type}</span>
                    <span className="text-gray-500">{ev.time}</span>
                  </div>
                  <span className="text-gray-300 text-[11px] leading-relaxed">{ev.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
