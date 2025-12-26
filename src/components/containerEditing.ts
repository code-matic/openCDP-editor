export const handleContainerBorder = (
  containerElement: HTMLElement,
  border: string
) => {
  containerElement.style.border = border;
};

export const handleContainerBorderRadius = (
  containerElement: HTMLElement,
  radius: string
) => {
  containerElement.style.borderRadius = radius;
};

export const removeContainerBorder = (containerElement: HTMLElement) => {
  containerElement.style.border = "";
};
