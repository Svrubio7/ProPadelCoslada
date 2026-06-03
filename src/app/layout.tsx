import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/system/smooth-scroll";
import { Cursor } from "@/components/system/cursor";
import { LogoIntro } from "@/components/system/logo-intro";
import { SiteHeader } from "@/components/system/site-header";
import { WaveBackground } from "@/components/system/wave-background";

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

const title = "Pro Padel Coslada — Exclusividad, Deporte y Estilo";
const description =
  "Club de pádel premium en Coslada. 9 pistas panorámicas, escuela, gimnasio, restaurante y eventos.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://propadelcoslada.com"),
  openGraph: {
    title,
    description,
    url: "https://propadelcoslada.com",
    siteName: "Pro Padel Coslada",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
          <WaveBackground />
          <Cursor />
          <LogoIntro />
          <SiteHeader />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
