"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Tag } from "../ui/Tag";
// import { ScrollParallax } from "react-just-parallax";
import SurferAnimation from "../SurferAnimation";
import MouseAnimation from "../MouseAnimation";
import Link from "next/link";
// import { BsStars } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="relative h-screen flex justify-center px-6 py-20 overflow-hidden">
      <div className="absolute z-199 top-0 w-full h-30 bg-linear-to-t from-transparent to-black" />
      <div className="absolute z-199 bottom-0 w-full h-24 bg-linear-to-b from-transparent to-black" />

      {/* <ScrollParallax strength={0.2} isAbsolutelyPositioned>
        <div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 flex-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="size-[900px] bg-bronze-500/20 blur-3xl rounded-[50%] flex-center z-299"
          />
        </div>
      </ScrollParallax> */}

      <div className="flex flex-1 px-5 gap-3 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex-1 relative z-10 max-w-5xl mx-auto flex flex-col md:items-start items-center space-y-6 justify-between"
        >
          <div />

          <div className="flex flex-col md:items-start items-center space-y-3">
            <div>
              <Tag text="Let&apos;s Build" />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-bronze-500">
                Websites built with clarity,
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-bronze-500 to-white">
                purpose, and longevity.
              </span>
            </h1>

            <p className="md:text-md text-gray-400 max-w-xl leading-relaxed">
              A web agency creating considered digital experiences for businesses that value quality over noise.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="#contact">
                <Button variant="liquid" className="min-w-52">
                  Contact Us
                </Button>
              </Link>
              <Link href="#works">
                <Button variant="outline" className="min-w-52 h-12">
                  Our Works
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-px mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              {/* Clients */}
              <div className="flex flex-col items-start px-4 py-2">
                <div className="flex items-end gap-1">
                  <span className="text-3xl md:text-2xl font-semibold text-white leading-none">50</span>
                  <span className="text-lg font-medium text-bronze-500 mb-0.5">+</span>
                </div>
                <span className="mt-1 text-[11px] text-zinc-500 uppercase tracking-widest">
                  Clients
                </span>
              </div>

              {/* Divider */}
              <div className="w-px self-stretch bg-white/10 mx-1" />

              {/* Projects */}
              <div className="flex flex-col items-start px-4 py-2">
                <div className="flex items-end gap-1">
                  <span className="text-3xl md:text-2xl font-semibold text-white leading-none">100</span>
                  <span className="text-lg font-medium text-bronze-500 mb-0.5">+</span>
                </div>
                <span className="mt-1 text-[11px] text-zinc-500 uppercase tracking-widest">
                  Projects
                </span>
              </div>

              {/* Divider */}
              <div className="w-px self-stretch bg-white/10 mx-1" />

              {/* Years */}
              <div className="flex flex-col items-start px-4 py-2">
                <div className="flex items-end gap-1">
                  <span className="text-3xl md:text-2xl font-semibold text-white leading-none">5</span>
                  <span className="text-lg font-medium text-bronze-500 mb-0.5">yr</span>
                </div>
                <span className="mt-1 text-[11px] text-zinc-500 uppercase tracking-widest">
                  Experience
                </span>
              </div>
            </motion.div>
          </div>

          {/* Mouse animation */}
          <MouseAnimation />
        </motion.div>

        {/* right section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="flex-1 w-1/2"
        >
          <div className="absolute inset-0 translate-x-1/4">
            <SurferAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
