import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";

const font = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlackBronze | A Cybersecurity Company",
  description:
    "BlackBronze is a cybersecurity company that provides services to protect your business from cyber threats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${font.className} antialiased`}>
        <UserProvider>
          <Toaster />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
