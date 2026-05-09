# AI Prompts — Pro Padel Coslada Hero Sequence

All prompts for generating the 10-keyframe scrubbed-scroll hero sequence.

- **Image AI:** ChatGPT Image (GPT Image) — 10 keyframes
- **Video AI:** Seedance 2.0 (FLF2V mode) — 9 interpolation clips
- **Output:** image sequence dropped into `public/sequence/` and bound to `<SceneSequence />`

---

## Part 1 — ChatGPT Image (10 keyframes)

### Style anchor — paste this first to lock the look

> I'm generating a 10-frame sequence for a cinematic web hero. Every frame must share the same visual DNA: **cinematic still, hyper-detailed product photography. Subject is a single matte-black graphite padel racket with bright white strings — no logos, no text, pristine surface. Set against a deep void-black background (#050505) with subtle volumetric atmospheric haze. Single dramatic rim-light source from upper-left at 45°, soft white spotlight, creating gentle highlights along the racket's frame. Shallow depth of field. Shot on 35mm full-frame at 85mm f/1.8, ISO 100. Color grade: cool blacks, neutral whites, no warm tones unless specified. Composition: 3:2 landscape, generous negative space. Style: Apple product page meets museum editorial. Strictly no text overlay, no watermarks, no people unless specified, no other rackets visible.** Confirm you've got it, then I'll feed you each scene one at a time.

After ChatGPT acknowledges, generate frame 1. **For frames 2–10, attach frame 1 as a reference image** with the prompt: *"Match the exact racket model, lighting direction, atmospheric haze, and color grade from the reference. Same camera, same world, only the subject's pose/scene changes as follows:"* — then paste the scene prompt.

---

### FRAME 1 — Hero entry

> Single padel racket suspended dead-center in the void, perfectly face-on to camera, vertical orientation with handle pointing down. The strings are taut and clean, slightly catching the rim light. Behind the strings, a faint warm-white glow seems to emanate from within the string bed itself, as if light is leaking through from another dimension — soft, diffuse, like a held breath. The racket frame casts almost no shadow. Total stillness, suspended weightlessly. Pure stage. No motion. Negative space all around.

---

### FRAME 2 — Tagline reveal

> Same racket, same position, but rotated 45° on its vertical axis (tilted back-right) so we now see it three-quarter view. The string bed catches more light at this angle, edges of the frame are kissed by the rim light. Camera has subtly pulled back about 10%, racket appears slightly smaller in frame. The internal glow from frame 1 is fading. A whisper of motion blur hints the rotation just happened — not a frozen pose, but a gentle resting-after-turn.

---

### FRAME 3 — Value props (edge-on transition)

> Same racket, now rotated a full 90° so it appears as a thin vertical line through the center of the frame — only the edge profile is visible, a sliver of black with a hairline of rim light running down it. The racket has become a dividing line. Behind it, three faint geometric shield outlines (chevron-shaped, very subtle, almost invisible) are emerging from the haze in the deep background — barely perceptible, lit only by ambient atmosphere. Heavy negative space on either side of the vertical line.

---

### FRAME 4 — Facilities (pull-back to isometric)

> Camera has pulled dramatically back and elevated to a high three-quarter aerial perspective. The racket is now small, centered, lying flat (face-up) at the heart of the frame. Surrounding it, arranged in a clean grid pattern, are 10 padel courts rendered as thin glowing wireframe outlines on the black void floor — 9 in a 3x3 panoramic-style grid plus 1 individual court offset to the side. Some courts are dimly lit, others are illuminated brighter as if powering on in sequence. Top-down isometric clarity, architectural feel. The racket sits like a centerpiece in a master plan.

---

### FRAME 5 — Escuela (mid-swing)

> Camera back at original distance, frame-filling. The racket is captured mid-forehand swing — frozen at the apex of motion, frame angled diagonally from lower-left toward upper-right. Pronounced motion blur trails behind the racket head, suggesting velocity, with a streak of soft light along its arc. The string bed is slightly compressed as if it just connected with a ball (no ball visible). Energy, kinetic tension, but cinematic stillness within the blur. Atmospheric haze is denser here, picking up the motion trails.

---

### FRAME 6 — La Revancha (warm rest)

> Tonal shift — the world warms slightly. The racket is laid flat horizontally on a dark, polished wooden bar surface (deep walnut, almost black, with subtle grain visible under low light). A single padel ball rests in the center of the strings, casting a soft round shadow. The rim light is now warmer — amber and honey-toned, coming from the same upper-left direction but with the temperature of candlelight. Background is still black void but with a hint of deep ember in the haze. Quiet, post-game, contemplative.

---

### FRAME 7 — Gimnasio (vertical tension)

> Tonal shift back to cool. The racket is rotated to perfect vertical orientation, handle at the bottom, head at the top, gripped (no hands visible — the racket appears self-suspended, but framed *as if* being held vertically like a barbell). Subtle vibration motion blur at the head and base — the racket is under tension, about to be lifted. The rim light is harder, more clinical, with a steel-gray cool cast. Slight reflection on the frame's edge suggests metallic intensity. Atmosphere feels charged, focused, performance-mode.

---

### FRAME 8 — Eventos (explosion)

> The racket head bursts into slow-motion luminous particles — hundreds of small floating points of warm white-gold light scattering upward and outward from the string bed, as if the strings have dissolved into stars. The racket frame and handle remain intact and visible, but the head is mid-disintegration, particles drifting in graceful slow arcs. Long exposure-feel, soft motion trails on each particle. Celebratory, festive, but elegant — not chaotic. Background haze picks up the warm glow.

---

### FRAME 9 — Loop close (re-condensation)

> Mirror of frame 8. The same particles are now drifting *back inward*, condensing toward the racket head, reforming the string bed. The string bed is partially restored — about 70% rebuilt, with the remaining particles still mid-flight, converging. The warm gold tones of frame 8 are cooling back toward the neutral white of the opening frames. Motion is reverse-flowing, gathering. Sense of resolution, return, completion.

---

### FRAME 10 — Outro

> Identical composition and lighting to FRAME 1 — racket dead-center, face-on, vertical, fully restored. Strings perfectly taut. The internal glow behind the string bed is back, but slightly brighter and more defined, as if a logo is forming inside the strings — a soft circular halo of warm-white light at the center of the string bed. Total stillness. Slightly more polished and "complete" feel than frame 1, like a final confident frame before fade-out. Negative space restored.

---

### ChatGPT Image workflow tips

- **Generate in one chat thread**, not separate ones — context drift kills consistency.
- **Always attach frame 1 as reference** for frames 2–10. The reference feature is the strongest consistency tool.
- **Use landscape (3:2) output** — request *"landscape orientation, 1536x1024 or wider"*.
- **Iterate per frame:** if a frame comes back with the wrong racket model or wrong rim-light direction, regenerate before moving on.
- **Save each accepted frame as PNG**, named `frame-0001.png` through `frame-0010.png`, then convert to `.webp` for the sequence.

---

## Part 2 — Seedance 2.0 (9 interpolation clips)

### Shared settings — apply to every clip

- **Mode:** First & Last Frame to Video (FLF2V)
- **Duration:** 4 seconds
- **Resolution:** 1080p
- **Aspect ratio:** match keyframe aspect exactly (3:2)
- **Negative prompt** (paste into every clip):
  > no text, no logos, no watermarks, no morphing or warping of the racket, no extra rackets, no human hands or bodies, no flickering, no jittery frames, no plastic-looking artifacts, no color banding

---

### CLIP 1 — Frames 1 → 2 (hero → tilted)

> The padel racket rotates slowly and deliberately 45 degrees clockwise on its vertical axis, transitioning from face-on to a three-quarter view. The camera holds steady but pulls back almost imperceptibly during the motion. The faint inner glow behind the strings gradually fades as the rotation completes. Smooth, museum-display-like rotation. Atmospheric haze drifts gently. No flicker, no re-rendering of the subject — preserve the exact racket, lighting, and background.

---

### CLIP 2 — Frames 2 → 3 (tilted → edge-on line)

> The racket continues its rotation, sweeping another 45 degrees until it reaches a perfect edge-on profile — appearing as a thin vertical sliver of black with a hairline of rim light running down its edge. The motion is continuous from the previous clip, unhurried and contemplative. Three faint geometric shield outlines slowly emerge from the haze deep in the background as the racket reaches its edge-on position. Camera holds. Atmosphere thickens slightly.

---

### CLIP 3 — Frames 3 → 4 (edge-on → wide isometric pullback)

> Dramatic camera move: the camera rapidly pulls back and elevates to a high three-quarter aerial perspective, like a lens being yanked toward the ceiling. As the camera retreats, the racket simultaneously rotates from its vertical edge-on stance to lying flat face-up. The surrounding void reveals itself as a vast dark plane on which a grid of ten thin glowing wireframe padel courts materializes — the courts illuminate one after another in a sequential cascade as the camera completes its pullback. Sweeping, world-revealing motion.

---

### CLIP 4 — Frames 4 → 5 (isometric → mid-swing)

> Aggressive camera move back in: the camera rushes from the high aerial position down to a frontal close-up of the racket. The racket rises from its flat resting state, lifts into the air, and accelerates into the apex of a forehand swing — frozen at maximum velocity, motion blur trailing diagonally from lower-left to upper-right. The string bed compresses as if it just connected with a ball. Atmospheric haze thickens around the motion trail. Kinetic, charged, fast — but the final moment is the frozen apex.

---

### CLIP 5 — Frames 5 → 6 (mid-swing → bar rest, warm)

> The swing completes its arc and decelerates gracefully. The racket follows through, then drifts downward and lays itself flat on a polished dark wooden bar surface that materializes beneath it. A single padel ball rolls into the center of the strings and settles. The lighting transitions during the motion from cool clinical white to warm amber and honey tones — color temperature drift is gradual, like the room dimming for a candlelit hour. Motion settles into stillness. Quiet ending.

---

### CLIP 6 — Frames 6 → 7 (warm rest → vertical tension, cool)

> The lighting cools rapidly back to clinical neutral, color temperature shifting from amber to cold steel-gray. As the warmth drains, the racket lifts off the wooden surface (which dissolves back into void) and rotates 90 degrees into a perfect vertical orientation — handle pointing down, head pointing up, suspended weightlessly. A subtle high-frequency vibration appears at the head and base, suggesting tension building. Motion is purposeful, focused, performance-mode. The wooden bar fades away completely by the end.

---

### CLIP 7 — Frames 7 → 8 (vertical tension → explosion)

> The vibration at the racket's head intensifies for a moment, then bursts: the string bed dissolves into hundreds of luminous warm white-gold particles that bloom outward and upward in slow-motion. The racket frame and handle remain intact while the head disintegrates. Particles trace graceful slow arcs with soft motion trails. Lighting warms from cool steel toward festive gold during the burst. Celebratory but elegant — controlled, not chaotic. Time feels stretched.

---

### CLIP 8 — Frames 8 → 9 (explosion → re-condensation)

> Time reverses. The luminous particles that were dispersing now drift backward toward the racket head, gathering and converging. The string bed gradually reforms, weaving itself back into existence as particles arrive. The warm gold lighting cools steadily back toward neutral white during the gathering. Motion flows in reverse — graceful, restorative, gathering momentum inward rather than outward. By the end, the string bed is roughly 70 percent restored with the final particles still mid-flight.

---

### CLIP 9 — Frames 9 → 10 (re-condensation → final hero)

> The last particles complete their journey home, locking into the string bed and finishing the restoration. The racket rotates gently back into its perfect face-on hero pose, dead-center in the void. Motion settles into total stillness — a held breath. The faint inner glow behind the strings rises gradually, brightening into a soft circular halo at the center of the string bed. Cool neutral lighting. Final settled pose. The world feels completed.

---

## Part 3 — Assembly checklist

1. **Generate the 10 keyframe images** in ChatGPT Image, using the style anchor + per-frame prompts. Save as `frame-0001.png` … `frame-0010.png`.
2. **Convert keyframes to WebP** (smaller, faster scrub):
   ```
   for i in 0001..0010: ffmpeg -i frame-$i.png -quality 85 frame-$i.webp
   ```
3. **Generate 9 Seedance clips** using FLF2V mode with consecutive keyframe pairs. Save as `clip-1.mp4` … `clip-9.mp4`.
4. **Review each clip** before generating the next — if the racket morphs, lighting jumps, or motion breaks, regenerate before drift compounds.
5. **Extract frames** from each clip:
   ```
   ffmpeg -i clip-N.mp4 -vf fps=30 clip-N-%04d.webp
   ```
6. **Renumber globally** so all extracted frames form one continuous sequence: `frame-0001.webp` (= keyframe 1) → `frame-1080.webp` (= keyframe 10). The final frame of clip N should equal the first frame of clip N+1 (= the shared keyframe).
7. **Optionally downsample** to keep the asset payload small — keeping every 3rd or 4th frame still scrubs smoothly:
   ```
   ffmpeg -i frame-%04d.webp -vf "select='not(mod(n,3))'" frame-down-%04d.webp
   ```
8. **Drop the final frames** into `public/sequence/`.
9. **Wire up** in `src/app/page.tsx`:
   ```tsx
   <SceneSequence totalFrames={360} height="500vh" />
   ```
   Adjust `totalFrames` to match the actual count, and `height` to control how much scroll the scrub spans (more height = slower scrub).
