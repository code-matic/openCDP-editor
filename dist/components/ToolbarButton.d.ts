import React from "react";
interface ToolbarButtonProps {
    active?: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
    label?: string;
}
declare const ToolbarButton: React.FC<ToolbarButtonProps>;
export default ToolbarButton;
