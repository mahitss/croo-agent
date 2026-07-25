'use client';

import AppLayout from '../../components/AppLayout';
import { Layers, ShieldCheck, Download, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../../components/Toast';

export default function PluginsPage() {
  const { toast } = useToast();

  const [plugins, setPlugins] = useState([
    { id: 'plug-1', name: 'PostgreSQL Connector', category: 'Database', version: 'v2.1.0', status: 'Enabled', author: 'Orbit Core', desc: 'Secure database connection pool with automatic SSL encryption.' },
    { id: 'plug-2', name: 'Slack Alerting Webhook', category: 'Notifications', version: 'v1.4.0', status: 'Enabled', author: 'Slack Integration Team', desc: 'Dispatches real-time swarm failure events to targeted Slack channels.' },
    { id: 'plug-3', name: 'Salesforce CRM Synchronizer', category: 'Sales', version: 'v1.0.2', status: 'Disabled', author: 'Outreach Lab', desc: 'Bi-directional contact record sync for scored leads.' },
    { id: 'plug-4', name: 'AWS S3 Asset Exporter', category: 'Storage', version: 'v3.0.1', status: 'Enabled', author: 'Orbit Core', desc: 'Streams generated swarm reports into private S3 buckets.' },
  ]);

  const togglePluginStatus = (id: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Enabled' ? 'Disabled' : 'Enabled';
        toast(`Plugin "${p.name}" set to ${nextStatus}.`, 'info');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 font-sans select-none animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-400" /> Platform Plugin Ecosystem
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Manage installed integrations, security scopes, and external system connector plugins.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plugins.map((plug) => (
            <div key={plug.id} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/10 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-purple-400">
                    {plug.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">{plug.version}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{plug.name}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{plug.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                <span className="text-[10px] text-gray-500 font-mono">Author: {plug.author}</span>
                <button
                  onClick={() => togglePluginStatus(plug.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    plug.status === 'Enabled'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {plug.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
