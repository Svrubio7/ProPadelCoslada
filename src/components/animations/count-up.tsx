"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

/**
 * Counts up from 0 to `to` once when scrolled into view.
 */
export function CountUp({ to, duration = 1.6, className, suffix }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const val = useMotionValue(0);
  const display = useTransform(val, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(val, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, val]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}
