import React, { useMemo } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { createBuildingWindowTexture } from '../../utils/proceduralTextures'

function generateCityBlocks() {
  const buildings = []

  // Left Boulevard City Blocks
  for (let z = -90; z <= 100; z += 18) {
    for (let x = -80; x <= -20; x += 18) {
      if (Math.abs(z - -25) < 9 && Math.abs(x - -35) < 14) continue
      if (Math.abs(z - 15) < 9 && Math.abs(x - -45) < 14) continue
      if (Math.abs(z - 50) < 9 && Math.abs(x - -35) < 14) continue
      if (Math.abs(x) < 13) continue

      const height = 30 + ((Math.sin(x * 12.3 + z * 45.1) * 10000) % 65) + 25
      const width = 11 + ((Math.cos(x * 7.1 + z * 3.3) * 10000) % 4)
      const depth = 11 + ((Math.sin(z * 9.2 + x * 2.1) * 10000) % 4)
      
      const neonHue = ['#00f0ff', '#8b5cf6', '#3b82f6', '#ff007f', '#10b981'][
        Math.abs(Math.floor(x * 3 + z * 7)) % 5
      ]

      buildings.push({
        id: `bld_l_${x}_${z}`,
        x,
        y: height / 2,
        z,
        width,
        height,
        depth,
        neonHue,
        variant: Math.abs(Math.floor(x + z)) % 4,
        hasSign: Math.abs(x) < 32 && Math.random() > 0.45
      })
    }
  }

  // Right Boulevard City Blocks (Offset to keep the Elevated Metro corridor at X=22 clear)
  for (let z = -90; z <= 100; z += 18) {
    for (let x = 32; x <= 86; x += 18) {
      if (Math.abs(x - 22) < 6) continue // Keep metro viaduct clear
      if (Math.abs(z - -25) < 9 && Math.abs(x - 35) < 14) continue
      if (Math.abs(z - 15) < 9 && Math.abs(x - 45) < 14) continue
      if (Math.abs(z - 50) < 9 && Math.abs(x - 35) < 14) continue
      if (Math.abs(z - 75) < 18 && Math.abs(x) < 24) continue
      if (Math.abs(x) < 13) continue

      const height = 30 + ((Math.cos(x * 15.3 + z * 32.1) * 10000) % 65) + 25
      const width = 11 + ((Math.sin(x * 8.1 + z * 4.3) * 10000) % 4)
      const depth = 11 + ((Math.cos(z * 6.2 + x * 5.1) * 10000) % 4)
      
      const neonHue = ['#00f0ff', '#8b5cf6', '#3b82f6', '#ff007f', '#f59e0b'][
        Math.abs(Math.floor(x * 5 + z * 2)) % 5
      ]

      buildings.push({
        id: `bld_r_${x}_${z}`,
        x,
        y: height / 2,
        z,
        width,
        height,
        depth,
        neonHue,
        variant: Math.abs(Math.floor(x + z)) % 4,
        hasSign: Math.abs(x) < 32 && Math.random() > 0.45
      })
    }
  }

  return buildings
}

const SIGN_TEXTS = [
  "TAMILARASAN",
  "AI AGENTS",
  "OLLAMA CORE",
  "FULL-STACK",
  "INDOTECH",
  "INNOVATION",
  "CYBER MATRIX",
  "DSA PROTOCOL"
]

export function Buildings() {
  const cityBuildings = useMemo(() => generateCityBlocks(), [])

  // Create 4 window texture variants
  const windowTextures = useMemo(() => {
    return [
      createBuildingWindowTexture(0),
      createBuildingWindowTexture(1),
      createBuildingWindowTexture(2),
      createBuildingWindowTexture(3)
    ]
  }, [])

  return (
    <group>
      {cityBuildings.map((b, i) => {
        const winTex = windowTextures[b.variant]

        return (
          <group key={b.id} position={[b.x, 0, b.z]}>
            {/* Main Skyscraper Monolith with Window Facade */}
            <mesh position={[0, b.y, 0]} castShadow receiveShadow>
              <boxGeometry args={[b.width, b.height, b.depth]} />
              <meshStandardMaterial
                map={winTex}
                roughness={0.2}
                metalness={0.65}
              />
            </mesh>

            {/* Architectural Concrete Floor Ledges */}
            <mesh position={[0, b.height + 0.2, 0]}>
              <boxGeometry args={[b.width + 0.35, 0.4, b.depth + 0.35]} />
              <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Glowing Vertical Architectural Neon Strip */}
            <mesh position={[b.width / 2 + 0.05, b.y, 0]}>
              <boxGeometry args={[0.08, b.height * 0.9, 0.4]} />
              <meshBasicMaterial color={b.neonHue} />
            </mesh>

            {/* Rooftop Industrial HVAC Plant / Mechanical Equipment */}
            <group position={[0, b.height + 1.2, 0]}>
              <mesh position={[-b.width * 0.2, 0, 0]} castShadow>
                <boxGeometry args={[2.5, 1.8, 3]} />
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh position={[b.width * 0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[1.2, 1.2, 2.2, 16]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
              </mesh>
            </group>

            {/* Rooftop Communications Antenna Mast with Red Aviation Warning Light */}
            <mesh position={[0, b.height + 5.5, 0]}>
              <cylinderGeometry args={[0.08, 0.22, 10, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, b.height + 10.6, 0]}>
              <sphereGeometry args={[0.24, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>

            {/* High-Resolution Illuminated Neon Billboard */}
            {b.hasSign && (
              <group position={[0, b.height * 0.72, b.depth / 2 + 0.35]}>
                <mesh>
                  <boxGeometry args={[b.width * 0.85, 2.5, 0.2]} />
                  <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
                </mesh>
                <Text
                  position={[0, 0, 0.16]}
                  fontSize={0.85}
                  color={b.neonHue}
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.05}
                  outlineColor="#000000"
                >
                  {SIGN_TEXTS[i % SIGN_TEXTS.length]}
                </Text>
              </group>
            )}
          </group>
        )
      })}

      {/* SPECIAL LANDMARK: Contact Cyber Garage Hangar at [0, 0, 85] */}
      <group position={[0, 0, 85]}>
        <mesh position={[0, 7, 0]} castShadow receiveShadow>
          <boxGeometry args={[30, 14, 18]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Large Hangar Door Opening */}
        <mesh position={[0, 5.5, -9.1]}>
          <boxGeometry args={[20, 11, 0.4]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Neon Garage Banner */}
        <mesh position={[0, 12, -9.2]}>
          <boxGeometry args={[24, 2.4, 0.3]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        <Text
          position={[0, 12, -9.4]}
          fontSize={1.4}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          TAMILARASAN CYBER GARAGE
        </Text>
      </group>
    </group>
  )
}
