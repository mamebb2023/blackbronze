import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  className,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full text-[.9em] border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-gray-500/30 ${className}`}
    />
  );
};

export default Input;
