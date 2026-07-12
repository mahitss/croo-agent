"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDemoStore } from '../store/demoStore';
import { useLiveStore } from '../store/liveStore';
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
}

const ModeContext = createContext<ModeContextProps | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const isDemoMode = useAuthStore((state) => state.isDemoMode);
  const toggleDemoMode = useAuthStore((state) => state.toggleDemoMode);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  
  // Demo states
  const demoWallet = useDemoStore((state) => state.demoWallet);
  const demoTransactions = useDemoStore((state) => state.demoTransactions);
  const demoWorkflow = useDemoStore((state) => state.demoWorkflow);
  const demoLogs = useDemoStore((state) => state.executionLogs);
  const demoRunning = useDemoStore((state) => state.isRunning);
  const demoAppState = useDemoStore((state) => state.appState);
  const initializeDemo = useDemoStore((state) => state.initializeDemo);
  const resetDemoWorkflow = useDemoStore((state) => state.resetDemoWorkflow);

  // Live states
  const liveWallet = useLiveStore((state) => state.liveWallet);
  const liveTransactions = useLiveStore((state) => state.liveTransactions);
  const liveWorkflow = useLiveStore((state) => state.liveWorkflow);
  const liveLogs = useLiveStore((state) => state.executionLogs);
  const liveRunning = useLiveStore((state) => state.isRunning);
  const liveAppState = useLiveStore((state) => state.appState);
  const fetchLiveWallet = useLiveStore((state) => state.fetchLiveWallet);
  const fetchAgents = useLiveStore((state) => state.fetchAgents);
  const resetLiveWorkflowState = useLiveStore((state) => state.resetLiveWorkflowState);

  // Injected services
  const walletService = isDemoMode ? demoWalletService : liveWalletService;
  const workflowService = isDemoMode ? demoWorkflowService : liveWorkflowService;
  const dashboardService = isDemoMode ? demoDashboardService : liveDashboardService;
  const analyticsService = isDemoMode ? demoAnalyticsService : liveAnalyticsService;

  // Unified States mapping
  const wallet = isDemoMode ? demoWallet : liveWallet;
  const transactions = isDemoMode ? demoTransactions : liveTransactions;
  const activeWorkflow = isDemoMode ? demoWorkflow : liveWorkflow;
  const executionLogs = isDemoMode ? demoLogs : liveLogs;
  const isRunning = isDemoMode ? demoRunning : liveRunning;
  const appState = isDemoMode ? demoAppState : liveAppState;

  const refreshData = async () => {
    if (isDemoMode) {
      initializeDemo();
    } else {
      try {
        await fetchLiveWallet();
        await fetchAgents();
      } catch (err: any) {
        toast(`Live wallet loading failed: ${err.message || err}`, 'error');
      }
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
    if (isDemoMode) {
      // Demo -> Live: Clear sandbox workflow and reset demo wallet state
      resetDemoWorkflow();
      useDemoStore.getState().resetDemoWallet();
    } else {
      // Live -> Demo: Clear live workflow and discard live wallet cache
      resetLiveWorkflowState();
      useLiveStore.getState().clearLiveWallet();
    }
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
        refreshData
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
