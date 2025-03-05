"use client";

import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [showFeature, setShowFeature] = useState(0);

  const features = [
    {
      title: "Interactive dashboards",
      text: "More than summary dashboards, we offer all high-resolution metrics and events for manipulation and graphing.",
      icon: "bx bxs-user",
    },
    {
      title: "Visualize traffic flow",
      text: "Understand performance using meaningful, human-readable visuals",
      icon: "bx-user",
    },
    {
      title: "Monitor user experience",
      text: "End-to-end user experience visibility in a single platform.",
      icon: "bx bxs-user",
    },
    {
      title: "Alertes on critical issues",
      text: "We notify you of performance problems, whether they affect a single host or a massive cluster.",
      icon: "bx bxs-user",
    },
  ];

  return (
    <div className="">
      <div className="mx-4 h-screen bg-black text-white flex-col">
        <div className="pt-7 md:pt-10 lg:pt-14 flex items-center flex-col gap-3 text-center">
          <h2 className="h2">Modern monitoring & security</h2>
          <p className="body-2">
            See inside any stack, any app, at any scale, anywhere.
          </p>
          <Link href="/register">
            <Button className="bg-white text-black w-[200px] h-[50px] hover:text-white hover:border-white">
              Get Started
            </Button>
          </Link>
          <Image
            src="/images/metrics-image.png"
            width={1000}
            height={1000}
            alt="image"
          />
        </div>
      </div>

      <div className="relative px-3 text-white h-screen bg-gradient-to-br from-green-800 to-cyan-800">
        <div className="z-[1] absolute inset-0 size-full opacity-10 overflow-hidden">
          <h1 className="text-[7em] md:text-[10em] lg:text-[15em] font-bold">
            Features
          </h1>
        </div>

        <div className="relative z-[5] flex flex-col md:flex-row flex-1 h-full">
          <div className="flex flex-wrap items-center md:flex-col md:items-stretch md:px-2 py-2 gap-2 justify-center md:w-[25%] border-b md:border-b-0 md:border-r border-gray-500/50 my-12">
            {features.map((item, index) => (
              <div
                key={index}
                className={`py-1 px-3 rounded-md flex-grow md:flex-none md:w-auto transition-all ${
                  showFeature === index
                    ? "bg-white text-black font-bold"
                    : "hover:bg-gray-500/30 cursor-pointer"
                }`}
                onClick={() => setShowFeature(index)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="flex-1 my-3 md:my-10 lg:my-14 px-5">
            {features.map((item, index) => {
              if (showFeature === index) {
                return <div key={index}>{item.text}</div>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
