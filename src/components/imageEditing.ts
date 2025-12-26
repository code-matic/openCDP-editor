export const handleImageResize = (
  imageElement: HTMLImageElement,
  size: string
) => {
  imageElement.style.width = size;
};

export const handleImageAlignment = (
  imageElement: HTMLImageElement,
  alignment: "left" | "center" | "right"
) => {
  imageElement.style.display = "block";
  imageElement.style.margin =
    alignment === "center" ? "auto" : `0 ${alignment === "right" ? "0 0 auto" : "auto 0 0"}`;
};

export const handleImageBorder = (
  imageElement: HTMLImageElement,
  radius: string
) => {
  imageElement.style.borderRadius = radius;
};
