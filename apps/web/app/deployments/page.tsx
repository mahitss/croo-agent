'use client';

import AppLayout from '../../components/AppLayout';
import { Rocket, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DeploymentsPage() {
  const deployments = [
    { id: 'dep-1', name: 'Research Consensus Agent Swarm', version: 'v2.4.0', status: 'Deployed', deployedAt: 'Today 09:30 AM', env: 'Production Mainnet', target: '/workspace/research-agent' },
    { id: 'dep-2', name: 'Sales Lead Outreach Swarm', version: 'v1.8.1', status: 'Deployed', deployedAt: 'Yesterday 02:15 PM', env: 'Production Mainnet', target: '/workspace/sales-outreach' },
    { id: 'dep-3', name: 'Legal GDPR Compliance Audit', version: 'v3.0.0', status: 'Deployed', deployedAt: 'Jul 21, 2026', env: 'Production Mainnet', target: '/workspace/compliance-audit' },
    { id: 'dep-4', name: 'Finance Risk & Volatility Swarm', version: 'v1.0.0', status: 'Staging', deployedAt: 'Jul 20, 2026', env: 'Sandbox Staging', target: '/workspace/finance' },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Rocket className="w-6 h-6 text-purple-400" /> Active Swarm Deployments
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Production deployment manifests, environment endpoints, and active swarm version releases.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          <div className="grid grid-cols-12 px-6 py-3.5 border-b border-[#232323] text-gray-500 font-mono text-[10px] uppercase">
            <span className="col-span-4">Deployment Name</span>
            <span className="col-span-2">Version</span>
            <span className="col-span-3">Environment</span>
            <span className="col-span-2">Deployed At</span>
            <span className="col-span-1 text-right">Canvas</span>
          </div>

          {deployments.map((dep) => (
            <div key={dep.id} className="grid grid-cols-12 items-center px-6 py-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
              <div className="col-span-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">{dep.name}</span>
              </div>

              <div className="col-span-2 font-mono text-gray-400">{dep.version}</div>

              <div className="col-span-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {dep.env}
                </span>
              </div>

              <div className="col-span-2 font-mono text-gray-500 text-[11px]">{dep.deployedAt}</div>

              <div className="col-span-1 flex justify-end">
                <Link href={dep.target} className="text-[#4EA3FF] hover:underline no-underline">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
