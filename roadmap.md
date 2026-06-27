# Orbit — Engineering Execution Plan & Roadmap

This document defines the success metrics, MVP feature scope, development sprint cycles, coding standards, demo checklists, and submission requirements for the **Orbit Swarm Operating System** MVP.

---

## 1. Success Definition
The project is successful if hackathon judges can complete the following flow in under 5 minutes:
1. **Connect & Sign In**: Authenticate via wallet signature challenge nonces.
2. **Marketplace Discovery**: Browse public verified agent nodes and capabilities.
3. **Swarm Compilation**: Generate a visual task DAG using natural language prompts.
4. **Execution Tracking**: Watch AI agents cooperate, verify inputs, and resolve SLAs.
5. **Wallet Commerce**: Authorize USDC escrows, inspect locked balances, and audit payment settlements.
6. **Analytics Reports**: Inspect latency profiles, revenue margins, and developer recommendations.

---

## 2. MVP Scope (Hackathon)

### Must Have
- **Authentication**: JWT Bearer validation + CROO Wallet challenge nonces signatures.
- **Marketplace**: Agent registries, latency filters, search indices, and category tags.
- **AI Swarm Planner**: Natural language intention parser compiling intent to visual DAG nodes.
- **Visual Canvas**: Drag-and-drop React Flow node graph mapping execution routes.
- **Wallet & Payouts**: USDC sandbox deposit/withdraw ledgers, and escrow holds release.
- **Dashboard**: Core summary charts (revenue, active swarms counters).
- **Analytics Overview**: Today's tokens count, API requests volumes, provider distribution graphs.

### Should Have
- **Swarm Matchmaker**: Interactive panel recommending cooperative node flows.
- **AI Business Advisor**: Proactive versioning recommendations based on search traffic.
- **Notifications Panel**: Real-time warning alert center.
- **Admin Console**: Service health uptime check traffic lights and feature toggles control.

---

## 3. Sprint Plan

### Sprint 1 — Monorepo Foundation (Days 1-2)
- Bootstrap pnpm packages: `apps/web` (Next.js), `apps/api-gateway` (NestJS), `packages/types` (shared TS interfaces).
- Set up Docker Compose topologies and CI pull request lint checkers.
- Outcome: Developers can log in, dependencies compile, and services communicate.

### Sprint 2 — Swarm Marketplace (Days 3-4)
- Deploy agent metadata controller APIs inside NestJS `agent-service`.
- Build Category Horizontal chips, search query filters, and Agent detail tab sheets.
- Outcome: Users can search and discover verified agent capabilities.

### Sprint 3 — AI Swarm Planner (Days 5-6)
- Develop intent parsing FastAPI endpoints inside Python `ai-service` on port 8000.
- Implement cycle-detection algorithms and input schema validation filters.
- Outcome: User prompts generate valid task dependency arrays.

### Sprint 4 — Visual Workflow Engine (Days 7-8)
- Build visual React Flow canvas, node timeline execution tracking charts, and queue workers.
- Outcome: Workflows run end-to-end showing live progress indicators.

### Sprint 5 — Escrow Settlements (Days 9-10)
- Set up NestJS `payment-service` and `wallet-service` USDC balance sync endpoints.
- Build visual escrow payments ledger timelines and settlement trackers.
- Outcome: On-chain transaction settlements are simulated live.

### Sprint 6 — Polish & Deploy (Days 11-12)
- Configure Sentry errors capture and Prometheus `/metrics` gauges scrapers.
- Integrate responsive breakpoints, accessibility tags, and Framer Motion easing curves.
- Outcome: Stable production demo ready.

---

## 4. Development Standards & Workflows

### Branch Guidelines
- Direct commits to `main` are blocked. Features developed on `feature/*` or `hotfix/*` branches.
- Merges require PR reviews, lint check approvals (`pnpm run build` exits 0), and tests passes.

### Definition of Ready (DoR)
Before starting a feature:
- API endpoint contracts are defined.
- Acceptance criteria and mock inputs are aligned.

### Definition of Done (DoD)
A task is complete only when:
- Typescript build compiles cleanly.
- Telemetry health probes (`GET /health`) return healthy dependencies status.
- Audit logs capture administrative changes.

---

## 5. Demo Preparation Script (5 Minutes)
1. **Edge Intro (0:00 - 1:00)**: Present value proposition, dismissible announcement alert, and NDS design mode toggle.
2. **Registry Discovery (1:00 - 2:00)**: Search categories, invoke detail pages, view ratings, and run the Swarm Matchmaker prompt query.
3. **Intent Launch (2:00 - 3:00)**: Enter natural language instruction, inspect generated task DAG, review AI planner selection reasoning justifications.
4. **Execution Run (3:00 - 4:00)**: Watch node transition cycles (Pending → Running → Completed), audit escrow funds locks, inspect live logs stream.
5. **Commerce & Analytics (4:00 - 5:00)**: View transaction hashes ledger list, inspect available/reserved balance updates, review AI Business Advisor yields reports.
