"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import Divider from "@/components/shared/Divider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [collapse, setCollapse] = useState(false);

  const links = [
    { href: "/dashboard", icon: "bx bxs-dashboard", label: "Dashboard" },
    {
      href: "/infrastructure",
      icon: "bx bxs-server",
      label: "Infrastructure",
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        toast({
          title: "Error",
          description: "You must be logged in to access this page.",
          variant: "destructive",
        });
        return router.push("/auth/login");
      }

      try {
        const res = await fetch("/api/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          toast({
            title: "Error",
            description: errorData.message,
            variant: "destructive",
          });
          return router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        toast({
          title: "Error",
          description: "An error occurred while checking authentication.",
          variant: "destructive",
        });
        return router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router, toast]);

  return (
    <div className="flex flex-row">
      <div
        className={`flex-shrink-0 h-screen ${
          collapse ? "w-[40px]" : "w-[150px]"
        }`}
      />

      <div
        className={`fixed top-0 left-0 h-screen text-sm border-r flex flex-col justify-between gap-1 bg-black text-white transition-all ${
          collapse ? "w-[40px]" : "w-[150px]"
        }`}
      >
        {/* logo */}
        <div className="relative flex-center gap-2 flex-col pt-2 mb-5">
          <Link href="/" className="p-[2px]">
            <Image
              src="/images/bb-logo-white.png"
              width={200}
              height={200}
              alt="Logo"
              className={`w-full max-w-14`}
            />
          </Link>
          <div
            className={`top-0 right-0 p-1 opacity-50 hover:bg-white/20 hover:opacity-100 flex-center cursor-pointer transition-all ${
              !collapse ? "absolute" : "block"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <i
              className={`bx ${
                collapse ? "bx bx-expand-alt" : "bx bx-minus"
              } text-xl`}
            />
          </div>
          <Divider />
        </div>

        {/* main links */}
        <div className="flex flex-col gap-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="p-1 px-3 flex items-center gap-2 hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-2">
                {link.icon && <i className={link.icon} />}
                <span className={collapse ? "hidden" : "block"}>
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* profile */}
        <div className="mb-5">
          <Divider />
          <div className="flex flex-col">
            <Link
              href="/user/profile"
              className="p-1 flex items-center px-3 gap-2 hover:bg-white/20"
            >
              <i className="bx bxs-user" />
              <span className={collapse ? "hidden" : "block"}>Profile</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
