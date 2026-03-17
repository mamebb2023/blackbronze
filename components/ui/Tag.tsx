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
      "bg-linear-to-br from-bronze/5 via-bronze/20 to-bronze/5 border border-bronze/10",
    black:
      "bg-linear-to-br from-bronze-dark/5 via-bronze-dark/20 to-bronze-dark/5 border border-bronze-dark/10",
  };

  const textStyles = {
    default: "text-bronze",
    black: "text-bronze-dark",
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
          <BsStars className="text-md text-bronze-dark" />
          {children}
        </span>
      </span>
    </div>
  );
};

