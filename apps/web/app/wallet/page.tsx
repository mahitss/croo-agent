'use client';

import { useState, useEffect } from 'react';
import { useMode } from '../../providers/ModeProvider';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../components/Toast';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, History, ExternalLink, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function WalletPage() {
  const { isDemoMode, walletService, wallet: userWallet, refreshData, settleUserWallet } = useMode();
  const user = useAuthStore((state) => state.user);

  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [walletError, setWalletError] = useState<string | null>(null);

  const initializationState = useAuthStore((state) => state.initializationState);

  const loadWalletDetails = async () => {
    const authState = useAuthStore.getState();
    if (!isDemoMode && authState.initializationState !== 'AUTHENTICATED') {
      console.log('[WALLET_PAGE] Bypassing protected balance query for guest user.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setWalletError(null);
    try {
      await refreshData();
      if (!isDemoMode) {
        await walletService.getBalance();
      }
    } catch (err: any) {
      setWalletError(err.message || 'Unable to load wallet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWalletDetails();
  }, [isDemoMode, initializationState]);

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    if (!withdrawAmount) {
      setErrorMessage('');
      return;
    }
    const val = parseFloat(withdrawAmount);
    if (isNaN(val) || val <= 0) {
      setErrorMessage('Enter a valid positive amount');
    } else if (val > userWallet.balance) {
      setErrorMessage('Insufficient balance');
    } else {
      setErrorMessage('');
    }
  }, [withdrawAmount, userWallet.balance]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    setIsDepositing(true);
    try {
      const result = await walletService.deposit(amount);
      if (result && result.success) {
        toast(`Successfully deposited ${amount.toFixed(2)} USDC`, 'success');
        loadWalletDetails();
      } else {
        toast(result?.message || 'Payment deposit failed', 'error');
      }
    } catch (err: any) {
      toast(err.message || 'Deposit error occurred', 'error');
    } finally {
      setIsDepositing(false);
      setDepositAmount('');
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) return;
    if (amount > userWallet.balance) {
      setErrorMessage('Insufficient balance');
      return;
    }

    setIsWithdrawing(true);
    setErrorMessage('');
    try {
      const result = await walletService.withdraw(amount);
      if (result && result.success) {
        toast(`Successfully withdrew ${amount.toFixed(2)} USDC`, 'success');
        setWithdrawAmount('');
        loadWalletDetails();
      } else {
        toast(result?.message || 'Withdrawal failed', 'error');
      }
    } catch (err: any) {
      toast(err.message || 'Withdrawal error occurred', 'error');
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Mock flow steps for the WOW Feature
  const commerceFlowSteps = userWallet.history.length > 0
    ? userWallet.history.slice(0, 6).map((tx) => {
        let title = "Transaction Record";
        let status = "Completed";
        if (tx.type === 'deposit') {
          title = "User Wallet Balance Check";
          status = "Checked";
        } else if (tx.type === 'escrow_hold') {
          title = "SLA Escrow Reserve Lock";
          status = "Locked";
        } else if (tx.type === 'escrow_release') {
          title = "Agent SLA Payout Released";
          status = "Disbursed";
        } else if (tx.type === 'withdrawal') {
          title = "On-Chain Withdrawal Release";
          status = "Settled";
        }
        
        return {
          title,
          amount: `${tx.amount.toFixed(2)} USDC`,
          status,
          time: new Date(tx.timestamp).toLocaleTimeString()
        };
      })
    : [
        { title: "User Wallet Balance Check", amount: `${userWallet.balance.toFixed(2)} USDC`, status: "Checked", time: "Idle" },
        { title: "Escrow Reserve Ready", amount: "0.00 USDC", status: "Awaiting", time: "Idle" }
      ];

  if (walletError) {
    return (
      <div className="flex-1 bg-bg-dark flex items-center justify-center p-6 font-mono">
        <div className="glass-card max-w-md w-full border border-border-dark p-8 rounded-2xl text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400 animate-pulse">
            <Wallet className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">Unable to load wallet</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            {walletError}
          </p>
          <button
            onClick={loadWalletDetails}
            className="w-full bg-primary-neon text-black text-xs font-extrabold py-2.5 rounded-xl hover:brightness-110 transition-all font-mono"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalIncomingTransfers = userWallet.history
    .filter(tx => tx.type === 'deposit' || tx.type === 'escrow_release')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const lifetimeRevenue = totalIncomingTransfers > 0 ? totalIncomingTransfers : 0.00;

  const parsedWithdrawAmount = parseFloat(withdrawAmount) || 0;
  const isWithdrawDisabled = isWithdrawing || parsedWithdrawAmount <= 0 || parsedWithdrawAmount > userWallet.balance || userWallet.balance <= 0;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* 4 Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Available Balance', val: `${userWallet.balance.toFixed(2)} USDC`, color: 'text-primary-neon' },
          { label: 'Reserved (Escrow Lock)', val: `${userWallet.escrowBalance.toFixed(2)} USDC`, color: 'text-yellow-400' },
          { label: 'Pending Settlement', val: `${(userWallet.pendingBalance || 0).toFixed(2)} USDC`, color: 'text-gray-500' },
          { label: 'Lifetime Revenue Earned', val: `${lifetimeRevenue.toFixed(2)} USDC`, color: 'text-accent-blue' }
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
              {isDemoMode ? 'Credit your decentralized sandbox wallet with mock USDC.' : 'Credit your live wallet with real USDC using Razorpay Checkout.'}
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
                disabled={isDepositing}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none disabled:opacity-50"
                required
              />
              <button 
                type="submit"
                disabled={isDepositing}
                className="bg-primary-neon text-black font-extrabold text-xs px-5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center justify-center min-w-[85px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDepositing ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Deposit'
                )}
              </button>
            </div>
          </form>
          <div className="text-[10px] text-gray-500 italic">{isDemoMode ? 'No network gas fees are charged on sandbox networks.' : 'Live transaction processing. Funds are credited instantly.'}</div>
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
                min="0.01"
                placeholder="Amount (USDC)"
                value={withdrawAmount}
                disabled={isWithdrawing}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="flex-1 bg-black/40 border border-border-dark focus:border-secondary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none disabled:opacity-50"
                required
              />
              <button 
                type="submit"
                disabled={isWithdrawDisabled}
                className="bg-secondary-neon text-black font-extrabold text-xs px-5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center justify-center min-w-[85px] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary-neon/20 disabled:text-white/40"
              >
                {isWithdrawing ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Withdraw'
                )}
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-border-dark/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <History className="w-4 h-4 text-accent-blue" />
                Decentralized Transaction Ledger (USDC)
              </h3>
              {!isDemoMode && (
                <button
                  onClick={async () => {
                    try {
                      const res = await settleUserWallet();
                      if (res && res.success) {
                        toast(res.message || 'Settlement run processed successfully', 'success');
                        loadWalletDetails();
                      } else {
                        toast(res?.message || 'Settlement failed', 'error');
                      }
                    } catch (e: any) {
                      toast(e.message || 'Error running settlement', 'error');
                    }
                  }}
                  className="bg-primary-neon/20 border border-primary-neon text-primary-neon hover:bg-primary-neon/30 text-[9px] font-bold uppercase px-3 py-1.5 rounded-md tracking-wider transition-all duration-300 self-start sm:self-auto"
                >
                  Settle Pending Withdrawals
                </button>
              )}
            </div>

            {userWallet.history.length === 0 ? (
              <div className="text-center py-12 text-gray-500 italic text-xs">
                No transactions found for this address.
              </div>
            ) : (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-white/2 text-[10px] text-gray-500 font-mono uppercase border-b border-border-dark">
                    <tr>
                      <th className="py-2.5 px-3">Transaction ID</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Razorpay Payment ID</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-dark">
                    {userWallet.history.map((tx) => {
                      const isIncoming = tx.receiverAddress === userWallet.address || tx.type === 'deposit';
                      const isRelease = tx.type === 'escrow_release';
                      
                      let typeLabel: string = tx.type;
                      let typeColor = 'text-gray-400';
                      if (tx.type === 'escrow_hold') { typeLabel = 'Escrow Lock'; typeColor = 'text-yellow-400'; }
                      if (tx.type === 'escrow_release') { typeLabel = 'Agent payout'; typeColor = 'text-primary-neon'; }
                      if (tx.type === 'deposit') { typeLabel = 'Deposit'; typeColor = 'text-accent-blue'; }
                      if (tx.type === 'withdrawal') { typeLabel = 'Withdrawal'; typeColor = 'text-secondary-neon'; }

                      // Parse payment method and razorpay payment ID from reference field
                      let paymentMethod = tx.paymentMethod || 'Mock Credits';
                      let razorpayPaymentId = 'N/A';
                      
                      if (tx.reference) {
                        if (tx.reference.includes('Method:')) {
                          const parts = tx.reference.split('|');
                          for (const part of parts) {
                            if (part.includes('Method:')) {
                              paymentMethod = part.replace('Method:', '').trim();
                            }
                            if (part.includes('ID:')) {
                              razorpayPaymentId = part.replace('ID:', '').trim();
                            }
                          }
                        } else {
                          paymentMethod = tx.reference;
                          if (tx.reference.includes('ID:')) {
                            razorpayPaymentId = tx.reference.split('ID:')[1]?.trim();
                          }
                        }
                      }

                      return (
                        <tr key={tx.id} className="hover:bg-white/1 transition-colors">
                          <td className="py-3 px-3 font-mono text-[11px] text-gray-400">
                            <span className="text-white font-bold" title={tx.id}>
                              {tx.id.substring(0, 8)}...
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-gray-400">
                            {new Date(tx.timestamp || tx.createdAt || Date.now()).toLocaleDateString()} {new Date(tx.timestamp || tx.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <span className={`text-[10px] font-bold ${typeColor}`}>
                              {typeLabel}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-gray-400">
                            {paymentMethod}
                          </td>
                          <td className="py-3 px-3 font-mono text-[10px] text-gray-500">
                            {razorpayPaymentId}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-white">
                            {isIncoming || isRelease ? '+' : '-'}{Number(tx.amount).toFixed(2)} USDC
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="bg-primary-neon/10 border border-primary-neon/20 text-primary-neon text-[9px] font-bold font-mono px-2 py-0.5 rounded">
                              {tx.status?.toUpperCase() || 'SUCCESSFUL'}
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
