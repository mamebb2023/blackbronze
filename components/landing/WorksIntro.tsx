"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toggleHeaderTheme } from "@/contexts/HeaderThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const WorksIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [showContents, setShowContents] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !boxRef.current) return;

    const getViewportSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    let animation: gsap.core.Tween | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let themeToggleTrigger: ScrollTrigger | null = null;
    let hasToggled = false;

    const createAnimation = () => {
      if (animation) animation.kill();
      if (scrollTrigger) scrollTrigger.kill();

      const viewportSize = getViewportSize();

      animation = gsap.to(boxRef.current, {
        width: viewportSize.width,
        height: viewportSize.height,
        borderRadius: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            if (self.progress >= 0.7) {
              setShowContents(true);
            } else {
              setShowContents(false);
            }
          },
        },
      });

      scrollTrigger = animation.scrollTrigger || null;
    };

    const createThemeToggle = () => {
      if (themeToggleTrigger) themeToggleTrigger.kill();

      themeToggleTrigger = ScrollTrigger.create({
        trigger: "#worksContainer",
        start: "top+=500 top",
        end: "bottom+=200 bottom",
        onEnter: () => {
          if (!hasToggled) {
            toggleHeaderTheme(true);
            hasToggled = true;
          }
        },
        onLeave: () => {
          if (hasToggled) {
            toggleHeaderTheme(false);
            hasToggled = false;
          }
        },
        onEnterBack: () => {
          if (!hasToggled) {
            toggleHeaderTheme(true);
            hasToggled = true;
          }
        },
        onLeaveBack: () => {
          if (hasToggled) {
            toggleHeaderTheme(false);
            hasToggled = false;
          }
        },
      });
    };

    createAnimation();
    createThemeToggle();

    const handleResize = () => {
      createAnimation();
      createThemeToggle();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animation) animation.kill();
      if (scrollTrigger) scrollTrigger.kill();
      if (themeToggleTrigger) themeToggleTrigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="h-[50vh]" />

      <div className="relaive h-screen flex-center" ref={containerRef}>
        <AnimatePresence>
          {showContents && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.5, delay: 0, staggerChildren: 0.1 }}
              className="absolute text-center text-3xl md:text-5xl max-w-3xl font-thin"
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-br from-black to-bronze-300 leading-14">We design and build modern,</p>
              <div className="flex-center text-transparent bg-clip-text bg-gradient-to-tr from-black to-bronze-300">
                <span className="relative w-32 h-14 rounded-full border border-bronze-100 inline-block mx-2 overflow-hidden">
                  <Image
                    src="/hero/unleash.png"
                    alt="text image"
                    width={1000}
                    height={1000}
                    className="object-cover object-center"
                  />
                </span>
                high-performance
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-bl from-black to-bronze-300 leading-14">websites that help businesses</p>
              <div className="flex-center text-transparent bg-clip-text bg-gradient-to-tl from-black to-bronze-300">
                grow online.
                <span className="relative w-32 h-14 rounded-full border border-bronze-100 inline-block mx-2 overflow-hidden">
                  <Image
                    src="/cta-bg.jpg"
                    alt="text image"
                    width={1000}
                    height={1000}
                    className="object-cover object-center"
                  />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={boxRef}
          className="bg-white flex-center flex-wrap"
          style={{
            width: 250,
            height: 400,
            borderRadius: 999,
          }}
        ></div>
      </div>
    </>
  );
};

export default WorksIntro;
