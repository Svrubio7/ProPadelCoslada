"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Total timeline:
//   0.00s — mount, logo starts dropping in from above
//   0.95s — logo lands at center, scale settled (entry done)
//   0.95s – 2.10s — pause (1.15s held)
//   2.10s — AnimatePresence exit triggers
//   2.10s – 2.85s — bg fades + logo flies to navbar via layoutId
//   ≈ 2.85s total
const HOLD_MS = 2100;

/**
 * On mount, the PPC monogram drops in from above and "lands" at center
 * with a strong decelerating ease, holds for ~1.1s, then exits — Framer's
 * shared `layoutId` carries the same mark to its small slot in the navbar.
 *
 * `show` defaults to `true` so the splash is part of the very first render
 * (and the static-export HTML). This prevents a one-frame flash of the
 * particle field before the overlay appears.
 *
 * sessionStorage gating is intentionally absent during build-out so reloads
 * always replay the intro. Re-add for production.
 */
export function LogoIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      setShow(false);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="ppc-intro-overlay"
          aria-hidden
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1], delay: 0.4 },
          }}
        >
          <motion.div
            layoutId="ppc-mark"
            className="overflow-hidden rounded-[clamp(20px,4vw,48px)]"
            initial={{ y: -160, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              y: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.55, ease: "easeOut" },
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Pro Padel Coslada"
              width={520}
              height={520}
              priority
              className="h-[clamp(180px,40vw,400px)] w-[clamp(180px,40vw,400px)] select-none"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Pro Padel Coslada
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
