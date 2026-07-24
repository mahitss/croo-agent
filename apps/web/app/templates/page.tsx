'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Layers, Sparkles, Shield, Cpu, Play } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function TemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const templates = [
    { name: 'Sales Swarms', route: '/marketing', icon: ArrowRight, desc: 'Automate high-converting cold outreach sequences, client follow-ups, and lead score classification.' },
    { name: 'Research Consensuses', route: '/research', icon: BookOpen, desc: 'Query multiple search models, perform automatic cross-verification, and compile structured PDF briefs.' },
    { name: 'Finance Audits', route: '/finance', icon: Layers, desc: 'Aggregate financial statements, compute portfolio analytics metrics, and generate expense report summaries.' },
    { name: 'Marketing Scribes', route: '/marketing', icon: Sparkles, desc: 'Generate multi-channel ad copy swarms, blog templates, and social posts optimized for conversion.' },
    { name: 'Legal Term Examiners', route: '/legal', icon: Shield, desc: 'Ingest contract PDFs, extract critical risk markers, and cross-examine liability terms against rules.' },
    { name: 'Healthcare Data Convergers', route: '/healthcare', icon: Cpu, desc: 'Scan clinical trial logs, optimize staff schedules, and safely map medical records to standard schemas.' }
  ];

  const handleLaunchTemplate = (name: string, route: string) => {
    toast(`Navigating to ${name} portal...`, 'info');
    router.push(route);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Swarm Workflow Templates
        </h1>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">
          Select a pre-configured Directed Acyclic Graph (DAG) configuration to instantly deploy specialized agent clusters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {templates.map((tmpl) => {
          const Icon = tmpl.icon;
          return (
            <div 
              key={tmpl.name}
              onClick={() => handleLaunchTemplate(tmpl.name, tmpl.route)}
              className="bg-[#111111] border border-[#232323] hover:border-white/10 p-6 rounded-2xl flex items-start gap-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-white/5 text-[#4EA3FF] shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{tmpl.name}</h3>
                  <div className="text-[10px] text-[#4EA3FF] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Deploy</span>
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{tmpl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
