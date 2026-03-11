/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Dropdown, ColorPicker, Tooltip } from "antd";
import { toast } from "sonner";

import WysiwygEditor from "./WysiwygEditor";
import MonacoEditorWrapper from "./MonacoEditorWrapper";
import PhonePreview from "./PhonePreview";
import InputModal from "./InputModal";
import ImagePickerModal from "./ImagePickerModal";
import {
  createColorMenu,
  createFontMenu,
  createMenuConfig,
  createButtonMenuConfig,
  createLinkMenuConfig,
} from "../utils/editorMenuUtils";
import {
  changeHighlightColor,
  changeFontFamily,
  normalizeColor,
  replaceBodyContent,
  restoreSelectionFromMarker,
  applyAlignmentToSelection,
  deleteImageFromEditor,
  updateImageWidthInEditor,
  alignImageInEditor,
  replaceImageInEditor,
  insertImageAtCursorInEditor,
  insertButtonAtCursorInEditor,
  insertTextIntoEditorAtSelection,
  updateButtonStyleInEditor,
  updateButtonTextColorInEditor,
  updateButtonBorderRadiusInEditor,
  alignButtonInEditor,
  updateButtonPaddingInEditor,
  deleteButtonFromEditor,
  removeButtonBackgroundInEditor,
  removeButtonBorderInEditor,
  removeButtonPaddingInEditor,
  syncEditorContentToState,
} from "../utils/editor-utils";
import { handleInlineCSS, needsInliningDetailed } from "../utils/inliner";
import liquidEngine from "../utils/liquid-engine";
import type { CDPEditorProps, CDPEditorHandle } from "../types";

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const UndoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
  </svg>
);
const RedoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
  </svg>
);
const BoldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);
const ItalicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);
const UnderlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);
const StrikeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);
const OLIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
    <path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);
const ULIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const H1Icon = () => <span style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>H1</span>;
const H2Icon = () => <span style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>H2</span>;
const H3Icon = () => <span style={{ fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>H3</span>;

const AlignLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 6h8m-8 4h12M6 14h8m-8 4h12"
    />
  </svg>
);

const AlignCenterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21 7H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2m4 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2"
    />
  </svg>
);

const AlignRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18 6h-8m8 4H6m12 4h-8m8 4H6"
    />
  </svg>
);
const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5" />
      <path d="m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32" />
    </g>
  </svg>
);
const ButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      ry="2"
    ></rect>
    <line x1="9" y1="9" x2="15" y2="9"></line>
  </svg>
);
const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const InlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

const CDPEditorInner = (
  {
    value: externalValue = "",
    onChange,
    readOnly = false,
    placeholder,
    onFetchImages,
    onUploadImage,
    onDeleteImage,
    enablePreview = true,
    enableCodeEditor = true,
    height = 500,
    className = "",
    previewData,
    toolbarContent,
    showCodeEditor: controlledShowCodeEditor,
    onShowCodeEditorChange,
    showPreview: controlledShowPreview,
    onShowPreviewChange,
    hideViewToggles = false,
    onOpenImageModal,
  }: CDPEditorProps,
  ref: React.ForwardedRef<CDPEditorHandle>
) => {
  // The rich text WYSIWYG value (body only)
  const [value, setValue] = useState(externalValue);
  // The full HTML document (head + body), used for Monaco and preview
  const [saveHtmlContent, setSaveHtmlContent] = useState(externalValue);
  // Drives the iframe preview (synced via DOM mutations)
  const [iframeContent, setIframeContent] = useState(externalValue);
  // When previewData is provided, this is the Liquid-rendered HTML for the preview iframe
  const [previewRenderedContent, setPreviewRenderedContent] = useState(iframeContent);

  const [internalShowPreview, setInternalShowPreview] = useState(false);
  const [internalShowCodeEditor, setInternalShowCodeEditor] = useState(false);
  const isControlledCode = controlledShowCodeEditor !== undefined;
  const isControlledPreview = controlledShowPreview !== undefined;
  const showCodeEditor = isControlledCode ? controlledShowCodeEditor : internalShowCodeEditor;
  const showPreview = isControlledPreview ? controlledShowPreview : internalShowPreview;
  const setShowCodeEditor = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(showCodeEditor) : v;
    if (onShowCodeEditorChange) onShowCodeEditorChange(next);
    else setInternalShowCodeEditor(next);
  };
  const setShowPreview = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(showPreview) : v;
    if (onShowPreviewChange) onShowPreviewChange(next);
    else setInternalShowPreview(next);
  };

  const [showImageModal, setShowImageModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showLinkEditModal, setShowLinkEditModal] = useState(false);
  const [linkSelection, setLinkSelection] = useState<Range | null>(null);
  const [selectedLink, setSelectedLink] = useState<{ element: HTMLAnchorElement; x: number; y: number } | null>(null);
  const [linkMenuPos, setLinkMenuPos] = useState({ top: 0, left: 0 });
  const [editingLink, setEditingLink] = useState<HTMLAnchorElement | null>(null);
  const [editingButton, setEditingButton] = useState<HTMLAnchorElement | null>(null);
  const [imageToReplace, setImageToReplace] = useState<HTMLImageElement | null>(null);

  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [tempColor, setTempColor] = useState("#000000");
  const [rects, setRects] = useState<DOMRect[]>([]);
  const [activeHeading, setActiveHeading] = useState<"h1" | "h2" | "h3" | null>(null);

  const [imgSelection, setImgSelection] = useState<{ element: HTMLImageElement; x: number; y: number } | null>(null);
  const [imgMenuPos, setImgMenuPos] = useState({ top: 0, left: 0 });

  const [selectedButton, setSelectedButton] = useState<{ element: HTMLAnchorElement; x: number; y: number } | null>(null);
  const [btnMenuPos, setBtnMenuPos] = useState({ top: 0, left: 0 });

  const EditorRef = useRef<HTMLDivElement>(null);
  const lastSelectionRef = useRef<Range | null>(null);

  // ── Sync external value changes ──────────────────────────────────────────
  useEffect(() => {
    if (externalValue !== saveHtmlContent) {
      setValue(externalValue);
      setSaveHtmlContent(externalValue);
      setIframeContent(externalValue);
    }
    // Only run when external value changes from parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  // ── Restore selection marker after DOM sync ──────────────────────────────
  useEffect(() => {
    const editor = document.querySelector(".rsw-editor .rsw-ce") as HTMLElement | null;
    if (!editor) return;
    const marker = editor.querySelector("#selection-marker") as HTMLElement | null;
    if (marker) restoreSelectionFromMarker(marker);
  }, [saveHtmlContent]);

  // ── Image click handler ──────────────────────────────────────────────────
  useEffect(() => {
    let activeImg: HTMLImageElement | null = null;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const img = target.closest(".rsw-editor .rsw-ce img") as HTMLImageElement | null;
      const editorEl = document.querySelector(".rsw-editor .rsw-ce");
      if (img && editorEl?.contains(img)) {
        if (activeImg && activeImg !== img) activeImg.style.outline = "none";
        img.style.outline = "2px solid red";
        activeImg = img;
        setImgSelection({ element: img, x: e.clientX, y: e.clientY });
      } else {
        if (activeImg) { activeImg.style.outline = "none"; activeImg = null; }
        setImgSelection(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // ── Button / Link click handler ──────────────────────────────────────────
  useEffect(() => {
    let activeBtn: HTMLAnchorElement | null = null;
    let activeLink: HTMLAnchorElement | null = null;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest(".rsw-editor .rsw-ce a") as HTMLAnchorElement | null;
      const editorEl = document.querySelector(".rsw-editor .rsw-ce");
      if (anchor && editorEl?.contains(anchor)) {
        e.preventDefault();
        const isButton =
          !!anchor.closest("[data-editor-button-wrapper='true']") ||
          (!!anchor.style.backgroundColor && !!anchor.style.padding);
        if (isButton) {
          if (activeLink) { activeLink.style.outline = "none"; activeLink = null; }
          setSelectedLink(null);
          if (activeBtn && activeBtn !== anchor) activeBtn.style.outline = "none";
          anchor.style.outline = "2px solid #4f46e5";
          activeBtn = anchor;
          setSelectedButton({ element: anchor, x: e.clientX, y: e.clientY });
        } else {
          if (activeBtn) { activeBtn.style.outline = "none"; activeBtn = null; }
          setSelectedButton(null);
          if (activeLink && activeLink !== anchor) activeLink.style.outline = "none";
          anchor.style.outline = "2px solid #0ea5e9";
          activeLink = anchor;
          setSelectedLink({ element: anchor, x: e.clientX, y: e.clientY });
        }
      } else {
        if (activeBtn) { activeBtn.style.outline = "none"; activeBtn = null; }
        if (activeLink) { activeLink.style.outline = "none"; activeLink = null; }
        setSelectedButton(null);
        setSelectedLink(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // ── Selection / colour tracking ──────────────────────────────────────────
  useEffect(() => {
    const onSelChange = () => {
      const editor = EditorRef.current;
      const sel = window.getSelection();
      if (!sel || !editor || !editor.contains(sel.anchorNode)) { setRects([]); setActiveHeading(null); return; }
      const range = sel.getRangeAt(0);
      setRects(sel.isCollapsed ? [] : Array.from(range.getClientRects()));
      let node: Node | null = sel.anchorNode;
      if (node?.nodeType === Node.TEXT_NODE) node = (node as Text).parentElement;
      if (node instanceof HTMLElement) {
        setSelectedColor(normalizeColor(window.getComputedStyle(node).color));
        const block = node.closest("h1, h2, h3");
        setActiveHeading(block ? (block.tagName.toLowerCase() as "h1" | "h2" | "h3") : null);
      }
    };
    document.addEventListener("selectionchange", onSelChange);
    window.addEventListener("scroll", onSelChange, true);
    return () => {
      document.removeEventListener("selectionchange", onSelChange);
      window.removeEventListener("scroll", onSelChange, true);
    };
  }, []);

  // ── Image menu position ──────────────────────────────────────────────────
  useEffect(() => {
    if (!imgSelection?.element) return;
    const img = imgSelection.element;
    const editorEl = img.closest(".rsw-editor .rsw-ce") as HTMLElement;
    if (!editorEl) return;
    const imgRect = img.getBoundingClientRect();
    const editorRect = editorEl.getBoundingClientRect();
    const mW = 150, mH = 50;
    let top = imgRect.top - editorRect.top;
    let left = imgRect.right - editorRect.left + 8;
    if (left + mW > editorRect.width) left = imgRect.left - editorRect.left - mW - 8;
    if (top + mH > editorRect.height) top = editorRect.height - mH - 8;
    if (top < 0) top = 8;
    if (left < 0) left = 8;
    setImgMenuPos({ top, left });
  }, [imgSelection?.element]);

  // ── Button menu position ─────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedButton?.element) return;
    const btn = selectedButton.element;
    const editorEl = btn.closest(".rsw-editor .rsw-ce") as HTMLElement;
    if (!editorEl) return;
    const bRect = btn.getBoundingClientRect();
    const eRect = editorEl.getBoundingClientRect();
    const gap = 100, mW = 200;
    let top = bRect.top - eRect.top;
    let left = bRect.right - eRect.left + gap;
    if (left + mW > eRect.width) left = bRect.left - eRect.left - mW - gap;
    if (left < gap) left = gap;
    if (top < gap) top = gap;
    setBtnMenuPos({ top, left });
  }, [selectedButton]);

  // ── Link menu position ───────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedLink?.element) return;
    const link = selectedLink.element;
    const editorEl = link.closest(".rsw-editor .rsw-ce") as HTMLElement;
    if (!editorEl) return;
    const lRect = link.getBoundingClientRect();
    const eRect = editorEl.getBoundingClientRect();
    const gap = 8, mW = 200;
    let top = lRect.bottom - eRect.top + gap;
    let left = lRect.left - eRect.left;
    if (left + mW > eRect.width) left = eRect.width - mW - gap;
    if (left < gap) left = gap;
    if (top + 100 > eRect.height) top = lRect.top - eRect.top - 100;
    setLinkMenuPos({ top, left });
  }, [selectedLink]);

  // ── Preview: render Liquid when in preview mode with previewData ─────────
  const hasPreviewData = previewData != null && Object.keys(previewData).length > 0;
  useEffect(() => {
    if (!showPreview || !hasPreviewData) {
      setPreviewRenderedContent(iframeContent);
      return;
    }
    setPreviewRenderedContent(iframeContent);
    liquidEngine
      .parseAndRender(iframeContent, previewData as Record<string, unknown>)
      .then(setPreviewRenderedContent)
      .catch(() => setPreviewRenderedContent(iframeContent));
  }, [showPreview, hasPreviewData, iframeContent, previewData]);

  // ── Derived state ────────────────────────────────────────────────────────
  const requiresInlining = useMemo(() => needsInliningDetailed(value), [value]);

  // ── Editor change ────────────────────────────────────────────────────────
  const handleEditorChange = (newHtml: string) => {
    setValue(newHtml);
    const full = replaceBodyContent(saveHtmlContent, newHtml);
    setSaveHtmlContent(full);
    setIframeContent(full);
    onChange?.(full);
  };

  // ── Colour picker ────────────────────────────────────────────────────────
  const saveSelectionBeforeDropdown = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) setSavedSelection(sel.getRangeAt(0).cloneRange());
  };

  const applyHighlightColor = (color: string) => {
    changeHighlightColor(color, handleEditorChange, setIframeContent, () => { }, savedSelection);
    setSelectedColor(color);
    setPickerOpen(false);
  };

  const applyFontFamily = (font: string) => {
    changeFontFamily(font, handleEditorChange, setIframeContent, () => { }, savedSelection);
  };

  // ── CSS inlining ─────────────────────────────────────────────────────────
  const triggerInlining = () => {
    try {
      const inlined = handleInlineCSS(value);
      setValue(inlined);
      setSaveHtmlContent(inlined);
      setIframeContent(inlined);
      onChange?.(inlined);
      toast.success("CSS inlined successfully!");
    } catch {
      toast.error("Failed to inline CSS.");
    }
  };

  // ── Image actions ────────────────────────────────────────────────────────
  const handleOpenImageModal = () => {
    if (!imageToReplace) {
      const editorEl = document.querySelector(".rsw-editor .rsw-ce") as HTMLElement;
      if (editorEl) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          if (editorEl.contains(range.commonAncestorContainer)) lastSelectionRef.current = range.cloneRange();
        }
      }
    }
    if (onOpenImageModal) {
      onOpenImageModal();
    } else {
      setShowImageModal(true);
    }
  };

  const insertImageAtCursor = (imageUrl: string) => {
    if (imageToReplace) {
      replaceImageInEditor(imageToReplace, imageUrl, setIframeContent, () => setImageToReplace(null));
      return;
    }
    insertImageAtCursorInEditor(imageUrl, setIframeContent, lastSelectionRef);
  };

  // ── Button actions ────────────────────────────────────────────────────────
  const insertButtonAtCursor = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) lastSelectionRef.current = sel.getRangeAt(0).cloneRange();
    setShowButtonModal(true);
  };

  const handleButtonConfirm = (values: Record<string, string>) => {
    const { buttonText, buttonUrl } = values;
    if (!buttonText || !buttonUrl) return;
    if (editingButton) {
      editingButton.textContent = buttonText;
      editingButton.href = buttonUrl;
      editingButton.style.outline = "";
      syncEditorContentToState(setIframeContent);
      setEditingButton(null);
    } else {
      insertButtonAtCursorInEditor(buttonText, buttonUrl, setIframeContent, lastSelectionRef, handleEditorChange);
    }
    setShowButtonModal(false);
  };

  // ── Imperative handle: insert text at cursor, inline CSS, insert image ─────
  useImperativeHandle(ref, () => ({
    insert: (text: string) => {
      insertTextIntoEditorAtSelection(text, setIframeContent);
    },
    inlineCss: () => triggerInlining(),
    insertImage: (url: string) => insertImageAtCursor(url),
    clearImageToReplace: () => setImageToReplace(null),
  }));

  // ── Menu configs ─────────────────────────────────────────────────────────
  const imageMenuConfig = createMenuConfig(
    () => {
      if (imgSelection?.element) {
        setImageToReplace(imgSelection.element);
        handleOpenImageModal();
      }
    },
    () => imgSelection?.element && deleteImageFromEditor(imgSelection.element, setIframeContent, () => setImgSelection(null)),
    (alignment) => imgSelection?.element && alignImageInEditor(imgSelection.element, alignment, setIframeContent, () => setImgSelection(null)),
    (width) => imgSelection?.element && updateImageWidthInEditor(imgSelection.element, width, setIframeContent, () => setImgSelection(null)),
  );

  const handleEditButton = () => {
    if (selectedButton?.element) {
      setEditingButton(selectedButton.element);
      setSelectedButton(null);
      setShowButtonModal(true);
    }
  };

  const buttonMenuConfig = (() => {
    const base = createButtonMenuConfig(
      () => selectedButton?.element && deleteButtonFromEditor(selectedButton.element, setIframeContent, () => setSelectedButton(null)),
      () => selectedButton?.element && removeButtonBackgroundInEditor(selectedButton.element, setIframeContent, () => setSelectedButton(null)),
      () => selectedButton?.element && removeButtonBorderInEditor(selectedButton.element, setIframeContent, () => setSelectedButton(null)),
      () => selectedButton?.element && removeButtonPaddingInEditor(selectedButton.element, setIframeContent, () => setSelectedButton(null)),
      (color) => selectedButton?.element && updateButtonStyleInEditor(selectedButton.element, color, setIframeContent, () => setSelectedButton(null)),
      (color) => selectedButton?.element && updateButtonTextColorInEditor(selectedButton.element, color, setIframeContent, () => setSelectedButton(null)),
      (radius) => selectedButton?.element && updateButtonBorderRadiusInEditor(selectedButton.element, radius, setIframeContent, () => setSelectedButton(null)),
      (padding) => selectedButton?.element && updateButtonPaddingInEditor(selectedButton.element, padding, setIframeContent, () => setSelectedButton(null)),
      (align) => selectedButton?.element && alignButtonInEditor(selectedButton.element, align, setIframeContent, () => setSelectedButton(null)),
    );
    return {
      ...base,
      items: [
        { key: "edit-button", label: "✏️ Edit Button", onClick: handleEditButton },
        { type: "divider" as const },
        ...(base.items ?? []),
      ],
    };
  })();

  const handleEditLink = () => {
    if (selectedLink?.element) {
      setEditingLink(selectedLink.element);
      setSelectedLink(null);
      setShowLinkEditModal(true);
    }
  };

  const linkMenuConfig = createLinkMenuConfig(
    handleEditLink,
    () => {
      if (selectedLink?.element) {
        selectedLink.element.style.outline = "";
        selectedLink.element.replaceWith(...Array.from(selectedLink.element.childNodes));
        syncEditorContentToState(setIframeContent);
        setSelectedLink(null);
      }
    },
    (color) => selectedLink?.element && updateButtonTextColorInEditor(selectedLink.element, color, setIframeContent, () => setSelectedLink(null)),
  );

  const colorMenu = createColorMenu(applyHighlightColor);
  const fontMenu = createFontMenu(applyFontFamily);

  const editorHeight = typeof height === "number" ? `${height}px` : height;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={`bg-white border rounded-md overflow-hidden flex flex-col ${className}`} style={{ minWidth: 400 }}>

      {/* ── Single unified toolbar ───────────────────────────────────────── */}
      <div
        className={`flex items-center gap-0.5 px-2 py-1.5 border-b bg-gray-50 overflow-x-auto ${readOnly && !showCodeEditor && !showPreview ? "pointer-events-none opacity-50" : ""}`}
        style={{ scrollbarWidth: "none" }}
      >
        {/* Formatting buttons — hidden when Monaco/Preview is active */}
        {!showCodeEditor && !showPreview && (
          <>
            {/* Undo / Redo */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Undo"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("undo"); }} className="toolbar-btn"><UndoIcon /></button></Tooltip>
              <Tooltip title="Redo"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("redo"); }} className="toolbar-btn"><RedoIcon /></button></Tooltip>
            </div>


            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Headings */}
            <div className="flex items-center gap-1.5">
              {(["h1", "h2", "h3"] as const).map((tag, i) => {
                const Icon = [H1Icon, H2Icon, H3Icon][i];
                const isActive = activeHeading === tag;
                return (
                  <Tooltip key={tag} title={isActive ? "Remove heading" : `Heading ${i + 1}`}>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        document.execCommand("formatBlock", false, isActive ? "p" : tag);
                        setTimeout(() => syncEditorContentToState(setIframeContent), 0);
                      }}
                      className="toolbar-btn"
                      style={isActive ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : undefined}
                    >
                      <Icon />
                    </button>
                  </Tooltip>
                );
              })}
            </div>

            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Basic formatting */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Bold (Ctrl+B)"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("bold"); }} className="toolbar-btn"><BoldIcon /></button></Tooltip>
              <Tooltip title="Italic (Ctrl+I)"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("italic"); }} className="toolbar-btn"><ItalicIcon /></button></Tooltip>
              <Tooltip title="Underline (Ctrl+U)"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("underline"); }} className="toolbar-btn"><UnderlineIcon /></button></Tooltip>
              <Tooltip title="Strikethrough"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("strikeThrough"); }} className="toolbar-btn"><StrikeIcon /></button></Tooltip>
            </div>


            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Lists + Link */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Numbered List"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("insertOrderedList"); setTimeout(() => syncEditorContentToState(setIframeContent), 0); }} className="toolbar-btn"><OLIcon /></button></Tooltip>
              <Tooltip title="Bullet List"><button onMouseDown={(e) => { e.preventDefault(); document.execCommand("insertUnorderedList"); setTimeout(() => syncEditorContentToState(setIframeContent), 0); }} className="toolbar-btn"><ULIcon /></button></Tooltip>
              <Tooltip title="Insert Link">
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const sel = window.getSelection();
                    if (sel && sel.rangeCount > 0) setLinkSelection(sel.getRangeAt(0).cloneRange());
                    setShowLinkModal(true);
                  }}
                  className="toolbar-btn"
                >
                  <LinkIcon />
                </button>
              </Tooltip>
            </div>


            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Alignment */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Align Left"><button onClick={() => applyAlignmentToSelection("left", handleEditorChange)} className="toolbar-btn"><AlignLeftIcon /></button></Tooltip>
              <Tooltip title="Align Center"><button onClick={() => applyAlignmentToSelection("center", handleEditorChange)} className="toolbar-btn"><AlignCenterIcon /></button></Tooltip>
              <Tooltip title="Align Right"><button onClick={() => applyAlignmentToSelection("right", handleEditorChange)} className="toolbar-btn"><AlignRightIcon /></button></Tooltip>
            </div>

            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Insert Image */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Insert Image"><button onClick={handleOpenImageModal} className="toolbar-btn"><ImageIcon /></button></Tooltip>

              {/* Insert Button */}
              <Tooltip title="Insert Button"><button onClick={insertButtonAtCursor} className="toolbar-btn"><ButtonIcon /></button></Tooltip>
            </div>


            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />

            {/* Text colour */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Text Color">
                <ColorPicker
                  value={tempColor}
                  open={pickerOpen}
                  onOpenChange={(open) => {
                    setPickerOpen(open);
                    if (open) { saveSelectionBeforeDropdown(); setTempColor(selectedColor); }
                  }}
                  onChange={(c) => setTempColor(c.toHexString())}
                  panelRender={(panel) => (
                    <div>
                      {panel}
                      <button
                        className="border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50"
                        onClick={() => { applyHighlightColor(tempColor); setPickerOpen(false); }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                >
                  <button type="button" className="toolbar-btn">
                    <div style={{ width: 18, height: 18, backgroundColor: selectedColor, borderRadius: 2, border: "1px solid #ccc" }} />
                  </button>
                </ColorPicker>
              </Tooltip>
            </div>
            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />
            {/* Font family */}
            <div className="flex items-center gap-1.5">
              <Tooltip title="Font Family">
                <Dropdown menu={fontMenu} trigger={["click"]} onOpenChange={(open) => { if (open) saveSelectionBeforeDropdown(); }}>
                  <button className="toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5">
                    Aa <ChevronIcon />
                  </button>
                </Dropdown>
              </Tooltip>
            </div>
            <div className="w-px h-4 bg-gray-300 mx-1 flex-shrink-0" />
          </>
        )}

        {/* Inline CSS (only in code editor mode when needed); hidden when hideViewToggles */}
        {!hideViewToggles && showCodeEditor && requiresInlining && (
          <Tooltip title="Inline all <style> tags into element attributes for email clients">
            <button
              onClick={triggerInlining}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0"
            >
              <InlineIcon /> Inline CSS
            </button>
          </Tooltip>
        )}

        {/* View toggles — hidden when hideViewToggles so parent can use external buttons */}
        {!hideViewToggles && (
          <div className="ml-auto flex items-center gap-1 flex-shrink-0 pl-2">
            {enableCodeEditor && (
              <button
                onClick={() => { setShowCodeEditor((v) => !v); setShowPreview(false); }}
                className={`text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${showCodeEditor ? "bg-gray-800 text-white border-gray-800" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}
              >
                {showCodeEditor ? "View Editor" : "View HTML"}
              </button>
            )}
            {enablePreview && (
              <button
                onClick={() => { setShowPreview((v) => !v); setShowCodeEditor(false); }}
                className={`text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${showPreview ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Body: editor ────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0" style={{ height: editorHeight }}>

        {/* Editor pane — min-h-0 so flex child can shrink; minHeight when code/preview so Monaco gets space */}
        <div
          className="flex-1 relative overflow-hidden min-h-0"
          style={showCodeEditor || showPreview ? { minHeight: 300 } : undefined}
        >
          {showPreview ? (
            <div className="h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100">
              <PhonePreview srcDoc={hasPreviewData ? previewRenderedContent : iframeContent} />
            </div>
          ) : showCodeEditor ? (
            <MonacoEditorWrapper
              height={editorHeight}
              defaultLanguage="html"
              defaultValue={saveHtmlContent}
              onChange={(v) => handleEditorChange(v ?? "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: true },
                formatOnPaste: true,
                fontSize: 12,
                wordWrap: "on",
                readOnly,
                scrollBeyondLastLine: false,
                glyphMargin: false,
                renderValidationDecorations: "off",
              }}
            />
          ) : (
            <div className="relative h-full" ref={EditorRef}>
              <WysiwygEditor
                value={value}
                onChange={(e: any) => handleEditorChange(e.target.value)}
                disabled={readOnly}
                placeholder={placeholder}
                containerProps={{
                  className: "h-full",
                  style: {
                    opacity: readOnly ? 0.6 : 1,
                    pointerEvents: readOnly ? "none" : "auto",
                  },
                }}
              />

              {/* Image context menu */}
              {imgSelection && (
                <div style={{ position: "absolute", top: imgMenuPos.top - 100, left: imgMenuPos.left - 100, zIndex: 1000, width: 150 }}>
                  <Dropdown menu={imageMenuConfig} trigger={["click"]} open onOpenChange={(v) => { if (!v) setImgSelection(null); }}>
                    <span />
                  </Dropdown>
                </div>
              )}

              {/* Button context menu */}
              {selectedButton && (
                <div style={{ position: "absolute", top: btnMenuPos.top, left: btnMenuPos.left, zIndex: 1000, width: 200 }}>
                  <Dropdown menu={buttonMenuConfig} trigger={["click"]} open onOpenChange={(v) => { if (!v) setSelectedButton(null); }}>
                    <span />
                  </Dropdown>
                </div>
              )}

              {/* Link context menu */}
              {selectedLink && (
                <div style={{ position: "absolute", top: linkMenuPos.top, left: linkMenuPos.left, zIndex: 1000, width: 200 }}>
                  <Dropdown menu={linkMenuConfig} trigger={["click"]} open onOpenChange={(v) => { if (!v) { selectedLink.element.style.outline = "none"; setSelectedLink(null); } }}>
                    <span />
                  </Dropdown>
                </div>
              )}

              {/* Selection highlight overlays */}
              {rects.map((rect, i) => (
                <div
                  key={i}
                  style={{
                    position: "fixed",
                    top: rect.top, left: rect.left,
                    width: rect.width, height: rect.height,
                    border: "1px solid #4f46e5",
                    backgroundColor: "rgba(79,70,229,0.1)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals (only when not using custom image modal) ────────────────── */}
      {!onOpenImageModal && (
        <ImagePickerModal
          show={showImageModal}
          onClose={() => { setShowImageModal(false); setImageToReplace(null); }}
          onSelectImage={insertImageAtCursor}
          onFetchImages={onFetchImages}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
        />
      )}

      <InputModal
        show={showButtonModal}
        title={editingButton ? "Edit Button" : "Insert Button"}
        fields={[
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: editingButton?.textContent ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: editingButton?.getAttribute("href") ?? "" },
        ]}
        onConfirm={handleButtonConfirm}
        onClose={() => { setShowButtonModal(false); setEditingButton(null); }}
      />

      <InputModal
        show={showLinkEditModal}
        title="Edit Link"
        fields={[
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: editingLink?.textContent ?? "", required: true },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: editingLink?.getAttribute("href") ?? "", required: true },
        ]}
        onConfirm={({ linkText, url }) => {
          if (editingLink) {
            editingLink.textContent = linkText;
            editingLink.href = url;
            editingLink.style.outline = "";
            syncEditorContentToState(setIframeContent);
            setEditingLink(null);
          }
          setShowLinkEditModal(false);
        }}
        onClose={() => { setShowLinkEditModal(false); setEditingLink(null); }}
      />

      <InputModal
        show={showLinkModal}
        title="Insert Link"
        fields={[
          { name: "url", label: "URL", placeholder: "https://", required: true },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: false },
        ]}
        onConfirm={({ url, linkText }) => {
          setShowLinkModal(false);
          const editor = document.querySelector(".rsw-editor .rsw-ce") as HTMLElement | null;
          if (!editor || !url) return;
          editor.focus();
          const sel = window.getSelection();
          if (linkSelection) {
            sel?.removeAllRanges();
            sel?.addRange(linkSelection);
          }
          document.execCommand("createLink", false, url);
          const sel2 = window.getSelection();
          const anchor = sel2?.anchorNode?.parentElement?.closest("a") as HTMLAnchorElement | null;
          if (anchor) {
            anchor.style.color = "#0ea5e9";
            if (linkText) anchor.textContent = linkText;
          }
          setLinkSelection(null);
          setTimeout(() => syncEditorContentToState(setIframeContent), 0);
        }}
        onClose={() => { setShowLinkModal(false); setLinkSelection(null); }}
      />
    </div>
  );
};

export const CDPEditor = forwardRef<CDPEditorHandle, CDPEditorProps>(
  CDPEditorInner
);

export default CDPEditor;
