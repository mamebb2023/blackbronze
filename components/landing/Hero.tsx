"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Tag } from "../ui/Tag";
// import { ScrollParallax } from "react-just-parallax";
import SurferAnimation from "../ui/SurferAnimation";
import Link from "next/link";

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

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0 }}
        className="flex flex-1 px-5 gap-3 h-full"
      >
        <div className="flex-1 relative z-10 max-w-4xl mx-auto flex flex-col md:items-start items-center space-y-6 justify-between">
          <div></div>

          <div className="flex flex-col md:items-start items-center space-y-3">
            <div>
              <Tag>Let&apos;s Build</Tag>
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
                  Contact
                </Button>
              </Link>
              <Link href="#works">
                <Button variant="outline" className="min-w-52 h-12">
                  Our Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Mouse animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <div className="h-12 w-7 border-2 border-white rounded-full flex justify-center py-2 opacity-30">
              <motion.div
                animate={{
                  y: [0, 25, 0],
                  opacity: [1, 0, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="h-2 w-1 rounded-full bg-white will-change-transform"
              />
            </div>
          </motion.div>
        </div>

        {/* right section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="flex-1 w-1/2"
        >
          <div className="absolute inset-0 translate-x-1/4">
            <SurferAnimation />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
