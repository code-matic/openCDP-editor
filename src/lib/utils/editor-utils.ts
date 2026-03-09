import liquidEngine from "./liquid-engine";
import { findInvalidCurrencyCodes } from "./currency-codes";

const RSW_EDITOR_SELECTOR = ".rsw-editor .rsw-ce";

export function validateCurrencyCodes(template: string): string | null {
  const invalid = [...new Set(findInvalidCurrencyCodes(template))];
  if (invalid.length === 0) return null;
  return `Invalid currency code${invalid.length > 1 ? "s" : ""}: ${invalid.join(", ")}. Messages may render with incorrect formatting.`;
}

export function validateLiquidTemplate(tpl: string): { valid: boolean; error?: Error } {
  try {
    liquidEngine.parse(tpl);
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err as Error };
  }
}

export function replaceBodyContent(originalHtml: string, newHtml: string): string {
  const parser = new DOMParser();
  const originalDoc = parser.parseFromString(originalHtml, "text/html");
  const newDoc = parser.parseFromString(newHtml, "text/html");

  originalDoc.body.innerHTML = newDoc.body.innerHTML;
  const newStyles = newDoc.head.querySelectorAll("style");
  newStyles.forEach((style) => {
    const isDuplicate = Array.from(originalDoc.head.querySelectorAll("style")).some(
      (existing) => existing.innerHTML === style.innerHTML
    );
    if (!isDuplicate) {
      originalDoc.head.appendChild(style.cloneNode(true));
    }
  });
  return "<!DOCTYPE html>\n" + originalDoc.documentElement.outerHTML;
}

export function wrapEmailBodyHtml(body: string): string {
  return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="word-spacing:normal;">
    <div style="margin:0px auto;max-width:600px;font-family:sans-serif;">
      ${body}
    </div>
  </body>
</html>
`;
}

export function getEditorElement(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector(RSW_EDITOR_SELECTOR) as HTMLElement | null;
}

export function insertSelectionMarker(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const marker = document.createElement("span");
  marker.id = "selection-marker";
  marker.appendChild(document.createTextNode("\u200B"));
  range.insertNode(marker);
  range.setStartAfter(marker);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return marker;
}

export function restoreSelectionFromMarker(marker: HTMLElement | null): void {
  if (!marker || typeof document === "undefined") return;
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.setStartAfter(marker);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  marker.parentNode?.removeChild(marker);
}

export function applyAlignmentToSelection(
  alignment: "left" | "right" | "center",
  handleEditorChange: (html: string) => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  const marker = insertSelectionMarker();
  if (!marker) return;

  const getBlockElement = (node: Node | null): HTMLElement | null => {
    while (node && node !== editor) {
      if (node instanceof HTMLElement) {
        const display = window.getComputedStyle(node).display;
        if (
          display === "block" ||
          display === "list-item" ||
          display === "table" ||
          node.tagName.toLowerCase() === "p" ||
          node.tagName.toLowerCase() === "div" ||
          node.tagName.toLowerCase() === "li" ||
          node.tagName.toLowerCase() === "section"
        ) {
          return node;
        }
      }
      node = node.parentNode;
    }
    return null;
  };

  const block = getBlockElement(marker);
  if (block) {
    block.style.textAlign = alignment;
  }

  restoreSelectionFromMarker(marker);
  handleEditorChange(editor.innerHTML);
}

export function syncEditorContentToState(setIframeContent: (value: string) => void): void {
  const editor = getEditorElement();
  if (!editor) return;
  setIframeContent(editor.innerHTML);
  editor.dispatchEvent(new Event("input", { bubbles: true }));
}

export function deleteImageFromEditor(
  img: HTMLImageElement,
  setIframeContent: (value: string) => void,
  onClearSelection?: () => void
): void {
  const editor = getEditorElement();
  if (!editor) return;
  img.style.outline = "";
  const wrapper = img.closest("div");
  if (wrapper && wrapper.parentElement === editor) {
    wrapper.remove();
  } else {
    img.remove();
  }
  syncEditorContentToState(setIframeContent);
  onClearSelection?.();
}

export function updateImageWidthInEditor(
  img: HTMLImageElement,
  width: string,
  setIframeContent: (value: string) => void,
  onClearSelection?: () => void
): void {
  if (!img) return;
  img.style.width = width;
  img.removeAttribute("width");
  img.style.outline = "";
  syncEditorContentToState(setIframeContent);
  onClearSelection?.();
}

export function alignImageInEditor(
  img: HTMLImageElement,
  alignment: "left" | "center" | "right",
  setIframeContent: (value: string) => void,
  onClearSelection?: () => void
): void {
  if (!img) return;
  img.style.display = "";
  img.style.margin = "";
  if (alignment === "left") {
    img.style.display = "block";
    img.style.margin = "0 auto 0 0";
  } else if (alignment === "center") {
    img.style.display = "block";
    img.style.margin = "0 auto";
  } else if (alignment === "right") {
    img.style.display = "block";
    img.style.margin = "0 0 0 auto";
  }
  img.style.outline = "";
  syncEditorContentToState(setIframeContent);
  onClearSelection?.();
}

export const changeHighlightColor = (
  color: string,
  handleEditorChange: (value: string) => void,
  setIframeContent: (value: string) => void,
  setHasChanges: (value: boolean) => void,
  savedRange?: Range | null
) => {
  if (typeof document !== "undefined") {
    const editor = getEditorElement();
    if (editor) {
      if (savedRange) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(savedRange);
      }
      document.execCommand("foreColor", false, color);
      const updatedHtml = editor.innerHTML;
      handleEditorChange(updatedHtml);
      setIframeContent(updatedHtml);
      setHasChanges(true);
    }
  }
};

export const normalizeColor = (color: string): string => {
  if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return "#000000";
  if (color.startsWith("rgb")) {
    const rgb = color.match(/\d+/g);
    if (rgb && (rgb.length === 3 || rgb.length === 4)) {
      return (
        "#" +
        rgb
          .slice(0, 3)
          .map((x) => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("")
      );
    }
  }
  return color;
};

export const changeFontFamily = (
  fontName: string,
  handleEditorChange: (value: string) => void,
  setIframeContent: (value: string) => void,
  setHasChanges: (value: boolean) => void,
  savedRange?: Range | null
) => {
  const editor = getEditorElement();
  if (!editor) return;
  if (savedRange) {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(savedRange);
  }
  document.execCommand("fontName", false, fontName);
  const updatedHtml = editor.innerHTML;
  handleEditorChange(updatedHtml);
  setIframeContent(updatedHtml);
  setHasChanges(true);
};

function afterButtonChange(
  button: HTMLAnchorElement,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  button.style.outline = "";
  syncEditorContentToState(setIframeContent);
  onClearSelection?.();
}

export function updateButtonStyleInEditor(
  button: HTMLAnchorElement,
  bgColor: string,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.backgroundColor = bgColor;
  button.style.border = "none";
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function updateButtonTextColorInEditor(
  button: HTMLAnchorElement,
  textColor: string,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.color = textColor;
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function updateButtonBorderRadiusInEditor(
  button: HTMLAnchorElement,
  radius: string,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.borderRadius = radius;
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function alignButtonInEditor(
  button: HTMLAnchorElement,
  alignment: "left" | "center" | "right",
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  const wrapper = button.closest("div");
  if (!wrapper) return;
  wrapper.style.textAlign = alignment;
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function updateButtonPaddingInEditor(
  button: HTMLAnchorElement,
  padding: string,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.padding = padding;
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function deleteButtonFromEditor(
  button: HTMLAnchorElement,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  const editor = getEditorElement();
  if (!editor) return;
  button.style.outline = "";
  const targetElement = button.closest<HTMLElement>("[data-editor-button-wrapper='true']");

  if (targetElement && editor.contains(targetElement)) {
    targetElement.remove();
  } else {
    // Fallback to just removing the button if the wrapper is not found or not within the editor
    button.remove();
  }
  syncEditorContentToState(setIframeContent);
  onClearSelection?.();
}

export function removeButtonBackgroundInEditor(
  button: HTMLAnchorElement,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.color = "#000000";
  button.style.backgroundColor = "transparent";
  button.style.border = "2px solid #000000";
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function removeButtonBorderInEditor(
  button: HTMLAnchorElement,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.border = "none";
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function removeButtonPaddingInEditor(
  button: HTMLAnchorElement,
  setIframeContent: (v: string) => void,
  onClearSelection?: () => void
): void {
  if (!button) return;
  button.style.padding = "0";
  afterButtonChange(button, setIframeContent, onClearSelection);
}

export function replaceImageInEditor(
  imageToReplace: HTMLImageElement,
  imageUrl: string,
  setIframeContent: (v: string) => void,
  onClearImageToReplace?: () => void
): void {
  imageToReplace.src = imageUrl;
  imageToReplace.style.outline = "";
  syncEditorContentToState(setIframeContent);
  onClearImageToReplace?.();
}

export function insertImageAtCursorInEditor(
  imageUrl: string,
  setIframeContent: (v: string) => void,
  lastSelectionRef: { current: Range | null },
  handleEditorChange?: (html: string) => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  editor.focus();
  const selection = window.getSelection();
  if (lastSelectionRef.current) {
    selection?.removeAllRanges();
    selection?.addRange(lastSelectionRef.current);
    lastSelectionRef.current = null;
  }
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  range.deleteContents();

  const wrapper = document.createElement("div");
  wrapper.style.textAlign = "center";
  wrapper.style.margin = "1rem 0";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Inserted image";
  img.style.display = "block";
  img.style.margin = "1rem auto";
  img.style.width = "100%";
  img.style.height = "auto";
  img.style.objectFit = "contain";
  img.style.borderRadius = "2px";

  wrapper.appendChild(img);

  const emptyBlock = document.createElement("p");
  const textNode = document.createTextNode(" ");
  emptyBlock.appendChild(textNode);

  range.insertNode(wrapper);
  range.insertNode(emptyBlock);
  range.collapse();

  const newRange = document.createRange();
  newRange.setStart(textNode, 0);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  emptyBlock.scrollIntoView({ behavior: "smooth", block: "center" });

  const updatedContent = editor.innerHTML;
  setIframeContent(updatedContent);
  handleEditorChange?.(updatedContent);
}

const DEFAULT_BUTTON_STYLES = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;

export function insertButtonAtCursorInEditor(
  buttonText: string,
  buttonUrl: string,
  setIframeContent: (v: string) => void,
  lastSelectionRef: { current: Range | null },
  handleEditorChange?: (html: string) => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  editor.focus();
  const selection = window.getSelection();
  if (lastSelectionRef.current) {
    selection?.removeAllRanges();
    selection?.addRange(lastSelectionRef.current);
    lastSelectionRef.current = null;
  }
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  range.deleteContents();

  const wrapper = document.createElement("div");
  wrapper.contentEditable = "false"; // Prevent editing the wrapper itself
  wrapper.style.textAlign = "center";
  wrapper.style.margin = "20px 0";
  wrapper.style.userSelect = "none"; // Prevent selecting content inside the wrapper easily
  wrapper.setAttribute("data-editor-button-wrapper", "true"); // Add unique data attribute

  const button = document.createElement("a");
  button.href = buttonUrl;
  button.textContent = buttonText;
  button.style.cssText = DEFAULT_BUTTON_STYLES;
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");

  wrapper.appendChild(button);

  const emptyBlock = document.createElement("p");
  emptyBlock.innerHTML = "<br>";

  range.insertNode(wrapper);
  range.insertNode(emptyBlock);
  range.setStartAfter(emptyBlock);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);

  const updatedContent = editor.innerHTML;
  setIframeContent(updatedContent);
  handleEditorChange?.(updatedContent);
}

export function insertTextIntoEditorAtSelection(
  formattedText: string,
  setIframeContent: (v: string) => void,
  onAttributeAdded?: () => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  range.deleteContents();
  const textNode = document.createTextNode(formattedText);
  range.insertNode(textNode);

  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);

  setIframeContent(editor.innerHTML);
  onAttributeAdded?.();
}
