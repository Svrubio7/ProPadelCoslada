import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/section-page";

export const metadata: Metadata = {
  title: "Escuela — Pro Padel Coslada",
  description:
    "Entrena con expertos. Profesoras cualificadas y enseñanza personalizada para todos los niveles.",
};

export default function EscuelaPage() {
  return (
    <SectionPage
      eyebrow="02 — Escuela"
      title="Entrena con expertos y perfecciona tu juego."
      lead="Profesoras cualificadas. Enseñanza personalizada. De primer contacto a competición."
      body={
        <>
          <p>
            La escuela está diseñada para acompañarte donde estés. Si nunca
            has cogido una pala, te sostenemos en los primeros golpes. Si ya
            compites, afinamos cada detalle de tu juego — biomecánica,
            colocación, lectura del rival.
          </p>
          <p className="mt-6">
            Grupos reducidos, clases individuales y planes intensivos.
            Pregúntanos por horarios y disponibilidad.
          </p>
        </>
      }
      images={[
        "/images/club/club-14.jpg",
        "/images/club/club-15.jpg",
      ]}
      cta={{
        href: "mailto:info@propadelcoslada.com?subject=Escuela%20de%20p%C3%A1del",
        label: "Contactar con la escuela",
      }}
    />
  );
}
