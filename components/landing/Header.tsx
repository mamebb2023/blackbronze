"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useHeaderTheme } from "@/contexts/HeaderThemeContext";
import { links } from "@/constants";

export default function Header() {
  const { isDark } = useHeaderTheme();
  const lenis = useLenis();

  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("#footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 🔥 Trigger when footer reaches middle of screen
      const isHalfVisible =
        rect.top <= viewportHeight * 0.5 &&
        rect.bottom >= viewportHeight * 0.5;

      setHideHeader(isHalfVisible);
    };

    handleScroll(); // run once
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socials = [
    { label: "Twitter", href: "#", Icon: FaXTwitter },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
    { label: "FaceBook", href: "#", Icon: FaFacebook },
  ];

  return (
    <motion.div id="header">
      {/* Logo - Top Left */}
      <motion.div
        animate={hideHeader ? "hidden" : "visible"}
        variants={{
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          hidden: {
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        }}
        style={{ pointerEvents: hideHeader ? "none" : "auto" }}
        className="fixed top-5 left-5 z-999"
      >
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
      </motion.div>

      {/* Navigation Links - Top Right */}
      <motion.div
        animate={hideHeader ? "hidden" : "visible"}
        variants={{
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          hidden: {
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        }}
        style={{ pointerEvents: hideHeader ? "none" : "auto" }}
        className="fixed top-5 right-5 z-999"
      >
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link, index) => (
            <Reveal key={link.href} index={index}>
              <Link
                href={link.href}
                className={`relative uppercase tracking-[2px] text-xs px-4 py-2 h-9 flex items-center justify-center transition-all duration-500 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-px after:transition-all after:duration-300 after:scale-90 after:opacity-0 hover:after:scale-100 hover:after:opacity-100 hover:after:w-[60%] 
                  ${isDark
                    ? "text-gray-800 hover:text-black after:bg-bronze-500"
                    : "text-gray-200 hover:text-white after:bg-bronze-500"
                  }`
                }
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
      </motion.div>

      {/* Social Links - Bottom Right */}
      <motion.div
        animate={hideHeader ? "hidden" : "visible"}
        variants={{
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          hidden: {
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        }}
        style={{ pointerEvents: hideHeader ? "none" : "auto" }}
        className="fixed bottom-5 right-5 z-999"
      >
        <div className="flex gap-3">
          {socials.map((social, index) => {
            const Icon = social.Icon;
            return (
              <Reveal key={social.label} index={index}>
                <Link
                  href={social.href}
                  className={`relative overflow-hidden group size-10 rounded-lg flex items-center justify-center transition-all duration-500 ${isDark
                    ? "bg-black/5 border border-gray-300/20 text-black"
                    : "bg-white/5 border border-gray-500/20 text-white"
                    }`}
                  aria-label={social.label}
                  target="_blank"
                >
                  <div
                    className={`absolute top-1/2 -translate-x-1/2 left-1/2 size-5 group-hover:size-full rounded-full blur-sm transition-all duration-500 ${isDark ? "bg-bronze-500" : "bg-bronze-700"
                      }`}
                  />
                  <Icon className="text-lg relative" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
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
