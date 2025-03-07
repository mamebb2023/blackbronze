import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
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

  return (
    <div className="px-5 md:px-10 text-white overflow-hidden">
      <div className="relative h-[50vh] bg-black flex">
        <div className="absolute z-[1] inset-0 flex items-center opacity-10 blur-sm">
          <Image
            src="/images/bb-logo-white.png"
            width={700}
            height={700}
            className="size-[550px] -ml-10"
            alt="logo"
          />
        </div>

        <div className="relative z-[5] flex flex-col flex-1">
          <div className="flex flex-1 p-3">
            <div className="flex-center flex-grow">
              <Image
                src="/images/bb-logo-white.png"
                width={500}
                height={500}
                className="size-[100px] md:size-[150px] lg:size-[200px]"
                draggable="false"
                alt="logo"
              />
            </div>

            <div className="md:flex-grow mx-5 flex flex-col justify-center items-start">
              <h5 className="mb-3 h5 font-bold gradient-underline after:h-1 after:w-[60%]">
                Quick Links
              </h5>
              <div className="flex flex-col items-start gap-2 pl-3">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="hover:font-bold on-hover-underline"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block flex-grow">links</div>
          </div>

          <div className="border-t border-gray-500/60 text-gray-500/80 mx-10 md:mx-14 lg:mx-20 px-5 md:px-7 lg:px-10 py-5 flex items-center justify-end">
            <p className="text-sm">&copy; BlackBronze, All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
