import React from "react";

interface ToolbarButtonProps {
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  tooltip?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active,
  onClick,
  icon,
  label,
  tooltip,
}) => {
  return (
    <button
      className={`px-2 py-1 rounded ${
        active ? "bg-gray-500 text-white" : "bg-gray-100"
      }`}
      onClick={onClick}
      title={tooltip}
    >
      {icon || label}
    </button>
  );
};

export default ToolbarButton;
