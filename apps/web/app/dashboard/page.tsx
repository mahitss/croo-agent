'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { 
  Cpu, 
  Activity, 
  Wallet, 
  Shield, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Terminal, 
  Clock, 
  Bot,
  Server,
  DollarSign,
  TrendingUp,
  Radio
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const environment = useAuthStore((state) => state.environment) || 'demo';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayName = user?.displayName || user?.username || 'Executive Operator';

  const systemAlerts = [
    { id: 'alt-1', title: 'High Token Throughput', text: 'Groq provider model processing 30k RPM.', time: '4m ago', severity: 'info' },
    { id: 'alt-2', title: 'Escrow Settlement Cleared', text: '1.50 USDC transferred for run-101.', time: '18m ago', severity: 'success' },
  ];

  const liveEvents = [
    { id: 'ev-1', type: 'EXECUTION', desc: 'Sales Outreach Swarm step 2 completed', time: 'Just now' },
    { id: 'ev-2', type: 'ROUTING', desc: 'Routed prompt to claude-3-5-sonnet (340ms)', time: '2m ago' },
    { id: 'ev-3', type: 'NODE_HEARTBEAT', desc: 'Worker node ag-search-1 emitted SLA 99%', time: '5m ago' },
    { id: 'ev-4', type: 'ESCROW_LOCK', desc: 'Locked 2.00 USDC for research-consensus DAG', time: '12m ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 select-none animate-fade-in font-sans">
      
      {/* Top Mission Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-emerald-400 animate-pulse" /> Mission Control Telemetry
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Global operations dashboard for operator <span className="text-white font-semibold">{displayName}</span>. Environment: <span className="font-mono text-emerald-400 font-bold uppercase">{environment}</span>.
          </p>
        </div>
      </div>

      {/* Global Mission Control KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Cost Today</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">$14.20 USDC</div>
          <span className="text-[10px] text-gray-500 font-mono">+12.4% vs 24h avg</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Resource Usage</span>
            <Cpu className="w-4 h-4 text-[#4EA3FF]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">42.8% CPU</div>
          <span className="text-[10px] text-gray-500 font-mono">18.4 GB RAM / 64 GB</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Running Swarms</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">2 Active Runs</div>
          <span className="text-[10px] text-gray-500 font-mono">Avg Latency: 290ms</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Active System Alerts</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">0 Critical</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% SLA Compliant</span>
        </div>
      </div>

      {/* System Health Summary & Live Telemetry Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: System Health & Microservices Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-[#4EA3FF]" /> Microservice Cluster Health Summary
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { name: 'API Gateway', status: 'Operational', latency: '12ms' },
                { name: 'Auth Service', status: 'Operational', latency: '18ms' },
                { name: 'Agent Worker Cluster', status: '12/12 Nodes', latency: '210ms' },
                { name: 'CAP Blockchain RPC', status: 'Synced', latency: '45ms' },
              ].map((svc) => (
                <div key={svc.name} className="p-3 bg-[#050505] border border-[#232323] rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-500 block truncate">{svc.name}</span>
                  <span className="text-xs font-bold text-white block">{svc.status}</span>
                  <span className="text-[9px] text-emerald-400 block">{svc.latency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> Live Platform Activity Feed
            </h3>

            <div className="space-y-3 text-xs font-mono">
              {liveEvents.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between p-3 bg-[#050505] border border-[#232323] rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-[#4EA3FF] border border-white/5">{ev.type}</span>
                    <span className="text-gray-300 text-[11px]">{ev.desc}</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">{ev.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active System Alerts */}
        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Active System Notifications
            </h3>

            <div className="space-y-3">
              {systemAlerts.map((alt) => (
                <div key={alt.id} className="p-3 bg-[#050505] border border-[#232323] rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="font-bold text-amber-400">{alt.title}</span>
                    <span className="text-gray-500">{alt.time}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] leading-relaxed">{alt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
