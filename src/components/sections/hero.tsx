"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/animations/magnetic";
import { LightButton } from "@/components/system/light-tabs";

const TAGLINE = ["Exclusividad,", "Deporte", "y", "Estilo", "en", "Coslada"];
const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-20 sm:px-6 sm:pt-0">
      <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
        <motion.div
          className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 sm:text-[10px] sm:tracking-[0.35em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Coslada · Madrid
        </motion.div>

        <motion.div
          className="w-full max-w-3xl md:max-w-5xl"
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.6, ease: easeOut }}
        >
          <Image
            src="/images/logo-full.png"
            alt="Pro Padel Coslada"
            width={2173}
            height={724}
            priority
            className="h-auto w-full select-none"
          />
        </motion.div>

        <motion.p
          className="text-base font-light text-white/70 sm:text-lg md:text-xl"
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.08, delayChildren: 1.6 } },
          }}
        >
          {TAGLINE.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.7, ease: easeOut }}
          className="mt-6"
        >
          <Magnetic strength={0.35}>
            <LightButton
              href="https://playtomic.com/clubs/pro-padel-coslada"
              external
              arrow
            >
              Reserva Ya
            </LightButton>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 1 }}
        aria-hidden
      >
        <div className="relative h-8 w-px overflow-hidden bg-white/10 sm:h-12">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-white/80 to-transparent"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
