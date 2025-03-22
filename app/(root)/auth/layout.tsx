"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="w-full h-[90px] md:h-auto md:w-[30%] lg:w-[50%] bg-gradient-to-b md:bg-gradient-to-br from-slate-700 via-black to-black flex-center overflow-hidden">
        <div className="absolute flex items-center opacity-10 blur-md">
          <Image
            src="/images/bb-logo-white.png"
            width={1000}
            height={1000}
            draggable={false}
            className="size-full"
            alt="logo"
          />
        </div>

        <div className="z-[1] w-[90px] md:w-[300px] flex-center">
          <Image
            src="/images/bb-logo-white.png"
            width={1000}
            height={1000}
            className="object-contain"
            alt="logo"
          />
        </div>
      </div>

      <div className="flex-1 w-full md:w-[70%] lg:w-[50%] flex-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
