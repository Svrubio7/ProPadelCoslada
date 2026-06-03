import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/section-page";

export const metadata: Metadata = {
  title: "Gimnasio — Pro Padel Coslada",
  description:
    "Tu mejor versión empieza aquí. Entrenamiento libre, zona funcional y equipamiento de alta gama.",
};

export default function GimnasioPage() {
  return (
    <SectionPage
      eyebrow="04 — Gimnasio"
      title="Tu mejor versión empieza aquí."
      lead="Entrenamiento libre, zona funcional y equipamiento de alta gama."
      body={
        <>
          <p>
            Una sala completa pensada para complementar tu juego: zona de
            cardio, peso libre, jaula funcional y máquinas seleccionadas para
            cuidar la articulación y mejorar tu rendimiento dentro de la
            pista.
          </p>
          <p className="mt-6">
            Acceso para socios y planes diarios. Entrenamiento personal a
            petición.
          </p>
        </>
      }
      images={[
        "/images/club/gimnasio-01.jpg",
        "/images/club/gimnasio-02.jpg",
        "/images/club/gimnasio-03.jpg",
        "/images/club/club-10.jpg",
      ]}
      cta={{
        href: "mailto:info@propadelcoslada.com?subject=Gimnasio",
        label: "Más información",
      }}
    />
  );
}
