"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Works = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern, scalable e-commerce solution with React and Node.js",
      color: "bg-linear-to-tr from-blue-950/80 via-transparent to-transparent",
      textColor: "text-blue-300",
      image: "/work-1.jpg",
    },
    {
      title: "Financial Dashboard",
      description:
        "Real-time analytics dashboard for financial data visualization",
      color:
        "bg-linear-to-tr from-emerald-950/80 via-transparent to-transparent",
      textColor: "text-emerald-300",
      image: "/work-2.jpg",
    },
    {
      title: "Social Media App",
      description: "Mobile-first social platform with real-time messaging",
      color:
        "bg-linear-to-tr from-purple-950/80 via-transparent to-transparent",
      textColor: "text-purple-300",
      image: "/work-3.jpg",
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio website with advanced animations",
      color: "bg-linear-to-tr from-rose-950/80 via-transparent to-transparent",
      textColor: "text-rose-300",
      image: "/work-4.jpg",
    },
    {
      title: "SaaS Platform",
      description: "Cloud-based SaaS solution for business management",
      color: "bg-linear-to-tr from-amber-950/80 via-transparent to-transparent",
      textColor: "text-amber-300",
      image: "/work-5.jpg",
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll to center slide on mount
    const centerSlide = container.children[activeIndex] as HTMLElement;
    if (centerSlide) {
      centerSlide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetSlide = container.children[index] as HTMLElement;
    if (targetSlide) {
      // Use setTimeout to ensure smooth scroll after any pending updates
      setTimeout(() => {
        targetSlide.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 0);
    }
  };

  return (
    <section id="works" className="min-h-screen flex flex-col">
      <div className="shrink-0 text-center py-8 px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
          Our Work
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Crafting digital experiences that matter
        </p>
      </div>

      <div className="flex-1 relative">
        <div className="absolute z-10 left-0 top-0 w-32 h-full bg-linear-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute z-10 right-0 top-0 w-32 h-full bg-linear-to-l from-black to-transparent pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex h-[700px] overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative shrink-0 w-1/2 flex items-center justify-center mx-4 first:ml-8 p-4 border-2 border-white/30 rounded-4xl last:mr-8`}
            >
              <div
                className={`flex-center flex-1 h-full rounded-2xl p-4 ${project.color} ${project.textColor}`}
              >
                <div className="flex items-end flex-1 h-full">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold`}>
                      {project.title}
                    </h3>
                    <p className={`text-base md:text-lg opacity-80 max-w-sm`}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 flex justify-center py-8">
        <div className="flex space-x-3">
          {projects.map((_, index) => (
            <AnimatePresence key={index} mode="wait">
              {index === activeIndex ? (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="cursor-pointer"
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="border-2 border-white rounded-full p-1">
                    <div className="h-2 w-8 bg-white rounded-full" />
                  </div>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="cursor-pointer"
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="h-2 w-8 bg-gray-600 hover:bg-gray-500 rounded-full transition-all duration-300" />
                </motion.button>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
