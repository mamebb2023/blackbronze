"use client";

import { BsStars } from "react-icons/bs";
import ShinyText from "./ShinyText";

interface TagProps {
  // children: React.ReactNode;
  className?: string;
  variant?: "default" | "black";
  text?: string;
}

export const Tag = ({ className = "", variant = "default", text = "" }: TagProps) => {
  const variantStyles = {
    default:
      "bg-linear-to-br from-bronze-300/5 via-bronze-300/20 to-bronze-300/5 border border-bronze-300/10",
    black:
      "bg-linear-to-br from-bronze-500/5 via-bronze-500/20 to-bronze-500/5 border border-bronze-500/10",
  };

  const textStyles = {
    default: "text-bronze-500",
    black: "text-bronze-500",
  };

  return (
    <div
      className={`relative ${className} overflow-hidden px-6 py-2 rounded-full flex-center  ${variantStyles[variant]}`}
    >
      <span
        className={`relative z-20 ${textStyles[variant]} text-xs uppercase tracking-wider font-medium`}
        style={{ fontFamily: "var(--font-tektur)" }}
      >
        <span className="flex-center gap-2">
          <BsStars className="text-md text-bronze-500" />
          <ShinyText text={text} color="#AA7939" shineColor="#FFE0B8" />
        </span>
      </span>
    </div>
  );
};

