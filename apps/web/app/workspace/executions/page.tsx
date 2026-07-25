'use client';

import AppLayout from '../../../components/AppLayout';
import { Play, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ExecutionsPage() {
  const executions = [
    { id: 'run-101', workflow: 'Research Consensus Agent Swarm', status: 'Completed', duration: '42s', cost: '$0.35', time: 'Today 10:14 AM', target: '/workspace/research-agent' },
    { id: 'run-102', workflow: 'Sales Lead Outreach Swarm', status: 'Running', duration: '12m', cost: '$0.50', time: 'Today 10:02 AM', target: '/workspace/sales-outreach' },
    { id: 'run-103', workflow: 'Legal GDPR Compliance Audit', status: 'Completed', duration: '1m 15s', cost: '$0.25', time: 'Yesterday 04:30 PM', target: '/workspace/compliance-audit' },
    { id: 'run-104', workflow: 'Finance Risk & Volatility Swarm', status: 'Completed', duration: '2m 04s', cost: '$0.80', time: 'Jul 22, 2026', target: '/workspace/finance' },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-[#4EA3FF]" /> Workflow Execution History
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Audit log of all past and running swarm workflow executions.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          <div className="grid grid-cols-12 px-6 py-3.5 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
            <span className="col-span-2">Run ID</span>
            <span className="col-span-4">Workflow Name</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Duration / Cost</span>
            <span className="col-span-2 text-right">Timestamp</span>
          </div>

          {executions.map((ex) => (
            <div key={ex.id} className="grid grid-cols-12 items-center px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
              <div className="col-span-2 font-mono text-[#4EA3FF] font-semibold">{ex.id}</div>
              
              <div className="col-span-4 flex items-center gap-2">
                <Link href={ex.target} className="font-semibold text-white hover:underline no-underline truncate">
                  {ex.workflow}
                </Link>
              </div>

              <div className="col-span-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  ex.status === 'Running' 
                    ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {ex.status}
                </span>
              </div>

              <div className="col-span-2 font-mono text-gray-400">
                {ex.duration} • <span className="text-white font-bold">{ex.cost}</span>
              </div>

              <div className="col-span-2 text-right font-mono text-gray-500 text-[11px]">
                {ex.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
