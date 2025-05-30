import React from "react";

interface ColorOptionProps {
  color: { name: string; value: string };
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const ColorOption: React.FC<ColorOptionProps> = ({
  color,
  isSelected,
  onClick,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-12 h-12 rounded-lg ${color.value} border-2 transition-all duration-200
      ${isSelected ? "border-black shadow-lg transform scale-105" : "border-gray-300 hover:border-gray-400"}
      ${className}
    `}
    aria-label={color.name}
  />
);

export default ColorOption;
