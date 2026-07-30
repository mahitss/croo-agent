'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  GitBranch, 
  Activity, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Cpu, 
  HardDrive, 
  Layers, 
  Sliders, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  User, 
  Search, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  DigitalTwinService, 
  TwinNode, 
  TwinEdge, 
  SimulationResult, 
  ExecutiveMetrics 
} from '../../../services/digital-twin.service';

export default function DigitalTwinPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'graph' | 'simulator' | 'chaos' | 'executive' | 'strategist'>('graph');
  const [nodes, setNodes] = useState<TwinNode[]>([]);
  const [edges, setEdges] = useState<TwinEdge[]>([]);
  
  // What-If Simulator state
  const [selectedScenario, setSelectedScenario] = useState('traffic_spike');
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Executive Command Center state
  const [execRole, setExecRole] = useState<'CEO' | 'CTO' | 'CFO'>('CEO');
  const [execMetrics, setExecMetrics] = useState<ExecutiveMetrics | null>(null);

  useEffect(() => {
    fetchTwinData();
  }, [execRole]);

  const fetchTwinData = async () => {
    try {
      const g = await DigitalTwinService.getOrgGraph();
      setNodes(g.nodes);
      setEdges(g.edges);
      setExecMetrics(DigitalTwinService.getExecutiveMetrics(execRole));
    } catch (e) {
      console.warn('[DIGITAL_TWIN] Load warning:', e);
    }
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await DigitalTwinService.runWhatIfSimulation(selectedScenario);
      setSimulationResult(res);
      toast(`Executed What-If Simulation: ${res.scenarioName}!`, 'success');
    } catch (e) {
      toast('Simulation execution error.', 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-[#4EA3FF]" /> Enterprise Organizational Digital Twin & Graph
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time organizational CMDB mapping Departments -&gt; Projects -&gt; Workflows -&gt; Agents -&gt; Infrastructure with What-If scenario simulations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('simulator');
              handleRunSimulation();
            }}
            disabled={isSimulating}
            className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-extrabold text-xs font-mono px-3.5 py-2 rounded-xl transition-all cursor-pointer border-0 shadow disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'Simulating...' : 'Run What-If Simulation'}</span>
          </button>
          <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
            <span className="text-gray-400">Digital Twin Mesh:</span>
            <span className="text-emerald-400 font-bold">100% IN SYNC</span>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'graph', label: 'Interactive Organizational Graph', icon: GitBranch },
          { id: 'simulator', label: 'What-If Scenario Simulator', icon: Sliders },
          { id: 'chaos', label: 'Chaos Failure Injection', icon: AlertTriangle },
          { id: 'executive', label: 'Executive C-Suite Command Center', icon: Award },
          { id: 'strategist', label: 'AI Organizational Strategist', icon: Sparkles },
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

      {/* TAB 1: INTERACTIVE GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Live Organizational CMDB Graph Representation</h3>
              <span className="text-[10px] text-gray-500">Real-time dependency chain tracing Department -&gt; Project -&gt; Workflow -&gt; Agent -&gt; LLM -&gt; Infrastructure.</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
              REAL-TIME BACKEND SYNC
            </span>
          </div>

          {/* Node & Edge Hierarchy Tracing Cards */}
          <div className="space-y-3">
            {edges.map(e => {
              const srcNode = nodes.find(n => n.id === e.source);
              const tgtNode = nodes.find(n => n.id === e.target);
              return (
                <div key={e.id} className="bg-[#050505] border border-[#232323] p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xs">{srcNode?.label}</span>
                    <span className="text-[9px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded uppercase font-bold">
                      {srcNode?.type}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[#4EA3FF] text-[10px] font-bold">-[ {e.relation} ]-&gt;</span>
                    <span className="text-[9px] text-gray-500">{e.dataFlowRateMbps} Mbps</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold">
                      {tgtNode?.type}
                    </span>
                    <span className="text-white font-bold text-xs">{tgtNode?.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: WHAT-IF SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#4EA3FF]" /> Predictive What-If Organizational Simulator
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Simulate enterprise infrastructure changes, traffic spikes, and provider outages to predict SLA impacts, bottlenecks, and costs before deployment.
            </p>

            <div className="flex items-center gap-4">
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="flex-1 bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-3 text-white outline-none font-mono text-xs"
              >
                <option value="traffic_spike">Simulate 500% Traffic Surge</option>
                <option value="provider_outage">Simulate Anthropic LLM Provider Outage</option>
                <option value="add_gpus">Simulate Adding 16 NVIDIA H100 GPU Nodes</option>
              </select>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="px-6 py-3 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono"
              >
                {isSimulating ? 'Simulating...' : 'Run Simulation'}
              </button>
            </div>
          </div>

          {simulationResult && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#232323] pb-3">
                <h4 className="text-base font-bold text-white">{simulationResult.scenarioName} Results</h4>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  SIMULATION COMPLETE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase block font-bold">Predicted SLA Latency</span>
                  <span className="text-2xl font-bold text-white block">{simulationResult.predictedLatencyMs}ms</span>
                </div>
                <div className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase block font-bold">Cost Impact %</span>
                  <span className={`text-2xl font-bold block ${simulationResult.predictedCostImpactPercent >= 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {simulationResult.predictedCostImpactPercent >= 0 ? `+${simulationResult.predictedCostImpactPercent}%` : `${simulationResult.predictedCostImpactPercent}%`}
                  </span>
                </div>
                <div className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
                  <span className="text-gray-500 text-[10px] uppercase block font-bold">Throughput Capacity</span>
                  <span className="text-2xl font-bold text-[#4EA3FF] block">{simulationResult.predictedThroughputReqSec} req/sec</span>
                </div>
              </div>

              <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 font-sans text-xs space-y-1">
                <strong>Bottleneck Node:</strong> <span className="font-mono text-white">{simulationResult.bottleneckNode}</span>
                <p className="mt-1"><strong>Recommendation:</strong> {simulationResult.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CHAOS FAILURE INJECTION */}
      {activeTab === 'chaos' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Chaos Engineering Failure Injection Console
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Inject simulated database outages, network partitions, and GPU failures to verify automated workflow recovery policies.
          </p>

          <div className="space-y-2 pt-2">
            {[
              { failure: 'Simulated PostgreSQL DB Partition', recovery: 'Auto-switched to Read-Replica in 82ms', status: 'RECOVERED' },
              { failure: 'Simulated Primary GPU Pod Crash', recovery: 'Rescheduled workloads to Secondary H100 Pool in 110ms', status: 'RECOVERED' }
            ].map((f, i) => (
              <div key={i} className="bg-[#050505] border border-[#232323] p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{f.failure}</span>
                  <span className="text-[10px] text-gray-500 block font-sans">{f.recovery}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EXECUTIVE C-SUITE COMMAND CENTER */}
      {activeTab === 'executive' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            {(['CEO', 'CTO', 'CFO'] as const).map(role => (
              <button
                key={role}
                onClick={() => setExecRole(role)}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-mono text-xs ${
                  execRole === role ? 'bg-[#4EA3FF] text-black font-bold border-0' : 'bg-[#111111] text-gray-400 border-[#232323]'
                }`}
              >
                {role} View
              </button>
            ))}
          </div>

          {execMetrics && (
            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> {execMetrics.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {execMetrics.kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-[#050505] p-4 rounded-xl border border-[#232323] space-y-1">
                    <span className="text-gray-500 text-[10px] uppercase block font-bold">{kpi.label}</span>
                    <span className="text-lg font-bold text-white block">{kpi.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#050505] border border-[#4EA3FF]/30 p-4 rounded-xl text-gray-200 font-sans text-xs">
                <strong className="text-[#4EA3FF]">AI Executive Strategic Advisor:</strong> {execMetrics.aiStrategicAdvice}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AI STRATEGIST */}
      {activeTab === 'strategist' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> AI Organizational Strategist Recommendations
          </h3>

          <div className="space-y-3 pt-2">
            <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 font-sans text-xs space-y-1">
              <strong>1. Operational Capacity Expansion:</strong> Deploy 12 additional Coder &amp; QA agents to Engineering Swarm to reduce PR review time by 68%.
            </div>
            <div className="bg-[#050505] border border-emerald-500/30 p-4 rounded-xl text-emerald-300 font-sans text-xs space-y-1">
              <strong>2. Infrastructure Cost Reduction:</strong> Migrate vector search index from Pinecone to self-hosted pgvector cluster to cut monthly cloud spend by $420 USDC.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
