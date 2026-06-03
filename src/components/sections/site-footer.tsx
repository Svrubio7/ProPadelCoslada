import Link from "next/link";
import Image from "next/image";
import { TextFlip } from "@/components/animations/text-flip";
import { LightButton } from "@/components/system/light-tabs";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Image
            src="/images/logo-full.png"
            alt="Pro Padel Coslada"
            width={2173}
            height={724}
            className="h-auto w-40 select-none sm:w-48"
          />
          <span className="text-xs text-white/40 sm:text-sm">Coslada · Madrid</span>
        </div>

        <nav className="flex flex-col gap-3 text-sm font-light text-white/70">
          <Link href="/instalaciones" data-cursor="pointer" className="hover:text-white w-fit">
            <TextFlip>Instalaciones</TextFlip>
          </Link>
          <Link href="/escuela" data-cursor="pointer" className="hover:text-white w-fit">
            <TextFlip>Escuela</TextFlip>
          </Link>
          <Link href="/revancha" data-cursor="pointer" className="hover:text-white w-fit">
            <TextFlip>La Revancha</TextFlip>
          </Link>
          <Link href="/gimnasio" data-cursor="pointer" className="hover:text-white w-fit">
            <TextFlip>Gimnasio</TextFlip>
          </Link>
          <Link href="/eventos" data-cursor="pointer" className="hover:text-white w-fit">
            <TextFlip>Eventos</TextFlip>
          </Link>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-white/60">
          <a href="tel:+34623754902" data-cursor="pointer" className="hover:text-white w-fit">
            +34 623 754 902
          </a>
          <a
            href="mailto:info@propadelcoslada.com"
            data-cursor="pointer"
            className="hover:text-white w-fit"
          >
            info@propadelcoslada.com
          </a>
          <LightButton
            href="https://playtomic.com/clubs/pro-padel-coslada"
            external
            size="sm"
            className="mt-2 w-fit"
          >
            Reserva Ya
          </LightButton>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 sm:mt-16 sm:pt-8 sm:text-[10px] sm:tracking-[0.3em]">
        <span>© {new Date().getFullYear()} Pro Padel Coslada</span>
        <span>Coslada</span>
      </div>
    </footer>
  );
}
