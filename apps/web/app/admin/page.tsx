'use client';

import { useState } from 'react';
import { ShieldAlert, Server, Terminal, Lock, Activity, Users, Key } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>Admin Systems Control Operator</span>
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Global microservices monitoring, system rate-limiting rules, and global security audit logs.
          </p>
        </div>

        <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono px-3 py-1 rounded-xl">
          Super Operator Mode
        </span>
      </div>

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
          <span className="text-2xl font-bold text-white font-mono">1,842 Accounts</span>
          <span className="text-[10px] text-emerald-400 font-mono">+14 registered today</span>
        </div>
      </div>

      {/* Global Microservices List */}
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
    </div>
  );
}
