"use client"

import LoadingScreen from "@/components/ui/LoadingScreen";
import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { useState } from "react";


export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {isLoaded && (
        <>
          <Header />
          <Hero />
          <Features />
        </>
      )}
    </div>
  );
}
