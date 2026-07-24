'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import WorkflowPage from '../../workflow/page';
import { useNexusStore } from '../../../store/nexusStore';
import { DemoWorkflowRepository } from '../../../services/demo/DemoWorkflowRepository';

export default function DynamicWorkspacePage() {
  const params = useParams();
  const workflowId = params?.workflowId as string;

  useEffect(() => {
    if (workflowId) {
      const repo = new DemoWorkflowRepository();
      repo.getWorkflow(workflowId).then((wf) => {
        if (wf) {
          useNexusStore.setState({
            activeWorkflow: wf,
            appState: wf.status === 'completed' ? 'completed' : 'running'
          });
        }
      });
    }
  }, [workflowId]);

  return <WorkflowPage />;
}
