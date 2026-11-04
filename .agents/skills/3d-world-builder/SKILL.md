---
name: 3d-world-builder
description: Standards and practices for Three.js, React Three Fiber, scene graphs, lighting, city roads, instanced buildings, and 3D assets in TAMILARASAN portfolio.
---

# 3D World Builder Skill

## Overview
This skill governs the construction of the cinematic 3D city environment in the TAMILARASAN interactive portfolio.

## Core Responsibilities
- **Three.js & React Three Fiber (R3F)**:
  - Clean declarative scene hierarchy with memoized geometries and shared PBR materials.
  - Consistent lighting: directional moonlight (`castShadow`), soft ambient fill, and neon point/spot accents.
  - Linear/exponential fog configuration blending seamlessly with the dark horizon (`#07080d`).
- **City Infrastructure**:
  - Multi-lane asphalt road networks with dashed markings, sidewalks, curbs, and road dividers.
  - Thematic architectural buildings distributed across 7 distinct districts (About, Education, Skills, Projects, Experience, Achievements, Contact).
  - Atmospheric streetlights with glowing emissive bulbs and cone downlights.
- **Hero Vehicle & Props**:
  - Procedural / GLB-integrated aerodynamic sports vehicle with chassis, cockpit canopy, wheels, and glowing LED light strips.
  - Emissive light beams projected onto the road surface.
  - Interactive district pads with holographic glowing pillars and beacon rings.

