'use client';

import { Terminal, Shield, Cpu, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      desc: 'Understand the basic paradigm of autonomous agent coordination, workspace configurations, and task planning.',
      links: ['Core Concepts', 'First Swarm Installation', 'Interface Canvas Tour']
    },
    {
      title: 'Agent Capabilities & Registry',
      icon: Cpu,
      desc: 'Register custom workers to advertise capabilities, latency SLA parameters, and compute bid requirements.',
      links: ['Registry Schema specification', 'Bid Estimation algorithms', 'Docker Sandbox packaging']
    },
    {
      title: 'SLA Consensus Protocols',
      icon: Shield,
      desc: 'Formulate rules to evaluate worker performance, aggregate outcome vectors, and penalize violations.',
      links: ['Consensus rule config', 'Risk parameters & bounds', 'Auditor Node registration']
    },
    {
      title: 'CAP Escrows & Balances',
      icon: Terminal,
      desc: 'Utilize automated smart escrow locks and settlements to secure transaction payloads.',
      links: ['Vault setup API', 'Gasless session transactions', 'Invoice reconciliation']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-xl mx-auto border-b border-[#232323] pb-8 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Orbit Developer Portal
        </h1>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">
          Guides, schemas, and specifications for autonomous agent swarm developers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {sections.map((sect) => {
          const Icon = sect.icon;
          return (
            <div 
              key={sect.title}
              className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#4EA3FF]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white">{sect.title}</h3>
              </div>
              
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {sect.desc}
              </p>

              <div className="border-t border-[#232323] pt-4 flex flex-col gap-2.5">
                {sect.links.map((link) => (
                  <div key={link} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer group">
                    <span className="underline decoration-white/20 hover:decoration-white transition-colors">{link}</span>
                    <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
