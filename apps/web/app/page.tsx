'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
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
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Lock,
  ArrowDownRight,
  Activity,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useToast } from '../components/Toast';

// Premium 3D Perspective Card Wrapper
function PerspectiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Tilt calculations
    setRotateX(-y / 20);
    setRotateY(x / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-200 ease-out border border-white/8 bg-[#0D0D0D]/75 backdrop-blur-md rounded-[24px] overflow-hidden relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gloss Reflection Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.06]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// INTERACTIVE MOCKUPS
// ----------------------------------------------------

// 1. Interactive Workflow Builder Mockup
function WorkflowBuilderMockup() {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[Planner] Analyzing prompt intent...',
    '[Planner] Sequenced 6 execution nodes.'
  ]);

  const steps = [
    { id: 'plan', label: 'Swarm Planner', icon: <Sparkles className="w-4 h-4 text-[#6FCBFF]" />, desc: 'Decomposing intent' },
    { id: 'research', label: 'Market Research', icon: <Globe className="w-4 h-4 text-[#C9F4FF]" />, desc: 'QuickScan active' },
    { id: 'openai', label: 'LLM Reasoning', icon: <Cpu className="w-4 h-4 text-[#6FCBFF]" />, desc: 'Claude 3.5 Sonnet' },
    { id: 'escrow', label: 'CAP Wallet', icon: <Wallet className="w-4 h-4 text-[#C9F4FF]" />, desc: 'USDC Escrow audit' },
    { id: 'db', label: 'Vector Store', icon: <Database className="w-4 h-4 text-gray-500" />, desc: 'Saving memory' },
    { id: 'output', label: 'Verifier Output', icon: <ShieldCheck className="w-4 h-4 text-[#6FCBFF]" />, desc: 'SLA verification' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        
        // Append log dynamically
        const newLog = `[${steps[next].label}] ${steps[next].desc}...`;
        setLogs(l => [newLog, ...l.slice(0, 3)]);
        
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 h-full justify-between font-mono text-xs text-left">
      <div className="flex justify-between items-center border-b border-white/8 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6FCBFF] animate-pulse"></span>
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Orchestrator Visualizer</span>
        </div>
        <span className="text-[9px] bg-white/5 border border-white/8 px-2 py-0.5 rounded text-gray-400">DAG Layout</span>
      </div>

      {/* Connection Graph map */}
      <div className="grid grid-cols-2 gap-4 py-2 relative">
        {/* Animated connection lines overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" fill="none">
            <path d="M 120 40 L 120 180 M 120 110 L 280 110" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M 120 40 L 120 180" stroke="url(#line-glow)" strokeWidth="1.5" strokeDasharray="10 40">
              <animate attributeName="stroke-dashoffset" values="50;0" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
          <svg className="hidden">
            <defs>
              <linearGradient id="line-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6FCBFF" />
                <stop offset="100%" stopColor="#C9F4FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          const isDone = idx < activeStep;
          return (
            <div 
              key={s.id}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-300 relative z-10 ${
                isActive 
                  ? 'border-[#6FCBFF] bg-[#6FCBFF]/5 shadow-[0_0_15px_rgba(111,203,255,0.08)]' 
                  : isDone
                    ? 'border-white/10 bg-white/2 opacity-75'
                    : 'border-white/4 bg-transparent opacity-45'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                isActive ? 'bg-[#6FCBFF]/10 border-[#6FCBFF]/30' : 'bg-white/2 border-white/8'
              }`}>
                {s.icon}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-bold text-white truncate">{s.label}</span>
                <span className="text-[8px] text-gray-500 truncate">{s.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Small timeline logs block */}
      <div className="bg-black/40 border border-white/8 p-3 rounded-lg flex flex-col gap-1 max-h-[85px] overflow-hidden">
        {logs.map((log, idx) => (
          <span key={idx} className={`text-[9px] ${idx === 0 ? 'text-[#6FCBFF]' : 'text-gray-500'}`}>
            {log}
          </span>
        ))}
      </div>
    </div>
  );
}

// 2. Interactive Marketplace Mockup
function MarketplaceMockup() {
  const [installedCount, setInstalledCount] = useState(2);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installedSet, setInstalledSet] = useState<string[]>(['agent-1']);

  const list = [
    { id: 'agent-1', name: 'FinAnalytica Pro', role: 'Finance', rating: '4.9', cost: '0.25', latency: '1200ms' },
    { id: 'agent-2', name: 'InsightFinder', role: 'Research', rating: '4.8', cost: '0.05', latency: '450ms' },
    { id: 'agent-3', name: 'ConsensuVerify', role: 'Security', rating: '4.85', cost: '0.10', latency: '800ms' }
  ];

  const handleInstall = (id: string) => {
    if (installedSet.includes(id)) return;
    setInstallingId(id);
    setTimeout(() => {
      setInstalledSet(prev => [...prev, id]);
      setInstalledCount(prev => prev + 1);
      setInstallingId(null);
    }, 1200);
  };

  return (
    <div className="p-6 flex flex-col gap-5 h-full justify-between font-mono text-xs text-left">
      <div className="flex justify-between items-center border-b border-white/8 pb-3">
        <div className="flex flex-col">
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Registry Marketplace</span>
          <span className="text-[8px] text-gray-500 mt-0.5">Secure CAP capability hashes loaded</span>
        </div>
        <span className="text-[9px] bg-[#6FCBFF]/10 border border-[#6FCBFF]/30 px-2 py-0.5 rounded text-[#6FCBFF]">
          {installedCount} Agents Connected
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {list.map((agent) => {
          const isInstalled = installedSet.includes(agent.id);
          const isInstalling = installingId === agent.id;
          
          return (
            <div 
              key={agent.id}
              className="bg-white/2 border border-white/8 p-3.5 rounded-xl flex items-center justify-between gap-4 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold text-white truncate">{agent.name}</span>
                  <span className="text-[8px] bg-white/5 border border-white/8 px-1.5 py-0.2 rounded text-gray-400">{agent.role}</span>
                </div>
                <div className="flex items-center gap-3 text-[8px] text-gray-500">
                  <span>Rating: {agent.rating} ⭐</span>
                  <span>Latency: {agent.latency}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[#6FCBFF] font-bold text-[10px]">{agent.cost} USDC</span>
                <button
                  onClick={() => handleInstall(agent.id)}
                  disabled={isInstalled || isInstalling}
                  className={`text-[9px] font-extrabold px-3 py-1.5 rounded-lg font-mono transition-all ${
                    isInstalled
                      ? 'bg-white/5 text-gray-500 border border-white/4 cursor-default'
                      : isInstalling
                        ? 'bg-[#6FCBFF]/10 text-[#6FCBFF] border border-[#6FCBFF]/30 animate-pulse'
                        : 'bg-[#6FCBFF] text-black hover:brightness-110'
                  }`}
                >
                  {isInstalled ? 'Installed' : isInstalling ? 'Auditing...' : 'Install'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Interactive Execution Console Mockup
function ExecutionConsoleMockup() {
  const [progress, setProgress] = useState(15);
  const [tokenRate, setTokenRate] = useState(2450);
  const [logLines, setLogLines] = useState<string[]>([
    '[14:45:01] SLA channels verified.',
    '[14:45:03] Subtask mapping complete.',
    '[14:45:05] Running parallel nodes...'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
        if (next >= 100) {
          // Add a new log reset
          setLogLines(prev => [`[${new Date().toLocaleTimeString()}] Restarting execution chain...`, ...prev.slice(0, 2)]);
          return 15;
        }
        return next;
      });
      setTokenRate(() => Math.floor(2100 + Math.random() * 800));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-5 h-full justify-between font-mono text-xs text-left">
      <div className="flex justify-between items-center border-b border-white/8 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#6FCBFF]" />
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Real-Time Execution Console</span>
        </div>
        <span className="text-[9px] text-[#6FCBFF] animate-pulse">Running</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-[10px] bg-white/2 border border-white/8 p-3 rounded-xl">
        <div className="flex flex-col">
          <span className="text-gray-500 text-[8px] uppercase">Token Throughput</span>
          <span className="text-white font-bold mt-0.5">{tokenRate.toLocaleString()} t/sec</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 text-[8px] uppercase">Active Duration</span>
          <span className="text-white font-bold mt-0.5">14.2s (SLA SLA)</span>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[9px] text-gray-500">
          <span>PIPELINE COMPLETION PROGRESS</span>
          <span className="text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#6FCBFF] to-[#C9F4FF] rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-black/60 border border-white/8 p-3 rounded-lg flex flex-col gap-1.5 max-h-[100px] overflow-hidden">
        {logLines.map((l, idx) => (
          <span key={idx} className={`text-[9px] leading-relaxed truncate ${idx === 0 ? 'text-white' : 'text-gray-500'}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// 4. Interactive Escrow Wallet Mockup
function EscrowWalletMockup() {
  const [balance, setBalance] = useState(100.00);
  const [escrow, setEscrow] = useState(0.00);
  const [settled, setSettled] = useState(45.20);
  const [txLog, setTxLog] = useState<string>('System idle. Escrow accounts loaded.');

  const triggerMockTransfer = () => {
    // 1. Lock escrow
    setTxLog('Reserving 0.25 USDC SLA lock...');
    setBalance(b => Number((b - 0.25).toFixed(2)));
    setEscrow(e => Number((e + 0.25).toFixed(2)));

    // 2. Release payout after 3 seconds
    setTimeout(() => {
      setTxLog('SLA consensus check passed. Disbursing payout.');
      setEscrow(e => Number((e - 0.25).toFixed(2)));
      setSettled(s => Number((s + 0.25).toFixed(2)));
    }, 2500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerMockTransfer();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 h-full justify-between font-mono text-xs text-left">
      <div className="flex justify-between items-center border-b border-white/8 pb-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[#6FCBFF]" />
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">CAP Escrow Substrate</span>
        </div>
        <span className="text-[9px] text-gray-500">P2P Payments</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/2 border border-white/8 p-3 rounded-xl text-center">
          <span className="text-gray-500 text-[8px] uppercase">Available</span>
          <h4 className="text-xs font-bold text-white mt-1">{balance.toFixed(2)}</h4>
        </div>
        <div className="bg-[#6FCBFF]/5 border border-[#6FCBFF]/30 p-3 rounded-xl text-center relative overflow-hidden">
          <span className="text-[#6FCBFF] text-[8px] uppercase">Escrow Locked</span>
          <h4 className="text-xs font-bold text-white mt-1 animate-pulse">{escrow.toFixed(2)}</h4>
        </div>
        <div className="bg-white/2 border border-white/8 p-3 rounded-xl text-center">
          <span className="text-gray-500 text-[8px] uppercase">Total Settled</span>
          <h4 className="text-xs font-bold text-[#C9F4FF] mt-1">{settled.toFixed(2)}</h4>
        </div>
      </div>

      {/* Transaction status card */}
      <div className="bg-black/60 border border-white/8 p-3 rounded-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6FCBFF] shrink-0 animate-ping"></span>
          <span className="text-[9px] text-gray-400 truncate">{txLog}</span>
        </div>
        <span className="text-[8px] text-gray-500 shrink-0 uppercase tracking-widest font-mono">CROO V2</span>
      </div>
    </div>
  );
}

// 5. Interactive Analytics Mockup
function AnalyticsMockup() {
  const [data, setData] = useState([
    { name: '1', usage: 1200 },
    { name: '2', usage: 1800 },
    { name: '3', usage: 1400 },
    { name: '4', usage: 2200 },
    { name: '5', usage: 2900 },
    { name: '6', usage: 2400 },
    { name: '7', usage: 3100 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const newVal = Math.floor(1500 + Math.random() * 2000);
        next.push({ name: String(prev.length + 1), usage: newVal });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-4 h-full justify-between font-mono text-xs text-left">
      <div className="flex justify-between items-center border-b border-white/8 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#6FCBFF]" />
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Autonomous SLA Analytics</span>
        </div>
        <span className="text-[9px] text-[#C9F4FF]">60 FPS Chart</span>
      </div>

      <div className="w-full h-[140px] mt-2 select-none relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6FCBFF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6FCBFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ background: '#0C0C0D', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '9px' }} />
            <Area type="monotone" dataKey="usage" stroke="#6FCBFF" strokeWidth={1.5} fillOpacity={1} fill="url(#colorUsage)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center text-[8px] text-gray-500 mt-1 pt-2 border-t border-white/8">
        <span>METRIC: WORKFLOW REQUEST RATIO</span>
        <span>LATENCY AVERAGE: 850ms</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN LANDING PORTAL PAGE
// ----------------------------------------------------
export default function PortalPage() {
  const userQuery = useNexusStore((state) => state.userQuery);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const startExecution = useNexusStore((state) => state.startExecution);
  const resetExecution = useNexusStore((state) => state.resetExecution);
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
    <div className="flex-1 flex flex-col bg-[#030303] text-white overflow-x-hidden selection:bg-[#6FCBFF]/30 relative font-inter min-h-screen">
      
      {/* Dynamic Fonts Import Style Block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,400italic;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-instrument {
          font-family: 'Instrument Serif', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        /* Grid background layer */
        .bg-grid-overlay {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        /* Noise Overlay */
        .bg-noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E");
        }

        /* Subtle animated translation of gradient grid */
        @keyframes slow-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        .animate-grid-move {
          animation: slow-move 20s linear infinite;
        }
      `}} />

      {/* BACKGROUND DEPTH LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1: Matte black layout gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#080808]"></div>

        {/* Layer 2: Subtle Grid */}
        <div className="absolute inset-0 bg-grid-overlay opacity-80 animate-grid-move"></div>

        {/* Layer 3: Noise overlay */}
        <div className="absolute inset-0 bg-noise-overlay"></div>

        {/* Layer 4: Floating blurred lights */}
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] rounded-full bg-[#6FCBFF]/3 blur-[130px]"></div>
        <div className="absolute top-[40%] right-1/4 w-[700px] h-[700px] rounded-full bg-white/2 blur-[150px]"></div>
        <div className="absolute bottom-[20%] left-1/3 w-[500px] h-[500px] rounded-full bg-[#C9F4FF]/3 blur-[120px]"></div>
      </div>

      {/* Floating Header Navbar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl backdrop-blur-2xl bg-[#0D0D0D]/70 border border-white/8 px-6 py-2.5 rounded-full flex items-center justify-between shadow-2xl">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#53B6FF] to-[#C9F4FF] flex items-center justify-center font-bold text-black text-base transition-transform group-hover:rotate-12 duration-300">
            O
          </div>
          <span className="font-extrabold text-sm tracking-wider font-inter">
            ORBIT <span className="text-[#6FCBFF] font-normal text-xs tracking-widest ml-0.5">AI</span>
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] text-gray-400">
          <Link href="/" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Portal
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/marketplace" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Marketplace
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/workflow" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Workflow Builder
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/analytics" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Analytics
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </Link>
          <a href="#pricing-tiers" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </a>
          <Link href="/docs" className="hover:text-[#6FCBFF] transition-colors relative group py-1">
            Developers
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FCBFF] transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {mounted && token && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 py-1 focus:outline-none">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6FCBFF] to-[#C9F4FF] flex items-center justify-center font-bold text-black text-xs font-mono">
                  {user.displayName?.substring(0, 2).toUpperCase() || 'US'}
                </div>
                <span className="text-[10px] text-gray-300 font-mono hidden sm:inline max-w-[80px] truncate">
                  {user.displayName || user.username || 'User'}
                </span>
              </button>
              <div className="absolute w-40 hidden group-hover:block bg-black/90 border border-white/8 rounded-xl shadow-xl p-1.5 right-0 top-full mt-2 font-mono text-[9px]">
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
              className="text-[10px] font-mono text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}

          <button
            onClick={scrollToIntentionWorkspace}
            className="bg-white text-black hover:bg-white/90 text-[10px] font-extrabold px-4 py-2 rounded-full transition-all flex items-center gap-1 font-mono hover:scale-[1.02]"
          >
            Launch Workspace
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION VIEWPORT */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="flex flex-col items-center gap-6 max-w-4xl">
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#0D0D0D]/95 border border-white/8 rounded-full px-4.5 py-1.5 text-[9px] tracking-widest font-mono uppercase text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FCBFF] animate-pulse"></span>
            Agent Swarm Substrate
          </motion.div>

          {/* Headline (Line-by-line mask reveal) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] max-w-4xl text-white font-instrument select-none">
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              Build AI Workers
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block italic font-light text-gray-400"
            >
              That Hire
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6FCBFF] via-[#FFFFFF] to-[#C9F4FF]"
            >
              Other AI Workers
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed font-inter mt-2"
          >
            Deploy autonomous AI workers capable of planning, executing, collaborating and paying other AI workers securely.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-4 justify-center items-center mt-3"
          >
            <button
              onClick={scrollToIntentionWorkspace}
              className="bg-[#6FCBFF] hover:bg-[#6FCBFF]/90 text-black text-xs font-extrabold px-8 py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(111,203,255,0.25)] flex items-center gap-2 font-mono group"
            >
              Launch Workspace
              <Play className="w-4 h-4 fill-black group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#keynote-sections"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/8 text-xs font-bold px-8 py-3.5 rounded-xl transition-all backdrop-blur-md"
            >
              Watch Keynote Details
            </a>
          </motion.div>
        </div>
      </section>

      {/* KEYNOTE SECTIONS SECTION CONTAINER */}
      <section id="keynote-sections" className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col gap-24 md:gap-36 pb-24">
        
        {/* Section 1: Workflow Builder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <PerspectiveCard className="w-full aspect-[4/3] flex items-center justify-center">
              <WorkflowBuilderMockup />
            </PerspectiveCard>
          </div>
          <div className="order-1 md:order-2 text-left flex flex-col gap-4 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6FCBFF] font-bold">Keynote Stage 01</span>
            <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
              Visual Agent Workflow Builder
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Graphically map out complex Multi-Agent Swarms. Define dependencies, capabilities, retry boundaries, and custom execution limits. Watch connections route tokens concurrently at 60 FPS.
            </p>
            <Link href="/workflow" className="text-[10px] font-mono text-[#6FCBFF] hover:underline flex items-center gap-1 mt-2">
              Launch Workflow Builder &rarr;
            </Link>
          </div>
        </div>

        {/* Section 2: Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left flex flex-col gap-4 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9F4FF] font-bold">Keynote Stage 02</span>
            <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
              Decentralized Registry Store
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Discover, install, and benchmark autonomous agent nodes published by developers. Lock secure USDC-CAP pricing agreements, audit reputation trustScores, and read success rates before loading.
            </p>
            <Link href="/marketplace" className="text-[10px] font-mono text-[#C9F4FF] hover:underline flex items-center gap-1 mt-2">
              Explore Agent Marketplace &rarr;
            </Link>
          </div>
          <div>
            <PerspectiveCard className="w-full aspect-[4/3] flex items-center justify-center">
              <MarketplaceMockup />
            </PerspectiveCard>
          </div>
        </div>

        {/* Section 3: Live Execution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <PerspectiveCard className="w-full aspect-[4/3] flex items-center justify-center">
              <ExecutionConsoleMockup />
            </PerspectiveCard>
          </div>
          <div className="order-1 md:order-2 text-left flex flex-col gap-4 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6FCBFF] font-bold">Keynote Stage 03</span>
            <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
              Live Console Telemetry
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Monitor running agent chains in real-time. View execution progress, active token rates, fallback errors, and stream terminal status updates. Everything updates continuously on GPU-accelerated layouts.
            </p>
          </div>
        </div>

        {/* Section 4: Wallet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left flex flex-col gap-4 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9F4FF] font-bold">Keynote Stage 04</span>
            <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
              CAP Escrow & Settlements
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              USDC deposits are locked in secure smart escrow contracts prior to execution trigger. Funds are disbursed automatically to worker node addresses only after independent verification consensus is reached.
            </p>
            <Link href="/wallet" className="text-[10px] font-mono text-[#C9F4FF] hover:underline flex items-center gap-1 mt-2">
              View Personal Substrate Wallet &rarr;
            </Link>
          </div>
          <div>
            <PerspectiveCard className="w-full aspect-[4/3] flex items-center justify-center">
              <EscrowWalletMockup />
            </PerspectiveCard>
          </div>
        </div>

        {/* Section 5: Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <PerspectiveCard className="w-full aspect-[4/3] flex items-center justify-center">
              <AnalyticsMockup />
            </PerspectiveCard>
          </div>
          <div className="order-1 md:order-2 text-left flex flex-col gap-4 max-w-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6FCBFF] font-bold">Keynote Stage 05</span>
            <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
              Autonomous SLA Performance
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Analyze request latency ratios, cost breakdowns, and overall active node load. Recharts-rendered graphics let you optimize workflows and compare pricing metrics dynamically.
            </p>
            <Link href="/analytics" className="text-[10px] font-mono text-[#6FCBFF] hover:underline flex items-center gap-1 mt-2">
              Inspect Advanced Analytics &rarr;
            </Link>
          </div>
        </div>

      </section>

      {/* INTERACTIVE WORKSPACE SECTION */}
      <section id="launchpad" className="max-w-5xl w-full mx-auto px-6 pb-24 relative z-10 scroll-mt-24">
        <div className="text-left flex flex-col gap-3 mb-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">Active Substrate</span>
          <h2 className="text-3xl md:text-4xl font-normal leading-tight font-instrument">
            Orchestration Launchpad
          </h2>
          <p className="text-xs text-gray-400 font-mono max-w-xl">
            Input a complex agent request below. The router constructs the execution stack, calculates SLA latency, and locks CAP USDC channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Intention Workspace */}
          <div className="lg:col-span-2 bg-[#0D0D0D]/90 border border-white/8 p-6 rounded-2xl flex flex-col gap-4 glow-card">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold tracking-wider text-gray-500 font-mono">
                Execute Natural Language Intention
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  className="flex-1 bg-black/40 border border-white/8 focus:border-[#6FCBFF]/50 px-4 py-3 rounded-xl text-white text-xs outline-none transition-colors font-mono"
                  placeholder="e.g. Create a complete investment report for Tesla..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                />
                <button
                  onClick={handleLaunch}
                  disabled={!userQuery.trim()}
                  className="bg-[#6FCBFF] hover:bg-[#6FCBFF]/90 text-black px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all font-mono shrink-0"
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
                  <Sliders className="w-3.5 h-3.5 text-[#6FCBFF]" />
                  Smart Routing Metrics
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {(['balanced', 'cheapest', 'fastest', 'accuracy'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLocalRoutingMode(mode)}
                      className={`text-[9px] py-2 rounded-lg font-bold border uppercase transition-all font-mono ${
                        routingMode === mode
                          ? 'border-[#6FCBFF] text-[#6FCBFF] bg-[#6FCBFF]/5'
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
                    <Coins className="w-3.5 h-3.5 text-[#C9F4FF]" />
                    Budget Optimization Cap
                  </span>
                  <span className="text-[#C9F4FF]">{(budget || 0).toFixed(2)} USDC</span>
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={budget}
                  onChange={(e) => setLocalBudget(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#0C0C0D] rounded-lg appearance-none cursor-pointer accent-[#C9F4FF]"
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
          <div className="lg:col-span-1 bg-[#0D0D0D]/90 border border-white/8 p-6 rounded-2xl flex flex-col justify-between glow-card">
            <LiveActivityFeed />
          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="pricing-tiers" className="max-w-5xl mx-auto px-6 pb-24 relative z-10 border-t border-white/8 pt-20">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block text-center mb-2">Substrate Access</span>
        <h3 className="text-3xl md:text-4xl font-normal leading-tight font-instrument text-center mb-12">
          Simple, Transparent Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          {[
            { name: "Starter", price: "Free", desc: "Sandbox environment, 10 workflows/day.", highlighted: false },
            { name: "Professional", price: "$49/mo", desc: "Production access, 1000 workflows/day, SLA checks.", highlighted: true },
            { name: "Enterprise", price: "Custom", desc: "Dedicated instance, custom SLA rules, priority queues.", highlighted: false }
          ].map((plan, idx) => (
            <div key={idx} className={`bg-[#0D0D0D]/80 p-6 rounded-xl border flex flex-col justify-between gap-4 transition-all duration-300 ${plan.highlighted ? 'border-[#6FCBFF] shadow-[0_0_20px_rgba(111,203,255,0.15)] scale-[1.03]' : 'border-white/8'}`}>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500">{plan.name}</h4>
                <h2 className="text-2xl font-extrabold text-white mt-2">{plan.price}</h2>
                <p className="text-[11px] text-gray-400 mt-2 font-mono leading-relaxed">{plan.desc}</p>
              </div>
              <button 
                onClick={scrollToIntentionWorkspace}
                className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono transition-all ${plan.highlighted ? 'bg-[#6FCBFF] text-black hover:brightness-110' : 'bg-white/5 border border-white/8 text-white hover:bg-white/10'}`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CONVERGING CTA SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center flex flex-col items-center gap-6 border-t border-white/8">
        <h2 className="text-4xl md:text-6xl font-normal leading-tight font-instrument max-w-2xl text-white">
          Ready to Build the Future of Autonomous AI?
        </h2>
        <p className="text-gray-400 text-xs font-mono max-w-md leading-relaxed mt-1">
          Deploy, execute, and monetize multi-agent swarms. Settle transaction fees autonomously on the CAP agent commerce protocol.
        </p>
        <div className="flex gap-4 mt-3">
          <button
            onClick={scrollToIntentionWorkspace}
            className="bg-[#6FCBFF] hover:bg-[#6FCBFF]/90 text-black text-xs font-extrabold px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] font-mono shadow-[0_0_20px_rgba(111,203,255,0.2)]"
          >
            Launch Workspace
          </button>
          <Link
            href="/marketplace"
            className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/8 text-xs font-bold px-8 py-3.5 rounded-xl transition-all backdrop-blur-md"
          >
            Explore Marketplace
          </Link>
        </div>
      </section>

      {/* PREMIUM GLASS FOOTER */}
      <footer className="w-full bg-[#030303] border-t border-white/8 py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-500">
          <span>© 2026 ORBIT AI. The Autonomous Substrate Operating System.</span>
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
