'use client';

import { Handle, Position } from '@xyflow/react';
import { useNexusStore } from '../store/nexusStore';
import { 
  CheckCircle2, 
  HelpCircle, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';

export default function AgentNode({ data }: { data: any }) {
  const agents = useNexusStore((state) => state.agents);
  const assignedAgent = agents.find(a => a.id === data.assignedAgentId);

  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-primary-neon" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-secondary-neon animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusClass = () => {
    switch (data.status) {
      case 'completed':
        return 'border-primary-neon/40 shadow-[0_0_10px_rgba(0,255,204,0.15)]';
      case 'running':
        return 'border-secondary-neon/40 shadow-[0_0_10px_rgba(255,0,127,0.15)] animate-pulse';
      case 'failed':
        return 'border-red-500/40';
      default:
        return 'border-border-dark';
    }
  };

  return (
    <div className={`glass-card border px-4 py-3 rounded-lg w-[220px] text-left transition-all duration-300 ${getStatusClass()}`}>
      
      {/* Target handle (Input) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#1b1e25', border: '1px solid #00ffcc', width: '8px', height: '8px' }} 
      />

      <div className="flex justify-between items-start mb-1.5">
        <span className="text-[9px] uppercase tracking-wider bg-white/5 border border-border-dark text-gray-400 px-1.5 py-0.5 rounded font-mono">
          {data.capability}
        </span>
        {getStatusIcon()}
      </div>

      <h4 className="text-xs font-bold text-white leading-tight mb-1 truncate">
        {data.name}
      </h4>

      {assignedAgent ? (
        <div className="mt-2 pt-2 border-t border-border-dark flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 truncate">
            Assigned: <strong className="text-white">{assignedAgent.name}</strong>
          </span>
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
            <span>Rating: {assignedAgent.rating}⭐</span>
            <span>Fee: {data.costEstimate} USDC</span>
          </div>
        </div>
      ) : (
        <div className="text-[10px] text-gray-500 italic mt-2">
          Awaiting agent selection...
        </div>
      )}

      {/* Source handle (Output) */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: '#1b1e25', border: '1px solid #ff007f', width: '8px', height: '8px' }} 
      />
    </div>
  );
}
