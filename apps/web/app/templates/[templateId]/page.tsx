'use client';

import { useParams, useRouter } from 'next/navigation';
import AppLayout from '../../../components/AppLayout';
import { ArrowLeft, Play, Cpu, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const TEMPLATE_PRESETS: Record<string, { title: string; category: string; description: string; query: string; agents: string[]; nodes: string[] }> = {
  sales: {
    title: 'Multi-Channel Sales Outreach Swarm',
    category: 'Sales & Growth',
    description: 'Automated decision-maker extraction, ICP fit scoring, and cold email sequence generation.',
    query: 'Scrape lead contacts, calculate lead fit score, and generate cold email sequences',
    agents: ['ProspectFinder AI', 'ICP Classifier', 'OutreachWriter AI'],
    nodes: ['Lead Extraction', 'Fit Scoring', 'Cold Sequence Generator']
  },
  research: {
    title: 'Research Consensus Agent Swarm',
    category: 'Market Intelligence',
    description: 'Web research consensus audit, multi-source claim verification, and executive brief synthesis.',
    query: 'Conduct web research consensus audit & compile PDF executive brief',
    agents: ['WebScraper Pro', 'FactCheck Verification', 'DocSynthesizer AI'],
    nodes: ['Web Search Engine', 'Claim Verifier', 'PDF Brief Compiler']
  },
  finance: {
    title: 'Finance Portfolio & Risk Audit Swarm',
    category: 'Financial Analytics',
    description: 'Asset volatility tracking, risk model compilation, and SLA compliance review.',
    query: 'Audit asset volatility metrics and generate SLA compliance summary',
    agents: ['VolatilityTracker AI', 'RiskCompiler Pro', 'SLA Reviewer'],
    nodes: ['Volatility Analysis', 'Risk Model Compiler', 'Compliance Dispatcher']
  },
  marketing: {
    title: 'Marketing Multi-Channel Copy Swarm',
    category: 'Content Marketing',
    description: 'Multi-platform copy generation, SEO keyword optimization, and brand voice alignment.',
    query: 'Generate 5 social media posts and blog summary with brand voice alignment',
    agents: ['SEO Copywriter AI', 'BrandVoice Guard', 'SocialPublisher'],
    nodes: ['Keyword Analysis', 'Copy Generation', 'Brand Audit']
  },
  legal: {
    title: 'Legal Terms & GDPR Compliance Audit',
    category: 'Legal & Risk',
    description: 'MSA contract parsing, liability cap auditing, and data protection compliance verification.',
    query: 'Parse MSA contract PDF, flag liability caps, and verify GDPR compliance',
    agents: ['PDF Legal Parser', 'Liability Audit AI', 'GDPR Verification Guard'],
    nodes: ['Contract PDF Parser', 'Liability Risk Classifier', 'Compliance Summary']
  },
  healthcare: {
    title: 'Healthcare Clinical EHR Mapper Swarm',
    category: 'Healthcare & Biotech',
    description: 'HIPAA-compliant clinical note parsing, ICD-10 diagnostic coding, and lab trend analysis.',
    query: 'Parse clinical EHR progress note and map ICD-10 diagnostic codes',
    agents: ['EHR Parser AI', 'ICD-10 Coder', 'HIPAA Audit Guard'],
    nodes: ['Note Extractor', 'Diagnostic Coding', 'HIPAA Verification']
  }
};

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = (params?.templateId as string) || 'sales';
  const template = TEMPLATE_PRESETS[templateId] || TEMPLATE_PRESETS.sales;

  const handleDeploy = () => {
    router.push(`/workspace/new?prompt=${encodeURIComponent(template.query)}`);
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-8 font-sans">
        <Link href="/templates" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {template.category}
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{template.title}</h1>
            <p className="text-gray-400 text-sm max-w-2xl">{template.description}</p>
          </div>

          <button
            onClick={handleDeploy}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 cursor-pointer text-sm whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-white" /> Deploy Template Swarm
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Assigned Agent Workforce
            </h3>
            <div className="space-y-2">
              {template.agents.map((agent, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-300">
                  <span>{agent}</span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Ready</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Swarm DAG Execution Pipeline
            </h3>
            <div className="space-y-2">
              {template.nodes.map((node, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{node}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
