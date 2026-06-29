'use client';

import { useState, useEffect } from 'react';
import { useNexusStore } from '../store/nexusStore';
import { Sparkles, Compass, RotateCcw, X, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from './Toast';

interface TourStep {
  title: string;
  description: string;
  path: string;
  buttonLabel: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Orbit Swarm OS',
    description: 'Orbit coordinates autonomous agent clusters to solve complex prompts. Let\'s start by exploring the Marketplace.',
    path: '/',
    buttonLabel: 'Go to Marketplace'
  },
  {
    title: 'Swarm Marketplace',
    description: 'Here you can discover verified agent nodes, evaluate success SLA scores, and hire agents using USDC micro-payments.',
    path: '/marketplace',
    buttonLabel: 'Go to Workflow Builder'
  },
  {
    title: 'Visual Workflow Builder',
    description: 'Chain agents in parallel or series using an animated DAG representation. Edit execution paths and budget parameters.',
    path: '/workflow',
    buttonLabel: 'Go to Execution Dashboard'
  },
  {
    title: 'Execution Dashboard',
    description: 'Trigger a prompt to launch the agent swarm. Escrow balances are processed in USDC, and execution traces are visualized live.',
    path: '/dashboard',
    buttonLabel: 'Check Swarm Analytics'
  },
  {
    title: 'Metrics & SLA Analytics',
    description: 'Audit failure rates, latency SLAs, token budgets, and wallet allocations in a premium analytics interface.',
    path: '/analytics',
    buttonLabel: 'Finish Walkthrough'
  }
];

export default function DemoBanner() {
  const resetDemoMode = useNexusStore((state) => state.resetDemoMode);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-sync step index if path is navigated manually during tour
  useEffect(() => {
    if (tourActive) {
      const stepIndex = TOUR_STEPS.findIndex(step => step.path === pathname);
      if (stepIndex !== -1 && stepIndex !== currentStep) {
        setCurrentStep(stepIndex);
      }
    }
  }, [pathname, tourActive]);

  const handleReset = () => {
    resetDemoMode();
    toast('Demo Reset Successful: Swarm state, wallet balances, and logs reverted to seed defaults.', 'success');
  };

  const startTour = () => {
    setTourActive(true);
    setCurrentStep(0);
    router.push(TOUR_STEPS[0].path);
    toast('Walkthrough Started: Follow the floating guide overlay at the bottom right.', 'info');
  };

  const nextStep = () => {
    const nextIdx = currentStep + 1;
    if (nextIdx < TOUR_STEPS.length) {
      setCurrentStep(nextIdx);
      router.push(TOUR_STEPS[nextIdx].path);
    } else {
      setTourActive(false);
      toast('Walkthrough Completed! You are ready to present Orbit AI.', 'success');
      router.push('/dashboard');
    }
  };

  const skipTour = () => {
    setTourActive(false);
    toast('Walkthrough Closed: Interactive demo tour dismissed.', 'info');
  };

  return (
    <>
      {/* Sticky Demo Banner */}
      <div className="bg-black/80 backdrop-blur-md border-b border-border-dark py-2 px-6 flex justify-between items-center text-xs z-[9999] sticky top-0 font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-neon"></span>
          </span>
          <span className="text-white font-extrabold uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-neon animate-pulse" />
            Orbit Demo Mode
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={startTour}
            className="flex items-center gap-1.5 text-gray-300 hover:text-white bg-white/5 border border-border-dark hover:bg-white/10 px-3 py-1 rounded-lg transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-primary-neon" />
            Interactive Guide
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-gray-300 hover:text-white bg-white/5 border border-border-dark hover:bg-white/10 px-3 py-1 rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Floating Walkthrough Wizard Panel */}
      {tourActive && (
        <div className="fixed bottom-6 right-6 w-96 glass-card p-6 rounded-2xl border border-primary-neon/20 shadow-2xl shadow-black/80 z-[10000] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary-neon" />
              {TOUR_STEPS[currentStep].title}
            </h4>
            <button 
              onClick={skipTour} 
              className="text-gray-500 hover:text-gray-300 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {TOUR_STEPS[currentStep].description}
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mb-4">
            <span>Step {currentStep + 1} of {TOUR_STEPS.length}</span>
            <div className="flex gap-1">
              {TOUR_STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 w-6 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? 'bg-primary-neon' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center">
            <button 
              onClick={skipTour}
              className="text-xs text-gray-500 hover:text-gray-300 font-mono"
            >
              Skip Guide
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-1 text-xs bg-primary-neon text-black font-extrabold px-4 py-2 rounded-xl active-press transition-all"
            >
              {TOUR_STEPS[currentStep].buttonLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
