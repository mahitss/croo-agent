import { WalletState, Transaction } from '@nexus-ai/types';
import { WalletRepository } from '../repositories';
import { apiClient } from '../../lib/api-client';

export class LiveWalletRepository implements WalletRepository {
  async getBalance(): Promise<WalletState> {
    const walletRes = await apiClient.get<any>('/api/v1/wallet');
    const balanceRes = await apiClient.get<any>('/api/v1/wallet/balance');
    
    if (!walletRes?.success || !walletRes.data) {
      throw new Error('Unable to load wallet.');
    }

    const balanceData = balanceRes?.success && balanceRes.data 
      ? balanceRes.data 
      : { available: 0.0, reserved: 0.0, pending: 0.0 };

    return {
      address: walletRes.data.address,
      balance: Number(balanceData.available || 0),
      escrowBalance: Number(balanceData.reserved || 0),
      pendingBalance: Number(balanceData.pending || 0),
      history: []
    };
  }

  async getTransactions(): Promise<Transaction[]> {
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
  }

  async deposit(amount: number): Promise<{ success: boolean; message?: string }> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({ success: false, message: 'Server side deposits not supported' });
        return;
      }

      // Avoid double loading
      if ((window as any).Razorpay) {
        this.openRazorpayCheckout(amount, resolve);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        this.openRazorpayCheckout(amount, resolve);
      };
      script.onerror = () => {
        resolve({ success: false, message: 'Failed to load Razorpay Checkout SDK' });
      };
      document.body.appendChild(script);
    });
  }

  private async openRazorpayCheckout(amount: number, resolve: (val: any) => void) {
    try {
      const orderRes = await apiClient.post<any>('/api/v1/payments/razorpay/order', { amount });
      if (!orderRes || !orderRes.success) {
        resolve({ success: false, message: orderRes?.message || 'Failed to initialize payment order' });
        return;
      }

      const { orderId, key_id, amount: orderAmount, currency } = orderRes;
      
      const options = {
        key: key_id || 'rzp_test_mockKeyId1234',
        amount: Math.round(orderAmount * 100),
        currency: currency || 'INR',
        name: 'Orbit AI',
        description: 'Wallet Credits Deposit',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await apiClient.post<any>('/api/v1/payments/razorpay/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            if (verifyRes && verifyRes.success) {
              resolve({ success: true });
            } else {
              resolve({ success: false, message: verifyRes?.message || 'Payment verification failed' });
            }
          } catch (e: any) {
            resolve({ success: false, message: e.message || 'Verification error' });
          }
        },
        prefill: {
          name: 'Orbit User',
          email: 'user@orbitai.dev',
        },
        theme: {
          color: '#00FFCC',
        },
        modal: {
          ondismiss: () => {
            resolve({ success: false, message: 'Payment cancelled' });
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      resolve({ success: false, message: err.message || 'Razorpay initialization error' });
    }
  }

  async withdraw(amount: number): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post<any>('/api/v1/wallet/withdraw', { amount, recipientAddress: 'EXTERNAL_BANK' });
    return { success: res.success, message: res.message };
  }

  async transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }> {
    const res = await apiClient.post<any>('/api/v1/wallet/transfer', { amount, recipientAddress });
    return { success: res.success, message: res.message };
  }

  async getCapTransactions(): Promise<any[]> {
    const res = await apiClient.get<any>('/api/v1/wallet/cap/transactions');
    return res?.success && Array.isArray(res.data) ? res.data : [];
  }

  async linkCapWallet(): Promise<{ success: boolean }> {
    const res = await apiClient.post<any>('/api/v1/wallet/cap/link', {});
    return { success: res.success };
  }
}
