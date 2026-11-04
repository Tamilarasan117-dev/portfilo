import React, { useMemo } from 'react'

export function StreetDetails() {
  // Placement along the sidewalks
  const palms = useMemo(() => {
    const list = []
    for (let z = -75; z <= 65; z += 18) {
      list.push({ x: -12.2, z })
      list.push({ x: 12.2, z })
    }
    return list
  }, [])

  const hydrants = useMemo(() => {
    return [
      { x: -10.2, z: -35 },
      { x: 10.2, z: -5 },
      { x: -10.2, z: 25 },
      { x: 10.2, z: 55 }
    ]
  }, [])

  const bollards = useMemo(() => {
    const list = []
    for (let z = -85; z <= 75; z += 6) {
      list.push({ x: -9.2, z })
      list.push({ x: 9.2, z })
    }
    return list
  }, [])

  return (
    <group>
      {/* 1. Cyberpunk Neon Palm Trees along Boulevards (from car.jpg) */}
      {palms.map((p, idx) => (
        <group key={`palm_${idx}`} position={[p.x, 0, p.z]}>
          {/* Slender Trunk */}
          <mesh position={[0, 3.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.25, 7, 8]} />
            <meshStandardMaterial color="#292524" roughness={0.9} />
          </mesh>
          {/* Trunk Neon Base Ring */}
          <mesh position={[0, 0.15, 0]}>
            <torusGeometry args={[0.35, 0.04, 6, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          {/* Stylized Geometric Palm Fronds */}
          <group position={[0, 7, 0]}>
            {[0, 60, 120, 180, 240, 300].map((deg, fIdx) => {
              const rad = (deg * Math.PI) / 180
              return (
                <group key={fIdx} rotation={[0.4, rad, 0]}>
                  <mesh position={[0, 0.4, 1.4]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[0.45, 0.04, 2.4]} />
                    <meshStandardMaterial color="#065f46" roughness={0.6} />
                  </mesh>
                  {/* Glowing Frond Vein */}
                  <mesh position={[0, 0.43, 1.4]} rotation={[-0.3, 0, 0]}>
                    <boxGeometry args={[0.04, 0.05, 2.2]} />
                    <meshBasicMaterial color="#10b981" />
                  </mesh>
                </group>
              )
            })}
          </group>
        </group>
      ))}

      {/* 2. Red City Fire Hydrants (from car.jpg right sidewalk) */}
      {hydrants.map((h, idx) => (
        <group key={`hydrant_${idx}`} position={[h.x, 0.1, h.z]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 0.7, 10]} />
            <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.75, 0]} castShadow>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#ef4444" metalness={0.8} />
          </mesh>
          {/* Side nozzles */}
          <mesh position={[0.16, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          <mesh position={[-0.16, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 3. Safety Roadside Bollards with Reflective Rings */}
      {bollards.map((b, idx) => (
        <group key={`bollard_${idx}`} position={[b.x, 0.1, b.z]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.7, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.08, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      ))}

      {/* 4. High-Tech Glass Transit Shelters */}
      {[-40, 40].map((z, idx) => (
        <group key={`shelter_${idx}`} position={[-12.2, 0.1, z]}>
          {/* Roof */}
          <mesh position={[0, 2.8, 0]}>
            <boxGeometry args={[2.8, 0.1, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          {/* Glass Back Wall */}
          <mesh position={[-1.2, 1.4, 0]}>
            <boxGeometry args={[0.08, 2.7, 5.8]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              transparent
              opacity={0.35}
              roughness={0.1}
              transmission={0.8}
            />
          </mesh>
          {/* Illuminated Ad Display */}
          <mesh position={[0.8, 1.4, 2.9]}>
            <boxGeometry args={[0.1, 2.4, 1.4]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

