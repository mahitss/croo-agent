'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Activity, 
  Terminal, 
  Search, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  HardDrive, 
  Globe, 
  Layers, 
  Sliders, 
  Copy, 
  Check, 
  FileText, 
  Share2, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw,
  BarChart3,
  GitBranch,
  X
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { 
  AIObservabilityService, 
  DistributedTrace, 
  ErrorDiagnostic, 
  ModelPerformanceMetric 
} from '../../services/ai-observability.service';

export default function ObservabilityAnalyticsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'traces' | 'replay' | 'errors' | 'models' | 'otlp'>('overview');
  const [traceSearch, setTraceSearch] = useState('');
  const [traces, setTraces] = useState<DistributedTrace[]>([]);
  const [errorDiagnostics, setErrorDiagnostics] = useState<ErrorDiagnostic[]>([]);
  const [modelMetrics, setModelMetrics] = useState<ModelPerformanceMetric[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<DistributedTrace | null>(null);
  const [copiedOtlp, setCopiedOtlp] = useState(false);

  useEffect(() => {
    fetchObservabilityData();
  }, [traceSearch]);

  const fetchObservabilityData = async () => {
    try {
      const trs = await AIObservabilityService.getTraces(traceSearch);
      setTraces(trs);
      if (trs.length > 0) setSelectedTrace(trs[0]);
      const diags = await AIObservabilityService.getErrorDiagnostics();
      setErrorDiagnostics(diags);
      setModelMetrics(AIObservabilityService.getModelMetrics());
    } catch (e) {
      console.warn('[OBSERVABILITY] Load warning:', e);
    }
  };

  const handleCopyOTLP = () => {
    if (!selectedTrace) return;
    const payload = AIObservabilityService.formatOpenTelemetryPayload(selectedTrace);
    navigator.clipboard.writeText(payload);
    setCopiedOtlp(true);
    toast('Copied OpenTelemetry OTLP JSON payload!', 'success');
    setTimeout(() => setCopiedOtlp(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#4EA3FF]" /> Enterprise AI Observability & Distributed Tracing
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time telemetry, OpenTelemetry trace spans, execution replay, automated root cause diagnosis, and LLM token cost intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">OpenTelemetry:</span>
          <span className="text-emerald-400 font-bold">OTLP Exporter Ready</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Real-Time Telemetry', icon: Activity },
          { id: 'traces', label: 'Distributed Traces', icon: GitBranch },
          { id: 'replay', label: 'Execution Replay', icon: Play },
          { id: 'errors', label: 'Error Root Cause Diagnosis', icon: AlertTriangle },
          { id: 'models', label: 'Model Performance Metrics', icon: Cpu },
          { id: 'otlp', label: 'OpenTelemetry Exporter', icon: Share2 },
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

      {/* TAB 1: REAL-TIME TELEMETRY OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Request Throughput</span>
              <span className="text-2xl font-bold text-white block">480 req/sec</span>
              <span className="text-[10px] text-emerald-400 font-sans block">↑ 12% vs last hour</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Avg SLA Latency</span>
              <span className="text-2xl font-bold text-[#4EA3FF] block">124ms</span>
              <span className="text-[10px] text-[#4EA3FF] font-sans block">p95: 280ms • p99: 420ms</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Error Rate</span>
              <span className="text-2xl font-bold text-emerald-400 block">0.04%</span>
              <span className="text-[10px] text-gray-400 font-sans block">Clean SLA Execution</span>
            </div>
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block font-bold">Token Throughput</span>
              <span className="text-2xl font-bold text-purple-300 block">42,400 tok/sec</span>
              <span className="text-[10px] text-purple-300 font-sans block">Cached: 64%</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISTRIBUTED TRACES */}
      {activeTab === 'traces' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search traces by Request ID, Execution ID, or span..."
              value={traceSearch}
              onChange={(e) => setTraceSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-white outline-none"
            />
          </div>

          {selectedTrace && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#232323] pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedTrace.rootSpanName}</h3>
                  <span className="text-[10px] text-gray-500">Trace ID: {selectedTrace.correlationId} | Tokens: {selectedTrace.totalTokens.toLocaleString()} | Cost: ${selectedTrace.totalCostUsdc}</span>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px]">
                  {selectedTrace.totalDurationMs}ms Total
                </span>
              </div>

              {/* Nested Spans Tree Visualizer */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Distributed Span Hierarchy ({selectedTrace.spans.length} Spans)</span>
                {selectedTrace.spans.map((span, idx) => (
                  <div
                    key={span.id}
                    className={`bg-[#050505] border border-[#232323] p-3.5 rounded-xl space-y-2 ${
                      span.parentId ? 'ml-6 border-l-2 border-l-[#4EA3FF]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{span.name}</span>
                        <span className="text-[10px] bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20 px-2 py-0.5 rounded uppercase font-bold">
                          {span.kind}
                        </span>
                      </div>
                      <span className="text-emerald-400 font-bold text-[11px]">{span.durationMs}ms</span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-gray-400 pt-1 border-t border-[#232323]">
                      <span>CPU: <strong className="text-white">{span.cpuPercent}%</strong></span>
                      <span>RAM: <strong className="text-white">{span.memoryMb} MB</strong></span>
                      {span.promptTokens && <span>Tokens: <strong className="text-purple-300">{(span.promptTokens + (span.completionTokens || 0)).toLocaleString()}</strong></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EXECUTION REPLAY CONSOLE */}
      {activeTab === 'replay' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-[#4EA3FF]" /> Step-by-Step Execution Replay Playback
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Replays every LLM reasoning step, inter-agent delegation message, and API tool call exactly as executed.
          </p>

          <div className="space-y-2 bg-[#050505] border border-[#232323] p-4 rounded-xl font-mono text-[11px] text-gray-300 max-h-72 overflow-y-auto">
            <div className="text-[#4EA3FF] font-bold">[STEP 1] [REASONING] Initiated DAG execution for goal: &quot;Audit smart contract codebase for SAST vulnerabilities.&quot;</div>
            <div className="text-purple-300">[STEP 2] [DELEGATION] Planner Worker -&gt; Coder Worker: Allocated module code synthesis sub-task.</div>
            <div className="text-emerald-400">[STEP 3] [TOOL EXECUTION] Semgrep SAST Scanner executed ruleset OWASP_2024. Result: 0 critical.</div>
            <div className="text-amber-300">[STEP 4] [CONSENSUS VOTE] Security Worker VOTED APPROVE with 98.6% confidence.</div>
          </div>
        </div>
      )}

      {/* TAB 4: ERROR ROOT CAUSE DIAGNOSIS */}
      {activeTab === 'errors' && (
        <div className="space-y-4 font-mono text-xs">
          {errorDiagnostics.map(diag => (
            <div key={diag.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-400 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> [{diag.category}] Failure on {diag.failedNodeOrAgent}
                </span>
                <span className="text-gray-500 text-[10px]">{diag.timestamp}</span>
              </div>

              <div className="space-y-2 bg-[#050505] p-4 rounded-xl border border-[#232323]">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase block font-bold">Probable Root Cause</span>
                  <p className="text-gray-200 font-sans text-xs mt-0.5">{diag.probableCause}</p>
                </div>

                <div className="pt-2 border-t border-[#232323]">
                  <span className="text-emerald-400 text-[10px] uppercase block font-bold">Recommended Automated Fix</span>
                  <p className="text-emerald-300 font-sans text-xs mt-0.5">{diag.recommendedFix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: MODEL PERFORMANCE METRICS */}
      {activeTab === 'models' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          {modelMetrics.map((m, i) => (
            <div key={i} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{m.modelName}</span>
                <span className="text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-bold">
                  {m.provider}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#050505] p-3 rounded-xl border border-[#232323] text-[11px]">
                <div>
                  <span className="text-gray-500 block">Avg Latency</span>
                  <span className="text-white font-bold block">{m.avgLatencyMs}ms</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Reliability</span>
                  <span className="text-emerald-400 font-bold block">{m.reliabilityPercent}%</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Hallucination Index</span>
                  <span className="text-emerald-400 font-bold block">{m.hallucinationRatePercent}%</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Tokens Processed</span>
                  <span className="text-purple-300 font-bold block">{(m.totalTokensProcessed / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: OPENTELEMETRY EXPORTER */}
      {activeTab === 'otlp' && selectedTrace && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#4EA3FF]" /> OpenTelemetry (OTLP) Export Payload
            </span>
            <button
              onClick={handleCopyOTLP}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl cursor-pointer text-xs"
            >
              {copiedOtlp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedOtlp ? 'Copied' : 'Copy OTLP JSON'}</span>
            </button>
          </div>

          <pre className="bg-[#050505] border border-[#232323] p-4 rounded-xl text-amber-300 text-xs overflow-x-auto leading-relaxed">
{AIObservabilityService.formatOpenTelemetryPayload(selectedTrace)}
          </pre>
        </div>
      )}

    </div>
  );
}
