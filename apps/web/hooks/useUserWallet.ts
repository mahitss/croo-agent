import { useNexusStore } from '../store/nexusStore';
import { WalletState } from '@nexus-ai/types';

export function useUserWallet() {
  const userWallet = useNexusStore((state) => state.userWallet);
  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  
  const demoBalance = useNexusStore((state) => state.demoBalance);
  const demoEscrow = useNexusStore((state) => state.demoEscrow);
  const demoHistory = useNexusStore((state) => state.demoHistory);
  
  const liveBalance = useNexusStore((state) => state.liveBalance);
  const liveEscrow = useNexusStore((state) => state.liveEscrow);
  const liveHistory = useNexusStore((state) => state.liveHistory);

  const depositUserWallet = useNexusStore((state) => state.depositUserWallet);
  const withdrawUserWallet = useNexusStore((state) => state.withdrawUserWallet);
  const settleUserWallet = useNexusStore((state) => state.settleUserWallet);
  const resetDemoMode = useNexusStore((state) => state.resetDemoMode);
  const initialize = useNexusStore((state) => state.initialize);

  return {
    userWallet,
    isDemoMode,
    demoBalance,
    demoEscrow,
    demoHistory,
    liveBalance,
    liveEscrow,
    liveHistory,
    depositUserWallet,
    withdrawUserWallet,
    settleUserWallet,
    resetDemoMode,
    initialize
  };
}
