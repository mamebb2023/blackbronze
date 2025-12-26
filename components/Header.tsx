"use client";

import { Button } from "./ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const navigationLinks = [
  // { href: "#features", label: "Features" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#quote", label: "Get Quote" },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          // Check if at top
          const atTop = currentScrollY < 50;
          setIsAtTop(atTop);

          // Always show header when at top
          if (atTop) {
            setIsVisible(true);
          } else {
            // Show header when scrolling up, hide when scrolling down
            // Only update if scroll delta is meaningful to reduce jitter
            if (Math.abs(scrollDelta) > 2) {
              setIsVisible(scrollDelta < 0);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`w-full px-6 py-4 fixed top-0 left-0 right-0 z-50 ${
        isAtTop
          ? "bg-transparent border-b border-transparent"
          : "bg-black/30 backdrop-blur-md border-b border-gray-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/bb-logo-white.png"
            alt="BlackBronze Logo"
            width={32}
            height={32}
            className="size-10 object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="link"
                size="sm"
                className="font-normal text-sm px-4 py-2"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* <Button variant="ghost" size="sm" className="hidden sm:flex">
            Login
          </Button> */}
          <Button variant="liquid">Get Started</Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
