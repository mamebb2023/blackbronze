"use client"

import Image from "next/image"
import { motion, useMotionValue, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const SPACING = 140
const SPEED = 1
const RESET_X = -400

const imageSources = [
  { text: 'Surfer 1', link: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop' },
  { text: 'Surfer 2', link: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop' },
  { text: 'Surfer 3', link: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=600&fit=crop' },
  { text: 'Surfer 4', link: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=600&fit=crop' },
  { text: 'Surfer 5', link: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=600&fit=crop' },
  { text: 'Surfer 6', link: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=600&fit=crop' },
  { text: 'Surfer 7', link: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop' },
  { text: 'Surfer 8', link: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=600&fit=crop' },
  { text: 'Surfer 9', link: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400&h=600&fit=crop' },
  { text: 'Surfer 10', link: 'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=400&h=600&fit=crop' },
  { text: 'Surfer 11', link: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=600&fit=crop' },
  { text: 'Surfer 12', link: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop' },
  { text: 'Surfer 13', link: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=600&fit=crop' },
  { text: 'Surfer 14', link: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&h=600&fit=crop' },
  { text: 'Surfer 15', link: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop' },
  { text: 'Surfer 16', link: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop' },
]

const images = [...imageSources, ...imageSources]

export default function SurferAnimation() {
    const isPausedRef = useRef(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
    const pause = (index: number) => {
      isPausedRef.current = true
      setHoveredIndex(index)
    }
  
    const resume = () => {
      isPausedRef.current = false
      setHoveredIndex(null)
    }
  
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
              total={images.length}
              isPausedRef={isPausedRef}
              hoveredIndex={hoveredIndex}
              pause={pause}
              resume={resume}
            />
          ))}
        </div>
      </div>
    )
  }

function InfiniteCard({
    src,
    text,
    index,
    total,
    isPausedRef,
    hoveredIndex,
    pause,
    resume,
  }: {
    src: string
    text: string
    index: number
    total: number
    isPausedRef: React.RefObject<boolean>
    hoveredIndex: number | null
    pause: (index: number) => void
    resume: () => void
  }) {
    const [startX, setStartX] = useState(0)
  
    useEffect(() => {
      const handleResize = () => {
        setStartX(window.innerWidth / 2 - 200) // 200 = half card width
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  
    const x = useMotionValue(startX + index * SPACING)
    const y = useMotionValue(startX + index * -SPACING)
    const z = useMotionValue(index * -SPACING)
  
    useAnimationFrame(() => {
      if (isPausedRef.current) return
  
      x.set(x.get() - SPEED)
      y.set(y.get() + SPEED)
      z.set(z.get() + SPEED)
  
      if (x.get() < RESET_X) {
        const offset = (total - 1) * SPACING
        x.set(startX + offset)
        y.set(-offset)
        z.set(-offset)
      }
    })
  
    const opacity = hoveredIndex === null ? 1 : hoveredIndex === index ? 1 : 0.2
  
    return (
      <motion.div
        className="absolute w-[400px] h-[240px] group flex-center"
        onHoverStart={() => pause(index)}
        onHoverEnd={resume}
        animate={{ opacity }}
        transition={{ duration: 0.2 }}
        style={{ x, y, z, rotateX: -20, rotateY: -30, zIndex: 100 - index }}
      >
        <div className="absolute -top-3 -translate-y-full flex-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-md font-tektur">{text}</p>
        </div>

        <Image
          src={src}
          alt=""
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-md shadow-2xl"
          unoptimized
        />
      </motion.div>
    )
  }
  
  
  

