'use client';

import { useState } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { 
  Users, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Activity,
  CheckCircle,
  Clock,
  UserCheck,
  Sliders
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const agents = useNexusStore((state) => state.agents);
  const userWallet = useNexusStore((state) => state.userWallet);

  // Users Mock Data State
  const [users, setUsers] = useState([
    { id: 'usr_001', name: 'Mahit', role: 'Super Admin', status: 'Active', wallet: '0x71C7...6536', lastLogin: 'Just now' },
    { id: 'usr_002', name: 'Alice Smith', role: 'Developer', status: 'Active', wallet: '0x9965...dF45', lastLogin: '2 hours ago' },
    { id: 'usr_003', name: 'Bob Johnson', role: 'Standard User', status: 'Active', wallet: '0x88F0...2a1B', lastLogin: '1 day ago' },
    { id: 'usr_004', name: 'Sybil Attacker', role: 'Standard User', status: 'Suspended', wallet: '0xDEAD...BEEF', lastLogin: '3 days ago' }
  ]);

  // Feature Flags State
  const [flags, setFlags] = useState([
    { key: 'swarms_consensus', label: 'Multi-Agent Consensus Verification', active: true, rollout: '100%' },
    { key: 'wallet_withdrawals', label: 'CROO Wallet On-chain Withdrawals', active: true, rollout: '100%' },
    { key: 'ai_matchmaker', label: 'AI Swarm Matchmaker (Marketplace)', active: true, rollout: '100%' },
    { key: 'async_exports', label: 'Asynchronous Excel/CSV Exports', active: false, rollout: '0%' }
  ]);

  // Uptime mock health checks
  const healthChecks = [
    { name: 'API Gateway', status: 'healthy', msg: 'Uptime 99.98%' },
    { name: 'Auth Service', status: 'healthy', msg: 'Port 5001' },
    { name: 'Agent Service', status: 'healthy', msg: 'Port 5002' },
    { name: 'Workflow Service', status: 'healthy', msg: 'Port 5003' },
    { name: 'AI Planning Engine', status: 'load', msg: '85% GPU use' },
    { name: 'Payment Escrows', status: 'healthy', msg: 'Port 5004' }
  ];

  // Fraud detection alerts mock logs
  const fraudAlerts = [
    { id: 'f_01', type: 'Self-Payment', details: '0xDEAD...BEEF attempting to verify self-hosted node output', severity: 'Critical' },
    { id: 'f_02', type: 'Velocity Anomaly', details: 'usr_003 launched 48 workflows in 2 minutes', severity: 'Warning' }
  ];

  const handleToggleFlag = (key: string) => {
    setFlags(flags.map(f => f.key === key ? { ...f, active: !f.active, rollout: f.active ? '0%' : '100%' } : f));
  };

  const handleSuspendUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6 font-mono text-xs text-gray-400">
      
      {/* Header platform status banner */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary-neon animate-pulse" />
            NEXUS Admin Console
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Operate feature rollout flags, moderate registered agents, secure wallets, and audit server uptimes.
          </p>
        </div>
        <div className="flex gap-4 text-xs font-mono text-gray-500">
          <div className="flex flex-col border-l border-border-dark pl-3">
            <span className="text-[10px] uppercase text-gray-600">Active Workflows</span>
            <span className="text-white font-bold">3 Running</span>
          </div>
          <div className="flex flex-col border-l border-border-dark pl-3">
            <span className="text-[10px] uppercase text-gray-600">Pending Reviews</span>
            <span className="text-secondary-neon font-bold">0 Queue</span>
          </div>
        </div>
      </div>

      {/* Row 1: KPI Stats + Service Health Check Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* KPI panel */}
        <div className="lg:col-span-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between h-[280px]">
          <h3 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 border-b border-border-dark pb-2">
            <Users className="w-4 h-4 text-accent-blue" />
            Uptime Parameters
          </h3>
          <div className="flex-grow flex flex-col gap-2.5 justify-center">
            <div className="flex justify-between">
              <span>Running Workflows</span>
              <span className="text-primary-neon font-bold">3 Active</span>
            </div>
            <div className="flex justify-between">
              <span>Lifetime Revenue</span>
              <span className="text-white font-bold">$1,245 USDC</span>
            </div>
            <div className="flex justify-between">
              <span>Average Uptime</span>
              <span className="text-white font-bold">99.98%</span>
            </div>
            <div className="flex justify-between">
              <span>Registered Swarms</span>
              <span className="text-white font-bold">{agents.length} Nodes</span>
            </div>
          </div>
        </div>

        {/* Uptime Health Check Status Grid */}
        <div className="lg:col-span-3 glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[280px]">
          <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
            <Activity className="w-4 h-4 text-primary-neon animate-pulse" />
            Cluster Microservices Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {healthChecks.map((service, idx) => (
              <div key={idx} className="border border-border-dark p-3 rounded-lg flex items-center justify-between bg-black/10">
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-white text-[11px]">{service.name}</span>
                  <span className="text-[10px] text-gray-500">{service.msg}</span>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  service.status === 'healthy' ? 'bg-primary-neon shadow-[0_0_8px_rgba(0,255,204,0.4)]' : 'bg-yellow-500 animate-pulse'
                }`}></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 2: User management + Agent Moderation approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User suspension table */}
        <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
              <Users className="w-4 h-4 text-accent-blue" />
              Platform Identity Directories
            </h3>
            <div className="overflow-x-auto text-[10px]">
              <table className="w-full text-left">
                <thead className="bg-white/2 text-[9px] text-gray-500 uppercase border-b border-border-dark">
                  <tr>
                    <th className="py-2 px-3">User</th>
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Wallet</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/1 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-white flex flex-col">
                        <span>{usr.name}</span>
                        <span className="text-[9px] text-gray-500 font-normal">{usr.id}</span>
                      </td>
                      <td className="py-2.5 px-3">{usr.role}</td>
                      <td className="py-2.5 px-3 text-gray-500">{usr.wallet}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleSuspendUser(usr.id)}
                          className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                            usr.status === 'Active'
                              ? 'bg-primary-neon/10 border border-primary-neon/20 text-primary-neon hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400'
                              : 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-primary-neon/20 hover:border-primary-neon/30 hover:text-primary-neon'
                          }`}
                        >
                          {usr.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Agent moderation reviews queue */}
        <div className="lg:col-span-1 glass-card p-5 rounded-xl border border-border-dark flex flex-col h-[280px]">
          <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
            <Cpu className="w-4 h-4 text-secondary-neon" />
            Moderation Queue
          </h3>
          <div className="flex-grow flex flex-col justify-center items-center gap-3 text-center text-gray-500 italic">
            <CheckCircle className="w-10 h-10 text-primary-neon/50 mb-1" />
            <span className="font-bold text-white not-italic text-xs">No pending agent reviews</span>
            <span className="text-[10px]">All registered swarm nodes are successfully validated and verified.</span>
          </div>
        </div>

      </div>

      {/* Row 3: Feature Toggles + Fraud Alert Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Feature flags rollout panel */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
              <Sliders className="w-4 h-4 text-accent-blue" />
              Dynamic Feature Flags
            </h3>
            <div className="flex flex-col gap-3">
              {flags.map((flag) => (
                <div key={flag.key} className="flex justify-between items-center bg-black/10 p-2.5 rounded border border-border-dark">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-white text-[11px]">{flag.label}</span>
                    <span className="text-[9px] text-gray-500">Rollout target: {flag.rollout}</span>
                  </div>
                  <button
                    onClick={() => handleToggleFlag(flag.key)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {flag.active ? (
                      <ToggleRight className="w-8 h-8 text-primary-neon" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-600" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud Indicator alert monitors */}
        <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 animate-bounce" />
              Fraud Security Logs
            </h3>
            <div className="flex flex-col gap-3">
              {fraudAlerts.map((alert) => (
                <div key={alert.id} className="border border-border-dark p-3 rounded-lg flex items-start gap-2.5 bg-black/10">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {alert.severity}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-[11px]">{alert.type}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{alert.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Row 4: Immutable Administrative Audit Logs timeline */}
      <div className="glass-card p-5 rounded-xl border border-border-dark">
        <h3 className="font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-border-dark pb-2">
          <Clock className="w-4 h-4 text-primary-neon" />
          Immutable Operations Audit Log
        </h3>
        <div className="flex flex-col gap-3.5 pl-1.5">
          {[
            { time: '10:22:45', action: 'Feature Flag Configured', detail: 'swarms_consensus rollout changed to 100% by usr_001' },
            { time: '10:15:30', action: 'Agent Node Approved', detail: 'Swarm Translation Helper v1.2.0 approved and indexed by usr_001' },
            { time: '09:44:12', action: 'Identity Suspension Lifted', detail: 'usr_002 restored to active developers list' }
          ].map((log, idx) => (
            <div key={idx} className="flex gap-4 items-start text-xs">
              <span className="text-gray-500 shrink-0 font-bold">{log.time}</span>
              <span className="text-primary-neon font-bold shrink-0 w-[160px]">{log.action}</span>
              <span className="text-gray-400 font-mono leading-relaxed">{log.detail}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
