"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import Divider from "@/components/shared/Divider";
import { HoverCard } from "radix-ui";
import { getToken } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const links = [
    { href: "/dashboard", icon: "bx bxs-grid-alt", label: "Dashboard" },
    { href: "/infrastructure", icon: "bx bxs-server", label: "Infrastructure" },
    { href: "/users", icon: "bx bxs-user", label: "Users" },
    { href: "/logs", icon: "bx bx-file", label: "Logs" },
    { href: "/metrics", icon: "bx bxs-bar-chart-alt-2", label: "Metrics" },
    { href: "/notifications", icon: "bx bxs-bell", label: "Notifications" },
  ];

  const [settings, setSettings] = useState<{ db_menu_collapsed?: boolean }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted to enable client-side rendering logic

    try {
      const storedSettings = localStorage.getItem("settings");
      const parsedSettings = storedSettings ? JSON.parse(storedSettings) : {};
      setSettings(parsedSettings);
    } catch (error) {
      console.error("Error reading settings:", error);
    }
  }, []);

  const dbMenuCollapsed = settings.db_menu_collapsed || false;

  const handleToggleCollapse = () => {
    const updatedSettings = {
      ...settings,
      db_menu_collapsed: !dbMenuCollapsed,
    };
    setSettings(updatedSettings);
    localStorage.setItem("settings", JSON.stringify(updatedSettings));
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

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

  if (!isMounted) {
    // Avoid rendering until the component is mounted
    return null;
  }

  return (
    <div className="flex flex-row">
      {/* Invisible placeholder */}
      <div
        className={`flex-shrink-0 h-screen ${
          dbMenuCollapsed ? "w-[40px]" : "w-[150px]"
        }`}
      ></div>

      <div
        className={`fixed top-0 left-0 h-screen text-sm border-r flex flex-col justify-between gap-1 bg-black text-white transition-all ${
          dbMenuCollapsed ? "w-[40px]" : "w-[150px]"
        }`}
      >
        {/* Logo */}
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
              !dbMenuCollapsed ? "absolute" : "block"
            }`}
            onClick={handleToggleCollapse}
          >
            <i
              className={`bx ${
                dbMenuCollapsed ? "bx bx-expand-alt" : "bx bx-minus"
              } text-xl`}
            />
          </div>
          <Divider />
        </div>

        {/* Main links */}
        <div className="flex flex-col gap-1">
          {links.map((link, index) => (
            <HoverCard.Root openDelay={0} closeDelay={0} key={index}>
              <HoverCard.Trigger asChild>
                <Link
                  href={link.href}
                  className="p-1 px-3 flex items-center gap-2 hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-2">
                    {link.icon && <i className={`text-[1.2em] ${link.icon}`} />}
                    <span className={dbMenuCollapsed ? "hidden" : "block"}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Content side="left" className="HoverCardContent">
                <div className="p-2 bg-black rounded-md">
                  <p className="text-xs text-white">{link.label}</p>
                </div>
                <HoverCard.Arrow className="text-black/70" />
              </HoverCard.Content>
            </HoverCard.Root>
          ))}
        </div>

        {/* Profile */}
        <div className="mb-5">
          <Divider />
          <div className="flex flex-col">
            <HoverCard.Root openDelay={0} closeDelay={0}>
              <HoverCard.Trigger asChild>
                <Link
                  href={"/user/profile"}
                  className="p-1 px-3 flex items-center gap-2 hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-2">
                    <i className={`text-[1.3em] bx bx-user-circle`} />
                    <span className={dbMenuCollapsed ? "hidden" : "block"}>
                      Profile
                    </span>
                  </div>
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Content side="left" className="HoverCardContent">
                <div className="p-2 bg-black rounded-md">
                  <p className="text-xs text-white">Profile</p>
                </div>
                <HoverCard.Arrow className="text-black/70" />
              </HoverCard.Content>
            </HoverCard.Root>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-start p-1 px-5 shadow-md">
            notification bar and other things
          </div>

          <div className="flex-1 flex flex-col p-3 bg-gray-500/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
