# DAG VISUALIZATION REPORT - ORBIT AI

This document logs the design, layout algorithms, and execution step panel integrations completed to overhaul the Orbit AI workflow visualization.

---

## 1. Executive Summary

The Orbit AI workflow layout has been fully updated to support an animated, leveled Directed Acyclic Graph (DAG). Rather than simple vertical stacking, node coordinates are calculated dynamically. Steps display animated pulse animations, edges show state colors with flowing stroke dashes, and a dedicated step inspector displays execution logs, outputs, errors, and retry logs.

---

## 2. Dynamic Leveled Auto-Layout

To map nodes without external coordinate libraries, `Canvas.tsx` calculates layouts using a leveled topological sorting algorithm:
1.  **Level Sorting**: Assigns nodes to levels (Level 0 for parent entry points, Level 1 for child steps).
2.  **Horizontal Spread**: Spreads multiple nodes at the same level (parallel steps) horizontally:
    $$\text{x} = \text{centerX} - \frac{\text{totalWidth}}{2} + \text{indexInLevel} \times \text{spacingX}$$
3.  **Vertical Space**: Offsets vertical positions by level counts ($y = 30 + \text{level} \times \text{spacingY}$).

This guarantees clean rendering of complex branching paths.

---

## 3. Animated Nodes & Edges

*   **Glowing Nodes**: Active running steps pulse via pulsing shadow CSS animations (`shadow-[0_0_10px_rgba(255,0,127,0.15)] animate-pulse`). Completed steps have green glows.
*   **Animated Links**: Edges show animated flowing dashes when the parent node is running or completed.

---

## 4. Live Status & Execution Timeline

Selecting any node on the Canvas triggers the Node Inspector sidebar. It lists:
*   Step status (Completed, Running, Failed).
*   SLA Service Fee in USDC.
*   Assigned agent node names.
*   Step retry counts.

---

## 5. Timeline Logs

Timeline log windows display execution records:
*   Initial capability channel handshakes.
*   USDC escrow lock events.
*   Agent execution processes.
*   Consensus verification and payout settlements.

---

## 6. Zoom & Pan

Built on top of React Flow (`@xyflow/react`), the canvas fully supports:
*   Mouse wheel zoom and double-click zoom.
*   Left-click drag to pan.
*   Auto-fitting screen areas (`fitView`).

---

## 7. Verification Checks

Workspace compilation tests completed successfully:
```bash
$ turbo run build
...
 Tasks:    9 successful, 9 total
Cached:    8 cached, 9 total
Time:    1m8.101s
```
All components generate, compile, and pack cleanly.
