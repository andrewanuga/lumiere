import type { Metadata } from "next";
import { Cormorant, Syne, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Photography Studio",
  description: "Visual narratives crafted with precision. Portraits, weddings, editorial, and commercial work that holds long after the shutter closes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${geistMono.variable}`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
