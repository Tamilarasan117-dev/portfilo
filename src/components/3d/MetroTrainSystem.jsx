import React, { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function MetroTrainSystem() {
  const trainGroupRef = useRef()
  const frontHeadlightsRef = useRef()
  const rearTaillightsRef = useRef()

  // Track & Bridge Parameters
  const bridgeX = 22
  const bridgeY = 16
  const trackLength = 260
  const stationZ = 0
  const stationLength = 48

  // Transit Simulation State
  // Modes: 'CRUISING' | 'DECELERATING' | 'STOPPED' | 'ACCELERATING'
  const trainState = useRef({
    z: -120,
    speed: 28, // units / sec
    maxSpeed: 28,
    mode: 'CRUISING',
    stopTimer: 0,
    stopDuration: 4.8
  })

  const [stationStatusText, setStationStatusText] = useState('TRANSIT RUNNING')

  // Bridge piers positions
  const piers = useMemo(() => {
    const list = []
    for (let z = -120; z <= 120; z += 24) {
      // Leave space directly under the station center
      if (Math.abs(z - stationZ) < 8) continue
      list.push(z)
    }
    return list
  }, [stationZ])

  useFrame((_, delta) => {
    if (!trainGroupRef.current) return

    const ts = trainState.current
    const dt = Math.min(delta, 0.05)

    // Automated Transit State Machine
    if (ts.mode === 'CRUISING') {
      ts.z += ts.speed * dt
      // When approaching station (e.g. at Z = -35)
      if (ts.z >= stationZ - 36 && ts.z < stationZ) {
        ts.mode = 'DECELERATING'
        setStationStatusText('ARRIVING // PLATFORM 1')
      }
    } else if (ts.mode === 'DECELERATING') {
      // Smooth deceleration curve towards station center
      const distToStop = Math.max(0.1, stationZ - ts.z)
      ts.speed = Math.max(3.5, (distToStop / 36) * ts.maxSpeed)
      ts.z += ts.speed * dt

      if (ts.z >= stationZ - 0.5) {
        ts.z = stationZ
        ts.speed = 0
        ts.mode = 'STOPPED'
        ts.stopTimer = 0
        setStationStatusText('DOORS OPEN // BOARDING')
      }
    } else if (ts.mode === 'STOPPED') {
      ts.stopTimer += dt
      if (ts.stopTimer >= ts.stopDuration) {
        ts.mode = 'ACCELERATING'
        setStationStatusText('DEPARTING // NEXT STOP CENTRAL')
      }
    } else if (ts.mode === 'ACCELERATING') {
      ts.speed += 8.5 * dt
      ts.z += ts.speed * dt
      if (ts.speed >= ts.maxSpeed) {
        ts.speed = ts.maxSpeed
        ts.mode = 'CRUISING'
        setStationStatusText('ALL CLEAR // ON TIME')
      }
    }

    // Reset loop when reaching end of elevated line
    if (ts.z > 130) {
      ts.z = -130
      ts.speed = ts.maxSpeed
      ts.mode = 'CRUISING'
    }

    // Apply position
    trainGroupRef.current.position.set(bridgeX, bridgeY + 0.6, ts.z)
  })

  return (
    <group>
      {/* 1. ELEVATED VIADUCT / RAIL BRIDGE STRUCTURE */}
      {/* Bridge Deck Girder Spanning North to South */}
      <mesh position={[bridgeX, bridgeY - 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 1.2, trackLength]} />
        <meshStandardMaterial color="#1a202c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Dual Steel Running Rails */}
      <mesh position={[bridgeX - 1.2, bridgeY + 0.25, 0]}>
        <boxGeometry args={[0.15, 0.2, trackLength]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[bridgeX + 1.2, bridgeY + 0.25, 0]}>
        <boxGeometry args={[0.15, 0.2, trackLength]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Blue LED Track Guide Strips */}
      <mesh position={[bridgeX - 3.2, bridgeY + 0.22, 0]}>
        <boxGeometry args={[0.08, 0.06, trackLength]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[bridgeX + 3.2, bridgeY + 0.22, 0]}>
        <boxGeometry args={[0.08, 0.06, trackLength]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Side Safety Barriers */}
      <mesh position={[bridgeX - 3.3, bridgeY + 0.8, 0]}>
        <boxGeometry args={[0.12, 0.9, trackLength]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      <mesh position={[bridgeX + 3.3, bridgeY + 0.8, 0]}>
        <boxGeometry args={[0.12, 0.9, trackLength]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Concrete Support Piers / Pillars Down to Ground */}
      {piers.map((z, idx) => (
        <group key={idx} position={[bridgeX, 0, z]}>
          {/* Main T-Column Pier */}
          <mesh position={[0, bridgeY / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 1.2, bridgeY, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.3} />
          </mesh>
          {/* Top T-Crosshead Girder Support */}
          <mesh position={[0, bridgeY - 0.7, 0]} castShadow>
            <boxGeometry args={[7.2, 1.4, 2.2]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Pier Base Foundation */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[3.2, 1.0, 3.2]} />
            <meshStandardMaterial color="#0b0f19" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 2. ELEVATED METRO STATION PLATFORM */}
      <group position={[bridgeX, bridgeY, stationZ]}>
        {/* Main Station Floor Platform */}
        <mesh position={[0, 0.3, 0]} receiveShadow>
          <boxGeometry args={[11, 0.6, stationLength]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Yellow Safety Tactile Edge Strip */}
        <mesh position={[-4.8, 0.62, 0]}>
          <boxGeometry args={[0.4, 0.04, stationLength]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
        <mesh position={[4.8, 0.62, 0]}>
          <boxGeometry args={[0.4, 0.04, stationLength]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>

        {/* Station Arched Glass & Steel Roof Canopy */}
        <group position={[0, 5.2, 0]}>
          {/* Center Vault Canopy */}
          <mesh castShadow>
            <boxGeometry args={[13.5, 0.25, stationLength + 4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Glass Skylight Inserts */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[8, 0.1, stationLength]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              transparent
              opacity={0.35}
              roughness={0.1}
              transmission={0.8}
            />
          </mesh>
        </group>

        {/* Station Columns */}
        {[-16, 0, 16].map((sz, i) => (
          <group key={i} position={[0, 2.8, sz]}>
            <mesh position={[-5.8, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 5, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
            <mesh position={[5.8, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 5, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Station Billboard Signage */}
        <group position={[0, 4.4, 0]}>
          <mesh>
            <boxGeometry args={[9, 1.4, 0.2]} />
            <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.8} />
          </mesh>
          <Text
            position={[0, 0.25, 0.12]}
            fontSize={0.48}
            color="#00f0ff"
            anchorX="center"
            anchorY="middle"
          >
            TAMILARASAN METRO TERMINAL
          </Text>
          <Text
            position={[0, -0.3, 0.12]}
            fontSize={0.28}
            color="#facc15"
            anchorX="center"
            anchorY="middle"
          >
            {`// STATUS: ${stationStatusText} //`}
          </Text>
        </group>

        {/* Elevator & Skybridge Shaft Connecting Down to Ground */}
        <group position={[7.5, -bridgeY / 2 + 0.3, 0]}>
          {/* Glass Elevator Tower */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.2, bridgeY, 4.2]} />
            <meshPhysicalMaterial
              color="#0284c7"
              transparent
              opacity={0.35}
              roughness={0.1}
              transmission={0.85}
            />
          </mesh>
          {/* Frame Struts */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.3, bridgeY, 4.3]} />
            <meshStandardMaterial color="#0f172a" wireframe />
          </mesh>
          {/* Connecting Walkway to Station */}
          <mesh position={[-2.2, bridgeY / 2 - 0.2, 0]}>
            <boxGeometry args={[2.8, 0.4, 3.2]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      </group>

      {/* 3. AUTOMATED FUTURISTIC HIGH-SPEED METRO BULLET TRAIN */}
      <group ref={trainGroupRef}>
        {/* Car 1: Front Locomotive Cab (facing South +Z) */}
        <group position={[0, 1.3, 14]}>
          {/* Body */}
          <mesh castShadow>
            <boxGeometry args={[2.6, 2.4, 9]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          {/* Aerodynamic Tapered Nose */}
          <mesh position={[0, -0.15, 5.2]} rotation={[0.35, 0, 0]} castShadow>
            <boxGeometry args={[2.55, 1.8, 2.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          {/* Cockpit Visor / Glass */}
          <mesh position={[0, 0.45, 5.2]} rotation={[0.55, 0, 0]}>
            <planeGeometry args={[2.3, 1.2]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
          {/* Train Front Projector Headlights */}
          <mesh position={[-0.8, -0.4, 6.2]}>
            <boxGeometry args={[0.35, 0.15, 0.1]} />
            <meshBasicMaterial color="#e0f2fe" />
          </mesh>
          <mesh position={[0.8, -0.4, 6.2]}>
            <boxGeometry args={[0.35, 0.15, 0.1]} />
            <meshBasicMaterial color="#e0f2fe" />
          </mesh>
          {/* Track Forward Illumination SpotLight */}
          <spotLight
            position={[0, 0, 6.5]}
            target-position={[0, -1, 35]}
            intensity={9.0}
            color="#bae6fd"
            angle={0.5}
            penumbra={0.6}
            distance={50}
          />
          {/* Side Glowing Windows */}
          <mesh position={[-1.32, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[7.2, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[1.32, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[7.2, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          {/* Cyan Brand Livery Stripe */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.64, 0.25, 9.1]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Car 2: Passenger Car Middle 1 */}
        <group position={[0, 1.3, 4.6]}>
          <mesh castShadow>
            <boxGeometry args={[2.6, 2.4, 9.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          <mesh position={[-1.32, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[8.4, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[1.32, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[8.4, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.64, 0.25, 9.3]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Car 3: Passenger Car Middle 2 */}
        <group position={[0, 1.3, -4.8]}>
          <mesh castShadow>
            <boxGeometry args={[2.6, 2.4, 9.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          <mesh position={[-1.32, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[8.4, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[1.32, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[8.4, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.64, 0.25, 9.3]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Car 4: Rear Locomotive Cab */}
        <group position={[0, 1.3, -14.2]}>
          <mesh castShadow>
            <boxGeometry args={[2.6, 2.4, 9]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          {/* Tapered Rear Nose */}
          <mesh position={[0, -0.15, -5.2]} rotation={[-0.35, 0, 0]} castShadow>
            <boxGeometry args={[2.55, 1.8, 2.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.88} roughness={0.15} />
          </mesh>
          {/* Rear Red LED Taillights */}
          <mesh position={[-0.8, -0.35, -6.2]}>
            <boxGeometry args={[0.35, 0.15, 0.1]} />
            <meshBasicMaterial color="#ff0033" />
          </mesh>
          <mesh position={[0.8, -0.35, -6.2]}>
            <boxGeometry args={[0.35, 0.15, 0.1]} />
            <meshBasicMaterial color="#ff0033" />
          </mesh>
          <pointLight position={[0, 0, -6.6]} intensity={2.5} color="#ff0033" distance={12} />
          <mesh position={[-1.32, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[7.2, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[1.32, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[7.2, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2.64, 0.25, 9.1]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Undercarriage Maglev Glow */}
        <pointLight position={[0, 0.2, 0]} intensity={3.5} color="#38bdf8" distance={6} />
      </group>
    </group>
  )
}
