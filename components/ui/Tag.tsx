"use client";

import { BsStars } from "react-icons/bs";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "black";
}

export const Tag = ({ children, className = "", variant = "default" }: TagProps) => {
  const variantStyles = {
    default:
      "bg-linear-to-br from-white/5 via-white/20 to-white/5 border border-white/10",
    black:
      "bg-linear-to-br from-black/5 via-black/20 to-black/5 border border-black/10",
  };

  const textStyles = {
    default: "text-gray-300",
    black: "text-black/80",
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
          <BsStars className="text-md" />
          {children}
        </span>
      </span>
    </div>
  );
};

