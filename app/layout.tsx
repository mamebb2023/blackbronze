import type { Metadata } from "next";
import { Tektur, Montserrat, Noto_Serif, Geist } from "next/font/google";
import "./globals.css";
import "@/styles/styles.css"
import ReactLenis from "lenis/react";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
});

const noto_serif = Noto_Serif({
  variable: "--font-noto_serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "BlackBronze | Let us build your website",
    template: "%s | BlackBronze",
  },
  description:
    "Turn your vision into reality with custom websites and web apps that streamline operations and elevate your brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${montserrat.className} ${tektur.variable} ${noto_serif.variable} antialiased bg-black text-white`}
      >
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
