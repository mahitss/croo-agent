'use client';

import { useState } from 'react';
import { ShieldAlert, Server, Terminal, Lock, Activity, Users, Key } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const [tab, setTab] = useState<'cluster' | 'users' | 'moderation' | 'audit'>('cluster');
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', email: 'mahitsaxena008@gmail.com', name: 'Mahit Saxena', role: 'admin', status: 'Active' },
    { id: 'usr-2', email: 'alex.developer@orbitai.dev', name: 'Alex Dev', role: 'user', status: 'Active' },
    { id: 'usr-3', email: 'spammer@temp.org', name: 'Suspicious Bot', role: 'user', status: 'Suspended' },
  ]);

  const [agentsList, setAgentsList] = useState([
    { id: 'ag-1', name: 'Web Research Swarm', author: 'Orbit Core', status: 'Approved' },
    { id: 'ag-2', name: 'Sales Lead Finder', author: 'Outreach Lab', status: 'Approved' },
    { id: 'ag-3', name: 'Unverified Data Scraper', author: 'Unknown', status: 'Pending Approval' },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const toggleAgentApproval = (id: string) => {
    setAgentsList(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Approved' ? 'Pending Approval' : 'Approved' } : a));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>Admin Systems Control Operator</span>
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Global microservices monitoring, user account management, and marketplace moderation.
          </p>
        </div>

        <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono px-3 py-1.5 rounded-xl">
          Super Operator Mode
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 text-xs font-semibold">
        {[
          { id: 'cluster', label: 'Cluster Telemetry' },
          { id: 'users', label: 'User Management' },
          { id: 'moderation', label: 'Marketplace Moderation' },
          { id: 'audit', label: 'Security Audit Logs' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-4 py-2 rounded-xl transition-all border cursor-pointer ${
              tab === t.id
                ? 'bg-[#4EA3FF] text-black border-[#4EA3FF]'
                : 'bg-[#111111] text-gray-400 border-[#232323] hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'cluster' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col gap-2">
              <span className="text-xs text-gray-500 font-mono uppercase">API Gateway Health</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">100% Operational</span>
              <span className="text-[10px] text-gray-500 font-mono">Latency: 14ms</span>
            </div>

            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col gap-2">
              <span className="text-xs text-gray-500 font-mono uppercase">Database Pool</span>
              <span className="text-2xl font-bold text-white font-mono">3 / 20 Active</span>
              <span className="text-[10px] text-gray-500 font-mono">PgBouncer: Normal</span>
            </div>

            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col gap-2">
              <span className="text-xs text-gray-500 font-mono uppercase">Total Users</span>
              <span className="text-2xl font-bold text-white font-mono">{usersList.length + 1840} Accounts</span>
              <span className="text-[10px] text-emerald-400 font-mono">+14 registered today</span>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
              Microservices Cluster Telemetry
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'api-gateway', port: 5000, status: 'Healthy', uptime: '99.99%' },
                { name: 'auth-service', port: 5001, status: 'Healthy', uptime: '100%' },
                { name: 'agent-service', port: 5002, status: 'Healthy', uptime: '99.95%' },
                { name: 'workflow-service', port: 5003, status: 'Healthy', uptime: '100%' },
                { name: 'wallet-service', port: 5005, status: 'Healthy', uptime: '100%' },
              ].map((svc) => (
                <div key={svc.name} className="flex items-center justify-between p-3 bg-[#050505] border border-[#232323] rounded-xl text-xs">
                  <span className="font-mono text-white font-semibold">{svc.name} (Port {svc.port})</span>
                  <div className="flex items-center gap-4 font-mono">
                    <span className="text-emerald-400 text-[10px]">{svc.status}</span>
                    <span className="text-gray-500 text-[10px]">{svc.uptime} uptime</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'users' && (
        <div className="bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          <div className="p-4 border-b border-[#232323] font-bold text-white">Registered User Accounts</div>
          {usersList.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-4 border-b border-[#232323] last:border-b-0">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-white">{u.name} ({u.email})</span>
                <span className="text-[10px] text-gray-500 font-mono">Role: {u.role}</span>
              </div>
              <button
                onClick={() => toggleUserStatus(u.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono border cursor-pointer ${
                  u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}
              >
                {u.status} (Toggle)
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'moderation' && (
        <div className="bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          <div className="p-4 border-b border-[#232323] font-bold text-white">Marketplace Agent Moderation</div>
          {agentsList.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-4 border-b border-[#232323] last:border-b-0">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-white">{a.name}</span>
                <span className="text-[10px] text-gray-500">Author: {a.author}</span>
              </div>
              <button
                onClick={() => toggleAgentApproval(a.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono border cursor-pointer ${
                  a.status === 'Approved' ? 'bg-[#4EA3FF]/10 text-[#4EA3FF] border-[#4EA3FF]/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}
              >
                {a.status}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'audit' && (
        <div className="bg-[#111111] border border-[#232323] rounded-2xl p-4 text-xs font-mono space-y-2">
          <div className="text-gray-400 font-bold border-b border-[#232323] pb-2">System Audit Event Stream</div>
          <div className="text-emerald-400">[2026-07-25T06:14:02Z] USER_GOOGLE_LOGIN - mahitsaxena008@gmail.com (IP: 127.0.0.1)</div>
          <div className="text-blue-400">[2026-07-25T06:10:15Z] ESCROW_RELEASE - 1.50 USDC -> 0xUserWallet8f2b</div>
          <div className="text-gray-400">[2026-07-25T05:52:00Z] AGENT_NODE_REGISTRATION - sentinel-scan (Status: Approved)</div>
        </div>
      )}
    </div>
  );
}
