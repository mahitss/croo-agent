import { IWalletService } from '../types';
import { WalletState, Transaction } from '@nexus-ai/types';
import { apiClient } from '../../lib/api-client';

export const liveWalletService: IWalletService = {
  async getBalance(): Promise<WalletState> {
    try {
      const walletRes = await apiClient.get<any>('/api/v1/wallet');
      const balanceRes = await apiClient.get<any>('/api/v1/wallet/balance');
      
      if (!walletRes?.success || !walletRes.data) {
        throw new Error('Unable to load wallet.');
      }

      const balanceData = balanceRes?.success && balanceRes.data ? balanceRes.data : { available: 0.0, reserved: 0.0 };

      return {
        address: walletRes.data.address,
        balance: Number(balanceData.available || 0),
        escrowBalance: Number(balanceData.reserved || 0),
        history: []
      };
    } catch (err) {
      console.error('[LIVE_WALLET_SERVICE] Balance fetch error:', err);
      throw new Error('Unable to load wallet.');
    }
  },

  async getTransactions(): Promise<Transaction[]> {
    try {
      const walletRes = await apiClient.get<any>('/api/v1/wallet');
      const txsRes = await apiClient.get<any>('/api/v1/wallet/transactions');

      if (!walletRes?.success || !walletRes.data) {
        throw new Error('Unable to load transactions.');
      }

      const txsList = txsRes?.success && Array.isArray(txsRes.data) ? txsRes.data.map((tx: any) => ({
        id: tx.id,
        senderAddress: tx.senderAddress || walletRes.data.address,
        receiverAddress: tx.receiverAddress || tx.reference || 'EXTERNAL',
        amount: Number(tx.amount || 0),
        type: tx.type === 'deposit' ? 'deposit' : tx.type === 'withdraw' ? 'withdrawal' : tx.type === 'escrow_hold' ? 'escrow_hold' : 'escrow_release',
        timestamp: tx.createdAt || new Date().toISOString(),
        status: tx.status === 'completed' ? 'completed' : 'pending',
        txHash: tx.txHash || '0x' + Math.random().toString(16).substring(2, 42)
      })) : [];

      return txsList;
    } catch (err) {
      console.error('[LIVE_WALLET_SERVICE] Transactions fetch error:', err);
      throw new Error('Unable to load transactions.');
    }
  },

  async deposit(amount: number): Promise<{ success: boolean; message?: string }> {
    // Deposit uses Razorpay script loader in components or triggers deposit directly.
    // Let's implement direct API trigger or return standard structure
    try {
      const res = await apiClient.post<any>('/api/v1/wallet/deposit', { amount });
      return { success: res.success, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Deposit failed' };
    }
  },

  async withdraw(amount: number): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await apiClient.post<any>('/api/v1/wallet/withdraw', { amount, recipientAddress: 'EXTERNAL_BANK' });
      return { success: res.success, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Withdrawal failed' };
    }
  },

  async transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await apiClient.post<any>('/api/v1/wallet/transfer', { amount, recipientAddress });
      return { success: res.success, message: res.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Transfer failed' };
    }
  }
};
