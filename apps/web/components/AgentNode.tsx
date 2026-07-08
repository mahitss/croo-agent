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

  const getAgentDisplayInfo = (agentId: string) => {
    const id = agentId.toLowerCase();
    if (id.startsWith('agent-search') || id.startsWith('agent-research')) {
      return { name: 'Research Agent', emoji: '🔍' };
    }
    if (id.startsWith('agent-translate')) {
      return { name: 'Translation Agent', emoji: '🌐' };
    }
    if (id.startsWith('agent-verify')) {
      return { name: 'Verification Agent', emoji: '🛡' };
    }
    if (id.startsWith('agent-finance')) {
      return { name: 'Finance Agent', emoji: '📊' };
    }
    if (id.startsWith('agent-legal')) {
      return { name: 'Legal Agent', emoji: '⚖' };
    }
    if (id.startsWith('agent-code')) {
      return { name: 'Coding Agent', emoji: '💻' };
    }
    if (id.startsWith('agent-security')) {
      return { name: 'Security Agent', emoji: '🔒' };
    }
    return { name: agentId, emoji: '🤖' };
  };

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

  const getStatusBadge = () => {
    const status = (data.status || 'ready').toLowerCase();
    let label = 'Ready';
    let bgColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    
    if (status === 'completed') {
      label = 'Completed';
      bgColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    } else if (status === 'running') {
      label = 'Running';
      bgColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    } else if (status === 'failed') {
      label = 'Failed';
      bgColor = 'bg-red-500/20 text-red-400 border-red-500/30';
    } else if (status === 'pending') {
      label = 'Pending';
      bgColor = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    } else if (data.assignedAgent || data.assignedAgentId) {
      label = 'Ready';
      bgColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }

    return (
      <span className={`text-[8px] font-bold border px-1.5 py-0.5 rounded font-mono ${bgColor}`}>
        {label}
      </span>
    );
  };

  const rawTitle = data.task || data.name;
  const isGeneric = !rawTitle || rawTitle.startsWith('Stage:') || rawTitle.toUpperCase().startsWith('NODE-');
  const nodeTitle = isGeneric ? (data.id?.startsWith('node-') ? data.id.toUpperCase() : `NODE-${(data.index ?? 0) + 1}`) : rawTitle;

  return (
    <div className={`glass-card border px-4 py-3 rounded-lg w-[220px] text-left transition-all duration-300 ${getStatusClass()}`}>
      
      {/* Target handle (Input) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#1b1e25', border: '1px solid #00ffcc', width: '8px', height: '8px' }} 
      />

      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[9px] uppercase tracking-wider bg-white/5 border border-border-dark text-gray-400 px-1.5 py-0.5 rounded font-mono">
          {data.capability}
        </span>
        <div className="flex items-center gap-1.5">
          {getStatusBadge()}
          {getStatusIcon()}
        </div>
      </div>

      <h4 className="text-xs font-bold text-white leading-tight mb-1 truncate" title={nodeTitle}>
        {nodeTitle}
      </h4>

      {assignedAgent ? (
        <div className="mt-2 pt-2 border-t border-border-dark flex flex-col gap-0.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-white flex items-center gap-1">
              {getAgentDisplayInfo(assignedAgent.id).emoji} {getAgentDisplayInfo(assignedAgent.id).name}
            </span>
            <span className="text-[8px] text-gray-500 font-mono">
              ID: {assignedAgent.id}
            </span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-1">
            <span>Rating: {assignedAgent.rating}⭐</span>
            <span>Estimated Cost: {Number(data.costEstimate || 0).toFixed(2)} USDC</span>
          </div>
        </div>
      ) : (data.assignedAgent || data.assignedAgentId) ? (
        <div className="mt-2 pt-2 border-t border-border-dark flex flex-col gap-0.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-white flex items-center gap-1">
              {getAgentDisplayInfo(data.assignedAgent || data.assignedAgentId).emoji} {getAgentDisplayInfo(data.assignedAgent || data.assignedAgentId).name}
            </span>
            <span className="text-[8px] text-gray-500 font-mono">
              ID: {data.assignedAgent || data.assignedAgentId}
            </span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-1">
            <span>Assigned Agent</span>
            <span>Estimated Cost: {Number(data.costEstimate || 0).toFixed(2)} USDC</span>
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
