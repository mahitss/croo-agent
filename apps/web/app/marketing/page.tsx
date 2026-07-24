'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Share2, Target, Type } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function MarketingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLaunchMarketing = () => {
    toast('Marketing Copy Swarm initialized.', 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Marketing Scribe Swarms
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Generate multi-channel ad copy, technical blog variants, and social engagement posts optimized for high conversion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { title: 'Ad Copy Generator', desc: 'Creates 10 A/B testing headline variations with hook optimization.', icon: Target },
          { title: 'Technical Scribe', desc: 'Transforms product release logs into clear developer blog posts.', icon: Type },
          { title: 'Social Distribution', desc: 'Formats posts for Twitter/X threads, LinkedIn, and Discord.', icon: Share2 }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-3">
              <Icon className="w-5 h-5 text-[#4EA3FF]" />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white">Deploy Content Generation Swarm</h3>
          <p className="text-xs text-[#9CA3AF]">Generate full marketing campaign assets in parallel.</p>
        </div>
        <button
          onClick={handleLaunchMarketing}
          className="bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow"
        >
          Launch Swarm
        </button>
      </div>
    </div>
  );
}
