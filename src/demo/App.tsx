import React, { useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { CDPEditor } from "../lib/components/EmailEditor";
import type { CDPEditorHandle, ImageAsset } from "../lib/types";

// ── Sample initial HTML ───────────────────────────────────────────────────────

const INITIAL_HTML = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; color: #111827; }
    </style>
  </head>
  <body>
    <div style="max-width:600px; margin:0 auto; padding:24px;">
      <h3>Hi {{ customer.first_name | default: "there" }} 👋</h3>
      <p style="line-height:1.7; color:#374151;">
        Thanks for joining! Your account is ready.
        Here's a summary of your order — {{ event.order_id }}.
      </p>
      <div data-editor-button-wrapper="true" style="text-align:center; margin:32px 0;">
        <a href="https://example.com/dashboard" style="display:inline-block; padding:12px 28px; background:#000144; color:#fff; text-decoration:none; border-radius:4px; font-weight:600;" target="_blank" rel="noopener noreferrer">Go to Dashboard →</a>
      </div>
      <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />
      <p style="font-size:12px; color:#9ca3af; text-align:center;">
        © 2026 Acme Corp · Unsubscribe
      </p>
    </div>
  </body>
</html>`;

// ── Sample attributes ─────────────────────────────────────────────────────────

const DEMO_ATTRIBUTES = [
  { label: "First Name", value: "{{ customer.first_name }}" },
  { label: "Last Name", value: "{{ customer.last_name }}" },
  { label: "Email", value: "{{ customer.email }}" },
  { label: "Order ID", value: "{{ event.order_id }}" },
  { label: "Amount", value: "{{ event.amount }}" },
  { label: "Product Name", value: "{{ event.product_name }}" },
  { label: "Unsubscribe", value: "{{ unsubscribe_url }}" },
];

// ── Sample image library ──────────────────────────────────────────────────────

const DEMO_IMAGES: ImageAsset[] = [
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
    filename: "coding.jpg",
    path: "coding.jpg",
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    filename: "team.jpg",
    path: "team.jpg",
    uploadedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    filename: "dashboard.jpg",
    path: "dashboard.jpg",
    uploadedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

// ── Feature list ──────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: "✍️", label: "Rich text editing", desc: "Bold, italic, lists, headings" },
  { icon: "🖼️", label: "Image management", desc: "Insert, replace, resize, align" },
  { icon: "🔘", label: "Button builder", desc: "Insert styled CTA buttons" },
  { icon: "🎨", label: "Colours & fonts", desc: "Full colour picker + font families" },
  { icon: "↔️", label: "Text alignment", desc: "Left, center, right" },
  { icon: "📐", label: "HTML / Monaco view", desc: "Edit raw HTML with syntax highlight" },
  { icon: "📦", label: "Inline CSS", desc: "Inline <style> tags for email clients" },
  { icon: "📱", label: "Phone preview", desc: "See how it looks on mobile" },
];

// ── Light blue theme tokens ───────────────────────────────────────────────────

const theme = {
  bgPage: "linear-gradient(170deg, #e0f2fe 0%, #bae6fd 45%,rgb(42, 157, 210) 100%)",
  bgNav: "rgba(255,255,255,0.85)",
  bgPanel: "rgba(255,255,255,0.7)",
  bgPanelBorder: "rgba(2,132,199,0.2)",
  bgButton: "#0284c7",
  textPrimary: "#0c4a6e",
  textSecondary: "#0369a1",
  textMuted: "rgba(12,74,110,0.65)",
  border: "rgba(2,132,199,0.25)",
  accent: "#0284c7",
  codeBg: "#f0f9ff",
  codeText: "#0c4a6e",
};

// ── Demo App ──────────────────────────────────────────────────────────────────

interface AttributePanelProps {
  editorRef: React.RefObject<CDPEditorHandle | null>;
  customText: string;
  setCustomText: (v: string) => void;
  setAttrPanelOpen: (v: boolean) => void;
}

const AttributePanel: React.FC<AttributePanelProps> = ({ editorRef, customText, setCustomText, setAttrPanelOpen }) => (
  <>
    {/* Quick-insert */}
    <div
      className="rounded-xl p-4"
      style={{ background: theme.bgPanel, border: `1px solid ${theme.bgPanelBorder}` }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>
        Insert attribute
      </p>
      <div className="space-y-1.5">
        {DEMO_ATTRIBUTES.map((attr) => (
          <button
            key={attr.value}
            onClick={() => {
              editorRef.current?.insert(attr.value);
              setAttrPanelOpen(false);
            }}
            className="w-full text-left text-xs px-3 py-2 rounded-lg transition-all"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: `1px solid ${theme.border}`,
              color: theme.textPrimary,
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = theme.bgButton;
              b.style.color = "#fff";
              b.style.borderColor = theme.bgButton;
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "rgba(255,255,255,0.8)";
              b.style.color = theme.textPrimary;
              b.style.borderColor = theme.border;
            }}
          >
            {attr.label}
          </button>
        ))}
      </div>
    </div>

    {/* Custom insert */}
    <div
      className="rounded-xl p-4"
      style={{ background: theme.bgPanel, border: `1px solid ${theme.bgPanelBorder}` }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: theme.textMuted }}>
        Custom insert
      </p>
      <textarea
        rows={3}
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        placeholder="Type anything…"
        className="w-full text-xs rounded-lg px-2 py-1.5 resize-none focus:outline-none"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: `1px solid ${theme.border}`,
          color: theme.textPrimary,
          caretColor: theme.accent,
        }}
      />
      <button
        onClick={() => {
          if (customText.trim()) {
            editorRef.current?.insert(customText);
            setCustomText("");
            setAttrPanelOpen(false);
          }
        }}
        className="mt-2 w-full text-xs font-semibold px-3 py-2 rounded-lg transition-all"
        style={{ background: theme.bgButton, color: "#fff" }}
      >
        Insert at cursor
      </button>
    </div>
  </>
);

export default function App() {
  const editorRef = useRef<CDPEditorHandle>(null);

  const [html, setHtml] = useState(INITIAL_HTML);
  const [images, setImages] = useState<ImageAsset[]>(DEMO_IMAGES);
  const [showOutput, setShowOutput] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [customText, setCustomText] = useState("");
  const [attrPanelOpen, setAttrPanelOpen] = useState(false);

  const handleFetchImages = async () => {
    await new Promise((r) => setTimeout(r, 300));
    return images;
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    await new Promise((r) => setTimeout(r, 800));
    const url = URL.createObjectURL(file);
    setImages((prev) => [
      { url, filename: file.name, path: file.name, uploadedAt: new Date().toISOString() },
      ...prev,
    ]);
    return url;
  };

  const handleDeleteImage = async (path: string) => {
    await new Promise((r) => setTimeout(r, 200));
    setImages((prev) => prev.filter((i) => i.path !== path));
  };


  return (
    <>
      <Toaster position="top-right" richColors />

      {/* ── Page shell ───────────────────────────────────────────────────────── */}
      <div
        className="min-h-screen"
        style={{ background: theme.bgPage }}
      >

        {/* ── Navbar ────────────────────────────────────────────────────────── */}
        <header
          className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4"
          style={{
            borderBottom: `1px solid ${theme.border}`,
            background: theme.bgNav,
            backdropFilter: "blur(14px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: theme.bgButton, color: "#fff" }}
            >
              E
            </div>
            <div className="min-w-0">
              <span className="font-bold tracking-tight text-xs sm:text-sm truncate block" style={{ color: theme.textPrimary }}>
                cdp-editor
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded font-medium hidden sm:inline"
                style={{ background: "rgba(2,132,199,0.12)", color: theme.textSecondary }}
              >
                v{__APP_VERSION__}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <label
              className="hidden sm:flex items-center gap-2 text-sm cursor-pointer select-none"
              style={{ color: theme.textSecondary }}
            >
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
                className="rounded"
                style={{ accentColor: theme.accent }}
              />
              Read-only
            </label>
            <button
              onClick={() => setShowOutput((v) => !v)}
              className="text-xs px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap"
              style={
                showOutput
                  ? { background: theme.bgButton, color: "#fff" }
                  : { background: "rgba(255,255,255,0.9)", color: theme.textPrimary, border: `1px solid ${theme.border}` }
              }
            >
              <span className="hidden sm:inline">{showOutput ? "Hide" : "Show"} HTML Output</span>
              <span className="sm:hidden">{showOutput ? "Hide" : "HTML"}</span>
            </button>
            {/* Mobile: attributes drawer toggle */}
            <button
              className="lg:hidden text-xs px-3 py-2 rounded-lg font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.9)", color: theme.textPrimary, border: `1px solid ${theme.border}` }}
              onClick={() => setAttrPanelOpen((v) => !v)}
            >
              {attrPanelOpen ? "✕ Close" : "+ Insert"}
            </button>
          </div>
        </header>

        {/* ── Mobile drawer (attributes) ──────────────────────────────────── */}
        {attrPanelOpen && (
          <div
            className="lg:hidden px-4 py-4 space-y-4"
            style={{ borderBottom: `1px solid ${theme.border}`, background: theme.bgPanel }}
          >
            {/* Mobile read-only toggle */}
            <label
              className="flex items-center gap-2 text-sm cursor-pointer select-none"
              style={{ color: theme.textSecondary }}
            >
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
                className="rounded"
                style={{ accentColor: theme.accent }}
              />
              Read-only mode
            </label>
            <AttributePanel editorRef={editorRef} customText={customText} setCustomText={setCustomText} setAttrPanelOpen={setAttrPanelOpen} />
          </div>
        )}

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="text-center px-5 pt-10 sm:pt-16 pb-8 sm:pb-10">
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 sm:mb-5 tracking-wide uppercase"
            style={{
              background: "rgba(255,255,255,0.8)",
              color: theme.textSecondary,
              border: `1px solid ${theme.border}`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
            Interactive Demo
          </div>

          <h1
            className="font-extrabold tracking-tight mb-3 sm:mb-4"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.1, color: theme.textPrimary }}
          >
            CDP Editor
          </h1>

          <p
            className="max-w-xl mx-auto text-sm sm:text-base px-2"
            style={{ color: theme.textMuted }}
          >
            A fully-featured rich text editor for crafting beautiful HTML emails.
            Inject dynamic attributes at the cursor from any external picker.
          </p>
        </div>

        {/* ── Feature chips ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 px-4 sm:px-6 pb-8 sm:pb-12">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.8)",
                color: theme.textSecondary,
                border: `1px solid ${theme.border}`,
              }}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* ── Main: sidebar + editor ────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20 flex flex-col lg:flex-row gap-5">

          {/* Desktop sidebar (hidden on mobile — handled by drawer) */}
          <div className="hidden lg:flex w-52 flex-shrink-0 flex-col gap-4">
            <AttributePanel editorRef={editorRef} customText={customText} setCustomText={setCustomText} setAttrPanelOpen={setAttrPanelOpen} />
          </div>

          {/* Editor + output */}
          <div className="flex-1 min-w-0">

            {/* HTML output */}
            {showOutput && (
              <div
                className="mt-4 sm:mt-5 rounded-xl overflow-hidden mb-10"
                style={{ border: `1px solid ${theme.border}` }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{
                    background: theme.bgPanel,
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: theme.textMuted }}>
                    HTML Output
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: theme.textMuted }}>
                      {html.length} chars
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(html).then(() => {
                          toast.success("Copied to clipboard");
                        });
                      }}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-opacity hover:opacity-70"
                      style={{
                        background: "rgba(2,132,199,0.1)",
                        color: theme.textSecondary,
                        border: `1px solid rgba(2,132,199,0.2)`,
                      }}
                      title="Copy HTML"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
                <pre
                  className="text-xs p-4 overflow-auto max-h-52 sm:max-h-60 font-mono whitespace-pre-wrap"
                  style={{ background: theme.codeBg, color: theme.codeText }}
                >
                  {html}
                </pre>
              </div>
            )}

            {/* Editor with light blue shadow — explicit height so Monaco/code view has a defined container */}
            <div
              className="rounded-xl overflow-hidden flex flex-col"
              style={{
                boxShadow: `0 0 0 1px ${theme.border}, 0 24px 64px rgba(2,132,199,0.15)`,
                height: "fit-content",
                // minHeight: "100%",
              }}
            >
              <CDPEditor
                ref={editorRef}
                value={html}
                onChange={setHtml}
                readOnly={readOnly}
                placeholder="Start typing your email content here…"
                height={680}
                onFetchImages={handleFetchImages}
                onUploadImage={handleUploadImage}
                onDeleteImage={handleDeleteImage}
                enablePreview
                enableCodeEditor
              />
            </div>



            {/* Feature grid */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl p-3 sm:p-4"
                  style={{
                    background: theme.bgPanel,
                    border: `1px solid ${theme.bgPanelBorder}`,
                  }}
                >
                  <div className="text-lg sm:text-xl mb-1 sm:mb-2">{f.icon}</div>
                  <p className="font-semibold text-xs sm:text-sm" style={{ color: theme.textPrimary }}>{f.label}</p>
                  <p className="text-xs mt-0.5 hidden sm:block" style={{ color: theme.textMuted }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div
          className="text-center py-5 sm:py-6 text-xs px-4"
          style={{
            borderTop: `1px solid ${theme.border}`,
            color: theme.textMuted,
          }}
        >
          cdp-editor · MIT License
        </div>

      </div>
    </>
  );
}
