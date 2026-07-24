'use client';

import { useState } from 'react';
import { Activity, TrendingUp, Cpu, Zap, BarChart3, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Swarm Analytics & Performance
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time telemetry, latency metrics, and network throughput across deployed AI agent nodes.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#111111] border border-[#232323] p-1 rounded-xl">
          {(['24h', '7d', '30d'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all border-0 cursor-pointer ${
                timeframe === tf ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white bg-transparent'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Avg Response Latency</span>
            <Clock className="w-4 h-4 text-[#4EA3FF]" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">420 ms</span>
          <span className="text-[10px] text-emerald-400 font-mono">↓ 12ms faster than baseline</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Execution Success SLA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">99.82%</span>
          <span className="text-[10px] text-gray-500 font-mono">0 failed steps in last 500 tasks</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Throughput</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">18.4 req/s</span>
          <span className="text-[10px] text-emerald-400 font-mono">↑ 24% load capacity available</span>
        </div>
      </div>

      {/* Visual Chart Mockup */}
      <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
            Execution Velocity & Node Throughput
          </h3>
          <span className="text-xs text-[#4EA3FF] font-mono">Live Telemetry</span>
        </div>

        <div className="h-48 w-full flex items-end justify-between gap-2 pt-8 pb-2 border-b border-[#232323]">
          {[40, 65, 30, 85, 90, 75, 95, 60, 80, 100, 70, 90, 85, 95, 110, 105, 120].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div 
                style={{ height: `${h}%` }} 
                className="w-full bg-gradient-to-t from-[#4EA3FF]/20 to-[#4EA3FF] rounded-t group-hover:brightness-125 transition-all" 
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
