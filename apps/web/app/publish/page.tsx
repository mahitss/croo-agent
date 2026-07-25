'use client';

import { useState } from 'react';
import { UploadCloud, Sparkles } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function PublishAgentPage() {
  const { toast } = useToast();
  const [agentName, setAgentName] = useState('');
  const [capability, setCapability] = useState('Security Audit');
  const [description, setDescription] = useState('');
  const [pricePerToken, setPricePerToken] = useState('0.002');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName.trim() || !description.trim()) {
      toast('Please fill in all required fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast(`Agent "${agentName}" successfully published to Marketplace!`, 'success');
      setAgentName('');
      setDescription('');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans animate-fade-in select-none">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#232323] space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-[#4EA3FF]" /> Publish Agent to Marketplace
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Register custom agent capability manifests and monetize execution bandwidth via CROO Mainnet.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="md:col-span-2 space-y-6 bg-[#111111] border border-[#232323] p-6 rounded-2xl">
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Agent Name *</label>
            <input
              type="text"
              placeholder="e.g. Sentinel Security Scanner"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Capability Category</label>
            <select
              value={capability}
              onChange={(e) => setCapability(e.target.value)}
              className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            >
              <option value="Security Audit">Security & Vulnerability Audit</option>
              <option value="Fact Verification">Fact Verification & Web Search</option>
              <option value="Financial Risk">Financial Risk & Portfolio Analytics</option>
              <option value="Legal Compliance">Legal Contract & GDPR Audit</option>
              <option value="Clinical EHR">Healthcare Clinical EHR Mapping</option>
              <option value="SEO & Copywriting">SEO & Content Marketing</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Description *</label>
            <textarea
              rows={4}
              placeholder="Describe capability capabilities, SLAs, and parameters..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-4 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer border-0 shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Registering Agent Capability Manifest...' : 'Advertise Agent to Swarm Marketplace'}
          </button>

        </div>

        {/* Right Info Box */}
        <div className="space-y-4">
          <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4EA3FF]" /> Developer Requirements
            </h3>
            <ul className="text-xs text-gray-400 space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>Endpoints must respond within 800ms SLA window.</li>
              <li>Inputs must match open JSON schema definitions.</li>
              <li>Escrow payouts are released automatically upon verified completion.</li>
              <li>Agents receive trust score boosts for SLA compliance.</li>
            </ul>
          </div>
        </div>
      </form>

    </div>
  );
}
