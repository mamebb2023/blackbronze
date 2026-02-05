"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Tag } from "../ui/Tag";
// import { ScrollParallax } from "react-just-parallax";
import SurferAnimation from "../SurferAnimation";
import MouseAnimation from "../MouseAnimation";
import Link from "next/link";
import { BsStars } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="relative h-screen flex justify-center px-6 py-20 overflow-hidden">
      <div className="absolute z-199 top-0 w-full h-30 bg-linear-to-t from-transparent to-black" />
      <div className="absolute z-199 bottom-0 w-full h-24 bg-linear-to-b from-transparent to-black" />

      {/* <ScrollParallax strength={0.2} isAbsolutelyPositioned>
        <div className="absolute -top-1/2 left-0 flex-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="size-[900px] bg-white/10 blur-3xl rounded-[50%] flex-center z-299"
          />
        </div>
      </ScrollParallax> */}

      <div className="flex flex-1 px-5 gap-3 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex-1 relative z-10 max-w-4xl mx-auto flex flex-col md:items-start items-center space-y-6 justify-between"
        >
          <div />

          <div className="flex flex-col md:items-start items-center space-y-3">
            <div>
              <Tag>
                Let&apos;s Build
              </Tag>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-400">
                We build websites
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-white">
                that drive growth
              </span>
            </h1>

            <p className="md:text-md text-gray-400 max-w-xl leading-relaxed">
              Fast, scalable and engaging - turn your vision into reality with
              custom websites and web apps that streamline operations and
              elevate your brand.
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

            <div className="flex-center ml-6 md:ml-14 gap-12 pt-4">
              <div className="flex flex-col items-center md:items-start">
                <span className="flex-center gap-1 text-4xl md:text-5xl text-white">
                  <span className="text-gray-300/50 self-end text-2xl">+</span>50
                </span>
                <span className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
                  Clients
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="flex-center gap-1 text-4xl md:text-5xl text-white">
                  <span className="text-gray-300/50 self-end text-2xl">+</span>100
                </span>
                <span className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
                  Projects
                </span>
              </div>
            </div>
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
