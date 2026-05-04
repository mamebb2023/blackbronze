"use client";

import { works } from "@/constants";
import { Tag } from "../ui/Tag";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const Works = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === works.length - 1 ? 0 : prev + 1));
  };

  const getSlideStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalSlides = works.length;

    // Handle wrap around
    let position = diff;
    if (diff > totalSlides / 2) position -= totalSlides;
    if (diff < -totalSlides / 2) position += totalSlides;

    if (position === 0) {
      // Active slide
      return {
        transform: "translateX(0) scale(1) rotateY(0deg)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (position === -1) {
      // Left slide
      return {
        transform: "translateX(-60%) scale(0.85) rotateY(25deg)",
        zIndex: 5,
        opacity: 0.5,
      };
    } else if (position === 1) {
      // Right slide
      return {
        transform: "translateX(60%) scale(0.85) rotateY(-25deg)",
        zIndex: 5,
        opacity: 0.5,
      };
    } else {
      // Hidden slides
      return {
        transform: `translateX(${position > 0 ? "100%" : "-100%"}) scale(0.7)`,
        zIndex: 0,
        opacity: 0,
      };
    }
  };

  return (
    <section className="relative p-6">
      {/* Background orbs */}
      <div className="absolute pointer-events-none top-[35%] -right-40 w-[500px] h-[500px] rounded-full bg-bronze-900/50 blur-[130px]" />
      <div className="absolute pointer-events-none top-[60%] -left-20 w-[380px] h-[380px] rounded-full bg-bronze-500/20 blur-[110px]" />

      {[1, 2, 3, 4].map((n, i) => (
        <div key={i} className="absolute left-0 h-px bg-bronze-500/30 w-full" style={{ bottom: `-${40 * n}px` }}></div>
      ))}

      {/* Header */}
      <div className="relative flex-center flex-col gap-3 mb-6 text-center">
        <Tag text="Works" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          Crafted Solutions
        </h1>
        <p className="text-bronze-300">
          Turning complex problems, repetitive tasks into elegant solutions.
        </p>
      </div>

      <div id="works" className="relative flex-center mx-auto min-h-[80vh]" style={{ perspective: "2000px" }}>
        {works.map((work, index) => {
          return (
            <div
              key={index}
              className="absolute w-[1100px] h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-black to-bronze-900 flex-center transition-all duration-700 overflow-hidden"
              style={getSlideStyle(index)}
            >
              <div className="size-[calc(100%-30px)] rounded-2xl overflow-hidden relative">
                <Image
                  quality={75}
                  src={work.images[0]}
                  alt={work.title}
                  fill
                  className="object-cover"
                />

                <AnimatePresence mode="wait">
                  {currentIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col gap-1 justify-end p-4"
                    >
                      <div className={`size-10 p-2 rounded-xl flex-center`} style={{ background: `linear-gradient(to bottom, black, ${work.color}aa)` }}>
                        <Image src={work.logo} height={100} width={100} alt={`${work.title} logo`} />
                      </div>
                      <p className="text-2xl md:text-3xl font-bold">{work.title}</p>
                      <p className="text-sm text-gray-400 mb-2 max-w-md">{work.description}</p>
                      <div className="flex gap-1 max-w-md flex-wrap">
                        {work.features.map((f, i) => (
                          <div className={`px-3 py-1 text-xs rounded-full`} style={{ color: work.color, border: `1px solid ${work.color}` }}>{f}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-0 size-10 flex-center border border-bronze-500 text-bronze-500 cursor-pointer bg-black/50 hover:bg-bronze-900 transition-all rounded-full z-20"
        >
          <BiLeftArrow />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-0 size-10 flex-center border border-bronze-500 text-bronze-500 cursor-pointer bg-black/50 hover:bg-bronze-900 transition-all rounded-full z-20"
        >
          <BiRightArrow />
        </button>
      </div>

      <div className="h-[50vh]"></div>
    </section>
  );
};

export default Works;