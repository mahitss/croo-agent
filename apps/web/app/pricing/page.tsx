'use client';

import { useRouter } from 'next/navigation';
import { Shield, Sparkles, Check, Cpu } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function PricingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSelectTier = (tierName: string) => {
    toast(`Initiating secure checkout for ${tierName} plan...`, 'info');
    router.push('/workspaces');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Transparent Runtime Pricing
        </h1>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">
          Pay only for active worker allocations, compute duration, and SLA verification channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 max-w-3xl mx-auto w-full">
        {/* Tier 1: Free */}
        <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex flex-col justify-between gap-6 hover:border-white/10 transition-colors">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Developer Sandbox</span>
              <h3 className="text-xl font-bold text-white mt-1">Orbit Free</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">$0</span>
              <span className="text-xs text-gray-500 font-mono">USD/mo</span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Perfect for exploring workflow builders, running demo simulations, and local execution testing.
            </p>
            <div className="border-t border-[#232323] pt-4 flex flex-col gap-3">
              {[
                '3 active concurrent workspace swarms',
                'Simulated sandbox wallet allocations',
                'Standard model options (Gemini Flash, Llama-3)',
                'Community documentation support'
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => handleSelectTier('Free')}
            className="w-full bg-transparent hover:bg-white/5 border border-[#232323] hover:border-white/10 text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer transition-colors"
          >
            Launch Sandbox
          </button>
        </div>

        {/* Tier 2: Pro */}
        <div className="bg-[#111111] border border-[#4EA3FF]/30 p-8 rounded-2xl flex flex-col justify-between gap-6 relative shadow-lg">
          <span className="absolute -top-3 right-6 bg-[#4EA3FF]/10 border border-[#4EA3FF]/30 text-[#4EA3FF] text-[9px] font-mono font-bold px-2 py-0.5 rounded-full select-none">
            Popular
          </span>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs text-[#4EA3FF] font-mono uppercase tracking-wider">Production Swarms</span>
              <h3 className="text-xl font-bold text-white mt-1">Orbit Pro</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">$20</span>
              <span className="text-xs text-[#9CA3AF] font-mono">USD/mo</span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Engineered for enterprise task automation, custom SLA parameters, and live production APIs.
            </p>
            <div className="border-t border-[#232323] pt-4 flex flex-col gap-3">
              {[
                'Unlimited live execution swarms',
                'Live database queries & escrow balances',
                'Low-latency agent matcher bidding',
                'Custom SLA penalty rules & escrow validation',
                'Production developer credentials & APIs'
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-[#4EA3FF] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => handleSelectTier('Pro')}
            className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-2.5 rounded-xl cursor-pointer border-0 shadow-sm"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
