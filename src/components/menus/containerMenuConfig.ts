import { DropdownProps } from "antd";
import {
  handleContainerBorder,
  handleContainerBorderRadius,
  removeContainerBorder,
} from "../containerEditing";

export const createContainerMenuConfig = (
  selectedContainer: { element: HTMLElement; x: number; y: number } | null,
  setSelectedContainer: (
    container: { element: HTMLElement; x: number; y: number } | null
  ) => void
): DropdownProps["menu"] => ({
  onClick: (info: any) => {
    if (!selectedContainer?.element) return;
    const container = selectedContainer.element;

    if (info.key.startsWith("border-")) {
      handleContainerBorder(container, info.key.replace("border-", ""));
    } else if (info.key.startsWith("radius-")) {
      handleContainerBorderRadius(container, info.key.replace("radius-", ""));
    } else if (info.key === "remove-border") {
      removeContainerBorder(container);
    }
  },
  items: [
    {
      key: "border",
      label: "Border",
      children: [
        { key: "border-1px solid #000", label: "Black" },
        { key: "border-1px solid #3b82f6", label: "Blue" },
        { key: "border-1px solid #10b981", label: "Green" },
        { key: "border-1px solid #ef4444", label: "Red" },
      ],
    },
    {
      key: "border-radius",
      label: "Border Radius",
      children: [
        { key: "radius-0px", label: "None" },
        { key: "radius-4px", label: "Small" },
        { key: "radius-8px", label: "Medium" },
        { key: "radius-12px", label: "Large" },
      ],
    },
    { type: "divider" as const },
    { key: "remove-border", label: "Remove Border" },
  ],
});
