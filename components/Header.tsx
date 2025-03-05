"use client";

import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "@/components/shared/Button";
import User from "@/components/User";

const Header = () => {
  const { user } = useUser();
  const [scrollY, setScrollY] = useState(0);
  const links = [
    {
      text: "Docs",
      href: "/docs",
    },
    {
      text: "Pricing",
      href: "/#pricing",
    },
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Help",
      href: "/help",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <div
      className={`flex items-center sticky top-0 z-10 transition-all duration-500 ease-in-out 
                  ${scrollY > 0 ? "h-[50px] py-1" : "h-[110px] py-3"} 
                  px-5 md:px-10 bg-white shadow-lg`}
    >
      <div className="flex-1 flex items-center justify-between md:justify-center text-sm">
        <nav className="hidden md:flex flex-grow gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:font-bold transition-all on-hover-underline"
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* mobile screen menu section */}
        <div className="flex-center md:hidden">
          <button className="flex-center text-xl rounded-full p-2 hover:bg-gray-100 transition">
            <i className="bx bx-menu"></i>
          </button>
        </div>

        {/* logo */}
        <div className="flex-center md:w-[33%] md:border-r md:border-l">
          <Link href="/" className="flex-center gap-2 flex-col text-2xl">
            <Image
              src="/images/bb-logo-black.png"
              width={scrollY < 10 ? 50 : 40}
              height={scrollY < 10 ? 50 : 40}
              alt="Logo"
              className="transition-all"
            />
            {scrollY < 10 && (
              <p className="on-hover-underline after:w-[75%]">BLACKBRONZE</p>
            )}
          </Link>
        </div>

        {/* mobile screen profile section */}
        <div className="flex-center md:hidden">
          <button className="flex-center text-xl rounded-full p-2 text-white bg-black">
            <i className="bx bx-user"></i>
          </button>
        </div>

        {/* user info or login btn */}
        <div className="hidden md:flex flex-grow justify-end">
          {user ? (
            <User />
          ) : (
            <div className="flex items-center gap-5 text-sm">
              <Link
                href="/auth/login"
                className="hover:font-bold on-hover-underline"
              >
                Login
              </Link>
              <Link href="/auth/register">
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
