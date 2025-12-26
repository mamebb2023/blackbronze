"use client";

import { LiquidMetal } from "@paper-design/shaders-react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => {
  return (
    <div
      className={`relative ${className} overflow-hidden px-6 py-2 rounded-full flex-center`}
    >
      <div className="absolute inset-0 flex-center">
        <LiquidMetal
          shape="none"
          distortion={1}
          contour={0.6}
          softness={0.4}
          repetition={1}
          speed={0.6}
          angle={45}
          style={{
            width: 300,
            height: 90,
          }}
          className="shrink-0"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute size-[calc(100%-5px)] bg-linear-to-t from-black to-gray-500 rounded-full transition-all"></div>
      <span className="relative z-20 text-gray-300 text-sm uppercase tracking-wider font-medium">
        {children}
      </span>
    </div>
  );
};
