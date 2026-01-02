"use client"

import LoadingScreen from "@/components/ui/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { useState } from "react";


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
            <Services />
          </>
        )}
      </div>
    </HeaderThemeProvider>
  );
}
