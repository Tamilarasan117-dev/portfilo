import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 12 Animated Pedestrians walking along sidewalks and crosswalks like GTA
function SinglePedestrian({ config }) {
  const groupRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const bodyRef = useRef()

  // Track position and direction
  const pos = useRef(new THREE.Vector3(...config.startPos))
  const dir = useRef(config.direction) // 1 or -1
  const phase = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const walkSpeed = config.speed || 2.4
    const dt = Math.min(delta, 0.05)
    phase.current += dt * walkSpeed * 3.2

    // Move along designated axis
    if (config.axis === 'z') {
      pos.current.z += dir.current * walkSpeed * dt
      // Turn around at path bounds
      if (pos.current.z > config.maxBound) {
        dir.current = -1
        groupRef.current.rotation.y = 0 // face south (-Z)
      } else if (pos.current.z < config.minBound) {
        dir.current = 1
        groupRef.current.rotation.y = Math.PI // face north (+Z)
      }
    } else if (config.axis === 'x') {
      // Crosswalk pedestrian
      pos.current.x += dir.current * walkSpeed * dt
      if (pos.current.x > config.maxBound) {
        dir.current = -1
        groupRef.current.rotation.y = -Math.PI / 2
      } else if (pos.current.x < config.minBound) {
        dir.current = 1
        groupRef.current.rotation.y = Math.PI / 2
      }
    }

    groupRef.current.position.copy(pos.current)

    // Realistic GTA Walking Cycle
    const sinPhase = Math.sin(phase.current)
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = sinPhase * 0.55
      rightLegRef.current.rotation.x = -sinPhase * 0.55
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -sinPhase * 0.45
      rightArmRef.current.rotation.x = sinPhase * 0.45
    }
    if (bodyRef.current) {
      // Torso bobbing on each step
      bodyRef.current.position.y = 0.85 + Math.abs(Math.sin(phase.current)) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={config.startPos} rotation={[0, config.initialRotationY, 0]}>
      {/* Upper Torso & Head Group */}
      <group ref={bodyRef} position={[0, 0.85, 0]}>
        {/* Torso Jacket/Hoodie */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[0.42, 0.54, 0.24]} />
          <meshStandardMaterial color={config.jacketColor} roughness={0.6} />
        </mesh>

        {/* Cyber Neon Trim on Jacket */}
        <mesh position={[0, 0.32, 0.13]}>
          <boxGeometry args={[0.04, 0.48, 0.02]} />
          <meshBasicMaterial color={config.neonAccent} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <sphereGeometry args={[0.13, 12, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Cyber Visor / Smart Eyewear */}
        <mesh position={[0, 0.72, 0.11]}>
          <boxGeometry args={[0.18, 0.05, 0.06]} />
          <meshBasicMaterial color={config.neonAccent} />
        </mesh>

        {/* Arms */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.28, 0.5, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
            <meshStandardMaterial color={config.jacketColor} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.28, 0.5, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
            <meshStandardMaterial color={config.jacketColor} />
          </mesh>
        </group>
      </group>

      {/* Legs */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.12, 0.82, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.065, 0.76, 8]} />
          <meshStandardMaterial color={config.pantsColor} roughness={0.7} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.76, 0.06]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.24]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.12, 0.82, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.065, 0.76, 8]} />
          <meshStandardMaterial color={config.pantsColor} roughness={0.7} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.76, 0.06]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.24]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
      </group>
    </group>
  )
}

export function Pedestrians() {
  // Diverse pedestrian squad with GTA-like walking behaviors
  const pedestriansList = useMemo(() => {
    return [
      // Left Sidewalk walkers (X = -11)
      { id: 1, startPos: [-11, 0.18, -60], axis: 'z', direction: 1, minBound: -75, maxBound: 70, speed: 2.3, initialRotationY: Math.PI, jacketColor: '#0284c7', pantsColor: '#1e293b', neonAccent: '#00f0ff' },
      { id: 2, startPos: [-11, 0.18, 20], axis: 'z', direction: -1, minBound: -70, maxBound: 65, speed: 2.1, initialRotationY: 0, jacketColor: '#7c3aed', pantsColor: '#0f172a', neonAccent: '#c084fc' },
      { id: 3, startPos: [-11, 0.18, -10], axis: 'z', direction: 1, minBound: -50, maxBound: 45, speed: 2.6, initialRotationY: Math.PI, jacketColor: '#e11d48', pantsColor: '#1e293b', neonAccent: '#ff0055' },
      { id: 4, startPos: [-11, 0.18, 55], axis: 'z', direction: -1, minBound: -40, maxBound: 75, speed: 1.9, initialRotationY: 0, jacketColor: '#059669', pantsColor: '#0f172a', neonAccent: '#10b981' },

      // Right Sidewalk walkers (X = 11)
      { id: 5, startPos: [11, 0.18, -45], axis: 'z', direction: 1, minBound: -75, maxBound: 70, speed: 2.2, initialRotationY: Math.PI, jacketColor: '#d97706', pantsColor: '#1e293b', neonAccent: '#f59e0b' },
      { id: 6, startPos: [11, 0.18, 10], axis: 'z', direction: -1, minBound: -65, maxBound: 60, speed: 2.5, initialRotationY: 0, jacketColor: '#4f46e5', pantsColor: '#0f172a', neonAccent: '#818cf8' },
      { id: 7, startPos: [11, 0.18, -15], axis: 'z', direction: 1, minBound: -60, maxBound: 50, speed: 2.0, initialRotationY: Math.PI, jacketColor: '#0284c7', pantsColor: '#1e293b', neonAccent: '#00f0ff' },
      { id: 8, startPos: [11, 0.18, 48], axis: 'z', direction: -1, minBound: -35, maxBound: 70, speed: 2.4, initialRotationY: 0, jacketColor: '#e11d48', pantsColor: '#0f172a', neonAccent: '#ff007f' },

      // Crosswalk Walkers crossing the street at intersections (Avenue 1: Z = -25, Avenue 2: Z = 15, Avenue 3: Z = 50)
      { id: 9, startPos: [-10, 0.05, -25], axis: 'x', direction: 1, minBound: -11, maxBound: 11, speed: 1.8, initialRotationY: Math.PI / 2, jacketColor: '#f8fafc', pantsColor: '#020617', neonAccent: '#38bdf8' },
      { id: 10, startPos: [10, 0.05, -24.2], axis: 'x', direction: -1, minBound: -11, maxBound: 11, speed: 2.0, initialRotationY: -Math.PI / 2, jacketColor: '#6366f1', pantsColor: '#1e293b', neonAccent: '#a855f7' },
      { id: 11, startPos: [-9, 0.05, 15], axis: 'x', direction: 1, minBound: -11, maxBound: 11, speed: 2.2, initialRotationY: Math.PI / 2, jacketColor: '#10b981', pantsColor: '#0f172a', neonAccent: '#34d399' },
      { id: 12, startPos: [9, 0.05, 50], axis: 'x', direction: -1, minBound: -11, maxBound: 11, speed: 1.9, initialRotationY: -Math.PI / 2, jacketColor: '#e11d48', pantsColor: '#1e293b', neonAccent: '#fb7185' }
    ]
  }, [])

  return (
    <group>
      {pedestriansList.map((cfg) => (
        <SinglePedestrian key={cfg.id} config={cfg} />
      ))}
    </group>
  )
}

