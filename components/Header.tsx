"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDribbble, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      if (!featuresSection) {
        console.log('Features section not found');
        return;
      }

      const rect = featuresSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the viewport is covered by the features section
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      // Calculate what percentage of the VIEWPORT (not the section) is covered
      const viewportCoverage = (visibleHeight / windowHeight) * 100;
      
      console.log('Viewport coverage:', viewportCoverage.toFixed(1) + '%', 'Top:', rect.top.toFixed(0), 'Bottom:', rect.bottom.toFixed(0));
      
      // Change to dark mode if features section covers more than 40% of viewport
      // Use 40% threshold to trigger earlier and avoid flickering at 50%
      if (viewportCoverage > 40) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    // Add delay to ensure features section is mounted
    const timer = setTimeout(() => {
      handleScroll(); // Check initial state
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
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
    <div className="fixed inset-0 z-9999 flex flex-col justify-between p-5 pointer-events-none transition-colors duration-500">
      {/* Debug indicator */}
      <div className="fixed top-20 right-5 pointer-events-auto bg-black/50 text-white px-3 py-1 rounded text-xs z-10000">
        {isDark ? 'DARK MODE' : 'LIGHT MODE'}
      </div>
      <div className="flex justify-between items-center pointer-events-auto">
        <Reveal>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={isDark ? "/bb-logo-black.png" : "/bb-logo-white.png"}
              alt="BlackBronze Logo"
              width={32}
              height={32}
              className="size-10 object-contain transition-opacity duration-500"
            />
          </Link>
        </Reveal>

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
                  ${isDark 
                    ? 'text-black hover:text-gray-700 after:bg-black' 
                    : 'text-gray-200 hover:text-white after:bg-white'
                  }`}
              >
                {link.label}
              </Link>
            </Reveal>
          ))}
        </nav>
      </div>

      <div className="flex justify-between items-center pointer-events-auto">
        <Reveal>
          <div className="flex justify-between items-center" />
        </Reveal>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.Icon;
              return (
                <Reveal key={social.label} index={index}>
                  <a
                    href={social.href}
                    className={`relative overflow-hidden group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      isDark 
                        ? 'bg-black/5 border border-gray-300/20 text-black' 
                        : 'bg-white/5 border border-gray-500/20 text-white'
                    }`}
                    aria-label={social.label}
                    target="_blank"
                  >
                    <div className={`absolute top-0 left-0 size-5 group-hover:bottom-0 group-hover:right-0 rounded-full blur-sm transition-all ${
                      isDark ? 'bg-black/40' : 'bg-white/40'
                    }`}/>
                    <Icon className="text-lg" />
                    <div className={`absolute bottom-0 right-0 size-5 rounded-full blur-sm ${
                      isDark ? 'bg-gray-300/60' : 'bg-gray-700/60'
                    }`}/>
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
        transition={{ duration: 1.5, ease: [0.85, 0.09, 0.15, 0.91], delay: 2 + (0.1 * index) }}
      >
        {children}
      </motion.div>
    </div>
  );
}