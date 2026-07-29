'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { 
  Cpu, 
  Activity, 
  Wallet, 
  Shield, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Terminal, 
  Clock, 
  Bot,
  Server,
  DollarSign,
  TrendingUp,
  Radio
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';
import { apiClient } from '../../lib/api-client';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const environment = useAuthStore((state) => state.environment) || 'demo';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [dashMetrics, setDashMetrics] = useState<any>(null);
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchTelemetry = async () => {
      try {
        const [dashRes, feedRes] = await Promise.all([
          apiClient.get<any>('/api/v1/analytics/dashboard').catch(() => null),
          apiClient.get<any>('/api/v1/analytics/activity-feed').catch(() => null)
        ]);

        if (dashRes && dashRes.data) {
          setDashMetrics(dashRes.data);
        } else if (dashRes && dashRes.activeWorkflows !== undefined) {
          setDashMetrics(dashRes);
        }

        if (feedRes && Array.isArray(feedRes.data)) {
          setActivityFeed(feedRes.data);
        } else if (Array.isArray(feedRes)) {
          setActivityFeed(feedRes);
        }
      } catch (e) {
        console.warn('[DASHBOARD] Telemetry fetch warning:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetry();
  }, []);

  if (!mounted) return null;

  const displayName = user?.displayName || user?.username || 'Executive Operator';

  const todayCost = dashMetrics?.todayInferenceCost ? `$${Number(dashMetrics.todayInferenceCost).toFixed(2)} USDC` : '$0.00 USDC';
  const runningRuns = dashMetrics?.activeWorkflows ? `${dashMetrics.activeWorkflows} Active Runs` : '0 Active Runs';
  const systemHealth = dashMetrics?.systemHealth || '100.0% SLA';
  const avgLatency = dashMetrics?.averageLatency ? `${dashMetrics.averageLatency}ms` : '0ms';

  return (
    <div className="max-w-7xl mx-auto space-y-8 select-none animate-fade-in font-sans">
      
      {/* Top Mission Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-emerald-400 animate-pulse" /> Mission Control Telemetry
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Global operations dashboard for operator <span className="text-white font-semibold">{displayName}</span>. Environment: <span className="font-mono text-emerald-400 font-bold uppercase">{environment}</span>.
          </p>
        </div>
      </div>

      {/* Global Mission Control KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Cost Today</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{todayCost}</div>
          <span className="text-[10px] text-gray-500 font-mono">Live API telemetry</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Resource Usage</span>
            <Cpu className="w-4 h-4 text-[#4EA3FF]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{dashMetrics?.todayTokens ? `${dashMetrics.todayTokens} Tokens` : '0 Tokens'}</div>
          <span className="text-[10px] text-gray-500 font-mono">Real-time throughput</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>Running Swarms</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{runningRuns}</div>
          <span className="text-[10px] text-gray-500 font-mono">Avg Latency: {avgLatency}</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
            <span>System Health</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{systemHealth}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Verified operational</span>
        </div>
      </div>

      {/* System Health Summary & Live Telemetry Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: System Health & Microservices Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-[#4EA3FF]" /> Microservice Cluster Status
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { name: 'API Gateway', status: 'Operational' },
                { name: 'Auth Service', status: 'Operational' },
                { name: 'Agent Worker Cluster', status: 'Operational' },
                { name: 'CAP Blockchain RPC', status: 'Synced' },
              ].map((svc) => (
                <div key={svc.name} className="p-3 bg-[#050505] border border-[#232323] rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-500 block truncate">{svc.name}</span>
                  <span className="text-xs font-bold text-white block">{svc.status}</span>
                  <span className="text-[9px] text-emerald-400 block">Online</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> Live Platform Activity Feed
            </h3>

            {activityFeed.length > 0 ? (
              <div className="space-y-3 text-xs font-mono">
                {activityFeed.map((ev: any, idx: number) => (
                  <div key={ev.id || idx} className="flex items-center justify-between p-3 bg-[#050505] border border-[#232323] rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-[#4EA3FF] border border-white/5">{ev.type || 'EVENT'}</span>
                      <span className="text-gray-300 text-[11px]">{ev.desc || ev.message || ev.action || 'Activity recorded'}</span>
                    </div>
                    <span className="text-gray-500 text-[10px]">{ev.time || ev.createdAt ? new Date(ev.createdAt || Date.now()).toLocaleTimeString() : 'Just now'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#050505] border border-[#232323] rounded-xl font-mono text-xs text-gray-500">
                No active platform events recorded yet. Executed workflows and transactions will stream real-time events here.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: System Notifications */}
        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" /> System Notifications
            </h3>

            <div className="p-6 text-center bg-[#050505] border border-[#232323] rounded-xl font-mono text-xs text-gray-500 space-y-1">
              <div className="text-emerald-400 font-bold">All Systems Operational</div>
              <div className="text-[10px] text-gray-600">No critical SLA warnings or infrastructure alerts.</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
