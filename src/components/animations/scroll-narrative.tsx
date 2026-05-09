"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { TextFlip } from "@/components/animations/text-flip";
import { Magnetic } from "@/components/animations/magnetic";

export interface NarrativeCTA {
  href: string;
  label: string;
  primary?: boolean;
  external?: boolean;
}

export interface NarrativePromo {
  label: string;
  items: string[];
  highlight?: string;
}

export interface NarrativePanel {
  eyebrow: string;
  title: string;
  body: string;
  features?: string[];
  promo?: NarrativePromo;
  ctas: NarrativeCTA[];
}

interface Props {
  totalFrames: number;
  framePrefix?: string;
  frameExtension?: string;
  framePadding?: number;
  panels: NarrativePanel[];
  height?: string;
}

/**
 * Scroll-jacked narrative.
 *  - Sticky inner pins for the entire scroll budget so the section stays put.
 *  - Visual canvas sits on the LEFT in a fixed-aspect card (smaller than full bleed).
 *  - Right panel is a fixed-size container; content swaps via stacked absolute panels.
 *  - Each panel cascades its content (eyebrow → title → body → features → promo → CTAs)
 *    based on scroll progress within its slice.
 */
export function ScrollNarrative({
  totalFrames,
  framePrefix = "/sequence/frame-",
  frameExtension = ".jpg",
  framePadding = 4,
  panels,
  height = "600vh",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawn = useRef(-1);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload strategy:
  //  1. Don't fire all 821 image requests on mount — that pins the main thread
  //     during initial paint, breaking particles & the intro animation.
  //  2. Use IntersectionObserver to wait until the user is within ~1.5
  //     viewports of this section before starting any downloads.
  //  3. Once gated, load in small batches with requestIdleCallback so the
  //     decode work happens during browser idle time, never blocking RAF.
  useEffect(() => {
    if (totalFrames <= 0) return;
    const container = containerRef.current;
    if (!container) return;

    const imgs: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = imgs;

    let loaded = 0;
    let cancelled = false;
    let started = false;

    const startPreload = () => {
      if (started || cancelled) return;
      started = true;

      const BATCH = 24;
      let next = 0;

      type IdleCB = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;
      const ric: (cb: IdleCB) => number =
        typeof window !== "undefined" &&
        typeof (window as unknown as { requestIdleCallback?: unknown })
          .requestIdleCallback === "function"
          ? (window as unknown as { requestIdleCallback: (cb: IdleCB) => number })
              .requestIdleCallback
          : (cb: IdleCB) =>
              window.setTimeout(
                () =>
                  cb({ didTimeout: false, timeRemaining: () => 0 }),
                40
              );

      const loadBatch: IdleCB = () => {
        if (cancelled) return;
        const end = Math.min(next + BATCH, totalFrames);
        for (let j = next; j < end; j++) {
          if (imgs[j]) continue;
          const img = new window.Image();
          img.src = `${framePrefix}${String(j + 1).padStart(framePadding, "0")}${frameExtension}`;
          img.decoding = "async";
          img.onload = () => {
            loaded += 1;
            setLoadedCount(loaded);
          };
          imgs[j] = img;
        }
        next = end;
        if (next < totalFrames) ric(loadBatch);
      };

      ric(loadBatch);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startPreload();
          observer.disconnect();
        }
      },
      // Start preloading when the section is within ~1.5 viewports above or below
      { rootMargin: "150% 0px 150% 0px", threshold: 0 }
    );
    observer.observe(container);

    // Safety fallback: if observer never fires (very tall pages, etc.),
    // start preload after the page has had time to settle past the intro.
    const fallback = window.setTimeout(startPreload, 4500);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [totalFrames, framePrefix, frameExtension, framePadding]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let raf = 0;
    let mounted = true;

    const draw = (i: number) => {
      const img = imagesRef.current[Math.max(0, Math.min(i, totalFrames - 1))];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const ar = img.naturalWidth / img.naturalHeight;
      const cAr = w / h;
      let dw = w;
      let dh = h;
      let dx = 0;
      let dy = 0;
      if (ar > cAr) {
        dw = h * ar;
        dx = (w - dw) / 2;
      } else {
        dh = w / ar;
        dy = (h - dh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawn.current = i;
    };

    const tick = () => {
      if (!mounted) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      if (range > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / range));
        const idx = Math.round(progress * (totalFrames - 1));
        if (idx !== lastDrawn.current) draw(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, [totalFrames]);

  const enoughLoaded = loadedCount >= Math.min(30, totalFrames);

  return (
    <section ref={containerRef} style={{ height }} className="relative">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-4 pb-3 pt-16 md:px-8 md:py-8">
        <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center gap-2 sm:gap-4 md:flex-row md:gap-10 md:max-h-[88vh] lg:gap-16">
          {/* LEFT: video canvas card — bigger on mobile (~65% larger), scales up further on bigger screens */}
          <div className="relative aspect-[4/3] w-full max-w-[300px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] sm:max-w-[320px] md:max-w-md md:rounded-2xl lg:max-w-lg xl:max-w-xl">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block h-full w-full"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
            {!enoughLoaded ? (
              <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.4em] text-white/30 md:bottom-3 md:text-[9px]">
                {loadedCount} / {totalFrames}
              </div>
            ) : null}
          </div>

          {/* RIGHT: fixed-size panel container — content swaps via stacked panels */}
          <div className="relative flex w-full max-w-md flex-1 flex-col md:flex-initial md:h-[560px] lg:h-[600px]">
            <div className="relative h-full min-h-0 md:min-h-0 md:h-full">
              {panels.map((panel, i) => (
                <Panel
                  key={i}
                  scrollProgress={scrollYProgress}
                  index={i}
                  total={panels.length}
                  panel={panel}
                />
              ))}
            </div>

            {/* Section number indicator — under the panel */}
            <div className="mt-2 flex items-center gap-1.5 md:mt-6 md:gap-3">
              {panels.map((_, i) => (
                <Pip
                  key={i}
                  scrollProgress={scrollYProgress}
                  index={i}
                  total={panels.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Panels occupy this fraction of total scroll. The remainder is "trailing hold"
// where the last panel stays fully visible while frames keep advancing — so the
// section doesn't unstick until everything has been read.
const PANELS_USABLE = 0.75;

function Panel({
  scrollProgress,
  index,
  total,
  panel,
}: {
  scrollProgress: MotionValue<number>;
  index: number;
  total: number;
  panel: NarrativePanel;
}) {
  const slice = PANELS_USABLE / total;
  const start = index * slice;
  const end = start + slice;
  const fade = slice * 0.08;
  const isLast = index === total - 1;

  // Last panel: fade in, then stay until scroll progress = 1.0 (no fade out)
  // No x-slide on the panel itself — that was making text appear to "drift"
  // during transitions. Pure cross-fade is cleaner.
  const opacity = useTransform(
    scrollProgress,
    isLast
      ? [clamp01(start), clamp01(start + fade), 1]
      : [
          clamp01(start),
          clamp01(start + fade),
          clamp01(end - fade),
          clamp01(end),
        ],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  // Tighten cascade so all items revealed by ~49% of slice.
  // That leaves ~43% of slice as a "hold all visible" window.
  const revealStart = start + 0.08 * slice;
  const itemSpan = (0.4 * slice) / 6;
  const itemDuration = itemSpan * 1.1;

  // Item reveals are pure opacity fades — no y-slide. Items appear in their
  // final position; scrolling past the reveal point doesn't shift them further.
  const eyebrowOp = useReveal(scrollProgress, revealStart + itemSpan * 0, itemDuration);
  const titleOp = useReveal(scrollProgress, revealStart + itemSpan * 1, itemDuration);
  const bodyOp = useReveal(scrollProgress, revealStart + itemSpan * 2, itemDuration);
  const featuresOp = useReveal(scrollProgress, revealStart + itemSpan * 3, itemDuration);
  const promoOp = useReveal(scrollProgress, revealStart + itemSpan * 4, itemDuration);
  const ctasOp = useReveal(scrollProgress, revealStart + itemSpan * 5, itemDuration);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center gap-1.5 overflow-hidden md:gap-4"
      style={{ opacity }}
    >
      <motion.span
        className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 md:text-[10px] md:tracking-[0.4em]"
        style={{ opacity: eyebrowOp }}
      >
        {panel.eyebrow}
      </motion.span>

      <motion.h2
        className="text-xl font-light leading-[1.08] tracking-[-0.02em] text-white sm:text-3xl md:text-4xl lg:text-5xl"
        style={{ opacity: titleOp }}
      >
        {panel.title}
      </motion.h2>

      <motion.p
        className="text-[11px] font-light leading-snug text-white/75 sm:text-sm md:text-base md:leading-relaxed"
        style={{ opacity: bodyOp }}
      >
        {panel.body}
      </motion.p>

      {panel.features ? (
        <motion.ul
          className="flex flex-col gap-0.5 text-[10px] text-white/70 sm:text-xs md:gap-1.5 md:text-sm"
          style={{ opacity: featuresOp }}
        >
          {panel.features.map((f, j) => (
            <li key={j} className="flex items-start gap-1.5 leading-snug md:gap-2.5">
              <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-white/60 md:mt-1.5" />
              <span>{f}</span>
            </li>
          ))}
        </motion.ul>
      ) : null}

      {panel.promo ? (
        <motion.div
          className="rounded-md border border-white/15 bg-white/[0.03] p-2 md:rounded-xl md:p-3.5"
          style={{ opacity: promoOp }}
        >
          <div className="flex items-baseline justify-between gap-2 md:gap-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/50 md:text-[9px] md:tracking-[0.3em]">
              {panel.promo.label}
            </span>
            {panel.promo.highlight ? (
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide text-[#050505] md:px-2 md:text-[9px]">
                {panel.promo.highlight}
              </span>
            ) : null}
          </div>
          <ul className="mt-1 flex flex-col gap-0.5 text-[10px] font-light leading-snug text-white sm:text-xs md:mt-2 md:text-sm">
            {panel.promo.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        </motion.div>
      ) : null}

      <motion.div
        className="flex flex-wrap gap-1.5 pt-0 md:gap-2.5 md:pt-1"
        style={{ opacity: ctasOp }}
      >
        {panel.ctas.map((cta, j) => (
          <CTAButton key={j} cta={cta} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function CTAButton({ cta }: { cta: NarrativeCTA }) {
  const cls = [
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-medium transition-colors md:gap-2 md:px-4 md:py-2 md:text-sm",
    cta.primary
      ? "bg-white text-[#050505] hover:bg-white/90"
      : "border border-white/30 text-white hover:border-white/70",
  ].join(" ");

  return (
    <Magnetic strength={0.25}>
      {cta.external ? (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className={cls}
        >
          <TextFlip>{cta.label}</TextFlip>
          <span>→</span>
        </a>
      ) : (
        <Link href={cta.href} data-cursor="pointer" className={cls}>
          <TextFlip>{cta.label}</TextFlip>
          <span>→</span>
        </Link>
      )}
    </Magnetic>
  );
}

function Pip({
  scrollProgress,
  index,
  total,
}: {
  scrollProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const slice = PANELS_USABLE / total;
  const start = index * slice;
  const end = start + slice;
  const fade = slice * 0.1;
  const isLast = index === total - 1;

  const width = useTransform(
    scrollProgress,
    isLast
      ? [clamp01(start), clamp01(start + fade), 1]
      : [
          clamp01(start),
          clamp01(start + fade),
          clamp01(end - fade),
          clamp01(end),
        ],
    isLast ? ["12px", "32px", "32px"] : ["12px", "32px", "32px", "12px"]
  );
  const opacity = useTransform(
    scrollProgress,
    isLast
      ? [clamp01(start), clamp01(start + fade), 1]
      : [
          clamp01(start),
          clamp01(start + fade),
          clamp01(end - fade),
          clamp01(end),
        ],
    isLast ? [0.3, 1, 1] : [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      className="h-[2px] rounded-full bg-white"
      style={{ width, opacity }}
      aria-hidden
    />
  );
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function useReveal(
  progress: MotionValue<number>,
  start: number,
  duration: number
) {
  const a = clamp01(start);
  const b = clamp01(start + duration);
  const safeB = b > a ? b : Math.min(1, a + 0.001);
  return useTransform(progress, [a, safeB], [0, 1]);
}

