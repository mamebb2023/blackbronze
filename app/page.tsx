"use client"

import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import LoadingScreen from "@/components/ui/LoadingScreen";
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
        </>
      )}
    </div>
  );
}
