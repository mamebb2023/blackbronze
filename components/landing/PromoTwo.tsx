"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollParallax } from 'react-just-parallax';

const PromoTwo = () => {
  return (
    <div className="min-h-screen flex-center p-7 relative overflow-hidden">
      <div className="h-30vh"></div>

      {/* Decorative lines */}
      <motion.div
        className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-transparent via-bronze-500/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 w-32 h-px bg-gradient-to-l from-transparent via-bronze-500/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <ScrollParallax strength={0.2} isAbsolutelyPositioned>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="size-[500px] bg-bronze-500/20 blur-3xl rounded-[50%] flex-center z-299"
          />
        </div>
      </ScrollParallax>

      <div className="relative max-w-5xl mx-auto">
        {/* Number decoration */}
        <motion.div
          className="absolute -top-20 -left-10 md:-left-20"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[120px] md:text-[180px] font-bold text-white/[0.02] leading-none" style={{ fontFamily: "var(--font-tektur)" }}>
            01
          </span>
        </motion.div>

        {/* Main content */}
        <div className="relative space-y-8 px-4">
          {/* Top line */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="hidden md:block w-12 h-px bg-gradient-to-r from-bronze-500 to-transparent" />
            <p className="text-sm md:text-base text-bronze-400 uppercase tracking-[0.3em] font-light">
              Our Philosophy
            </p>
          </motion.div>

          {/* Main statement */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              <span className="text-white">We believe exceptional </span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-300 via-bronze-500 to-bronze-300">
                  digital experiences
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </h2>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              are born from a perfect balance of
            </h2>

            <div className="flex flex-wrap gap-6 pt-4">
              {['Design', 'Strategy', 'Technology'].map((item, index) => (
                <motion.div
                  key={item}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="relative px-6 py-3 border border-bronze-500/30 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-bronze-500/0 via-bronze-500/10 to-bronze-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative text-lg md:text-xl text-bronze-300 font-light">
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed font-light pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Every pixel, every interaction, every line of code is meticulously crafted
            to elevate your brand and deliver measurable results. We don't just build websites —
            we create digital foundations for lasting success.
          </motion.p>

          {/* Stat indicators */}
          <motion.div
            className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[
              { number: '100%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Projects Delivered' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-bronze-300 to-bronze-500" style={{ fontFamily: "var(--font-tektur)" }}>
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-zinc-500 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PromoTwo;