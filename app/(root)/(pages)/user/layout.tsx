"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

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
          toast({
            title: "Error",
            description: errorData.message,
            variant: "destructive",
          });
          return router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
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

  return <>{children}</>;
};

export default Layout;
