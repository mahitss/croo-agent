'use client';

import AppLayout from '../../components/AppLayout';
import { Cpu, ShieldCheck, Activity, DollarSign, Clock, Zap, Server } from 'lucide-react';
import { useState } from 'react';

export default function ModelsPage() {
  const [selectedProvider, setSelectedProvider] = useState('All');

  const providers = ['All', 'OpenAI', 'Anthropic', 'Google Gemini', 'Groq', 'DeepSeek', 'OpenRouter', 'Self-Hosted'];

  const models = [
    { name: 'gpt-4o-mini', provider: 'OpenAI', health: '99.98%', latency: '210ms', rpm: '10,000', tpm: '2,000,000', inputCost: '$0.00015 / 1k', status: 'Operational' },
    { name: 'claude-3-5-sonnet', provider: 'Anthropic', health: '99.95%', latency: '340ms', rpm: '5,000', tpm: '800,000', inputCost: '$0.00300 / 1k', status: 'Operational' },
    { name: 'gemini-1.5-pro', provider: 'Google Gemini', health: '99.99%', latency: '290ms', rpm: '12,000', tpm: '4,000,000', inputCost: '$0.00125 / 1k', status: 'Operational' },
    { name: 'llama-3.3-70b-versatile', provider: 'Groq', health: '100.0%', latency: '85ms', rpm: '30,000', tpm: '5,000,000', inputCost: '$0.00050 / 1k', status: 'Operational' },
    { name: 'deepseek-r1-distill', provider: 'DeepSeek', health: '99.90%', latency: '190ms', rpm: '8,000', tpm: '1,500,000', inputCost: '$0.00020 / 1k', status: 'Operational' },
    { name: 'vllm-mistral-7b-v0.3', provider: 'Self-Hosted', health: '100.0%', latency: '65ms', rpm: '50,000', tpm: '10,000,000', inputCost: '$0.00000 (Internal)', status: 'Operational' },
  ];

  const filtered = models.filter(m => selectedProvider === 'All' || m.provider === selectedProvider);

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans select-none animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#4EA3FF]" /> Model Provider Operations
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Live status, throughput limits (RPM/TPM), latency metrics, and pricing for LLM routing providers.
          </p>
        </div>
      </div>

      {/* Provider Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#232323]">
        {providers.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProvider(p)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
              selectedProvider === p
                ? 'bg-[#4EA3FF] text-black border-[#4EA3FF]'
                : 'bg-[#111111] text-gray-400 border-[#232323] hover:border-white/10 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m) => (
          <div key={m.name} className="bg-[#111111] border border-[#232323] p-5 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/10 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-[#4EA3FF]">
                  {m.provider}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {m.status}
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white font-mono">{m.name}</h3>
                <span className="text-[10px] text-gray-500 font-mono">Rate Limit: {m.rpm} RPM</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px] font-mono">
              <div><span className="text-gray-500">Latency:</span> <span className="text-white font-bold">{m.latency}</span></div>
              <div><span className="text-gray-500">Token Cost:</span> <span className="text-emerald-400 font-bold">{m.inputCost}</span></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
