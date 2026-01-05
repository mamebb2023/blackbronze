'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Works = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern, scalable e-commerce solution with React and Node.js",
      color: "bg-linear-to-tr from-blue-950 via-transparent to-transparent",
      textColor: "text-blue-300"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time analytics dashboard for financial data visualization",
      color: "bg-green-200",
      textColor: "text-green-800"
    },
    {
      title: "Social Media App",
      description: "Mobile-first social platform with real-time messaging",
      color: "bg-purple-200",
      textColor: "text-purple-800"
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio website with advanced animations",
      color: "bg-red-200",
      textColor: "text-red-800"
    },
    {
      title: "SaaS Platform",
      description: "Cloud-based SaaS solution for business management",
      color: "bg-yellow-200",
      textColor: "text-yellow-800"
    }
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create horizontal scroll for the entire page
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        // markers: true,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black text-white flex"
      style={{ width: '500vw' }}
    >
      {projects.map((project, index) => (
        <section
          key={index}
          className={`relative w-screen h-screen flex items-center justify-center`}
        >
          <div className={`size-[95%] mx-auto flex items-end shrink-0 rounded-xl ${project.color} p-8`}>
            <div className="p-4">
              <h3 className={`text-2xl md:text-3xl font-bold ${project.textColor}`}>
                {project.title}
              </h3>
              <p className={`text-base md:text-lg ${project.textColor} opacity-80 max-w-sm`}>
                {project.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Works