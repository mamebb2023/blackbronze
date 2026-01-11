"use client";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = "" }: TagProps) => {
  return (
    <div
      className={`relative ${className} overflow-hidden px-6 py-2 rounded-full flex-center bg-linear-to-br from-white/5 via-white/20 to-white/5 border border-white/10`}
    >
      <span
        className="relative z-20 text-gray-300 text-xs uppercase tracking-wider font-medium"
        style={{ fontFamily: "var(--font-tektur)" }}
      >
        {children}
      </span>
    </div>
  );
};
