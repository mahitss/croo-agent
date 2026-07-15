'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { useNexusStore } from '../store/nexusStore';
import { useAuthStore } from '../store/authStore';
import { useUserWallet } from '../hooks/useUserWallet';
import { apiService } from '../services/api';
import { 
  Play, 
  Sliders, 
  Coins, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Globe, 
  Terminal, 
  Wallet,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useToast } from '../components/Toast';
import InteractiveNetwork from '../components/InteractiveNetwork';

// Native IntersectionObserver Viewport Entry Component for zero layout shifts
function ViewportAnimate({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 15px, 0)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// 3D Perspective Card Tilt (Bypasses React State, modifies style directly on GPU)
function PerspectiveCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  let isMoving = false;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMoving) return;
    isMoving = true;
    
    // Throttle tilt style update to match screen refreshes
    requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const box = cardRef.current.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;
      
      const rx = -y / 35;
      const ry = x / 35;
      
      cardRef.current.style.transform = `perspective(1000px) translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      isMoving = false;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out border border-white/6 bg-[#0D0D0D] rounded-[20px] overflow-hidden relative will-change-transform ${className}`}
      style={{
        transform: 'perspective(1000px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)',
      }}
    >
      {children}
    </div>
  );
}

// Live Activity Feed Component showing real-time agent updates
function LiveActivityFeed() {
  const [feed, setFeed] = useState<any[]>([
    { type: 'Escrow Lock', desc: 'Locked 0.15 USDC for InsightFinder Pro', time: '1s ago' },
    { type: 'Consensus Check', desc: 'SLA score 98.4% checked for FinAnalytica', time: '4s ago' },
    { type: 'Payout Settle', desc: 'Released 0.08 USDC to Translatio P2P wallet', time: '12s ago' }
  ]);

  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    const fetchFeed = async () => {
      try {
        const res = await apiService.getActivityFeed();
        if (res && res.success && Array.isArray(res.data) && active) {
          setFeed(res.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Failed to load activity feed:', err);
      }
    };
    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isDemoMode, isAuthenticated]);

  return (
    <div className="flex flex-col gap-4 font-mono text-xs h-full justify-between">
      <div>
        <div className="flex justify-between items-center border-b border-white/6 pb-2 mb-3">
          <h4 className="font-bold text-white flex items-center gap-1.5 uppercase text-[9px]">
            <span className="w-1 h-1 bg-[#6FCBFF] rounded-full animate-ping"></span>
            Agent Activity Feed
          </h4>
          <span className="text-[8px] text-gray-500">Live Sync</span>
        </div>
        <div className="flex flex-col gap-2">
          {feed.map((evt, idx) => (
            <div key={idx} className="bg-white/1 border border-white/4 p-2 rounded flex flex-col gap-0.5">
              <div className="flex justify-between text-[8px]">
                <span className="text-[#6FCBFF] font-bold uppercase">{evt.type}</span>
                <span className="text-gray-500">{evt.time}</span>
              </div>
              <p className="text-[9px] text-gray-300 leading-normal">{evt.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[8px] text-gray-500 border-t border-white/6 pt-2 flex justify-between items-center">
        <span>CAP Substrate</span>
        <span>Secure Escrows</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// INTERACTIVE MOCKUPS
// ----------------------------------------------------

function WorkflowBuilderMockup() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: 'Swarm Planner', icon: <Sparkles className="w-3.5 h-3.5 text-[#6FCBFF]" /> },
    { label: 'Market Research', icon: <Globe className="w-3.5 h-3.5 text-[#C9F4FF]" /> },
    { label: 'Reasoning Engine', icon: <Cpu className="w-3.5 h-3.5 text-[#6FCBFF]" /> },
    { label: 'SLA Verifier', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C9F4FF]" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 flex flex-col gap-4 h-full justify-between font-mono text-[10px] text-left">
      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Swarms Orchestrator</span>
      <div className="flex flex-col gap-2.5">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          return (
            <div 
              key={idx}
              className={`p-2.5 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                isActive 
                  ? 'border-[#6FCBFF] bg-[#6FCBFF]/5 shadow-[0_0_10px_rgba(111,203,255,0.04)]' 
                  : 'border-white/4 bg-transparent opacity-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="text-white">{s.label}</span>
              </div>
              <span className={`text-[8px] ${isActive ? 'text-[#6FCBFF] font-bold' : 'text-gray-500'}`}>
                {isActive ? 'Executing' : 'Pending'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarketplaceMockup() {
  const list = [
    { name: 'FinAnalytica Pro', cost: '0.25', latency: '1.2s' },
    { name: 'InsightFinder', cost: '0.05', latency: '0.4s' },
    { name: 'ConsensuVerify', cost: '0.10', latency: '0.8s' }
  ];
  return (
    <div className="p-5 flex flex-col gap-4 h-full justify-between font-mono text-[10px] text-left">
      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Capability Registries</span>
      <div className="flex flex-col gap-2">
        {list.map((agent, idx) => (
          <div key={idx} className="bg-white/1 border border-white/4 p-2.5 rounded-lg flex items-center justify-between">
            <span className="text-white font-bold">{agent.name}</span>
            <div className="flex items-center gap-3 text-[9px]">
              <span className="text-[#6FCBFF]">{agent.cost} USDC</span>
              <span className="text-gray-500">{agent.latency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionConsoleMockup() {
  const [progress, setProgress] = useState(20);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 10 : p + 5));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="p-5 flex flex-col gap-4 h-full justify-between font-mono text-[10px] text-left">
      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Chain Visualizer</span>
      <div className="flex flex-col gap-2 bg-black/30 p-2.5 rounded-lg border border-white/4">
        <div className="flex justify-between text-gray-400">
          <span>TASK RATE:</span>
          <span className="text-[#6FCBFF]">2,410 t/s</span>
        </div>
        <div className="flex justify-between text-gray-400 mt-1">
          <span>PIPELINE PROGRESS:</span>
          <span className="text-white">{progress}%</span>
        </div>
      </div>
      <div className="w-full h-1 bg-white/4 rounded-full overflow-hidden">
        <div className="h-full bg-[#6FCBFF] transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function EscrowWalletMockup() {
  const [balance, setBalance] = useState(100.00);
  const [escrow, setEscrow] = useState(0.00);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setBalance((b) => (b === 100.00 ? 99.75 : 100.00));
      setEscrow((e) => (e === 0.00 ? 0.25 : 0.00));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 flex flex-col gap-4 h-full justify-between font-mono text-[10px] text-left">
      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Agent Wallets Ledger</span>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/1 border border-white/4 p-2.5 rounded-lg text-center">
          <span className="text-gray-500 text-[8px]">Wallet Balance</span>
          <h4 className="text-xs font-bold text-white mt-1">{balance.toFixed(2)} USDC</h4>
        </div>
        <div className="bg-[#6FCBFF]/5 border border-[#6FCBFF]/20 p-2.5 rounded-lg text-center">
          <span className="text-[#6FCBFF] text-[8px]">Escrow Lock</span>
          <h4 className="text-xs font-bold text-white mt-1">{escrow.toFixed(2)} USDC</h4>
        </div>
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  const data = [
    { usage: 1200 },
    { usage: 1800 },
    { usage: 1400 },
    { usage: 2200 },
    { usage: 2900 },
    { usage: 2400 }
  ];
  return (
    <div className="p-5 flex flex-col gap-3 h-full justify-between font-mono text-[10px] text-left">
      <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">SLA Throughput Ratio</span>
      <div className="w-full h-[90px] select-none pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6FCBFF" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6FCBFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="usage" stroke="#6FCBFF" strokeWidth={1} fillOpacity={1} fill="url(#usageGrad)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}



// ----------------------------------------------------
// PORTAL PAGE COMPONENT
// ----------------------------------------------------
export default function PortalPage() {
  const userQuery = useNexusStore((state) => state.userQuery);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const startExecution = useNexusStore((state) => state.startExecution);
  const initialize = useNexusStore((state) => state.initialize);
  
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const { userWallet } = useUserWallet();

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
      
      {/* Dynamic Optimized CSS style declarations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,400italic;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .font-instrument {
          font-family: 'Instrument Serif', serif;
        }
        
        /* Grid background layout */
        .bg-grid-overlay {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          will-change: background-position;
          animation: gridSlowMove 35s linear infinite;
        }

        /* Subtle procedural noise overlay */
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* GPU accelerated grid translation keyframe */
        @keyframes gridSlowMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        /* Slowly floating radial gradients */
        @keyframes floatGradient1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(40px, 20px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes floatGradient2 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-30px, -15px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-radial-1 {
          animation: floatGradient1 45s ease-in-out infinite;
          will-change: transform;
        }
        .animate-radial-2 {
          animation: floatGradient2 55s ease-in-out infinite;
          will-change: transform;
        }

        /* GPU Composited static fade up reveal for hero elements */
        @keyframes heroFadeUp {
          0% { opacity: 0; transform: translate3d(0, 15px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .hero-reveal {
          animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}} />

      {/* BACKGROUND MATTE DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1: Matte coal-black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#090909]"></div>

        {/* Layer 2: Moving Grid */}
        <div className="absolute inset-0 bg-grid-overlay opacity-90"></div>

        {/* Layer 3: Noise Overlay */}
        <div className="absolute inset-0 noise-overlay"></div>

        {/* Layer 4: Two floating radial gradients (white and soft blue) */}
        <div className="absolute top-[8%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#6FCBFF]/3 blur-[120px] animate-radial-1"></div>
        <div className="absolute top-[35%] right-[20%] w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[140px] animate-radial-2"></div>
      </div>

      {/* Centered Floating Header Navigation (Backdrop blur simplified) */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl bg-[#0D0D0D]/90 border border-white/6 px-5 py-2 rounded-full flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-[#53B6FF] to-[#C9F4FF] flex items-center justify-center font-bold text-black text-sm">
            O
          </div>
          <span className="font-extrabold text-xs tracking-wider">
            ORBIT <span className="text-[#6FCBFF] font-normal text-[10px] tracking-widest ml-0.5">AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-5 font-mono text-[9px] text-gray-400">
          <Link href="/" className="hover:text-[#6FCBFF] transition-colors relative py-1">Portal</Link>
          <Link href="/marketplace" className="hover:text-[#6FCBFF] transition-colors relative py-1">Marketplace</Link>
          <Link href="/workflow" className="hover:text-[#6FCBFF] transition-colors relative py-1">Workflow Builder</Link>
          <Link href="/analytics" className="hover:text-[#6FCBFF] transition-colors relative py-1">Analytics</Link>
          <a href="#pricing-tiers" className="hover:text-[#6FCBFF] transition-colors relative py-1">Pricing</a >
          <Link href="/docs" className="hover:text-[#6FCBFF] transition-colors relative py-1">Developers</Link>
        </div>

        {/* Header Right Workspace actions */}
        <div className="flex items-center gap-3">
          {mounted && token && user ? (
            <div className="relative group">
              <button className="flex items-center gap-1.5 focus:outline-none py-1">
                <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-[#6FCBFF] to-[#C9F4FF] flex items-center justify-center font-bold text-black text-[10px] font-mono">
                  {user.displayName?.substring(0, 2).toUpperCase() || 'US'}
                </div>
              </button>
              <div className="absolute w-36 hidden group-hover:block bg-black border border-white/6 rounded-lg p-1 right-0 top-full mt-1.5 font-mono text-[8px]">
                <Link href="/dashboard" className="block px-2 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded">Dashboard</Link>
                <Link href="/wallet" className="block px-2 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded">Wallet</Link>
                <button onClick={logoutUser} className="w-full text-left block px-2 py-1.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded">Logout</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAuthModal(true, 'login')}
              className="text-[9px] font-mono text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}

          <button
            onClick={scrollToIntentionWorkspace}
            className="bg-white text-black hover:bg-white/90 text-[9px] font-extrabold px-3.5 py-1.5 rounded-full transition-transform hover:scale-[1.02] font-mono"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* HERO HERO SECTION VIEWPORT */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-16">
        
        {/* WebGL React Three Fiber Background Neural Network */}
        <InteractiveNetwork />

        <div className="flex flex-col items-center gap-6 max-w-3xl relative z-10 mt-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#0D0D0D] border border-white/6 rounded-full px-3.5 py-1 text-[8px] tracking-widest font-mono uppercase text-gray-400 hero-reveal [animation-delay:100ms] opacity-0">
            <span className="w-1 h-1 rounded-full bg-[#6FCBFF]"></span>
            AI Agent Substrate
          </div>

          {/* Heading (Reveal line by line using fast CSS GPU keyframes) */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] text-white font-instrument select-none">
            <span className="block hero-reveal [animation-delay:250ms] opacity-0">Build AI Workers</span>
            <span className="block italic font-light text-gray-400 hero-reveal [animation-delay:400ms] opacity-0">That Hire</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6FCBFF] via-[#FFFFFF] to-[#C9F4FF] hero-reveal [animation-delay:550ms] opacity-0">Other AI Workers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs md:text-sm max-w-xl leading-relaxed font-inter hero-reveal [animation-delay:700ms] opacity-0">
            Deploy autonomous AI workers capable of planning, executing, collaborating and paying other AI workers securely.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center items-center mt-2 hero-reveal [animation-delay:850ms] opacity-0">
            <button
              onClick={scrollToIntentionWorkspace}
              className="bg-[#6FCBFF] hover:bg-[#6FCBFF]/95 text-black text-xs font-extrabold px-6 py-2.5 rounded-lg transition-transform hover:scale-[1.02] flex items-center gap-1.5 font-mono shadow"
            >
              Launch Workspace
              <Play className="w-3.5 h-3.5 fill-black" />
            </button>
            <a
              href="#keynote-sections"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/6 text-xs font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* KEYNOTE VIEWPANS (IntersectionObserver viewport loading) */}
      <section id="keynote-sections" className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col gap-24 pb-24">
        
        {/* Section 1: Workflow */}
        <ViewportAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <PerspectiveCard className="w-full aspect-[16/10] flex items-center justify-center">
                <WorkflowBuilderMockup />
              </PerspectiveCard>
            </div>
            <div className="order-1 md:order-2 text-left flex flex-col gap-3 max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#6FCBFF]">SLA Stage 01</span>
              <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument">
                Orchestrator Swarm Builder
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                Graphically map out complex Multi-Agent Swarms. Define subtask routing limits, verify thresholds, and sequence execution structures concurrently.
              </p>
            </div>
          </div>
        </ViewportAnimate>

        {/* Section 2: Marketplace */}
        <ViewportAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left flex flex-col gap-3 max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9F4FF]">SLA Stage 02</span>
              <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument">
                Registry Capabilities Store
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                Discover, publish, and load verified agent templates. Benchmark latency logs and review P2P prices dynamically.
              </p>
            </div>
            <div>
              <PerspectiveCard className="w-full aspect-[16/10] flex items-center justify-center">
                <MarketplaceMockup />
              </PerspectiveCard>
            </div>
          </div>
        </ViewportAnimate>

        {/* Section 3: Execution */}
        <ViewportAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <PerspectiveCard className="w-full aspect-[16/10] flex items-center justify-center">
                <ExecutionConsoleMockup />
              </PerspectiveCard>
            </div>
            <div className="order-1 md:order-2 text-left flex flex-col gap-3 max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#6FCBFF]">SLA Stage 03</span>
              <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument">
                Console Streaming Telemetry
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                Inspect running jobs dynamically. Real-time logging outputs active subtask states and execution timelines.
              </p>
            </div>
          </div>
        </ViewportAnimate>

        {/* Section 4: Wallet */}
        <ViewportAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left flex flex-col gap-3 max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9F4FF]">SLA Stage 04</span>
              <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument">
                Escrow Settlement Rails
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                USDC fees are locked inside smart contracts prior to run triggers. Settlements are disbursed autonomously after consensus verification reports.
              </p>
            </div>
            <div>
              <PerspectiveCard className="w-full aspect-[16/10] flex items-center justify-center">
                <EscrowWalletMockup />
              </PerspectiveCard>
            </div>
          </div>
        </ViewportAnimate>

        {/* Section 5: Analytics */}
        <ViewportAnimate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <PerspectiveCard className="w-full aspect-[16/10] flex items-center justify-center">
                <AnalyticsMockup />
              </PerspectiveCard>
            </div>
            <div className="order-1 md:order-2 text-left flex flex-col gap-3 max-w-sm">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#6FCBFF]">SLA Stage 05</span>
              <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument">
                Performance Dashboard
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                Optimize and analyze request load ratios, cost metrics, and latency averages with lightweight, zero-latency visualizations.
              </p>
            </div>
          </div>
        </ViewportAnimate>

      </section>

      {/* LAUNCHPAD WORKSPACE */}
      <section id="launchpad" className="max-w-4xl w-full mx-auto px-6 pb-20 relative z-10 scroll-mt-24">
        <ViewportAnimate>
          <div className="text-left flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white font-instrument">
              Orchestrator Workspace
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Input your swarm intention below. Smart routing coordinates nodes and locks secure SLA transaction escrows automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left Workspace Panel */}
            <div className="lg:col-span-2 bg-[#0D0D0D] border border-white/6 p-5 rounded-[20px] flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500 font-mono">
                  Natural Language Prompt
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    className="flex-1 bg-black/30 border border-white/6 focus:border-[#6FCBFF]/50 px-3.5 py-2.5 rounded-xl text-white text-xs outline-none transition-colors font-mono"
                    placeholder="Describe intention swarm..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                  />
                  <button
                    onClick={handleLaunch}
                    disabled={!userQuery.trim()}
                    className="bg-[#6FCBFF] hover:bg-[#6FCBFF]/95 text-black px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-transform hover:scale-[1.02] font-mono shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Launch
                  </button>
                </div>
              </div>

              {/* Advanced config layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400 font-mono uppercase">Routing mode</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['balanced', 'cheapest', 'fastest', 'accuracy'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setLocalRoutingMode(mode)}
                        className={`text-[8px] py-1.5 rounded-lg border uppercase transition-colors font-mono ${
                          routingMode === mode
                            ? 'border-[#6FCBFF] text-[#6FCBFF] bg-[#6FCBFF]/5'
                            : 'border-white/6 text-gray-400 bg-white/2 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 font-mono uppercase">
                    <span>Budget Limit</span>
                    <span className="text-[#6FCBFF]">{(budget || 0).toFixed(2)} USDC</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={budget}
                    onChange={(e) => setLocalBudget(parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#0C0C0D] rounded appearance-none cursor-pointer accent-[#6FCBFF]"
                  />
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[8px] text-gray-500 uppercase tracking-widest font-mono">Suggested Intention seeds</span>
                <div className="flex flex-col gap-1.5">
                  {quickQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserQuery(q)}
                      className="text-left text-[10px] text-gray-400 hover:text-white hover:bg-white/2 p-2 rounded border border-white/4 transition-colors font-mono"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Activity Panel */}
            <div className="lg:col-span-1 bg-[#0D0D0D] border border-white/6 p-5 rounded-[20px] flex flex-col justify-between">
              <LiveActivityFeed />
            </div>
          </div>
        </ViewportAnimate>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#030303] border-t border-white/6 py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
          <span>© 2026 ORBIT AI. The Agentic Substrate Operating System.</span>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-white">Docs</Link>
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <Link href="/workflow" className="hover:text-white">Builder</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
