import React, { useRef, useState, useEffect, useCallback } from "react";
import InsertButtonModal from "./InsertButtonModal";
import AlignLeftIcons from "../components/icons/AlignLeft.icon";
import AlignCenterIcons from "../components/icons/AlignCenter.icon";
import AlignRightIcons from "../components/icons/AlignRight.icon";
import Underline from "../components/icons/Underline.icon";
import ItalicIcon from "../components/icons/Italics.icon";
import BoldIcon from "../components/icons/Bold.icon";
import UnorderedListIcon from "../components/icons/UnorderedList.icon";
import OrderedListIcon from "../components/icons/OrderedList.icon";
import ButtonIcon from "../components/icons/Button.icon";
import ToolbarButton from "../components/ToolbarButton";
import LinkDropdown from "../components/LinkDropdown";
import Editor from "../components/Editor";
import ImageUpload from "./imageUpload";
import { Dropdown } from "antd";

interface TextEditorProps {
  onChange?: (html: string) => void;
  className?: string;
  bodyContent?: string;
  documentHtml?: string;
  imageChildren?: React.ReactNode;
}

function TextEditor({ onChange, bodyContent, documentHtml, className, imageChildren }: TextEditorProps) {
  const [align, setAlign] = useState("");
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [selectedButton, setSelectedButton] = useState<{
    element: HTMLAnchorElement;
    x: number;
    y: number;
  } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Set initial HTML content on mount or when bodyContent/documentHtml changes
  useEffect(() => {
    if (editorRef.current) {
      if (documentHtml) {
        // Extract <body> content from documentHtml
        const match = documentHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        editorRef.current.innerHTML = match ? match[1] : "";
      } else if (bodyContent) {
        editorRef.current.innerHTML = bodyContent;
      }
    }
  }, [bodyContent, documentHtml]);

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
        if (onChange) {
          if (documentHtml) {
            // Replace <body> content in the full document
            try {
              const parser = new window.DOMParser();
              const doc = parser.parseFromString(documentHtml, "text/html");
              doc.body.innerHTML = dirtyHTML;
              const updatedHTML = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
              onChange(updatedHTML);
            } catch (e) {
              // fallback to just body content
              onChange(dirtyHTML);
            }
          } else {
            onChange(dirtyHTML);
          }
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    boldActive,
    italicActive,
    underlineActive,
    orderedListActive,
    unorderedListActive,
    formatBlock,
    align,
    onChange
  ]);

  const handleOpenLinkDropdown = (open: boolean) => {
    setLinkDropdownOpen(open);
    if (open) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        savedSelection.current = selection.getRangeAt(0).cloneRange();
      }
    }
  };

  const insertLink = () => {
    const url = linkUrl.trim();
    if (!url) return;

    // Restore the saved selection before inserting the link
    if (savedSelection.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedSelection.current);
    }

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
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        }
      }
    }

    setLinkUrl("");
    setLinkDropdownOpen(false);
    savedSelection.current = null;
  };

  // State for modal and input fields
  const [buttonModalOpen, setButtonModalOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [buttonLabelError, setButtonLabelError] = useState("");
  const [buttonUrlError, setButtonUrlError] = useState("");

  // Show modal and save selection
  const insertButton = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0).cloneRange();
    }
    setButtonModalOpen(true);
    setButtonLabel("");
    setButtonUrl("");
    setButtonLabelError("");
    setButtonUrlError("");
  };

  // Insert button with anchor, restoring selection
  const handleInsertButton = () => {
    let hasError = false;
    if (!buttonLabel.trim()) {
      setButtonLabelError("Button label is required");
      hasError = true;
    } else {
      setButtonLabelError("");
    }
    if (!buttonUrl.trim()) {
      setButtonUrlError("URL is required");
      hasError = true;
    } else {
      setButtonUrlError("");
    }
    if (hasError) return;
    if (editorRef.current) {
      // Restore selection before inserting
      const selection = window.getSelection();
      selection?.removeAllRanges();
      if (savedSelection.current) {
        selection?.addRange(savedSelection.current);
      }
      const html = `<a href="${buttonUrl}" target="_blank" rel="noopener noreferrer">${buttonLabel}</a>`;
      document.execCommand("insertHTML", false, html);
      editorRef.current.focus();
      handleSelectionChange();
    }
    setButtonModalOpen(false);
    savedSelection.current = null;
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

  useEffect(() => {
    let selectedBtn: HTMLAnchorElement | null = null;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Use the ref directly to check if the clicked element is inside the editor
      const btn = target.closest("a") as HTMLAnchorElement | null;
      const editor = editorRef.current;

      if (btn && editor && editor.contains(btn)) {
        e.preventDefault(); // Prevent navigation to the link
        if (selectedBtn && selectedBtn !== btn) {
          selectedBtn.style.outline = "none";
        }
        btn.style.outline = "2px solid #3b82f6";
        selectedBtn = btn;
        setSelectedButton({ element: btn, x: e.clientX, y: e.clientY });
      } else {
        if (selectedBtn) {
          selectedBtn.style.outline = "none";
          selectedBtn = null;
        }
        setSelectedButton(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const [buttonMenuPos, setButtonMenuPos] = useState({ top: 0, left: 0 });

  const buttonMenuConfig = {
    onClick: (info: any) => {
      if (!selectedButton?.element) return;

      const btn = selectedButton.element;

      if (info.key === "edit") {
        // Logic to edit the button
        alert(`Edit button: ${btn.textContent}`);
      } else if (info.key === "delete") {
        // Logic to delete the button
        btn.remove();
        setSelectedButton(null);
      } else if (info.key.startsWith("align-")) {
        const alignment = info.key.replace("align-", "") as "left" | "center" | "right";
        btn.style.textAlign = alignment;
      }
    },
    items: [
      { key: "edit", label: "Edit Button" },
      { key: "delete", label: "Delete Button", danger: true },
      { type: "divider" as const },
      {
        key: "align",
        label: "Align Button",
        children: [
          { key: "align-left", label: "Left" },
          { key: "align-center", label: "Center" },
          { key: "align-right", label: "Right" },
        ],
      },
    ],
  };

  useEffect(() => {
    if (selectedButton) {
      setButtonMenuPos({
        top: selectedButton.y + 10, // Adjust dropdown position
        left: selectedButton.x + 10,
      });
    }
  }, [selectedButton]);

  return (
    <div className="w-fit border-2 border-blue-500 p-3 rounded-lg shadow-lg mx-auto mt-10">
      <div className="flex flex-wrap mb-2 gap-1">
        <ToolbarButton
          active={boldActive}
          onClick={() => exec("bold")}
          tooltip="Bold"
          icon={<BoldIcon />}
        />
        <ToolbarButton
          active={italicActive}
          onClick={() => exec("italic")}
          tooltip="Italic"
          icon={<ItalicIcon />}
        />
        <ToolbarButton
          active={underlineActive}
          onClick={() => exec("underline")}
          tooltip="Underline"
          icon={<Underline />}
        />
        <ToolbarButton
          active={formatBlock === "h1"}
          onClick={() => exec("formatBlock", "H1")}
          tooltip="Heading 1"
          label="H1"
        />
        <ToolbarButton
          active={formatBlock === "h2"}
          onClick={() => exec("formatBlock", "H2")}
          tooltip="Heading 2"
          label="H2"
        />
        <ToolbarButton
          active={formatBlock === "h3"}
          onClick={() => exec("formatBlock", "H3")}
          tooltip="Heading 3"
          label="H3"
        />
        <ToolbarButton
          active={unorderedListActive}
          onClick={() => exec("insertUnorderedList")}
          tooltip="Unordered List"
          icon={<UnorderedListIcon />}
        />
        <ToolbarButton
          active={orderedListActive}
          onClick={() => exec("insertOrderedList")}
          tooltip="Ordered List"
          icon={<OrderedListIcon />}
        />
        <ToolbarButton
          active={align === "left"}
          onClick={() => exec("justifyLeft")}
          tooltip="Align Left"
          icon={<AlignLeftIcons />}
        />
        <ToolbarButton
          active={align === "center"}
          onClick={() => exec("justifyCenter")}
          tooltip="Align Center"
          icon={<AlignCenterIcons />}
        />
        <ToolbarButton
          active={align === "right"}
          onClick={() => exec("justifyRight")}
          tooltip="Align Right"
          icon={<AlignRightIcons />}
        />
        <LinkDropdown
          open={linkDropdownOpen}
          setOpen={handleOpenLinkDropdown}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          insertLink={insertLink}
        />
        <ImageUpload
          children={imageChildren}
        />
        <ToolbarButton
          onClick={insertButton}
          icon={<ButtonIcon />}
          tooltip="Insert Button"
          label="Button"
        />
        <InsertButtonModal
          open={buttonModalOpen}
          buttonLabel={buttonLabel}
          buttonUrl={buttonUrl}
          buttonLabelError={buttonLabelError}
          buttonUrlError={buttonUrlError}
          onLabelChange={setButtonLabel}
          onUrlChange={setButtonUrl}
          onOk={handleInsertButton}
          onCancel={() => setButtonModalOpen(false)}
        />
      </div>
      <Editor ref={editorRef} className={className} />
      {selectedButton && (
        <div
          style={{
            position: "absolute",
            top: buttonMenuPos.top,
            left: buttonMenuPos.left,
            zIndex: 1000,
            width: "200px",
          }}
        >
          <Dropdown
            menu={buttonMenuConfig}
            trigger={["click"]}
            open={true}
            onOpenChange={(visible) => {
              if (!visible) setSelectedButton(null);
            }}
          >
            <span />
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default TextEditor;