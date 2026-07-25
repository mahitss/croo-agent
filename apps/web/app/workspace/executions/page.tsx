'use client';

import { useState } from 'react';
import AppLayout from '../../../components/AppLayout';
import { Play, CheckCircle2, Clock, ArrowRight, ShieldCheck, Terminal, Cpu, RotateCcw, XCircle, ChevronRight, Activity, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function ExecutionsPage() {
  const [selectedExecution, setSelectedExecution] = useState<any>({
    id: 'run-102',
    workflow: 'Sales Lead Outreach Swarm',
    status: 'Running',
    progress: 68,
    duration: '12m 45s',
    cost: '$0.50',
    tokens: '42,800 tokens',
    latency: '340ms',
    failures: 0,
    retries: 1,
    time: 'Today 10:02 AM',
    target: '/workspace/sales-outreach',
    nodes: [
      { id: 'n1', name: 'Web Search Engine AI', status: 'Completed', latency: '210ms', output: 'Fetched 15 lead targets.' },
      { id: 'n2', name: 'Lead Score Classifier', status: 'Running', latency: '340ms', output: 'Scoring leads 1-10...' },
      { id: 'n3', name: 'Email Drafter Scribe', status: 'Pending', latency: '-', output: 'Waiting for node n2...' },
    ],
    logs: [
      '[10:02:01] Initialized swarm execution on CROO mainnet (Run ID: run-102)',
      '[10:02:05] Node n1 (Web Search) dispatched to worker agent-01',
      '[10:02:14] Node n1 finished execution in 210ms (1.50 USDC escrow locked)',
      '[10:02:18] Node n2 (Lead Score Classifier) started processing batch...',
    ]
  });

  const executionsList = [
    { id: 'run-102', workflow: 'Sales Lead Outreach Swarm', status: 'Running', progress: 68, time: '10:02 AM' },
    { id: 'run-101', workflow: 'Research Consensus Agent Swarm', status: 'Completed', progress: 100, time: '09:14 AM' },
    { id: 'run-103', workflow: 'Legal GDPR Compliance Audit', status: 'Completed', progress: 100, time: 'Yesterday' },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6 font-sans select-none animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Execution Center Inspector
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Live DAG node progress, streaming execution logs, token throughput, and real-time execution replay.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> Replay Execution
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 cursor-pointer">
              <XCircle className="w-3.5 h-3.5" /> Cancel Run
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT: Executions List on Left, Rich Inspector on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Selectable Runs */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">Active & Past Runs</span>
            <div className="flex flex-col gap-2">
              {executionsList.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExecution((prev: any) => ({ ...prev, ...ex }))}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedExecution.id === ex.id
                      ? 'bg-[#111111] border-[#4EA3FF] shadow-lg'
                      : 'bg-[#111111]/60 border-[#232323] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4EA3FF]">{ex.id}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      ex.status === 'Running' ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {ex.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{ex.workflow}</h4>
                  
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>Progress</span>
                      <span>{ex.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#050505] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4EA3FF] rounded-full transition-all" style={{ width: `${ex.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Execution Inspector Detail */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Real-time Telemetry Metrics Bar */}
            <div className="grid grid-cols-4 gap-3 bg-[#111111] p-4 rounded-2xl border border-[#232323] text-xs font-mono">
              <div><span className="text-gray-500 block text-[10px]">Tokens Throughput</span><span className="text-white font-bold">{selectedExecution.tokens}</span></div>
              <div><span className="text-gray-500 block text-[10px]">Avg Latency</span><span className="text-emerald-400 font-bold">{selectedExecution.latency}</span></div>
              <div><span className="text-gray-500 block text-[10px]">Cost Settled</span><span className="text-purple-400 font-bold">{selectedExecution.cost}</span></div>
              <div><span className="text-gray-500 block text-[10px]">Retries / Failures</span><span className="text-amber-400 font-bold">{selectedExecution.retries} / {selectedExecution.failures}</span></div>
            </div>

            {/* Live Agent DAG Node Inspector */}
            <div className="bg-[#111111] p-5 rounded-2xl border border-[#232323] space-y-4">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">Live Execution DAG Node Graph</span>
              
              <div className="space-y-3">
                {selectedExecution.nodes.map((node: any, idx: number) => (
                  <div key={node.id} className="p-3 bg-[#050505] border border-[#232323] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white/5 font-mono text-[10px] flex items-center justify-center text-gray-400 font-bold">{idx + 1}</span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{node.name}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{node.output}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px]">
                      <span className="text-gray-400">{node.latency}</span>
                      <span className={`px-2 py-0.5 rounded border ${
                        node.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        node.status === 'Running' ? 'bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]' :
                        'bg-white/5 border-white/10 text-gray-500'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Streaming Logs */}
            <div className="bg-[#050505] p-4 rounded-2xl border border-[#232323] font-mono text-xs text-gray-300 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-gray-500 border-b border-[#232323] pb-2">
                <span className="flex items-center gap-1.5 text-[#4EA3FF] font-bold"><Terminal className="w-3.5 h-3.5" /> Streaming Execution Terminal Log</span>
                <span>CROO Runtime v2.4</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto text-[11px] leading-relaxed">
                {selectedExecution.logs.map((log: string, idx: number) => (
                  <div key={idx} className="text-gray-400"><span className="text-[#4EA3FF] font-bold">›</span> {log}</div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
