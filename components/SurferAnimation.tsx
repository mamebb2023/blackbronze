"use client";

import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SPACING = 140;
const SPEED = 1;
const RESET_X = -450;
const CARD_HALF_WIDTH = 225; // half of 450px card

const imageSources = [
  { text: "Lumino", link: "/hero/lumino.png" },
  { text: "Unleash", link: "/hero/unleash.png" },
  { text: "Lotusflow", link: "/hero/lotusflow.png" },
  { text: "Calhabit", link: "/hero/calhabit.png" },
  { text: "Brainwave", link: "/hero/brainwave.png" },
  { text: "Sanai", link: "/hero/sanai.png" },
  { text: "CargoBid", link: "/hero/cargobid.png" },
  { text: "TraderPro", link: "/hero/traderpro.jpg" },
  { text: "Monur", link: "/hero/monur.png" },
  { text: "Redefine", link: "/hero/redefine.png" },
  { text: "iShopHere", link: "/hero/ishophere.png" },
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
      {/* SCALE BORDER EFFECT */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-x-2 border-b-2 border-bronze-500 pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <p className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-md font-tektur">
          {text}
        </p>
      </motion.div>

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
