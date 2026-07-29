'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Globe, 
  Share2, 
  ShieldCheck, 
  Search, 
  Send, 
  Activity, 
  Cpu, 
  HardDrive, 
  Database, 
  DollarSign, 
  Terminal, 
  CheckCircle2, 
  Layers, 
  Lock, 
  Sliders, 
  TrendingUp,
  Award,
  GitBranch,
  X,
  FileText
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  FederatedNetworkService, 
  FederatedPeer, 
  FederatedResource, 
  FederatedMessage, 
  InterOrgSettlement 
} from '../../services/federated-network.service';

export default function FederationPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'topology' | 'directory' | 'protocol' | 'traces' | 'settlement' | 'governance'>('topology');
  const [directorySearch, setDirectorySearch] = useState('');
  const [peers, setPeers] = useState<FederatedPeer[]>([]);
  const [directory, setDirectory] = useState<FederatedResource[]>([]);
  const [settlements, setSettlements] = useState<InterOrgSettlement[]>([]);
  const [messages, setMessages] = useState<FederatedMessage[]>([]);
  
  // Message Sending Form
  const [targetOrg, setTargetOrg] = useState('CyberDefense Corp');
  const [taskPayload, setTaskPayload] = useState('Perform inter-org smart contract SAST audit and return OWASP 2024 report.');
  const [isSendingMsg, setIsSendingMsg] = useState(false);

  useEffect(() => {
    fetchFederationData();
  }, [directorySearch]);

  const fetchFederationData = async () => {
    try {
      const pList = await FederatedNetworkService.getPeers();
      setPeers(pList);
      const dList = await FederatedNetworkService.getDirectory(directorySearch);
      setDirectory(dList);
      setSettlements(FederatedNetworkService.getSettlements());
    } catch (e) {
      console.warn('[FEDERATION] Load warning:', e);
    }
  };

  const handleSendFederatedMessage = async () => {
    if (!taskPayload.trim()) return;
    setIsSendingMsg(true);
    try {
      const msg = await FederatedNetworkService.sendFederatedMessage(targetOrg, taskPayload);
      setMessages(prev => [msg, ...prev]);
      toast(`Federated AI message dispatched to ${targetOrg} via mTLS!`, 'success');
      setTaskPayload('');
    } catch (e) {
      toast('Failed to send federated message.', 'error');
    } finally {
      setIsSendingMsg(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Federated AI Collaboration Network
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Zero-trust inter-organization AI mesh: share agents, GPU compute, vector knowledge, and run cross-platform workflow executions via mTLS.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">mTLS Mesh Status:</span>
          <span className="text-emerald-400 font-bold">2 PEERS CONNECTED</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'topology', label: 'Federation Network Topology', icon: Globe },
          { id: 'directory', label: 'Global Federation Directory', icon: Search },
          { id: 'protocol', label: 'Inter-Org AI Protocol & Messaging', icon: Send },
          { id: 'traces', label: 'Cross-Platform Executions', icon: GitBranch },
          { id: 'settlement', label: 'Settlement & Revenue Share', icon: DollarSign },
          { id: 'governance', label: 'Zero Trust Governance', icon: ShieldCheck },
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

      {/* TAB 1: FEDERATION TOPOLOGY */}
      {activeTab === 'topology' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {peers.map(peer => (
            <div key={peer.id} className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl space-y-4 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {peer.trustLevel.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  {peer.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{peer.orgName}</h3>
                <span className="text-[10px] text-gray-500">{peer.domain}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#050505] p-3 rounded-xl border border-[#232323] text-[10px]">
                <div>
                  <span className="text-gray-500 block">Shared GPU Nodes</span>
                  <span className="text-emerald-400 font-bold block">{peer.sharedGpuCount} GPUs</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Shared Knowledge Bases</span>
                  <span className="text-purple-300 font-bold block">{peer.sharedKbCount} KBs</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#232323] text-[9px] text-gray-500 overflow-x-auto">
                <span>mTLS Cert Fingerprint: <strong className="text-gray-300">{peer.mtlsFingerprint}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: GLOBAL FEDERATION DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search published agents, MCP servers, and KBs..."
              value={directorySearch}
              onChange={(e) => setDirectorySearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {directory.map(res => (
              <div key={res.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 px-2 py-0.5 rounded uppercase font-bold">
                      {res.type}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold">★ {res.rating}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{res.name}</h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-3 border-t border-[#232323] flex items-center justify-between text-[10px]">
                  <span className="text-gray-500">Owner: <strong className="text-gray-300">{res.ownerOrg}</strong></span>
                  <span className="text-emerald-400 font-bold">${res.pricingUsdcPerReq} USDC/req</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTER-ORG AI PROTOCOL & MESSAGING */}
      {activeTab === 'protocol' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-[#4EA3FF]" /> Dispatch Inter-Organization AI Delegation Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">Target Organization Peer</label>
                <select
                  value={targetOrg}
                  onChange={(e) => setTargetOrg(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="CyberDefense Corp">CyberDefense Corp</option>
                  <option value="FinTech Standards Institute">FinTech Standards Institute</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase block mb-1">AI Protocol Message Payload</label>
                <input
                  type="text"
                  placeholder="Task delegation payload..."
                  value={taskPayload}
                  onChange={(e) => setTaskPayload(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSendFederatedMessage}
              disabled={isSendingMsg}
              className="px-5 py-2.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-bold rounded-xl cursor-pointer text-xs border-0"
            >
              {isSendingMsg ? 'Signing & Dispatching...' : 'Dispatch Encrypted Message'}
            </button>
          </div>

          {messages.length > 0 && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Live Inter-Org Protocol Message Stream</span>
              {messages.map(msg => (
                <div key={msg.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#4EA3FF] font-bold">{msg.senderOrg} -&gt; {msg.recipientOrg}</span>
                    <span className="text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-bold uppercase">
                      {msg.protocolType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 font-sans">{msg.payloadSummary}</p>
                  <span className="text-[9px] text-gray-500 block">Signature: {msg.signature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CROSS-PLATFORM EXECUTIONS */}
      {activeTab === 'traces' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" /> Cross-Organization Multi-Cloud Execution Traces
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Trace DAG executions spanning Org A (AWS) -&gt; Org B (On-Prem GPU) -&gt; Org C (Azure RAG).
          </p>

          <div className="space-y-2 bg-[#050505] p-4 rounded-xl border border-[#232323]">
            <div className="text-[#4EA3FF] font-bold">[SPAN 1] [Orbit Core] Initiated workflow exec-9421.</div>
            <div className="text-purple-300">[SPAN 2] [CyberDefense Corp] Delegated SAST audit task to H100 GPU Pool.</div>
            <div className="text-emerald-400">[SPAN 3] [FinTech Institute] Verified SEC &amp; SOC 2 compliance embeddings.</div>
          </div>
        </div>
      )}

      {/* TAB 5: SETTLEMENT & REVENUE SHARE */}
      {activeTab === 'settlement' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Inter-Organization Resource Settlement & Revenue Ledger
          </h3>

          <div className="space-y-3 pt-2">
            {settlements.map((s, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{s.partnerOrg}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">
                    Compute: {s.computeHoursConsumed} hrs | GPU: {s.gpuHoursConsumed} hrs | Tokens: {(s.tokensExchanged / 1000000).toFixed(2)}M
                  </span>
                </div>
                <span className={`text-xs font-bold ${s.balanceUsdc >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {s.balanceUsdc >= 0 ? `+${s.balanceUsdc}` : s.balanceUsdc} USDC
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ZERO TRUST GOVERNANCE */}
      {activeTab === 'governance' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Zero Trust Resource Sharing Governance Matrix
          </h3>

          <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 font-sans text-xs">
            <strong>mTLS Certificate Policy:</strong> Mutual TLS certificates are automatically rotated every 24 hours with zero-downtime SPIFFE/SPIRE identity validation.
          </div>
        </div>
      )}

    </div>
  );
}
