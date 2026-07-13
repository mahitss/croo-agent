'use client';

import { Handle, Position } from '@xyflow/react';
import { useActiveWorkflow } from '../hooks/useActiveWorkflow';
import { 
  CheckCircle2, 
  HelpCircle, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';

export default function AgentNode({ data }: { data: any }) {
  const { agents } = useActiveWorkflow();
  const assignedAgent = agents.find(a => a.id === data.assignedAgentId);

  const getAgentDisplayInfo = (agentId: string) => {
    const id = agentId.toLowerCase();
    
    // Explicit mapped values for all seed agents
    const agentsMap: Record<string, { name: string; displayName: string; emoji: string }> = {
      'agent-research-1': { name: 'Research Agent', displayName: 'InsightFinder Pro', emoji: '🔍' },
      'agent-research-2': { name: 'Research Agent', displayName: 'QuickScan', emoji: '⚡' },
      'agent-finance-1': { name: 'Finance Agent', displayName: 'FinAnalytica', emoji: '📊' },
      'agent-legal-1': { name: 'Legal Agent', displayName: 'LexGuard', emoji: '⚖' },
      'agent-code-1': { name: 'Coding Agent', displayName: 'CodeCraft', emoji: '💻' },
      'agent-security-1': { name: 'Security Agent', displayName: 'SentriScan', emoji: '🔒' },
      'agent-translate-1': { name: 'Translation Agent', displayName: 'Translatio', emoji: '🌐' },
      'agent-verify-1': { name: 'Verification Agent', displayName: 'ConsensuVerify', emoji: '🛡' },
    };

    if (agentsMap[id]) {
      return agentsMap[id];
    }

    // Fallbacks
    if (id.startsWith('agent-search') || id.startsWith('agent-research')) {
      return { name: 'Research Agent', displayName: 'InsightFinder Pro', emoji: '🔍' };
    }
    if (id.startsWith('agent-translate')) {
      return { name: 'Translation Agent', displayName: 'Translatio', emoji: '🌐' };
    }
    if (id.startsWith('agent-verify')) {
      return { name: 'Verification Agent', displayName: 'ConsensuVerify', emoji: '🛡' };
    }
    if (id.startsWith('agent-finance')) {
      return { name: 'Finance Agent', displayName: 'FinAnalytica', emoji: '📊' };
    }
    if (id.startsWith('agent-legal')) {
      return { name: 'Legal Agent', displayName: 'LexGuard', emoji: '⚖' };
    }
    if (id.startsWith('agent-code')) {
      return { name: 'Coding Agent', displayName: 'CodeCraft', emoji: '💻' };
    }
    if (id.startsWith('agent-security')) {
      return { name: 'Security Agent', displayName: 'SentriScan', emoji: '🔒' };
    }
    return { name: 'Agent', displayName: agentId, emoji: '🤖' };
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-primary-neon" />;
      case 'running':
        return <Loader2 className="w-3.5 h-3.5 text-secondary-neon animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  const getStatusClass = () => {
    switch (data.status) {
      case 'completed':
        return 'animate-completed-glow';
      case 'running':
        return 'animate-running-glow';
      case 'failed':
        return 'border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.25)]';
      default:
        return 'border-border-dark';
    }
  };

  const getStatusBadge = () => {
    const status = (data.status || 'ready').toLowerCase();
    let label = 'Ready';
    let bgColor = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    
    if (status === 'completed') {
      label = 'Completed';
      bgColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    } else if (status === 'running') {
      label = 'Running';
      bgColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    } else if (status === 'failed') {
      label = 'Failed';
      bgColor = 'bg-red-500/10 text-red-400 border-red-500/20';
    } else if (status === 'pending') {
      label = 'Pending';
      bgColor = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }

    return (
      <span className={`text-[8px] font-bold border px-1.5 py-0.5 rounded font-mono ${bgColor}`}>
        {label}
      </span>
    );
  };

  const rawTitle = data.task || data.name;
  const isGeneric = !rawTitle || rawTitle.startsWith('Stage:') || rawTitle.toUpperCase().startsWith('NODE-');
  const nodeTitle = isGeneric ? (data.id?.startsWith('node-') ? data.id.toUpperCase() : `NODE-${(data.index ?? 0) + 1}`) : `NODE-${(data.index ?? 0) + 1}`;
  const displayTitle = isGeneric ? `Execute ${data.capability}` : rawTitle;

  const agentInfo = assignedAgent 
    ? {
        displayName: assignedAgent.name,
        roleName: getAgentDisplayInfo(assignedAgent.id).name,
        emoji: getAgentDisplayInfo(assignedAgent.id).emoji,
        agentId: assignedAgent.id,
        trustScore: assignedAgent.trustScore || 0,
        costEstimate: Number(data.costEstimate || assignedAgent.price || 0).toFixed(2),
        latency: `${data.timeEstimate || assignedAgent.latency || 0}ms`
      }
    : (data.assignedAgent || data.assignedAgentId)
    ? {
        displayName: getAgentDisplayInfo(data.assignedAgent || data.assignedAgentId).displayName || (data.assignedAgent || data.assignedAgentId),
        roleName: getAgentDisplayInfo(data.assignedAgent || data.assignedAgentId).name,
        emoji: getAgentDisplayInfo(data.assignedAgent || data.assignedAgentId).emoji,
        agentId: data.assignedAgent || data.assignedAgentId,
        trustScore: data.trustScore || 90, 
        costEstimate: Number(data.costEstimate || 0.15).toFixed(2),
        latency: `${data.timeEstimate || 1000}ms`
      }
    : {
        displayName: 'Awaiting Assignment',
        roleName: 'Pending allocation',
        emoji: '⏳',
        agentId: 'no-agent',
        trustScore: 0,
        costEstimate: '0.00',
        latency: '0ms'
      };

  return (
    <div className={`glass-card border px-4 py-3.5 rounded-xl w-[240px] text-left transition-all duration-300 animate-node-pop ${getStatusClass()}`}>
      
      {/* Target handle (Input) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#1b1e25', border: '1px solid #00ffcc', width: '8px', height: '8px' }} 
      />

      {/* Header: Stage Name & Status */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] font-extrabold uppercase bg-white/5 border border-border-dark text-primary-neon px-2 py-0.5 rounded font-mono">
          {nodeTitle}
        </span>
        <div className="flex items-center gap-1.5">
          {getStatusBadge()}
          {getStatusIcon()}
        </div>
      </div>

      {/* Task Title & Capability */}
      <div className="mb-3">
        <h4 className="text-xs font-bold text-white leading-snug truncate" title={displayTitle}>
          {displayTitle}
        </h4>
        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block mt-0.5">
          Capability: {data.capability}
        </span>
      </div>

      {/* Agent details divider */}
      <div className="pt-2.5 border-t border-border-dark/60 flex flex-col gap-1.5">
        
        {/* Agent Name & Generic Role */}
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold text-white flex items-center gap-1">
            {agentInfo.emoji} {agentInfo.displayName}
          </span>
          <span className="text-[8px] text-gray-400 font-mono italic mt-0.5">
            Role: {agentInfo.roleName}
          </span>
        </div>

        {/* Metadata Details (ID, Trust, Cost, Latency) */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] font-mono text-gray-500">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-600 uppercase">Agent ID</span>
            <span className="text-white truncate font-semibold" title={agentInfo.agentId}>{agentInfo.agentId}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-600 uppercase">Trust Score</span>
            <span className="text-white font-semibold">{agentInfo.trustScore}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-600 uppercase">Est. Cost</span>
            <span className="text-secondary-neon font-bold">{agentInfo.costEstimate} USDC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-600 uppercase">Latency</span>
            <span className="text-white font-semibold">{agentInfo.latency}</span>
          </div>
        </div>

      </div>

      {/* Source handle (Output) */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: '#1b1e25', border: '1px solid #ff007f', width: '8px', height: '8px' }} 
      />
    </div>
  );
}
