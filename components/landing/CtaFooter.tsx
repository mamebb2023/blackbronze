"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaDribbble,
} from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const footerLinks = {
  company: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Web Design", href: "#web-design" },
    { label: "Web Development", href: "#web-development" },
    { label: "Mobile Apps", href: "#mobile-apps" },
    { label: "Consulting", href: "#consulting" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#", Icon: FaXTwitter },
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "GitHub", href: "#", Icon: FaGithub },
  { label: "Dribbble", href: "#", Icon: FaDribbble },
];

const CtaFooter = () => {
  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/cta-bg.jpg')",
      }}
    >
      <div className="bg-linear-to-b from-background to-transparent h-20 w-full"></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center space-y-8 max-w-3xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Ready to transform
              <br />
              your digital presence?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Let&apos;s build something amazing together. Get in touch and
              let&apos;s discuss how we can help grow your business.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
              className="flex gap-4 justify-center"
            >
              <Button variant="liquid">Start Your Project</Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center p-10 pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-7xl bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 pt-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="space-y-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/bb-logo-white.png"
                    alt="BlackBronze Logo"
                    width={32}
                    height={32}
                    className="size-10 object-contain"
                  />
                  {/* <span className="text-white font-bold text-lg">
                    BlackBronze
                  </span> */}
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Building digital experiences that drive growth and elevate
                  brands.
                </p>
                <div className="flex gap-3 pt-2">
                  {socialLinks.map((social) => {
                    const Icon = social.Icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Services
                </h3>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BlackBronze. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                Built with <FaHeart className="text-red-500" /> using Next.js
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaFooter;
