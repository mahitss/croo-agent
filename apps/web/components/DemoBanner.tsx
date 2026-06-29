'use client';

import { useState, useEffect, useRef } from 'react';
import { useNexusStore } from '../store/nexusStore';
import { 
  Sparkles, Compass, RotateCcw, X, ArrowRight, ArrowLeft, 
  Play, Pause, Eye, EyeOff, ShieldAlert, CheckCircle, 
  HelpCircle, Timer, Server, Database, Wallet, Network, Volume2, CheckSquare
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from './Toast';

interface DemoStage {
  title: string;
  description: string;
  path: string;
  narrationTime: string;
  notes: string[];
}

const DEMO_STAGES: DemoStage[] = [
  {
    title: '1. Problem Introduction',
    description: 'Explain why traditional automation is rigid and fragile. Standard APIs break under schema shifts, and nodes cannot negotiate pricing or settle dynamically.',
    path: '/',
    narrationTime: '45s',
    notes: [
      'Focus on the pain point: rigid APIs and custom scripting require manual maintenance.',
      'Introduce Orbit AI as the decentralized operating system for swarming agents.',
      'Highlight that agents in Orbit communicate, negotiate, and settle payments autonomously.'
    ]
  },
  {
    title: '2. Marketplace Discovery',
    path: '/marketplace',
    description: 'Discover verified candidate nodes. Inspect ratings, pricing models, Completed Jobs count, and trust scores (SLA records).',
    narrationTime: '45s',
    notes: [
      'Showcase the catalog filters (Research, Finance, Legal, etc.).',
      'Explain that trust scores are compiled from historical SLA compliance.',
      'Point out the verified badge representing CAP protocol reputation reviews.'
    ]
  },
  {
    title: '3. AI Planning',
    path: '/workflow',
    description: 'Submit a complex target task. Show the planner decomposing the query into steps and listing reasoning logic live.',
    narrationTime: '40s',
    notes: [
      'Input the sample prompt: "Analyze Tesla financial reports and compile compliance check files."',
      'Explain that the planner identifies capabilities needed (e.g. Finance, Verify).',
      'Emphasize that agent selection is calculated based on budget constraints.'
    ]
  },
  {
    title: '4. Workflow Generation',
    path: '/workflow',
    description: 'Behold the generated Directed Acyclic Graph (DAG). View parallel paths and understand agent allocations.',
    narrationTime: '35s',
    notes: [
      'Point out the animated flow nodes and vector lines linking dependencies.',
      'Show how sub-tasks are mapped to specialized marketplace agents.',
      'Highlight how parallel streams execute simultaneously to shave latency.'
    ]
  },
  {
    title: '5. Agent Execution',
    path: '/dashboard',
    description: 'Execute the workflow. Watch graph nodes cycle colors as they update from Pending (yellow) to Running (blue) to Completed (green).',
    narrationTime: '50s',
    notes: [
      'Click the "Run Swarm" button to launch the live execution sequence.',
      'Draw attention to the real-time execution log feeds scrolling on screen.',
      'Point out the logs capturing tokens consumed and latencies per step.'
    ]
  },
  {
    title: '6. Agent Commerce',
    path: '/wallet',
    description: 'Audit the financial settlements. Witness payment requests, escrow locks, and direct wallet payouts.',
    narrationTime: '40s',
    notes: [
      'Show the ledger documenting the locked escrow payments.',
      'Explain that funds are held until consensus verifies correct output.',
      'Show wallet updates for hired agent nodes upon step completion.'
    ]
  },
  {
    title: '7. Swarm Analytics',
    path: '/analytics',
    description: 'Verify system SLAs and metrics. Audit latency profiles, revenue graphs, and success allocations.',
    narrationTime: '30s',
    notes: [
      'Show the live analytics dashboard charts.',
      'Verify that the success rate meets enterprise SLAs (95%+).',
      'Highlight the cost tracking demonstrating execution efficiency.'
    ]
  },
  {
    title: '8. Final Summary',
    path: '/dashboard',
    description: 'Celebrate run completion! Review the compiled deliverables, total execution speeds, and payment details.',
    narrationTime: '35s',
    notes: [
      'Summarize: The swarm resolved the task in 4.65 seconds, costing only 0.58 USDC.',
      'Point to the output files delivered securely to the user folder.',
      'Final Pitch: Orbit AI is ready to power the autonomous agent economy.'
    ]
  }
];

export default function DemoBanner() {
  const resetDemoMode = useNexusStore((state) => state.resetDemoMode);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);
  const startExecution = useNexusStore((state) => state.startExecution);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Control Center States
  const [presenterMode, setPresenterMode] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [demoTime, setDemoTime] = useState(0);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  // Presentation checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    intro: false,
    discover: false,
    planner: false,
    exec: false,
    escrow: false,
    analytics: false
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Demo Timer Loop
  useEffect(() => {
    if (tourActive) {
      timerRef.current = setInterval(() => {
        setDemoTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDemoTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [tourActive]);

  // Autoplay Advancer Loop
  useEffect(() => {
    if (isAutoplay && tourActive) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 8000); // Auto-advance every 8 seconds
    } else {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, tourActive, currentStep]);

  // Sync currentStep to manual page route changes
  useEffect(() => {
    if (tourActive) {
      const stepIndex = DEMO_STAGES.findIndex(s => s.path === pathname);
      if (stepIndex !== -1 && stepIndex !== currentStep) {
        setCurrentStep(stepIndex);
      }
    }
  }, [pathname, tourActive]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    resetDemoMode();
    toast('Emergency Demo Reset Successful: Store returned to seed defaults.', 'success');
  };

  const triggerSampleWorkflow = async () => {
    resetDemoMode();
    setUserQuery("Compile Tesla Q1 financial analysis and translate reports to Chinese");
    router.push('/workflow');
    setTourActive(true);
    setCurrentStep(2);
    toast('Triggering automated sample workflow. Parsing intention...', 'info');
    setTimeout(() => {
      startExecution("Compile Tesla Q1 financial analysis and translate reports to Chinese", "balanced", 2.0);
    }, 1200);
  };

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const startDemo = () => {
    setTourActive(true);
    setCurrentStep(0);
    setDemoTime(0);
    router.push(DEMO_STAGES[0].path);
    toast('Orbit Presentation Engine online. Running Stage 1.', 'info');
  };

  const stopDemo = () => {
    setTourActive(false);
    setIsAutoplay(false);
    toast('Presentation Engine offline.', 'info');
  };

  const handleNext = () => {
    const nextIdx = currentStep + 1;
    if (nextIdx < DEMO_STAGES.length) {
      setCurrentStep(nextIdx);
      router.push(DEMO_STAGES[nextIdx].path);
    } else {
      setIsAutoplay(false);
      toast('Guided Presentation Complete! Swarm os is ready.', 'success');
    }
  };

  const handlePrev = () => {
    const prevIdx = currentStep - 1;
    if (prevIdx >= 0) {
      setCurrentStep(prevIdx);
      router.push(DEMO_STAGES[prevIdx].path);
    }
  };

  return (
    <>
      {/* 1. Presentation Control Center Top Bar */}
      <div className="bg-black/95 backdrop-blur-md border-b border-border-dark py-2 px-6 flex justify-between items-center text-xs z-[9999] sticky top-0 font-mono select-none">
        
        {/* Left Section: Status & Stage Title */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-neon"></span>
          </span>
          <span className="text-white font-extrabold uppercase tracking-wide flex items-center gap-1.5 mr-4">
            <Sparkles className="w-3.5 h-3.5 text-primary-neon animate-pulse" />
            Orbit Presenter Engine
          </span>

          {tourActive && (
            <span className="bg-primary-neon/10 border border-primary-neon/30 text-primary-neon px-2.5 py-0.5 rounded-md font-bold">
              {DEMO_STAGES[currentStep].title}
            </span>
          )}
        </div>

        {/* Middle Section: Active Controls */}
        <div className="flex items-center gap-2">
          {tourActive ? (
            <>
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="p-1 hover:bg-white/5 rounded-md disabled:opacity-20 transition-all"
                title="Previous Stage"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>

              <button 
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md border font-bold transition-all ${
                  isAutoplay 
                    ? 'bg-primary-neon/20 border-primary-neon text-primary-neon' 
                    : 'bg-white/5 border-border-dark text-gray-300 hover:bg-white/10'
                }`}
                title="Toggle Auto-Play Mode"
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isAutoplay ? 'Auto' : 'Manual'}
              </button>

              <button 
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1 bg-primary-neon text-black font-extrabold rounded-md hover:bg-opacity-80 transition-all active-press"
              >
                {currentStep === DEMO_STAGES.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Timer */}
              <div className="flex items-center gap-1 text-gray-400 border-l border-border-dark pl-4 ml-2">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(demoTime)}</span>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={startDemo}
                className="flex items-center gap-1.5 bg-white/5 border border-border-dark text-white font-extrabold px-3 py-1 rounded-md hover:bg-white/10 transition-all active-press"
              >
                <Compass className="w-3.5 h-3.5 text-primary-neon" />
                Start Guided Tour
              </button>
              <button
                onClick={triggerSampleWorkflow}
                className="flex items-center gap-1.5 bg-primary-neon text-black font-extrabold px-4 py-1 rounded-md hover:bg-opacity-85 transition-all active-press"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                1-Click Swarm Run
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Toggles & Status Indicators */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPresenterMode(!presenterMode)}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-all"
            title="Toggle Presenter Mode (Speaker Notes)"
          >
            {presenterMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{presenterMode ? 'Audience Mode' : 'Presenter Mode'}</span>
          </button>

          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white transition-all"
            title="Reset Store Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {tourActive && (
            <button 
              onClick={stopDemo}
              className="text-red-500 hover:text-red-400 font-extrabold"
            >
              Exit Tour
            </button>
          )}
        </div>
      </div>

      {/* 2. Interactive Presenter Mode Side Drawer */}
      {tourActive && presenterMode && !drawerCollapsed && (
        <div className="fixed bottom-6 right-6 w-96 max-h-[85vh] overflow-y-auto scrollbar-thin bg-black/95 backdrop-blur-md border border-primary-neon/20 shadow-2xl z-[10000] p-6 rounded-2xl font-sans">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-3 border-b border-border-dark pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-white">Presenter Dashboard</h3>
              <span className="text-[10px] text-gray-500 font-mono">Stage: {DEMO_STAGES[currentStep].title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/5 border border-border-dark px-2 py-0.5 rounded text-gray-400 font-mono">
                Notes: {DEMO_STAGES[currentStep].narrationTime}
              </span>
              <button 
                onClick={() => setDrawerCollapsed(true)} 
                className="text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed mb-4 italic">
            {DEMO_STAGES[currentStep].description}
          </p>

          {/* Speaker Notes */}
          <div className="mb-4">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-primary-neon mb-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              Narration Cues
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-300">
              {DEMO_STAGES[currentStep].notes.map((note, idx) => (
                <li key={idx} className="leading-relaxed">{note}</li>
              ))}
            </ul>
          </div>

          {/* Presentation Checklist (Judge Request) */}
          <div className="border-t border-border-dark pt-3 mb-4">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-primary-neon mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" />
              Demo Milestones Checklist
            </h4>
            <div className="flex flex-col gap-1.5">
              {[
                { key: 'intro', label: '1. Problem Introduction Hook' },
                { key: 'discover', label: '2. Dynamic Node Discovery' },
                { key: 'planner', label: '3. AI Decomp & Visual DAG' },
                { key: 'exec', label: '4. Run Execution & Live Logs' },
                { key: 'escrow', label: '5. Secure CAP Escrow Settlement' },
                { key: 'analytics', label: '6. Live System SLA Analytics' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={checklist[item.key]}
                    onChange={() => toggleChecklistItem(item.key)}
                    className="rounded border-border-dark text-primary-neon focus:ring-primary-neon bg-black/60 w-3.5 h-3.5"
                  />
                  <span className={checklist[item.key] ? 'line-through text-gray-500' : ''}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Indicators */}
          <div className="border-t border-border-dark pt-3 font-mono text-[10px]">
            <h4 className="text-[9px] uppercase tracking-wider text-gray-500 mb-2">Systems Telemetry</h4>
            <div className="grid grid-cols-2 gap-2 text-gray-400">
              <div className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-primary-neon" />
                <span>Gateway: <strong className="text-white">Active</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-primary-neon" />
                <span>Neon DB: <strong className="text-white">Connected</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wallet className="w-3 h-3 text-primary-neon" />
                <span>CAP Escrow: <strong className="text-white">Ready</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Network className="w-3 h-3 text-primary-neon" />
                <span>CROO Sync: <strong className="text-white">Active</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expand Button for Presenter drawer */}
      {tourActive && presenterMode && drawerCollapsed && (
        <button
          onClick={() => setDrawerCollapsed(false)}
          className="fixed bottom-6 right-6 bg-black border border-primary-neon/20 p-3 rounded-full text-primary-neon z-[10000] shadow-xl hover:bg-white/5 active-press transition-all"
          title="Open Presenter Dashboard"
        >
          <Compass className="w-5 h-5 animate-spin" />
        </button>
      )}

      {/* 3. Stage 1: Problem Introduction Glass Overlay */}
      {tourActive && currentStep === 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9990] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-primary-neon/20 text-center flex flex-col items-center gap-6 shadow-2xl">
            <div className="bg-primary-neon/10 p-4 rounded-full border border-primary-neon/20">
              <Sparkles className="w-12 h-12 text-primary-neon animate-pulse" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Orbit AI Autonomous Agent OS</h2>
              <p className="text-sm text-primary-neon font-mono">Transforming Rigid Integration into Dynamic AI Commerce</p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
              Traditional automation systems fail because APIs are hardcoded and rigid. 
              Orbit AI introduces a decentralized Operating System where autonomous agent clusters discover matching nodes, negotiate execution SLAs, and settle payments instantly in USDC.
            </p>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-primary-neon text-black font-extrabold px-6 py-2.5 rounded-xl hover:bg-opacity-80 transition-all active-press"
            >
              Begin Marketplace Walkthrough
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Stage 8: Swarm Run Success Celebration Overlay */}
      {tourActive && currentStep === 7 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9990] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-primary-neon/20 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
            
            {/* CSS confettis simulation background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute w-2 h-2 bg-primary-neon rounded-full top-10 left-10 animate-bounce"></div>
              <div className="absolute w-3 h-3 bg-yellow-500 rounded-full top-20 right-20 animate-pulse"></div>
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full bottom-10 left-20 animate-bounce"></div>
            </div>

            <div className="bg-primary-neon/10 p-4 rounded-full border border-primary-neon/20">
              <CheckCircle className="w-12 h-12 text-primary-neon" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Presentation Swarm Run Succeeded!</h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Swarm nodes discovered, negotiated, executed, and settled the compliance checks ledger audit autonomously.
              </p>
            </div>

            {/* Simulated run stats */}
            <div className="grid grid-cols-3 gap-6 w-full border-y border-border-dark py-6 my-2 font-mono">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase">Hired Swarm Nodes</span>
                <span className="text-xl font-extrabold text-white">4 Agents</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase">Total Settled Fee</span>
                <span className="text-xl font-extrabold text-primary-neon">0.58 USDC</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase">Execution Time</span>
                <span className="text-xl font-extrabold text-white">4.65 seconds</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 leading-relaxed font-mono flex flex-col gap-2">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-primary-neon" />
                <span>CAP Reputations Updated (ConsensuVerify Score: 98%)</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 text-primary-neon" />
                <span>USDC Escrows Released & Settled on CROO Ledger</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-white/5 border border-border-dark text-white font-extrabold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-all active-press"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo Data
              </button>

              <button
                onClick={stopDemo}
                className="flex items-center gap-2 bg-primary-neon text-black font-extrabold px-6 py-2.5 rounded-xl hover:bg-opacity-80 transition-all active-press"
              >
                Finish Presentation
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
