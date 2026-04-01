import type { Metadata } from "next";
import { Tektur, Montserrat, Noto_Serif, Geist } from "next/font/google";
import "./globals.css";
import "@/styles/styles.css"
import ReactLenis from "lenis/react";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
  display: "swap",
});

const noto_serif = Noto_Serif({
  variable: "--font-noto_serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blackbronze.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "BlackBronze | Let Us Build Your Business",
    template: "%s | BlackBronze",
  },

  description:
    "BlackBronze is a premium web agency crafting custom websites and web applications that streamline operations and elevate your brand. Built with clarity, purpose, and longevity.",

  keywords: [
    "web agency",
    "custom website design",
    "web development",
    "brand identity",
    "responsive design",
    "next.js agency",
    "BlackBronze",
    "web app development",
    "UI UX design",
    "digital experiences",
  ],

  authors: [{ name: "BlackBronze", url: siteUrl }],
  creator: "BlackBronze",
  publisher: "BlackBronze",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BlackBronze",
    title: "BlackBronze | Let Us Build Your Business",
    description:
      "A premium web agency creating considered digital experiences for businesses that value quality over noise.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlackBronze — Let Us Build Your Business",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@blackbronze",
    creator: "@blackbronze",
    title: {
      default: "BlackBronze | Let Us Build Your Business",
      template: "%s | BlackBronze",
    },
    description:
      "A premium web agency creating considered digital experiences for businesses that value quality over noise.",
    images: [
      {
        url: "/og-image.png",
        alt: "BlackBronze — Let Us Build Your Business",
      },
    ],
  },

  category: "technology",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/bb-logo-white.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BlackBronze",
              url: siteUrl,
              logo: `${siteUrl}/bb-logo-white.png`,
              description:
                "A premium web agency creating considered digital experiences for businesses that value quality over noise.",
              sameAs: [
                "https://twitter.com/blackbronze",
                "https://linkedin.com/company/blackbronze",
                "https://facebook.com/blackbronze",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.className} ${tektur.variable} ${noto_serif.variable} antialiased bg-black text-white`}
      >
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
