import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Character({ position = [-1.8, 0, 0], rotation = [0, Math.PI / 3, 0] }) {
  const characterRef = useRef()

  useFrame((state) => {
    if (characterRef.current) {
      // Subtle idle breathing & stance motion
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 2.2) * 0.015
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <group ref={characterRef}>
        {/* Boots */}
        <mesh position={[-0.15, 0.12, 0]} castShadow>
          <boxGeometry args={[0.18, 0.24, 0.32]} />
          <meshStandardMaterial color="#090d16" roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.12, 0]} castShadow>
          <boxGeometry args={[0.18, 0.24, 0.32]} />
          <meshStandardMaterial color="#090d16" roughness={0.7} />
        </mesh>

        {/* Legs / Tech Pants */}
        <mesh position={[-0.15, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 0.62, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        <mesh position={[0.15, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 0.62, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>

        {/* Belt & Waist */}
        <mesh position={[0, 0.86, 0]}>
          <boxGeometry args={[0.46, 0.08, 0.26]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>

        {/* Torso & Cyber Jacket */}
        <mesh position={[0, 1.22, 0]} castShadow>
          <boxGeometry args={[0.52, 0.64, 0.3]} />
          <meshStandardMaterial color="#0369a1" metalness={0.3} roughness={0.4} />
        </mesh>

        {/* Jacket Neon Accents */}
        <mesh position={[0, 1.22, 0.16]}>
          <boxGeometry args={[0.04, 0.58, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.34, 1.15, 0]} rotation={[0, 0, 0.15]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.55, 8]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0.34, 1.15, 0]} rotation={[0, 0, -0.15]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.55, 8]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>

        {/* Head & Cyber Visor */}
        <group position={[0, 1.7, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Glowing Visor */}
          <mesh position={[0, 0.02, 0.13]}>
            <boxGeometry args={[0.22, 0.06, 0.08]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

