"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SectionStub({ id, eyebrow, title, children }: Props) {
  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-32"
    >
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
        >
          {eyebrow}
        </motion.span>
        <h2 className="max-w-3xl text-4xl font-light tracking-[-0.03em] text-white md:text-7xl md:leading-[1.02]">
          {title}
        </h2>
        {children ? (
          <motion.div
            className="max-w-xl text-base text-white/60 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
          >
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
