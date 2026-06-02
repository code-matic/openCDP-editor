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

const BLOCK_TAGS = new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]);

function getBlockElement(editor: HTMLElement, node: Node | null): HTMLElement | null {
  while (node && node !== editor) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName.toLowerCase();
      const display = window.getComputedStyle(node).display;
      if (BLOCK_TAGS.has(tag) || display === "block" || display === "list-item" || display === "table") {
        return node;
      }
    }
    node = node.parentNode;
  }
  return null;
}

function collectAffectedBlocks(editor: HTMLElement, range: Range): Set<HTMLElement> {
  const affectedBlocks = new Set<HTMLElement>();

  const startBlock = getBlockElement(editor, range.startContainer);
  if (startBlock) affectedBlocks.add(startBlock);

  const endBlock = getBlockElement(editor, range.endContainer);
  if (endBlock) affectedBlocks.add(endBlock);

  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    }
  );

  let node: Node | null = walker.nextNode();
  while (node) {
    const block = getBlockElement(editor, node);
    if (block) affectedBlocks.add(block);
    node = walker.nextNode();
  }

  return affectedBlocks;
}

function collapseSelectionToLastBlock(
  editor: HTMLElement,
  selection: Selection,
  lastBlock: HTMLElement | null
): void {
  if (!lastBlock) return;
  const collapsed = document.createRange();
  collapsed.selectNodeContents(lastBlock);
  collapsed.collapse(false);
  selection.removeAllRanges();
  selection.addRange(collapsed);
  lastBlock.focus?.();
  editor.focus();
}

export function applyAlignmentToSelection(
  alignment: "left" | "right" | "center" | "justify",
  handleEditorChange: (html: string) => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  const affectedBlocks = collectAffectedBlocks(editor, range);

  let lastBlock: HTMLElement | null = null;
  affectedBlocks.forEach((block) => {
    block.style.textAlign = alignment;
    lastBlock = block;
  });

  collapseSelectionToLastBlock(editor, selection, lastBlock);
  handleEditorChange(editor.innerHTML);
}

export function applyLineHeightToSelection(
  lineHeight: string,
  handleEditorChange: (html: string) => void
): void {
  const editor = getEditorElement();
  if (!editor) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  const affectedBlocks = collectAffectedBlocks(editor, range);

  let lastBlock: HTMLElement | null = null;
  affectedBlocks.forEach((block) => {
    if (lineHeight) {
      block.style.lineHeight = lineHeight;
    } else {
      block.style.removeProperty("line-height");
    }
    lastBlock = block;
  });

  collapseSelectionToLastBlock(editor, selection, lastBlock);
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

const DEFAULT_FONT_SIZE_PX = 16;

export function parseFontSizePx(fontSize: string): number | null {
  if (!fontSize) return null;
  const pxMatch = fontSize.match(/^([\d.]+)px$/);
  if (pxMatch) return Math.round(parseFloat(pxMatch[1]));
  return null;
}

/** Resolve the effective font size (px) at the caret from inline styles or computed style. */
export function getActiveFontSizePx(startNode: Node | null, editor?: HTMLElement | null): number {
  let node: Node | null = startNode;
  if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;

  const editorEl = editor ?? getEditorElement();
  if (!node || !(node instanceof HTMLElement)) return DEFAULT_FONT_SIZE_PX;

  let el: HTMLElement | null = node;
  while (el && el !== editorEl) {
    if (el.style.fontSize) {
      const px = parseFontSizePx(el.style.fontSize);
      if (px) return px;
    }
    el = el.parentElement;
  }

  const computedPx = parseFontSizePx(window.getComputedStyle(node).fontSize);
  return computedPx ?? DEFAULT_FONT_SIZE_PX;
}

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

export const MAX_FONT_SIZE_PX = 32;

function removeFontSizeFromRange(range: Range): void {
  const root =
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentNode
      : range.commonAncestorContainer;
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const toProcess: HTMLElement[] = [];
  let node: Node | null = walker.nextNode();
  while (node) {
    if (node instanceof HTMLElement) toProcess.push(node);
    node = walker.nextNode();
  }

  toProcess.forEach((el) => {
    if (el.style.fontSize) {
      el.style.removeProperty("font-size");
      if (!el.getAttribute("style")?.trim()) el.removeAttribute("style");
    }
    if (el.tagName === "FONT" && el.hasAttribute("size")) {
      el.removeAttribute("size");
    }
    if (
      el.tagName === "SPAN" &&
      !el.getAttribute("style")?.trim() &&
      el.attributes.length === 0
    ) {
      const parent = el.parentNode;
      if (parent) {
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
      }
    }
  });
}

export const changeFontSize = (
  fontSize: string,
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

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return;

  if (!fontSize || fontSize === "default") {
    removeFontSizeFromRange(range);
  } else {
    const px = parseInt(fontSize, 10);
    if (Number.isNaN(px) || px < 1 || px > MAX_FONT_SIZE_PX) return;

    if (range.collapsed) {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("fontSize", false, `${px}px`);
    } else {
      const contents = range.extractContents();
      const span = document.createElement("span");
      span.style.fontSize = `${px}px`;
      span.appendChild(contents);
      range.insertNode(span);
      const next = document.createRange();
      next.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(next);
    }
  }

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

/** Replace an arbitrary range inside the rich-text editor and sync React state (body + full HTML). */
export function replaceEditorRangeWithText(
  range: Range,
  text: string,
  handleEditorChange: (bodyHtml: string) => void
): void {
  const editor = getEditorElement();
  if (!editor || !editor.contains(range.commonAncestorContainer)) return;

  range.deleteContents();
  const textNode = document.createTextNode(text);
  range.insertNode(textNode);

  const selection = window.getSelection();
  if (selection) {
    const nr = document.createRange();
    nr.setStartAfter(textNode);
    nr.collapse(true);
    selection.removeAllRanges();
    selection.addRange(nr);
  }

  handleEditorChange(editor.innerHTML);
}
