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
    <div className="px-7 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          <Image
            src="/images/bb-logo-black.png"
            width={50}
            height={50}
            alt="Logo"
          />
        </Link>

        <div className="">
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
