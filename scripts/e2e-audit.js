/**
 * Post-Deployment E2E Production Audit Tool
 * Audits all API Gateway endpoints for status codes and payloads.
 */

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api/v1';
const ROOT_URL = BASE_URL.replace('/api/v1', '');

async function runTest(name, url, method = 'GET', body = null, headers = {}) {
  try {
    console.log(`[TEST] ${name} -> ${method} ${url}...`);
    const options = {
      method,
      headers: { 'Content-Type': 'application/json', ...headers }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const start = Date.now();
    const res = await fetch(url, options);
    const duration = Date.now() - start;

    const contentType = res.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (res.status >= 400) {
      throw new Error(`HTTP Status ${res.status}: ${typeof data === 'object' ? JSON.stringify(data) : data}`);
    }

    if (data && typeof data === 'object' && data.success === false) {
      throw new Error(`API logic returned failure: ${data.message || JSON.stringify(data)}`);
    }

    console.log(`[PASS] ${name} (${duration}ms)`);

    return { name, success: true, duration, status: res.status, data };
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    return { name, success: false, error: err.message };
  }
}

async function main() {
  console.log("=========================================");
  console.log("Starting Post-Deployment Production Audit");
  console.log(`Target Gateway: ${BASE_URL}`);
  console.log(`Root Gateway:   ${ROOT_URL}`);
  console.log("=========================================\n");

  const results = [];
  const testEmail = `prod_audit_${Date.now()}@orbitai.dev`;
  let userToken = '';
  let createdWorkflowId = '';

  // 1. Audit Health & System Probe endpoints
  results.push(await runTest("Root Health Check", `${ROOT_URL}/health`));
  results.push(await runTest("Render Health Check Override", `${ROOT_URL}/api/health`));
  results.push(await runTest("V1 Health Check", `${BASE_URL}/health`));
  results.push(await runTest("Readiness Probe", `${ROOT_URL}/ready`));
  results.push(await runTest("Liveness Probe", `${ROOT_URL}/live`));
  results.push(await runTest("Prometheus Metrics Probe", `${ROOT_URL}/metrics`));
  results.push(await runTest("Interactive Documentation Page", `${ROOT_URL}/docs`));
  results.push(await runTest("OpenAPI Schema Definition", `${ROOT_URL}/api/openapi.json`));

  // 2. Identity & Authentication API
  const regRes = await runTest("Register Auth Endpoint", `${BASE_URL}/auth/register`, 'POST', {
    email: testEmail,
    username: `audit_${Date.now()}`,
    password: 'SecureAuditPassword123!'
  });
  results.push(regRes);
  if (regRes.success && regRes.data && regRes.data.data) {
    userToken = regRes.data.data.token;
  }

  results.push(await runTest("Login Auth Endpoint", `${BASE_URL}/auth/login`, 'POST', {
    usernameOrEmail: testEmail,
    password: 'SecureAuditPassword123!'
  }));

  const authHeader = userToken ? { 'Authorization': `Bearer ${userToken}` } : {};

  // 3. Swarm Directory
  results.push(await runTest("List Capabilities & Agents Discovery", `${BASE_URL}/agents`));

  // 4. AI Swarm Planner
  results.push(await runTest("AI Planner DAG Synthesis", `${BASE_URL}/ai/plan`, 'POST', {
    query: 'Audit ledger payments and report compliance status',
    routingMode: 'speed',
    budget: 5.0
  }));

  // 5. Workflows Engine
  const wfRes = await runTest("Create Workflow Template", `${BASE_URL}/workflows`, 'POST', {
    title: 'Post-Deploy Verification Swarm Run',
    estimatedCost: 2.50,
    nodes: [
      { capability: 'verify', agentId: 'agent-verify-1' }
    ],
    edges: []
  });
  results.push(wfRes);
  if (wfRes.success && wfRes.data && wfRes.data.data) {
    createdWorkflowId = wfRes.data.data.id;
  }

  if (createdWorkflowId) {
    results.push(await runTest("Execute Workflow Run", `${BASE_URL}/workflows/${createdWorkflowId}/run`, 'POST'));
  }

  // 6. Wallets & Payments Ledger
  results.push(await runTest("Wallet Ledger Balance Retrieval", `${BASE_URL}/wallet/balance`));

  const payRes = await runTest("Create Payment Invoice", `${BASE_URL}/payments`, 'POST', {
    workflowId: createdWorkflowId || 'wf-verification-dummy',
    payerWallet: '0xabc123...',
    amount: 2.50
  });
  results.push(payRes);
  if (payRes.success && payRes.data && payRes.data.data) {
    const paymentId = payRes.data.data.id;
    results.push(await runTest("Settle Payment Escrow", `${BASE_URL}/payments/settle`, 'POST', { paymentId }));
  }

  console.log("\n=========================================");
  const passed = results.filter(r => r.success).length;
  console.log(`Audit Summary: ${passed}/${results.length} Tests Passed.`);
  console.log("=========================================");

  if (passed !== results.length) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
