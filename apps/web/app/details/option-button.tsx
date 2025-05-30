import React from "react";

interface OptionButtonProps {
  option: React.ReactNode;
  isSelected: boolean;
  onClick: (option: React.ReactNode) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses = {
  default: "border-gray-300 bg-white text-gray-700 hover:border-gray-400",
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border-gray-500 bg-gray-100 text-gray-800 hover:bg-gray-200",
};

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onClick,
  disabled = false,
  className = "",
  size = "md",
  variant = "default",
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => onClick(option)}
    className={`
      rounded-lg border-2 transition-all duration-200 font-medium
      ${sizeClasses[size]}
      ${isSelected ? "border-black bg-black text-white" : variantClasses[variant]}
      ${className}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    {option}
  </button>
);

export default OptionButton;
