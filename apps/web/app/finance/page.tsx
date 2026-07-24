'use client';

import { useState } from 'react';
import { Layers, Wallet, TrendingUp, DollarSign, ArrowUpRight, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';

export default function FinancePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLaunchFinance = () => {
    toast('Finance Analytics & Risk Swarm deployed.', 'success');
    router.push('/workflow');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 select-none animate-fade-in">
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto">
          <Layers className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Finance & Portfolio Analytics Swarm
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Compute portfolio Sharpe ratios, audit USDC expense transactions, and generate real-time tax briefs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase">USDC Treasury Balance</span>
          <span className="text-3xl font-bold text-white font-mono">$150.00</span>
          <span className="text-[10px] text-emerald-400 font-mono">100% Reserve Backed</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase">Escrow Total Committed</span>
          <span className="text-3xl font-bold text-white font-mono">$12.40</span>
          <span className="text-[10px] text-gray-400 font-mono">Active Swarms: 4</span>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase">Sharpe Ratio</span>
          <span className="text-3xl font-bold text-emerald-400 font-mono">2.84</span>
          <span className="text-[10px] text-gray-400 font-mono">Max Drawdown: -4.2%</span>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white">Deploy Portfolio Risk Swarm</h3>
          <p className="text-xs text-[#9CA3AF]">Run automated risk modeling and variance simulations.</p>
        </div>
        <button
          onClick={handleLaunchFinance}
          className="bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow"
        >
          Launch Swarm
        </button>
      </div>
    </div>
  );
}
