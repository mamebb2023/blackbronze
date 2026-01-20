"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const slideContRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const setSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    slidesRef.current[index] = el;
  };

  useEffect(() => {
    if (!worksRef.current) return;

    slidesRef.current.forEach((slide, index) => {

      gsap.to(
        slide,
        {
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: slide,
            start: "top top",
            end: `bottom top-=${(index + 1) * 5000}px`,
            pin: true,
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={worksRef} id="works" className="min-h-screen flex flex-col overflow-hidden">
      <div className="shrink-0 text-center py-8 px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
          Our Work
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Crafting digital experiences that matter
        </p>
      </div>

      <div className="flex-1 relative">

        <div ref={slideContRef} className="relative min-h-screen flex flex-col px-5 md:px-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => setSlideRef(el, index)}
              className="sticky w-screen h-screen flex items-center"
            >
              <div
                className={`relative shrink-0 size-[700px] mx-4 p-4 border-2 border-white/30 rounded-4xl`}
                style={{ transform: `translateX(${index * 25}%)` }}
              >
                <div
                  className={`flex-center flex-1 h-full rounded-2xl p-4 ${project.color} ${project.textColor} overflow-hidden`}
                  style={{ background: "url('/cta-bg.jpg') no-repeat center center/cover" }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
