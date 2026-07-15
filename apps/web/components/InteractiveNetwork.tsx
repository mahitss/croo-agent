'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

function NetworkMesh() {
  const { viewport } = useThree();
  const count = 300;

  // 1. Generate 300 node positions
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initPos.push(new THREE.Vector3(x, y, z));
    }
    return [pos, initPos];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Mouse coords tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 2. Pre-calculate static edge connections based on proximity threshold
  const edges = useMemo(() => {
    const list = [];
    const maxConnectionsPerNode = 2;
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        if (connections >= maxConnectionsPerNode) break;
        const dist = initialPositions[i].distanceTo(initialPositions[j]);
        if (dist < 3.2) {
          list.push({ a: i, b: j });
          connections++;
        }
      }
    }
    return list;
  }, [initialPositions]);

  // Initialize lines coordinate buffer
  const linePositions = useMemo(() => {
    return new Float32Array(edges.length * 2 * 3);
  }, [edges]);

  // Three.js Render Frame Loop (runs entirely on CPU/GPU without React re-renders)
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const points = pointsRef.current;
    const lines = linesRef.current;

    if (!points || !lines) return;

    // Damp mouse movement interpolation
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const positionsAttr = points.geometry.attributes.position;
    const linePositionsAttr = lines.geometry.attributes.position;

    // Build 3D mouse vector
    const mouse3D = new THREE.Vector3(
      mouse.current.x * (viewport.width / 2),
      mouse.current.y * (viewport.height / 2),
      0
    );

    // Apply floating sines offset + mouse distortion
    for (let i = 0; i < count; i++) {
      const init = initialPositions[i];
      const floatX = init.x + Math.sin(time * 0.35 + init.z * 0.5) * 0.25;
      const floatY = init.y + Math.cos(time * 0.42 + init.x * 0.4) * 0.20;
      const floatZ = init.z + Math.sin(time * 0.28 + init.y * 0.6) * 0.20;

      const nodePos = new THREE.Vector3(floatX, floatY, floatZ);
      const distToMouse = nodePos.distanceTo(mouse3D);

      // Distort slightly if mouse is nearby
      if (distToMouse < 2.5) {
        const dir = nodePos.clone().sub(mouse3D).normalize();
        const force = (2.5 - distToMouse) * 0.15;
        nodePos.addScaledVector(dir, force);
      }

      positionsAttr.setXYZ(i, nodePos.x, nodePos.y, nodePos.z);
    }
    positionsAttr.needsUpdate = true;

    // Update connecting line geometry coordinates
    for (let k = 0; k < edges.length; k++) {
      const edge = edges[k];
      const ax = positionsAttr.getX(edge.a);
      const ay = positionsAttr.getY(edge.a);
      const az = positionsAttr.getZ(edge.a);

      const bx = positionsAttr.getX(edge.b);
      const by = positionsAttr.getY(edge.b);
      const bz = positionsAttr.getZ(edge.b);

      linePositionsAttr.setXYZ(k * 2, ax, ay, az);
      linePositionsAttr.setXYZ(k * 2 + 1, bx, by, bz);
    }
    linePositionsAttr.needsUpdate = true;

    // Rotate slowly
    points.rotation.y = time * 0.015;
    points.rotation.x = time * 0.008;
    lines.rotation.y = time * 0.015;
    lines.rotation.x = time * 0.008;

    // Slightly tilt camera based on scroll
    state.camera.position.y = -scrollY.current * 0.0018;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Dynamic Points (Nodes) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7CCBFF"
          size={0.065}
          transparent
          opacity={0.55}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Network Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7CCBFF"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function InteractiveNetwork() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <NetworkMesh />
      </Canvas>
    </div>
  );
}
