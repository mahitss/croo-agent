'use client';

import { useEffect, useRef } from 'react';
import { useNexusStore } from '../store/nexusStore';
import { 
  FileText, 
  Workflow, 
  Search, 
  BarChart2, 
  Handshake, 
  DollarSign, 
  PlayCircle, 
  ShieldCheck, 
  CheckCircle,
  Loader2
} from 'lucide-react';

export default function ExecutionTracker() {
  const isRunning = useNexusStore((state) => state.isRunning);
  const currentPhaseIndex = useNexusStore((state) => state.currentPhaseIndex);
  const executionLogs = useNexusStore((state) => state.executionLogs);
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [executionLogs]);

  const phases = [
    { name: 'Intent Detection', icon: FileText, desc: 'LLM understanding input & skills needed' },
    { name: 'Workflow Planner', icon: Workflow, desc: 'Generating Task DAG dependencies' },
    { name: 'Discovery', icon: Search, desc: 'Searching vector database for matching nodes' },
    { name: 'Evaluation', icon: BarChart2, desc: 'Rating latency, price, and reputation' },
    { name: 'Negotiation', icon: Handshake, desc: 'Finalizing agent SLAs and rates' },
    { name: 'Payment Lock', icon: DollarSign, desc: 'Locking USDC into escrow contract' },
    { name: 'Agent Execution', icon: PlayCircle, desc: 'Running distributed agent tasks' },
    { name: 'Verification Engine', icon: ShieldCheck, desc: 'Consensus validation of output nodes' },
    { name: 'Payout Settlement', icon: CheckCircle, desc: 'Releasing escrow to agent wallets' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Phases Tracker */}
      <div className="lg:col-span-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-4">
        <h3 className="text-md font-bold uppercase tracking-wider text-gray-400">Execution Pipeline</h3>
        
        <div className="flex flex-col gap-4 relative pl-3 border-l border-border-dark">
          {phases.map((phase, idx) => {
            const phaseNumber = idx + 1;
            const isCompleted = phaseNumber < currentPhaseIndex;
            const isActive = phaseNumber === currentPhaseIndex;
            const isPending = phaseNumber > currentPhaseIndex;
            const Icon = phase.icon;

            return (
              <div key={idx} className="relative flex gap-3 items-start group">
                {/* Bullet */}
                <div className={`absolute -left-[19px] w-3 h-3 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary-neon border-primary-neon scale-125 shadow-[0_0_8px_#00ffcc]'
                    : isCompleted
                    ? 'bg-accent-blue border-accent-blue'
                    : 'bg-bg-dark border-border-dark'
                }`} />

                {/* Content */}
                <div className={`p-2.5 rounded-lg flex items-center gap-3 w-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/5 border border-primary-neon/20' 
                    : 'opacity-50'
                }`}>
                  <div className={`p-1.5 rounded-md ${
                    isActive 
                      ? 'bg-primary-neon/10 text-primary-neon' 
                      : isCompleted
                      ? 'bg-accent-blue/10 text-accent-blue'
                      : 'bg-white/5 text-gray-400'
                  }`}>
                    {isActive && isRunning ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none mb-1">
                      {phase.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Console and Outputs */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Live Logs */}
        <div className="flex-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[320px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-bold uppercase tracking-wider text-gray-400">Live Agent Audit Ledger</h3>
            <span className="text-xs font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-border-dark">
              STREAMING: {executionLogs.length} events
            </span>
          </div>

          <div className="flex-1 bg-black/60 border border-border-dark rounded-lg p-4 overflow-y-auto font-mono text-xs flex flex-col gap-2 scrollbar-thin">
            {executionLogs.length === 0 ? (
              <div className="text-gray-500 italic flex items-center justify-center h-full">
                Waiting for execution trigger...
              </div>
            ) : (
              executionLogs.map((log) => {
                let color = 'text-gray-300';
                if (log.type === 'success') color = 'text-primary-neon';
                if (log.type === 'warning') color = 'text-yellow-400';
                if (log.type === 'error') color = 'text-secondary-neon';

                return (
                  <div key={log.id} className="flex gap-2 items-start leading-relaxed">
                    <span className="text-gray-600 select-none">[{log.timestamp.substr(11, 8)}]</span>
                    <span className="text-accent-blue font-bold uppercase select-none">[{log.phase}]</span>
                    <span className={color}>{log.message}</span>
                  </div>
                );
              })
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>

        {/* Output Panel */}
        <div className="glass-card p-5 rounded-xl border border-border-dark">
          <h3 className="text-md font-bold uppercase tracking-wider text-gray-400 mb-3">Aggregated Final Deliverable</h3>
          
          <div className="bg-white/2 border border-border-dark p-4 rounded-lg min-h-[120px] flex flex-col justify-between">
            {activeWorkflow && activeWorkflow.status === 'completed' ? (
              <div>
                <span className="text-xs bg-primary-neon/15 text-primary-neon border border-primary-neon/30 px-2 py-0.5 rounded font-medium mb-3 inline-block">
                  COMPLETED WORKFLOW
                </span>
                <p className="text-sm text-gray-300 leading-relaxed font-mono">
                  {activeWorkflow.nodes[activeWorkflow.nodes.length - 1]?.output}
                </p>
                <div className="mt-4 pt-3 border-t border-border-dark flex justify-between text-xs text-gray-500 font-mono">
                  <span>Routing: {activeWorkflow.routingMode}</span>
                  <span>Stages: {activeWorkflow.nodes.length} executed</span>
                  <span>Status: Escrow Settled</span>
                </div>
              </div>
            ) : isRunning ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-primary-neon" />
                <span className="text-xs font-mono tracking-wider animate-pulse-slow">AGENTS CONVERGING ON DECISION MATRIX...</span>
              </div>
            ) : (
              <div className="text-gray-500 italic flex items-center justify-center h-full py-6">
                No active deliverable generated yet. Enter a query in the portal.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
