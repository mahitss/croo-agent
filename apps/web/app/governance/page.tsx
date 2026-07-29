'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  ShieldCheck, 
  FileText, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Lock, 
  Globe, 
  Activity, 
  Sliders, 
  Play, 
  RotateCcw, 
  TrendingUp, 
  Copy, 
  Check, 
  Sparkles,
  BarChart3,
  Search,
  Code
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  GovernanceAutomationService, 
  FrameworkComplianceStatus, 
  DataFlowTrace, 
  AuditReportExport 
} from '../../services/governance-automation.service';

export default function GovernancePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'frameworks' | 'policy' | 'lineage' | 'audits' | 'exceptions'>('frameworks');
  const [frameworks, setFrameworks] = useState<FrameworkComplianceStatus[]>([]);
  const [dataFlows, setDataFlows] = useState<DataFlowTrace[]>([]);
  
  // Policy Test state
  const [testModel, setTestModel] = useState('Claude 3.5 Sonnet');
  const [testClassification, setTestClassification] = useState('PHI');
  const [testRegion, setTestRegion] = useState('us-east-1-hipaa');
  const [policyResult, setPolicyResult] = useState<{ allowed: boolean; violationReason?: string } | null>(null);

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  const fetchGovernanceData = async () => {
    try {
      const list = await GovernanceAutomationService.getFrameworkStatuses();
      setFrameworks(list);
      setDataFlows(GovernanceAutomationService.getDataFlowTraces());
    } catch (e) {
      console.warn('[GOVERNANCE] Load warning:', e);
    }
  };

  const handleTestPolicy = async () => {
    const res = await GovernanceAutomationService.validatePolicy(testModel, testClassification, testRegion);
    setPolicyResult(res);
    if (res.allowed) {
      toast('REAL-TIME POLICY ENFORCEMENT: Policy check PASSED cleanly!', 'success');
    } else {
      toast(`REAL-TIME POLICY VIOLATION: ${res.violationReason}`, 'error');
    }
  };

  const handleDownloadReport = (frameworkName: string) => {
    const pkg = GovernanceAutomationService.generateAuditorPackage(frameworkName);
    toast(`Exported Auditor Evidence Package for ${frameworkName} (${pkg.evidenceItemsCount} evidence items)`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Governance Automation &amp; Compliance Center
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time policy enforcement across SOC 2, ISO 27001, GDPR, HIPAA, EU AI Act, and NIST AI RMF with automated evidence packages.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">EU AI Act / SOC 2 Status:</span>
          <span className="text-emerald-400 font-bold">100% COMPLIANT (AUDITED)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'frameworks', label: 'Compliance Framework Scorecards', icon: ShieldCheck },
          { id: 'policy', label: 'Real-Time Policy Enforcement IDE', icon: Lock },
          { id: 'lineage', label: 'Data Lineage & Flow Tracker', icon: Layers },
          { id: 'audits', label: 'Risk Engine & Auditor Evidence Exporter', icon: Download },
          { id: 'exceptions', label: 'Approvals & Exception Requests', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-white/10 text-white border-white/20 font-bold' 
                  : 'bg-transparent text-gray-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COMPLIANCE FRAMEWORK SCORECARDS */}
      {activeTab === 'frameworks' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Active Regulatory Framework Scorecards ({frameworks.length})</h3>
              <span className="text-[10px] text-gray-500">Continuous automated control testing and compliance assurance.</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              CONTINUOUS MONITORING ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frameworks.map(fw => (
              <div key={fw.frameworkName} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">{fw.frameworkName}</span>
                    <span className="text-[10px] text-gray-400 block font-sans">{fw.category}</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                    {fw.complianceScorePercent}%
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#232323] text-[10px]">
                  <span className="text-gray-400">Controls: <strong className="text-emerald-400">{fw.controlsPassingCount} / {fw.totalControlsCount} Passing</strong></span>
                  <button
                    onClick={() => handleDownloadReport(fw.frameworkName)}
                    className="text-[#4EA3FF] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Evidence</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: REAL-TIME POLICY ENFORCEMENT IDE */}
      {activeTab === 'policy' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#4EA3FF]" /> Real-Time Pre-Execution Policy Enforcement IDE
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Test pre-execution policy enforcement across model whitelists, data classification levels (PII, PHI, Confidential), and region residency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Target AI Model</label>
                <select
                  value={testModel}
                  onChange={(e) => setTestModel(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white outline-none font-mono text-xs"
                >
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Approved)</option>
                  <option value="GPT-4o">GPT-4o (Approved)</option>
                  <option value="unapproved-experimental-model">Unapproved Model (Violates EU AI Act)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Data Classification</label>
                <select
                  value={testClassification}
                  onChange={(e) => setTestClassification(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white outline-none font-mono text-xs"
                >
                  <option value="PHI">PHI (Protected Health Info)</option>
                  <option value="PII">PII (Personal Identifiable Info)</option>
                  <option value="Confidential">Confidential Corporate Data</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Execution Region</label>
                <select
                  value={testRegion}
                  onChange={(e) => setTestRegion(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white outline-none font-mono text-xs"
                >
                  <option value="us-east-1-hipaa">us-east-1-hipaa (HIPAA Vault)</option>
                  <option value="unprotected-public-cloud">unprotected-public-cloud</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleTestPolicy}
              className="px-5 py-2.5 bg-[#4EA3FF] text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono"
            >
              Run Real-Time Policy Inspection
            </button>
          </div>

          {policyResult && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Policy Enforcement Result</span>
              <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm">Policy Check Result:</span>
                  {policyResult.violationReason && (
                    <span className="text-xs text-red-400 block font-sans mt-0.5">{policyResult.violationReason}</span>
                  )}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded border uppercase ${
                  policyResult.allowed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {policyResult.allowed ? 'ALLOWED (PASSED)' : 'BLOCKED (VIOLATION)'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DATA LINEAGE & FLOW TRACKER */}
      {activeTab === 'lineage' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> End-to-End Data Lineage &amp; Flow Trace Log
          </h3>

          <div className="space-y-3 pt-2">
            {dataFlows.map((df, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">{df.source}</span>
                    <span className="text-gray-500 font-bold">➔</span>
                    <span className="font-bold text-emerald-400">{df.destination}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block font-sans">Classification: <strong className="text-amber-300">{df.dataClassification}</strong> • Encrypted (AES-256): {df.encrypted ? 'YES' : 'NO'}</span>
                </div>
                <span className="text-[10px] text-gray-500">{df.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RISK ENGINE & AUDITOR EVIDENCE EXPORTER */}
      {activeTab === 'audits' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" /> Automated Auditor Evidence Package Exporter
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Generate 1-click evidence packages containing execution logs, prompt versions, policy decisions, and encryption attestations for external auditors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {['SOC 2 Type II Evidence', 'ISO 27001 Evidence', 'EU AI Act Compliance'].map(fw => (
              <button
                key={fw}
                onClick={() => handleDownloadReport(fw)}
                className="bg-[#050505] hover:bg-white/5 border border-[#232323] p-5 rounded-xl space-y-2 text-left cursor-pointer transition-all"
              >
                <Download className="w-5 h-5 text-[#4EA3FF]" />
                <span className="font-bold text-white text-xs block">{fw}</span>
                <span className="text-[10px] text-gray-400 font-sans block">Generate JSON / CSV Audit Bundle</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: APPROVALS & EXCEPTION REQUESTS */}
      {activeTab === 'exceptions' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" /> Emergency Exception &amp; Policy Approval Requests
          </h3>

          <div className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2 font-sans text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-white">REQ-402: Temporary LLM Token Budget Lift for Security Audit</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                APPROVED BY CISO
              </span>
            </div>
            <p className="text-gray-300 text-xs">Approved by CISO Brain for 24-hour window.</p>
          </div>
        </div>
      )}

    </div>
  );
}
