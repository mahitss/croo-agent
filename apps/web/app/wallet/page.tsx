'use client';

import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Shield, Plus, DollarSign } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function WalletPage() {
  const { toast } = useToast();
  const [balance, setBalance] = useState(150.0);
  const [escrowBalance, setEscrowBalance] = useState(12.50);
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('50.00');
  const [withdrawAddress, setWithdrawAddress] = useState('0x0000000000000000000000000000000000000000');

  const [transactions, setTransactions] = useState([
    { id: 'tx-1', type: 'Execution Escrow', agent: 'Research Consensus Swarm', amount: '-1.50 USDC', date: 'Today 10:14 AM', status: 'Completed' },
    { id: 'tx-2', type: 'Credit Deposit', agent: 'CAP Escrow Top-up', amount: '+50.00 USDC', date: 'Yesterday 04:30 PM', status: 'Completed' },
    { id: 'tx-3', type: 'Execution Escrow', agent: 'Sales Outreach Agent', amount: '-2.00 USDC', date: 'Jul 22, 2026', status: 'Completed' },
  ]);

  const handleConfirmDeposit = () => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) {
      toast('Please enter a valid deposit amount.', 'error');
      return;
    }
    setBalance(prev => prev + val);
    setTransactions(prev => [
      { id: `tx-${Date.now()}`, type: 'Credit Deposit', agent: 'CAP Escrow Deposit', amount: `+${val.toFixed(2)} USDC`, date: 'Just now', status: 'Completed' },
      ...prev
    ]);
    setIsDepositOpen(false);
    toast(`Successfully deposited ${val.toFixed(2)} USDC into wallet.`, 'success');
  };

  const handleConfirmWithdraw = () => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0 || val > balance) {
      toast('Invalid withdrawal amount or insufficient balance.', 'error');
      return;
    }
    setBalance(prev => prev - val);
    setTransactions(prev => [
      { id: `tx-${Date.now()}`, type: 'Withdrawal', agent: `To ${withdrawAddress.substring(0, 8)}...`, amount: `-${val.toFixed(2)} USDC`, date: 'Just now', status: 'Completed' },
      ...prev
    ]);
    setIsWithdrawOpen(false);
    toast(`Successfully withdrawn ${val.toFixed(2)} USDC.`, 'success');
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
            Manage your agent swarm execution credits, CAP wallet connection, and micro-payment escrow contracts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-gray-300 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw</span>
          </button>
          <button
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-0 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Deposit USDC</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-[#111111] border border-[#232323] p-8 rounded-2xl flex flex-col gap-4">
          <span className="text-xs text-gray-500 font-mono uppercase">Available Credit Balance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-mono">{balance.toFixed(2)}</span>
            <span className="text-sm font-bold text-[#4EA3FF] font-mono">USDC</span>
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono border-t border-[#232323] pt-4">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> CAP Mainnet: 0xUserWallet8f2b</span>
            <span className="text-gray-400">Connected</span>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-mono uppercase">Locked Escrow</span>
            <div className="text-2xl font-bold text-white font-mono">{escrowBalance.toFixed(2)} USDC</div>
          </div>

          <div className="space-y-2 border-t border-[#232323] pt-4">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>Auto Top-up</span>
              <button
                onClick={() => setAutoTopUp(!autoTopUp)}
                className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer border-0 ${autoTopUp ? 'bg-[#4EA3FF]' : 'bg-gray-700'}`}
              >
                <span className={`w-3.5 h-3.5 bg-black rounded-full absolute top-0.8 transition-transform ${autoTopUp ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <span className="text-[10px] text-gray-500 block">Auto deposit 50 USDC when balance falls below 10 USDC.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider font-mono">
          Settlement Transaction History
        </h3>
        <div className="flex flex-col bg-[#111111] border border-[#232323] rounded-2xl overflow-hidden text-xs">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border-b border-[#232323] last:border-b-0 hover:bg-white/[0.02]">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-white">{tx.agent}</span>
                <span className="text-[10px] text-gray-500">{tx.type} • {tx.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">{tx.status}</span>
                <span className={`font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-gray-300'}`}>
                  {tx.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-[#232323] pb-3">
              <h3 className="text-sm font-bold text-white">Deposit USDC Credits</h3>
              <button onClick={() => setIsDepositOpen(false)} className="text-gray-400 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <label className="text-gray-300 font-semibold">Deposit Amount (USDC)</label>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white font-mono outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsDepositOpen(false)} className="flex-1 py-2.5 bg-transparent border border-[#232323] text-gray-300 rounded-xl text-xs cursor-pointer">Cancel</button>
              <button onClick={handleConfirmDeposit} className="flex-1 py-2.5 bg-[#4EA3FF] text-black font-bold rounded-xl border-0 text-xs cursor-pointer">Confirm Deposit</button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-[#232323] pb-3">
              <h3 className="text-sm font-bold text-white">Withdraw USDC Credits</h3>
              <button onClick={() => setIsWithdrawOpen(false)} className="text-gray-400 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Destination Address</label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white font-mono outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Withdrawal Amount (USDC)</label>
                <input
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-3 text-white font-mono outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsWithdrawOpen(false)} className="flex-1 py-2.5 bg-transparent border border-[#232323] text-gray-300 rounded-xl text-xs cursor-pointer">Cancel</button>
              <button onClick={handleConfirmWithdraw} className="flex-1 py-2.5 bg-purple-500 text-white font-bold rounded-xl border-0 text-xs cursor-pointer">Confirm Withdrawal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
