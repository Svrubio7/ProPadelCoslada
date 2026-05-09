"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Single-dot cursor. No ring — just a small high-contrast dot via
 * mix-blend-difference. Grows when hovering interactive elements.
 * The page-level hover micro-interactions (TextFlip, Magnetic) do the
 * heavy lifting on each component instead of a cursor halo.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const [isInteractive, setIsInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='pointer'], [role='button']"
      );
      setIsInteractive(!!interactive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{ x, y, opacity: visible ? 1 : 0 }}
      animate={{
        width: isInteractive ? 16 : 8,
        height: isInteractive ? 16 : 8,
      }}
      transition={{ type: "spring", damping: 24, stiffness: 380 }}
    />
  );
}
