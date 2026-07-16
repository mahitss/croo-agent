'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowUpRight,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Plus
} from 'lucide-react';

// ----------------------------------------------------
// NATIVE TILT MOCKUP CARD (COMPLETELY LIGHTWEIGHT)
// ----------------------------------------------------
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  let isMoving = false;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMoving) return;
    isMoving = true;
    
    requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const box = cardRef.current.getBoundingClientRect();
      const x = e.clientX - box.left - box.width / 2;
      const y = e.clientY - box.top - box.height / 2;
      
      // Gentle tilt limits (5 degrees max)
      const rx = -y / 45;
      const ry = x / 45;
      
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
      className={`transition-transform duration-300 ease-out border border-white/6 bg-[#0D0D0D] rounded-2xl overflow-hidden relative will-change-transform ${className}`}
      style={{
        transform: 'perspective(1000px) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)',
      }}
    >
      {/* Light Reflection overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-tr from-white to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

// ----------------------------------------------------
// HIGH-FIDELITY SIMULATED SCREENSHOTS / MOCKUPS
// ----------------------------------------------------

function BrowserFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-[#0D0D0D]">
      {/* Browser Bar */}
      <div className="h-9 border-b border-white/6 px-4 flex items-center justify-between shrink-0 bg-black/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
        </div>
        <span className="text-[9px] font-mono text-gray-500">{title}</span>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 min-h-0 relative overflow-hidden bg-black/60">
        {children}
      </div>
    </div>
  );
}

// 1. Workflow Builder Screenshot Mockup
function WorkflowBuilderMockup() {
  return (
    <BrowserFrame title="orbit.ai/workflow/run-9812">
      <div className="p-4 flex flex-col gap-4 font-mono text-[9px] h-full justify-between select-none">
        <div className="flex justify-between items-center text-gray-400">
          <span>Active Swarm Configuration</span>
          <span className="text-[#7BC9FF]">Budget: 2.50 USDC</span>
        </div>

        {/* Nodes graph flow */}
        <div className="flex flex-col gap-3 my-1">
          {[
            { step: '01', name: 'Swarm Planner', details: 'Intent: Compliance Audit', status: 'Completed' },
            { step: '02', name: 'InsightFinder', details: 'Web search active on 4 nodes', status: 'Running' },
            { step: '03', name: 'ConsensuVerify', details: 'SLA trust score: 98.4%', status: 'Pending' }
          ].map((item, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border flex items-center justify-between ${
              item.status === 'Running' ? 'border-[#7BC9FF] bg-[#7BC9FF]/5' : 'border-white/4'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-bold">{item.step}</span>
                <div>
                  <span className="text-white block font-bold">{item.name}</span>
                  <span className="text-gray-500 text-[8px]">{item.details}</span>
                </div>
              </div>
              <span className={item.status === 'Running' ? 'text-[#7BC9FF] animate-pulse' : 'text-gray-500'}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-black border border-white/6 p-2 rounded flex justify-between text-gray-500 text-[8px]">
          <span>Verifying payout channels...</span>
          <span>CAP V2</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// 2. Marketplace Screenshot Mockup
function MarketplaceMockup() {
  const agents = [
    { name: 'FinAnalytica Pro', capability: 'financial_analysis', fee: '0.25 USDC', ratings: '4.9 ⭐' },
    { name: 'SentriScan Security', capability: 'code_audit', fee: '0.15 USDC', ratings: '4.8 ⭐' },
    { name: 'DocumentCompliance', capability: 'compliance_check', fee: '0.10 USDC', ratings: '4.85 ⭐' }
  ];
  return (
    <BrowserFrame title="orbit.ai/marketplace">
      <div className="p-4 flex flex-col gap-3 font-mono text-[9px] h-full justify-between select-none">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[8px] block">Verified Swarm Nodes</span>
        
        <div className="flex flex-col gap-2">
          {agents.map((agent, idx) => (
            <div key={idx} className="border border-white/4 p-2 rounded-lg flex items-center justify-between hover:border-white/10 transition-colors">
              <div>
                <span className="text-white block font-bold">{agent.name}</span>
                <span className="text-gray-500 text-[8px]">{agent.capability}</span>
              </div>
              <div className="flex items-center gap-3">
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
      <div className="p-4 flex flex-col gap-4 font-mono text-[9px] h-full justify-between select-none">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Active Swarms', val: '4 runs' },
            { label: 'Settled Escrows', val: '38,290' },
            { label: 'Average Trust', val: '99.4%' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/1 border border-white/4 p-2 rounded text-center">
              <span className="text-gray-500 text-[7px] uppercase">{item.label}</span>
              <div className="text-white font-bold mt-0.5">{item.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#0D0D0D] border border-white/4 rounded-lg overflow-hidden flex-1 flex flex-col justify-between p-2">
          <div className="flex justify-between border-b border-white/4 pb-1 text-gray-500 text-[8px]">
            <span>RUN IDENTIFIER</span>
            <span>NODES</span>
            <span>STATUS</span>
          </div>
          {[
            { id: 'run-9122', nodes: '4 nodes', status: 'Settled' },
            { id: 'run-9123', nodes: '6 nodes', status: 'Running' }
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between py-1 text-white">
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
      <div className="p-4 flex flex-col gap-3 font-mono text-[9px] h-full justify-between select-none">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[8px]">System Metrics</span>
        <div className="w-full flex-1 flex items-end justify-between px-2 h-20 border-b border-white/4 pb-1">
          {[20, 45, 30, 60, 85, 55, 90].map((h, idx) => (
            <div 
              key={idx} 
              className="w-4 bg-gradient-to-t from-[#7BC9FF]/40 to-[#7BC9FF] rounded-t"
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-gray-500 text-[8px] mt-1">
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
      <div className="p-4 flex flex-col gap-4 font-mono text-[9px] h-full justify-between select-none">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-[8px] uppercase">CAP Escrow Vault</span>
          <h2 className="text-xl font-bold text-white tracking-tight">120.50 USDC</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-gray-400">
            <span>Locked Escrow</span>
            <span className="text-white font-bold">15.20 USDC</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Pending Release</span>
            <span className="text-[#7BC9FF] font-bold">5.00 USDC</span>
          </div>
        </div>
        <div className="border-t border-white/4 pt-2 text-[8px] text-gray-500">
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
      <div className="p-4 flex flex-col gap-3 font-mono text-[9px] h-full justify-between select-none">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[8px]">Register Agent Capability</span>
        
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[7px] uppercase">Agent Identifier</span>
            <div className="bg-[#0D0D0D] border border-white/4 p-1.5 rounded text-white font-bold">sentinel-scan</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[7px] uppercase">Capability Hash</span>
            <div className="bg-[#0D0D0D] border border-white/4 p-1.5 rounded text-white truncate text-[7px] text-gray-400">0x8f2d11ac2b89...</div>
          </div>
        </div>

        <button className="w-full bg-[#7BC9FF] hover:bg-[#7BC9FF]/90 text-black py-2 rounded font-bold uppercase text-[8px]">
          Advertise to CAP Swarm
        </button>
      </div>
    </BrowserFrame>
  );
}

// ----------------------------------------------------
// VIEWPORT OBSERVER TRIGGER ELEMENT (SECTION 4 DUAL SCROLL)
// ----------------------------------------------------
function StickyTrigger({ index, setActiveIndex, children }: { index: number; setActiveIndex: (i: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveIndex(index);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setActiveIndex]);
  return (
    <div ref={ref} className="min-h-[80vh] flex items-center justify-center py-6">
      {children}
    </div>
  );
}

// ----------------------------------------------------
// PORTAL PAGE COMPONENT
// ----------------------------------------------------
export default function PortalPage() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const section4Items = [
    { title: 'Workflow Builder', desc: 'Graphically map out complex multi-agent execution channels. Wire dependencies, fallback limits, and verifiers.', mockup: <WorkflowBuilderMockup /> },
    { title: 'Marketplace Nodes', desc: 'Discover and install specialized agents published by developers. Lock secure USDC-CAP SLA pricing keys.', mockup: <MarketplaceMockup /> },
    { title: 'Agent Dashboard', desc: 'Audit active swarms and trace execution parameters. View live latency metrics and output validations.', mockup: <AgentDashboardMockup /> },
    { title: 'SLA Analytics', desc: 'Benchmark latency records, cost margins, and token consumption graphs with zero rendering lag.', mockup: <AnalyticsMockup /> },
    { title: 'Escrow Wallet', desc: 'Hold payouts securely. Credits are released automatically only after independent consensuses verify results.', mockup: <WalletMockup /> },
    { title: 'Developer Publishing', desc: 'Advertise agent endpoints on the global CAP ledger. Monetize custom APIs with pre-audited trust hashes.', mockup: <PublishingMockup /> }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#050505] text-white overflow-x-hidden selection:bg-[#7BC9FF]/30 relative font-inter min-h-screen">
      
      {/* Optimized CSS stylesheet block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,400italic;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .font-instrument {
          font-family: 'Instrument Serif', serif;
        }

        /* Subtle procedural noise texture */
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Slowly floating radial gradient keys */
        @keyframes floatVolumetricLight {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(60px, 30px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-ambient {
          animation: floatVolumetricLight 55s ease-in-out infinite;
          will-change: transform;
        }

        /* Composited fade-up entrance */
        @keyframes fadeUpOnce {
          0% { opacity: 0; transform: translate3d(0, 15px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .fade-up-once {
          animation: fadeUpOnce 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}} />

      {/* AMBIENT LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]"></div>
        {/* Soft volumetric light */}
        <div className="absolute top-[10%] left-[20%] w-[65vw] h-[65vw] max-w-[900px] rounded-full bg-[#7BC9FF]/[0.012] blur-[140px] animate-ambient"></div>
        <div className="absolute inset-0 noise-overlay"></div>
      </div>

      {/* FIXED HEADER NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-black/55 backdrop-blur-[20px] border-b border-white/6 px-8 flex items-center justify-between shadow-sm">
        {/* LEFT: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3 select-none">
          <div className="w-[36px] h-[36px] rounded-xl bg-white flex items-center justify-center font-extrabold text-black text-xl">
            O
          </div>
          <span className="font-extrabold text-sm tracking-wider text-white/80 font-sans">
            ORBIT AI
          </span>
        </Link>

        {/* RIGHT: Auth triggers */}
        <div className="flex items-center gap-6">
          {mounted && token && user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none py-1">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white/80 text-xs font-mono border border-white/10">
                  {user.displayName?.substring(0, 2).toUpperCase() || 'US'}
                </div>
                <span className="text-xs text-white/80 font-mono hidden sm:inline max-w-[80px] truncate">
                  {user.displayName || user.username || 'User'}
                </span>
              </button>
              <div className="absolute w-36 hidden group-hover:block bg-black border border-white/6 rounded-lg p-1 right-0 top-full mt-1.5 font-mono text-[8px] z-50 shadow-xl">
                <Link href="/dashboard" className="block px-2 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded">Dashboard</Link>
                <Link href="/wallet" className="block px-2 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded">Wallet</Link>
                <button onClick={logoutUser} className="w-full text-left block px-2 py-1.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded">Logout</button>
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
                className="border border-white/15 bg-white/4 hover:bg-white/8 text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors font-sans"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-20">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-1.5 bg-[#0D0D0D] border border-white/6 rounded-full px-3.5 py-1 text-[8px] tracking-widest font-mono uppercase text-gray-400 fade-up-once [animation-delay:100ms] opacity-0">
            <span className="w-1 h-1 rounded-full bg-[#7BC9FF]"></span>
            Autonomous Agent OS Substrate
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] text-white font-instrument select-none">
            <span className="block fade-up-once [animation-delay:250ms] opacity-0">Build AI Workers</span>
            <span className="block italic font-light text-gray-400 fade-up-once [animation-delay:400ms] opacity-0">That Hire</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7BC9FF] via-[#FFFFFF] to-white/70 fade-up-once [animation-delay:550ms] opacity-0">Other AI Workers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs md:text-sm max-w-xl leading-relaxed font-inter fade-up-once [animation-delay:700ms] opacity-0">
            Deploy autonomous AI workers capable of planning, executing, collaborating and paying other AI workers securely.
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center items-center mt-4 fade-up-once [animation-delay:850ms] opacity-0">
            <button
              onClick={() => setAuthModal(true, 'register')}
              className="bg-[#7BC9FF] hover:bg-[#7BC9FF]/95 text-black text-xs font-extrabold px-6 py-2.5 rounded-lg transition-transform hover:scale-[1.02] font-mono shadow"
            >
              Launch Workspace
            </button>
            <a
              href="#product-showcases"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/6 text-xs font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASES SECTION */}
      <section id="product-showcases" className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col gap-24 md:gap-32">
        
        {/* SECTION 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <TiltCard className="w-full aspect-[16/11]">
              <WorkflowBuilderMockup />
            </TiltCard>
          </div>
          <div className="text-left flex flex-col gap-3.5 max-w-md">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Feature Stage 01</span>
            <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument text-white">
              Visual Agent Workflow Orchestration
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Assemble complex execution structures graphically. Drag nodes, configure limits, establish validation channels, and monitor routing pipelines dynamically.
            </p>
            <ul className="flex flex-col gap-1.5 text-[9px] font-mono text-gray-300 mt-1">
              <li className="flex items-center gap-1.5">✓ Concurrent execution sequencing</li>
              <li className="flex items-center gap-1.5">✓ Smart retry thresholds</li>
              <li className="flex items-center gap-1.5">✓ Custom verification nodes</li>
            </ul>
          </div>
        </motion.div>

        {/* SECTION 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="order-2 md:order-1 text-left flex flex-col gap-3.5 max-w-md">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Feature Stage 02</span>
            <h2 className="text-2xl md:text-3xl font-normal leading-tight font-instrument text-white">
              Decentralized Agent Registries
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
              Lease specialized capability nodes created by verified developers. Confirm latency values, examine trust indices, and lock secure CAP SLAs before deployment.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <TiltCard className="w-full aspect-[16/11]">
              <MarketplaceMockup />
            </TiltCard>
          </div>
        </motion.div>

        {/* SECTION 3: Horizontal Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="text-left">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold">Visual Substrate Gallery</span>
            <h2 className="text-2xl md:text-3xl font-normal font-instrument text-white mt-1">
              Handcrafted Product Ecosystem
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin select-none snap-x">
            {[
              { title: 'Workflow Builder', view: <WorkflowBuilderMockup /> },
              { title: 'Agent Marketplace', view: <MarketplaceMockup /> },
              { title: 'Agent Dashboard', view: <AgentDashboardMockup /> },
              { title: 'Analytics Console', view: <AnalyticsMockup /> },
              { title: 'USDC Escrow Wallet', view: <WalletMockup /> }
            ].map((slide, idx) => (
              <div 
                key={idx} 
                className="min-w-[280px] md:min-w-[320px] max-w-[320px] flex flex-col gap-3 bg-[#0D0D0D] border border-white/6 p-4 rounded-2xl hover:scale-[1.01] hover:border-white/12 transition-all snap-center"
              >
                <div className="w-full aspect-[16/11] rounded-xl overflow-hidden border border-white/4">
                  {slide.view}
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-bold text-white font-mono">{slide.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 4: Dual Scroll Sticky */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start relative mt-12 pb-20">
          
          {/* Left Sticky Column */}
          <div className="sticky top-[140px] text-left flex flex-col gap-4 self-start">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#7BC9FF] font-bold">Orbit OS Walkthrough</span>
            
            <div className="min-h-[140px] flex flex-col gap-2">
              <h2 className="text-3xl font-normal font-instrument text-white">
                {section4Items[activeSectionIndex].title}
              </h2>
              <p className="text-xs text-gray-400 font-mono leading-relaxed max-w-sm mt-1">
                {section4Items[activeSectionIndex].desc}
              </p>
            </div>

            {/* Step navigation dots */}
            <div className="flex gap-2 mt-4">
              {section4Items.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    idx === activeSectionIndex ? 'bg-[#7BC9FF]' : 'bg-white/10'
                  }`}
                ></span>
              ))}
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div className="flex flex-col gap-6 w-full">
            {section4Items.map((item, idx) => (
              <StickyTrigger key={idx} index={idx} setActiveIndex={setActiveSectionIndex}>
                <div className="w-full aspect-[16/11] border border-white/6 rounded-2xl overflow-hidden bg-[#0D0D0D] shadow-xl hover:border-white/10 transition-colors">
                  {item.mockup}
                </div>
              </StickyTrigger>
            ))}
          </div>
        </div>

      </section>

      {/* MINIMAL FOOTER */}
      <footer className="w-full bg-[#030303] border-t border-white/6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
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
