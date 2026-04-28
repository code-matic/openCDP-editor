import React from "react";
import type { MenuProps } from "antd";
import { Tooltip } from "antd";

// ─── Tiny icon helpers ────────────────────────────────────────────────────────

type IP = { size?: number };
const sv = (children: React.ReactNode, size = 13) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", flexShrink: 0 }}>
    {children}
  </svg>
);

const PencilIcon = ({ size = 13 }: IP) => sv(<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>, size);
const TrashIcon = ({ size = 13 }: IP) => sv(<><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></>, size);
const RefreshIcon = ({ size = 13 }: IP) => sv(<><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.8" /></>, size);
const PaletteIcon = ({ size = 13 }: IP) => sv(<><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" /><circle cx="6.5" cy="11.5" r="1" fill="currentColor" stroke="none" /><circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="7.5" r="1" fill="currentColor" stroke="none" /></>, size);
const TextColorIcon = ({ size = 13 }: IP) => sv(<><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></>, size);
const CornerIcon = ({ size = 13 }: IP) => sv(<><path d="M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" /></>, size);
const SpacingIcon = ({ size = 13 }: IP) => sv(<><rect x="3" y="8" width="18" height="8" rx="1" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><polyline points="9 5 12 2 15 5" /><polyline points="9 19 12 22 15 19" /></>, size);
const AlignLIcon = ({ size = 13 }: IP) => sv(<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></>, size);
const AlignCIcon = ({ size = 13 }: IP) => sv(<><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>, size);
const AlignRIcon = ({ size = 13 }: IP) => sv(<><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></>, size);
const ResizeIcon = ({ size = 13 }: IP) => sv(<><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>, size);
const XIcon = ({ size = 13 }: IP) => sv(<><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>, size);
const LinkIcon = ({ size = 13 }: IP) => sv(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>, size);

/** Wraps icon + text in a flex row for use as a menu item label. */
const il = (icon: React.ReactNode, text: string) => (
  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{icon}{text}</span>
);

/** A small colored swatch + label for color sub-menu items. */
const colorLabel = (hex: string, text: string) => (
  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: hex, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 }} />
    {text}
  </span>
);

// ─── Exports ──────────────────────────────────────────────────────────────────

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
    { key: "replace", label: il(<RefreshIcon />, "Replace Image"), onClick: handleReplaceImage },
    { key: "delete", label: il(<TrashIcon />, "Delete Image"), onClick: handleDeleteImage, danger: true },
    { type: "divider" },
    {
      key: "resize",
      label: il(<ResizeIcon />, "Resize Width"),
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
      label: il(<AlignCIcon />, "Align Image"),
      children: [
        { key: "align-left", label: il(<AlignLIcon />, "Left"), onClick: () => handleAlignImage("left") },
        { key: "align-center", label: il(<AlignCIcon />, "Center"), onClick: () => handleAlignImage("center") },
        { key: "align-right", label: il(<AlignRIcon />, "Right"), onClick: () => handleAlignImage("right") },
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
      label: il(<PaletteIcon />, "Background Color"),
      children: [
        { key: "bg-#3b82f6", label: colorLabel("#3b82f6", "Blue"), onClick: () => handleBgColorChange("#3b82f6") },
        { key: "bg-#10b981", label: colorLabel("#10b981", "Green"), onClick: () => handleBgColorChange("#10b981") },
        { key: "bg-#ef4444", label: colorLabel("#ef4444", "Red"), onClick: () => handleBgColorChange("#ef4444") },
        { key: "bg-#f59e0b", label: colorLabel("#f59e0b", "Orange"), onClick: () => handleBgColorChange("#f59e0b") },
        { key: "bg-#8b5cf6", label: colorLabel("#8b5cf6", "Purple"), onClick: () => handleBgColorChange("#8b5cf6") },
        { key: "bg-#000000", label: colorLabel("#000000", "Black"), onClick: () => handleBgColorChange("#000000") },
      ],
    },
    {
      key: "text-color",
      label: il(<TextColorIcon />, "Text Color"),
      children: [
        { key: "text-#ffffff", label: colorLabel("#ffffff", "White"), onClick: () => handleTextColorChange("#ffffff") },
        { key: "text-#000000", label: colorLabel("#000000", "Black"), onClick: () => handleTextColorChange("#000000") },
      ],
    },
    {
      key: "border-radius",
      label: il(<CornerIcon />, "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => handleBorderRadiusChange("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => handleBorderRadiusChange("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => handleBorderRadiusChange("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => handleBorderRadiusChange("9999px") },
      ],
    },
    {
      key: "padding",
      label: il(<SpacingIcon />, "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => handlePaddingChange("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => handlePaddingChange("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => handlePaddingChange("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => handlePaddingChange("20px 40px") },
      ],
    },
    {
      key: "align",
      label: il(<AlignCIcon />, "Align"),
      children: [
        { key: "align-left", label: il(<AlignLIcon />, "Left"), onClick: () => handleAlign("left") },
        { key: "align-center", label: il(<AlignCIcon />, "Center"), onClick: () => handleAlign("center") },
        { key: "align-right", label: il(<AlignRIcon />, "Right"), onClick: () => handleAlign("right") },
      ],
    },
    { type: "divider" },
    { key: "remove-bg", label: il(<XIcon />, "Remove Background"), onClick: handleRemoveBg },
    { key: "remove-border", label: il(<XIcon />, "Remove Border"), onClick: handleRemoveBorder },
    { key: "remove-padding", label: il(<XIcon />, "Remove Padding"), onClick: handleRemovePadding },
    { type: "divider" },
    { key: "delete", label: il(<TrashIcon />, "Delete Button"), danger: true, onClick: handleDelete },
  ],
});

export const createLinkMenuConfig = (
  handleEdit: () => void,
  handleDelete: () => void,
  handleTextColorChange: (color: string) => void,
): MenuProps => ({
  items: [
    { key: "edit-link", label: il(<PencilIcon />, "Edit Link"), onClick: handleEdit },
    {
      key: "text-color",
      label: il(<TextColorIcon />, "Text Color"),
      children: [
        { key: "text-#0ea5e9", label: colorLabel("#0ea5e9", "Blue"), onClick: () => handleTextColorChange("#0ea5e9") },
        { key: "text-#10b981", label: colorLabel("#10b981", "Green"), onClick: () => handleTextColorChange("#10b981") },
        { key: "text-#ef4444", label: colorLabel("#ef4444", "Red"), onClick: () => handleTextColorChange("#ef4444") },
        { key: "text-#f59e0b", label: colorLabel("#f59e0b", "Orange"), onClick: () => handleTextColorChange("#f59e0b") },
        { key: "text-#8b5cf6", label: colorLabel("#8b5cf6", "Purple"), onClick: () => handleTextColorChange("#8b5cf6") },
        { key: "text-#000000", label: colorLabel("#000000", "Black"), onClick: () => handleTextColorChange("#000000") },
      ],
    },
    { type: "divider" as const },
    { key: "delete", label: il(<TrashIcon />, "Remove Link"), danger: true, onClick: handleDelete },
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
