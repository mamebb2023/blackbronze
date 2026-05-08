"use client";

import { works } from "@/constants";
import { Tag } from "../ui/Tag";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const Works = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState(
    works.map(() => 0) // Initialize image index for each work
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === works.length - 1 ? 0 : prev + 1));
  };

  const handleImagePrev = (workIndex: number) => {
    setImageIndices((prev) => {
      const newIndices = [...prev];
      const currentImageIndex = newIndices[workIndex];
      const totalImages = works[workIndex].images.length;
      newIndices[workIndex] = currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
      return newIndices;
    });
  };

  const handleImageNext = (workIndex: number) => {
    setImageIndices((prev) => {
      const newIndices = [...prev];
      const currentImageIndex = newIndices[workIndex];
      const totalImages = works[workIndex].images.length;
      newIndices[workIndex] = currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
      return newIndices;
    });
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
    <section className="relative p-4 sm:p-6">
      {/* Background orbs */}
      <div className="absolute pointer-events-none top-[35%] -right-40 w-[500px] h-[500px] rounded-full bg-bronze-900/50 blur-[130px]" />
      <div className="absolute pointer-events-none top-[60%] -left-20 w-[380px] h-[380px] rounded-full bg-bronze-500/20 blur-[110px]" />

      {[1, 2, 3, 4].map((n, i) => (
        <div key={i} className="absolute left-0 h-px bg-bronze-500/30 w-full" style={{ bottom: `${50 * n}px` }}></div>
      ))}

      {/* Header */}
      <div className="relative flex-center flex-col gap-3 mb-6 text-center px-4">
        <Tag text="Works" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
          Crafted Solutions
        </h1>
        <p className="text-bronze-300 text-sm sm:text-base">
          Turning complex problems, repetitive tasks into elegant solutions.
        </p>
      </div>

      <div id="works" className="relative flex-center mx-auto min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]" style={{ perspective: "2000px" }}>
        {works.map((work, index) => {
          const currentImageIndex = imageIndices[index];

          return (
            <div
              key={index}
              className="absolute w-[90vw] h-[300px] sm:w-[85vw] sm:h-[350px] md:w-[800px] md:h-[500px] lg:w-[1000px] lg:h-[650px] xl:w-[1100px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-black to-bronze-900 flex-center transition-all duration-700"
              style={getSlideStyle(index)}
            >
              <div className="size-[calc(100%-16px)] sm:size-[calc(100%-24px)] lg:size-[calc(100%-30px)] rounded-xl sm:rounded-2xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      quality={75}
                      src={work.images[currentImageIndex]}
                      alt={`${work.title} image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {currentIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex justify-between items-end p-3 sm:p-4"
                    >
                      <div className="flex flex-col gap-1 justify-end max-w-[calc(100%-80px)] sm:max-w-md">
                        <div
                          className={`size-8 sm:size-10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex-center`}
                          style={{ background: `linear-gradient(to bottom, black, ${work.color}aa)` }}
                        >
                          <Image src={work.logo} height={100} width={100} alt={`${work.title} logo`} />
                        </div>

                        <p className="text-xl sm:text-2xl md:text-3xl font-bold">{work.title}</p>
                        <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2 sm:line-clamp-none">{work.description}</p>

                        <div className="flex gap-1 flex-wrap">
                          {work.features.slice(0, 3).map((f, i) => (
                            <div
                              key={i} className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full`}
                              style={{ color: work.color, border: `1px solid ${work.color}` }}
                            >
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-1.5 sm:gap-2 p-1 sm:p-2">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImagePrev(index);
                          }}
                          className={`size-8 sm:size-10 flex-center rounded-full cursor-pointer hover:opacity-80 transition-opacity active:scale-95`}
                          style={{ color: work.color, background: `${work.color}11` }}
                        >
                          <BiLeftArrow className="text-sm sm:text-base" />
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageNext(index);
                          }}
                          className={`size-8 sm:size-10 flex-center rounded-full cursor-pointer hover:opacity-80 transition-opacity active:scale-95`}
                          style={{ color: work.color, background: `${work.color}11` }}
                        >
                          <BiRightArrow className="text-sm sm:text-base" />
                        </div>
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
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-0 size-8 sm:size-10 flex-center border border-bronze-500 text-bronze-500 cursor-pointer bg-black/50 hover:bg-bronze-900 transition-all rounded-full z-20"
        >
          <BiLeftArrow className="text-sm sm:text-base" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-0 size-8 sm:size-10 flex-center border border-bronze-500 text-bronze-500 cursor-pointer bg-black/50 hover:bg-bronze-900 transition-all rounded-full z-20"
        >
          <BiRightArrow className="text-sm sm:text-base" />
        </button>
      </div>

      <div className="h-[30vh]"></div>
    </section>
  );
};

export default Works;