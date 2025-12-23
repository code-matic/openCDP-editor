import { useRef, useState, useCallback } from "react";

export const useTextEditorFunctions = () => {
  const [align, setAlign] = useState("");
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [formatBlock, setFormatBlock] = useState("");
  const [orderedListActive, setOrderedListActive] = useState(false);
  const [unorderedListActive, setUnorderedListActive] = useState(false);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedSelection = useRef<Range | null>(null);

  const handleSelectionChange = useCallback(() => {
    requestAnimationFrame(() => {
      const newBold = document.queryCommandState("bold");
      const newItalic = document.queryCommandState("italic");
      const newUnderline = document.queryCommandState("underline");
      const newOrderedList = document.queryCommandState("insertOrderedList");
      const newUnorderedList = document.queryCommandState("insertUnorderedList");
      const newFormatBlock = document
        .queryCommandValue("formatBlock")
        ?.toLowerCase();

      if (newBold !== boldActive) setBoldActive(newBold);
      if (newItalic !== italicActive) setItalicActive(newItalic);
      if (newUnderline !== underlineActive) setUnderlineActive(newUnderline);
      if (newOrderedList !== orderedListActive)
        setOrderedListActive(newOrderedList);
      if (newUnorderedList !== unorderedListActive)
        setUnorderedListActive(newUnorderedList);
      if (newFormatBlock !== formatBlock) setFormatBlock(newFormatBlock);

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      let node = selection.anchorNode as HTMLElement | null;

      while (node) {
        if (node.nodeType === 1) {
          const display = window.getComputedStyle(node).display;
          if (display === "block" || display === "flex") break;
        }
        node = node.parentElement;
      }

      let newAlign = "";
      if (node) {
        const align = window.getComputedStyle(node).textAlign;
        if (align === "center") newAlign = "center";
        else if (align === "right") newAlign = "right";
        else newAlign = "left";
      }

      if (newAlign !== align) setAlign(newAlign);
    });
  }, [boldActive, italicActive, underlineActive, orderedListActive, unorderedListActive, formatBlock, align]);

  return {
    align,
    boldActive,
    italicActive,
    underlineActive,
    formatBlock,
    orderedListActive,
    unorderedListActive,
    linkDropdownOpen,
    linkUrl,
    savedSelection,
    handleSelectionChange,
    setLinkDropdownOpen,
    setLinkUrl,
  };
};

// Export the functions individually
export const handleBackgroundColorChange = (btn: HTMLElement, color: string) => {
  btn.style.backgroundColor = color;
};

export const handleTextColorChange = (btn: HTMLElement, color: string) => {
  btn.style.color = color;
};

export const handlePaddingChange = (btn: HTMLElement, padding: string) => {
  btn.style.padding = padding;
};

export const handleBorderRadiusChange = (btn: HTMLElement, radius: string) => {
  btn.style.borderRadius = radius;
};

export const removeBackground = (btn: HTMLElement) => {
  btn.style.backgroundColor = "";
};

export const removeBorder = (btn: HTMLElement) => {
  btn.style.border = "";
};

export const removePadding = (btn: HTMLElement) => {
  btn.style.padding = "";
};