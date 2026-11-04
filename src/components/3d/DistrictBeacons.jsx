import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { PORTFOLIO_DATA } from '../../data/portfolioData'

function SingleBeacon({ district }) {
  const innerRingRef = useRef()
  const outerRingRef = useRef()

  useFrame((state, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y += delta * 0.8
      innerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y -= delta * 0.5
      outerRingRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.2) * 0.1
    }
  })

  const [x, y, z] = district.worldPosition

  return (
    <group position={[x, y, z]}>
      {/* 1. Ground Circular Entry Pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
        <circleGeometry args={[district.beaconRadius, 32]} />
        <meshStandardMaterial
          color="#0c1017"
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Glowing Outer Perimeter Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[district.beaconRadius - 0.4, district.beaconRadius, 48]} />
        <meshBasicMaterial color={district.themeColor} />
      </mesh>

      {/* Inner Glowing Target Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
        <ringGeometry args={[3.8, 4.2, 32]} />
        <meshBasicMaterial color={district.themeColor} />
      </mesh>

      {/* 2. Vertical Holographic Light Column */}
      <mesh position={[0, 18, 0]}>
        <cylinderGeometry args={[0.5, 2.5, 36, 16, 1, true]} />
        <meshBasicMaterial
          color={district.themeColor}
          transparent
          opacity={0.18}
          wireframe={false}
          depthWrite={false}
        />
      </mesh>

      {/* Core Intense Light Beam */}
      <mesh position={[0, 14, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 28, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>

      {/* 3. Floating Holographic Rings */}
      <group position={[0, 2.2, 0]}>
        <mesh ref={innerRingRef}>
          <torusGeometry args={[2.5, 0.06, 8, 24]} />
          <meshBasicMaterial color={district.themeColor} />
        </mesh>
        <mesh ref={outerRingRef}>
          <torusGeometry args={[3.2, 0.04, 8, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 4. 3D Floating District Marker Text */}
      <group position={[0, 5.5, 0]}>
        <Text
          fontSize={0.85}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="#000000"
        >
          {`0${district.districtNumber} // ${district.shortTitle.toUpperCase()}`}
        </Text>
        <Text
          position={[0, -0.65, 0]}
          fontSize={0.38}
          color={district.themeColor}
          anchorX="center"
          anchorY="middle"
        >
          {district.tagline.toUpperCase()}
        </Text>
      </group>
    </group>
  )
}

export function DistrictBeacons() {
  return (
    <group>
      {PORTFOLIO_DATA.districts.map((district) => (
        <SingleBeacon key={district.id} district={district} />
      ))}
    </group>
  )
}

