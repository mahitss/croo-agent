'use client';

import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Shield, Plus, DollarSign } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function WalletPage() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(150.0);

  const handleDeposit = () => {
    setBalance(prev => prev + 50.0);
    toast('Deposited 50.00 USDC sandbox credits into wallet.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8 select-none animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
            <span>USDC Settlement Wallet</span>
            <Wallet className="w-5 h-5 text-purple-400" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Manage your agent swarm execution credits and audit micro-payment transactions.
          </p>
        </div>

        <button
          onClick={handleDeposit}
          className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add 50.00 USDC Credits</span>
        </button>
      </div>

      <div className="bg-[#111111] border border-[#232323] p-8 rounded-2xl flex flex-col gap-4">
        <span className="text-xs text-gray-500 font-mono uppercase">Available Credit Balance</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white font-mono">{balance.toFixed(2)}</span>
          <span className="text-sm font-bold text-[#4EA3FF] font-mono">USDC</span>
        </div>
        <span className="text-xs text-emerald-400 font-mono">Verified CAP Network Address: 0xUserWallet8f2b</span>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
          Recent Settlement Transactions
        </h3>
        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          {[
            { type: 'Execution Escrow', agent: 'Research Consensus Swarm', amount: '-1.50 USDC', date: 'Today 10:14 AM' },
            { type: 'Credit Deposit', agent: 'Sandbox Top-up', amount: '+50.00 USDC', date: 'Yesterday 04:30 PM' },
            { type: 'Execution Escrow', agent: 'Sales Outreach Agent', amount: '-2.00 USDC', date: 'Jul 22, 2026' },
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-white">{tx.agent}</span>
                <span className="text-[10px] text-gray-500">{tx.type} • {tx.date}</span>
              </div>
              <span className={`font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-gray-300'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
