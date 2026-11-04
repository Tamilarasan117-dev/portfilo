---
name: 3d-performance-optimizer
description: Optimization guidelines, draw call reduction, instancing, shadow tuning, geometry caching, and mobile profiling in TAMILARASAN portfolio.
---

# 3D Performance Optimizer Skill

## Overview
This skill ensures smooth 60 FPS performance, low memory footprint, and reliable execution across varied hardware for the TAMILARASAN portfolio.

## Core Responsibilities
- **Draw Call Minimization**:
  - Use `THREE.InstancedMesh` for repeated structures (skyscrapers, highway light poles, street barriers, decorative trees).
  - Share geometries (`BoxGeometry`, `CylinderGeometry`) and materials (`MeshStandardMaterial`) across instances.
- **Lighting & Shadow Budgets**:
  - Limit shadow-casting lights to a single primary directional light (moonlight) with tight shadow frustum.
  - Set shadow map resolution to 2048x2048 with `PCFSoftShadowMap`.
  - Use emissive materials and unlit shaders instead of numerous dynamic point lights where possible.
- **Render Loop Efficiency**:
  - Avoid object allocations (`new THREE.Vector3()`, `new THREE.Matrix4()`) inside `useFrame` render loops; reuse module-scoped scratch vectors and matrices.
  - Prevent unnecessary React state re-renders inside high-frequency animation loops.
- **Mobile & Low-End Fallbacks**:
  - Dynamic pixel ratio clamping: `Math.min(window.devicePixelRatio, 2)`.
  - Touch control overlays with responsive viewport sizing.

