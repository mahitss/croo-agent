'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  ShieldCheck, 
  Users, 
  Key, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Search, 
  Lock, 
  Activity, 
  Terminal, 
  Sparkles, 
  Globe, 
  Check, 
  X, 
  RotateCcw, 
  Layers, 
  Building, 
  DollarSign, 
  ShieldAlert, 
  Clock,
  ThumbsUp,
  ThumbsDown,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  EnterpriseGovernanceService, 
  AuditLogRecord, 
  GovernancePolicy, 
  ApprovalRequest, 
  ComplianceScore 
} from '../../services/enterprise-governance.service';

export default function AdminGovernancePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'rbac' | 'policies' | 'audit' | 'approvals' | 'compliance'>('overview');
  const [auditQuery, setAuditQuery] = useState('');
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [policies, setPolicies] = useState<GovernancePolicy[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [complianceScores, setComplianceScores] = useState<ComplianceScore[]>([]);

  useEffect(() => {
    fetchGovernanceData();
  }, [auditQuery]);

  const fetchGovernanceData = async () => {
    try {
      const logs = await EnterpriseGovernanceService.getAuditLogs(auditQuery);
      setAuditLogs(logs);
      const pols = await EnterpriseGovernanceService.getPolicies();
      setPolicies(pols);
      const apprs = await EnterpriseGovernanceService.getApprovalRequests();
      setApprovalRequests(apprs);
      setComplianceScores(EnterpriseGovernanceService.getComplianceScores());
    } catch (e) {
      console.warn('[ADMIN] Governance fetch warning:', e);
    }
  };

  const handleResolveApproval = async (id: string, approve: boolean) => {
    const res = await EnterpriseGovernanceService.resolveApproval(id, approve);
    toast(res.message, approve ? 'success' : 'info');
    setApprovalRequests(prev => prev.map(a => a.id === id ? { ...a, status: approve ? 'approved' : 'rejected' } : a));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#4EA3FF]" /> Enterprise AI Governance & Control Plane
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Organization-wide RBAC, SOC 2 / GDPR compliance, immutable audit logging stream, PII guardrails, and sensitive action approval workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Compliance Readiness:</span>
          <span className="text-emerald-400 font-bold">98.4% (SOC 2 Compliant)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Executive Governance Overview', icon: ShieldCheck },
          { id: 'rbac', label: 'RBAC & User Access', icon: Users },
          { id: 'policies', label: 'Policy Engine & Guardrails', icon: Sliders },
          { id: 'audit', label: 'Immutable Audit Stream', icon: Terminal },
          { id: 'approvals', label: 'Approval Workflows', icon: Clock },
          { id: 'compliance', label: 'Compliance Frameworks', icon: Globe },
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

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Organization Nodes</span>
              <span className="text-2xl font-bold text-white block">Orbit Core Org</span>
              <span className="text-[10px] text-gray-400 font-sans block">4 Workspaces • 18 Projects</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Active Members</span>
              <span className="text-2xl font-bold text-[#4EA3FF] block">142 Users</span>
              <span className="text-[10px] text-gray-400 font-sans block">12 Service Accounts</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Compliance Readiness</span>
              <span className="text-2xl font-bold text-emerald-400 block">98.4%</span>
              <span className="text-[10px] text-gray-400 font-sans block">SOC 2 / GDPR Compliant</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Monthly Budget Cap</span>
              <span className="text-2xl font-bold text-purple-300 block">$5,000 USDC</span>
              <span className="text-[10px] text-gray-400 font-sans block">Hard limit enforced</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC & USER ACCESS */}
      {activeTab === 'rbac' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-6 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4EA3FF]" /> Role-Based Access Control (RBAC) & Granular Matrix
          </h3>

          <div className="space-y-3">
            {[
              { role: 'Owner', usersCount: 2, perms: 'All administrative, billing, and system privileges.' },
              { role: 'Administrator', usersCount: 8, perms: 'Full resource creation, deployment, and security policy management.' },
              { role: 'Developer', usersCount: 84, perms: 'Workflow builder, DAG execution, agent creation, and code editing.' },
              { role: 'Auditor', usersCount: 4, perms: 'Read-only access to audit logs, compliance reports, and security traces.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-xs">{r.role}</span>
                  <span className="text-gray-400 font-sans text-[11px] block mt-0.5">{r.perms}</span>
                </div>
                <span className="text-gray-400 text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  {r.usersCount} Assigned Users
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: POLICY ENGINE & GUARDRAILS */}
      {activeTab === 'policies' && (
        <div className="space-y-4 font-mono text-xs">
          {policies.map(pol => (
            <div key={pol.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{pol.name}</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  POLICY ACTIVE
                </span>
              </div>

              <pre className="bg-[#050505] border border-[#232323] p-3 rounded-xl text-amber-300 text-[11px] overflow-x-auto">
{JSON.stringify(pol.rules, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: IMMUTABLE AUDIT LOGGING */}
      {activeTab === 'audit' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit trail by user, IP, action, or request ID..."
              value={auditQuery}
              onChange={(e) => setAuditQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-white outline-none"
            />
          </div>

          <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Immutable System Audit Stream</span>
            
            <div className="space-y-2">
              {auditLogs.map(log => (
                <div key={log.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#4EA3FF] font-bold">{log.action}</span>
                    <span className="text-gray-500">{log.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-gray-300">
                    <span>User: <strong className="text-white">{log.userName}</strong> ({log.ipAddress})</span>
                    <span>Request ID: <strong className="text-purple-300">{log.requestId}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: APPROVAL WORKFLOWS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4 font-mono text-xs">
          {approvalRequests.map(req => (
            <div key={req.id} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{req.resourceName}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                  req.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {req.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Requested by: <strong className="text-white">{req.requestedBy}</strong></span>
                <span>Action: <strong className="text-purple-300">{req.actionType}</strong></span>
              </div>

              {req.status === 'pending' && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#232323]">
                  <button
                    onClick={() => handleResolveApproval(req.id, true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Approve Action
                  </button>
                  <button
                    onClick={() => handleResolveApproval(req.id, false)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl cursor-pointer"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: COMPLIANCE FRAMEWORKS */}
      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs">
          {complianceScores.map((c, i) => (
            <div key={i} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{c.framework}</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                  COMPLIANT
                </span>
              </div>

              <div className="text-3xl font-bold text-emerald-400">{c.score}%</div>
              <span className="text-[10px] text-gray-500 block">Automated audit verified on-chain & in DB.</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
