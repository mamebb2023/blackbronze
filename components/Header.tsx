"use client";

import { Button } from "./ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navigationLinks = [
  // { href: "#features", label: "Features" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if at top
      setIsAtTop(currentScrollY < 50);

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: isVisible ? 0 : "-100%", opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`w-full px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
            className="w-8 h-8 object-contain"
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
