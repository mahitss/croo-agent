'use client';

import { useState } from 'react';
import { Agent } from '@nexus-ai/types';
import { X, Award, BarChart3, BookOpen, Layers, DollarSign, MessageSquare, ShieldCheck, Play } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface AgentDetailModalProps {
  agent: Agent;
  onClose: () => void;
}

export default function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'pricing' | 'reviews' | 'analytics' | 'api'>('overview');
  const [apiInput, setApiInput] = useState(`{\n  "prompt": "Evaluate market trends for Tesla in Q1 2026",\n  "max_results": 5\n}`);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiTesting, setApiTesting] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'capabilities', label: 'Capabilities', icon: Layers },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'api', label: 'Interactive API', icon: Play },
  ] as const;

  // Mock analytics charts
  const performanceData = [
    { day: 'Mon', latency: agent.latency - 50 },
    { day: 'Tue', latency: agent.latency + 20 },
    { day: 'Wed', latency: agent.latency - 10 },
    { day: 'Thu', latency: agent.latency + 80 },
    { day: 'Fri', latency: agent.latency }
  ];

  const pieData = [
    { name: 'Success', value: 100 - agent.failureRate, color: '#00ffcc' },
    { name: 'Failure', value: agent.failureRate, color: '#ff007f' }
  ];

  const runTestApi = () => {
    setApiTesting(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiTesting(false);
      try {
        const parsed = JSON.parse(apiInput);
        setApiResponse(JSON.stringify({
          status: "success",
          txHash: "0x" + Math.random().toString(16).substr(2, 40),
          agentId: agent.id,
          payload: {
            resolved_query: parsed.prompt || "Default query context",
            confidence_score: (agent.accuracy / 100).toFixed(2),
            timestamp: new Date().toISOString(),
            data: {
              metric: "Tesla Neural Engine Analysis",
              source: "Official custom schema",
              summary: "Tesla FSD chips HW4 running on 4nm architecture."
            }
          }
        }, null, 2));
      } catch (err: any) {
        setApiResponse(JSON.stringify({
          status: "failed",
          error: "Invalid JSON input structure",
          details: err.message
        }, null, 2));
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="glass-card border border-border-dark w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-dark flex justify-between items-center bg-card-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-md">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white leading-none">{agent.name}</h2>
                <span className="text-[9px] font-mono bg-white/5 border border-border-dark text-gray-400 px-1.5 py-0.5 rounded">
                  v{agent.version}
                </span>
                {agent.trustScore >= 95 && (
                  <span className="flex items-center gap-0.5 text-[8px] bg-primary-neon/15 text-primary-neon px-1.5 py-0.5 rounded font-mono border border-primary-neon/20">
                    <Award className="w-3.5 h-3.5" /> VERIFIED
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Wallet: {agent.walletAddress}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border-dark bg-black/20 overflow-x-auto scrollbar-none px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-[11px] font-mono border-b-2 transition-colors shrink-0 ${
                  isActive 
                    ? 'border-primary-neon text-primary-neon bg-white/2' 
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-gray-300 scrollbar-thin">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-white mb-1 uppercase font-mono tracking-wider">Description</h3>
                <p className="leading-relaxed text-gray-400">{agent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border-dark">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-mono">ENDPOINT URL</span>
                  <span className="font-mono text-white select-all bg-white/3 border border-border-dark p-2 rounded">{agent.endpoint}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-mono">RATING SUMMARY</span>
                  <span className="text-white font-bold p-2">{agent.rating} / 5.0 ★ ({agent.reviewsCount} verified audits)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-border-dark">
                <span className="text-[10px] text-gray-500 font-mono">SKILLS INDEXED</span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map((s, idx) => (
                    <span key={idx} className="bg-white/3 border border-border-dark px-2.5 py-1 rounded text-white">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAPABILITIES */}
          {activeTab === 'capabilities' && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-white mb-2 uppercase font-mono tracking-wider">Input Payload Definition (JSON)</h3>
                <pre className="bg-black/50 border border-border-dark p-3 rounded-lg font-mono text-[10px] text-accent-blue overflow-x-auto">
{`{
  "prompt": "string (Natural language prompt request)",
  "budget_limit": "float (Maximum allowable USDC for transaction)",
  "routing_strategy": "string ('balanced' | 'cheapest' | 'fastest' | 'accuracy')"
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 uppercase font-mono tracking-wider">Output Response Schema (JSON)</h3>
                <pre className="bg-black/50 border border-border-dark p-3 rounded-lg font-mono text-[10px] text-primary-neon overflow-x-auto">
{`{
  "status": "string ('success' | 'failed')",
  "transaction_hash": "string (CROO on-chain payment proof)",
  "data": {
    "summary": "string (Formatted execution summaries)",
    "accuracy_rating": "float (SLA confirmation output percentage)"
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">PAY PER REQUEST</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Ideal for occasional workflow runs.</p>
                </div>
                <h2 className="text-xl font-bold text-primary-neon font-mono">
                  {agent.price.toFixed(2)} <span className="text-xs text-gray-500 font-normal">USDC / call</span>
                </h2>
              </div>
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">ORGANIZATION BULK</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Pre-purchase credits for 15% discount.</p>
                </div>
                <h2 className="text-xl font-bold text-accent-blue font-mono">
                  {(agent.price * 0.85).toFixed(2)} <span className="text-xs text-gray-500 font-normal">USDC / call</span>
                </h2>
              </div>
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">ENTERPRISE API</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Unlimited usage up to 10k calls/mo.</p>
                </div>
                <h2 className="text-xl font-bold text-secondary-neon font-mono">
                  {(agent.price * 1200).toFixed(0)} <span className="text-xs text-gray-500 font-normal">USDC / mo</span>
                </h2>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-3 font-mono text-[10px]">
              <div className="border border-border-dark p-3 rounded-lg bg-white/2">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white">0xLegalAudit...99</span>
                  <span className="text-primary-neon">5.0 ★</span>
                </div>
                <p className="text-gray-400">Excellent SLA latency. The calculations matched local benchmarks precisely.</p>
              </div>
              <div className="border border-border-dark p-3 rounded-lg bg-white/2">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white">0xFinanceSwa...32</span>
                  <span className="text-primary-neon">4.8 ★</span>
                </div>
                <p className="text-gray-400">Consistent translation semantics. Minor formatting glitch resolved on retry.</p>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-2 gap-4 h-[220px]">
              <div className="border border-border-dark p-3 rounded-xl bg-black/40 flex flex-col text-[10px]">
                <span className="font-bold text-white mb-2 font-mono">SLA LATENCY TRENDS (ms)</span>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ left: -30, right: 10 }}>
                      <XAxis dataKey="day" stroke="#4b5563" fontSize={8} />
                      <YAxis stroke="#4b5563" fontSize={8} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1b1e25', fontSize: '8px' }} />
                      <Line type="monotone" dataKey="latency" stroke="#00ffcc" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="border border-border-dark p-3 rounded-xl bg-black/40 flex flex-col text-[10px]">
                <span className="font-bold text-white mb-2 font-mono">EXECUTION RATIO</span>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={50}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1b1e25', fontSize: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* API DOCS */}
          {activeTab === 'api' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-white font-mono">Request Payload (JSON Body)</span>
                <textarea
                  className="w-full bg-black/50 border border-border-dark focus:border-primary-neon/40 p-3 rounded-lg font-mono text-[10px] text-white outline-none resize-none h-[150px]"
                  value={apiInput}
                  onChange={(e) => setApiInput(e.target.value)}
                />
                <button
                  onClick={runTestApi}
                  disabled={apiTesting}
                  className="bg-primary-neon text-black font-extrabold py-2.5 rounded-lg hover:brightness-110 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-wide"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  {apiTesting ? 'EXECUTING_NODE_HANDSHAKE...' : 'TEST_NODE_ENDPOINT'}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold text-white font-mono">Interactive Output Logger</span>
                <div className="bg-black/60 border border-border-dark p-3 rounded-lg font-mono text-[9px] h-[190px] overflow-y-auto scrollbar-thin text-gray-400 select-all leading-relaxed whitespace-pre-wrap">
                  {apiResponse ? apiResponse : apiTesting ? '// Executing secure node handshake...' : '// Click execute to run endpoint simulation.'}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
