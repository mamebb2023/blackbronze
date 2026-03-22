"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
  BsBehance,
} from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";
import Logo from "../ui/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: BsTwitterX, label: "X / Twitter", href: "https://x.com" },
  { icon: BsInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: BsLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: BsBehance, label: "Behance", href: "https://behance.net" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative bg-[#0B0B0B] text-white overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-bronze-500/60 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bronze-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">

        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/5">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <Link href="/">
                {/* <Image
                  src="/bb-logo-white.png"
                  alt="BlackBronze Logo"
                  width={32}
                  height={32}
                  className="size-10 object-contain"
                /> */}
                <Logo />
              </Link>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
                A web agency creating considered digital experiences for
                businesses that value quality over noise.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-full border border-bronze-500/20 bg-white/5 flex-center text-zinc-400 hover:text-white hover:border-bronze-500/80 transition-colors"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest text-zinc-600 mb-5"
              style={{ fontFamily: "var(--font-tektur)" }}
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <span className="w-4 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-bronze-500 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA / Contact */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest text-zinc-600 mb-5"
              style={{ fontFamily: "var(--font-tektur)" }}
            >
              Start a project
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Have an idea in mind? Let&apos;s turn it into something
              remarkable.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white border border-bronze-500/40 hover:border-white/20 rounded-full px-5 py-2.5 transition-colors"
            >
              Let&apos;s talk
              <BsArrowUpRight className="text-xs" />
            </motion.a>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">
                Email
              </p>
              <a
                href="mailto:hello@blackbronze.studio"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                hello@blackbronze.tech
              </a>
            </div>
          </div>
        </div>

        {/* Large wordmark */}
        <div className="relative py-10 overflow-hidden select-none">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] leading-none font-bold text-white/[0.03] tracking-tighter text-center whitespace-nowrap"
            style={{ fontFamily: "var(--font-tektur)" }}
          >
            BLACKBRONZE
          </motion.p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-600">
            &copy; {year} BlackBronze Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;