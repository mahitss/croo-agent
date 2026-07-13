import { useNexusStore } from '../store/nexusStore';
import { Workflow, ExecutionLog } from '@nexus-ai/types';

export function useActiveWorkflow() {
  const activeWorkflow = useNexusStore((state) => state.activeWorkflow);
  const executionLogs = useNexusStore((state) => state.executionLogs);
  const isRunning = useNexusStore((state) => state.isRunning);
  const appState = useNexusStore((state) => state.appState);
  const userQuery = useNexusStore((state) => state.userQuery);
  const promptTokens = useNexusStore((state) => state.promptTokens);
  const completionTokens = useNexusStore((state) => state.completionTokens);
  const totalTokens = useNexusStore((state) => state.totalTokens);
  const estimatedCost = useNexusStore((state) => state.estimatedCost);
  const isLoading = useNexusStore((state) => state.isLoading);
  const currentPhaseIndex = useNexusStore((state) => state.currentPhaseIndex);
  const agents = useNexusStore((state) => state.agents);

  const generateWorkflow = useNexusStore((state) => state.generateWorkflow);
  const startExecution = useNexusStore((state) => state.startExecution);
  const resetExecution = useNexusStore((state) => state.resetExecution);
  const renameNode = useNexusStore((state) => state.renameNode);
  const deleteNode = useNexusStore((state) => state.deleteNode);
  const retryNode = useNexusStore((state) => state.retryNode);
  const cancelWorkflow = useNexusStore((state) => state.cancelWorkflow);
  const setUserQuery = useNexusStore((state) => state.setUserQuery);

  return {
    activeWorkflow,
    executionLogs,
    isRunning,
    appState,
    userQuery,
    promptTokens,
    completionTokens,
    totalTokens,
    estimatedCost,
    isLoading,
    currentPhaseIndex,
    agents,
    generateWorkflow,
    startExecution,
    resetExecution,
    renameNode,
    deleteNode,
    retryNode,
    cancelWorkflow,
    setUserQuery
  };
}
