import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-4 my-2 ${
        disabled
          ? "text-gray-800 bg-gray-400 cursor-not-allowed hover:bg-gray-800"
          : "active:scale-95"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
