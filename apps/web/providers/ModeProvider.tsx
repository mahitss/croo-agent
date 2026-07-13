"use client";

import React, { createContext, useContext, useEffect } from 'react';
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
  
  const { isDemoMode, userWallet: wallet, initialize, settleUserWallet } = useUserWallet();
  const { activeWorkflow, isRunning, executionLogs, appState, resetExecution } = useActiveWorkflow();
  
  const toggleDemoMode = useAuthStore((state) => state.toggleDemoMode);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Injected services
  const walletService = isDemoMode ? demoWalletService : liveWalletService;
  const workflowService = isDemoMode ? demoWorkflowService : liveWorkflowService;
  const dashboardService = isDemoMode ? demoDashboardService : liveDashboardService;
  const analyticsService = isDemoMode ? demoAnalyticsService : liveAnalyticsService;

  // Unified States mapping
  const transactions = wallet?.history || [];

  const refreshData = async () => {
    try {
      await initialize();
    } catch (err: any) {
      toast(`State loading failed: ${err.message || err}`, 'error');
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    refreshData();
  }, [isDemoMode]);

  const toggleMode = () => {
    // Reset/clear current mode states before switching to prevent leakage
    resetExecution();
    toggleDemoMode();
    toast(`Switched to ${!isDemoMode ? 'Demo Sandbox' : 'Live Mode'}`, 'info');
  };

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
