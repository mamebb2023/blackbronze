"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { FaDribbble, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Header() {
  const navigationLinks = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Work" },
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
    <div className="fixed inset-0 z-999 flex flex-col justify-between p-5 pointer-events-none">
      <div className="flex justify-between items-center pointer-events-auto">
        <Reveal>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/bb-logo-white.png"
              alt="BlackBronze Logo"
              width={32}
              height={32}
              className="size-10 object-contain"
            />
          </Link>
        </Reveal>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationLinks.map((link, index) => (
            <Reveal key={link.href} index={index}>
              <Link href={link.href}>
                <Button
                  variant="link"
                  size="sm"
                  className="uppercase tracking-wider text-xs px-4 py-2 mix-blend-difference"
                >
                  {link.label}
                </Button>
              </Link>
            </Reveal>
          ))}
        </nav>
      </div>

      <div className="flex justify-between items-center pointer-events-auto">
        <Reveal>
          <div className="flex justify-between items-center">
            d
          </div>
        </Reveal>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.Icon;
              return (
                <Reveal key={social.label} index={index}>
                  <a
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all"
                    aria-label={social.label}
                    target="_blank"
                  >
                    <Icon className="text-lg" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.5, ease: [0.85, 0.09, 0.15, 0.91], delay: 0.1 * index }}
      >
        {children}
      </motion.div>
    </div>
  );
}