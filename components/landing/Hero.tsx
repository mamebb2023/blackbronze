"use client";

import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex-center px-6 py-20 "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-400">
              We build stunning
            </span>
            <br />
            websites that
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-white">
              drive growth
            </span>
          </h1>

          <p className="md:text-lg text-gray-400 max-w-xl leading-relaxed">
            Fast, scalable and engaging - turn your vision into reality with
            custom websites and web apps that streamline operations and elevate
            your brand.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email"
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all"
              required
            />
            <Button type="submit" variant="default">
              Get Started
            </Button>
          </form>

          <div className="flex flex-wrap gap-8 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold text-white">
                98.5%
              </div>
              <div className="text-sm text-gray-400">Client satisfaction</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-1"
            >
              <div className="text-3xl md:text-4xl font-bold text-white">
                ~50+
              </div>
              <div className="text-sm text-gray-400">Projects delivered</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4 ? "text-yellow-400" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-white">4.9</span>
            <span className="text-sm text-gray-400">Average client rating</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Main Desktop Screen */}
            <div className="relative z-10 w-[600px] h-[380px]">
              {/* Laptop Base/Body */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                {/* Screen Content */}
                <div className="w-full h-full bg-linear-to-br from-gray-950 to-black p-6 space-y-4">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/50 h-7 rounded-lg flex items-center px-3">
                      <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                      <div className="h-2 bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>

                  {/* Page Content */}
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="h-10 bg-linear-to-r from-gray-700 via-gray-800 to-gray-700 rounded-lg flex items-center px-4">
                      <div className="flex gap-2">
                        <div className="w-16 h-2 bg-gray-600 rounded"></div>
                        <div className="w-16 h-2 bg-gray-600 rounded"></div>
                        <div className="w-16 h-2 bg-gray-600 rounded"></div>
                      </div>
                    </div>

                    {/* Hero Section Mockup */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-800 rounded w-full"></div>
                        <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                        <div className="h-16 bg-linear-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30 mt-3"></div>
                      </div>
                      <div className="h-full bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"></div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-14 bg-gray-800/50 rounded-lg border border-gray-700"></div>
                      <div className="h-14 bg-gray-800/50 rounded-lg border border-gray-700"></div>
                      <div className="h-14 bg-gray-800/50 rounded-lg border border-gray-700"></div>
                    </div>
                  </div>
                </div>

                {/* Screen Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Background Desktop Screen (Stacked Effect) */}
            <div className="absolute top-16 -left-12 w-[540px] h-[340px] bg-linear-to-br from-gray-900 to-black rounded-2xl shadow-xl border border-gray-800 opacity-30 -z-10"></div>

            {/* Decorative Glows */}
            <div className="absolute -top-10 right-20 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
