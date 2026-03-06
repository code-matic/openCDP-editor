import React from "react";
import type { MenuProps } from "antd";
import { Tooltip } from "antd";

export const colorOptions = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" },
];

export const createColorMenu = (applyHighlightColor: (color: string) => void): MenuProps => ({
  items: [
    {
      key: "color-grid",
      label: (
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {colorOptions.map((option) => (
            <Tooltip title={option.label} key={option.color}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  applyHighlightColor(option.color);
                }}
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: option.color,
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "transform 0.1s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Tooltip>
          ))}
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "default",
      label: "Reset to Black",
      onClick: () => applyHighlightColor("#000000"),
    },
  ],
});

export const createMenuConfig = (
  handleReplaceImage: () => void,
  handleDeleteImage: () => void,
  handleAlignImage: (alignment: "left" | "center" | "right") => void,
  handleResizeImage: (width: string) => void
): MenuProps => ({
  items: [
    { key: "replace", label: "Replace Image", onClick: handleReplaceImage },
    { key: "delete", label: "Delete Image", onClick: handleDeleteImage, danger: true },
    { type: "divider" },
    {
      key: "resize",
      label: "Resize Width",
      children: [
        { key: "10%", label: "10%", onClick: () => handleResizeImage("10%") },
        { key: "25%", label: "25%", onClick: () => handleResizeImage("25%") },
        { key: "50%", label: "50%", onClick: () => handleResizeImage("50%") },
        { key: "75%", label: "75%", onClick: () => handleResizeImage("75%") },
        { key: "100%", label: "100%", onClick: () => handleResizeImage("100%") },
      ],
    },
    {
      key: "align",
      label: "Align Image",
      children: [
        { key: "align-left", label: "Left", onClick: () => handleAlignImage("left") },
        { key: "align-center", label: "Center", onClick: () => handleAlignImage("center") },
        { key: "align-right", label: "Right", onClick: () => handleAlignImage("right") },
      ],
    },
  ],
});

export const createButtonMenuConfig = (
  handleDelete: () => void,
  handleRemoveBg: () => void,
  handleRemoveBorder: () => void,
  handleRemovePadding: () => void,
  handleBgColorChange: (color: string) => void,
  handleTextColorChange: (color: string) => void,
  handleBorderRadiusChange: (radius: string) => void,
  handlePaddingChange: (padding: string) => void,
  handleAlign: (alignment: "left" | "center" | "right") => void
): MenuProps => ({
  items: [
    {
      key: "bg-color",
      label: "Background Color",
      children: [
        { key: "bg-#3b82f6", label: "Blue", onClick: () => handleBgColorChange("#3b82f6") },
        { key: "bg-#10b981", label: "Green", onClick: () => handleBgColorChange("#10b981") },
        { key: "bg-#ef4444", label: "Red", onClick: () => handleBgColorChange("#ef4444") },
        { key: "bg-#f59e0b", label: "Orange", onClick: () => handleBgColorChange("#f59e0b") },
        { key: "bg-#8b5cf6", label: "Purple", onClick: () => handleBgColorChange("#8b5cf6") },
        { key: "bg-#000000", label: "Black", onClick: () => handleBgColorChange("#000000") },
      ],
    },
    {
      key: "text-color",
      label: "Text Color",
      children: [
        { key: "text-#ffffff", label: "White", onClick: () => handleTextColorChange("#ffffff") },
        { key: "text-#000000", label: "Black", onClick: () => handleTextColorChange("#000000") },
      ],
    },
    {
      key: "border-radius",
      label: "Border Radius",
      children: [
        { key: "radius-0px", label: "Square", onClick: () => handleBorderRadiusChange("0px") },
        { key: "radius-2px", label: "Default", onClick: () => handleBorderRadiusChange("2px") },
        { key: "radius-4px", label: "Large", onClick: () => handleBorderRadiusChange("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => handleBorderRadiusChange("9999px") },
      ],
    },
    {
      key: "padding",
      label: "Padding",
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => handlePaddingChange("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => handlePaddingChange("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => handlePaddingChange("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => handlePaddingChange("20px 40px") },
      ],
    },
    {
      key: "align",
      label: "Align",
      children: [
        { key: "align-left", label: "Left", onClick: () => handleAlign("left") },
        { key: "align-center", label: "Center", onClick: () => handleAlign("center") },
        { key: "align-right", label: "Right", onClick: () => handleAlign("right") },
      ],
    },
    { type: "divider" },
    { key: "remove-bg", label: "Remove Background", onClick: handleRemoveBg },
    { key: "remove-border", label: "Remove Border", onClick: handleRemoveBorder },
    { key: "remove-padding", label: "Remove Padding", onClick: handleRemovePadding },
    { type: "divider" },
    { key: "delete", label: "Delete", danger: true, onClick: handleDelete },
  ],
});

export const fontOptions = [
  { label: "Sans Serif", value: "Arial, sans-serif" },
  { label: "Fixed Width", value: "Courier New, monospace" },
  { label: "Wide", value: "Arial Black, sans-serif" },
  { label: "Narrow", value: "Arial Narrow, sans-serif" },
  { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

export const createFontMenu = (onSelect: (font: string) => void): MenuProps => ({
  items: fontOptions.map((f) => ({
    key: f.value,
    label: <span style={{ fontFamily: f.value }}>{f.label}</span>,
  })),
  onClick: ({ key }) => {
    onSelect(key);
  },
});

