import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function FollowCamera({ vehicleState, enabled = true }) {
  const { camera } = useThree()
  
  // Reusable vectors to prevent garbage collection stutter
  const currentPos = useRef(new THREE.Vector3(0, 3.5, 8.5))
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0))

  useFrame((_, delta) => {
    if (!enabled || !vehicleState) return

    const { position, heading, speed } = vehicleState
    const dt = Math.min(delta, 0.05)

    // Camera offset behind vehicle in local car coordinates
    // When speed increases, camera pulls back slightly
    const speedRatio = Math.min(1, Math.abs(speed) / 38)
    const distanceBehind = 6.2 + speedRatio * 1.8
    const heightAbove = 2.4 + speedRatio * 0.4

    // Compute ideal target position behind car based on heading
    const idealX = position.x + Math.sin(heading) * distanceBehind
    const idealY = position.y + heightAbove
    const idealZ = position.z + Math.cos(heading) * distanceBehind

    // Smoothly interpolate camera position with adaptive lerp speed
    const lerpSpeed = 6.5 + speedRatio * 3.5
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, idealX, dt * lerpSpeed)
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, idealY, dt * 5.0)
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, idealZ, dt * lerpSpeed)

    camera.position.copy(currentPos.current)

    // Compute ideal look-at point slightly ahead of the car
    const lookAheadDist = 4.5 + speedRatio * 6.0
    const targetLookX = position.x - Math.sin(heading) * lookAheadDist
    const targetLookY = position.y + 1.2
    const targetLookZ = position.z - Math.cos(heading) * lookAheadDist

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookX, dt * 10)
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookY, dt * 8)
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookZ, dt * 10)

    camera.lookAt(currentLookAt.current)

    // Dynamic FOV sensation based on velocity
    if (camera.isPerspectiveCamera) {
      const targetFov = 52 + speedRatio * 12
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, dt * 4)
      camera.updateProjectionMatrix()
    }
  })

  return null
}

