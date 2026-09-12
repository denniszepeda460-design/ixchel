import type { Metadata, Viewport } from "next";
import { Caveat, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CartAnimationOverlay from "@/components/cart/CartAnimationOverlay";
import { siteConfig } from "@/config/site";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ixchel.artesanal"),
  title: "Ixchel, Macetas de familia, inspiradas en nuestras raíces",
  description: "Macetas artesanales pensadas para el bienestar de tus plantas.",
  keywords: [
    "macetas artesanales",
    "macetas el salvador",
    "macetas la libertad",
    "estudio familiar macetas",
    "macetas con drenaje",
    "ixchel",
    "decoracion botanica",
  ],
  authors: [{ name: "Estudio Ixchel" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo principal-solo-icono.png",
  },
  openGraph: {
    title: "Ixchel, Macetas de familia, inspiradas en nuestras raíces",
    description: "Macetas artesanales pensadas para el bienestar de tus plantas.",
    url: "https://ixchel.artesanal",
    siteName: "ixchel",
    images: [
      {
        url: "/images/hero-planter.jpg",
        width: 1200,
        height: 900,
        alt: "Maceta artesanal Ixchel Luna Creciente con planta Callisia Pink",
      },
    ],
    locale: "es_SV",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#bf692e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${caveat.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-crema text-tierra font-sans selection:bg-terracotta/20 selection:text-tierra">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <CartAnimationOverlay />
      </body>
    </html>
  );
}
