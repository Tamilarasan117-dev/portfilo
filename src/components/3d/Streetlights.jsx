import React, { useMemo } from 'react'

export function Streetlights() {
  // Placement along main boulevard
  const lights = useMemo(() => {
    const list = []
    for (let z = -80; z <= 70; z += 20) {
      list.push({ x: -9.5, z, rotY: Math.PI / 2 })
      list.push({ x: 9.5, z, rotY: -Math.PI / 2 })
    }
    return list
  }, [])

  return (
    <group>
      {lights.map((l, idx) => (
        <group key={idx} position={[l.x, 0, l.z]} rotation={[0, l.rotY, 0]}>
          {/* Vertical Pole */}
          <mesh position={[0, 3.5, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 7, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Top Overhang Arm */}
          <mesh position={[0.7, 7, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.06, 0.08, 1.6, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Luminaire Lamp Head */}
          <mesh position={[1.4, 7.3, 0]}>
            <boxGeometry args={[0.6, 0.12, 0.3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glowing Emissive Bulb Lens */}
          <mesh position={[1.4, 7.23, 0]}>
            <boxGeometry args={[0.5, 0.04, 0.22]} />
            <meshBasicMaterial color="#a5f3fc" />
          </mesh>
          {/* Soft Downlight Cone */}
          <mesh position={[1.4, 3.6, 0]}>
            <coneGeometry args={[2.5, 7.2, 12, 1, true]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.06}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

