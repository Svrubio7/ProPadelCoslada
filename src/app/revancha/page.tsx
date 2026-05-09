import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/section-page";

export const metadata: Metadata = {
  title: "La Revancha — Pro Padel Coslada",
  description:
    "Restaurante exclusivo para relajarse después del juego. Menús de recuperación, platos rápidos y catering.",
};

export default function RevanchaPage() {
  return (
    <SectionPage
      eyebrow="03 — La Revancha"
      title="Restaurante exclusivo para relajarse después del juego."
      lead="Menús de recuperación, platos rápidos y servicio de catering."
      body={
        <>
          <p>
            La Revancha existe porque el partido no termina cuando suena el
            último punto. Cocina honesta, pensada para reponer y para
            disfrutar — desde el desayuno antes de tu reserva hasta una cena
            larga compartiendo mesa.
          </p>
          <p className="mt-6">
            Reserva mesa, organiza eventos privados o pídenos catering para
            tu torneo. Lo bueno, después del juego, sabe mejor.
          </p>
        </>
      }
      images={[
        "/images/club/club-07.jpg",
        "/images/club/club-08.jpg",
        "/images/club/club-06.jpg",
        "/images/club/club-05.jpg",
        "/images/club/club-04.jpg",
        "/images/club/club-03.jpg",
      ]}
      cta={{
        href: "tel:+34623754902",
        label: "Reservar mesa",
      }}
    />
  );
}
