"use client"

import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
// import Works from "@/components/landing/Works";
// import Contact from "@/components/landing/Contact";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Works from "@/components/landing/Works";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HeaderThemeProvider>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen overflow-x-hidden"
      >
        <LoadingScreen onComplete={() => setIsLoaded(true)} />

        {isLoaded && (
          <>
            <Header />
            <Hero />
            <Works />
            <Services />
            {/* <Works /> */}
            {/* <Contact /> */}
            <Cta />
            <Footer />
          </>
        )}
      </motion.div>
    </HeaderThemeProvider>
  );
}
