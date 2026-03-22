"use client";

import { services } from "@/constants";
import { Tag } from "../ui/Tag";

const Services = () => {
  return (
    <div id="services" className="min-h-screen px-6 py-20 flex-center gap-4 flex-col">
      <div className="flex-center flex-col gap-3">
        <Tag>Services</Tag>
        <h1 className="text-7xl">What We Do</h1>
        <p className="text-md text-bronze">Turning complex problems, repeatitive tasks into elegant solutions.</p>
      </div>

      <div className="flex gap-5 flex-col w-4xl my-10">
        <div className="flex gap-3 flex-col md:flex-row gap-5">
          {services.slice(0, 2).map((service, index) => (
            <div key={`top-${index}`} className="flex flex-col gap-3 justify-between border border-bronze/30 flex-1 rounded-3xl p-3">
              <div className="w-full h-[200px] border border-bronze/30 rounded-3xl"></div>
              <div className="space-y-1 px-2">
                <p className="text-2xl text-bronze-light">{service.title}</p>
                <p className="">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-5 ">
          {services.slice(2).map((service, index) => (
            <div key={`bottom-${index}`} className={`flex flex-col gap-3 justify-between border border-bronze/30 flex-1 rounded-3xl p-3 ${index === 3 && ""}`}>
              <div className="w-full h-[150px] border border-bronze/30 rounded-3xl"></div>
              <div className="space-y-1 px-2">
                <p className="text-2xl text-bronze-light">{service.title}</p>
                <p className="">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;