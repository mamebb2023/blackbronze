"use client";

import { Tag } from "../ui/Tag";
import Image from "next/image";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div id="services" className="min-h-screen px-6 py-20 flex-center gap-4 flex-col">
      <motion.div
        className="flex-center flex-col gap-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Tag text="Services" />

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
          What We Do
        </h1>

        <p className="text-sm md:text-md text-bronze-300 text-center px-4">
          Turning complex problems, repeatitive tasks into elegant solutions.
        </p>
      </motion.div>

      <div className="relative flex gap-5 flex-col w-full max-w-4xl my-4 md:my-7 px-2 sm:px-0">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 size-80 rounded-full bg-bronze-700/30 flex-center blur-3xl" />
        <div className="absolute bottom-10 right-0 translate-x-1/2 size-80 rounded-full bg-bronze-700/30 flex-center blur-3xl" />

        {/* top two */}
        <div className="relative flex gap-3 flex-col md:flex-row gap-5">
          {/* one */}
          <motion.div
            className="relative border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute bottom-0 translate-y-1/2 left-0 -translate-x-1/4 size-80 rounded-full bg-bronze-700/40 flex-center blur-2xl">
                <div className="absolute size-[60%] rounded-full bg-bronze-700" />
                <div className="absolute size-[20%] rounded-full bg-bronze-100" />
              </div>
            </div>

            <div className="relative space-y-1 px-2 py-1 text-right">
              <p className="text-2xl text-bronze-300">Custom Web Development</p>
              <p className="">Bespoke websites tailored to your brand identity</p>
            </div>
            <div className="w-full h-[200px] rounded-2xl flex-center">
              {/* here */}
            </div>
          </motion.div>

          {/* two */}
          <motion.div
            className="relative border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 size-80 rounded-full bg-bronze-700/40 flex-center blur-2xl">
                <div className="absolute size-[60%] rounded-full bg-bronze-700" />
                <div className="absolute size-[20%] rounded-full bg-bronze-100" />
              </div>
            </div>

            <div className="w-full h-[200px] rounded-2xl flex-center">
              {/* here */}
            </div>
            <div className="relative space-y-1 px-2 py-1">
              <p className="text-2xl text-bronze-300">Brand Identity</p>
              <p className="">Cohesive visual language across all touchpoints</p>
            </div>
          </motion.div>
        </div>

        {/* bottom three */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* three */}
          <motion.div
            className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-[150px] translate-x-1/4 translate-y-3">
              {/* <Image
                src="/services/devices.png"
                alt="Responsive Design"
                width={1000}
                height={1000}
                className="rounded-2xl opacity-80"
              /> */}
            </div>
            <div className="absolute top-0 left-0 -translate-x-1/7 -translate-y-1/7 -rotate-45 flex gap-3 blur-md">
              {[1, 2, 3, 2, 1].map((n, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-bronze-500 to-transparent rounded-[50%]"
                  style={{ width: `${n * 15}px`, height: `${n * 70}px` }}
                />
              ))}
            </div>
            <div className="relative space-y-1 px-2 py-1">
              <p className="text-2xl text-bronze-300">Responsive Design</p>
              <p className="">Perfect on every device</p>
            </div>
          </motion.div>

          {/* four - Lightning Fast */}
          <motion.div
            className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-xl">
              <div className="absolute inset-0 rounded-full bg-bronze-700/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-bronze-700/50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-bronze-300" />
            </div>

            <div className="relative space-y-1 px-2 py-1 text-center">
              <p className="text-2xl text-bronze-300">Lightning Fast</p>
              <p className="">Optimized performance</p>
            </div>
            <div className="w-full h-[150px] rounded-2xl flex-center">
            </div>
          </motion.div>

          {/* five */}
          <motion.div
            className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 translate-x-1/7 -translate-y-1/7 rotate-45 flex gap-3 blur-md">
              {[1, 2, 3, 2, 1].map((n, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-bronze-500 to-transparent rounded-[50%]"
                  style={{ width: `${n * 15}px`, height: `${n * 70}px` }}
                />
              ))}
            </div>
            <div className="w-full h-[150px] rounded-2xl flex-center">
            </div>
            <div className="relative space-y-1 px-2 py-1 text-right">
              <p className="text-2xl text-bronze-300">User Experience</p>
              <p className="">Crafting immersive web interactions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default Services;