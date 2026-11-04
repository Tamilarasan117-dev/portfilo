import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { LightingFog } from './LightingFog'
import { GroundRoads } from './GroundRoads'
import { Streetlights } from './Streetlights'
import { Buildings } from './Buildings'
import { DistrictBeacons } from './DistrictBeacons'
import { HeroCar } from './HeroCar'
import { Character } from './Character'
import { FollowCamera } from './FollowCamera'
import { PostEffects } from './PostEffects'
import { Pedestrians } from './Pedestrians'
import { RainParticles } from './RainParticles'
import { StreetDetails } from './StreetDetails'
import { PORTFOLIO_DATA } from '../../data/portfolioData'

function CityWorldSimulator({ 
  carController, 
  cameraMode, 
  onDistrictProximity 
}) {
  const [vehicleFrameState, setVehicleFrameState] = useState(null)
  const proximityCheckCounter = useRef(0)

  useFrame((_, delta) => {
    // 1. Advance vehicle physics
    const currentVehicleState = carController.updateVehicle(delta)
    setVehicleFrameState({ ...currentVehicleState })

    // 2. Proximity check every few frames (optimized for 60 FPS)
    proximityCheckCounter.current++
    if (proximityCheckCounter.current % 5 === 0) {
      const carPos = currentVehicleState.position
      let foundDistrict = null
      for (const d of PORTFOLIO_DATA.districts) {
        const dx = carPos.x - d.worldPosition[0]
        const dz = carPos.z - d.worldPosition[2]
        const dist = Math.sqrt(dx * dx + dz * dz)
        if (dist <= d.beaconRadius + 2.5) {
          foundDistrict = d
          break
        }
      }
      onDistrictProximity(foundDistrict)

      // Update telemetry state for HUD
      carController.setTelemetry({
        speedKmh: currentVehicleState.speedKmh,
        rpm: currentVehicleState.rpm,
        gear: currentVehicleState.gear,
        isBraking: currentVehicleState.isBraking,
        isBoosting: currentVehicleState.isBoosting,
        steerInputRatio: currentVehicleState.steerInputRatio,
        coords: { x: carPos.x, z: carPos.z }
      })
    }
  })

  return (
    <>
      {/* City Environment Reflections */}
      <Environment preset="city" />

      {/* Atmospheric Lighting, Sky & Fog */}
      <LightingFog />

      {/* Rain & Volumetric Mist Particles Falling Through Neon Lights */}
      <RainParticles count={1400} />

      {/* City Ground, Asphalt Roads & Overhead Structures */}
      <GroundRoads />

      {/* Realistic Streetlights */}
      <Streetlights />

      {/* Street Furniture, Palm Trees & Hydrants (from car.jpg) */}
      <StreetDetails />

      {/* GTA-Style Walking Pedestrians on Sidewalks & Crossings */}
      <Pedestrians />

      {/* Sprawling High-Detail Metropolis Buildings */}
      <Buildings />

      {/* 7 District Landmark Beacons */}
      <DistrictBeacons />

      {/* Dynamic Third-Person Chase Follow Camera */}
      <FollowCamera vehicleState={vehicleFrameState} enabled={cameraMode === 'chase'} />

      {/* Hero Car with Clearcoat, Front Steering, Quad Exhausts & Volumetric Beams */}
      <HeroCar vehicleState={vehicleFrameState} />

      {/* Stylized Cyber Developer Character */}
      <Character position={[-2.2, 0, 0.5]} rotation={[0, Math.PI / 3.2, 0]} />

      {/* Cinematic Post-Processing Bloom & Vignette */}
      <PostEffects />
    </>
  )
}

export function SceneCanvas({ carController, cameraMode, onDistrictProximity }) {
  return (
    <div className="w-full h-full relative cursor-crosshair">
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance',
          stencil: false
        }}
        dpr={[1, 1.75]}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 3.8, 8.5]}
          fov={54}
          near={0.1}
          far={500}
        />

        {/* Free Orbit Controls (active when cameraMode is 'orbit') */}
        {cameraMode === 'orbit' && (
          <OrbitControls
            target={[0, 1.2, 0]}
            maxPolarAngle={Math.PI / 2 - 0.04}
            minDistance={3}
            maxDistance={140}
            enableDamping
            dampingFactor={0.05}
          />
        )}

        <Suspense fallback={null}>
          <CityWorldSimulator
            carController={carController}
            cameraMode={cameraMode}
            onDistrictProximity={onDistrictProximity}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
