"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/animations/magnetic";
import { LightButton } from "@/components/system/light-tabs";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  body?: ReactNode;
  images: string[];
  cta?: { href: string; label: string; external?: boolean };
}

export function SectionPage({
  eyebrow,
  title,
  lead,
  body,
  images,
  cta,
}: Props) {
  return (
    <article className="relative pt-16 sm:pt-20 md:pt-24">
      <header className="relative flex min-h-[70svh] flex-col justify-center px-4 py-16 sm:min-h-[80svh] sm:px-6 sm:py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 sm:gap-8">
          <motion.span
            className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 sm:text-[10px] sm:tracking-[0.4em]"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            className="max-w-4xl text-4xl font-light leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl sm:leading-[0.98] sm:tracking-[-0.04em] md:text-7xl lg:text-8xl"
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
            }}
          >
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.9, ease: easeOut }}
                className="mr-2 inline-block sm:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="max-w-2xl text-base font-light text-white/65 sm:text-lg md:text-2xl md:leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.7 }}
          >
            {lead}
          </motion.p>

          {cta ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 1.1 }}
            >
              <Magnetic strength={0.3}>
                <LightButton href={cta.href} external={cta.external} arrow>
                  {cta.label}
                </LightButton>
              </Magnetic>
            </motion.div>
          ) : null}
        </div>
      </header>

      {body ? (
        <section className="relative px-4 py-12 sm:px-6 sm:py-16">
          <motion.div
            className="mx-auto max-w-3xl text-base font-light text-white/65 sm:text-lg md:text-xl md:leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            {body}
          </motion.div>
        </section>
      ) : null}

      {images.length > 0 ? (
        <section className="relative px-4 pb-20 pt-4 sm:px-6 sm:pb-32 sm:pt-8">
          <div className="mx-auto grid max-w-7xl gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, i) => (
              <motion.div
                key={src}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 1,
                  ease: easeOut,
                  delay: (i % 3) * 0.1,
                }}
                whileHover={{ y: -6 }}
                data-cursor="pointer"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative border-t border-white/10 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center sm:gap-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30 sm:text-[10px] sm:tracking-[0.4em]">
            Reservas
          </span>
          <p className="max-w-xl text-xl font-light tracking-[-0.02em] text-white sm:text-2xl md:text-3xl">
            ¿Listo para jugar? Reserva tu pista en segundos.
          </p>
          <Magnetic strength={0.35}>
            <LightButton
              href="https://playtomic.com/clubs/pro-padel-coslada"
              external
              arrow
            >
              Reserva Ya
            </LightButton>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
