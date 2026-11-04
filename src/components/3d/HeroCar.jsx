import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { createCarbonFiberTexture, createBrakeRotorTexture } from '../../utils/proceduralTextures'

export function HeroCar({ vehicleState }) {
  const carGroup = useRef()
  const frontLeftWheelGroup = useRef()
  const frontRightWheelGroup = useRef()
  const rearLeftWheelMesh = useRef()
  const rearRightWheelMesh = useRef()
  const frontLeftWheelMesh = useRef()
  const frontRightWheelMesh = useRef()
  const taillightMat = useRef()
  const brakeLightGlow = useRef()
  const nitroFlamesGroup = useRef()

  // Procedural textures
  const carbonTexture = useMemo(() => createCarbonFiberTexture(), [])
  const rotorTexture = useMemo(() => createBrakeRotorTexture(), [])

  // Physical Automotive Multi-Stage Clearcoat Paint
  const carPaintMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8fafc'),
      metalness: 0.94,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    })
  }, [])

  // Carbon Fiber Material
  const carbonMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: carbonTexture,
      roughness: 0.35,
      metalness: 0.65
    })
  }, [carbonTexture])

  // Tinted Automotive Glass
  const glassMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#020617'),
      metalness: 0.95,
      roughness: 0.03,
      transmission: 0.68,
      transparent: true,
      ior: 1.54
    })
  }, [])

  // Update physics, rotation & wheel spins on each frame
  useFrame((state, delta) => {
    if (!vehicleState || !carGroup.current) return

    const { position, heading, steerAngle, speed, isBraking, isBoosting } = vehicleState

    // Set car position and heading
    carGroup.current.position.copy(position)
    carGroup.current.rotation.y = heading

    // Steer front wheels
    if (frontLeftWheelGroup.current && frontRightWheelGroup.current) {
      frontLeftWheelGroup.current.rotation.y = steerAngle
      frontRightWheelGroup.current.rotation.y = steerAngle
    }

    // Spin wheels according to speed
    const wheelSpin = (speed / 0.38) * delta
    if (frontLeftWheelMesh.current) frontLeftWheelMesh.current.rotation.x += wheelSpin
    if (frontRightWheelMesh.current) frontRightWheelMesh.current.rotation.x += wheelSpin
    if (rearLeftWheelMesh.current) rearLeftWheelMesh.current.rotation.x += wheelSpin
    if (rearRightWheelMesh.current) rearRightWheelMesh.current.rotation.x += wheelSpin

    // Dynamic chassis roll and pitch on turns and braking
    const targetChassisRoll = -steerAngle * (speed / 38) * 0.14
    const targetChassisPitch = isBraking ? -0.05 : (speed / 38) * 0.02
    carGroup.current.rotation.z = THREE.MathUtils.lerp(carGroup.current.rotation.z, targetChassisRoll, delta * 12)
    carGroup.current.rotation.x = THREE.MathUtils.lerp(carGroup.current.rotation.x, targetChassisPitch, delta * 12)

    // Brake light glow intensity
    if (taillightMat.current) {
      taillightMat.current.color.set(isBraking ? '#ff0033' : '#991b1b')
    }
    if (brakeLightGlow.current) {
      brakeLightGlow.current.intensity = isBraking ? 5.5 : 1.2
    }

    // Nitro flame flicker
    if (nitroFlamesGroup.current) {
      nitroFlamesGroup.current.visible = !!isBoosting
      if (isBoosting) {
        const flicker = 0.8 + Math.random() * 0.4
        nitroFlamesGroup.current.scale.set(flicker, flicker, flicker * 1.4)
      }
    }
  })

  return (
    <group ref={carGroup}>
      {/* 1. AERODYNAMIC CHASSIS & BODYWORK */}
      {/* Lower Main Tub */}
      <mesh position={[0, 0.42, 0]} material={carPaintMat} castShadow receiveShadow>
        <boxGeometry args={[2.08, 0.34, 4.5]} />
      </mesh>

      {/* Flared Wheel Arches / Fenders */}
      <mesh position={[-1.02, 0.44, -1.35]} material={carPaintMat} castShadow>
        <boxGeometry args={[0.22, 0.36, 1.1]} />
      </mesh>
      <mesh position={[1.02, 0.44, -1.35]} material={carPaintMat} castShadow>
        <boxGeometry args={[0.22, 0.36, 1.1]} />
      </mesh>
      <mesh position={[-1.04, 0.46, 1.35]} material={carPaintMat} castShadow>
        <boxGeometry args={[0.24, 0.38, 1.15]} />
      </mesh>
      <mesh position={[1.04, 0.46, 1.35]} material={carPaintMat} castShadow>
        <boxGeometry args={[0.24, 0.38, 1.15]} />
      </mesh>

      {/* Sloped Sculpted Hood */}
      <mesh position={[0, 0.52, -1.38]} rotation={[0.13, 0, 0]} material={carPaintMat} castShadow>
        <boxGeometry args={[1.92, 0.22, 1.65]} />
      </mesh>

      {/* Hood Dual Air Extraction Vents */}
      <mesh position={[-0.45, 0.63, -1.25]} rotation={[0.13, 0, 0]}>
        <boxGeometry args={[0.28, 0.04, 0.6]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 0.63, -1.25]} rotation={[0.13, 0, 0]}>
        <boxGeometry args={[0.28, 0.04, 0.6]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.7} />
      </mesh>

      {/* Front Carbon Fiber Splitter with Endplate Winglets */}
      <group position={[0, 0.2, -2.25]}>
        <mesh material={carbonMat} castShadow>
          <boxGeometry args={[2.14, 0.06, 0.42]} />
        </mesh>
        <mesh position={[-1.06, 0.12, 0]} material={carbonMat}>
          <boxGeometry args={[0.04, 0.18, 0.42]} />
        </mesh>
        <mesh position={[1.06, 0.12, 0]} material={carbonMat}>
          <boxGeometry args={[0.04, 0.18, 0.42]} />
        </mesh>
      </group>

      {/* Aerodynamic Side Rocker Skirts (Carbon) */}
      <mesh position={[-1.05, 0.23, 0]} material={carbonMat}>
        <boxGeometry args={[0.08, 0.08, 1.8]} />
      </mesh>
      <mesh position={[1.05, 0.23, 0]} material={carbonMat}>
        <boxGeometry args={[0.08, 0.08, 1.8]} />
      </mesh>

      {/* Cabin Greenhouse & Pillars */}
      <mesh position={[0, 0.88, 0.2]} material={carPaintMat} castShadow>
        <boxGeometry args={[1.44, 0.52, 2.05]} />
      </mesh>

      {/* Front Windshield (Tinted Glass) */}
      <mesh position={[0, 0.82, -0.85]} rotation={[0.52, 0, 0]} material={glassMat}>
        <planeGeometry args={[1.4, 0.82]} />
      </mesh>
      {/* Rear Sloped Window */}
      <mesh position={[0, 0.83, 1.25]} rotation={[-0.48, 0, 0]} material={glassMat}>
        <planeGeometry args={[1.38, 0.8]} />
      </mesh>
      {/* Side Windows */}
      <mesh position={[-0.73, 0.88, 0.2]} rotation={[0, -Math.PI / 2, 0]} material={glassMat}>
        <planeGeometry args={[1.8, 0.45]} />
      </mesh>
      <mesh position={[0.73, 0.88, 0.2]} rotation={[0, Math.PI / 2, 0]} material={glassMat}>
        <planeGeometry args={[1.8, 0.45]} />
      </mesh>

      {/* Interior Racing Bucket Seats & Steering Wheel */}
      <group position={[0, 0.6, 0.1]}>
        <mesh position={[-0.35, 0.1, 0]}>
          <boxGeometry args={[0.38, 0.45, 0.38]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[0.35, 0.1, 0]}>
          <boxGeometry args={[0.38, 0.45, 0.38]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <mesh position={[-0.35, 0.25, -0.32]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} />
        </mesh>
      </group>

      {/* Rear Carbon Fiber Aero Diffuser with Vertical Strakes */}
      <group position={[0, 0.25, 2.22]}>
        <mesh material={carbonMat} castShadow>
          <boxGeometry args={[1.96, 0.18, 0.32]} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0.05]} material={carbonMat}>
            <boxGeometry args={[0.03, 0.16, 0.28]} />
          </mesh>
        ))}

        {/* Quad Titanium Exhaust Cannons */}
        {[-0.45, -0.3, 0.3, 0.45].map((x, idx) => (
          <mesh key={idx} position={[x, 0.02, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.15, 16, 1, true]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.95} roughness={0.08} />
          </mesh>
        ))}

        {/* Nitro Boost Flames Spitting from Quad Exhausts */}
        <group ref={nitroFlamesGroup} position={[0, 0.02, 0.35]} visible={false}>
          {[-0.45, -0.3, 0.3, 0.45].map((x, idx) => (
            <mesh key={`flame_${idx}`} position={[x, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.09, 0.75, 12]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.85} />
            </mesh>
          ))}
          <pointLight position={[0, 0, 0.5]} intensity={5.0} color="#00f0ff" distance={8} />
        </group>
      </group>

      {/* Rear High-Downforce GT Wing */}
      <group position={[0, 0.94, 2.05]}>
        <mesh position={[-0.65, -0.16, 0]} material={carbonMat}>
          <boxGeometry args={[0.04, 0.34, 0.18]} />
        </mesh>
        <mesh position={[0.65, -0.16, 0]} material={carbonMat}>
          <boxGeometry args={[0.04, 0.34, 0.18]} />
        </mesh>
        <mesh position={[0, 0.03, 0]} material={carbonMat} castShadow>
          <boxGeometry args={[2.08, 0.04, 0.42]} />
        </mesh>
        <mesh position={[-1.04, 0.04, 0]} material={carbonMat}>
          <boxGeometry args={[0.03, 0.22, 0.44]} />
        </mesh>
        <mesh position={[1.04, 0.04, 0]} material={carbonMat}>
          <boxGeometry args={[0.03, 0.22, 0.44]} />
        </mesh>
      </group>

      {/* 2. ADVANCED LIGHTING & VOLUMETRIC BEAMS */}
      {/* Front Projector Headlights with DRL Strips */}
      <mesh position={[-0.74, 0.48, -2.18]}>
        <boxGeometry args={[0.42, 0.1, 0.08]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.74, 0.48, -2.18]}>
        <boxGeometry args={[0.42, 0.1, 0.08]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* High-Intensity Xenon Headlight Spotlights */}
      <spotLight
        position={[-0.68, 0.5, -2.2]}
        target-position={[-1.4, 0, -40]}
        intensity={9.5}
        color="#bae6fd"
        angle={0.46}
        penumbra={0.7}
        distance={65}
        castShadow
      />
      <spotLight
        position={[0.68, 0.5, -2.2]}
        target-position={[1.4, 0, -40]}
        intensity={9.5}
        color="#bae6fd"
        angle={0.46}
        penumbra={0.7}
        distance={65}
        castShadow
      />

      {/* Volumetric Headlight Light Cones Slicing Through Rain/Fog */}
      <mesh position={[-0.68, 0.45, -8.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 3.2, 13, 16, 1, true]} />
        <meshBasicMaterial
          color="#bae6fd"
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0.68, 0.45, -8.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 3.2, 13, 16, 1, true]} />
        <meshBasicMaterial
          color="#bae6fd"
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rear Full-Width Neon Taillight Bar */}
      <mesh position={[0, 0.56, 2.26]}>
        <boxGeometry args={[1.96, 0.08, 0.05]} />
        <meshBasicMaterial ref={taillightMat} color="#991b1b" />
      </mesh>
      <pointLight ref={brakeLightGlow} position={[0, 0.56, 2.7]} intensity={1.5} color="#ff0033" distance={10} />

      {/* Neon Cyan Underglow onto Wet Pavement */}
      <pointLight position={[0, 0.12, 0]} intensity={4.2} color="#00f0ff" distance={5.5} />

      {/* Rear License Plate */}
      <group position={[0, 0.38, 2.27]}>
        <mesh>
          <boxGeometry args={[0.6, 0.18, 0.02]} />
          <meshStandardMaterial color="#020617" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0, 0.015]}
          fontSize={0.09}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
        >
          TAMILARASAN
        </Text>
      </group>

      {/* 3. FOUR HIGH-PERFORMANCE WHEELS */}
      {/* Front Left Wheel Assembly */}
      <group ref={frontLeftWheelGroup} position={[-1.06, 0.38, -1.35]}>
        <group ref={frontLeftWheelMesh}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.28, 28]} />
            <meshStandardMaterial color="#090d16" roughness={0.9} />
          </mesh>
          <mesh position={[-0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 24]} />
            <meshStandardMaterial map={rotorTexture} metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.02, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
        </group>
        <mesh position={[-0.04, 0.18, 0.1]}>
          <boxGeometry args={[0.07, 0.14, 0.16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Front Right Wheel Assembly */}
      <group ref={frontRightWheelGroup} position={[1.06, 0.38, -1.35]}>
        <group ref={frontRightWheelMesh}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.28, 28]} />
            <meshStandardMaterial color="#090d16" roughness={0.9} />
          </mesh>
          <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.02, 24]} />
            <meshStandardMaterial map={rotorTexture} metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.27, 0.27, 0.02, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
        </group>
        <mesh position={[0.04, 0.18, 0.1]}>
          <boxGeometry args={[0.07, 0.14, 0.16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear Left Wheel Assembly */}
      <group position={[-1.08, 0.4, 1.35]}>
        <group ref={rearLeftWheelMesh}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.32, 28]} />
            <meshStandardMaterial color="#090d16" roughness={0.9} />
          </mesh>
          <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 24]} />
            <meshStandardMaterial map={rotorTexture} metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[-0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
        </group>
        <mesh position={[-0.05, 0.18, 0.1]}>
          <boxGeometry args={[0.07, 0.14, 0.16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear Right Wheel Assembly */}
      <group position={[1.08, 0.4, 1.35]}>
        <group ref={rearRightWheelMesh}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.32, 28]} />
            <meshStandardMaterial color="#090d16" roughness={0.9} />
          </mesh>
          <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 24]} />
            <meshStandardMaterial map={rotorTexture} metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
          </mesh>
        </group>
        <mesh position={[0.05, 0.18, 0.1]}>
          <boxGeometry args={[0.07, 0.14, 0.16]} />
          <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}
