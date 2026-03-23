"use client";

// import { services } from "@/constants";
import { Tag } from "../ui/Tag";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/lottie/lightning.json";
import { useRef } from "react";

const Services = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <div id="services" className="min-h-screen px-6 py-20 flex-center gap-4 flex-col">
      <div className="flex-center flex-col gap-3">
        <Tag>Services</Tag>
        <h1 className="text-7xl">What We Do</h1>
        <p className="text-md text-bronze-300">Turning complex problems, repeatitive tasks into elegant solutions.</p>
      </div>

      <div className="relative flex gap-5 flex-col w-4xl my-7">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 size-80 rounded-full bg-bronze-700/30 flex-center blur-3xl" />
        <div className="absolute bottom-10 right-0 translate-x-1/2 size-80 rounded-full bg-bronze-700/30 flex-center blur-3xl" />

        {/* top two */}
        <div className="relative flex gap-3 flex-col md:flex-row gap-5">
          {/* one */}
          <div className="relative border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute bottom-0 translate-y-1/2 left-0 -translate-x-1/4 size-80 rounded-full bg-bronze-700/40 flex-center blur-2xl">
                <div className="absolute size-[60%] rounded-full bg-bronze-700" />
                <div className="absolute size-[20%] rounded-full bg-bronze-100" />
              </div>
            </div>

            <div className="relative space-y-1 px-2 py-1 text-right">
              <p className="text-2xl text-bronze-300">Custom Web Design</p>
              <p className="">Bespoke websites tailored to your brand identity</p>
            </div>
            <div className="w-full h-[200px] rounded-2xl"></div>
          </div>

          {/* two */}
          <div className="relative border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-0 -translate-y-1/2 right-0 translate-x-1/4 size-80 rounded-full bg-bronze-700/40 flex-center blur-2xl">
                <div className="absolute size-[60%] rounded-full bg-bronze-700" />
                <div className="absolute size-[20%] rounded-full bg-bronze-100" />
              </div>
            </div>

            <div className="w-full h-[200px] rounded-2xl"></div>
            <div className="relative space-y-1 px-2 py-1">
              <p className="text-2xl text-bronze-300">Brand Identity</p>
              <p className="">Cohesive visual language across all touchpoints</p>
            </div>
          </div>
        </div>

        {/* bottom three */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* three */}
          <div className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 overflow-hidden">
            <div className="absolute top-0 left-0 -translate-x-1/7 -translate-y-1/7 -rotate-45 flex gap-3 blur-md">
              {[1, 2, 3, 2, 1].map((n, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-bronze-500 to-transparent rounded-[50%]"
                  style={{ width: `${n * 15}px`, height: `${n * 70}px` }}
                />
              ))}
            </div>
            <div className="w-full h-[150px] rounded-2xl"></div>
            <div className="relative space-y-1 px-2 py-1">
              <p className="text-2xl text-bronze-300">Responsive Design</p>
              <p className="">Perfect on every device</p>
            </div>
          </div>

          {/* four */}
          <div className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 size-72 rounded-full bg-bronze-700/40 flex-center blur-xl">
                <div className="absolute size-[70%] rounded-full bg-bronze-700" />
                <div className="absolute size-[20%] rounded-full bg-bronze-100" />
              </div>
            </div>
            <div className="relative space-y-1 px-2 py-1 text-center">
              <p className="text-2xl text-bronze-300">Lightning Fast</p>
              <p className="">Optimized performance</p>
            </div>
            <div className="w-full h-[150px] rounded-2xl flex-center">
              <div className="flex-center rounded-full border border-bronze-500/30 group-hover:border-bronze-500/50 transition-all duration-500">
                <Lottie
                  lottieRef={lottieRef}
                  className="h-35"
                  animationData={animationData}
                  loop={false}
                  autoplay={false}
                />
              </div>
            </div>
          </div>

          {/* five */}
          <div className="relative flex flex-col gap-3 justify-between border border-bronze-500/30 hover:border-bronze-500/50 transition-all duration-500 flex-1 rounded-3xl p-3 overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-1/7 -translate-y-1/7 rotate-45 flex gap-3 blur-md">
              {[1, 2, 3, 2, 1].map((n, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-bronze-500 to-transparent rounded-[50%]"
                  style={{ width: `${n * 15}px`, height: `${n * 70}px` }}
                />
              ))}
            </div>
            <div className="w-full h-[150px] rounded-2xl"></div>
            <div className="relative space-y-1 px-2 py-1 text-right">
              <p className="text-2xl text-bronze-300">SEO Optimization</p>
              <p className="">Rank higher, reach further</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Services;