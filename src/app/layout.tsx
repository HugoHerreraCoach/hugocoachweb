import type { Metadata } from "next";
// 1. Importa las fuentes que necesitas
import {
  Montserrat,
  Barlow,
  Barlow_Condensed,
  Tangerine,
} from "next/font/google";
import "./globals.css";
import Menu from "@/components/layout/Menu";
import Footer from "@/components/layout/Footer";

// 2. Configura cada fuente para que use una variable CSS
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Variable para la fuente principal
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow", // Variable para Barlow
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed", // Variable para Barlow Condensed
  weight: ["400", "700"],
  display: "swap",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  variable: "--font-tangerine", // Variable para Tangerine
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hugo Herrera Coach",
  description: "Sitio web de coaching profesional de Hugo Herrera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${barlow.variable} ${barlowCondensed.variable} ${tangerine.variable} antialiased`}
      >
        <Menu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}