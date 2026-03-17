"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { Tag } from "../ui/Tag";

const Cta = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-black text-white flex-center flex-col text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[50vh] max-h-[500px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-8"
      >
        <Tag variant="black">Start your project</Tag>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
          Let&apos;s build something{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-300 to-zinc-600">
            extraordinary.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Whether you&apos;re looking to revamp your digital presence or build a
          complex web application from scratch, we have the expertise to make it happen.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
          <Link href="#contact">
            <Button variant="liquid" className="min-w-56 h-14 text-lg">
              Get in touch
            </Button>
          </Link>
          <Link href="mailto:hello@blackbronze.studio" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 font-medium">
            <span className="w-6 h-[2px] bg-zinc-700 group-hover:w-10 group-hover:bg-zinc-300 transition-all duration-300" />
            hello@blackbronze.studio
          </Link>
        </div>
      </motion.div>
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[10%] w-px bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[10%] w-px bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default Cta;
