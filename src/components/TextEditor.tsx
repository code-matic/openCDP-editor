import React, { useRef, useState, useEffect } from "react";
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
import Editor from "../components/Editor";
import ImageUpload from "./imageUpload";
import { Dropdown, message } from "antd";
import { useTextEditorFunctions } from "./TextEditorFunctions";
import { createButtonMenuConfig } from "./menus/buttonMenuConfig";
import { createImageMenuConfig } from "./menus/imageMenuConfig";
import { createContainerMenuConfig } from "./menus/containerMenuConfig";

interface TextEditorProps {
  onChange?: (html: string) => void;
  className?: string;
  bodyContent?: string;
  documentHtml?: string;
  imageChildren?: React.ReactNode;
}

function TextEditor({ onChange, bodyContent, documentHtml, className, imageChildren }: TextEditorProps) {
  const {
    align,
    boldActive,
    italicActive,
    underlineActive,
    formatBlock,
    orderedListActive,
    unorderedListActive,
  } = useTextEditorFunctions();

  const [selectedButton, setSelectedButton] = useState<{
    element: HTMLAnchorElement;
    x: number;
    y: number;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    element: HTMLImageElement;
    x: number;
    y: number;
  } | null>(null);
  const [selectedContainer, setSelectedContainer] = useState<{
    element: HTMLElement;
    x: number;
    y: number;
  } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelection = useRef<Range | null>(null); 

  // Set initial HTML content on mount or when bodyContent/documentHtml changes
  useEffect(() => {
    if (editorRef.current) {
      if (documentHtml) {
        const match = documentHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        editorRef.current.innerHTML = match ? match[1] : "";
      } else if (bodyContent) {
        editorRef.current.innerHTML = bodyContent;
      }
    }
  }, [bodyContent, documentHtml]);

  // State for modal and input fields
  const [buttonModalOpen, setButtonModalOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [buttonLabelError, setButtonLabelError] = useState("");
  const [buttonUrlError, setButtonUrlError] = useState("");
  const [buttonMenuPos, setButtonMenuPos] = useState({ top: 0, left: 0 });
  const [containerMenuPos, setContainerMenuPos] = useState({ top: 0, left: 0 });

  // Add Ant Design modal for editing button title and URL
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editButtonTitle, setEditButtonTitle] = useState("");
  const [editButtonUrl, setEditButtonUrl] = useState("");
  const [editButtonElement, setEditButtonElement] = useState<HTMLAnchorElement | null>(null);

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
      const selection = window.getSelection();
      selection?.removeAllRanges();
      if (savedSelection.current) {
        selection?.addRange(savedSelection.current);
      }
      const html = `<a href="${buttonUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none !important;">${buttonLabel}</a>`;
      document.execCommand("insertHTML", false, html);
      editorRef.current.focus();
      // handleSelectionChange();
    }
    setButtonModalOpen(false);
    savedSelection.current = null;
  };

  // Handle editing of button title and URL
  const handleEditButton = () => {
    if (editButtonElement) {
      editButtonElement.textContent = editButtonTitle;
      editButtonElement.setAttribute("href", editButtonUrl);
      message.success("Button updated successfully.");
      setEditModalOpen(false);
      setEditButtonElement(null);
    }
  };

  const handleSelectionChange = () => {
    console.log("Selection changed");
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
  }, []); 

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
      // handleSelectionChange();
    } else {
      document.execCommand(command, false, value);
      // handleSelectionChange();
    }
    editorRef.current?.focus();
  };

  useEffect(() => {
    let selectedBtn: HTMLAnchorElement | null = null;
    let selectedImg: HTMLImageElement | null = null;
    let selectedCont: HTMLElement | null = null;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest("a") as HTMLAnchorElement | null;
      const img = target.closest("img") as HTMLImageElement | null;
      const editor = editorRef.current;

      if (btn && editor && editor.contains(btn)) {
        e.preventDefault();
        if (selectedBtn && selectedBtn !== btn) {
          selectedBtn.style.outline = "none";
        }
        btn.style.outline = "2px solid #3b82f6";
        selectedBtn = btn;
        setSelectedButton({ element: btn, x: e.clientX, y: e.clientY });
        console.log("Button selected:", btn);
      } else if (img && editor && editor.contains(img)) {
        e.preventDefault();
        if (selectedImg && selectedImg !== img) {
          selectedImg.style.outline = "none";
        }
        img.style.outline = "2px solid #3b82f6";
        selectedImg = img;
        setSelectedImage({ element: img, x: e.clientX, y: e.clientY });
      } else {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.startContainer.parentElement?.closest("p, div, span, section, article, main, header, footer, aside, nav") as HTMLElement | null;
          if (container && editor?.contains(container)) {
            if (selectedCont && selectedCont !== container) {
              selectedCont.style.outline = "none";
            }
            container.style.outline = "2px solid #3b82f6";
            selectedCont = container as HTMLElement;
            const rect = container.getBoundingClientRect();
            setSelectedContainer({
              element: container as HTMLElement,
              x: rect.left,
              y: rect.top,
            });
          }
        } else {
          const dropdown = document.querySelector(".ant-dropdown");
          const modal = document.querySelector(".ant-modal");
          if (
            (modal && modal.contains(target)) ||
            (dropdown && dropdown.contains(target))
          ) {
            return;
          }

          if (selectedBtn) {
            selectedBtn.style.outline = "none";
            selectedBtn = null;
          }
          if (selectedImg) {
            selectedImg.style.outline = "none";
            selectedImg = null;
          }
          if (selectedCont) {
            selectedCont.style.outline = "none";
            selectedCont = null;
          }
          setSelectedButton(null);
          setSelectedImage(null);
          setSelectedContainer(null);
          // console.log("No button selected.");
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const [customBgModalVisible, setCustomBgModalVisible] = useState(false);
  const [imageMenuPos, setImageMenuPos] = useState({ top: 0, left: 0 });

  const buttonMenuConfig = createButtonMenuConfig(
    selectedButton,
    setCustomBgModalVisible,
    setSelectedButton
  );
  const imageMenuConfig = createImageMenuConfig(selectedImage, setSelectedImage);
  const containerMenuConfig = createContainerMenuConfig(
    selectedContainer,
    setSelectedContainer
  );

  useEffect(() => {
    if (selectedButton) {
      setButtonMenuPos({
        top: selectedButton.y + 10, // Adjust dropdown position
        left: selectedButton.x + 10,
      });
    }
  }, [selectedButton]);

  useEffect(() => {
    if (selectedImage) {
      setImageMenuPos({
        top: selectedImage.y + 10,
        left: selectedImage.x + 10,
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedContainer) {
      setContainerMenuPos({
        top: selectedContainer.y + 30,
        left: selectedContainer.x + 10,
      });
    }
  }, [selectedContainer]);

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

        {/* <LinkDropdown
          open={linkDropdownOpen}
          setOpen={handleOpenLinkDropdown}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          insertLink={insertLink}
        /> */}
        
        <ImageUpload
          children={imageChildren}
        />
        <ToolbarButton
          onClick={insertButton}
          icon={<ButtonIcon />}
          tooltip="InsertButton"
          label="Button"
        />
        <InsertButtonModal
          mode="insertButton"
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
        
        <InsertButtonModal
          mode="insertButton"
          open={editModalOpen}
          buttonLabel={editButtonTitle}
          buttonUrl={editButtonUrl}
          buttonLabelError={buttonLabelError}
          buttonUrlError={buttonUrlError}
          onLabelChange={setEditButtonTitle}
          onUrlChange={setEditButtonUrl}
          onOk={handleEditButton}
          onCancel={() => setEditModalOpen(false)}
        />

        <InsertButtonModal
          mode="customBg"
          open={customBgModalVisible}
          onApply={(color) => {
            console.log("Custom background color applied:", color);
            if (selectedButton?.element) {
              console.log("Selected button element:", selectedButton.element);
              const updateButtonStyle = (button: HTMLAnchorElement, color: string) => {
                button.style.backgroundColor = color;
              };
              updateButtonStyle(selectedButton.element, color);
            } else {
              console.error("No button selected to apply background color.");
            }
          }}
          selectedButton={selectedButton} 
          onOk={() => setCustomBgModalVisible(false)}
          onCancel={() => setCustomBgModalVisible(false)}
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
            <div style={{ width: '1px', height: '1px' }} />
          </Dropdown>
        </div>
      )}

      {selectedImage && (
        <div
          style={{
            position: "absolute",
            top: imageMenuPos.top,
            left: imageMenuPos.left,
            zIndex: 1000,
            width: "200px",
          }}
        >
          <Dropdown
            menu={imageMenuConfig}
            trigger={["click"]}
            open={true}
            onOpenChange={(visible) => {
              if (!visible) setSelectedImage(null);
            }}
          >
            <div style={{ width: '1px', height: '1px' }} />
          </Dropdown>
        </div>
      )}

      {selectedContainer && (
        <div
          style={{
            position: "absolute",
            top: containerMenuPos.top,
            left: containerMenuPos.left,
            zIndex: 1000,
            width: "200px",
          }}
        >
          <Dropdown
            menu={containerMenuConfig}
            trigger={["click"]}
            open={true}
            onOpenChange={(visible) => {
              if (!visible) setSelectedContainer(null);
            }}
          >
            <div style={{ width: "1px", height: "1px" }} />
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default TextEditor;