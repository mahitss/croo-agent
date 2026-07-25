'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Cpu, CheckCircle } from 'lucide-react';

export default function TemplateDetailsPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  const router = useRouter();

  const templates: Record<string, any> = {
    sales: {
      id: 'sales',
      title: 'Autonomous Sales Lead Enrichment & Swarm Outreach',
      category: 'Sales',
      description: 'Automatically scrape incoming leads, cross-reference contact profiles, generate customized AI cold outreach, and route top prospects to CRM.',
      agents: ['Lead Finder Agent', 'Company Profiler AI', 'Personalized Copywriter'],
      nodes: [
        { label: 'Scrape Sales Lead List', type: 'INPUT' },
        { label: 'Enrich Company Profile Data', type: 'AGENT' },
        { label: 'Draft Tailored Email Sequence', type: 'AGENT' },
        { label: 'Push Scored Leads to CRM', type: 'OUTPUT' },
      ]
    },
    research: {
      id: 'research',
      title: 'Market Research Consensus & Competitor Swarm',
      category: 'Research',
      description: 'Deploy multi-agent research swarms to crawl web sources, summarize market trends, verify citation facts, and compile executive PDF briefs.',
      agents: ['Web Search Engine Worker', 'Fact-Check Verification Node', 'Executive Brief Summarizer'],
      nodes: [
        { label: 'Crawl Competitor News & Filings', type: 'INPUT' },
        { label: 'Extract Financial Metrics & Claims', type: 'AGENT' },
        { label: 'Synthesize Executive Consensus Brief', type: 'AGENT' },
        { label: 'Export Formatted Markdown / PDF', type: 'OUTPUT' },
      ]
    },
    finance: {
      id: 'finance',
      title: 'Automated Portfolio Audit & Tax Compliance Swarm',
      category: 'Finance',
      description: 'Ingest transaction ledger feeds, flag suspicious expense anomalies, compute tax liability estimates, and record settlements to CAP escrow.',
      agents: ['Transaction Anomaly Detector', 'Tax Code Auditor', 'CAP Escrow Settlement Node'],
      nodes: [
        { label: 'Fetch Transaction Ledger Data', type: 'INPUT' },
        { label: 'Detect Expense Anomalies', type: 'AGENT' },
        { label: 'Calculate Tax Deductions', type: 'AGENT' },
        { label: 'Execute Escrow Settlement', type: 'OUTPUT' },
      ]
    }
  };

  const template = templates[templateId] || templates['sales'];

  const handleDeploy = () => {
    router.push(`/workspace/new?template=${templateId}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 font-sans">
      <Link href="/workspaces" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Workspaces
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
            {template.category}
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{template.title}</h1>
          <p className="text-gray-400 text-sm max-w-2xl">{template.description}</p>
        </div>

        <button
          onClick={handleDeploy}
          className="inline-flex items-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-lg cursor-pointer text-sm whitespace-nowrap border-0"
        >
          <Play className="w-4 h-4 fill-black" /> Deploy Template Swarm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#4EA3FF]" /> Assigned Agent Workforce
          </h3>
          <div className="space-y-2">
            {template.agents.map((agent: string, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-300">
                <span>{agent}</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Ready</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" /> Swarm DAG Execution Pipeline
          </h3>
          <div className="space-y-2">
            {template.nodes.map((node: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-300">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="font-semibold text-white">{node.label}</span>
                <span className="ml-auto text-[10px] font-mono text-[#4EA3FF]">{node.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
