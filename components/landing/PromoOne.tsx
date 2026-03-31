import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const PromoOne = () => {
  return (
    <div className="min-h-screen flex-center p-7">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0, staggerChildren: 0.1 }}
        className="absolute text-center text-3xl md:text-5xl max-w-3xl font-thin"
      >
        <p className="text-transparent bg-clip-text bg-gradient-to-br from-bronze-100 to-bronze-900 leading-14">We design and build modern,</p>
        <div className="flex-center text-transparent bg-clip-text bg-gradient-to-tr from-bronze-100 to-bronze-900">
          <span className="relative w-32 h-14 rounded-full inline-block mx-2 overflow-hidden">
            <Image
              src="/cta-bg.jpg"
              alt="text image"
              width={1000}
              height={1000}
              className="object-cover object-center"
            />
          </span>
          high-performance
        </div>
        <p className="text-transparent bg-clip-text bg-gradient-to-bl from-bronze-100 to-bronze-900 leading-14">websites that help businesses</p>
        <div className="flex-center text-transparent bg-clip-text bg-gradient-to-tl from-bronze-100 to-bronze-900">
          grow online.
          <span className="relative w-32 h-14 rounded-full inline-block mx-2 overflow-hidden">
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
    </div>
  )
}

export default PromoOne