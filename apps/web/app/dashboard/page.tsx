'use client';

import { useNexusStore } from '../../store/nexusStore';
import Link from 'next/link';
import { 
  TrendingUp, 
  Activity, 
  Users, 
  Clock, 
  ArrowUpRight, 
  Award,
  DollarSign,
  PlusCircle,
  Layers,
  Wallet,
  Cpu,
  Bell,
  CheckCircle,
  AlertCircle,
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
  Cell 
} from 'recharts';

export default function DashboardPage() {
  const agents = useNexusStore((state) => state.agents);
  const agentWallets = useNexusStore((state) => state.agentWallets);

  // Mock revenue metrics over past hours
  const revenueChartData = [
    { hour: '08:00', volume: 4.2 },
    { hour: '09:00', volume: 8.5 },
    { hour: '10:00', volume: 14.8 },
    { hour: '11:00', volume: 22.1 },
    { hour: '12:00', volume: 32.5 },
    { hour: '13:00', volume: 45.3 },
    { hour: '14:00', volume: 55.7 }
  ];

  // Leaderboard data calculation
  const leaderboard = [...agents]
    .map(agent => ({
      ...agent,
      earnings: agentWallets[agent.id]?.balance || 0
    }))
    .sort((a, b) => b.trustScore - a.trustScore);

  const earningsChartData = leaderboard.slice(0, 5).map(agent => ({
    name: agent.name.split(' ')[0],
    earnings: agent.earnings
  }));

  const metrics = [
    { label: 'Active Workflows', value: '3 Running', icon: Layers, color: 'text-primary-neon' },
    { label: 'Wallet Balance', value: '84.20 USDC', icon: Wallet, color: 'text-accent-blue' },
    { label: 'Published Agents', value: `${agents.length} Nodes`, icon: Cpu, color: 'text-secondary-neon' },
    { label: 'Platform Revenue', value: '$1,245 USDC', icon: DollarSign, color: 'text-yellow-400' },
  ];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Welcome Banner */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            👋 Welcome back, Mahit
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1 leading-relaxed">
            You have 3 active workflows, 12 published agents, and $84.20 USDC available in your wallet.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link 
            href="/workflow" 
            className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-4 py-2.5 rounded-lg hover:brightness-110 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Workflow
          </Link>
          <Link 
            href="/registry" 
            className="bg-white/5 border border-border-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Cpu className="w-4 h-4 text-secondary-neon" />
            Publish Agent
          </Link>
        </div>
      </div>

      {/* Overview Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">
                  {m.label}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {m.value}
                </h3>
              </div>
              <div className={`p-3 rounded-lg bg-white/3 ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Active Workflows & Wallet & AI Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Workflows Widget */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <Layers className="w-4 h-4 text-primary-neon" />
            Active Swarm Workflows
          </h3>
          <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-1">
            {[
              { name: "Research Tesla Q1", progress: 72, cost: 1.25, time: "2m remaining" },
              { name: "Verify Legal SLA", progress: 35, cost: 0.85, time: "5m remaining" },
              { name: "Translate Slide Deck", progress: 90, cost: 0.40, time: "30s remaining" }
            ].map((wf, idx) => (
              <div key={idx} className="border border-border-dark p-3 rounded-lg flex flex-col gap-2 bg-black/10">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>{wf.name}</span>
                  <span className="text-primary-neon font-mono">{wf.progress}%</span>
                </div>
                <div className="w-full bg-border-dark h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-neon h-full transition-all" style={{ width: `${wf.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>{wf.time}</span>
                  <span className="text-white">{wf.cost.toFixed(2)} USDC</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Summary Widget */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-mono">
            <Wallet className="w-4 h-4 text-accent-blue" />
            Wallet Escrow Overview
          </h3>
          <div className="my-4 flex flex-col gap-2">
            <div className="flex justify-between text-xs py-1.5 border-b border-border-dark">
              <span className="text-gray-400">Available Balance</span>
              <span className="text-white font-mono font-bold">84.20 USDC</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-border-dark">
              <span className="text-gray-400">Reserved (Escrow Lock)</span>
              <span className="text-yellow-400 font-mono font-bold">12.50 USDC</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-border-dark">
              <span className="text-gray-400">Pending Approvals</span>
              <span className="text-gray-500 font-mono">0.00 USDC</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/wallet" className="bg-white/5 border border-border-dark hover:bg-white/10 text-white text-[10px] font-bold py-2 rounded-lg text-center font-mono">
              Deposit
            </Link>
            <Link href="/wallet" className="bg-white/5 border border-border-dark hover:bg-white/10 text-white text-[10px] font-bold py-2 rounded-lg text-center font-mono">
              Withdraw
            </Link>
            <Link href="/wallet" className="bg-white/5 border border-border-dark hover:bg-white/10 text-white text-[10px] font-bold py-2 rounded-lg text-center font-mono">
              Transfer
            </Link>
          </div>
        </div>

        {/* AI Usage Card */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-mono">
            <Cpu className="w-4 h-4 text-secondary-neon" />
            AI Reasoning Spend
          </h3>
          <div className="flex-grow flex flex-col gap-3 justify-center text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Today's Tokens</span>
              <span className="text-white font-mono">1,489,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Inference Cost</span>
              <span className="text-secondary-neon font-mono font-bold">0.89 USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average Latency</span>
              <span className="text-white font-mono">820ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Primary Model</span>
              <span className="text-accent-blue font-mono font-bold">Gemini-1.5-Pro</span>
            </div>
          </div>
          <div className="text-[10px] text-gray-500 font-mono text-center pt-2 border-t border-border-dark">
            ▲ 12% token velocity change today
          </div>
        </div>

      </div>

      {/* Row 3: Activity Feed & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity Timeline */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <Activity className="w-4 h-4 text-primary-neon" />
            Recent Platform Activity
          </h3>
          <div className="flex-grow flex flex-col gap-4 overflow-y-auto text-xs pr-1">
            {[
              { time: "10:31", title: "Workflow completed", desc: "Tesla Q1 research DAG verify passes", icon: CheckCircle, color: "text-primary-neon" },
              { time: "10:29", title: "Payment settled", desc: "1.25 USDC released to escrow nodes", icon: DollarSign, color: "text-accent-blue" },
              { time: "10:25", title: "Agent published", desc: "InsightFinder Pro indexed on-chain", icon: Cpu, color: "text-secondary-neon" }
            ].map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-[10px] text-gray-500 font-mono py-0.5">{act.time}</span>
                  <div className={`p-1.5 rounded bg-white/2 ${act.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{act.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{act.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <Bell className="w-4 h-4 text-yellow-400" />
            Unread Notifications
          </h3>
          <div className="flex-grow flex flex-col gap-3 overflow-y-auto text-xs pr-1">
            {[
              { title: "SLA Warning", msg: "QuickScan latency exceeded 800ms limit threshold", type: "warn" },
              { title: "Escrow Deposited", msg: "Reserved 1.25 USDC for Tesla Q1 intention", type: "info" }
            ].map((notif, idx) => (
              <div key={idx} className="border border-border-dark p-3 rounded-lg flex items-start gap-2.5 bg-black/10">
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${notif.type === 'warn' ? 'text-yellow-500' : 'text-accent-blue'}`} />
                <div className="flex flex-col">
                  <span className="font-bold text-white">{notif.title}</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 font-mono leading-relaxed">{notif.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 4: Marketplace Insights & Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Swarm Transactions Volume */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <TrendingUp className="w-4 h-4 text-primary-neon" />
            Swarm Volume Flow (Past 6 Hours)
          </h3>
          <div className="flex-grow text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ffcc" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00ffcc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1b1e25', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#00ffcc' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#00ffcc" fillOpacity={1} fill="url(#colorVolume)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Agent Earners */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
            <DollarSign className="w-4 h-4 text-secondary-neon" />
            Top Earning Agent Nodes (Current Session)
          </h3>
          <div className="flex-grow text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1b1e25', borderRadius: '8px' }}
                  itemStyle={{ color: '#ff007f' }}
                />
                <Bar dataKey="earnings" fill="#ff007f" radius={[4, 4, 0, 0]}>
                  {earningsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ff007f' : '#ff007fcc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="glass-card p-5 rounded-xl border border-border-dark">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5 font-mono">
          <Award className="w-4.5 h-4.5 text-accent-blue" />
          NEXUS Leaderboard: Trust & Quality Ratings
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="bg-white/2 font-mono text-[10px] text-gray-500 uppercase border-b border-border-dark">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Agent Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Trust Score</th>
                <th className="py-3 px-4">Avg Latency</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Reviews</th>
                <th className="py-3 px-4 text-right">Escrow Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {leaderboard.map((agent, index) => (
                <tr key={agent.id} className="hover:bg-white/1 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    #{index + 1}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white flex flex-col">
                    <span>{agent.name}</span>
                    <span className="text-[10px] text-gray-500 font-normal font-mono">{agent.id}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-white/3 border border-border-dark px-2 py-0.5 rounded text-gray-300">
                      {agent.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-primary-neon font-bold">
                    {agent.trustScore}%
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {agent.latency}ms
                  </td>
                  <td className="py-3.5 px-4 font-mono text-white">
                    {agent.accuracy}%
                  </td>
                  <td className="py-3.5 px-4">
                    {agent.rating}⭐ ({agent.reviewsCount})
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    {agent.earnings.toFixed(2)} USDC
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
