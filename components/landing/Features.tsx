'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current || !boxRef.current) return
    
    const getViewportSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    let animation: gsap.core.Tween | null = null
    let scrollTrigger: ScrollTrigger | null = null
    
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
          pin: true
        }
      })
      
      scrollTrigger = animation.scrollTrigger || null
    }
    
    createAnimation()
    
    const handleResize = () => {
      createAnimation()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animation) animation.kill()
      if (scrollTrigger) scrollTrigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div id="features" ref={containerRef} className="relative min-h-[200vh] flex-center">
      <div 
        ref={boxRef}
        className="bg-white"
        style={{
          width: 250,
          height: 400,
          borderRadius: 999
        }}
      />
    </div>
  )
}

export default Features