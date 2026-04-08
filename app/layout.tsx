import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

// Note: Cormorant is usually imported as Cormorant_Garamond for the full set
const cormorant = Cormorant_Garamond({
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
  description: "Visual narratives crafted with precision.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${cormorant.variable} ${syne.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Apply a base font class to the body so text isn't blank before CSS loads */}
      <body className={`${syne.className} antialiased`}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}