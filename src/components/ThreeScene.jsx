import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Sparkles as SparklesIcon, Eye, RefreshCw, Sun, Moon, Leaf } from 'lucide-react';

// Procedural 3D Leaf Component
function LeafMesh({ position, rotation, scale, color }) {
  const meshRef = useRef();

  // Create leaf curved shape geometry
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.6, 0.8, 0.4, 2.2);
    shape.quadraticCurveTo(0, 2.8, 0, 3.2);
    shape.quadraticCurveTo(0, 2.8, -0.4, 2.2);
    shape.quadraticCurveTo(-0.6, 0.8, 0, 0);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Organic swaying motion in wind
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 1.5 + position[0]) * 0.25;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 1.2 + position[1]) * 0.35;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.8 + position[2]) * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.3;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={leafGeometry}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Swarm of Bioluminescent Firefly Particles that react to pointer
function FireflySwarm({ count = 180, color = "#34d399" }) {
  const pointsRef = useRef();

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 20;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }
    return [pos, init];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const { pointer } = state;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Organic undulating flow
      posArray[idx] = initialPositions[idx] + Math.sin(time * 0.5 + i * 0.3) * 1.5;
      posArray[idx + 1] = initialPositions[idx + 1] + Math.cos(time * 0.8 + i * 0.2) * 1.2;
      posArray[idx + 2] = initialPositions[idx + 2] + Math.sin(time * 0.6 + i * 0.4) * 1.0;

      // Mouse influence: gentle pull towards pointer
      const dx = pointer.x * 6 - posArray[idx];
      const dy = pointer.y * 6 - posArray[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        posArray[idx] += dx * 0.02;
        posArray[idx + 1] += dy * 0.02;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color={color}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Scene Composition
function Scene({ preset = 'emerald' }) {
  // Leaf cluster positions
  const leaves = useMemo(() => {
    const list = [];
    const colors = preset === 'dawn'
      ? ['#f59e0b', '#10b981', '#fbbf24', '#059669', '#d97706']
      : preset === 'night'
      ? ['#065f46', '#047857', '#022c22', '#10b981', '#34d399']
      : ['#10b981', '#059669', '#34d399', '#047857', '#6ee7b7'];

    for (let i = 0; i < 28; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 14 - 2,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: Math.random() * 0.45 + 0.35,
        color: colors[i % colors.length],
      });
    }
    return list;
  }, [preset]);

  const lightColor = preset === 'dawn' ? '#fde68a' : preset === 'night' ? '#34d399' : '#a7f3d0';

  return (
    <>
      <ambientLight intensity={preset === 'night' ? 0.3 : 0.8} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={preset === 'night' ? 0.8 : 2.2}
        color={lightColor}
      />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#10b981" />

      {preset === 'night' && <Stars radius={80} depth={40} count={3000} factor={4} saturation={0} fade speed={1} />}

      <Sparkles
        count={70}
        scale={16}
        size={2.5}
        speed={0.4}
        opacity={0.6}
        color={preset === 'dawn' ? '#fbbf24' : '#10b981'}
      />

      {leaves.map((leaf, index) => (
        <Float
          key={index}
          speed={1.5}
          rotationIntensity={1}
          floatIntensity={1.5}
          floatingRange={[-0.3, 0.3]}
        >
          <LeafMesh {...leaf} />
        </Float>
      ))}

      <FireflySwarm
        count={220}
        color={preset === 'dawn' ? '#fbbf24' : preset === 'night' ? '#6ee7b7' : '#34d399'}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.3}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function ThreeScene() {
  const [preset, setPreset] = useState('emerald');

  return (
    <section
      id="three-realm"
      className="relative w-full min-h-screen py-24 bg-nature-darkest text-slate-100 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

      {/* Floating Section Title & HUD */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-8 pointer-events-none">
        <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-emerald-300 font-mono text-xs tracking-widest uppercase mb-3 border border-emerald-500/30">
          <SparklesIcon className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>04 // 3D REALM • INTERACTIVE THREE.JS NATURE EXPERIENCE</span>
        </div>
        <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
          LIVING <span className="text-gradient-emerald">BIOSPHERE</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto">
          An interactive procedural Three.js ecosystem. Move your mouse or drag to interact with floating leaves and glowing bioluminescent firefly swarms.
        </p>
      </div>

      {/* Interactive Controls Pill */}
      <div className="relative z-30 flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setPreset('emerald')}
          className={`interactive-item flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
            preset === 'emerald'
              ? 'bg-emerald-500 text-nature-darkest font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'glass-panel text-slate-300 hover:text-emerald-300'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Lush Canopy</span>
        </button>

        <button
          onClick={() => setPreset('dawn')}
          className={`interactive-item flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
            preset === 'dawn'
              ? 'bg-amber-400 text-nature-darkest font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)]'
              : 'glass-panel text-slate-300 hover:text-amber-300'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Golden Dawn</span>
        </button>

        <button
          onClick={() => setPreset('night')}
          className={`interactive-item flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
            preset === 'night'
              ? 'bg-emerald-400 text-nature-darkest font-bold shadow-[0_0_20px_rgba(52,211,153,0.5)]'
              : 'glass-panel text-slate-300 hover:text-emerald-300'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Night Fireflies</span>
        </button>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative z-10 w-full h-[620px] max-w-6xl mx-auto rounded-3xl overflow-hidden glass-panel border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Scene preset={preset} />
        </Canvas>

        {/* Canvas overlay instructions */}
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none text-[11px] font-mono text-emerald-400/60 uppercase tracking-widest">
          Click & Drag to Rotate Camera • Move Mouse to Attract Bioluminescent Swarm
        </div>
      </div>
    </section>
  );
}

