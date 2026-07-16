"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { useActiveWorkflow } from '../hooks/useActiveWorkflow';
import { useUserWallet } from '../hooks/useUserWallet';
import { demoWalletService } from '../services/demo/wallet';
import { liveWalletService } from '../services/live/wallet';
import { demoWorkflowService } from '../services/demo/workflow';
import { liveWorkflowService } from '../services/live/workflow';
import { demoDashboardService } from '../services/demo/dashboard';
import { liveDashboardService } from '../services/live/dashboard';
import { demoAnalyticsService } from '../services/demo/analytics';
import { liveAnalyticsService } from '../services/live/analytics';
import { IWalletService, IWorkflowService, IDashboardService, IAnalyticsService } from '../services/types';
import { WalletState, Transaction, Workflow, ExecutionLog } from '@nexus-ai/types';
import { useToast } from '../components/Toast';

interface ModeContextProps {
  isDemoMode: boolean;
  walletService: IWalletService;
  workflowService: IWorkflowService;
  dashboardService: IDashboardService;
  analyticsService: IAnalyticsService;
  
  // Dynamic unified states
  wallet: WalletState;
  transactions: Transaction[];
  activeWorkflow: Workflow | null;
  executionLogs: ExecutionLog[];
  isRunning: boolean;
  appState: 'planning' | 'draft' | 'running' | 'completed' | 'history';
  
  toggleMode: () => void;
  refreshData: () => Promise<void>;
  settleUserWallet: () => Promise<{ success: boolean; message?: string }>;
}

const ModeContext = createContext<ModeContextProps | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const pathname = usePathname() || '';
  const publicRoutes = ['/', '/pricing', '/docs', '/privacy', '/terms', '/about', '/careers', '/blog', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  const { isDemoMode, userWallet: wallet, initialize, settleUserWallet } = useUserWallet();
  const { activeWorkflow, isRunning, executionLogs, appState, resetExecution } = useActiveWorkflow();
  
  const toggleDemoMode = useAuthStore((state) => state.toggleDemoMode);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initializationState = useAuthStore((state) => state.initializationState);

  // Injected services
  const walletService = isDemoMode ? demoWalletService : liveWalletService;
  const workflowService = isDemoMode ? demoWorkflowService : liveWorkflowService;
  const dashboardService = isDemoMode ? demoDashboardService : liveDashboardService;
  const analyticsService = isDemoMode ? demoAnalyticsService : liveAnalyticsService;

  // Unified States mapping
  const transactions = wallet?.history || [];

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const refreshData = async () => {
    if (!isAuthenticated) {
      console.log('[MODE_PROVIDER] Session is not authenticated. Bypassing state loading.');
      return;
    }
    try {
      await initialize();
    } catch (err: any) {
      toast(`State loading failed: ${err.message || err}`, 'error');
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    refreshData();
  }, [isDemoMode, isAuthenticated]);

  const toggleMode = () => {
    // Reset/clear current mode states before switching to prevent leakage
    resetExecution();
    toggleDemoMode();
    toast(`Switched to ${!isDemoMode ? 'Demo Sandbox' : 'Live Mode'}`, 'info');
  };

  // Prevent app render and protected calls until session init finishes
  if ((initializationState === 'UNINITIALIZED' || initializationState === 'CHECKING_SESSION') && !isPublicRoute) {
    return (
      <div className="flex-1 bg-bg-dark flex items-center justify-center p-6 font-mono min-h-screen">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 border-2 border-primary-neon border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            [AUTH INIT] Verifying Secure AI swarming session...
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModeContext.Provider
      value={{
        isDemoMode,
        walletService,
        workflowService,
        dashboardService,
        analyticsService,
        wallet,
        transactions,
        activeWorkflow,
        executionLogs,
        isRunning,
        appState,
        toggleMode,
        refreshData,
        settleUserWallet
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
