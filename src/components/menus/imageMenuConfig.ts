import { DropdownProps } from "antd";
import {
  handleImageResize,
  handleImageAlignment,
  handleImageBorder,
} from "../imageEditing";

export const createImageMenuConfig = (
  selectedImage: { element: HTMLImageElement; x: number; y: number } | null,
  setSelectedImage: (
    img: { element: HTMLImageElement; x: number; y: number } | null
  ) => void
): DropdownProps["menu"] => ({
  onClick: (info: any) => {
    if (!selectedImage?.element) return;
    const img = selectedImage.element;

    if (info.key.startsWith("resize-")) {
      handleImageResize(img, info.key.replace("resize-", ""));
    } else if (info.key.startsWith("align-")) {
      handleImageAlignment(
        img,
        info.key.replace("align-", "") as "left" | "center" | "right"
      );
    } else if (info.key.startsWith("border-")) {
      handleImageBorder(img, info.key.replace("border-", ""));
    } else if (info.key === "remove") {
      img.remove();
      setSelectedImage(null);
    }
  },
  items: [
    {
      key: "resize",
      label: "Resize",
      children: [
        { key: "resize-25%", label: "25%" },
        { key: "resize-50%", label: "50%" },
        { key: "resize-75%", label: "75%" },
        { key: "resize-100%", label: "100%" },
      ],
    },
    {
      key: "align",
      label: "Align",
      children: [
        { key: "align-left", label: "Left" },
        { key: "align-center", label: "Center" },
        { key: "align-right", label: "Right" },
      ],
    },
    {
      key: "border",
      label: "Border Radius",
      children: [
        { key: "border-0px", label: "None" },
        { key: "border-8px", label: "Small" },
        { key: "border-16px", label: "Medium" },
        { key: "border-24px", label: "Large" },
      ],
    },
    { type: "divider" as const },
    { key: "remove", label: "Remove Image", danger: true },
  ],
});
