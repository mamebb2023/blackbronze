import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactLenis from "lenis/react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlackBronze | Let us build your website",
    template: "%s | BlackBronze",
  },
  description:
    "Fast, scalable and engaging - turn your vision into reality with custom websites and web apps that streamline operations and elevate your brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-[#141414] text-white`}
      >
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
