import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/section-page";

export const metadata: Metadata = {
  title: "Eventos — Pro Padel Coslada",
  description:
    "Celebra a lo grande. Eventos corporativos, familiares y torneos. Salas equipadas y catering propio.",
};

export default function EventosPage() {
  return (
    <SectionPage
      eyebrow="05 — Eventos"
      title="Celebra a lo grande, donde los eventos cobran vida."
      lead="Empresas, familias, torneos. Salas equipadas y catering propio."
      body={
        <>
          <p>
            Diseñamos cada evento como una experiencia: desde un torneo
            corporativo con catering, hasta un cumpleaños con sala
            decorada y reservas de pista. La logística la llevamos
            nosotros — tú solo decides qué celebrar.
          </p>
          <p className="mt-6">
            Tarifas personalizadas según aforo, duración y servicios.
            Pídenos un presupuesto y te respondemos en el día.
          </p>
        </>
      }
      images={[
        "/images/club/club-01.jpg",
        "/images/club/club-02.jpg",
        "/images/club/club-03.jpg",
      ]}
      cta={{
        href: "mailto:info@propadelcoslada.com?subject=Eventos",
        label: "Solicitar presupuesto",
      }}
    />
  );
}
