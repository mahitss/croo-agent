'use client';

import { useState, useEffect } from 'react';
import { X, Award, BarChart3, BookOpen, Layers, DollarSign, MessageSquare, ShieldCheck, Play, Star, Plus, Eye, History } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../lib/api-client';
import { useToast } from './Toast';

interface AgentDetailModalProps {
  agent: any;
  onClose: () => void;
}

export default function AgentDetailModal({ agent: initialAgent, onClose }: AgentDetailModalProps) {
  const [agent, setAgent] = useState(initialAgent);
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'pricing' | 'reviews' | 'versions' | 'analytics' | 'api'>('overview');
  const [apiInput, setApiInput] = useState(`{\n  "prompt": "Evaluate market trends for Tesla in Q1 2026",\n  "max_results": 5\n}`);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiTesting, setApiTesting] = useState(false);
  const { user } = useAuthStore();
  const { toast } = useToast();

  // Review Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Version Update Form state
  const [newVersionNum, setNewVersionNum] = useState('');
  const [newEndpointUrl, setNewEndpointUrl] = useState('');
  const [isSubmittingVersion, setIsSubmittingVersion] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'capabilities', label: 'Capabilities', icon: Layers },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'reviews', label: 'Reviews & Feedback', icon: MessageSquare },
    { id: 'versions', label: 'Version History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'api', label: 'Interactive API', icon: Play },
  ] as const;

  // Load reviews and versions dynamically
  const reloadAgentDetails = async () => {
    try {
      const res = await apiClient.get<any>(`/api/v1/agents/${agent.id}`);
      if (res.success && res.data) {
        setAgent(res.data);
      }
    } catch (err: any) {
      console.error('Failed to load dynamic details:', err);
    }
  };

  useEffect(() => {
    reloadAgentDetails();
  }, [agent.id]);

  // Submit Review Handler
  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast('Please login to post a review', 'error');
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await apiClient.post<any>(`/api/v1/agents/${agent.id}/reviews`, {
        rating,
        comment,
        userId: user.id,
      });
      if (res.success) {
        toast('Review submitted successfully!', 'success');
        setComment('');
        await reloadAgentDetails();
      } else {
        toast(res.message || 'Failed to submit review', 'error');
      }
    } catch (err: any) {
      toast(`Submission error: ${err.message}`, 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Submit Version Update Handler
  const handlePublishVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersionNum || !newEndpointUrl) {
      toast('Version and Endpoint are required', 'error');
      return;
    }
    setIsSubmittingVersion(true);
    try {
      const res = await apiClient.post<any>(`/api/v1/agents/${agent.id}/versions`, {
        version: newVersionNum,
        endpoint: newEndpointUrl,
      });
      if (res.success) {
        toast(`Version ${newVersionNum} published successfully!`, 'success');
        setNewVersionNum('');
        setNewEndpointUrl('');
        await reloadAgentDetails();
      } else {
        toast(res.message || 'Failed to publish update', 'error');
      }
    } catch (err: any) {
      toast(`Publish error: ${err.message}`, 'error');
    } finally {
      setIsSubmittingVersion(false);
    }
  };

  const performanceData = [
    { day: 'Mon', latency: agent.latency - 40 },
    { day: 'Tue', latency: agent.latency + 10 },
    { day: 'Wed', latency: agent.latency - 20 },
    { day: 'Thu', latency: agent.latency + 50 },
    { day: 'Fri', latency: agent.latency }
  ];

  const pieData = [
    { name: 'Success', value: 100 - (agent.failureRate || 1.0), color: '#00ffcc' },
    { name: 'Failure', value: agent.failureRate || 1.0, color: '#ff007f' }
  ];

  const runTestApi = () => {
    setApiTesting(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiTesting(false);
      try {
        const parsed = JSON.parse(apiInput);
        setApiResponse(JSON.stringify({
          status: "success",
          txHash: "0x" + Math.random().toString(16).substr(2, 40),
          agentId: agent.id,
          payload: {
            resolved_query: parsed.prompt || "Default query context",
            confidence_score: ((agent.accuracy || 95.0) / 100).toFixed(2),
            timestamp: new Date().toISOString(),
            data: {
              metric: `${agent.name} Execution Log Output`,
              source: "Official custom schema verification",
              summary: `Handshake resolved successfully at ${agent.latency}ms SLA limit.`
            }
          }
        }, null, 2));
      } catch (err: any) {
        setApiResponse(JSON.stringify({
          status: "failed",
          error: "Invalid JSON input structure",
          details: err.message
        }, null, 2));
      }
    }, 1200);
  };

  const isOwner = user && agent.ownerId === user.id;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="glass-card border border-border-dark w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] bg-gradient-to-b from-bg-dark to-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-dark flex justify-between items-center bg-card-dark/40 relative">
          <div className="flex items-center gap-3">
            {agent.logoUrl ? (
              <img src={agent.logoUrl} alt={agent.name} className="w-10 h-10 rounded-xl object-cover bg-white/5 border border-border-dark" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-md">
                {agent.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white leading-none">{agent.name}</h2>
                  <span className="text-[9px] font-mono bg-white/5 border border-border-dark text-gray-400 px-1.5 py-0.5 rounded">
                    v{agent.version}
                  </span>
                  {agent.verificationStatus === 'verified' && (
                    <span className="flex items-center gap-0.5 text-[8px] bg-primary-neon/15 text-primary-neon px-1.5 py-0.5 rounded font-mono border border-primary-neon/20">
                      <Award className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 font-mono italic">Category: {agent.category}</span>
              </div>
              <p className="text-[9px] text-gray-500 font-mono mt-0.5">Publisher ID: {agent.ownerId || 'System'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border-dark bg-black/35 overflow-x-auto scrollbar-none px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-[11px] font-mono border-b-2 transition-colors shrink-0 ${
                  isActive 
                    ? 'border-primary-neon text-primary-neon bg-white/2' 
                    : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-gray-300 scrollbar-thin">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-bold text-white mb-2 uppercase font-mono tracking-wider text-[10px]">Description</h3>
                <p className="leading-relaxed text-gray-400 font-mono">{agent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-dark">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Version Endpoint</span>
                  <span className="font-mono text-white select-all bg-white/3 border border-border-dark p-2 rounded leading-tight break-all">{agent.endpoint || 'No Endpoint URL Published'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Reputation Profile</span>
                  <span className="text-white font-mono p-2 bg-white/3 border border-border-dark rounded">
                    {agent.rating ? `${Number(agent.rating).toFixed(1)} / 5.0 ★` : 'No rating yet'} ({agent.reviewsCount || 0} audits)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-border-dark">
                <span className="text-[10px] text-gray-500 font-mono uppercase">Indexed Capabilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills && agent.skills.map((s: string, idx: number) => (
                    <span key={idx} className="bg-white/3 border border-border-dark px-2.5 py-1 rounded text-white font-mono">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAPABILITIES */}
          {activeTab === 'capabilities' && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-white mb-2 uppercase font-mono tracking-wider">Input Schema Details (JSON)</h3>
                <pre className="bg-black/50 border border-border-dark p-3 rounded-lg font-mono text-[10px] text-accent-blue overflow-x-auto">
{`{
  "prompt": "string (Natural language task prompt)",
  "budget_limit": "float (Maximum budget in USDC)",
  "routing_strategy": "string ('balanced' | 'cheapest' | 'fastest' | 'accuracy')"
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2 uppercase font-mono tracking-wider">Response Schema Details (JSON)</h3>
                <pre className="bg-black/50 border border-border-dark p-3 rounded-lg font-mono text-[10px] text-primary-neon overflow-x-auto">
{`{
  "status": "string ('success' | 'failed')",
  "transaction_hash": "string (Payment verification proof)",
  "data": {
    "summary": "string (Formatted execution summaries)",
    "accuracy_rating": "float (Execution accuracy percentage)"
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {/* PRICING */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">PAY PER REQUEST</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Pay as you go per workflow execution.</p>
                </div>
                <h2 className="text-lg font-bold text-primary-neon font-mono">
                  {Number(agent.price || 0).toFixed(2)} <span className="text-xs text-gray-500 font-normal">USDC / call</span>
                </h2>
              </div>
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">CREATOR BUNDLE</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Pre-paid credits for workflow teams.</p>
                </div>
                <h2 className="text-lg font-bold text-accent-blue font-mono">
                  {(Number(agent.price || 0) * 0.85).toFixed(2)} <span className="text-xs text-gray-500 font-normal">USDC / call</span>
                </h2>
              </div>
              <div className="bg-white/2 border border-border-dark p-4 rounded-xl flex flex-col justify-between h-[150px]">
                <div>
                  <h4 className="font-bold text-white font-mono text-[10px]">ENTERPRISE SLA</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Unlimited usage up to 10k calls/month.</p>
                </div>
                <h2 className="text-lg font-bold text-secondary-neon font-mono">
                  {(Number(agent.price || 0) * 1200).toFixed(0)} <span className="text-xs text-gray-500 font-normal">USDC / mo</span>
                </h2>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6">
              {/* Review Input form */}
              {user ? (
                <form onSubmit={handlePostReview} className="border border-border-dark p-4 rounded-xl bg-black/20 flex flex-col gap-3">
                  <h4 className="font-bold text-white font-mono text-[10px] uppercase">Submit Review</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-500 font-mono">RATING:</span>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="bg-black border border-border-dark rounded text-xs text-white px-2 py-1 outline-none font-mono"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★</option>
                      <option value={3}>3 Stars ★★★</option>
                      <option value={2}>2 Stars ★★</option>
                      <option value={1}>1 Star ★</option>
                    </select>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review comments here..."
                    className="w-full bg-black/40 border border-border-dark focus:border-primary-neon/40 p-2.5 rounded-lg text-xs text-white outline-none resize-none h-[65px]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !comment.trim()}
                    className="bg-primary-neon text-black font-extrabold text-[10px] py-2 rounded-lg hover:brightness-110 disabled:opacity-40 transition-all font-mono self-end px-6"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 bg-white/2 border border-dashed border-border-dark rounded-xl text-gray-500 font-mono">
                  Login to submit audit reviews & ratings.
                </div>
              )}

              {/* Review Items */}
              <div className="flex flex-col gap-3 font-mono text-[10px]">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Live Audits & Feedback ({agent.reviews?.length || 0})</h4>
                {agent.reviews && agent.reviews.length > 0 ? (
                  agent.reviews.map((r: any, idx: number) => (
                    <div key={r.id || idx} className="border border-border-dark p-3 rounded-lg bg-white/2">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-bold text-white text-[9px]">{r.userId}</span>
                        <span className="text-primary-neon">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="text-gray-400 font-sans text-xs">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic py-4">No reviews posted yet. Be the first to audit this agent!</div>
                )}
              </div>
            </div>
          )}

          {/* VERSIONS */}
          {activeTab === 'versions' && (
            <div className="flex flex-col gap-6">
              {/* Creator Publish Update Form */}
              {isOwner ? (
                <form onSubmit={handlePublishVersion} className="border border-border-dark p-4 rounded-xl bg-black/20 flex flex-col gap-3">
                  <h4 className="font-bold text-white font-mono text-[10px] uppercase">Publish Version Update</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-gray-500 font-mono">VERSION (e.g. 1.0.1)</label>
                      <input 
                        type="text" 
                        value={newVersionNum}
                        onChange={(e) => setNewVersionNum(e.target.value)}
                        placeholder="1.0.1"
                        className="bg-black border border-border-dark rounded text-xs text-white px-2.5 py-1.5 outline-none font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-gray-500 font-mono">ENDPOINT URL</label>
                      <input 
                        type="text" 
                        value={newEndpointUrl}
                        onChange={(e) => setNewEndpointUrl(e.target.value)}
                        placeholder="https://agent-endpoint.com/v1"
                        className="bg-black border border-border-dark rounded text-xs text-white px-2.5 py-1.5 outline-none font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingVersion || !newVersionNum || !newEndpointUrl}
                    className="bg-accent-blue text-white font-extrabold text-[10px] py-2 rounded-lg hover:brightness-110 disabled:opacity-40 transition-all font-mono self-end px-6"
                  >
                    {isSubmittingVersion ? 'Publishing...' : 'Publish Update'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 bg-white/2 border border-dashed border-border-dark rounded-xl text-gray-500 font-mono">
                  Only the creator ({agent.ownerId || 'System'}) can publish version updates.
                </div>
              )}

              {/* Version History items */}
              <div className="flex flex-col gap-3 font-mono text-[10px]">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Release History</h4>
                {agent.versions && agent.versions.length > 0 ? (
                  agent.versions.map((v: any, idx: number) => (
                    <div key={v.id || idx} className="border border-border-dark p-3 rounded-lg bg-white/2 flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white text-xs">Version {v.version}</span>
                        <span className="text-gray-500 text-[9px] break-all">Endpoint: {v.endpoint}</span>
                      </div>
                      <span className="text-[9px] text-gray-500 shrink-0 font-normal">{new Date(v.publishedAt).toLocaleDateString()}</span>
                    </div>
                  ))
                ) : (
                  <div className="border border-border-dark p-3 rounded-lg bg-white/2 flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-white text-xs">Version {agent.version || '1.0.0'}</span>
                      <span className="text-gray-500 text-[9px]">Endpoint: {agent.endpoint || 'Default Endpoint'}</span>
                    </div>
                    <span className="text-[9px] text-gray-500 shrink-0 font-normal">Active</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-2 gap-4 h-[220px]">
              <div className="border border-border-dark p-3 rounded-xl bg-black/40 flex flex-col text-[10px]">
                <span className="font-bold text-white mb-2 font-mono">SLA LATENCY TRENDS (ms)</span>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ left: -30, right: 10 }}>
                      <XAxis dataKey="day" stroke="#4b5563" fontSize={8} />
                      <YAxis stroke="#4b5563" fontSize={8} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1b1e25', fontSize: '8px' }} />
                      <Line type="monotone" dataKey="latency" stroke="#00ffcc" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="border border-border-dark p-3 rounded-xl bg-black/40 flex flex-col text-[10px]">
                <span className="font-bold text-white mb-2 font-mono">EXECUTION RATIO</span>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={50}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f1115', border: '1px solid #1b1e25', fontSize: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* API DOCS */}
          {activeTab === 'api' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-white font-mono">Request Payload (JSON Body)</span>
                <textarea
                  className="w-full bg-black/50 border border-border-dark focus:border-primary-neon/40 p-3 rounded-lg font-mono text-[10px] text-white outline-none resize-none h-[150px]"
                  value={apiInput}
                  onChange={(e) => setApiInput(e.target.value)}
                />
                <button
                  onClick={runTestApi}
                  disabled={apiTesting}
                  className="bg-primary-neon text-black font-extrabold py-2.5 rounded-lg hover:brightness-110 flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-wide"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  {apiTesting ? 'EXECUTING_NODE_HANDSHAKE...' : 'TEST_NODE_ENDPOINT'}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-bold text-white font-mono">Interactive Output Logger</span>
                <div className="bg-black/60 border border-border-dark p-3 rounded-lg font-mono text-[9px] h-[190px] overflow-y-auto scrollbar-thin text-gray-400 select-all leading-relaxed whitespace-pre-wrap">
                  {apiResponse ? apiResponse : apiTesting ? '// Executing secure node handshake...' : '// Click execute to run endpoint simulation.'}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
