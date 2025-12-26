import { DropdownProps } from "antd";
import {
  removeBackground as removeButtonBackground,
  removeBorder as removeButtonBorder,
  removePadding as removeButtonPadding,
  handleBackgroundColorChange as updateButtonStyle,
  handleTextColorChange as updateButtonTextColor,
  handleBorderRadiusChange as updateButtonBorderRadius,
  handlePaddingChange as updateButtonPadding,
} from "./TextEditorFunctions";

export const createButtonMenuConfig = (
  selectedButton: { element: HTMLAnchorElement } | null,
  setCustomBgModalVisible: (visible: boolean) => void,
  setSelectedButton: (button: null) => void
): DropdownProps["menu"] => ({
  onClick: (info: any) => {
    if (!selectedButton?.element) return;
    const btn = selectedButton.element;
    if (info.key === "edit") {
      // Handle edit logic here
    } else if (info.key === "delete") {
      btn.remove();
      setSelectedButton(null);
    } else if (info.key.startsWith("align-")) {
      const alignment = info.key.replace("align-", "") as "left" | "center" | "right";
      btn.style.textAlign = alignment;
      const parentBlock = btn.closest("div, p, section, article") as HTMLElement | null;
      if (parentBlock) {
        parentBlock.style.textAlign = alignment;
      }
    } else {
      if (!btn) {
        console.error("Button element is not defined.");
        return;
      }

      if (info.key.startsWith("bg-")) {
        updateButtonStyle(btn, info.key.replace("bg-", ""));
      } else if (info.key.startsWith("text-")) {
        updateButtonTextColor(btn, info.key.replace("text-", ""));
      } else if (info.key.startsWith("radius-")) {
        updateButtonBorderRadius(btn, info.key.replace("radius-", ""));
      } else if (info.key.startsWith("padding-")) {
        updateButtonPadding(btn, info.key.replace("padding-", ""));
      } else if (info.key === "remove-bg") {
        removeButtonBackground(btn);
      } else if (info.key === "remove-border") {
        removeButtonBorder(btn);
      } else if (info.key === "remove-padding") {
        removeButtonPadding(btn);
      } else if (info.key === "custom-bg-color") {
        setCustomBgModalVisible(true);
      }
    }
  },
  items: [
    { key: "edit", label: "Edit Button" },
    {
      key: "align",
      label: "Align Button",
      children: [
        { key: "align-left", label: "Left" },
        { key: "align-center", label: "Center" },
        { key: "align-right", label: "Right" },
      ],
    },
    {
      key: "bg-color",
      label: "Background Color",
      children: [
        { key: "bg-#3b82f6", label: "Blue" },
        { key: "bg-#10b981", label: "Green" },
        { key: "bg-#ef4444", label: "Red" },
        { key: "bg-#f59e0b", label: "Orange" },
        { key: "bg-#8b5cf6", label: "Purple" },
        { key: "bg-#000000", label: "Black" },
        { key: "custom-bg-color", label: "Custom" },
      ],
    },
    {
      key: "border-radius",
      label: "Border Radius",
      children: [
        { key: "radius-0px", label: "Square" },
        { key: "radius-2px", label: "Default" },
        { key: "radius-4px", label: "Large" },
        { key: "radius-9999px", label: "Pill" },
      ],
    },
    {
      key: "text-color",
      label: "Text Color",
      children: [
        { key: "text-#ffffff", label: "White" },
        { key: "text-#000000", label: "Black" },
      ],
    },
    {
      key: "padding",
      label: "Padding",
      children: [
        { key: "padding-8px 16px", label: "Small" },
        { key: "padding-12px 24px", label: "Default" },
        { key: "padding-16px 32px", label: "Large" },
        { key: "padding-20px 40px", label: "Extra Large" },
      ],
    },
    { type: "divider" as const },
    { key: "remove-bg", label: "Remove Background" },
    { key: "remove-border", label: "Remove Border" },
    { key: "remove-padding", label: "Remove Padding" },
    { key: "delete", label: "Delete Button", danger: true },
  ],
});