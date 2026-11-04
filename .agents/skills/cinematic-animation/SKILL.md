---
name: cinematic-animation
description: Directing GSAP timelines, camera interpolations, opening sequence reveals, car dynamics, and district transitions in TAMILARASAN portfolio.
---

# Cinematic Animation Skill

## Overview
This skill guides camera choreographies, timeline animations, vehicle kinematics, and UI reveals for the TAMILARASAN portfolio.

## Core Responsibilities
- **Cinematic Camera Choreography**:
  - High-altitude aerial city overview -> descending orbital glide -> car & character reveal -> title sequence.
  - Smooth camera interpolation using GSAP or frame lerp (`camera.position.lerp(targetPos, delta * speed)`).
  - Dynamic follow camera when driving: dampening turns, pitch, and speed FOV adjustments.
- **Vehicle Kinematics**:
  - Realistic acceleration curve, drag, braking deceleration, and steering response.
  - Wheel rotation proportional to forward/reverse velocity, front wheel steering angles.
  - Subtle body tilt (pitch on brake/accel, roll on hard turns).
- **Transitions & Timelines**:
  - Uninterrupted skip-intro functionality resetting camera smoothly to player control mode.
  - Smooth zoom-in on district stations when viewing portfolio details.

