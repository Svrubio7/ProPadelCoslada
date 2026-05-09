import { Hero } from "@/components/sections/hero";
import { SectionCards } from "@/components/sections/section-cards";
import { SiteFooter } from "@/components/sections/site-footer";
import {
  ScrollNarrative,
  type NarrativePanel,
} from "@/components/animations/scroll-narrative";

const NARRATIVE_PANELS: NarrativePanel[] = [
  {
    eyebrow: "01 — Instalaciones",
    title: "Nueve pistas panorámicas. Una individual.",
    body:
      "Cristal panorámico, iluminación LED uniforme y césped premium con compactación profesional. Pensadas para jugar los doce meses del año.",
    features: [
      "9 pistas dobles + 1 individual",
      "Climatización todo el año",
      "Reservas instantáneas en Playtomic",
      "Disponibilidad 8:00 — 24:00",
    ],
    ctas: [
      {
        href: "https://playtomic.com/clubs/pro-padel-coslada",
        label: "Reservar pista",
        primary: true,
        external: true,
      },
      { href: "/instalaciones", label: "Ver instalaciones" },
    ],
  },
  {
    eyebrow: "02 — Escuela",
    title: "Entrena con expertos.",
    body:
      "Profesoras cualificadas. Enseñanza personalizada. De primer contacto a competición — biomecánica, colocación, lectura del rival.",
    features: [
      "Grupos reducidos",
      "Clases individuales",
      "Planes intensivos",
      "Todos los niveles",
    ],
    ctas: [
      {
        href: "mailto:info@propadelcoslada.com?subject=Escuela%20de%20p%C3%A1del",
        label: "Apuntarme",
        primary: true,
      },
      { href: "/escuela", label: "Más información" },
    ],
  },
  {
    eyebrow: "03 — La Revancha",
    title: "Cocina honesta después del juego.",
    body:
      "Menús de recuperación, platos rápidos y servicio de catering. Lo bueno, después del juego, sabe mejor.",
    features: [
      "Bravas, croquetas, alitas y más",
      "Catering para tu torneo",
      "Eventos privados",
      "Reserva de mesa",
    ],
    ctas: [
      { href: "tel:+34623754902", label: "Reservar mesa", primary: true },
      { href: "/revancha", label: "Ver carta" },
    ],
  },
  {
    eyebrow: "04 — Gimnasio",
    title: "Tu mejor versión empieza aquí.",
    body:
      "Clases colectivas, plan de entrenamiento libre y sesiones personales. Equipamiento de alta gama y horarios pensados para encajar con tus partidos.",
    features: [
      "Clases colectivas: Bono 4 — 40 € · Bono 8 — 72 €",
      "Plan libre: 25 €/mes (inscripción 0 €)",
      "Personal 1 a 1: desde 45 €/sesión",
      "Mañanas 8-11 · Mediodía 13-15 · Tardes 18-20",
    ],
    promo: {
      label: "Promo Apertura",
      highlight: "31/03",
      items: [
        "4 clases × 30 €",
        "Primera clase GRATIS",
        "Disponible hasta el 31 de marzo",
      ],
    },
    ctas: [
      {
        href: "mailto:info@propadelcoslada.com?subject=Gimnasio%20%E2%80%94%20Promo%20Apertura",
        label: "Apuntarme",
        primary: true,
      },
      {
        href: "https://wa.me/34623754902",
        label: "WhatsApp",
        external: true,
      },
    ],
  },
  {
    eyebrow: "05 — Eventos",
    title: "Celebra a lo grande.",
    body:
      "Empresas, familias, torneos. Salas equipadas y catering propio. La logística la llevamos nosotros — tú solo decides qué celebrar.",
    features: [
      "Eventos corporativos",
      "Cumpleaños y celebraciones",
      "Torneos privados",
      "Catering por La Revancha",
    ],
    ctas: [
      {
        href: "mailto:info@propadelcoslada.com?subject=Eventos",
        label: "Solicitar presupuesto",
        primary: true,
      },
      { href: "/eventos", label: "Más información" },
    ],
  },
];

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <ScrollNarrative
        totalFrames={821}
        framePrefix="/sequence/frame-"
        frameExtension=".jpg"
        framePadding={4}
        panels={NARRATIVE_PANELS}
        height="800vh"
      />

      <SectionCards />

      <SiteFooter />
    </main>
  );
}
