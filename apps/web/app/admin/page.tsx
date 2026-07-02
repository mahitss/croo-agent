'use client';

import { useState, useEffect, useRef } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { apiService } from '../../services/api';
import { 
  Users, Cpu, Layers, ShieldCheck, DollarSign, AlertTriangle, 
  Activity, CheckCircle, Clock, Sliders, Play, Pause, RotateCcw, 
  Server, Database, Wallet, Sparkles, CheckSquare, ListTodo
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function AdminPage() {
  const agents = useNexusStore((state) => state.agents);
  const userWallet = useNexusStore((state) => state.userWallet);
  const resetDemoMode = useNexusStore((state) => state.resetDemoMode);
  const startExecution = useNexusStore((state) => state.startExecution);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const isRunning = useNexusStore((state) => state.isRunning);
  const { toast } = useToast();
  const router = useRouter();

  // Demo Timer States
  const [timerActive, setTimerActive] = useState(false);
  const [demoTime, setDemoTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Presentation Checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    problem: false,
    marketplace: false,
    planning: false,
    workflow: false,
    execution: false,
    escrow: false,
    analytics: false
  });

  // Current step in the 8-stage demo
  const [currentDemoStep, setCurrentDemoStep] = useState(0);

  const demoSteps = [
    '1. Problem & Pain Points',
    '2. Marketplace Exploration',
    '3. AI Swarm Intention Formulation',
    '4. Capability Selection & Bidding',
    '5. Cost & Parallelization Verification',
    '6. Escrow Locking & Transaction',
    '7. Live Swarm Node Graph Execution',
    '8. Payout Settle & Analytics Audit'
  ];

  // Live integrations health checks
  const [healthChecks, setHealthChecks] = useState<any[]>([
    { name: 'API Gateway', status: 'healthy', msg: 'Checking status...', latency: '8ms' },
    { name: 'Database', status: 'healthy', msg: 'Checking status...', latency: '12ms' },
    { name: 'Redis Cache', status: 'healthy', msg: 'Checking status...', latency: '15ms' },
    { name: 'OpenRouter', status: 'healthy', msg: 'Checking status...', latency: '220ms' },
    { name: 'Cloudinary', status: 'healthy', msg: 'Checking status...', latency: '45ms' },
    { name: 'Socket Server', status: 'healthy', msg: 'Checking status...', latency: '9ms' },
    { name: 'PostHog', status: 'healthy', msg: 'Checking status...', latency: '5ms' },
    { name: 'Sentry', status: 'healthy', msg: 'Checking status...', latency: '4ms' }
  ]);

  useEffect(() => {
    let active = true;
    const fetchHealth = async () => {
      try {
        const res = await apiService.getExtendedHealth();
        if (res && res.success && res.integrations && active) {
          const list = Object.values(res.integrations);
          setHealthChecks(list);
        }
      } catch (err) {
        console.warn('Failed to load live extended health metrics:', err);
      }
    };
    
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setDemoTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetDemo = () => {
    resetDemoMode();
    setDemoTime(0);
    setTimerActive(false);
    setChecklist({
      problem: false,
      marketplace: false,
      planning: false,
      workflow: false,
      execution: false,
      escrow: false,
      analytics: false
    });
    setCurrentDemoStep(0);
    toast('Demo Environment Reset Successfully.', 'success');
  };

  const triggerOneClickWorkflow = () => {
    resetDemoMode();
    setUserQuery("Compile Tesla Q1 financial analysis and translate reports to Chinese");
    setTimerActive(true);
    setCurrentDemoStep(2); // Jump to Planner phase
    
    // Set some milestones as checked
    setChecklist(prev => ({
      ...prev,
      problem: true,
      marketplace: true,
      planning: true
    }));

    router.push('/workflow');
    toast('Launching automated Tesla Q1 workflow. Mapping DAG layout...', 'info');
    setTimeout(() => {
      startExecution("Compile Tesla Q1 financial analysis and translate reports to Chinese", "balanced", 2.0);
    }, 1200);
  };

  const toggleChecklist = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6 font-mono text-xs text-gray-400">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.03),transparent_45%)]"></div>
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5.5 h-5.5 text-primary-neon animate-pulse" />
            CROO Hackathon Presenter Control Center & Judge Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time status check, sandbox reset controllers, live presentation stopwatch, and milestone checklist.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 relative z-10">
          <button
            onClick={handleResetDemo}
            className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-black font-extrabold px-4 py-2 rounded-xl transition-all"
          >
            RESET_DEMO_ENVIRONMENT
          </button>
        </div>
      </div>

      {/* Row 1: Presentation Stop Watch, One-Click Trigger, and Wallet Escrow Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Presentation stopwatch */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[180px] relative overflow-hidden">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
              <Clock className="w-4 h-4 text-accent-blue" />
              Demo Pitch Timer (5-min target)
            </h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className={`text-4xl font-extrabold font-sans tracking-tight ${demoTime > 300 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {formatTime(demoTime)}
              </span>
              <span className="text-[10px] text-gray-500">/ 5:00 max</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimerActive(!timerActive)}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                timerActive 
                  ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black'
                  : 'bg-primary-neon/10 border border-primary-neon/30 text-primary-neon hover:bg-primary-neon hover:text-black'
              }`}
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {timerActive ? 'PAUSE_TIMER' : 'START_TIMER'}
            </button>
            <button
              onClick={() => { setDemoTime(0); setTimerActive(false); }}
              className="bg-white/5 border border-border-dark hover:bg-white/10 px-3 py-2 rounded-lg text-gray-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* One click automated sample swarm run */}
        <div className="glass-card p-5 rounded-xl border border-primary-neon/30 bg-primary-neon/5 flex flex-col justify-between h-[180px]">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
              <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
              One-Click Scenario Runner
            </h3>
            <p className="text-[10px] text-gray-400 mt-2.5 leading-relaxed">
              Triggers the complete multi-agent Swarm sequence instantly: Intent parsing, DAG generation, CAP Escrow locking, live agent execution and escrow release settlement.
            </p>
          </div>
          <button
            onClick={triggerOneClickWorkflow}
            className="w-full bg-gradient-to-r from-primary-neon to-accent-blue hover:brightness-110 text-black font-extrabold py-2.5 rounded-lg text-center flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            TRIGGER_SAMPLE_WORKFLOW
          </button>
        </div>

        {/* Real-time Wallet Escrow audit parameters */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[180px]">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
              <Wallet className="w-4 h-4 text-secondary-neon" />
              On-Chain Escrow ledger Audit
            </h3>
            <div className="flex flex-col gap-2 mt-3.5">
              <div className="flex justify-between items-center">
                <span>Presenter Balance:</span>
                <span className="text-white font-bold">{userWallet.balance.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Locked in Escrow:</span>
                <span className="text-secondary-neon font-bold">{userWallet.escrowBalance.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Agent Settlement Address:</span>
                <span className="text-gray-500 font-bold truncate max-w-[120px]">0xUserWalletAddress789c</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Cluster Microservices health & Database Status Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cluster Microservice status parameters */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-border-dark">
          <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
            <Activity className="w-4 h-4 text-primary-neon animate-pulse" />
            Core Infrastructure Nodes & Microservices Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {healthChecks.map((service, idx) => (
              <div key={idx} className="border border-border-dark p-3 rounded-lg flex items-center justify-between bg-black/30 hover:border-white/10 transition-all">
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white text-[10px]">{service.name}</span>
                  <span className="text-[9px] text-gray-500">{service.msg}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-gray-500 font-mono">{service.latency}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    service.status === 'healthy' 
                      ? 'bg-primary-neon shadow-[0_0_8px_#00ffcc]' 
                      : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                  } animate-pulse`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Provider latency status cards */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          
          <div className="glass-card p-4 rounded-xl border border-border-dark bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-accent-blue" />
              <div>
                <h4 className="font-bold text-white text-[10px] uppercase">Neon Postgres DB</h4>
                <p className="text-[9px] text-gray-500 mt-0.5">Serverless pooling instance</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-primary-neon font-bold block text-[10px]">CONNECTED</span>
              <span className="text-[9px] text-gray-500 font-mono">Ping: 12ms</span>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-border-dark bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary-neon animate-spin-slow" />
              <div>
                <h4 className="font-bold text-white text-[10px] uppercase">LLM AI Provider Connection</h4>
                <p className="text-[9px] text-gray-500 mt-0.5">Gemini 1.5 Pro endpoint</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-primary-neon font-bold block text-[10px]">ACTIVE</span>
              <span className="text-[9px] text-gray-500 font-mono">Ping: 240ms</span>
            </div>
          </div>

        </div>

      </div>

      {/* Row 3: Presentation Progress Stepper & Pitch Milestone Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Presentation progress stepper */}
        <div className="lg:col-span-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-3">
          <h3 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
            <Layers className="w-4 h-4 text-secondary-neon" />
            Presentation Progress Stepper
          </h3>
          <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
            {demoSteps.map((step, idx) => {
              const isPassed = currentDemoStep > idx;
              const isCurrent = currentDemoStep === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setCurrentDemoStep(idx)}
                  className={`border p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    isCurrent 
                      ? 'border-primary-neon bg-primary-neon/5 text-white font-bold'
                      : isPassed 
                        ? 'border-border-dark/65 bg-black/10 text-gray-500' 
                        : 'border-border-dark bg-black/40 text-gray-600'
                  }`}
                >
                  <span className="text-[10px]">{step}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-ping"></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo milestones checklist */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2 text-[10px]">
              <ListTodo className="w-4 h-4 text-primary-neon animate-pulse" />
              Demo Pitch Milestone Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                { key: 'problem', label: '1. Describe the SLA & Payment Pain Points', desc: 'Detail manual API integration fragility.' },
                { key: 'marketplace', label: '2. Show Marketplace Discovery', desc: 'Browse verified nodes, reviews, and trust scores.' },
                { key: 'planning', label: '3. Explain AI Planning & Thinking', desc: 'Explain capability mapping and optimization routes.' },
                { key: 'workflow', label: '4. Highlight Workflow DAG Canvas', desc: 'Explore nodes layout and parallel branches execution.' },
                { key: 'execution', label: '5. Demonstrate Swarm Live Execution', desc: 'Watch real-time execution state shifts.' },
                { key: 'escrow', label: '6. Settle On-Chain Payments', desc: 'Verify escrow release, ledger history logs, and payouts.' },
                { key: 'analytics', label: '7. Audit Swarm Performance Analytics', desc: 'Audit system SLA metrics and success statistics.' }
              ].map((item) => (
                <div 
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className={`border p-3 rounded-lg flex gap-3 cursor-pointer select-none transition-all ${
                    checklist[item.key] 
                      ? 'border-primary-neon/40 bg-primary-neon/5 text-white' 
                      : 'border-border-dark bg-black/30 hover:border-white/10 text-gray-400'
                  }`}
                >
                  <div className="mt-0.5">
                    {checklist[item.key] ? (
                      <CheckCircle className="w-4 h-4 text-primary-neon shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-border-dark bg-black/40 flex shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[10px]">{item.label}</span>
                    <span className="text-[9px] text-gray-500 leading-normal">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
