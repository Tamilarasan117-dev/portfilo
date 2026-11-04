import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Single bird with articulated wings and banking dynamics
function SingleBird({ birdConfig }) {
  const birdRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()

  const { offsetRadius, altitude, speed, flapRate, phaseOffset } = birdConfig

  useFrame((state) => {
    if (!birdRef.current) return

    const time = state.clock.elapsedTime * speed + phaseOffset
    const tWing = state.clock.elapsedTime * flapRate + phaseOffset

    // Smooth orbital / flight path over city
    const x = Math.sin(time) * offsetRadius
    const z = Math.cos(time * 0.8) * (offsetRadius * 1.2) - 10
    const y = altitude + Math.sin(time * 1.5) * 4

    birdRef.current.position.set(x, y, z)

    // Compute heading / tangent velocity to orient bird forward
    const dx = Math.cos(time) * offsetRadius
    const dz = -Math.sin(time * 0.8) * (offsetRadius * 1.2) * 0.8
    const heading = Math.atan2(dx, dz)
    birdRef.current.rotation.y = heading

    // Banking into turns
    birdRef.current.rotation.z = Math.sin(time) * -0.35

    // Wing flapping animation: flap cycle with intermittent gliding
    const glideCycle = Math.sin(time * 0.5)
    if (glideCycle > 0.3) {
      // Gliding pose with subtle wing vibration
      if (leftWingRef.current) leftWingRef.current.rotation.z = 0.08 + Math.sin(tWing * 2) * 0.03
      if (rightWingRef.current) rightWingRef.current.rotation.z = -0.08 - Math.sin(tWing * 2) * 0.03
    } else {
      // Active flapping
      const flapAngle = Math.sin(tWing) * 0.65
      if (leftWingRef.current) leftWingRef.current.rotation.z = flapAngle
      if (rightWingRef.current) rightWingRef.current.rotation.z = -flapAngle
    }
  })

  return (
    <group ref={birdRef}>
      {/* Bird Body / Torso */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.22, 1.4, 6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Head / Beak */}
      <mesh position={[0, 0.05, 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.45, 5]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>

      {/* Left Wing */}
      <group position={[-0.12, 0.05, 0.1]}>
        <group ref={leftWingRef}>
          <mesh position={[-0.8, 0, 0]} rotation={[0, 0.15, 0]}>
            <boxGeometry args={[1.5, 0.03, 0.45]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Right Wing */}
      <group position={[0.12, 0.05, 0.1]}>
        <group ref={rightWingRef}>
          <mesh position={[0.8, 0, 0]} rotation={[0, -0.15, 0]}>
            <boxGeometry args={[1.5, 0.03, 0.45]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Tail Feathers */}
      <mesh position={[0, 0.02, -0.85]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.45, 0.02, 0.6]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

// Atmospheric Drifting Volumetric Clouds
function SingleCloud({ initialPos, scale = 1, speed = 0.5 }) {
  const cloudRef = useRef()

  useFrame((state, delta) => {
    if (!cloudRef.current) return
    // Slow cinematic drift across the sky
    cloudRef.current.position.x += delta * speed * 2.5
    if (cloudRef.current.position.x > 180) {
      cloudRef.current.position.x = -180
    }
    // Gentle rotation
    cloudRef.current.rotation.y += delta * 0.015
  })

  return (
    <group ref={cloudRef} position={initialPos} scale={scale}>
      {/* Clustered soft spherical cloud puffs */}
      {[
        [-6, 0, 0, 7.5],
        [0, 1.5, 0, 9.5],
        [6, -0.5, 0, 8.0],
        [-3, 3, 2, 6.5],
        [3, 2.5, -2, 7.0],
        [0, -1, 3, 6.0]
      ].map(([px, py, pz, radius], i) => (
        <mesh key={i} position={[px, py, pz]}>
          <sphereGeometry args={[radius, 10, 10]} />
          <meshStandardMaterial
            color="#334155"
            transparent
            opacity={0.22}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export function FlyingBirdsAndClouds() {
  // Bird Flock Configs
  const birdFlock = useMemo(() => {
    return [
      { id: 1, offsetRadius: 45, altitude: 48, speed: 0.32, flapRate: 8.5, phaseOffset: 0.0 },
      { id: 2, offsetRadius: 48, altitude: 51, speed: 0.32, flapRate: 9.0, phaseOffset: 0.3 },
      { id: 3, offsetRadius: 43, altitude: 47, speed: 0.32, flapRate: 8.2, phaseOffset: -0.25 },
      { id: 4, offsetRadius: 52, altitude: 53, speed: 0.32, flapRate: 8.8, phaseOffset: 0.55 },
      { id: 5, offsetRadius: 39, altitude: 45, speed: 0.32, flapRate: 9.2, phaseOffset: -0.5 },
      { id: 6, offsetRadius: 55, altitude: 56, speed: 0.32, flapRate: 8.0, phaseOffset: 0.8 },
      { id: 7, offsetRadius: 36, altitude: 44, speed: 0.32, flapRate: 9.1, phaseOffset: -0.8 },
      // Second high-altitude formation
      { id: 8, offsetRadius: 75, altitude: 68, speed: 0.22, flapRate: 7.5, phaseOffset: 2.1 },
      { id: 9, offsetRadius: 78, altitude: 71, speed: 0.22, flapRate: 7.8, phaseOffset: 2.4 },
      { id: 10, offsetRadius: 72, altitude: 66, speed: 0.22, flapRate: 7.2, phaseOffset: 1.8 }
    ]
  }, [])

  // Clouds Config
  const clouds = useMemo(() => {
    return [
      { id: 1, initialPos: [-120, 52, -40], scale: 1.4, speed: 0.4 },
      { id: 2, initialPos: [-40, 58, 50], scale: 1.8, speed: 0.5 },
      { id: 3, initialPos: [40, 62, -70], scale: 1.6, speed: 0.35 },
      { id: 4, initialPos: [110, 55, 30], scale: 1.5, speed: 0.45 },
      { id: 5, initialPos: [-20, 70, -10], scale: 2.2, speed: 0.3 }
    ]
  }, [])

  return (
    <group>
      {/* 1. Flock of Soaring Birds */}
      {birdFlock.map((b) => (
        <SingleBird key={b.id} birdConfig={b} />
      ))}

      {/* 2. Drifting Volumetric Night Sky Clouds */}
      {clouds.map((c) => (
        <SingleCloud
          key={c.id}
          initialPos={c.currentPos || c.initialPos}
          scale={c.scale}
          speed={c.speed}
        />
      ))}
    </group>
  )
}
