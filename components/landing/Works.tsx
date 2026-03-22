"use client";

import { services } from "@/constants";
import WorksIntro from "./WorksIntro";
import { Tag } from "../ui/Tag";

const Works = () => {
  return (
    <div id="worksContainer" className="relative text-black overflow-hidden">
      <WorksIntro />

      <div id="works" className="min-h-screen px-6 py-20 flex-center gap-4 flex-col bg-white">
        <div className="flex-center flex-col gap-3">
          <Tag variant="black">Our Works</Tag>
          <h1 className="text-7xl">Selected Works</h1>
          <p className="text-md text-bronze">Turning complex problems, repeatitive tasks into elegant solutions.</p>
        </div>
      </div>

      <div className="h-[60vh] bg-gradient-to-b from-white via-bronze-dark/50 to-black" />
    </div>
  );
};

export default Works;