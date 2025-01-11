"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./shared/Button";
import User from "./User";

const Header = () => {
  const { user } = useUser();
  console.log("header user", user);

  return (
    <div className="px-10 py-2 border-b border-gray-100">
      <div className="flex items-center justify-center text-sm">
        {/* links */}
        <nav className="w-[33%] flex gap-4">
          <Link href="/">Docs</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">About</Link>
          <Link href="/">Help</Link>
        </nav>

        {/* logo */}
        <div className="w-[33%] flex-center border-r border-l">
          <Link href="/" className="text-2xl font-semibold">
            <Image
              src="/images/bb-logo-black.png"
              width={45}
              height={45}
              alt="Logo"
            />
          </Link>
        </div>

        {/* user info or login btn */}
        <div className="w-[33%] flex justify-end">
          {user ? (
            <User />
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/auth/login" className="text-sm">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm">
                <Button type="button" className="h-[50px] w-[150px] text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
