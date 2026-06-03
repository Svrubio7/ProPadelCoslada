"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TextFlip } from "@/components/animations/text-flip";
import { Magnetic } from "@/components/animations/magnetic";
import { LightTabs, LightButton } from "@/components/system/light-tabs";

const NAV_LINKS = [
  { href: "/instalaciones", label: "Instalaciones" },
  { href: "/escuela", label: "Escuela" },
  { href: "/revancha", label: "La Revancha" },
  { href: "/gimnasio", label: "Gimnasio" },
  { href: "/eventos", label: "Eventos" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Seamless scroll backdrop — gradient + blur both fade out through a
            bottom mask, so there's no hard edge or border line on scroll. */}
        <div
          aria-hidden
          className={[
            "pointer-events-none absolute inset-0 -z-10 backdrop-blur-md transition-opacity duration-500",
            "bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent",
            "[mask-image:linear-gradient(to_bottom,black_50%,transparent)]",
            "[-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent)]",
            scrolled ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20">
          <Link
            href="/"
            className="flex items-center"
            data-cursor="pointer"
            aria-label="Pro Padel Coslada — Inicio"
          >
            <Magnetic strength={0.3}>
              <motion.div layoutId="ppc-mark" className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Pro Padel Coslada"
                  width={120}
                  height={120}
                  priority
                  className="h-[52px] w-[52px] select-none rounded-xl sm:h-[57px] sm:w-[57px] sm:rounded-2xl md:h-[72px] md:w-[72px]"
                />
              </motion.div>
            </Magnetic>
          </Link>

          <LightTabs tabs={NAV_LINKS} className="hidden md:flex" />

          <Magnetic strength={0.25} className="hidden md:inline-flex">
            <LightButton
              href="https://playtomic.com/clubs/pro-padel-coslada"
              external
              size="sm"
            >
              Reserva Ya
            </LightButton>
          </Magnetic>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            data-cursor="pointer"
            aria-label="Abrir menú"
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  data-cursor="pointer"
                  className="text-3xl font-light text-white"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={href}
                      data-cursor="pointer"
                      className="text-4xl font-light tracking-[-0.03em] text-white"
                    >
                      <TextFlip>{label}</TextFlip>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                <a href="tel:+34623754902" data-cursor="pointer">
                  +34 623 754 902
                </a>
                <a href="mailto:info@propadelcoslada.com" data-cursor="pointer">
                  info@propadelcoslada.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
