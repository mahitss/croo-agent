'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useNexusStore } from '../store/nexusStore';
import { useAuthStore } from '../store/authStore';
import { useUserWallet } from '../hooks/useUserWallet';
import { apiService } from '../services/api';
import { 
  Play, 
  Sliders, 
  Coins, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Globe, 
  Terminal, 
  Award,
  Wallet,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../components/Toast';

// Live Activity Feed Component showing real-time agent commerce updates
function LiveActivityFeed() {
  const [feed, setFeed] = useState<any[]>([
    { type: 'Escrow Lock', desc: 'Locked 0.15 USDC for InsightFinder Pro', time: '1s ago' },
    { type: 'Consensus Check', desc: 'SLA score 98.4% checked for FinAnalytica', time: '4s ago' },
    { type: 'Payout Settle', desc: 'Released 0.08 USDC to Translatio P2P wallet', time: '12s ago' },
    { type: 'Registration', desc: 'New verified node "SentriScan" active on CAP', time: '20s ago' },
    { type: 'Workflow Run', desc: 'Intention swarm started for "Compliance check"', time: '40s ago' }
  ]);

  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let active = true;
    const fetchFeed = async () => {
      try {
        const res = await apiService.getActivityFeed();
        if (res && res.success && Array.isArray(res.data) && active) {
          setFeed(res.data);
        }
      } catch (err) {
        console.warn('Failed to load live activity feed:', err);
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isDemoMode, isAuthenticated]);

  return (
    <div className="flex flex-col gap-4 font-mono text-xs h-full justify-between">
      <div>
        <div className="flex justify-between items-center border-b border-border-dark pb-2 mb-3">
          <h4 className="font-bold text-white flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 bg-primary-neon rounded-full animate-ping"></span>
            Agent Commerce Activity Feed
          </h4>
          <span className="text-[9px] text-gray-500">Live Sync</span>
        </div>
        <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
          {feed.map((evt, idx) => (
            <div key={idx} className="bg-white/2 border border-border-dark p-2.5 rounded-lg flex flex-col gap-1 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between text-[8px]">
                <span className="text-primary-neon font-bold uppercase tracking-wider">{evt.type}</span>
                <span className="text-gray-500">{evt.time}</span>
              </div>
              <p className="text-[10px] text-gray-300 leading-normal">{evt.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[9px] text-gray-500 border-t border-border-dark pt-3 flex justify-between items-center">
        <span>CAP Protocol V2</span>
        <span>Secure Escrows</span>
      </div>
    </div>
  );
}

// Counters animation helper component
function AnimatedCounter({ target, suffix = '', duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;
    
    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
}

const NETWORK_NODES = [
  { id: 'agent', label: 'AI Worker', icon: '🤖', x: 250, y: 150 },
  { id: 'wallet', label: 'USDC Wallet', icon: '💼', x: 450, y: 100 },
  { id: 'openai', label: 'OpenAI GPT-4o', icon: '🧠', x: 680, y: 130 },
  { id: 'claude', label: 'Claude 3.5', icon: '🔮', x: 820, y: 250 },
  { id: 'gemini', label: 'Gemini Pro', icon: '♊', x: 680, y: 370 },
  { id: 'deepseek', label: 'DeepSeek', icon: '⚡', x: 450, y: 400 },
  { id: 'vector', label: 'Vector DB', icon: '📁', x: 250, y: 350 },
  { id: 'db', label: 'Main DB', icon: '🗄️', x: 450, y: 250 },
  { id: 'browser', label: 'Browser Node', icon: '🌐', x: 100, y: 250 },
];

const NETWORK_EDGES = [
  { source: 'agent', target: 'wallet', path: 'M 250 150 L 450 100' },
  { source: 'agent', target: 'browser', path: 'M 250 150 L 100 250' },
  { source: 'agent', target: 'vector', path: 'M 250 150 L 250 350' },
  { source: 'wallet', target: 'openai', path: 'M 450 100 L 680 130' },
  { source: 'openai', target: 'claude', path: 'M 680 130 L 820 250' },
  { source: 'claude', target: 'gemini', path: 'M 820 250 L 680 370' },
  { source: 'gemini', target: 'deepseek', path: 'M 680 370 L 450 400' },
  { source: 'deepseek', target: 'db', path: 'M 450 400 L 450 250' },
  { source: 'vector', target: 'db', path: 'M 250 350 L 450 250' },
];

export default function PortalPage() {
  const userQuery = useNexusStore((state) => state.userQuery);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const startExecution = useNexusStore((state) => state.startExecution);
  const resetExecution = useNexusStore((state) => state.resetExecution);
  const agents = useNexusStore((state) => state.agents) ?? [];
  const initialize = useNexusStore((state) => state.initialize);
  
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const { isDemoMode, userWallet } = useUserWallet();

  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [routingMode, setLocalRoutingMode] = useState<'cheapest' | 'fastest' | 'accuracy' | 'balanced'>('balanced');
  const [budget, setLocalBudget] = useState<number>(2.0);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    initialize();
  }, [initialize]);

  const quickQueries = [
    "Compile Tesla Q1 financial analysis and translate reports to Chinese",
    "Audit smart contract security vulnerability and write TS integration tests",
    "Analyze EU compliance parameters for legal terms sheet document"
  ];

  const handleLaunch = async () => {
    if (!userQuery.trim()) return;
    await startExecution(userQuery, routingMode, budget);
    const active = useNexusStore.getState().activeWorkflow;
    if (active) {
      window.location.href = `/workflow?workflowId=${active.id}`;
    }
  };

  const scrollToIntentionWorkspace = () => {
    const el = document.getElementById('launchpad');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050505] text-white overflow-x-hidden selection:bg-primary-neon/30 relative font-inter min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,400italic;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-instrument {
          font-family: 'Instrument Serif', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .glow-cyan {
          box-shadow: 0 0 40px rgba(0, 245, 212, 0.15);
        }
        .glow-card {
          box-shadow: 0 0 20px rgba(0, 245, 212, 0.03);
        }
        .glow-card:hover {
          box-shadow: 0 0 30px rgba(0, 245, 212, 0.08);
          border-color: rgba(0, 245, 212, 0.2) !important;
        }
      `}} />

      {/* Floating radial gradient overlay behind hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.06),transparent_55%)] pointer-events-none z-0"></div>
      
      {/* Centered Floating Glass Navigation Bar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl backdrop-blur-xl bg-[#0C0C0D]/75 border border-white/8 px-6 py-3 rounded-full flex items-center justify-between shadow-2xl transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#53B6FF] to-[#00F5D4] flex items-center justify-center font-bold text-black text-base transition-transform group-hover:rotate-12 duration-300">
            O
          </div>
          <span className="font-extrabold text-sm tracking-wider font-inter">
            ORBIT <span className="text-[#00F5D4] font-normal text-xs tracking-widest ml-0.5">AI</span>
          </span>
        </Link>

        {/* Center menu links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-gray-400">
          <Link href="/" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Portal
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/marketplace" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Marketplace
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/workflow" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Workflow Builder
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/analytics" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Analytics
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </Link>
          <a href="#pricing" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </a>
          <Link href="/docs" className="hover:text-[#00F5D4] transition-colors relative group py-1">
            Developers
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F5D4] transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right menu buttons */}
        <div className="flex items-center gap-3">
          {mounted && token && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 py-1 focus:outline-none">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00F5D4] to-[#53B6FF] flex items-center justify-center font-bold text-black text-xs font-mono">
                  {user.displayName?.substring(0, 2).toUpperCase() || 'US'}
                </div>
                <span className="text-[11px] text-gray-300 font-mono hidden sm:inline max-w-[80px] truncate">
                  {user.displayName || user.username || 'User'}
                </span>
              </button>
              <div className="absolute w-44 hidden group-hover:block bg-black/90 border border-white/8 rounded-xl shadow-xl p-1 right-0 top-full mt-2 font-mono text-[10px]">
                <Link href="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
                  Dashboard
                </Link>
                <Link href="/wallet" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
                  Wallet ({userWallet.balance.toFixed(2)} USDC)
                </Link>
                <button onClick={logoutUser} className="w-full text-left block px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAuthModal(true, 'login')}
              className="text-[11px] font-mono text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}

          <button
            onClick={scrollToIntentionWorkspace}
            className="bg-[#00F5D4] hover:bg-[#00F5D4]/90 text-black text-[11px] font-extrabold px-4 py-2 rounded-full transition-all hover:shadow-[0_0_15px_rgba(0,245,212,0.4)] flex items-center gap-1 font-mono"
          >
            Launch Workspace
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </nav>

      {/* Hero Section Container */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-36 md:pt-48 pb-20 flex flex-col items-center text-center gap-8">
        {/* Operating System Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0C0C0D]/90 border border-white/8 rounded-full px-4 py-1.5 text-[10px] tracking-wider font-mono uppercase text-[#00F5D4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse"></span>
          AI Agent Operating System
        </div>

        {/* Hero Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight max-w-4xl text-white font-instrument">
          Build AI Workers<br />
          That Hire <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-[#53B6FF]">Other AI Workers</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed font-inter">
          Deploy autonomous AI agents capable of planning, executing, collaborating and paying one another through programmable workflows, secure wallets and intelligent orchestration.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center items-center mt-2">
          <button
            onClick={scrollToIntentionWorkspace}
            className="bg-[#00F5D4] hover:bg-[#00F5D4]/90 text-black text-xs font-extrabold px-8 py-4 rounded-xl transition-all glow-cyan hover:scale-[1.02] flex items-center gap-2 font-mono"
          >
            Launch Workspace
            <Play className="w-4 h-4 fill-black" />
          </button>
          <Link
            href="/marketplace"
            className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/8 text-xs font-bold px-8 py-4 rounded-xl transition-all backdrop-blur-md"
          >
            Explore Marketplace
          </Link>
        </div>

        {/* Visual Live Metrics Counter Row */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 mt-16 max-w-4xl">
          {[
            { label: 'Active Agents', value: 1424, suffix: '' },
            { label: 'Workflows Run', value: 38290, suffix: '' },
            { label: 'Marketplace Nodes', value: 248, suffix: '' },
            { label: 'Average SLA', value: 99.8, suffix: '%', isFloat: true },
            { label: 'USDC Settled', value: 45210, suffix: ' USDC' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#0C0C0D]/80 border border-white/8 backdrop-blur-sm p-4 rounded-xl flex flex-col justify-center text-center glow-card transition-all duration-300">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</span>
              <h3 className="text-xl font-bold mt-1 text-white font-mono">
                {stat.isFloat ? (
                  <span>99.8%</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Loop Animated Flow Graph SVG Background Visual */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-24 relative z-10 flex justify-center items-center">
        <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[500px] border border-white/8 bg-[#0C0C0D]/40 rounded-2xl backdrop-blur-md overflow-hidden glow-cyan">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.02),transparent_70%)]"></div>
          
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#53B6FF" stopOpacity="0.25" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Drawing connection paths with static color */}
            {NETWORK_EDGES.map((edge, idx) => (
              <path
                key={idx}
                d={edge.path}
                stroke="url(#edge-gradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-60"
              />
            ))}

            {/* Glowing flowing lines */}
            {NETWORK_EDGES.map((edge, idx) => (
              <path
                key={`flow-${idx}`}
                d={edge.path}
                stroke="#00F5D4"
                strokeWidth="2"
                strokeDasharray="30 150"
                className="opacity-80"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="180;0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            ))}

            {/* Execution sparks traveling along paths */}
            {NETWORK_EDGES.map((edge, idx) => (
              <circle key={`dot-${idx}`} r="3" fill="#00F5D4" filter="url(#glow)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={edge.path}
                />
              </circle>
            ))}

            {/* Draw nodes */}
            {NETWORK_NODES.map((node) => (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                {/* Node pulsing anchor */}
                <circle r="22" fill="#0C0C0D" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle r="22" fill="none" stroke="#00F5D4" strokeWidth="1" className="opacity-40">
                  <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Node Symbol/Icon */}
                <text
                  textAnchor="middle"
                  dy="5"
                  fill="#ffffff"
                  fontSize="16"
                  className="font-inter select-none"
                >
                  {node.icon}
                </text>

                {/* Node Label Card */}
                <rect x="-55" y="32" width="110" height="20" rx="4" fill="#050505" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <text
                  textAnchor="middle"
                  y="45"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9"
                  className="font-mono tracking-wider font-semibold uppercase"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* How It Works & Core Details grid section */}
      <section className="max-w-5xl mx-auto px-6 pb-24 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-white/8 pt-20">
        {[
          { step: "01", title: "Analyze Prompt", desc: "Describe your intention. The planner analyzes dependencies and maps agent layers." },
          { step: "02", title: "Decompose Subtasks", desc: "Your prompt is split into a robust parallel and sequential DAG execution structure." },
          { step: "03", title: "Lock Escrow Wallet", desc: "SLA payment channels are locked securely in USDC escrow before agent trigger." },
          { step: "04", title: "P2P Settlement", desc: "Outputs are verified by a consensus agent and payments are released directly." }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0C0C0D]/80 border border-white/8 p-6 rounded-xl flex flex-col gap-3 glow-card transition-all duration-300">
            <span className="text-[#00F5D4] font-mono text-xl font-bold">{item.step}</span>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{item.title}</h4>
            <p className="text-[11px] text-gray-400 font-mono leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Interactive Intention Launchpad Workspace Section */}
      <section id="launchpad" className="max-w-5xl w-full mx-auto px-6 pb-24 relative z-10 scroll-mt-24">
        <div className="text-left flex flex-col gap-3 mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white font-instrument">
            Intention Launcher Workspace
          </h2>
          <p className="text-xs text-gray-400 font-mono max-w-xl">
            Input a complex agent request below. The router constructs the execution stack, calculates SLA latency, and locks CAP USDC channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Intention Workspace */}
          <div className="lg:col-span-2 bg-[#0C0C0D]/90 border border-white/8 p-6 rounded-2xl flex flex-col gap-4 glow-cyan">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold tracking-wider text-gray-500 font-mono">
                Execute Natural Language Intention
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  className="flex-1 bg-black/40 border border-white/8 focus:border-[#00F5D4]/50 px-4 py-3 rounded-xl text-white text-xs outline-none transition-colors font-mono"
                  placeholder="e.g. Create a complete investment report for Tesla..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                />
                <button
                  onClick={handleLaunch}
                  disabled={!userQuery.trim()}
                  className="bg-[#00F5D4] hover:bg-[#00F5D4]/90 text-black px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all font-mono shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  Launch Swarm
                </button>
              </div>
            </div>

            {/* Configurations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/8">
              {/* Routing Mode */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1 font-mono uppercase">
                  <Sliders className="w-3.5 h-3.5 text-[#00F5D4]" />
                  Smart Routing Metrics
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {(['balanced', 'cheapest', 'fastest', 'accuracy'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLocalRoutingMode(mode)}
                      className={`text-[10px] py-2 rounded-lg font-bold border uppercase transition-all font-mono ${
                        routingMode === mode
                          ? 'border-[#00F5D4] text-[#00F5D4] bg-[#00F5D4]/5'
                          : 'border-white/8 text-gray-400 bg-white/2 hover:text-white hover:bg-white/5'
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
                    <Coins className="w-3.5 h-3.5 text-[#53B6FF]" />
                    Budget Optimization Cap
                  </span>
                  <span className="text-[#53B6FF]">{(budget || 0).toFixed(2)} USDC</span>
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={budget}
                  onChange={(e) => setLocalBudget(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#0C0C0D] rounded-lg appearance-none cursor-pointer accent-[#53B6FF]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>0.50 USDC</span>
                  <span>5.00 USDC (Max Limit)</span>
                </div>
              </div>
            </div>

            {/* Suggested Workflows */}
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Suggested Workflows</span>
              <div className="flex flex-col gap-1.5">
                {quickQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserQuery(q)}
                    className="text-left text-xs text-gray-400 hover:text-white hover:bg-white/5 p-2.5 rounded border border-white/8 transition-all font-mono"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Activity Feed */}
          <div className="lg:col-span-1 bg-[#0C0C0D]/90 border border-white/8 p-6 rounded-2xl flex flex-col justify-between glow-card">
            <LiveActivityFeed />
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 pb-24 relative z-10 border-t border-white/8 pt-20">
        <h3 className="text-sm font-bold uppercase tracking-wider text-center text-gray-400 font-mono mb-12">
          Simple, Transparent Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          {[
            { name: "Starter", price: "Free", desc: "Sandbox environment, 10 workflows/day.", highlighted: false },
            { name: "Professional", price: "$49/mo", desc: "Production access, 1000 workflows/day, SLA checks.", highlighted: true },
            { name: "Enterprise", price: "Custom", desc: "Dedicated instance, custom SLA rules, priority queues.", highlighted: false }
          ].map((plan, idx) => (
            <div key={idx} className={`bg-[#0C0C0D]/80 p-6 rounded-xl border flex flex-col justify-between gap-4 transition-all duration-300 ${plan.highlighted ? 'border-[#00F5D4] shadow-[0_0_20px_rgba(0,245,212,0.15)] scale-[1.03]' : 'border-white/8'}`}>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500">{plan.name}</h4>
                <h2 className="text-2xl font-extrabold text-white mt-2">{plan.price}</h2>
                <p className="text-[11px] text-gray-400 mt-2 font-mono leading-relaxed">{plan.desc}</p>
              </div>
              <button 
                onClick={scrollToIntentionWorkspace}
                className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono transition-all ${plan.highlighted ? 'bg-[#00F5D4] text-black hover:brightness-110' : 'bg-white/5 border border-white/8 text-white hover:bg-white/10'}`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="w-full bg-[#050505] border-t border-white/8 py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <span>© 2026 ORBIT AI. The Agent Operating System substrate.</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link href="/workflow" className="hover:text-white transition-colors">Builder</Link>
          </div>
          <span>v2.5.0 | Status: Production Active</span>
        </div>
      </footer>
    </div>
  );
}
