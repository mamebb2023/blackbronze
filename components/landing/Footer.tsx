"use client";

import { useMemo } from 'react';
import { links } from '@/constants';
import Logo from '../ui/Logo'
import Link from 'next/link'
import { FaFacebook, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import Globe from '@/components/ui/globe'
import { Button } from '../ui/Button';
import { HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { Tag } from '../ui/Tag';
import { BiLinkExternal } from 'react-icons/bi';

const Footer = () => {
  const socials = [
    { label: "Twitter", href: "#", Icon: FaXTwitter },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
    { label: "FaceBook", href: "#", Icon: FaFacebook },
  ];

  // Memoized so Math.random() doesn't re-run and re-randomize on every render
  const stars = useMemo(() => [
    { top: 10, left: 10, dur: 2.8, delay: 0.4 },
    { top: 20, left: 40, dur: 3.5, delay: 1.1 },
    { top: 90, left: 25, dur: 4.2, delay: 0.7 },
    { top: 70, left: 65, dur: 2.3, delay: 1.8 },
    { top: 20, left: 70, dur: 3.9, delay: 0.2 },
    { top: 50, left: 90, dur: 2.6, delay: 1.5 },
    { top: 40, left: 20, dur: 4.7, delay: 0.9 },
    { top: 90, left: 12, dur: 3.1, delay: 0.0 },
    { top: 65, left: 70, dur: 2.4, delay: 1.3 },
    { top: 90, left: 80, dur: 4.1, delay: 0.6 },
    { top: 15, left: 55, dur: 3.6, delay: 1.9 },
    { top: 35, left: 80, dur: 2.9, delay: 0.3 },
    { top: 55, left: 15, dur: 4.4, delay: 1.0 },
    { top: 45, left: 45, dur: 3.2, delay: 1.6 },
    { top: 75, left: 35, dur: 2.7, delay: 0.8 },
    { top: 30, left: 60, dur: 4.8, delay: 0.1 },
    { top: 60, left: 50, dur: 3.3, delay: 1.4 },
    { top: 25, left: 85, dur: 2.5, delay: 1.7 },
    { top: 80, left: 55, dur: 4.0, delay: 0.5 },
    { top: 50, left: 30, dur: 3.7, delay: 1.2 },
  ], [])

  return (
    <div id="footer" className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-bronze-500 to-transparent" />

      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-bronze-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute right-0 bottom-1/4 w-40 h-[500px] bg-linear-to-b from-bronze-500/80 via-bronze-500/20 to-transparent rounded-[50%] rotate-45 opacity-80 blur-2xl" />

      <div className="absolute left-20 bottom-0 w-32 h-[400px] bg-linear-to-b from-bronze-500/80 via-bronze-500/20 to-transparent rounded-[50%] -rotate-60 opacity-80 blur-2xl" />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 select-none"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-[12vw] leading-none font-bold text-white/[0.03] tracking-tighter text-center whitespace-nowrap" style={{ fontFamily: "var(--font-tektur)" }}>
          BLACKBRONZE
        </h1>
      </motion.div>

      {/* globe cta */}
      <motion.div
        className="relative flex md:flex-row gap-5 p-3 sm:p-5 md:p-12 h-auto md:h-[490px]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-[50px] p-5 md:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="h-full border-4 sm:border-8 border-bronze-300 rounded-[30px] sm:rounded-[50px] blur-xl" />
        </motion.div>

        <div className="relative border border-bronze-300/20 rounded-[30px] sm:rounded-[50px] flex-1 flex justify-center text-center text-white overflow-hidden py-8 sm:py-10">
          <div className="absolute top-0 left-0 w-full h-[90%]">
            <div className="absolute top-0 left-0 w-full h-[90%]">
              {stars.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute size-px rounded-full bg-bronze-300"
                  style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: pos.dur,
                    delay: pos.delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute -bottom-1/4 translate-y-1/2 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <Globe
              size={{ height: 700, width: 700 }}
              baseColor="#120a00"
              markerColor="#be6f00"
              glowColor="#ffdac9"
              arcColor="#be6f00"
              markers={[
                { location: [140.7128, -74.006], size: 0.03, },
                { location: [37.7749, -122.4194], size: 0.03, },

                { location: [-37.7595, -62.4367], size: 0.03, },
                { location: [47.7595, 22.4367], size: 0.03, },
              ]}
              arcs={[
                { startLat: 37.7749, startLng: -122.4194, endLat: 140.7128, endLng: -74.006 },
                { startLat: -37.7595, startLng: -62.4367, endLat: 47.7595, endLng: 22.4367 },
              ]}
            />
          </motion.div>

          <div className="relative flex items-center flex-col text-center p-5 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Tag text="Start your project" />
            </motion.div>

            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Let's Go,{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-bronze-500">
                Beyond
              </span>
            </motion.h1>

            <motion.p
              className="text-zinc-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Whether you&apos;re looking to remap your digital presence or build a complex web application from scratch, we have the expertise to make it happen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="#contact">
                <Button variant="liquid" className="min-w-56 h-14 text-lg group">
                  Get in touch
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* footer */}
      <div className="relative flex-1 w-full max-w-7xl flex justify-between flex-col min-h-[350px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-5 p-3 md:p-10">
          {/* Logo & Description Column */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              A web agency creating considered digital experiences for
              businesses that value quality over noise.
            </p>
            <nav className="flex gap-3 items-center">
              {socials.map((social, i) => {
                const Icon = social.Icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <Link
                      href={social.href}
                      className={`relative overflow-hidden group size-10 rounded-lg flex items-center justify-center transition-all duration-500 border border-bronze-300/20 text-white`}
                      aria-label={social.label}
                      target="_blank"
                    >
                      <div
                        className={`absolute top-1/2 -translate-x-1/2 left-1/2 size-5 group-hover:size-full rounded-full blur-sm transition-all duration-500 bg-bronze-500`}
                      />
                      <Icon className="text-lg relative" />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>

          {/* Navigation Column */}
          <motion.nav
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-tektur)" }}
            >
              Navigation
            </h1>
            {links.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-4 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-bronze-500 transition-all duration-300" />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Get in Touch Column */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-tektur)" }}
            >
              Get in Touch
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">Send us a message and let&apos;s create something extraordinary together.
            </p>
            <Link href="mailto:[EMAIL_ADDRESS]">
              <button className="border-2 border-bronze-500 rounded-full min-w-44 h-12 text-lg group flex-center gap-2 hover:bg-bronze-500 cursor-pointer transition-all">
                Let&apos;s Talk
                <BiLinkExternal className="size-4" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Copyright Footer */}
        <motion.div
          className="relative py-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-5 md:px-14 md:py-6 border-t border-white/5">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} BlackBronze. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="text-xs text-zinc-600 hover:text-bronze-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-zinc-800 text-xs">·</span>
              <Link
                href="/terms"
                className="text-xs text-zinc-600 hover:text-bronze-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-xs text-zinc-700">Crafted with care ✦</p>
          </div>
        </motion.div>
      </div>
    </div >
  )
}

export default Footer