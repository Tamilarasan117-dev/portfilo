import React, { useState, useEffect } from 'react'
import { SceneCanvas } from './components/3d/SceneCanvas'
import { MilestoneOverlay } from './components/ui/MilestoneOverlay'
import { CyberHUD } from './components/ui/CyberHUD'
import { useCarController } from './hooks/useCarController'

export default function App() {
  const carController = useCarController()
  const [cameraMode, setCameraMode] = useState('chase')
  const [activeDistrict, setActiveDistrict] = useState(null)
  const [modalDistrict, setModalDistrict] = useState(null)

  // Toggle Camera Mode ('chase' vs 'orbit')
  const toggleCamera = () => {
    setCameraMode((prev) => (prev === 'chase' ? 'orbit' : 'chase'))
  }

  // Key listeners for 'C' and 'E'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyC') {
        toggleCamera()
      } else if (e.code === 'KeyE' && activeDistrict) {
        setModalDistrict(activeDistrict)
      } else if (e.code === 'Escape') {
        setModalDistrict(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeDistrict])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#06080e]">
      {/* 3D WebGL Canvas Layer */}
      <SceneCanvas
        carController={carController}
        cameraMode={cameraMode}
        onDistrictProximity={setActiveDistrict}
      />

      {/* Atmospheric Overlays */}
      <div className="vignette-overlay" />
      <div className="scanlines" />

      {/* Cyberpunk Cockpit HUD & Telemetry */}
      <CyberHUD
        telemetry={carController.telemetry}
        activeDistrict={activeDistrict}
        onEnterDistrict={(district) => setModalDistrict(district)}
        cameraMode={cameraMode}
        onToggleCamera={toggleCamera}
        carController={carController}
      />

      {/* Brand Header & District Data Modals */}
      <MilestoneOverlay
        selectedDistrict={modalDistrict}
        onSelectDistrict={setModalDistrict}
      />
    </div>
  )
}
