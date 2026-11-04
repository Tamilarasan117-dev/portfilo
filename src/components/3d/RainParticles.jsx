import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function RainParticles({ count = 1200 }) {
  const pointsRef = useRef()

  // Generate rain streaks distributed around the central city area
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 160     // X: across streets
      pos[i * 3 + 1] = Math.random() * 45           // Y: height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200    // Z: along boulevard
      spd[i] = 40 + Math.random() * 25              // Fast rain descent
    }
    return [pos, spd]
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position
    const dt = Math.min(delta, 0.05)

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) - speeds[i] * dt
      if (y < 0) {
        y = 40 + Math.random() * 5
      }
      posAttr.setY(i, y)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#a5f3fc"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

