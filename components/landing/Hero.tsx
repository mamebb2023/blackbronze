"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Tag } from "../ui/Tag";
// import { ScrollParallax } from "react-just-parallax";
import SurferAnimation from "../ui/SurferAnimation";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex-center px-6 py-20 overflow-hidden">
      {/* <ScrollParallax strength={0.2} isAbsolutelyPositioned>
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 flex-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="size-[900px] bg-white/10 blur-3xl rounded-[50%] flex-center"
          />
        </div>
      </ScrollParallax> */}

      <div className="absolute z-199 bottom-0 w-full h-24 bg-linear-to-b from-transparent to-black"/>
      <div className="absolute z-199 top-0 w-full h-30 bg-linear-to-t from-transparent to-black"/>

      <div className="flex flex-1 px-5 gap-3 h-full">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:items-start items-center space-y-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <Tag>Let&apos;s Build</Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-400">
              We build websites
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-white">
              that drive growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:text-md text-gray-400 max-w-xl leading-relaxed"
          >
            Fast, scalable and engaging - turn your vision into reality with
            custom websites and web apps that streamline operations and elevate
            your brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Button variant="liquid" className="min-w-52">
              Get Started
            </Button>
            <Button variant="outline" className="min-w-52 h-12">
              Our Work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
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
