"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaDribbble,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useHeaderTheme } from "@/contexts/HeaderThemeContext";
// import Logo from "./ui/Logo";

export default function Header() {
  const { isDark } = useHeaderTheme();
  const lenis = useLenis();

  const navigationLinks = [
    { href: "#services", label: "Services" },
    { href: "#works", label: "Works" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { label: "Twitter", href: "#", Icon: FaXTwitter },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
    { label: "GitHub", href: "#", Icon: FaGithub },
    { label: "Dribbble", href: "#", Icon: FaDribbble },
  ];

  return (
    <>
      {/* Logo - Top Left */}
      <div className="fixed top-5 left-5 z-999 pointer-events-auto">
        <Reveal>
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: "flex" }}
            >
              <Image
                src={isDark ? "/bb-logo-black.png" : "/bb-logo-white.png"}
                alt="BlackBronze Logo"
                width={32}
                height={32}
                className="size-10 object-contain"
              />
            </motion.div>
            {/* <Logo /> */}
          </Link>
        </Reveal>
      </div>

      {/* Navigation Links - Top Right */}
      <div className="fixed top-5 right-5 z-999 pointer-events-auto">
        <nav className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link, index) => (
            <Reveal key={link.href} index={index}>
              <Link
                href={link.href}
                className={`relative uppercase tracking-[2px] text-xs px-4 py-2 h-9 flex items-center justify-center transition-all duration-500
                  after:content-['']
                  after:absolute
                  after:bottom-0
                  after:left-1/2
                  after:-translate-x-1/2
                  after:w-[50%]
                  after:h-px
                  after:transition-all
                  after:duration-300
                  after:scale-90
                  after:opacity-0
                  hover:after:scale-100
                  hover:after:opacity-100
                  hover:after:w-[60%]
                  ${
                    isDark
                      ? "text-gray-800 hover:text-black after:bg-black"
                      : "text-gray-200 hover:text-white after:bg-white"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (lenis) {
                    lenis.scrollTo(link.href);
                  }
                }}
              >
                {link.label}
              </Link>
            </Reveal>
          ))}
        </nav>
      </div>

      {/* Social Links - Bottom Right */}
      <div className="fixed bottom-5 right-5 z-999 pointer-events-auto">
        <div className="flex gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.Icon;
            return (
              <Reveal key={social.label} index={index}>
                <a
                  href={social.href}
                  className={`relative overflow-hidden group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                    isDark
                      ? "bg-black/5 border border-gray-300/20 text-black"
                      : "bg-white/5 border border-gray-500/20 text-white"
                  }`}
                  aria-label={social.label}
                  target="_blank"
                >
                  <div
                    className={`absolute top-0 left-0 size-5 group-hover:top-1/2 group-hover:left-1/2 rounded-full blur-sm transition-all ${
                      isDark ? "bg-black/40" : "bg-white/40"
                    }`}
                  />
                  <Icon className="text-lg" />
                  <div
                    className={`absolute bottom-0 right-0 size-5 rounded-full blur-sm ${
                      isDark ? "bg-gray-300/60" : "bg-gray-700/60"
                    }`}
                  />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Reveal({
  children,
  index = 0,
}: {
  children: ReactNode;
  index?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1.5,
          ease: [0.85, 0.09, 0.15, 0.91],
          delay: 1 + 0.1 * index,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
