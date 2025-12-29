"use client";

// import { LiquidMetal } from "@paper-design/shaders-react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => {
  return (
      <div className={`relative ${className} overflow-hidden px-6 py-2 rounded-full flex-center bg-linear-to-br from-white/5 via-white/20 to-white/5 border border-white/10`}>
        {/* <div className="absolute inset-0 flex-center">
          <LiquidMetal
            shape="none"
            distortion={1}
            contour={0.6}
            softness={0.4}
            repetition={1}
            speed={0.6}
            angle={45}
            className="shrink-0 w-[calc(100%+160px)] h-[calc(100%+50px)]"
          />
        </div>
        <div
          className="absolute size-[calc(100%-5px)] bg-linear-to-t from-black to-gray-500 rounded-full transition-all"
        /> */}
        <span 
          className="relative z-20 text-gray-300 text-xs uppercase tracking-wider font-medium"
          style={{ fontFamily: 'var(--font-tektur)' }}
        >
          {children}
        </span>
      </div>
  );
};
