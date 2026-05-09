"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  children: string;
  className?: string;
  duration?: number;
  staggerStep?: number;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Hover-driven letter flip. Two stacked copies of the text — on hover the top
 * one slides up and out, the bottom slides up into view. Each letter staggers
 * so the effect cascades from left to right.
 */
export function TextFlip({
  children,
  className,
  duration = 0.45,
  staggerStep = 0.025,
}: Props) {
  const [hover, setHover] = useState(false);
  const letters = children.split("");

  return (
    <span
      className={`relative inline-flex overflow-hidden align-middle leading-[1.05] ${className ?? ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={children}
    >
      <span className="flex" aria-hidden>
        {letters.map((c, i) => (
          <motion.span
            key={`a-${i}`}
            className="inline-block"
            animate={{ y: hover ? "-110%" : "0%" }}
            transition={{
              duration,
              ease: easeOut,
              delay: i * staggerStep,
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </span>
      <span className="absolute left-0 top-0 flex" aria-hidden>
        {letters.map((c, i) => (
          <motion.span
            key={`b-${i}`}
            className="inline-block"
            animate={{ y: hover ? "0%" : "110%" }}
            transition={{
              duration,
              ease: easeOut,
              delay: i * staggerStep,
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
