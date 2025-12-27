'use client';

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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-8"
            >
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                        We build stunning
                    </span>
                    <br />
                    websites that
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-white">
                        drive growth
                    </span>
                </h1>

                <p className="md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                    Fast, scalable and engaging - turn your vision into reality with
                    custom websites and web apps that streamline operations and elevate
                    your brand.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter work email"
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all backdrop-blur-sm"
                        required
                    />
                    <Button type="submit" variant="default" className="shrink-0">
                        Get Started
                    </Button>
                </form>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-8">
                    <div className="flex items-center gap-3">
                        <div className="text-left">
                            <div className="text-3xl font-bold text-white">98.5%</div>
                            <div className="text-sm text-gray-400">Client satisfaction</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-left">
                            <div className="text-3xl font-bold text-white">~50+</div>
                            <div className="text-sm text-gray-400">Projects delivered</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2 items-center mt-1">
                                <span className="text-xl font-bold text-white">4.9</span>
                                <span className="text-sm text-gray-400">Average rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;