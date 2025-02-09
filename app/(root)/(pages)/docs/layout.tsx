"use client";

import Title from "@/components/Dashboard/Title";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "Get Started",
      href: "get-started",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-3">
        <Title title="Documentation" />
      </div>

      <div className="flex items-start gap-2">
        <div className="sticky top-3 flex flex-col gap-1 w-56 bg-gray-500/20 text-gray-500 rounded-md p-2 text-xs">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/docs/${link.href}`}
              className="p-1 rounded-sm hover:bg-gray-500/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 p-3 border">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
