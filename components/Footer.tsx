import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/Button'

const Footer = () => {
  return (
    <div className="relative" style={{ background: "url('/cta-bg.jpg') no-repeat center center/cover" }}>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-black"/>

      <div className="h-[50vh] flex items-center justify-center px-5 md:px-10">
        <div className="relative z-10 flex-center flex-col text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Let&apos;s collaborate to bring your vision to life. Get in touch with us today.
          </p>
          <Button variant="liquid">
            Get Started
          </Button>
        </div>
      </div>
      
      <div className="min-h-[50vh] flex items-center justify-center px-5 md:px-10">
        <div className="relative z-10 w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo and Company Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/bb-logo-white.png"
                  alt="BlackBronze Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold text-white">BlackBronze</h3>
              </div>
              <p className="text-white/70 text-center md:text-left max-w-md">
                Crafting digital experiences that matter. We build modern, high-performance websites that help businesses grow online.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="#services" className="text-white/70 hover:text-white transition-colors duration-200">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="text-white/70 hover:text-white transition-colors duration-200">
                    Works
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-white/70 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-white/70 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-center md:items-end">
              <p className="text-white/50 text-sm text-center md:text-right">
                © {new Date().getFullYear()} BlackBronze.<br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Footer