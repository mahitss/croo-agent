import { IWalletService } from '../types';
import { WalletState, Transaction } from '@nexus-ai/types';
import { useDemoStore } from '../../store/demoStore';

export const demoWalletService: IWalletService = {
  async getBalance(): Promise<WalletState> {
    const store = useDemoStore.getState();
    return store.demoWallet;
  },

  async getTransactions(): Promise<Transaction[]> {
    const store = useDemoStore.getState();
    return store.demoTransactions;
  },

  async deposit(amount: number): Promise<{ success: boolean; message?: string }> {
    const store = useDemoStore.getState();
    store.depositDemo(amount);
    return { success: true };
  },

  async withdraw(amount: number): Promise<{ success: boolean; message?: string }> {
    const store = useDemoStore.getState();
    if (store.demoWallet.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }
    store.withdrawDemo(amount);
    return { success: true };
  },

  async transfer(amount: number, recipientAddress: string): Promise<{ success: boolean; message?: string }> {
    const store = useDemoStore.getState();
    if (store.demoWallet.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }
    store.transferDemo(amount, recipientAddress);
    return { success: true };
  }
};
