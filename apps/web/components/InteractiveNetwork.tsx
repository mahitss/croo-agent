'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  seedX: number;
  seedY: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Packet {
  nodeA: number;
  nodeB: number;
  progress: number;
  speed: number;
}

export default function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Set canvas dimensions
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initializeNodes();
    };

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let lastEdgeUpdate = 0;
    let lastPacketSpawn = 0;

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
    let scrollY = 0;

    // Generates 60 nodes sparse in the center
    const initializeNodes = () => {
      nodes = [];
      const nodeCount = 60;
      const cx = width / 2;
      const cy = height / 2;
      const exclusionRadius = Math.min(width, height) * 0.28; // Radius to keep center clean

      let attempts = 0;
      while (nodes.length < nodeCount && attempts < 1000) {
        attempts++;
        const rx = Math.random() * width;
        const ry = Math.random() * height;

        // Verify inside exclusion radius
        const dx = rx - cx;
        const dy = ry - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < exclusionRadius) {
          continue; // Discard node close to center
        }

        nodes.push({
          baseX: rx,
          baseY: ry,
          x: rx,
          y: ry,
          offsetX: 0,
          offsetY: 0,
          seedX: Math.random() * 1000,
          seedY: Math.random() * 1000
        });
      }
      updateConnections();
    };

    // Calculate nearest 2 neighbors for each node
    const updateConnections = () => {
      edges = [];
      const edgeKeys = new Set<string>();

      for (let i = 0; i < nodes.length; i++) {
        const distances: { index: number; dist: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          distances.push({ index: j, dist });
        }
        distances.sort((a, b) => a.dist - b.dist);

        // Take 2 nearest neighbors
        const nearest = distances.slice(0, 2);
        nearest.forEach((item) => {
          const key = i < item.index ? `${i}-${item.index}` : `${item.index}-${i}`;
          if (!edgeKeys.has(key)) {
            edgeKeys.add(key);
            edges.push({ a: i, b: item.index });
          }
        });
      }
    };

    // Smooth floating noise functions
    const noiseX = (t: number, seed: number) => {
      return Math.sin(t * 0.00045 + seed) * Math.cos(t * 0.0002 + seed * 1.5) * 35;
    };
    const noiseY = (t: number, seed: number) => {
      return Math.cos(t * 0.0004 + seed * 2.1) * Math.sin(t * 0.00018 + seed * 0.8) * 30;
    };

    // Spawn execution packet along a random active edge
    const spawnPacket = () => {
      if (packets.length >= 2 || edges.length === 0) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      packets.push({
        nodeA: edge.a,
        nodeB: edge.b,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008
      });
    };

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();

    // Main animation render loop
    const animate = (timestamp: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Damp mouse coordinates
      if (mouse.targetX !== -9999) {
        if (mouse.x === -9999) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Parallax scroll variable
      const parallax = scrollY * 0.08;

      // Update node drift positions & mouse distortion
      nodes.forEach((node) => {
        const driftX = noiseX(timestamp, node.seedX);
        const driftY = noiseY(timestamp, node.seedY);

        node.x = node.baseX + driftX;
        node.y = node.baseY + driftY - parallax;

        // Mouse distortion offset
        if (mouse.x !== -9999) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = ((180 - dist) / 180) * 22; // max 22px push
            node.offsetX += ((dx / dist) * force - node.offsetX) * 0.1;
            node.offsetY += ((dy / dist) * force - node.offsetY) * 0.1;
          } else {
            node.offsetX += (0 - node.offsetX) * 0.1;
            node.offsetY += (0 - node.offsetY) * 0.1;
          }
        } else {
          node.offsetX += (0 - node.offsetX) * 0.1;
          node.offsetY += (0 - node.offsetY) * 0.1;
        }
      });

      // Recalculate edge graph connections only every 4 seconds
      if (timestamp - lastEdgeUpdate > 4000) {
        updateConnections();
        lastEdgeUpdate = timestamp;
      }

      // Spawn data packet every 3.5 seconds
      if (timestamp - lastPacketSpawn > 3500) {
        spawnPacket();
        lastPacketSpawn = timestamp;
      }

      // Draw connection lines
      ctx.beginPath();
      edges.forEach((edge) => {
        const nodeA = nodes[edge.a];
        const nodeB = nodes[edge.b];
        if (!nodeA || !nodeB) return;
        ctx.moveTo(nodeA.x + nodeA.offsetX, nodeA.y + nodeA.offsetY);
        ctx.lineTo(nodeB.x + nodeB.offsetX, nodeB.y + nodeB.offsetY);
      });
      ctx.strokeStyle = 'rgba(124, 203, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x + node.offsetX, node.y + node.offsetY, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.fill();
      });

      // Update and draw packets
      packets = packets.filter((p) => {
        const nodeA = nodes[p.nodeA];
        const nodeB = nodes[p.nodeB];
        if (!nodeA || !nodeB) return false;

        p.progress += p.speed;
        if (p.progress >= 1) return false;

        const xA = nodeA.x + nodeA.offsetX;
        const yA = nodeA.y + nodeA.offsetY;
        const xB = nodeB.x + nodeB.offsetX;
        const yB = nodeB.y + nodeB.offsetY;

        const px = xA + (xB - xA) * p.progress;
        const py = yA + (yB - yA) * p.progress;

        // Draw packet node spark
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#7CCBFF';
        ctx.shadowColor = '#7CCBFF';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow state for next draws

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Clean listeners
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: '#030303',
        pointerEvents: 'none',
      }}
    />
  );
}
