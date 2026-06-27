'use client';

import { useState } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, History, ExternalLink, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function WalletPage() {
  const userWallet = useNexusStore((state) => state.userWallet);
  const depositUserWallet = useNexusStore((state) => state.depositUserWallet);
  const withdrawUserWallet = useNexusStore((state) => state.withdrawUserWallet);

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    depositUserWallet(amount);
    setDepositAmount('');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) return;
    if (userWallet.balance < amount) {
      setErrorMessage('Insufficient available balance.');
      return;
    }
    withdrawUserWallet(amount);
    setWithdrawAmount('');
    setErrorMessage('');
  };

  // Mock flow steps for the WOW Feature
  const commerceFlowSteps = [
    { title: "User Wallet Balance Check", amount: "84.20 USDC", status: "Checked", time: "10:20:01" },
    { title: "SLA Escrow Reserve Lock", amount: "1.42 USDC", status: "Locked", time: "10:20:05" },
    { title: "Research Agent Execution Release", amount: "0.80 USDC", status: "Disbursed", time: "10:20:30" },
    { title: "Verify Agent SLA Payout", amount: "0.40 USDC", status: "Disbursed", time: "10:21:10" },
    { title: "Platform Handling Escrow Clearance", amount: "0.22 USDC", status: "Settled", time: "10:21:40" },
    { title: "CROO Ledger Receipt Generated", amount: "Tx ID: 0x3f4a...", status: "Signed", time: "10:21:45" }
  ];

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* 4 Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Available Balance', val: `${userWallet.balance.toFixed(2)} USDC`, color: 'text-primary-neon' },
          { label: 'Reserved (Escrow Lock)', val: `${userWallet.escrowBalance.toFixed(2)} USDC`, color: 'text-yellow-400' },
          { label: 'Pending Settlement', val: '0.00 USDC', color: 'text-gray-500' },
          { label: 'Lifetime Revenue Earned', val: '1,582.42 USDC', color: 'text-accent-blue' }
        ].map((bal, idx) => (
          <div key={idx} className="glass-card p-5 rounded-xl border border-border-dark flex flex-col justify-between">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">{bal.label}</span>
            <h2 className={`text-xl font-extrabold mt-2 font-mono ${bal.color}`}>{bal.val}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wallet Address summary */}
        <div className="lg:col-span-1 bg-gradient-to-tr from-card-dark to-black border border-border-dark p-6 rounded-2xl flex flex-col justify-between h-[240px] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-neon/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-neon/10 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">CROO CAP WALLET</span>
              <h4 className="text-xs text-gray-400 font-mono mt-0.5">{userWallet.address}</h4>
            </div>
            <Wallet className="w-6 h-6 text-primary-neon" />
          </div>

          <div className="my-4">
            <span className="text-xs text-gray-500 font-medium">Spendable Balance</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {userWallet.balance.toFixed(2)} <span className="text-sm font-mono text-gray-400 font-normal">USDC</span>
            </h1>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border-dark text-xs text-gray-500 font-mono">
            <span>Escrow Locked</span>
            <span className="text-secondary-neon font-bold">{userWallet.escrowBalance.toFixed(2)} USDC</span>
          </div>
        </div>

        {/* Deposit Panel */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-border-dark flex flex-col justify-between h-[240px]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <ArrowDownLeft className="w-4 h-4 text-primary-neon" />
              Deposit Funds
            </h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-normal">
              Credit your decentralized sandbox wallet with mock USDC.
            </p>
          </div>

          <form onSubmit={handleDeposit} className="flex flex-col gap-3 mt-4">
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                min="1"
                placeholder="Amount (USDC)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-primary-neon text-black font-extrabold text-xs px-5 rounded-xl hover:brightness-110 transition-all font-mono"
              >
                Deposit
              </button>
            </div>
          </form>
          <div className="text-[10px] text-gray-500 italic">No network gas fees are charged on sandbox networks.</div>
        </div>

        {/* Withdraw Panel */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-border-dark flex flex-col justify-between h-[240px]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <ArrowUpRight className="w-4 h-4 text-secondary-neon" />
              Withdraw Funds
            </h3>
            <p className="text-[11px] text-gray-400 mt-1 leading-normal">
              Transfer USDC assets back to your global Web3 address.
            </p>
          </div>

          <form onSubmit={handleWithdraw} className="flex flex-col gap-3 mt-4">
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                min="1"
                placeholder="Amount (USDC)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="flex-1 bg-black/40 border border-border-dark focus:border-secondary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-secondary-neon text-white font-extrabold text-xs px-5 rounded-xl hover:brightness-110 transition-all font-mono"
              >
                Withdraw
              </button>
            </div>
            {errorMessage && <span className="text-[10px] text-secondary-neon font-mono">{errorMessage}</span>}
          </form>
          <div className="text-[10px] text-gray-500 italic">Subject to escrow settlement periods.</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ledger History List */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-border-dark flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider mb-4">
              <History className="w-4 h-4 text-accent-blue" />
              Decentralized Transaction Ledger (USDC)
            </h3>

            {userWallet.history.length === 0 ? (
              <div className="text-center py-12 text-gray-500 italic text-xs">
                No transactions found for this address.
              </div>
            ) : (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-white/2 text-[10px] text-gray-500 font-mono uppercase border-b border-border-dark">
                    <tr>
                      <th className="py-2.5 px-3">Tx Hash</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Flow</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-dark">
                    {userWallet.history.map((tx) => {
                      const isIncoming = tx.receiverAddress === userWallet.address;
                      const isRelease = tx.type === 'escrow_release';
                      
                      let typeLabel: string = tx.type;
                      let typeColor = 'text-gray-400';
                      if (tx.type === 'escrow_hold') { typeLabel = 'Escrow Lock'; typeColor = 'text-yellow-400'; }
                      if (tx.type === 'escrow_release') { typeLabel = 'Agent payout'; typeColor = 'text-primary-neon'; }
                      if (tx.type === 'deposit') { typeLabel = 'Bank Deposit'; typeColor = 'text-accent-blue'; }
                      if (tx.type === 'withdrawal') { typeLabel = 'Withdrawal'; typeColor = 'text-secondary-neon'; }

                      return (
                        <tr key={tx.id} className="hover:bg-white/1 transition-colors">
                          <td className="py-3 px-3 font-mono text-[11px] text-gray-400 flex items-center gap-1.5">
                            <span className="text-white font-bold">{tx.txHash.substr(0, 14)}...</span>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-600 hover:text-white cursor-pointer" />
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <span className={`text-[10px] font-bold ${typeColor}`}>
                              {typeLabel}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-gray-500">
                            {tx.senderAddress.substr(0, 6)}... → {tx.receiverAddress.substr(0, 6)}...
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-white">
                            {isIncoming || isRelease ? '+' : '-'}{tx.amount.toFixed(2)} USDC
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="bg-primary-neon/10 border border-primary-neon/20 text-primary-neon text-[9px] font-bold font-mono px-2 py-0.5 rounded">
                              SUCCESSFUL
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* WOW Feature: AI Commerce Flow Visualization */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
            AI Commerce Flow Tracker
          </h3>
          <div className="flex-grow flex flex-col gap-4">
            {commerceFlowSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 text-xs font-mono items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-neon"></div>
                  {idx < commerceFlowSteps.length - 1 && <div className="w-0.5 h-8 bg-border-dark"></div>}
                </div>
                <div className="flex flex-col -mt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white leading-none">{step.title}</span>
                    <span className="text-[9px] bg-white/5 border border-border-dark text-gray-400 px-1 py-0.5 rounded leading-none uppercase">
                      {step.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>{step.time}</span>
                    <span className="text-secondary-neon font-bold">{step.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
