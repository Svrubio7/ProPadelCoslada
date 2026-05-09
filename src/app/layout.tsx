import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/system/smooth-scroll";
import { Cursor } from "@/components/system/cursor";
import { LogoIntro } from "@/components/system/logo-intro";
import { SiteHeader } from "@/components/system/site-header";
import { ParticleField } from "@/components/system/particle-field";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pro Padel Coslada — Exclusividad, Deporte y Estilo",
  description:
    "Club de pádel premium en Coslada. 9 pistas panorámicas, escuela, gimnasio, restaurante y eventos.",
  metadataBase: new URL("https://propadelcoslada.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <ParticleField />
          <Cursor />
          <LogoIntro />
          <SiteHeader />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
