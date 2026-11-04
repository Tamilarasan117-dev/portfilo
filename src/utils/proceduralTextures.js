import * as THREE from 'three'

/**
 * Procedural PBR Canvas Texture Generators for Ultra-Realistic City & Vehicles
 */

// 1. Wet Asphalt Road Texture with Specular Puddles & Markings
export function createAsphaltTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Base asphalt tone
  ctx.fillStyle = '#10141d'
  ctx.fillRect(0, 0, 1024, 1024)

  // Asphalt micro-grain noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024)
  const data = imgData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 22
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise + 2))
  }
  ctx.putImageData(imgData, 0, 0)

  // Wet reflective puddle patches
  for (let i = 0; i < 28; i++) {
    const px = Math.random() * 1024
    const py = Math.random() * 1024
    const rad = 25 + Math.random() * 60
    const grad = ctx.createRadialGradient(px, py, 4, px, py, rad)
    grad.addColorStop(0, 'rgba(5, 7, 11, 0.75)')
    grad.addColorStop(0.7, 'rgba(10, 13, 20, 0.45)')
    grad.addColorStop(1, 'rgba(16, 20, 29, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(px, py, rad, rad * 0.6, Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  }

  // Weathered road lane paint markings
  // Double Yellow center dividers
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = 14
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(502, 0)
  ctx.lineTo(502, 1024)
  ctx.moveTo(522, 0)
  ctx.lineTo(522, 1024)
  ctx.stroke()

  // White lane dividers (Dashed)
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.85)'
  ctx.lineWidth = 10
  ctx.setLineDash([70, 50])
  ctx.beginPath()
  ctx.moveTo(256, 0)
  ctx.lineTo(256, 1024)
  ctx.moveTo(768, 0)
  ctx.lineTo(768, 1024)
  ctx.stroke()

  // Solid outer edge boundary lines
  ctx.setLineDash([])
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.9)'
  ctx.lineWidth = 16
  ctx.beginPath()
  ctx.moveTo(36, 0)
  ctx.lineTo(36, 1024)
  ctx.moveTo(988, 0)
  ctx.lineTo(988, 1024)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 16)
  texture.anisotropy = 8
  return texture
}

// 2. Skyscraper Window Lighting Pattern (Detailed Facade)
export function createBuildingWindowTexture(variant = 0) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  // Dark architectural structural facade
  ctx.fillStyle = '#0a0d14'
  ctx.fillRect(0, 0, 1024, 1024)

  const rows = 32
  const cols = 24
  const winWidth = 26
  const winHeight = 18
  const gapX = 16
  const gapY = 14

  const colorPalette = [
    '#fef08a', // warm office light
    '#e2e8f0', // bright white fluorescent
    '#38bdf8', // cyan tech screen
    '#818cf8', // blue corporate
    '#f43f5e'  // magenta executive
  ]

  for (let r = 0; r < rows; r++) {
    // Floor concrete divider
    ctx.fillStyle = '#161d2b'
    ctx.fillRect(0, r * (winHeight + gapY) - 3, 1024, 4)

    for (let c = 0; c < cols; c++) {
      const x = c * (winWidth + gapX) + 12
      const y = r * (winHeight + gapY) + 4

      // Pseudo-random window state
      const rand = Math.sin(r * 43.1 + c * 17.7 + variant * 91.3)
      if (rand > 0.35) {
        // Lit window
        const colIdx = Math.floor(Math.abs(rand * 100)) % colorPalette.length
        ctx.fillStyle = colorPalette[colIdx]
        ctx.fillRect(x, y, winWidth, winHeight)

        // Inner blind or window frame detail
        if (rand > 0.7) {
          ctx.fillStyle = 'rgba(10, 13, 20, 0.4)'
          ctx.fillRect(x, y, winWidth, 5)
        }
      } else {
        // Dark unlit glass with subtle reflection
        ctx.fillStyle = '#0f1420'
        ctx.fillRect(x, y, winWidth, winHeight)
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 4
  return texture
}

// 3. Carbon Fiber Weave Texture
export function createCarbonFiberTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#111318'
  ctx.fillRect(0, 0, 64, 64)

  ctx.fillStyle = '#1e222b'
  for (let x = 0; x < 64; x += 8) {
    for (let y = 0; y < 64; y += 8) {
      if ((x / 8 + y / 8) % 2 === 0) {
        ctx.fillRect(x, y, 8, 8)
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}

// 4. Drilled High-Performance Brake Rotor Texture
export function createBrakeRotorTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Brushed steel surface
  ctx.fillStyle = '#94a3b8'
  ctx.beginPath()
  ctx.arc(128, 128, 120, 0, Math.PI * 2)
  ctx.fill()

  // Circular brushed grooves
  ctx.strokeStyle = '#64748b'
  ctx.lineWidth = 2
  for (let r = 50; r < 115; r += 8) {
    ctx.beginPath()
    ctx.arc(128, 128, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Drilled ventilation holes
  ctx.fillStyle = '#0f172a'
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
    for (let d = 60; d < 115; d += 16) {
      const hx = 128 + Math.cos(angle + d * 0.05) * d
      const hy = 128 + Math.sin(angle + d * 0.05) * d
      ctx.beginPath()
      ctx.arc(hx, hy, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Center hub cutout
  ctx.fillStyle = '#1e293b'
  ctx.beginPath()
  ctx.arc(128, 128, 42, 0, Math.PI * 2)
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

