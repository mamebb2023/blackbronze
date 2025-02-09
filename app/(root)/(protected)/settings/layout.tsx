"use client";

import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      label: "Profile",
      href: "profile",
    },
    {
      label: "General",
      href: "general",
    },
    {
      label: "API Keys",
      href: "keys",
    },
  ];

  return (
    <div className="flex flex-col">
      <Title title="Settings" bx_icon="bx bx-clog" />
      <Tracker />
      <div className="flex items-start gap-2">
        <div className="sticky top-3 flex flex-col gap-1 w-56 bg-white rounded-md p-2 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/settings/${link.href}`}
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
