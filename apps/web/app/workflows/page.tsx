'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, Plus, Play, Sparkles, Clock, CheckCircle2, ArrowRight, Layers, Trash2 } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function WorkflowsListPage() {
  const router = useRouter();
  const { toast } = useToast();

  const mockWorkflows = [
    { id: 'research-agent', name: 'Web Research & PDF Brief Generator', nodes: 4, status: 'Active', updated: '2 hours ago', budget: '1.50 USDC' },
    { id: 'sales-outreach', name: 'Multi-Channel Sales Outreach Swarm', nodes: 6, status: 'Completed', updated: 'Yesterday', budget: '2.00 USDC' },
    { id: 'compliance-audit', name: 'GDPR Liability & Terms Auditor', nodes: 3, status: 'Idle', updated: '3 days ago', budget: '0.80 USDC' },
    { id: 'finance-analyzer', name: 'Portfolio Sharpe & Expense Analyzer', nodes: 5, status: 'Completed', updated: '5 days ago', budget: '1.20 USDC' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>Workflow Builder & Swarms</span>
            <Terminal className="w-5 h-5 text-[#4EA3FF]" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Construct and manage visual Directed Acyclic Graph (DAG) structures for autonomous agent swarms.
          </p>
        </div>

        <button
          onClick={() => router.push('/workflow')}
          className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Construct New DAG</span>
        </button>
      </div>

      {/* Grid of Workflows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockWorkflows.map((wf) => (
          <div
            key={wf.id}
            className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-6 transition-all group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]">
                  {wf.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 font-mono">{wf.budget}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                {wf.name}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#4EA3FF]" />
                  <span>{wf.nodes} Agent Nodes</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{wf.updated}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
              <button
                onClick={() => {
                  toast(`Opening canvas for ${wf.name}...`, 'info');
                  router.push(`/workflow?workflowId=${wf.id}`);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#4EA3FF] hover:underline bg-transparent border-0 cursor-pointer"
              >
                <span>Open Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  toast(`Launching swarm execution for ${wf.name}...`, 'success');
                  router.push(`/workflow?workflowId=${wf.id}`);
                }}
                className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer border-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
