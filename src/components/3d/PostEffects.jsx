import React from 'react'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export function PostEffects() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {/* Cinematic Photorealistic Bloom on Headlights, Taillights & Neon Signs */}
      <Bloom
        luminanceThreshold={0.75}
        luminanceSmoothing={0.3}
        intensity={1.15}
        mipmapBlur
      />

      {/* Subtle Optical Chromatic Aberration at Screen Edges */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Cinematic Lens Vignette */}
      <Vignette
        offset={0.2}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

