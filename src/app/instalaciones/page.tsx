import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/section-page";

export const metadata: Metadata = {
  title: "Instalaciones — Pro Padel Coslada",
  description:
    "9 pistas dobles panorámicas y 1 pista individual. Tecnología, diseño y calidad en cada detalle.",
};

export default function InstalacionesPage() {
  return (
    <SectionPage
      eyebrow="01 — Instalaciones"
      title="Nueve pistas panorámicas. Una individual."
      lead="Tecnología, diseño y calidad. Cada pista pensada para el juego y para ti."
      body={
        <>
          <p>
            Diez pistas concebidas con los mejores materiales del sector y un
            cuidado obsesivo por el detalle. Iluminación LED uniforme,
            cristal panorámico, césped premium con compactación profesional y
            climatización pensada para que juegues los doce meses del año.
          </p>
          <p className="mt-6">
            Reservas instantáneas a través de Playtomic. Disponibilidad
            ampliada de 8:00 a 24:00.
          </p>
        </>
      }
      images={[
        "/images/club/club-13.jpg",
        "/images/club/club-15.jpg",
        "/images/club/club-14.jpg",
      ]}
      cta={{
        href: "https://playtomic.com/clubs/pro-padel-coslada",
        label: "Reservar pista",
        external: true,
      }}
    />
  );
}
