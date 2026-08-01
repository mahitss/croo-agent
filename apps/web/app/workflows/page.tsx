'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, Plus, Play, Sparkles, Clock, CheckCircle2, ArrowRight, Layers, Trash2 } from 'lucide-react';
import { useToast } from '../../components/Toast';
import { apiClient } from '../../lib/api-client';

export default function WorkflowsListPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const res = await apiClient.get<any>('/api/v1/workflows');
        if (res && Array.isArray(res.data)) {
          setWorkflows(res.data);
        } else if (Array.isArray(res)) {
          setWorkflows(res);
        }
      } catch (e) {
        console.warn('[WORKFLOWS] Failed to fetch workflows:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 select-none animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>Workflow Builder & Swarms</span>
            <Terminal className="w-5 h-5 text-[#4EA3FF]" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Construct and manage visual Directed Acyclic Graph (DAG) structures for autonomous agent swarms.
          </p>
        </div>

        <button
          onClick={() => router.push('/workflow')}
          className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Construct New DAG</span>
        </button>
      </div>

      {/* Grid of Workflows */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl animate-pulse space-y-4">
              <div className="h-4 bg-white/10 rounded w-1/4"></div>
              <div className="h-6 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : workflows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-6 transition-all group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border bg-[#4EA3FF]/10 border-[#4EA3FF]/20 text-[#4EA3FF]">
                    {(wf.status || 'ACTIVE').toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{wf.budget || '1.00 USDC'}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                  {wf.name || wf.title || 'Untitled Workflow'}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#4EA3FF]" />
                    <span>{wf.nodes?.length || wf.nodeCount || 1} Agent Nodes</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{wf.updatedAt ? new Date(wf.updatedAt).toLocaleDateString() : 'Recently updated'}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                <Link
                  href={`/workflow?workflowId=${wf.id}`}
                  className="flex items-center gap-1.5 text-xs text-[#4EA3FF] font-semibold hover:underline"
                >
                  <span>Open Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#111111] border border-[#232323] rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">No Workflows Constructed</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You haven&apos;t created any agent DAG workflows yet. Click &quot;Construct New DAG&quot; above to get started.
            </p>
          </div>
          <button
            onClick={() => router.push('/workflow')}
            className="px-4 py-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold rounded-xl cursor-pointer"
          >
            Create Your First Workflow
          </button>
        </div>
      )}

    </div>
  );
}
