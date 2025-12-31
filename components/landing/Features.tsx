'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toggleHeaderTheme } from '@/contexts/HeaderThemeContext'
import { AnimatePresence, motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  const [showContents, setShowContents] = useState(false)
  
  useEffect(() => {
    if (!containerRef.current || !boxRef.current) return
    
    const getViewportSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    let animation: gsap.core.Tween | null = null
    let scrollTrigger: ScrollTrigger | null = null
    let themeToggleTrigger: ScrollTrigger | null = null
    let hasToggled = false
    
    const createAnimation = () => {
      if (animation) animation.kill()
      if (scrollTrigger) scrollTrigger.kill()
      
      const viewportSize = getViewportSize()
      
      animation = gsap.to(boxRef.current, {
        width: viewportSize.width,
        height: viewportSize.height,
        borderRadius: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: true,
          // markers: true,
          pin: true,
          onUpdate: (self) => {
            // Show content when progress reaches 70%
            if (self.progress >= 0.7) {
              setShowContents(true)
            } else {
              setShowContents(false)
            }
          }
        }
      })
      
      scrollTrigger = animation.scrollTrigger || null
    }
    
    // Create ScrollTrigger for theme toggle at 50% visibility
    const createThemeToggle = () => {
      if (themeToggleTrigger) themeToggleTrigger.kill()
      
      themeToggleTrigger = ScrollTrigger.create({
        trigger: "#featuresContainer",
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => {
          if (!hasToggled) {
            toggleHeaderTheme()
            hasToggled = true
          }
        },
        onLeaveBack: () => {
          if (hasToggled) {
            toggleHeaderTheme()
            hasToggled = false
          }
        }
        
      })
    }
    
    createAnimation()
    createThemeToggle()
    
    const handleResize = () => {
      createAnimation()
      createThemeToggle()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animation) animation.kill()
      if (scrollTrigger) scrollTrigger.kill()
      if (themeToggleTrigger) themeToggleTrigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div id="features" className="relative text-black overflow-hidden">
      <div className="h-[50vh]"/>

      <div className="h-screen flex-center" ref={containerRef}>
        <div 
          id="featuresContainer"
          ref={boxRef}
          className="bg-white flex-center flex-col gap-4"
          style={{
            width: 250,
            height: 400,
            borderRadius: 999
          }}
        >
          <AnimatePresence>
            {showContents && (
              <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, delay: 0 }}
              className="h-screen flex-center"
              >
              hello
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        <h1>Hello, again</h1>
      </div>
    </div>
  )
}

export default Features