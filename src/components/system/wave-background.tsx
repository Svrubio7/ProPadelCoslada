"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive wavy-line background.
 *
 * Faithful port of the Framer "Interactive Wave Background" component
 * (framer.com/m/InteractiveWaveBackground-prod-RZk7.js) — same seeded
 * simplex-noise field, wave motion and mouse spring physics — rebuilt as a
 * dependency-free React/SVG client component.
 *
 * Differences from the Framer original (intentional, for use as a site bg):
 *  - Fixed full-viewport at z-0, `pointer-events-none` so it never blocks
 *    scroll or clicks; reacts to the cursor via a window `mousemove` listener.
 *  - No `touchmove` handler (the original called preventDefault, which would
 *    block scrolling on touch devices).
 *  - Pauses when off-screen / tab hidden and respects prefers-reduced-motion.
 */

// --- Seeded 2D simplex noise (ported verbatim) -----------------------------
function createNoise2D(seed = 0.5) {
  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;
  const G22 = (3 - Math.sqrt(3)) / 3;
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  const seededRandom = (index: number) => {
    const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 255; i > 0; i--) {
    const n = Math.floor((i + 1) * seededRandom(i));
    const q = p[i];
    p[i] = p[n];
    p[n] = q;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const grad2 = new Float64Array([
    1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0,
    -1,
  ]);
  const fastFloor = (x: number) => Math.floor(x) | 0;
  return function noise2D(x: number, y: number) {
    const s = (x + y) * F2;
    const i = fastFloor(x + s);
    const j = fastFloor(y + s);
    const t = (i + j) * G2;
    const x0 = x - (i - t);
    const y0 = y - (j - t);
    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + G22;
    const y2 = y0 - 1 + G22;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = permMod12[ii + perm[jj]];
    const gi1 = permMod12[ii + i1 + perm[jj + j1]];
    const gi2 = permMod12[ii + 1 + perm[jj + 1]];
    let n0: number, n1: number, n2: number;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * (grad2[gi0 * 2] * x0 + grad2[gi0 * 2 + 1] * y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * (grad2[gi1 * 2] * x1 + grad2[gi1 * 2 + 1] * y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * (grad2[gi2 * 2] * x2 + grad2[gi2 * 2 + 1] * y2);
    }
    return 70 * (n0 + n1 + n2);
  };
}

interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

interface WaveBackgroundProps {
  /** Stroke color of the lines. Defaults to a soft white for the dark theme. */
  strokeColor?: string;
  /** 0–1, animation speed. Framer instance: 0.3 */
  waveSpeed?: number;
  /** 0–1, wave displacement. Framer instance: 0.4 */
  waveAmplitude?: number;
  /** 0–1, cursor push strength. Framer instance: 0.8 */
  mouseInfluence?: number;
  /** 0–1 ("Amount"), line density. Framer instance: 0.9 */
  lineSpacing?: number;
  /** 0–1, deterministic noise seed. Framer instance: 0.7 */
  seed?: number;
  /** 0–1, points-per-line density. Framer instance: 0.7 */
  resolution?: number;
}

export function WaveBackground({
  strokeColor = "rgba(255,255,255,0.1)",
  waveSpeed = 0.3,
  waveAmplitude = 0.4,
  mouseInfluence = 0.8,
  lineSpacing = 0.9,
  seed = 0.7,
  resolution = 0.7,
}: WaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const noise = createNoise2D(seed);
    const mouse = { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, vs: 0, set: false };
    let lines: Point[][] = [];
    let paths: SVGPathElement[] = [];
    let size = { width: 1, height: 1 };
    let raf = 0;
    let visible = true;

    // Sparser geometry on small screens keeps the point count manageable.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const effLineSpacing = isMobile ? Math.min(lineSpacing, 0.65) : lineSpacing;
    const effResolution = isMobile ? Math.min(resolution, 0.45) : resolution;

    const setSize = () => {
      const width = container.clientWidth || window.innerWidth || 1;
      const height = container.clientHeight || window.innerHeight || 1;
      size = { width, height };
      svg.style.width = `${width}px`;
      svg.style.height = `${height}px`;
    };

    const setLines = () => {
      const { width, height } = size;
      lines = [];
      paths.forEach((path) => path.remove());
      paths = [];

      // lineSpacing 1 → dense (xGap 8); 0 → sparse (xGap 167)
      const xGap = 8 + (1 - effLineSpacing) * 159;
      // resolution 1 → many points (yGap 4); 0 → few (yGap 24)
      const yGap = 4 + (1 - effResolution) * 20;
      const oWidth = width + 200;
      const oHeight = height + 30;
      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);
      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;

      for (let i = 0; i < totalLines; i++) {
        const points: Point[] = [];
        for (let j = 0; j < totalPoints; j++) {
          points.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", "1");
        svg.appendChild(path);
        paths.push(path);
        lines.push(points);
      }
    };

    const movePoints = (time: number) => {
      if (!noise) return;
      const speedMultiplier = waveSpeed * 0.002;
      const amplitudeMultiplier = waveAmplitude * 2;
      const influenceMultiplier = mouseInfluence * 7e-4;
      const mouseSx = mouse.sx;
      const mouseSy = mouse.sy;
      const mouseVs = mouse.vs;
      const l = Math.max(175, mouseVs);

      for (let i = 0; i < lines.length; i++) {
        const points = lines[i];
        for (let j = 0; j < points.length; j++) {
          const p = points[j];
          const baseMove = noise(p.x * 0.003, p.y * 0.002) * 8;
          const move = waveSpeed > 0 ? baseMove + time * speedMultiplier : baseMove;
          p.wave.x = Math.cos(move) * 12 * amplitudeMultiplier;
          p.wave.y = Math.sin(move) * 6 * amplitudeMultiplier;

          const dx = p.x - mouseSx;
          const dy = p.y - mouseSy;
          const d = Math.hypot(dx, dy);
          if (d < l) {
            const s = 1 - d / l;
            const f = Math.cos(d * 0.001) * s * l * mouseVs * influenceMultiplier;
            const angle = Math.atan2(dy, dx);
            p.cursor.vx += Math.cos(angle) * f;
            p.cursor.vy += Math.sin(angle) * f;
          }
          p.cursor.vx += -p.cursor.x * 0.01;
          p.cursor.vy += -p.cursor.y * 0.01;
          p.cursor.vx *= 0.95;
          p.cursor.vy *= 0.95;
          p.cursor.x += p.cursor.vx;
          p.cursor.y += p.cursor.vy;
          p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x));
          p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y));
        }
      }
    };

    const moved = (point: Point, withCursorForce: boolean) => ({
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    });

    const drawLines = () => {
      for (let lIndex = 0; lIndex < lines.length; lIndex++) {
        const points = lines[lIndex];
        const path = paths[lIndex];
        if (!points || points.length < 2 || !path) continue;
        const parts: string[] = [];
        const first = moved(points[0], false);
        parts.push(`M ${first.x} ${first.y}`);
        for (let i = 1; i < points.length; i++) {
          const c = moved(points[i], true);
          parts.push(`L ${c.x} ${c.y}`);
        }
        path.setAttribute("d", parts.join(""));
      }
    };

    const updateMouse = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = x - rect.left;
      mouse.y = y - rect.top;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    };
    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);

    const onResize = () => {
      setSize();
      setLines();
      if (reduceMotion) {
        movePoints(0);
        drawLines();
      }
    };

    const tick = (time: number) => {
      if (!visible) return;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      movePoints(time);
      drawLines();
      raf = requestAnimationFrame(tick);
    };

    setSize();
    setLines();
    movePoints(0);
    drawLines();

    window.addEventListener("resize", onResize);

    if (!reduceMotion) {
      window.addEventListener("mousemove", onMouseMove);

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible = entry.isIntersecting;
            if (visible && !raf) raf = requestAnimationFrame(tick);
            else if (!visible && raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          });
        },
        { threshold: 0 }
      );
      io.observe(container);

      const onVisibility = () => {
        if (document.hidden) {
          visible = false;
          if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        } else {
          visible = true;
          if (!raf) raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      raf = requestAnimationFrame(tick);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("visibilitychange", onVisibility);
        io.disconnect();
      };
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [
    strokeColor,
    waveSpeed,
    waveAmplitude,
    mouseInfluence,
    lineSpacing,
    seed,
    resolution,
  ]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}
