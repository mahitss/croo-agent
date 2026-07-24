'use client';

import { useState } from 'react';
import { Cpu, Activity, Database, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function HealthcarePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLaunchHealthcare = () => {
    toast('Healthcare EHR Data Converger swarm deployed.', 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
          <Cpu className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Healthcare EHR & Trial Log Converger
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Scan clinical trial logs, optimize staff schedules, and safely map medical records to FHIR standard schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'FHIR Schema Mapping', desc: 'Converts unstructured clinical notes to standard JSON FHIR format.', icon: Database },
          { title: 'Trial Log Scanner', desc: 'Parses patient trial intake records for exclusion risk markers.', icon: Activity },
          { title: 'HIPAA Shield Guard', desc: 'Automatically redacts PII/PHI markers prior to model processing.', icon: ShieldCheck }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-3">
              <Icon className="w-5 h-5 text-[#4EA3FF]" />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white">Deploy Clinical Data Swarm</h3>
          <p className="text-xs text-[#9CA3AF]">Process clinical logs with HIPAA compliance guards.</p>
        </div>
        <button
          onClick={handleLaunchHealthcare}
          className="bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow"
        >
          Launch Swarm
        </button>
      </div>
    </div>
  );
}
