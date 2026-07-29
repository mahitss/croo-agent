'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  Users, 
  Layers, 
  Sliders, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Play, 
  FileText, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  BarChart3,
  Brain,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  EnterpriseBrainEngine, 
  ExecutivePersona, 
  EnterpriseDecisionCard, 
  PredictiveForecast 
} from '../../services/enterprise-brain.engine';

export default function GlobalCommandCenterPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'command' | 'boardroom' | 'graph' | 'autonomous' | 'predictive'>('command');
  const [healthScore, setHealthScore] = useState(98.4);
  const [executives, setExecutives] = useState<ExecutivePersona[]>([]);
  const [decisions, setDecisions] = useState<EnterpriseDecisionCard[]>([]);
  const [forecasts, setForecasts] = useState<PredictiveForecast[]>([]);

  useEffect(() => {
    fetchBrainData();
  }, []);

  const fetchBrainData = async () => {
    try {
      const data = await EnterpriseBrainEngine.getEnterpriseHealth();
      setHealthScore(data.overallHealthPercent);
      setExecutives(data.executives);
      setDecisions(EnterpriseBrainEngine.getExecutiveDecisions());
      setForecasts(EnterpriseBrainEngine.getPredictiveForecasts());
    } catch (e) {
      console.warn('[ENTERPRISE_BRAIN] Load warning:', e);
    }
  };

  const handleExecuteDecision = (decId: string) => {
    setDecisions(prev => prev.map(d => d.id === decId ? { ...d, approvalStatus: 'Executed' } : d));
    toast(`AUTONOMOUS OPERATIONS: Executed executive recommendation ${decId}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#4EA3FF]" /> Global Artificial Enterprise Intelligence Command Center
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time C-Suite AI Executive Boardroom (CEO, CTO, CFO, CISO), Live Organizational Graph, and Autonomous Operations.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Enterprise Health Index:</span>
          <span className="text-emerald-400 font-bold text-sm">{healthScore}% (OPTIMAL)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'command', label: 'Global Command Center', icon: Activity },
          { id: 'boardroom', label: 'C-Suite AI Executive Boardroom', icon: Users },
          { id: 'graph', label: 'Live Enterprise Knowledge Graph', icon: Layers },
          { id: 'autonomous', label: 'Autonomous Operations & Approvals', icon: Zap },
          { id: 'predictive', label: 'Predictive Intelligence & Forecasts', icon: TrendingUp },
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

      {/* TAB 1: GLOBAL COMMAND CENTER */}
      {activeTab === 'command' && (
        <div className="space-y-6 font-mono text-xs">
          {/* Composite Metric Scorecard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-1">
              <span className="text-gray-500 text-[10px] uppercase">Enterprise Health</span>
              <span className="text-2xl font-bold text-emerald-400 block">{healthScore}%</span>
              <span className="text-[10px] text-gray-400 font-sans">Across 14 Departments</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-1">
              <span className="text-gray-500 text-[10px] uppercase">Monthly Cost Savings</span>
              <span className="text-2xl font-bold text-amber-300 block">$14,200 USDC</span>
              <span className="text-[10px] text-gray-400 font-sans">Auto GPU Suspension</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-1">
              <span className="text-gray-500 text-[10px] uppercase">Active AI Workforce</span>
              <span className="text-2xl font-bold text-white block">128 Swarm Agents</span>
              <span className="text-[10px] text-gray-400 font-sans">99.99% Execution SLA</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-1">
              <span className="text-gray-500 text-[10px] uppercase">Security Vulnerabilities</span>
              <span className="text-2xl font-bold text-emerald-400 block">0 OWASP Critical</span>
              <span className="text-[10px] text-gray-400 font-sans">Real-Time Guardrail Shield</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: C-SUITE AI EXECUTIVE BOARDROOM */}
      {activeTab === 'boardroom' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#4EA3FF]" /> C-Suite AI Executive Boardroom
              </h3>
              <span className="text-[10px] text-gray-500">Autonomous executive personas continuously optimizing their domains.</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              BOARDROOM ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {executives.map(exec => (
              <div key={exec.role} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">{exec.name} ({exec.role})</span>
                    <span className="text-[10px] text-gray-400 block font-sans">{exec.domain}</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {exec.healthScorePercent}%
                  </span>
                </div>

                <div className="bg-[#111111] p-3 rounded-lg border border-[#232323] text-xs font-sans text-gray-300">
                  <strong className="text-[#4EA3FF] font-mono block text-[10px] uppercase mb-1">Active Recommendation:</strong>
                  {exec.activeRecommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE ENTERPRISE KNOWLEDGE GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Live Enterprise Knowledge Graph Topology
          </h3>

          <div className="bg-[#050505] border border-[#232323] p-6 rounded-xl space-y-4 text-center">
            <div className="inline-block bg-[#111111] border border-[#4EA3FF]/40 p-4 rounded-xl text-left space-y-1">
              <span className="text-[10px] text-[#4EA3FF] font-bold block uppercase">Organization Node</span>
              <span className="text-xs font-bold text-white">Orbit AI Enterprise Root</span>
            </div>

            <div className="text-gray-500 text-xs font-bold">↓↓ MULTI-TIER ENTITY RELATIONSHIPS ↓↓</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
              <div className="bg-[#111111] border border-[#232323] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold block">Engineering Dept</span>
                <span className="text-xs text-gray-300 font-sans block">14 Projects • 48 Agents</span>
              </div>
              <div className="bg-[#111111] border border-[#232323] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-purple-300 font-bold block">Security &amp; Compliance</span>
                <span className="text-xs text-gray-300 font-sans block">OWASP Scanner • SOC2 Vault</span>
              </div>
              <div className="bg-[#111111] border border-[#232323] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-amber-300 font-bold block">Finance &amp; Ledger</span>
                <span className="text-xs text-gray-300 font-sans block">CAP Token Ledger • Cloud Billing</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUTONOMOUS OPERATIONS & APPROVALS */}
      {activeTab === 'autonomous' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Autonomous Operations &amp; Executive Approval Center
          </h3>

          <div className="space-y-3 pt-2">
            {decisions.map(dec => (
              <div key={dec.id} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{dec.title}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${
                    dec.approvalStatus === 'Executed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  }`}>
                    {dec.approvalStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans text-gray-300">
                  <div><strong className="text-gray-400 font-mono text-[10px] uppercase block">Business Impact:</strong> {dec.businessImpact}</div>
                  <div><strong className="text-gray-400 font-mono text-[10px] uppercase block">Financial Impact:</strong> <span className="text-amber-300 font-mono font-bold">+${dec.financialImpactUsdc.toLocaleString()} USDC</span></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#232323]">
                  <span className="text-[10px] text-gray-500">Sponsor: <strong className="text-[#4EA3FF]">{dec.sponsoringExecutive}</strong> • Risk Score: {dec.securityRiskScore}</span>
                  {dec.approvalStatus !== 'Executed' && (
                    <button
                      onClick={() => handleExecuteDecision(dec.id)}
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl cursor-pointer text-xs font-mono font-bold"
                    >
                      Approve &amp; Execute Operations
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PREDICTIVE INTELLIGENCE & FORECASTING */}
      {activeTab === 'predictive' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Predictive Intelligence &amp; 30/90-Day Growth Forecasts
          </h3>

          <div className="space-y-4 pt-2">
            {forecasts.map((f, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{f.metricName}</span>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    TREND: {f.trend}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-[#111111] p-3 rounded-lg border border-[#232323] text-[11px]">
                  <div><span className="text-gray-500 block">Current</span><span className="text-white font-bold block">{f.currentValue}</span></div>
                  <div><span className="text-gray-500 block">30-Day Forecast</span><span className="text-amber-300 font-bold block">{f.forecast30d}</span></div>
                  <div><span className="text-gray-500 block">90-Day Forecast</span><span className="text-emerald-400 font-bold block">{f.forecast90d}</span></div>
                </div>

                <p className="text-xs text-gray-300 font-sans"><strong className="font-mono text-[#4EA3FF]">Recommendation:</strong> {f.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
