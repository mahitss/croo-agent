'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Users, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Play, 
  RotateCcw, 
  TrendingUp, 
  Layers, 
  FileText, 
  Copy, 
  Check, 
  Sparkles,
  BarChart3,
  Search,
  Code
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AutonomousOpsEngine, 
  IncidentRecord, 
  OperationsTeamStatus, 
  AutonomyLevel 
} from '../../services/autonomous-ops.engine';

export default function MissionControlPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'mission' | 'incidents' | 'events' | 'autonomy' | 'timeline'>('mission');
  const [incidents, setIncidents] = useState<IncidentRecord[]>([]);
  const [teams, setTeams] = useState<OperationsTeamStatus[]>([]);
  const [engAutonomy, setEngAutonomy] = useState<AutonomyLevel>('L3_Policy_Automation');

  useEffect(() => {
    fetchOpsData();
  }, []);

  const fetchOpsData = async () => {
    try {
      const list = await AutonomousOpsEngine.getIncidents();
      setIncidents(list);
      setTeams(AutonomousOpsEngine.getOperationsTeams());
    } catch (e) {
      console.warn('[AUTONOMOUS_OPS] Load warning:', e);
    }
  };

  const handleResolveIncident = async (id: string) => {
    try {
      const updated = await AutonomousOpsEngine.resolveIncident(id);
      setIncidents(prev => prev.map(i => i.id === id ? updated : i));
      toast(`INCIDENT COMMAND: Resolved incident ${id} cleanly!`, 'success');
    } catch (e) {
      toast('Failed to resolve incident.', 'error');
    }
  };

  const handleChangeAutonomy = (newLevel: AutonomyLevel) => {
    setEngAutonomy(newLevel);
    toast(`Governance policy updated: Engineering Autonomy set to ${newLevel}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#4EA3FF]" /> Autonomous Enterprise Operations Mission Control
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Continuous Operations Loop (Observe-Plan-Simulate-Execute-Learn), PagerDuty-style Incident Command, and 5-Level Autonomy Governance.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Global Governance:</span>
          <span className="text-emerald-400 font-bold">LEVEL 3: POLICY AUTOMATION</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'mission', label: 'Mission Control Dashboard', icon: Activity },
          { id: 'incidents', label: 'Incident Command & Mitigation', icon: AlertTriangle },
          { id: 'events', label: 'Business Event Engine Stream', icon: Zap },
          { id: 'autonomy', label: 'Safe Autonomy Governance Matrix', icon: ShieldCheck },
          { id: 'timeline', label: 'Global Operations Audit Timeline', icon: Globe },
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

      {/* TAB 1: MISSION CONTROL DASHBOARD */}
      {activeTab === 'mission' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map(t => (
              <div key={t.teamName} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{t.teamName}</span>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {t.healthPercent}%
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-sans block">Active Agents: <strong className="text-white">{t.activeAgentsCount}</strong></span>
                <span className="text-[10px] text-purple-300 block">{t.currentObjective}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INCIDENT COMMAND & MITIGATION */}
      {activeTab === 'incidents' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" /> Incident Command &amp; Automated Mitigation
              </h3>
              <span className="text-[10px] text-gray-500">Real-time incident response, root cause analysis, and automated rollbacks.</span>
            </div>
          </div>

          <div className="space-y-3">
            {incidents.map(inc => (
              <div key={inc.id} className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300 text-sm">{inc.id}: {inc.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
                      {inc.severity} SEVERITY
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${
                    inc.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  }`}>
                    {inc.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans text-gray-300">
                  <div><strong className="text-gray-400 font-mono text-[10px] uppercase block">Root Cause:</strong> {inc.rootCauseSummary}</div>
                  <div><strong className="text-gray-400 font-mono text-[10px] uppercase block">Mitigation Action:</strong> {inc.mitigationAction}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#232323]">
                  <span className="text-[10px] text-purple-300">Rollback Plan: {inc.rollbackPlan}</span>
                  {inc.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveIncident(inc.id)}
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl cursor-pointer text-xs font-mono font-bold"
                    >
                      Verify &amp; Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BUSINESS EVENT STREAM */}
      {activeTab === 'events' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#4EA3FF]" /> Business Event Engine Telemetry Stream
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { event: 'Traffic Spike Detected (+350% RPS on US Gateway)', response: 'Auto-scaled H100 GPU inferencing pool from 4 to 8 instances.', status: 'AUTO-HANDLED' },
              { event: 'High Cloud Infrastructure Expenditure Trigger', response: 'Initiated spot-instance arbitrage strategy saving $420 USDC / day.', status: 'AUTO-HANDLED' }
            ].map((ev, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{ev.event}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">{ev.response}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  {ev.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SAFE AUTONOMY GOVERNANCE MATRIX */}
      {activeTab === 'autonomy' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Safe Autonomy Governance Level Selector
          </h3>

          <div className="bg-[#050505] border border-[#232323] p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm">Engineering &amp; Infrastructure Autonomy</span>
                <span className="text-[10px] text-gray-400 block font-sans">Controls whether AI can auto-scale nodes, route traffic, or rotate secrets.</span>
              </div>

              <select
                value={engAutonomy}
                onChange={(e) => handleChangeAutonomy(e.target.value as any)}
                className="bg-[#111111] border border-[#232323] text-emerald-400 font-bold rounded-xl px-4 py-2 text-xs outline-none"
              >
                <option value="L0_Observation">Level 0: Observation Only</option>
                <option value="L1_Recommendations">Level 1: Recommendations Only</option>
                <option value="L2_Approval_Required">Level 2: Executive Approval Required</option>
                <option value="L3_Policy_Automation">Level 3: Policy-Based Automation</option>
                <option value="L4_Fully_Autonomous">Level 4: Fully Autonomous</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GLOBAL OPERATIONS AUDIT TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-400" /> Global Operations Audit Trail Timeline
          </h3>

          <div className="space-y-2 pt-2">
            {[
              { title: 'Level 3 Policy Automation Triggered', details: 'Auto-scaled GPU cluster on AWS us-east-1 to handle 350% RPS spike.', timestamp: 'Just now' },
              { title: 'Incident inc-9021 Mitigated', details: 'Traffic re-routed to US East pool without downtime.', timestamp: '5 mins ago' }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[#4EA3FF] font-bold">[{t.title}]</span>
                  <span className="text-gray-300 block font-sans mt-0.5">{t.details}</span>
                </div>
                <span className="text-gray-500 text-[10px]">{t.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
