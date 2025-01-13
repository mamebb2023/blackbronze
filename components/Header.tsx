"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./shared/Button";
import User from "./User";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="px-5 md:px-10 py-2 border-b border-gray-100">
      <div className="flex items-center justify-between md:justify-center text-sm">
        {/* links */}
        <nav className="hidden md:flex w-[33%] gap-4">
          <Link href="/docs">Docs</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">About</Link>
          <Link href="/">Help</Link>
        </nav>

        {/* mobile screen menu section */}
        <div className="flex-center md:hidden">
          <button className="flex-center text-xl rounded-full p-2 hover:bg-gray-100 transition">
            <i className="bx bx-menu"></i>
          </button>
        </div>

        {/* logo */}
        <div className="flex-center md:w-[33%] md:border-r md:border-l">
          <Link href="/" className="text-2xl font-semibold">
            <Image
              src="/images/bb-logo-black.png"
              width={45}
              height={45}
              alt="Logo"
            />
          </Link>
        </div>

        {/* mobile screen profile section */}
        <div className="flex-center md:hidden">
          <button className="flex-center text-xl rounded-full p-2 text-white bg-black">
            <i className="bx bx-user"></i>
          </button>
        </div>

        {/* user info or login btn */}
        <div className="hidden md:flex w-[33%] justify-end">
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
