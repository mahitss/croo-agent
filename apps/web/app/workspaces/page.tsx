'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { Search, Plus, ArrowRight, BookOpen, Layers, Terminal, Sparkles, Shield, Cpu, HelpCircle } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function WorkspacesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayName = user?.displayName || 'Mahit Saxena';

  const mockWorkflows = [
    { id: 'research-agent', name: 'Research Agent', updated: 'Updated 2 hours ago' },
    { id: 'sales-outreach', name: 'Sales Outreach', updated: 'Updated yesterday' },
    { id: 'compliance-audit', name: 'Compliance Audit', updated: 'Updated 3 days ago' },
  ];

  const filteredWorkflows = mockWorkflows.filter(wf => 
    wf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const templates = [
    { name: 'Sales', route: '/marketing', icon: ArrowRight, desc: 'Automate outreach swarms, lead lists, and follow-ups.' },
    { name: 'Research', route: '/research', icon: BookOpen, desc: 'Aggregate compliance briefs, competitor analysis, and sources.' },
    { name: 'Finance', route: '/finance', icon: Layers, desc: 'Analyze portfolio performance, expense audits, and tax briefs.' },
    { name: 'Marketing', route: '/marketing', icon: Sparkles, desc: 'Generate multi-channel ad copy swarms and social posts.' },
    { name: 'Legal', route: '/legal', icon: Shield, desc: 'Parse contract terms, extract compliance risks, and verify briefs.' },
    { name: 'Healthcare', route: '/healthcare', icon: Cpu, desc: 'Scan clinical trial logs, optimize schedules, and map records.' }
  ];

  const handleCreateWorkflow = () => {
    toast('Initializing new workflow builder canvas...', 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12 select-none">
      
      {/* HEADER CONTROLS (ChatGPT/Linear layout integration) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#232323]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input 
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-[#9CA3AF] outline-none transition-all"
          />
        </div>
        <button
          onClick={handleCreateWorkflow}
          className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* BODY - Welcome & Greeting */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Welcome back, {displayName.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-[#9CA3AF] font-sans">
          What would you like to build today?
        </p>
      </div>

      {/* LARGE CTA CARD */}
      <div 
        onClick={handleCreateWorkflow}
        className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-8 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#4EA3FF] group-hover:scale-105 transition-transform duration-300">
          <Plus className="w-6 h-6" />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white">Create New Workflow</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">Deploy automated AI agent networks in minutes</p>
        </div>
      </div>

      {/* RECENT WORKFLOWS */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
          Recent Workflows
        </h2>
        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden">
          {filteredWorkflows.length > 0 ? (
            filteredWorkflows.map((wf) => (
              <div 
                key={wf.id}
                className="flex items-center justify-between px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">{wf.name}</span>
                  <span className="text-xs text-[#9CA3AF]">{wf.updated}</span>
                </div>
                <Link 
                  href={`/workflow?workflowId=${wf.id}`}
                  className="flex items-center gap-1.5 text-xs text-[#4EA3FF] hover:underline no-underline"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-xs text-[#9CA3AF]">
              No workflows matching "{searchQuery}" found.
            </div>
          )}
        </div>
      </div>

      {/* TEMPLATES */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
          Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <div 
                key={tmpl.name}
                onClick={() => router.push(tmpl.route)}
                className="bg-[#111111] border border-[#232323] hover:border-white/10 p-5 rounded-2xl flex items-start gap-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-[#4EA3FF] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-white">{tmpl.name}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{tmpl.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
