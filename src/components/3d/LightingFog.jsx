import React from 'react'

export function LightingFog() {
  return (
    <>
      {/* Exponential atmospheric fog matching deep night horizon */}
      <color attach="background" args={['#06080e']} />
      <fogExp2 attach="fog" args={['#06080e', 0.012]} />

      {/* Ambient twilight illumination */}
      <ambientLight intensity={0.4} color="#556688" />

      {/* Main directional moonlight casting soft PCF shadows */}
      <directionalLight
        position={[60, 100, 40]}
        intensity={1.2}
        color="#aaccff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={250}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.0005}
      />

      {/* Cyan & Magenta atmospheric fill lights */}
      <pointLight position={[-40, 20, -20]} intensity={2.5} color="#00f0ff" distance={70} decay={2} />
      <pointLight position={[40, 20, 20]} intensity={2.5} color="#8b5cf6" distance={70} decay={2} />
      <pointLight position={[0, 15, 60]} intensity={2.0} color="#ff0055" distance={60} decay={2} />
    </>
  )
}

