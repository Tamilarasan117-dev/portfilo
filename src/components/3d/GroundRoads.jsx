import React, { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { createAsphaltTexture } from '../../utils/proceduralTextures'

export function GroundRoads() {
  const asphaltTexture = useMemo(() => createAsphaltTexture(), [])

  // Guardrail reflectors along the main boulevard
  const guardrails = useMemo(() => {
    const list = []
    for (let z = -90; z <= 80; z += 12) {
      list.push(z)
    }
    return list
  }, [])

  return (
    <group>
      {/* 1. Surrounding Dark Wet City Pavement Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 10]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial
          color="#080b12"
          roughness={0.28}
          metalness={0.4}
        />
      </mesh>

      {/* 2. Main High-Detail North-South Grand Boulevard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 10]} receiveShadow>
        <planeGeometry args={[18, 240]} />
        <meshStandardMaterial
          map={asphaltTexture}
          roughness={0.18}
          metalness={0.45}
        />
      </mesh>

      {/* Raised Concrete Sidewalks with Polished Curbs */}
      <mesh position={[-11, 0.1, 10]} receiveShadow>
        <boxGeometry args={[4, 0.2, 240]} />
        <meshStandardMaterial color="#1a2233" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[11, 0.1, 10]} receiveShadow>
        <boxGeometry args={[4, 0.2, 240]} />
        <meshStandardMaterial color="#1a2233" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Polished Cyan Curb Guide Strips */}
      <mesh position={[-9.05, 0.21, 10]}>
        <boxGeometry args={[0.08, 0.04, 240]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[9.05, 0.21, 10]}>
        <boxGeometry args={[0.08, 0.04, 240]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Metal Highway Guardrails with Reflectors */}
      <mesh position={[-12.8, 0.55, 10]}>
        <boxGeometry args={[0.12, 0.45, 240]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[12.8, 0.55, 10]}>
        <boxGeometry args={[0.12, 0.45, 240]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {guardrails.map((z, idx) => (
        <group key={idx}>
          {/* Left Post & Reflector */}
          <mesh position={[-12.8, 0.3, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          <mesh position={[-12.72, 0.6, z]}>
            <boxGeometry args={[0.04, 0.08, 0.15]} />
            <meshBasicMaterial color="#eab308" />
          </mesh>

          {/* Right Post & Reflector */}
          <mesh position={[12.8, 0.3, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          <mesh position={[12.72, 0.6, z]}>
            <boxGeometry args={[0.04, 0.08, 0.15]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      ))}

      {/* 3. Cross Avenues Connecting 7 Districts */}
      {/* Avenue North (Z = -25) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -25]} receiveShadow>
        <planeGeometry args={[180, 15]} />
        <meshStandardMaterial color="#0e131d" roughness={0.25} metalness={0.35} />
      </mesh>
      {/* Avenue Mid (Z = 15) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 15]} receiveShadow>
        <planeGeometry args={[180, 15]} />
        <meshStandardMaterial color="#0e131d" roughness={0.25} metalness={0.35} />
      </mesh>
      {/* Avenue South (Z = 50) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 50]} receiveShadow>
        <planeGeometry args={[180, 15]} />
        <meshStandardMaterial color="#0e131d" roughness={0.25} metalness={0.35} />
      </mesh>

      {/* 4. Overhead Highway Traffic Gantry Sign (Z = -5) */}
      <group position={[0, 0, -5]}>
        {/* Support Trusses */}
        <mesh position={[-12, 4.5, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 9, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[12, 4.5, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 9, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Horizontal Overhead Truss Beam */}
        <mesh position={[0, 8.8, 0]}>
          <boxGeometry args={[24.5, 0.8, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Digital Matrix Sign Board */}
        <mesh position={[0, 8.8, -0.45]}>
          <boxGeometry args={[14, 2.2, 0.15]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
        </mesh>
        <Text
          position={[0, 9.2, -0.55]}
          fontSize={0.65}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          TAMILARASAN METROPOLIS
        </Text>
        <Text
          position={[0, 8.35, -0.55]}
          fontSize={0.38}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          // FULL-STACK SPEEDWAY • SPEED LIMIT: UNRESTRICTED //
        </Text>
      </group>

      {/* Overhead Cyber Skybridge at Z = 32 (Inspired by car2.jpg) */}
      <group position={[0, 0, 32]}>
        <mesh position={[0, 14, 0]}>
          <boxGeometry args={[36, 4.5, 5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Skybridge Glass Window Panels */}
        <mesh position={[0, 14, 2.52]}>
          <planeGeometry args={[34, 2.5]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 14, -2.52]}>
          <planeGeometry args={[34, 2.5]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  )
}
