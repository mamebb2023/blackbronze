"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Tag } from "../ui/Tag";
import { HiArrowRight, HiMail } from "react-icons/hi";

const Cta = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-gradient-to-b from-black via-black to-bronze-900/20">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-bronze-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bronze-600/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(205,127,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(205,127,50,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Tag variant="black">Start your project</Tag>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Let&apos;s build something{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-400 via-bronze-500 to-bronze-600">
                extraordinary
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bronze-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Whether you&apos;re looking to revamp your digital presence or build a
            complex web application from scratch, we have the expertise to make it happen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="#contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="liquid" className="min-w-56 h-14 text-lg group">
                  Get in touch
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>

            <Link href="mailto:hello@blackbronze.studio">
              <motion.div
                className="group flex items-center gap-3 px-6 h-14 rounded-full border border-bronze-500/30 hover:border-bronze-500/60 bg-bronze-500/5 hover:bg-bronze-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMail className="w-5 h-5 text-bronze-500" />
                <span className="text-zinc-300 font-medium">
                  hello@blackbronze.studio
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats or Trust Indicators */}
          <motion.div
            className="grid grid-cols-3 gap-8 md:gap-16 pt-16 border-t border-bronze-500/20 mt-16 w-full max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-bronze-500">50+</span>
              <span className="text-sm text-zinc-500">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-bronze-500">100%</span>
              <span className="text-sm text-zinc-500">Client Satisfaction</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-bronze-500">24/7</span>
              <span className="text-sm text-zinc-500">Support Available</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-500/30 to-transparent" />

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-bronze-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-bronze-500/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Cta;