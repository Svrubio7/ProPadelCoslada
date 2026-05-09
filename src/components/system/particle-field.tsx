"use client";

import { useEffect, useRef } from "react";

/**
 * Atmospheric white particles drifting faintly across the viewport.
 * Custom canvas — pre-rendered radial-gradient sprite drawn per particle.
 *
 *  - Mobile: ~90 particles, desktop: 100–220 (scales with viewport area)
 *  - Slow upward drift (0.05–0.25 px/frame), gentle horizontal sway
 *  - Twinkle via sin-wave on opacity
 *  - Pauses on tab hide, respects prefers-reduced-motion
 *  - Fixed positioning at z-0; content layer should sit at z >= 10
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Pre-render a soft radial sprite — wide falloff so each particle has a
    // visible glow halo that "illuminates" the area around it.
    const SPRITE = 48;
    const sprite = document.createElement("canvas");
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sprCtx = sprite.getContext("2d");
    if (sprCtx) {
      const grad = sprCtx.createRadialGradient(
        SPRITE / 2,
        SPRITE / 2,
        0,
        SPRITE / 2,
        SPRITE / 2,
        SPRITE / 2
      );
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.18, "rgba(255,255,255,0.65)");
      grad.addColorStop(0.45, "rgba(255,255,255,0.22)");
      grad.addColorStop(0.75, "rgba(255,255,255,0.06)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sprCtx.fillStyle = grad;
      sprCtx.fillRect(0, 0, SPRITE, SPRITE);
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;
      twinkleOffset: number;
      twinkleSpeed: number;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // 50% more particles than before
    const targetCount = isMobile
      ? 195
      : Math.min(420, Math.floor((width * height) / 4700));

    const make = (initialY?: number): Particle => ({
      x: Math.random() * width,
      y: initialY ?? Math.random() * height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -Math.random() * 0.24 - 0.05,
      size: Math.random() * 2.2 + 0.9, // 0.9 – 3.1 px
      baseOpacity: Math.random() * 0.66 + 0.36, // 0.36 – 1.02 (another ~20%)
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0006 + Math.random() * 0.0009,
    });

    const particles: Particle[] = Array.from({ length: targetCount }, () =>
      make()
    );

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = true;

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges — recycle from bottom when a particle drifts off the top
        if (p.y < -8) {
          p.y = height + 8;
          p.x = Math.random() * width;
        }
        if (p.x < -8) p.x = width + 8;
        else if (p.x > width + 8) p.x = -8;

        const twinkle = 0.65 + Math.sin(t * p.twinkleSpeed + p.twinkleOffset) * 0.35;
        ctx.globalAlpha = p.baseOpacity * twinkle;

        const drawSize = p.size * 7;
        ctx.drawImage(
          sprite,
          p.x - drawSize / 2,
          p.y - drawSize / 2,
          drawSize,
          drawSize
        );
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen"
      aria-hidden
    />
  );
}
