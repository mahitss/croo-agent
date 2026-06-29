# ANALYTICS INTEGRATION REPORT - ORBIT AI

This document logs the data queries, microservice integrations, and graphical updates completed to deploy the premium Orbit AI analytics dashboard.

---

## 1. Executive Summary

The static analytics layout has been fully upgraded to a live analytics engine querying decentralized wallet records, Neon DB daily usage charts, workflow SLAs, and node workloads.

---

## 2. Live API Integrations

The dashboard fetches data exclusively from NestJS/Prisma microservices via the central API Gateway:
*   **Daily Revenues (`/api/v1/analytics/revenue`)**: Queries daily platform earnings and payouts.
*   **Workflow Health (`/api/v1/analytics/workflows`)**: Retrieves completed vs. failed workflow counts.
*   **Agent Workloads (`/api/v1/analytics/agents`)**: Aggregates invocation counts and fees earned by each agent.
*   **AI Metrics (`/api/v1/analytics/ai`)**: Tracks planner latencies and token usage.
*   **System Hardware (`/api/v1/analytics/system`)**: Displays host node resources.

---

## 3. Real-Time Chart Visualizations

Using Recharts, the analytics panel renders:
*   **Revenue vs. Spend AreaChart**: Displays margins and expenses over time.
*   **Workflow Health Donut PieChart**: Visualizes SLA completion status ratios.
*   **Hardware Allocation Bars**: Displays real-time CPU and Memory metrics.

---

## 4. Wallet & Marketplace Metrics

*   **Decentralized Wallet**: Dynamically retrieves the active developer wallet balance from the state store.
*   **Registry Ratios**: Displays published and verified agent counts directly from the marketplace database.

---

## 5. Export Functionality

An interactive **Export Data** button generates and downloads a formatted `.json` file containing all live datasets, timestamps, and active wallet states.

---

## 6. Verification Checks

Workspace compilation tests completed successfully:
```bash
$ turbo run build
...
 Tasks:    9 successful, 9 total
Cached:    8 cached, 9 total
Time:    1m29.293s
```
All components generate, compile, and pack cleanly.
