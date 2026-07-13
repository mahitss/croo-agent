import { useNexusStore } from '../store/nexusStore';
import { Agent } from '@nexus-ai/types';

export function useAgents() {
  const agents = useNexusStore((state) => state.agents);
  const registerAgent = useNexusStore((state) => state.registerAgent);
  const isLoading = useNexusStore((state) => state.isLoading);
  const initialize = useNexusStore((state) => state.initialize);

  return {
    agents,
    registerAgent,
    isLoading,
    initialize
  };
}
