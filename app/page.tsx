"use client"

import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Footer from "@/components/landing/Footer";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Works from "@/components/landing/Works";
import PromoOne from "@/components/landing/PromoOne";
import PromoTwo from "@/components/landing/PromoTwo";
import Lines from "@/components/Lines";

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
            <div className="h-[30vh]"></div>
            <PromoTwo />
            <Works />
            <PromoOne />
            <Lines items={[
              "BUILT FOR SCALE",
              "MODERN MINIMALISM",
              "ELEGANT. BOLD.",
              "QUALITY BEYOND TREND",
              "CRAFTED IN EVERY DETAIL",
              "HIGH-CONVERTING WEBSITES",
              "MODERN WEB DESIGN FOR MODERN BRANDS",
              "LANDING PAGES THAT SELL",
              "FAST DELIVERY — CLEAN UI",
              "MOBILE-FIRST EXPERIENCE",
              "CRAFTED USER EXPERIENCE",
            ]} />
            <Services />
            <Footer />
          </>
        )}
      </motion.div>
    </HeaderThemeProvider>
  );
}
