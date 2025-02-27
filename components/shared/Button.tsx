import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  type,
  className,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} flex-center gap-2 ${
        disabled
          ? "text-white/80 bg-gray-400 cursor-not-allowed"
          : "btn active:scale-95"
      }`}
    >
      {children}
      {disabled && (
        <div className="size-5 border-s-2 border-white/80 rounded-s-full rounded animate-spin"></div>
      )}
    </button>
  );
};

export default Button;
