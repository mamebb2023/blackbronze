"use client";

import React from "react";

type MarqueeTickerProps = {
  items: string[];
  speed?: number;
};

export default function Lines({ items, speed = 18 }: MarqueeTickerProps) {
  return (
    <div className="w-full overflow-hidden border-y border-bronze-500/15">
      <div
        className="flex items-center whitespace-nowrap text-bronze-500/70"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((text, i) => (
          <React.Fragment key={i}>
            <span className="text-xs flex items-center justify-center px-2">
              •
            </span>

            <div className="flex items-center px-8 py-4 text-bronze-300/70">
              <span className="text-[10px] md:text-sm tracking-tight font-semibold uppercase">
                {text}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}