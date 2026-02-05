"use client"

// import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
// import Works from "@/components/landing/Works";
// import Contact from "@/components/landing/Contact";
// import Footer from "@/components/Footer";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HeaderThemeProvider>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen overflow-x-hidden"
      >
        {/* <LoadingScreen onComplete={() => setIsLoaded(true)} /> */}

        {/* {isLoaded && ( */}
        <>
          <Header />
          <Hero />
          <Services />
          {/* <Works /> */}
          {/* <Contact /> */}
          {/* <Footer /> */}
        </>
        {/* )} */}
      </motion.div>
    </HeaderThemeProvider>
  );
}
