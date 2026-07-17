'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Globe, 
  Terminal, 
  Wallet,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

// Viewport entry reveal transition using requestAnimationFrame & IntersectionObserver
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
        transform: visible ? 'translate3d(0, 0, 0) rotateX(0deg)' : 'translate3d(0, 20px, 0) rotateX(3deg)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
      className="w-full flex-shrink-0"
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------
// HIGH-FIDELITY SIMULATED MACBOOK SCREENSHOTS
// ----------------------------------------------------

function BrowserFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#0D0D0D] border border-white/6 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] select-none">
      {/* Browser Bar */}
      <div className="h-10 border-b border-white/6 px-4 flex items-center justify-between shrink-0 bg-black/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
        </div>
        <span className="text-[10px] font-mono text-gray-500 tracking-wide">{title}</span>
        <div className="w-10"></div>
      </div>
      <div className="flex-1 min-h-0 relative overflow-hidden bg-black/70">
        {/* Glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent pointer-events-none z-10" />
        {children}
      </div>
    </div>
  );
}

// 1. Workflow Builder Screenshot
function WorkflowBuilderMockup() {
  return (
    <BrowserFrame title="orbit.ai/workflow/new-swarm">
      <div className="p-5 flex flex-col gap-5 font-mono text-[10px] h-full justify-between">
        <div className="flex justify-between items-center text-gray-400">
          <span>Active Swarm Configuration</span>
          <span className="text-[#7BC9FF]">Budget: 2.50 USDC</span>
        </div>

        {/* Nodes graph flow */}
        <div className="flex flex-col gap-3 my-2">
          {[
            { step: '01', name: 'Swarm Planner', details: 'Intent: Compliance Audit', status: 'Completed' },
            { step: '02', name: 'InsightFinder', details: 'Web search active on 4 nodes', status: 'Running' },
            { step: '03', name: 'ConsensuVerify', details: 'SLA trust score: 98.4%', status: 'Pending' }
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${
              item.status === 'Running' ? 'border-[#7BC9FF] bg-[#7BC9FF]/5' : 'border-white/4'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold">{item.step}</span>
                <div>
                  <span className="text-white block font-bold">{item.name}</span>
                  <span className="text-gray-500 text-[9px]">{item.details}</span>
                </div>
              </div>
              <span className={item.status === 'Running' ? 'text-[#7BC9FF] animate-pulse font-bold' : 'text-gray-500'}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-black border border-white/6 p-3 rounded-lg flex justify-between text-gray-500 text-[9px]">
          <span>Verifying payout channels...</span>
          <span>CAP V2</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// 2. Marketplace Screenshot
function MarketplaceMockup() {
  const agents = [
    { name: 'FinAnalytica Pro', capability: 'financial_analysis', fee: '0.25 USDC', ratings: '4.9 ⭐' },
    { name: 'SentriScan Security', capability: 'code_audit', fee: '0.15 USDC', ratings: '4.8 ⭐' },
    { name: 'DocumentCompliance', capability: 'compliance_check', fee: '0.10 USDC', ratings: '4.85 ⭐' }
  ];
  return (
    <BrowserFrame title="orbit.ai/marketplace">
      <div className="p-5 flex flex-col gap-4 font-mono text-[10px] h-full justify-between">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] block">Verified Swarm Nodes</span>
        
        <div className="flex flex-col gap-3">
          {agents.map((agent, idx) => (
            <div key={idx} className="border border-white/4 p-3 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
              <div>
                <span className="text-white block font-bold">{agent.name}</span>
                <span className="text-gray-500 text-[9px]">{agent.capability}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#7BC9FF] font-bold">{agent.fee}</span>
                <span className="text-gray-500">{agent.ratings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// 3. Agent Dashboard Mockup
function AgentDashboardMockup() {
  return (
    <BrowserFrame title="orbit.ai/dashboard">
      <div className="p-5 flex flex-col gap-4 font-mono text-[10px] h-full justify-between">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Active Swarms', val: '4 runs' },
            { label: 'Settled Escrows', val: '38,290' },
            { label: 'Average Trust', val: '99.4%' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/1 border border-white/4 p-3 rounded-xl text-center">
              <span className="text-gray-500 text-[8px] uppercase">{item.label}</span>
              <div className="text-white font-bold mt-1 text-xs">{item.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#0D0D0D] border border-white/4 rounded-xl overflow-hidden flex-1 flex flex-col justify-between p-3">
          <div className="flex justify-between border-b border-white/4 pb-1.5 text-gray-500 text-[9px]">
            <span>RUN IDENTIFIER</span>
            <span>NODES</span>
            <span>STATUS</span>
          </div>
          {[
            { id: 'run-9122', nodes: '4 nodes', status: 'Settled' },
            { id: 'run-9123', nodes: '6 nodes', status: 'Running' }
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between py-1.5 text-white">
              <span>{row.id}</span>
              <span>{row.nodes}</span>
              <span className={row.status === 'Running' ? 'text-[#7BC9FF]' : 'text-gray-400'}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// 4. Analytics Mockup
function AnalyticsMockup() {
  return (
    <BrowserFrame title="orbit.ai/analytics">
      <div className="p-5 flex flex-col gap-4 font-mono text-[10px] h-full justify-between">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">System Metrics</span>
        <div className="w-full flex-1 flex items-end justify-between px-3 h-24 border-b border-white/4 pb-1.5">
          {[20, 45, 30, 60, 85, 55, 90, 70, 40, 80].map((h, idx) => (
            <div 
              key={idx} 
              className="w-5 bg-gradient-to-t from-[#7BC9FF]/40 to-[#7BC9FF] rounded-t"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-gray-500 text-[9px]">
          <span>LATENCY: 850ms</span>
          <span>THROUGHPUT: 2.4k tok/s</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// 5. Wallet Mockup
function WalletMockup() {
  return (
    <BrowserFrame title="orbit.ai/wallet">
      <div className="p-5 flex flex-col gap-5 font-mono text-[10px] h-full justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-gray-500 text-[8px] uppercase">CAP Escrow Vault</span>
          <h2 className="text-2xl font-bold text-white tracking-tight">120.50 USDC</h2>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-gray-400">
            <span>Locked Escrow</span>
            <span className="text-white font-bold">15.20 USDC</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Pending Release</span>
            <span className="text-[#7BC9FF] font-bold">5.00 USDC</span>
          </div>
        </div>
        <div className="border-t border-white/4 pt-2.5 text-[9px] text-gray-500">
          🔒 Securing SLA releases via CROO V2 API keys
        </div>
      </div>
    </BrowserFrame>
  );
}

// 6. Publishing Mockup
function PublishingMockup() {
  return (
    <BrowserFrame title="orbit.ai/developers/publish">
      <div className="p-5 flex flex-col gap-4 font-mono text-[10px] h-full justify-between">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Register Agent Capability</span>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-gray-500 text-[8px] uppercase">Agent Identifier</span>
            <div className="bg-[#0D0D0D] border border-white/4 p-2 rounded-lg text-white font-bold">sentinel-scan</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-gray-500 text-[8px] uppercase">Capability Hash</span>
            <div className="bg-[#0D0D0D] border border-white/4 p-2 rounded-lg text-white truncate text-[8px] text-gray-400 font-mono">0x8f2d11ac2b89...</div>
          </div>
        </div>

        <button className="w-full bg-[#7BC9FF] hover:bg-[#7BC9FF]/90 text-black py-2.5 rounded-lg font-bold uppercase text-[9px]">
          Advertise to CAP Swarm
        </button>
      </div>
    </BrowserFrame>
  );
}

export default function PortalPage() {
  const [mounted, setMounted] = useState(false);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const isAuthenticated = mounted && !!token && !!user;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#050505] text-white overflow-x-hidden selection:bg-[#7BC9FF]/30 relative font-inter min-h-screen">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,400italic;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .font-instrument {
          font-family: 'Instrument Serif', serif;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        @keyframes floatAmbientLight {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(50px, 25px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-ambient {
          animation: floatAmbientLight 55s ease-in-out infinite;
          will-change: transform;
        }

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
        <div className="absolute inset-0 bg-[#050505]"></div>
        {/* Soft volumetric light */}
        <div className="absolute top-[10%] left-[20%] w-[65vw] h-[65vw] max-w-[900px] rounded-full bg-[#7BC9FF]/[0.012] blur-[140px] animate-ambient"></div>
        <div className="absolute inset-0 noise-overlay"></div>
      </div>

      {/* CLEAN NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-black/55 backdrop-blur-[20px] border-b border-white/6 px-8 flex items-center justify-between shadow-sm">
        {/* LEFT: Logo & Brand Name */}
        <Link href={isAuthenticated ? "/workspaces" : "/"} className="flex items-center gap-3 select-none no-underline">
          <div className="w-[36px] h-[36px] rounded-xl bg-white flex items-center justify-center font-extrabold text-black text-xl">
            O
          </div>
          <span className="font-extrabold text-sm tracking-wider text-white/80 font-sans">
            ORBIT AI
          </span>
        </Link>

        {/* CENTER: Navigation Links (Empty under Guest/Public navbar rules) */}
        <div className="hidden md:flex items-center gap-8" />

        {/* RIGHT: Auth */}
        <div className="flex items-center gap-6">
          {mounted && isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="relative group" style={{ position: 'relative' }}>
                <button className="flex items-center gap-2 focus:outline-none bg-transparent border-0 cursor-pointer text-left py-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4EA3FF] to-white flex items-center justify-center font-bold text-black text-xs select-none">
                    {user.displayName && user.displayName.length > 0 
                      ? user.displayName.substring(0, 2).toUpperCase() 
                      : user.username && user.username.length > 0 
                        ? user.username.substring(0, 2).toUpperCase() 
                        : (user.email ? user.email.substring(0, 2).toUpperCase() : 'US')
                    }
                  </div>
                  <span className="text-xs text-white/80 hover:text-white font-sans hidden md:inline max-w-[100px] truncate select-none">
                    {user.displayName || user.username || 'User'}
                  </span>
                </button>
                
                {/* Dropdown Menu Wrapper */}
                <div 
                  className="absolute w-56 hidden group-hover:block hover:block animate-in fade-in duration-100"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: '0',
                    zIndex: 9999,
                  }}
                >
                  <div className="bg-black border border-white/10 rounded-xl shadow-xl p-1.5 font-sans text-xs">
                    {/* User Profile Header */}
                    <div className="px-3 py-2 border-b border-white/10 flex flex-col gap-0.5 select-none text-left">
                      <span className="font-semibold text-white truncate">
                        {user.displayName || user.username || 'Mahit Saxena'}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate">
                        {user.email || 'mahitsaxena008@gmail.com'}
                      </span>
                    </div>

                    <div className="mt-1">
                      <Link href="/workspaces" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline">
                        Dashboard
                      </Link>
                      <Link href="/settings?tab=billing" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline">
                        Wallet
                      </Link>
                      <Link href="/settings?tab=profile" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline">
                        Profile
                      </Link>
                      <Link href="/settings?tab=security" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-left no-underline">
                        Settings
                      </Link>
                      <button
                        onClick={logoutUser}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all pointer-events-auto bg-transparent border-0 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setAuthModal(true, 'login')}
                className="text-xs font-medium text-white/80 hover:text-white transition-colors font-sans bg-transparent border-0 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setAuthModal(true, 'register')}
                className="border border-white/15 bg-white/4 hover:bg-white/8 text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors font-sans cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION (100vh allowed exclusively) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-20">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-[#0D0D0D] border border-white/6 rounded-full px-3.5 py-1 text-[8px] tracking-widest font-mono uppercase text-gray-400 hero-reveal [animation-delay:100ms] opacity-0">
            <span className="w-1 h-1 rounded-full bg-[#7BC9FF]"></span>
            Autonomous Agent OS Substrate
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] text-white font-instrument select-none">
            <span className="block hero-reveal [animation-delay:250ms] opacity-0">Build AI Workers</span>
            <span className="block italic font-light text-gray-400 hero-reveal [animation-delay:400ms] opacity-0">That Hire</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7BC9FF] via-[#FFFFFF] to-white/70 hero-reveal [animation-delay:550ms] opacity-0">Other AI Workers</span>
          </h1>

          <p className="text-gray-400 text-xs md:text-sm max-w-xl leading-relaxed font-inter hero-reveal [animation-delay:700ms] opacity-0">
            Deploy autonomous AI workers capable of planning, executing, collaborating and paying other AI workers securely.
          </p>

          <div className="flex gap-4 justify-center items-center mt-4 hero-reveal [animation-delay:850ms] opacity-0">
            <button
              onClick={() => setAuthModal(true, 'register')}
              className="bg-[#7BC9FF] hover:bg-[#7BC9FF]/95 text-black text-xs font-extrabold px-6 py-2.5 rounded-lg font-mono shadow"
            >
              Launch Workspace
            </button>
            <a
              href="#showcases"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/6 text-xs font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* CONTINUOUS ALTERNATING PRODUCT SHOWCASES SECTION (No 100vh limitations) */}
      <section id="showcases" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-0 flex flex-col">
        
        {/* Showcase 1: Workflow Builder (Left Image, Right Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] flex-shrink-0">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <WorkflowBuilderMockup />
              </div>
            </ViewportAnimate>
          </div>
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 01</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              Visual Agent Workflow Orchestration
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Build and sequence parallel agent channels. Drag nodes to establish dependencies, assign retries, configure maximum budget thresholds, and verify output consensus.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Concurrent execution sequencing</li>
              <li className="flex items-center gap-2">✓ Automated validation checks</li>
              <li className="flex items-center gap-2">✓ Dynamic fallback routing mapping</li>
            </ul>
          </div>
        </div>

        {/* Showcase 2: Marketplace (Right Image, Left Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4 order-2 lg:order-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 02</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              Decentralized Agent Marketplace
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Discover and select pre-built agent nodes advertised on the ledger. Track completed jobs counters, examine historical trust scores, and evaluate base service fees.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Standardized CAP protocol definitions</li>
              <li className="flex items-center gap-2">✓ Real-time reputation evaluation</li>
              <li className="flex items-center gap-2">✓ 1-click package installs</li>
            </ul>
          </div>
          <div className="w-full lg:w-[55%] flex-shrink-0 order-1 lg:order-2">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <MarketplaceMockup />
              </div>
            </ViewportAnimate>
          </div>
        </div>

        {/* Showcase 3: Dashboard (Left Image, Right Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] flex-shrink-0">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <AgentDashboardMockup />
              </div>
            </ViewportAnimate>
          </div>
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 03</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              Interactive Swarms Dashboard
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Track running chains live. Inspect complete execution logs detailing token throughput metrics, transaction latency distributions, and active running durations.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Dynamic streaming console feeds</li>
              <li className="flex items-center gap-2">✓ Live status tracker monitors</li>
              <li className="flex items-center gap-2">✓ Comprehensive run history logs</li>
            </ul>
          </div>
        </div>

        {/* Showcase 4: Analytics (Right Image, Left Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4 order-2 lg:order-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 04</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              SLA Analytics Metrics
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Analyze request rates and verify success distributions. Recharts-rendered graphics optimize performance benchmarks to maintain high throughput ratios.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Zero-lag charts integration</li>
              <li className="flex items-center gap-2">✓ Cost and revenue monitoring</li>
              <li className="flex items-center gap-2">✓ SLA latency warnings</li>
            </ul>
          </div>
          <div className="w-full lg:w-[55%] flex-shrink-0 order-1 lg:order-2">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <AnalyticsMockup />
              </div>
            </ViewportAnimate>
          </div>
        </div>

        {/* Showcase 5: Wallet (Left Image, Right Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] flex-shrink-0">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <WalletMockup />
              </div>
            </ViewportAnimate>
          </div>
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 05</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              Escrow Wallet Settlements
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Lock workflow deposits inside secure smart escrow accounts. Settle payments to agent addresses automatically only after consensus verification confirms correct execution results.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Automated P2P disbursements</li>
              <li className="flex items-center gap-2">✓ Multi-node budget optimizations</li>
              <li className="flex items-center gap-2">✓ Transparent transaction auditing</li>
            </ul>
          </div>
        </div>

        {/* Showcase 6: Publishing (Right Image, Left Text) */}
        <div className="py-20 border-b border-white/6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[45%] text-left flex flex-col gap-4 order-2 lg:order-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orchestrator Stage 06</span>
            <h2 className="text-3xl font-normal leading-tight font-instrument text-white">
              Developer Node Publishing
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Advertise agent nodes on the global ledger. Register metadata, define capability schemas, lock pricing agreements, and get verified instantly on the CAP network.
            </p>
            <ul className="flex flex-col gap-2 text-[9px] font-mono text-gray-300 mt-2">
              <li className="flex items-center gap-2">✓ Secure metadata checks</li>
              <li className="flex items-center gap-2">✓ 1-click API endpoint registrations</li>
              <li className="flex items-center gap-2">✓ Automatic revenue allocations</li>
            </ul>
          </div>
          <div className="w-full lg:w-[55%] flex-shrink-0 order-1 lg:order-2">
            <ViewportAnimate>
              <div className="w-full aspect-[16/10]">
                <PublishingMockup />
              </div>
            </ViewportAnimate>
          </div>
        </div>

      </section>

      {/* CONVERGING FINAL CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-normal leading-tight font-instrument text-white">
          Ready to Build the Future of Autonomous AI?
        </h2>
        <p className="text-gray-400 text-xs font-mono max-w-md leading-relaxed">
          Deploy, execute, and monetize multi-agent swarms. Settle transaction fees autonomously on the CAP agent commerce protocol.
        </p>
        <button
          onClick={() => setAuthModal(true, 'register')}
          className="bg-[#7BC9FF] hover:bg-[#7BC9FF]/90 text-black text-xs font-extrabold px-8 py-3 rounded-lg transition-transform hover:scale-[1.02] font-mono shadow-[0_0_15px_rgba(123,201,255,0.2)] mt-2"
        >
          Launch Workspace
        </button>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#030303] border-t border-white/6 py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
          <span>© 2026 ORBIT AI. The Agentic Substrate OS.</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer" onClick={() => setAuthModal(true, 'login')}>Login</span>
            <span className="hover:text-white cursor-pointer" onClick={() => setAuthModal(true, 'register')}>Register</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
