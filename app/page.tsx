"use client"

import LoadingScreen from "@/components/ui/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { useState } from "react";
import SurferAnimation from "@/components/ui/SurferAnimation";


export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HeaderThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <LoadingScreen onComplete={() => setIsLoaded(true)} />

        {isLoaded && (
          <>
            <Header />
            <Hero />
            {/* <SurferAnimation /> */}
            <Features />
          </>
        )}
      </div>
    </HeaderThemeProvider>
  );
}
