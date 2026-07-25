'use client';

import { useState } from 'react';
import AppLayout from '../../components/AppLayout';
import { Server, Cpu, Activity, Clock, RefreshCw, Terminal, Globe, ShieldCheck, Search } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function InfrastructureAgentsPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedNodeLogs, setSelectedNodeLogs] = useState<any | null>(null);

  const [nodes, setNodes] = useState([
    { id: 'node-us-east-1a', name: 'Web Search Engine Worker', cpu: '24%', memory: '1.2 GB', latency: '380ms', queue: '0 pending', region: 'us-east-1 (N. Virginia)', status: 'Healthy', heartbeat: '2s ago', owner: 'Orbit Core', trust: '98%' },
    { id: 'node-us-west-2b', name: 'Claim Verification QA Node', cpu: '48%', memory: '2.8 GB', latency: '420ms', queue: '2 queued', region: 'us-west-2 (Oregon)', status: 'Healthy', heartbeat: '1s ago', owner: 'Orbit Core', trust: '96%' },
    { id: 'node-eu-west-1c', name: 'Lead Score Classifier Cluster', cpu: '12%', memory: '850 MB', latency: '290ms', queue: '0 pending', region: 'eu-west-1 (Ireland)', status: 'Healthy', heartbeat: '3s ago', owner: 'Outreach Lab', trust: '97%' },
    { id: 'node-[#7BC9FF]-prod-1', name: 'Contract PDF Legal Examiner', cpu: '64%', memory: '4.1 GB', latency: '510ms', queue: '1 queued', region: 'us-east-1 (N. Virginia)', status: 'Busy', heartbeat: '1s ago', owner: 'Legal AI Inc', trust: '99%' },
  ]);

  const handleRestartNode = (id: string, name: string) => {
    toast(`Restart signal sent to worker node "${name}".`, 'info');
  };

  const filtered = nodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()) || n.region.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Server className="w-6 h-6 text-emerald-400" /> Infrastructure Node Operations
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Cluster worker node resource allocation, memory utilization, SLA latency telemetry, and region routing.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search nodes by region or capability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Nodes Infrastructure Table */}
        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          <div className="grid grid-cols-12 px-6 py-3.5 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
            <span className="col-span-4">Node Name & Region</span>
            <span className="col-span-2">CPU / Memory</span>
            <span className="col-span-2">SLA & Latency</span>
            <span className="col-span-2">Queue & Status</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          {filtered.map((node) => (
            <div key={node.id} className="grid grid-cols-12 items-center px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
              
              <div className="col-span-4 flex flex-col gap-0.5">
                <span className="font-bold text-white text-xs">{node.name}</span>
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#4EA3FF]" /> {node.region}
                </span>
              </div>

              <div className="col-span-2 font-mono text-gray-300">
                <span>{node.cpu} CPU</span> • <span className="text-gray-500">{node.memory}</span>
              </div>

              <div className="col-span-2 font-mono">
                <span className="text-emerald-400 font-bold">{node.latency}</span> • <span className="text-gray-400">{node.trust} SLA</span>
              </div>

              <div className="col-span-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  node.status === 'Healthy' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}>
                  {node.status}
                </span>
              </div>

              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedNodeLogs(node)}
                  className="p-2 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
                  title="View Node Logs"
                >
                  <Terminal className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRestartNode(node.id, node.name)}
                  className="p-2 bg-[#050505] hover:bg-white/5 border border-[#232323] text-gray-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                  title="Restart Worker Node"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Node Logs Modal */}
        {selectedNodeLogs && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-lg w-full p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#232323] pb-3">
                <h3 className="text-sm font-bold text-white font-mono">Node Terminal Logs: {selectedNodeLogs.id}</h3>
                <button onClick={() => setSelectedNodeLogs(null)} className="text-gray-400 bg-transparent border-0 cursor-pointer">✕</button>
              </div>
              <div className="p-4 bg-[#050505] rounded-xl border border-[#232323] font-mono text-[11px] text-gray-300 space-y-1.5 max-h-60 overflow-y-auto">
                <div className="text-gray-500">[SYSTEM] Worker process initialized on host {selectedNodeLogs.region}</div>
                <div className="text-emerald-400">[HEARTBEAT] Heartbeat acknowledged {selectedNodeLogs.heartbeat} (SLA: {selectedNodeLogs.trust})</div>
                <div className="text-gray-400">[METRICS] CPU: {selectedNodeLogs.cpu} | RAM: {selectedNodeLogs.memory} | Latency: {selectedNodeLogs.latency}</div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setSelectedNodeLogs(null)} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
