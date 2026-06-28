/**
 * Orbit AI Integrated Test Suite (Phase 9 Compliance)
 * Performs automated validation checks against API Gateway endpoints.
 */

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api/v1';

async function runTest(testName, action) {
  try {
    console.log(`[TEST] Running: ${testName}...`);
    await action();
    console.log(`[PASS] ${testName}\n`);
    return true;
  } catch (err) {
    console.error(`[FAIL] ${testName}: ${err.message}\n`);
    return false;
  }
}

async function main() {
  console.log("=========================================");
  console.log("Starting Orbit AI Automated API Tests");
  console.log(`Target Gateway URL: ${BASE_URL}`);
  console.log("=========================================\n");

  const results = [];
  let userToken = '';
  let testEmail = `test_engineer_${Date.now()}@orbitai.dev`;

  // 1. AUTHENTICATION: REGISTER
  results.push(await runTest("User Registration API", async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        username: `eng_${Date.now()}`,
        password: 'securePassword123'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Registration failed');
    userToken = data.data.token;
  }));

  // 2. AUTHENTICATION: LOGIN
  results.push(await runTest("User Login API", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'securePassword123'
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Login failed');
  }));

  // 3. AI PLANNER: WORKFLOW GENERATION
  results.push(await runTest("AI Planner DAG Generation API", async () => {
    const res = await fetch(`${BASE_URL}/ai/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'Analyze Tesla Q1 reports and translate to Chinese',
        routingMode: 'balanced',
        budget: 2.5
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'AI Plan query failed');
    if (!data.data.nodes || data.data.nodes.length === 0) throw new Error('DAG returned empty nodes');
  }));

  // 4. MARKETPLACE: LIST AGENTS
  results.push(await runTest("List Registered Agents Discovery API", async () => {
    const res = await fetch(`${BASE_URL}/agents`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Agent listing failed');
  }));

  // 5. WORKFLOWS: CREATE WORKFLOW TEMPLATE
  let createdWorkflowId = '';
  results.push(await runTest("Create Workflow Template API", async () => {
    const res = await fetch(`${BASE_URL}/workflows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Tesla Analysis Swarm Run',
        estimatedCost: 1.25,
        nodes: [
          { capability: 'research', agentId: 'agent-research-1' },
          { capability: 'verify', agentId: 'agent-verify-1' }
        ],
        edges: [
          { sourceNode: 'research', targetNode: 'verify' }
        ]
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Workflow template creation failed');
    createdWorkflowId = data.data.id;
  }));

  // 6. WORKFLOWS: RUN EXECUTION PIPELINE
  results.push(await runTest("Trigger Workflow Run Pipeline API", async () => {
    if (!createdWorkflowId) throw new Error("Workflow ID missing from previous step");
    const res = await fetch(`${BASE_URL}/workflows/${createdWorkflowId}/run`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Workflow trigger failed');
  }));

  // 7. WALLET: RETRIEVE BALANCE
  results.push(await runTest("Wallet Balance Retrieval API", async () => {
    const res = await fetch(`${BASE_URL}/wallet/balance`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Balance fetch failed');
  }));

  // 8. PAYMENTS: CREATE & SETTLE
  results.push(await runTest("Payment Invoice Creation & Settlement API", async () => {
    const createRes = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: 'wf-test-payment',
        payerWallet: '0x3a4b...e9c2',
        amount: 1.25
      })
    });
    const createData = await createRes.json();
    if (!createData.success) throw new Error('Payment creation failed');

    const paymentId = createData.data.id;
    const settleRes = await fetch(`${BASE_URL}/payments/settle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId })
    });
    const settleData = await settleRes.json();
    if (!settleData.success) throw new Error('Payment settlement failed');
  }));

  console.log("=========================================");
  const passed = results.filter(r => r).length;
  console.log(`Test Execution Complete: ${passed}/${results.length} Passed.`);
  console.log("=========================================");

  if (passed !== results.length) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
