"use client";

import { services } from "@/constants";
import ServicesIntro from "./ServicesIntro";
import { Tag } from "../ui/Tag";

const Services = () => {
  return (
    <div id="serviceContainer" className="relative text-black overflow-hidden">
      <ServicesIntro />

      <div id="services" className="min-h-screen bg-white flex items-start justify-center">
        <Tag variant="black">Services</Tag>
      </div>

      <div className="h-[50vh] bg-linear-to-b from-white via-zinc-300/20 to-black" />
    </div>
  );
};

export default Services;
