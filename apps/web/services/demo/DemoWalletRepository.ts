import { WalletState, Transaction } from '@nexus-ai/types';
import { WalletRepository } from '../repositories';

export class DemoWalletRepository implements WalletRepository {
  private getStored<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  private setStored(key: string, val: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val));
    }
  }

  async getBalance(): Promise<WalletState> {
    const balance = Number(this.getStored('orbit_demo_balance', '100.0'));
    const escrowBalance = Number(this.getStored('orbit_demo_escrow', '0.0'));
    const pendingBalance = Number(this.getStored('orbit_demo_pending', '0.0'));
    const history = this.getStored<Transaction[]>('orbit_demo_history', []);
    
    return {
      address: '0xDemoWalletAddress789c',
      balance,
      escrowBalance,
      pendingBalance,
      history
    };
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.getStored<Transaction[]>('orbit_demo_history', []);
  }

  async deposit(amount: number): Promise<{ success: boolean; message?: string }> {
    const current = await this.getBalance();
    const newBalance = current.balance + amount;
    
    const tx: Transaction = {
      id: `tx-deposit-${Date.now()}`,
      senderAddress: 'EXTERNAL_BANK',
      receiverAddress: current.address,
      amount,
      type: 'deposit',
      timestamp: new Date().toISOString(),
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substring(2, 42)
    };

    const newHistory = [tx, ...current.history];
    this.setStored('orbit_demo_balance', newBalance.toString());
    this.setStored('orbit_demo_history', newHistory);

    return { success: true };
  }

  async withdraw(amount: number): Promise<{ success: boolean; message?: string }> {
    const current = await this.getBalance();
    if (current.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }
    const newBalance = current.balance - amount;

    const tx: Transaction = {
      id: `tx-withdraw-${Date.now()}`,
      senderAddress: current.address,
      receiverAddress: 'EXTERNAL_BANK',
      amount,
      type: 'withdrawal',
      timestamp: new Date().toISOString(),
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substring(2, 42)
    };

    const newHistory = [tx, ...current.history];
    this.setStored('orbit_demo_balance', newBalance.toString());
    this.setStored('orbit_demo_history', newHistory);

    return { success: true };
  }

  async transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }> {
    const current = await this.getBalance();
    if (current.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }
    const newBalance = current.balance - amount;

    const tx: Transaction = {
      id: `tx-transfer-${Date.now()}`,
      senderAddress: current.address,
      receiverAddress: recipientAddress,
      amount,
      type: 'withdrawal',
      timestamp: new Date().toISOString(),
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substring(2, 42)
    };

    const newHistory = [tx, ...current.history];
    this.setStored('orbit_demo_balance', newBalance.toString());
    this.setStored('orbit_demo_history', newHistory);

    return { success: true };
  }

  async getCapTransactions(): Promise<any[]> {
    return [];
  }

  async linkCapWallet(): Promise<{ success: boolean }> {
    return { success: true };
  }

  async settle(): Promise<{ success: boolean; message?: string }> {
    return { success: true };
  }
}
