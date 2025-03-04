"use client";

import Title from "@/components/Dashboard/Title";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "Get Started",
      href: "get-started",
    },
    {
      label: "Other",
      href: "/",
    },
  ];

  const pathname = usePathname().split("/");
  console.log("pathname", pathname[pathname.length - 1]);

  return (
    <div className="flex flex-col p-3">
      <div className="py-2">
        <Title title="Documentation" />
      </div>

      <div className="relative flex gap-2 min-h-[60vh] py-2">
        <div className="flex flex-col gap-1 w-56 bg-white shadow-xl rounded-md p-2 text-sm border border-gray-500/5">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/docs/${link.href}`}
              className={`rounded-sm  transition  ${
                pathname[pathname.length - 1] === link.href
                  ? "bg-gray-500/15 font-bold py-1 px-3"
                  : "on-hover-underline my-1 mx-3"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
