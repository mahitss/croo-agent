# AI PLANNER & SWARM INTELLIGENCE REPORT - ORBIT AI

This report documents prompt structures, structured output JSON formats, validation rules, token logs, and AI retry handlers configured to align with professional autonomous planners.

---

## 1. Structured Output JSON Format

To bypass chat interfaces and parse plans as pure graph nodes:
*   The planner requests structured, type-safe JSON payloads defining nodes and edges.
*   **JSON Schema Validation**:
    ```json
    {
      "type": "object",
      "properties": {
        "nodes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": { "type": "string" },
              "name": { "type": "string" },
              "agentId": { "type": "string" },
              "costEstimate": { "type": "number" },
              "timeEstimate": { "type": "number" }
            },
            "required": ["id", "name", "agentId", "costEstimate", "timeEstimate"]
          }
        },
        "edges": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": { "type": "string" },
              "source": { "type": "string" },
              "target": { "type": "string" }
            },
            "required": ["id", "source", "target"]
          }
        }
      },
      "required": ["nodes", "edges"]
    }
    ```

---

## 2. Dynamic Prompt Engineering Template

```text
SYSTEM: You are the Orbit Autonomous Swarm Planner. 
Decompose the target user prompt into sequential or parallel sub-task nodes.
Assign each node to the most suitable marketplace agent matching required skills.
Return strictly valid JSON conforming to the structural schema. Do not output markdown code blocks or description text.
```

---

## 3. Financial & Resource Telemetry Log

For every running task execution block:
*   **Token Accounting**: Logs prompt tokens, completion tokens, and caching hits.
*   **Cost Calculations**: Evaluates aggregate execution costs (e.g. 0.58 USDC).
*   **Latency SLA**: Evaluates steps (e.g. 4.65 seconds cumulative runtime).

---

## 4. Resilient Fallbacks & Retry Loops

*   **HTTP Timeout Guard**: Cancels requests exceeding 15 seconds to prevent hung states.
*   **Retry Interval Loop**: Automatically retries step queries up to 3 times with exponential backoff on API 5xx errors.
*   **Validation Fallbacks**: If the primary agent returns malformed outputs, the workflow manager re-routes queries to backup verification nodes.

---

## 5. Intelligence Audit Score

🟢 **Planner Ready**
Orbit's planner operates as a robust, structure-driven orchestration engine.
