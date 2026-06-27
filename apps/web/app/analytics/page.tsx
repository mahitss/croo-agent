'use client';

import { useState } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import Link from 'next/link';
import { 
  TrendingUp, 
  Activity, 
  Cpu, 
  Layers, 
  DollarSign, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  Download,
  AlertTriangle,
  Play
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

export default function AnalyticsPage() {
  const agents = useNexusStore((state) => state.agents);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock revenue trends data
  const revenueTrendData = [
    { name: 'Wk 1', revenue: 240, cost: 80 },
    { name: 'Wk 2', revenue: 380, cost: 110 },
    { name: 'Wk 3', revenue: 512, cost: 140 },
    { name: 'Wk 4', revenue: 450, cost: 130 }
  ];

  // AI Inference Provider Distribution
  const aiProviderData = [
    { name: 'Gemini 1.5 Pro', value: 55, color: '#00ffcc' },
    { name: 'Gemini 1.5 Flash', value: 30, color: '#00e5ff' },
    { name: 'OpenAI GPT-4o', value: 15, color: '#8b5cf6' }
  ];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Header & Range Selector */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-neon" />
            Performance Analytics
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Analyze swarm workflows cost execution, SLA reliability, and developer revenue margins.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex border border-border-dark rounded-xl overflow-hidden bg-black/40">
            {([
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' },
              { key: '90d', label: '90 Days' },
              { key: '1y', label: '1 Year' }
            ] as const).map((range) => (
              <button
                key={range.key}
                onClick={() => setDateRange(range.key)}
                className={`text-[10px] px-3.5 py-2 font-bold font-mono transition-all border-r last:border-0 border-border-dark uppercase ${
                  dateRange === range.key
                    ? 'text-primary-neon bg-primary-neon/5 font-extrabold'
                    : 'text-gray-400 hover:text-white hover:bg-white/2'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="bg-white/5 border border-border-dark hover:bg-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors font-mono">
            <Download className="w-4 h-4" />
            EXPORT
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Cumulative Revenue', val: '1,582.42 USDC', change: '↑ 14% this month', color: 'text-primary-neon' },
          { label: 'Workflow Success Rate', val: '98.2%', change: 'SLA standard met', color: 'text-green-400' },
          { label: 'AI Inference Spend', val: '312.50 USDC', change: 'Avg 820ms latency', color: 'text-secondary-neon' },
          { label: 'Registered Agent Swarms', val: '12 Active', change: '100% network uptime', color: 'text-accent-blue' }
        ].map((kpi, idx) => (
          <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest font-bold">{kpi.label}</span>
              <h2 className={`text-xl font-extrabold mt-2 font-mono ${kpi.color}`}>{kpi.val}</h2>
            </div>
            <div className="text-[9px] text-gray-400 font-mono mt-2">{kpi.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[340px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <DollarSign className="w-4 h-4 text-primary-neon" />
            Revenue vs. Spend Trends (USDC)
          </h3>
          <div className="flex-grow text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ffcc" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00ffcc" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff007f" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ff007f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1b1e25', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00ffcc" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} name="Earnings" />
                <Area type="monotone" dataKey="cost" stroke="#ff007f" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} name="Spend" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Provider Pie Chart */}
        <div className="lg:col-span-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[340px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-mono">
            <Cpu className="w-4 h-4 text-accent-blue" />
            AI Provider Distribution
          </h3>
          <div className="flex-grow flex justify-center items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={aiProviderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {aiProviderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-[10px] text-gray-400">
            {aiProviderData.map((prov, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: prov.color }}></span>
                  {prov.name}
                </span>
                <span className="text-white font-bold">{prov.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agent Performance Log Table */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-border-dark flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
              <Activity className="w-4 h-4 text-secondary-neon" />
              Agent SLA Performance Matrix
            </h3>

            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left">
                <thead className="bg-white/2 text-[9px] text-gray-500 font-mono uppercase border-b border-border-dark">
                  <tr>
                    <th className="py-2 px-3">Agent</th>
                    <th className="py-2 px-3">Invocations</th>
                    <th className="py-2 px-3">SLA Uptime</th>
                    <th className="py-2 px-3">Avg Latency</th>
                    <th className="py-2 px-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark font-mono">
                  {agents.slice(0, 4).map((agent) => (
                    <tr key={agent.id} className="hover:bg-white/1 transition-colors text-gray-300">
                      <td className="py-2.5 px-3 text-white font-bold">{agent.name}</td>
                      <td className="py-2.5 px-3">{agent.verificationCount} runs</td>
                      <td className="py-2.5 px-3 text-primary-neon">{agent.trustScore}%</td>
                      <td className="py-2.5 px-3">{agent.latency}ms</td>
                      <td className="py-2.5 px-3 text-right text-white font-bold">{(agent.price * agent.verificationCount).toFixed(2)} USDC</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* WOW Feature: AI Business Advisor */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                AI Business Advisor
              </h3>
            </div>
            
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between border-b border-border-dark pb-2">
                <span className="text-gray-500">Business Health</span>
                <span className="text-primary-neon font-bold uppercase">Excellent</span>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[9px] text-gray-500 uppercase">SUGGESTED ACTION</span>
                <p className="text-gray-300 text-[10px] leading-relaxed">
                  Publish a <strong className="text-white">Translation</strong> version capability parameter for your core Swarm Research Agent.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-gray-500 uppercase">PLANNER RATIONALE</span>
                <p className="text-gray-400 text-[10px] leading-relaxed">
                  Multilingual localization query workflows increased by <strong className="text-white">43%</strong> across the developer workspace index this week.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-dark flex items-center justify-between mt-4">
            <div className="flex flex-col font-mono">
              <span className="text-[9px] text-gray-500 uppercase">EST. ADD. REVENUE</span>
              <span className="text-secondary-neon font-bold text-xs">+92.00 USDC</span>
            </div>
            <Link 
              href="/registry" 
              className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-[10px] font-extrabold px-3.5 py-2 rounded-lg hover:brightness-110 transition-all font-mono uppercase"
            >
              Publish Swarm
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
