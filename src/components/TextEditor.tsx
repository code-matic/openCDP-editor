import React, { useRef, useState, useEffect, useCallback } from "react";
import AlignLeftIcons from "./icons/AlignLeft.icon";
import AlignCenterIcons from "./icons/AlignCenter.icon";
import AlignRightIcons from "./icons/AlignRight.icon";
import Underline from "./icons/Underline.icon";
import ItalicIcon from "./icons/Italics.icon";
import BoldIcon from "./icons/Bold.icon";
import { sanitizeHTML } from "../lib/SantizeHtml";
import UnorderedListIcon from "./icons/UnorderedList.icon";
import OrderedListIcon from "./icons/OrderedList.icon";
import ToolbarButton from "./ToolbarButton";
import LinkDropdown from "./LinkDropdown";
import Editor from "./Editor";


const TextEditor = () => {
  const [align, setAlign] = useState("");
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [formatBlock, setFormatBlock] = useState("");
  const [orderedListActive, setOrderedListActive] = useState(false);
  const [unorderedListActive, setUnorderedListActive] = useState(false);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleSelectionChange = useCallback(() => {
    requestAnimationFrame(() => {
      const newBold = document.queryCommandState("bold");
      const newItalic = document.queryCommandState("italic");
      const newUnderline = document.queryCommandState("underline");
      const newOrderedList = document.queryCommandState("insertOrderedList");
      const newUnorderedList = document.queryCommandState(
        "insertUnorderedList"
      );
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

      while (node && node !== editorRef.current) {
        if (node.nodeType === 1) {
          const display = window.getComputedStyle(node).display;
          if (display === "block" || display === "flex") break;
        }
        node = node.parentElement;
      }

      let newAlign = "";
      if (node && editorRef.current?.contains(node)) {
        const align = window.getComputedStyle(node).textAlign;
        if (align === "center") newAlign = "center";
        else if (align === "right") newAlign = "right";
        else newAlign = "left";
      }

      if (newAlign !== align) setAlign(newAlign);

      if (editorRef.current) {
        const dirtyHTML = editorRef.current.innerHTML;
        // console.log("dirty", dirtyHTML);
        const cleanHTML = sanitizeHTML(dirtyHTML);
        console.log(cleanHTML);
      }
    });
  }, [
    boldActive,
    italicActive,
    underlineActive,
    orderedListActive,
    unorderedListActive,
    formatBlock,
    align,
  ]);

  const insertLink = () => {
    const url = linkUrl.trim();
    if (!url) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      alert("Please select text to turn into a link.");
      return;
    }

    // Insert the link
    document.execCommand("createLink", false, url);

    // Post-process: add inline style to the newly created <a>
    const editor = editorRef.current;
    if (editor) {
      const anchors = editor.getElementsByTagName("a");
      for (let i = 0; i < anchors.length; i++) {
        const a = anchors[i];
        if (a.getAttribute("href") === url) {
          a.setAttribute("style", "text-decoration: none;");
        }
      }
    }

    setLinkUrl("");
    setLinkDropdownOpen(false);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    document.addEventListener("selectionchange", handleSelectionChange);
    editor.addEventListener("input", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      editor.removeEventListener("input", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  const exec = (command: string, value?: string) => {
    const selection = window.getSelection();
    const isCollapsed = selection && selection.isCollapsed;
    const isFormatCmd =
      command === "bold" || command === "italic" || command === "underline";

    if (
      isFormatCmd &&
      isCollapsed &&
      editorRef.current &&
      document.activeElement === editorRef.current
    ) {
      document.execCommand(command, false, value);
      document.execCommand("insertHTML", false, "<span>\u200B</span>");
      const range = document.createRange();
      const editor = editorRef.current;
      if (editor.lastChild) {
        range.setStartAfter(editor.lastChild);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      // Update the bold state after executing the command
      handleSelectionChange();
    } else {
      document.execCommand(command, false, value);
      // Update the bold state after executing the command
      handleSelectionChange();
    }
    editorRef.current?.focus();
  };

  return (
    <div className="w-[500px] h-auto border-2 border-blue-500 p-3 rounded-lg shadow-lg mx-auto mt-10">
      <div className="flex flex-wrap mb-2 gap-1">
        <ToolbarButton
          active={boldActive}
          onClick={() => exec("bold")}
          icon={<BoldIcon />}
        />
        <ToolbarButton
          active={italicActive}
          onClick={() => exec("italic")}
          icon={<ItalicIcon />}
        />
        <ToolbarButton
          active={underlineActive}
          onClick={() => exec("underline")}
          icon={<Underline />}
        />
        <ToolbarButton
          active={formatBlock === "h1"}
          onClick={() => exec("formatBlock", "H1")}
          label="H1"
        />
        <ToolbarButton
          active={formatBlock === "h2"}
          onClick={() => exec("formatBlock", "H2")}
          label="H2"
        />
        <ToolbarButton
          active={formatBlock === "h3"}
          onClick={() => exec("formatBlock", "H3")}
          label="H3"
        />
        <ToolbarButton
          active={unorderedListActive}
          onClick={() => exec("insertUnorderedList")}
          icon={<UnorderedListIcon />}
        />
        <ToolbarButton
          active={orderedListActive}
          onClick={() => exec("insertOrderedList")}
          icon={<OrderedListIcon />}
        />
        <ToolbarButton
          active={align === "left"}
          onClick={() => exec("justifyLeft")}
          icon={<AlignLeftIcons />}
        />
        <ToolbarButton
          active={align === "center"}
          onClick={() => exec("justifyCenter")}
          icon={<AlignCenterIcons />}
        />
        <ToolbarButton
          active={align === "right"}
          onClick={() => exec("justifyRight")}
          icon={<AlignRightIcons />}
        />
        <ToolbarButton onClick={() => exec("undo")} label="Undo" />
        <ToolbarButton onClick={() => exec("redo")} label="Redo" />
        <LinkDropdown
          open={linkDropdownOpen}
          setOpen={setLinkDropdownOpen}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          insertLink={insertLink}
        />
      </div>
      <Editor ref={editorRef} />
    </div>
  );
};

export default TextEditor;