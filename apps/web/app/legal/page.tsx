'use client';

import { useState } from 'react';
import { Shield, Sparkles, FileCheck, AlertTriangle, CheckCircle2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function LegalPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleAudit = () => {
    toast('Legal Compliance Examiner swarm initialized.', 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Legal & Compliance Swarm Examiner
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Parse contract terms, extract indemnification risks, and cross-verify regulatory compliance across jurisdiction rules.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex flex-col items-center gap-4 text-center max-w-2xl mx-auto w-full cursor-pointer hover:border-white/10 transition-colors" onClick={handleAudit}>
        <Upload className="w-8 h-8 text-[#4EA3FF]" />
        <div>
          <h3 className="text-sm font-semibold text-white">Drop Contract PDFs or Master Services Agreement</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">Upload PDF, DOCX or plain text files for instant audit parsing</p>
        </div>
        <button
          onClick={handleAudit}
          className="bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 mt-2"
        >
          Run Compliance Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'GDPR & Privacy Audit', desc: 'Identifies non-compliant data retention clauses.' },
          { title: 'Liability Cap Analysis', desc: 'Flags uncapped indemnity and breach exposure.' },
          { title: 'IP Ownership Verification', desc: 'Verifies assignment rights for AI-generated code.' }
        ].map((item) => (
          <div key={item.title} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">{item.title}</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
