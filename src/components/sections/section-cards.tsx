"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextFlip } from "@/components/animations/text-flip";

const SECTIONS = [
  {
    href: "/instalaciones",
    eyebrow: "01",
    title: "Instalaciones",
    blurb: "9 pistas dobles panorámicas, una individual. Pensadas para jugar todo el año.",
    image: "/images/club/club-13.jpg",
  },
  {
    href: "/escuela",
    eyebrow: "02",
    title: "Escuela",
    blurb: "Entrena con expertos. De primer contacto a competición.",
    image: "/images/club/club-14.jpg",
  },
  {
    href: "/revancha",
    eyebrow: "03",
    title: "La Revancha",
    blurb: "Restaurante exclusivo para relajarse después del juego.",
    image: "/images/club/club-07.jpg",
  },
  {
    href: "/gimnasio",
    eyebrow: "04",
    title: "Gimnasio",
    blurb: "Tu mejor versión empieza aquí. Entrenamiento libre y zona funcional.",
    image: "/images/club/club-10.jpg",
  },
  {
    href: "/eventos",
    eyebrow: "05",
    title: "Eventos",
    blurb: "Empresas, familias, torneos. Salas equipadas y catering propio.",
    image: "/images/club/club-01.jpg",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SectionCards() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 flex flex-col gap-2 sm:mb-16 sm:gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 sm:text-[10px] sm:tracking-[0.4em]">
            El club
          </span>
          <h2 className="max-w-3xl text-3xl font-light tracking-[-0.03em] text-white sm:text-4xl md:text-6xl">
            Cinco mundos bajo un mismo techo.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: easeOut, delay: (i % 3) * 0.1 }}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <Link
                href={s.href}
                data-cursor="pointer"
                className="group relative block aspect-[5/4] overflow-hidden rounded-2xl bg-white/5 sm:aspect-[4/5] sm:rounded-3xl lg:aspect-[3/4]"
                style={i === 0 ? { aspectRatio: "8 / 5" } : undefined}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
                  <div className="flex items-end justify-between gap-3 sm:gap-4">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 sm:text-[10px] sm:tracking-[0.4em]">
                        {s.eyebrow}
                      </span>
                      <h3 className="text-2xl font-light tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
                        <TextFlip>{s.title}</TextFlip>
                      </h3>
                      <p className="max-w-md text-xs font-light text-white/70 sm:text-sm md:text-base">
                        {s.blurb}
                      </p>
                    </div>
                    <span className="mb-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110 group-hover:border-white/80 sm:h-10 sm:w-10">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
