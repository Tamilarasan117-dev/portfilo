import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useCarController() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
    boost: false
  })

  // Mouse driving input state
  const mouseInput = useRef({
    enabled: true,
    isMouseDownLeft: false,
    isMouseDownRight: false,
    steerX: 0 // -1 (full left) to +1 (full right)
  })

  // Highly responsive, snappy vehicle physics state
  const state = useRef({
    position: new THREE.Vector3(0, 0, 0),
    speed: 0,
    maxForwardSpeed: 42, // ~150 km/h
    maxBoostSpeed: 55,   // ~200 km/h with nitro!
    maxReverseSpeed: -16,
    acceleration: 36,     // Fast, punchy sports acceleration
    boostAcceleration: 60,
    deceleration: 26,
    brakingPower: 55,     // Sharp responsive brakes
    friction: 0.982,
    heading: 0,          // Radians
    turnSpeed: 3.4,       // Extremely fast, snappy turning authority
    steerAngle: 0,
    maxSteer: 0.65,       // ~37 degrees max lock
    steerReturnSpeed: 16  // Instant snap return
  })

  const [telemetry, setTelemetry] = useState({
    speedKmh: 0,
    rpm: 800,
    gear: 'P',
    isBraking: false,
    isBoosting: false,
    steerInputRatio: 0,
    heading: 0,
    coords: { x: 0, z: 0 }
  })

  useEffect(() => {
    // 1. Keyboard event listeners
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true
          break
        case 'Space':
          keys.current.brake = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          keys.current.boost = true
          break
        default:
          break
      }
    }

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false
          break
        case 'Space':
          keys.current.brake = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyN':
          keys.current.boost = false
          break
        default:
          break
      }
    }

    // 2. Mouse Driving Event Listeners (Hold Left Click = Gas, Right Click = Brake, Move X = Steer)
    const handleMouseDown = (e) => {
      // Ignore if clicking on UI buttons or modals
      if (e.target.closest('button, nav, .glass-panel, input, a')) return

      if (e.button === 0) {
        mouseInput.current.isMouseDownLeft = true
      } else if (e.button === 2) {
        mouseInput.current.isMouseDownRight = true
      }
    }

    const handleMouseUp = (e) => {
      if (e.button === 0) {
        mouseInput.current.isMouseDownLeft = false
      } else if (e.button === 2) {
        mouseInput.current.isMouseDownRight = false
      }
    }

    const handleMouseMove = (e) => {
      // Mouse X relative to center screen: [-1, 1]
      const halfWidth = window.innerWidth / 2
      const rawNormalized = (e.clientX - halfWidth) / halfWidth
      // Clamp to [-1, 1] with a gentle deadzone around center
      if (Math.abs(rawNormalized) < 0.08) {
        mouseInput.current.steerX = 0
      } else {
        mouseInput.current.steerX = Math.max(-1, Math.min(1, (rawNormalized - Math.sign(rawNormalized) * 0.08) * 1.2))
      }
    }

    const handleContextMenu = (e) => {
      // Prevent context menu on canvas so right-click brake works effortlessly
      if (!e.target.closest('button, nav, a, input')) {
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('contextmenu', handleContextMenu)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  // Call on each frame
  const updateVehicle = (delta) => {
    const s = state.current
    const k = keys.current
    const m = mouseInput.current

    const dt = Math.min(delta, 0.05)

    // Combined input (Keyboard + Mouse)
    const isForward = k.forward || m.isMouseDownLeft
    const isBackward = k.backward || m.isMouseDownRight
    const isBoosting = k.boost

    // Target Steering from Keyboard OR Mouse
    let targetSteerRatio = 0
    if (k.left) targetSteerRatio += 1
    if (k.right) targetSteerRatio -= 1
    // If mouse steering is active and no conflicting keyboard steer
    if (targetSteerRatio === 0 && Math.abs(m.steerX) > 0.05) {
      targetSteerRatio = -m.steerX
    }

    const targetSteerAngle = targetSteerRatio * s.maxSteer

    // Instant snappy steering response
    s.steerAngle = THREE.MathUtils.lerp(s.steerAngle, targetSteerAngle, dt * s.steerReturnSpeed)

    // Acceleration & Boost
    const topForward = isBoosting ? s.maxBoostSpeed : s.maxForwardSpeed
    const currentAccel = isBoosting ? s.boostAcceleration : s.acceleration

    if (isForward) {
      s.speed += currentAccel * dt
      if (s.speed > topForward) s.speed = topForward
    } else if (isBackward) {
      if (s.speed > 0.8) {
        // High-power brake
        s.speed -= s.brakingPower * dt
        if (s.speed < 0) s.speed = 0
      } else {
        // Reverse
        s.speed -= s.deceleration * dt
        if (s.speed < s.maxReverseSpeed) s.speed = s.maxReverseSpeed
      }
    } else {
      // Natural rolling drag
      s.speed *= Math.pow(s.friction, dt * 60)
      if (Math.abs(s.speed) < 0.05) s.speed = 0
    }

    if (k.brake) {
      s.speed *= Math.pow(0.82, dt * 60)
    }

    // Fast Responsive Steering:
    // Even at low speeds, provide crisp maneuverability!
    if (Math.abs(s.speed) > 0.08 || Math.abs(targetSteerAngle) > 0.1) {
      const minSteerAuthority = 0.45
      const speedSteerFactor = Math.min(1.2, minSteerAuthority + (Math.abs(s.speed) / s.maxForwardSpeed) * 0.75)
      const direction = s.speed >= -0.1 ? 1 : -1
      s.heading += s.steerAngle * s.turnSpeed * speedSteerFactor * dt * direction
    }

    // Position update based on heading and speed
    const dx = -Math.sin(s.heading) * s.speed * dt
    const dz = -Math.cos(s.heading) * s.speed * dt

    s.position.x += dx
    s.position.z += dz

    // City Boundary limits
    s.position.x = Math.max(-85, Math.min(85, s.position.x))
    s.position.z = Math.max(-95, Math.min(95, s.position.z))

    // Display telemetry calculations
    const speedKmh = Math.round(Math.abs(s.speed) * 3.6)
    let gear = 'P'
    if (s.speed > 0.2) {
      gear = speedKmh > 130 ? '5' : speedKmh > 90 ? '4' : speedKmh > 55 ? '3' : speedKmh > 25 ? '2' : '1'
    } else if (s.speed < -0.2) {
      gear = 'R'
    } else {
      gear = 'N'
    }

    const rpm = Math.min(8500, Math.round(800 + (Math.abs(s.speed) / topForward) * 7200))

    return {
      position: s.position,
      heading: s.heading,
      steerAngle: s.steerAngle,
      speed: s.speed,
      speedKmh,
      rpm,
      gear,
      isBraking: (isBackward && s.speed > 1.2) || k.brake,
      isBoosting,
      steerInputRatio: targetSteerRatio
    }
  }

  // Virtual buttons helper for instant mobile/mouse clicks
  const triggerControl = (action, isPressed) => {
    if (action === 'left') keys.current.left = isPressed
    if (action === 'right') keys.current.right = isPressed
    if (action === 'forward') keys.current.forward = isPressed
    if (action === 'backward') keys.current.backward = isPressed
    if (action === 'brake') keys.current.brake = isPressed
    if (action === 'boost') keys.current.boost = isPressed
  }

  return {
    state,
    keys,
    mouseInput,
    telemetry,
    setTelemetry,
    updateVehicle,
    triggerControl
  }
}
