"use client";

import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SPACING = 140;
const SPEED = 1;
const RESET_X = -450;
const CARD_HALF_WIDTH = 225; // half of 450px card

const imageSources = [
  { text: "Surfer 1", link: "/hero/img-1.png" },
  { text: "Surfer 2", link: "/hero/img-2.png" },
  { text: "Surfer 3", link: "/hero/img-3.png" },
  { text: "Surfer 4", link: "/hero/img-4.jpg" },
  { text: "Unleash", link: "/hero/unleash.png" },
  { text: "Surfer 5", link: "/hero/img-5.png" },
  { text: "Surfer 6", link: "/hero/img-6.png" },
  { text: "Surfer 7", link: "/hero/img-7.png" },
  { text: "Surfer 8", link: "/hero/img-8.png" },
  { text: "Surfer 9", link: "/hero/img-9.png" },
];

const images = [...imageSources, ...imageSources];
const total = images.length;

export default function SurferAnimation() {
  const isPausedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const update = () => setStartX(window.innerWidth / 2 - CARD_HALF_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pause = useCallback((index: number) => {
    isPausedRef.current = true;
    setHoveredIndex(index);
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    setHoveredIndex(null);
  }, []);

  return (
    <div className="relative h-screen">
      <div
        className="relative h-full flex-center"
        style={{ perspective: "1000px" }}
      >
        {images.map((image, i) => (
          <InfiniteCard
            key={i}
            src={image.link}
            text={image.text}
            index={i}
            startX={startX}
            isPausedRef={isPausedRef}
            hoveredIndex={hoveredIndex}
            pause={pause}
            resume={resume}
          />
        ))}
      </div>
    </div>
  );
}

function InfiniteCard({
  src,
  text,
  index,
  startX,
  isPausedRef,
  hoveredIndex,
  pause,
  resume,
}: {
  src: string;
  text: string;
  index: number;
  startX: number;
  isPausedRef: React.RefObject<boolean>;
  hoveredIndex: number | null;
  pause: (index: number) => void;
  resume: () => void;
}) {
  const x = useMotionValue(startX + index * SPACING);
  const y = useMotionValue(startX + index * -SPACING);
  const z = useMotionValue(index * -SPACING);

  useAnimationFrame(() => {
    if (isPausedRef.current) return;

    x.set(x.get() - SPEED);
    y.set(y.get() + SPEED);
    z.set(z.get() + SPEED);

    if (x.get() < RESET_X) {
      const shift = total * SPACING;
      x.set(x.get() + shift);
      y.set(y.get() - shift);
      z.set(z.get() - shift);
    }
  });

  const zIndex = useTransform(z, (v) => Math.round(v + 2000));
  const opacity = hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.2;

  return (
    <motion.div
      className="absolute w-[450px] h-[250px] group flex-center"
      onHoverStart={() => pause(index)}
      onHoverEnd={resume}
      animate={{ opacity }}
      transition={{ duration: 0.2 }}
      style={{ x, y, z, rotateX: -20, rotateY: -30, zIndex }}
    >
      <div className="absolute -top-3 -translate-y-1/2 flex-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-full transition-all duration-300">
        <p className="text-white text-md font-tektur">{text}</p>
      </div>

      <Image
        src={src}
        alt={text}
        width={700}
        height={500}
        sizes="450px"
        className="w-full h-full object-cover rounded-md shadow-2xl"
        draggable={false}
      />
    </motion.div>
  );
}
