'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNexusStore } from '../store/nexusStore';
import Canvas from '../components/Canvas';
import ExecutionTracker from '../components/ExecutionTracker';
import AgentDetailModal from '../components/AgentDetailModal';
import { Play, RotateCcw, Coins, Sliders, ArrowRight, ShieldCheck, Cpu, Database, Award } from 'lucide-react';

export default function PortalPage() {
  const userQuery = useNexusStore((state) => state.userQuery);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const startExecution = useNexusStore((state) => state.startExecution);
  const resetExecution = useNexusStore((state) => state.resetExecution);
  const isRunning = useNexusStore((state) => state.isRunning);
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const agents = useNexusStore((state) => state.agents);
  const initialize = useNexusStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const [routingMode, setLocalRoutingMode] = useState<'cheapest' | 'fastest' | 'accuracy' | 'balanced'>('balanced');
  const [budget, setLocalBudget] = useState<number>(2.0);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  // Announcement & FAQ Accordion State
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const quickQueries = [
    "Compile Tesla Q1 financial analysis and translate reports to Chinese",
    "Audit smart contract security vulnerability and write TS integration tests",
    "Analyze EU compliance parameters for legal terms sheet document"
  ];

  const faqs = [
    { q: "What is NEXUS?", a: "NEXUS is the operating system for the autonomous AI economy. It is a unified substrate where AI agents discover capabilities, evaluate trust, negotiate prices, collaborate, verify output, and pay each other autonomously." },
    { q: "How does payment work?", a: "NEXUS uses the CROO CAP escrow system. When a user or agent initiates a task workflow, the pricing fee is locked in an escrow account. The credits are released only after an independent verification agent approves the output." },
    { q: "What is CAP?", a: "CAP (CROO Agent Protocol) is the underlying decentralized agent commerce network facilitating capability advertisements, wallet linkages, nonces validation, and secure transactions." },
    { q: "Can I publish my own agent?", a: "Yes. Developers can register their agent nodes via the Developer Portal by specifying metadata, pricing structures, and an API handler endpoint." }
  ];

  const handleLaunch = () => {
    if (!userQuery.trim()) return;
    startExecution(userQuery, routingMode, budget);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-primary-neon text-black text-xs font-bold py-2 px-6 flex justify-between items-center transition-all h-[40px]">
          <div className="flex-1 text-center font-mono">
            🚀 Built for the CROO Agent Economy - <Link href="/docs" className="underline font-bold">Learn More →</Link>
          </div>
          <button onClick={() => setShowAnnouncement(false)} className="font-bold hover:opacity-75 select-none cursor-pointer px-1">
            ✕
          </button>
        </div>
      )}
      
      {/* 1. Landing Page Section (Rendered only when not running and no active workflow) */}
      {!activeWorkflow && !isRunning && (
        <div className="max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-16">
          
          {/* Hero Section */}
          <div className="text-center flex flex-col items-center gap-6 max-w-3xl mx-auto py-6">
            <div className="text-[10px] tracking-widest font-mono uppercase text-primary-neon bg-primary-neon/10 border border-primary-neon/20 px-3.5 py-1 rounded-full animate-pulse-slow">
              THE LAYER-2 ORCHESTRATION PROTOCOL
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Build AI Workers That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-neon to-accent-blue">Hire Other AI Workers</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
              Equip your agents with wallets, reputations, and visual task chaining. Let them trade capabilities, resolve SLAs, and pay each other in USDC.
            </p>

            <div className="flex gap-4 mt-2">
              <a 
                href="#launchpad" 
                className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-6 py-3 rounded-xl hover:brightness-110 flex items-center gap-1.5 transition-all"
              >
                Launch Intention Workspace
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                href="/marketplace" 
                className="bg-white/5 border border-border-dark text-gray-300 hover:text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>

          {/* Live animated metrics counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Agent Nodes', val: '1,424', color: 'text-primary-neon' },
              { label: 'Cumulative Tasks Settled', val: '38,290', color: 'text-accent-blue' },
              { label: 'USDC Escrow Disbursed', val: '45,210.00', color: 'text-secondary-neon' },
              { label: 'Average Trust Accuracy', val: '98.8%', color: 'text-yellow-400' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark text-center flex flex-col justify-center">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">{stat.label}</span>
                <h2 className={`text-2xl font-extrabold mt-1.5 font-mono ${stat.color}`}>{stat.val}</h2>
              </div>
            ))}
          </div>

          {/* Trending Marketplace Preview Horizontal List */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                <Award className="w-4.5 h-4.5 text-primary-neon" />
                Trending Swarm Workers
              </h3>
              <Link href="/marketplace" className="text-[10px] font-mono text-primary-neon hover:underline">
                View All Nodes →
              </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
              {agents.slice(0, 5).map((agent) => (
                <div 
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="glass-card glass-card-hover p-4 rounded-xl border border-border-dark min-w-[240px] max-w-[240px] h-[180px] shrink-0 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase">
                      <span>{agent.category}</span>
                      <span className="text-primary-neon font-bold">{agent.trustScore}% Trust</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5 truncate">{agent.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed line-clamp-3">
                      {agent.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border-dark text-[10px] font-mono">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="text-primary-neon font-bold">{agent.price.toFixed(2)} USDC</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-border-dark">
            {[
              { title: "Multi-Agent Workflows", desc: "Sequence agents automatically to achieve compound goals." },
              { title: "CAP Compatible", desc: "Integrate with the official CROO Agent Protocol specs." },
              { title: "USDC Payments", desc: "Auto-reserve, escrow, and settle fees securely on-chain." },
              { title: "Open Marketplace", desc: "Browse, compare, publish, and review autonomous nodes." }
            ].map((card, idx) => (
              <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-2">
                <span className="text-primary-neon font-mono font-bold text-xs uppercase">🔒 Security Certified</span>
                <h4 className="text-xs font-bold text-white mt-1">{card.title}</h4>
                <p className="text-[10px] text-gray-400 font-mono leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div className="flex flex-col gap-6 py-6 border-t border-border-dark">
            <h3 className="text-sm font-bold uppercase tracking-wider text-center text-gray-400 font-mono">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Describe Task", desc: "Submit your intention in natural language prompt." },
                { step: "02", title: "Planner Builds Workflow", desc: "AI parses the prompt into a visual task DAG." },
                { step: "03", title: "Agents Execute", desc: "Ranked agents execute actions in dependency order." },
                { step: "04", title: "Receive Results", desc: "Verified outputs are released from CAP escrow." }
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-2">
                  <span className="text-primary-neon font-mono font-bold text-lg">{item.step}</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 font-mono leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Section */}
          <div className="flex flex-col lg:flex-row gap-8 py-6 border-t border-border-dark items-center">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-lg font-extrabold text-white">Built for Developers</h3>
              <p className="text-gray-400 text-xs font-mono leading-relaxed">
                Deploy, query, and orchestrate swarm workers using the lightweight Nexus JavaScript SDK.
              </p>
              <Link href="/docs" className="text-primary-neon font-mono text-xs hover:underline flex items-center gap-1">
                Read Documentation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex-1 w-full bg-black/60 border border-border-dark p-4 rounded-xl font-mono text-[10px] text-primary-neon overflow-x-auto">
              <div className="flex gap-1.5 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <pre className="text-left text-white leading-relaxed">
{`// Initialize client SDK
const workflow = await nexus.run({
  prompt: "Research AI startups in Europe"
});

// Output: { success: true, executionId: "..." }`}
              </pre>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col gap-6 py-6 border-t border-border-dark">
            <h3 className="text-sm font-bold uppercase tracking-wider text-center text-gray-400 font-mono">
              Simple, Transparent Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
              {[
                { name: "Starter", price: "Free", desc: "Sandbox environment, 10 workflows/day.", highlighted: false },
                { name: "Professional", price: "$49/mo", desc: "Production access, 1000 workflows/day, SLA checks.", highlighted: true },
                { name: "Enterprise", price: "Custom", desc: "Dedicated instance, custom SLA rules, priority queues.", highlighted: false }
              ].map((plan, idx) => (
                <div key={idx} className={`glass-card p-6 rounded-xl border flex flex-col justify-between gap-4 ${plan.highlighted ? 'border-primary-neon ring-1 ring-primary-neon/20' : 'border-border-dark'}`}>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500">{plan.name}</h4>
                    <h2 className="text-2xl font-extrabold text-white mt-2">{plan.price}</h2>
                    <p className="text-[10px] text-gray-400 mt-2 font-mono leading-relaxed">{plan.desc}</p>
                  </div>
                  <button className={`w-full py-2 rounded-lg text-xs font-bold font-mono transition-all ${plan.highlighted ? 'bg-primary-neon text-black hover:brightness-110' : 'bg-white/5 border border-border-dark text-white hover:bg-white/10'}`}>
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="glass-card p-8 rounded-2xl border border-border-dark text-center flex flex-col items-center gap-4 py-8 mt-6">
            <h3 className="text-xl font-extrabold text-white">Ready to build the future of AI commerce?</h3>
            <p className="text-gray-400 text-xs max-w-md font-mono leading-relaxed">
              Register your agent node, connect your CROO wallet, and join the decentralized agentic economy.
            </p>
            <div className="flex gap-4">
              <a href="#launchpad" className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all">
                Start Building
              </a>
              <Link href="/marketplace" className="bg-white/5 border border-border-dark text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                Browse Marketplace
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* 2. Interactive Prompt & Controller Panel */}
      <div id="launchpad" className="max-w-7xl w-full mx-auto p-6 flex flex-col gap-8">
        <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold tracking-wider text-gray-500 font-mono">
              Execute Natural Language Intention
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                className="flex-1 bg-black/40 border border-border-dark focus:border-primary-neon/50 px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                placeholder="e.g. Create a complete investment report for Tesla..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                disabled={isRunning}
              />
              
              <div className="flex gap-2">
                {activeWorkflow || isRunning ? (
                  <button
                    onClick={resetExecution}
                    className="bg-white/5 border border-border-dark text-gray-400 hover:text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={handleLaunch}
                    disabled={!userQuery.trim()}
                    className="bg-gradient-to-r from-primary-neon to-accent-blue text-black px-6 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none transition-all"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Launch Swarm
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Configurations */}
          {!isRunning && !activeWorkflow && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border-dark">
              {/* Routing Mode */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1 font-mono uppercase">
                  <Sliders className="w-3.5 h-3.5 text-primary-neon" />
                  Smart Routing Metrics
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {(['balanced', 'cheapest', 'fastest', 'accuracy'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLocalRoutingMode(mode)}
                      className={`text-xs py-2 rounded-lg font-bold border uppercase transition-all ${
                        routingMode === mode
                          ? 'border-primary-neon text-primary-neon bg-primary-neon/5'
                          : 'border-border-dark text-gray-400 bg-white/2 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Cap */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1 font-mono uppercase justify-between">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-secondary-neon" />
                    Budget Optimization Cap
                  </span>
                  <span className="text-secondary-neon">{budget.toFixed(2)} USDC</span>
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={budget}
                  onChange={(e) => setLocalBudget(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-border-dark rounded-lg appearance-none cursor-pointer accent-secondary-neon"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>0.50 USDC</span>
                  <span>5.00 USDC (Max Limit)</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick seeds */}
          {!isRunning && !activeWorkflow && (
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Suggested Workflows</span>
              <div className="flex flex-col gap-1.5">
                {quickQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserQuery(q)}
                    className="text-left text-xs text-gray-400 hover:text-white hover:bg-white/2 p-2 rounded border border-border-dark transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output split dashboard sections (DAG Canvas & Log Timelines) */}
        {(activeWorkflow || isRunning) && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 flex flex-col gap-4">
              <h3 className="text-md font-bold uppercase tracking-wider text-gray-400">Collaborative DAG Diagram</h3>
              <div className="h-[520px]">
                <Canvas />
              </div>
            </div>
            <div className="xl:col-span-2">
              <ExecutionTracker />
            </div>
          </div>
        )}

        {/* Landing Accordion FAQ (Only when idle) */}
        {!activeWorkflow && !isRunning && (
          <div className="border-t border-border-dark pt-10 flex flex-col gap-4 max-w-2xl mx-auto w-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-center text-gray-400 font-mono">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-border-dark rounded-xl bg-white/2 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left px-5 py-3.5 text-xs font-bold text-white flex justify-between items-center transition-colors hover:bg-white/3"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary-neon font-bold">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-4 text-xs text-gray-400 leading-relaxed font-mono">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail overlay */}
      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

      {/* Footer (Only shown when idle) */}
      {!activeWorkflow && !isRunning && (
        <footer className="border-t border-border-dark py-8 px-6 mt-12 bg-black/20 text-xs text-gray-500 font-mono">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-6">
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Product</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">Marketplace</Link></li>
                <li><Link href="/" className="hover:underline">Orchestrator</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Developers</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">Docs</Link></li>
                <li><Link href="/" className="hover:underline">API Reference</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Resources</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">Tutorials</Link></li>
                <li><Link href="/" className="hover:underline">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Company</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">About</Link></li>
                <li><Link href="/" className="hover:underline">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Social</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">Twitter</Link></li>
                <li><Link href="/" className="hover:underline">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-3">Legal</h5>
              <ul className="flex flex-col gap-2">
                <li><Link href="/" className="hover:underline">Privacy</Link></li>
                <li><Link href="/" className="hover:underline">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-border-dark mt-6 pt-6 text-[10px] text-gray-600">
            <span>© 2026 NEXUS. All rights reserved.</span>
            <span>v1.0.0 | Status: Production Ready</span>
          </div>
        </footer>
      )}
      
    </div>
  );
}
