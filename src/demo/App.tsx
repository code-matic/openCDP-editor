import React, { useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { CDPEditor } from "../lib/components/EmailEditor";
import type { CDPEditorHandle, ImageAsset } from "../lib/types";

// ── Links ─────────────────────────────────────────────────────────────────────

const NPM_URL = "https://www.npmjs.com/package/@codematic.io/cdp-editor";
const GITHUB_URL = "https://github.com/code-matic/openCDP-editor";
const INSTALL_CMD = "npm i @codematic.io/cdp-editor";

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

// ── Feature list (hero) ───────────────────────────────────────────────────────

const FEATURES = [
  "Rich text editing",
  "Image management",
  "Button builder",
  "Colours & fonts",
  "HTML / Monaco view",
  "Inline CSS",
  "Phone preview",
  "Dynamic attributes",
];

// ── How-to guide steps ────────────────────────────────────────────────────────

const HOW_TO_STEPS = [
  {
    step: "01",
    title: "Write your content",
    desc: "Click anywhere in the editor and start typing. Use the toolbar to apply bold, italic, headings, lists, and alignment. Press Ctrl+B / Ctrl+I for quick formatting.",
  },
  {
    step: "02",
    title: "Insert images & buttons",
    desc: "Click the image icon in the toolbar to open the image library — upload new assets or pick an existing one. Use the button icon to insert a styled CTA button. Click any inserted element to reveal its edit menu.",
  },
  {
    step: "03",
    title: "Inject dynamic attributes",
    desc: "Place your cursor where you want a variable, then type @customer or @event to pick from the same list as the sidebar, or click an attribute in the sidebar. Tags are replaced with real data at send time.",
  },
  {
    step: "04",
    title: "Preview & export",
    desc: 'Hit "Preview" in the editor toolbar to see how your email looks on a phone. Switch to "View HTML" to inspect or hand-edit the raw HTML. Copy the output with the button above the code block.',
  },
];

// ── Theme tokens (#000144 brand) ──────────────────────────────────────────────

const BRAND = "#000144";

const theme = {
  brand: BRAND,
  bg: "#f3f4f9",
  surface: "#ffffff",
  surfaceMuted: "#eceef6",
  border: "rgba(0, 1, 68, 0.1)",
  borderStrong: "rgba(0, 1, 68, 0.18)",
  text: BRAND,
  textMuted: "#5a5a7a",
  accent: BRAND,
  accentHover: "#0000aa",
  accentSoft: "#e8eaf5",
  gradient: `linear-gradient(135deg, ${BRAND} 0%, #1a1a7a 55%, #2d2d9e 100%)`,
  codeBg: BRAND,
  codeText: "#c8cce8",
};

const ACCENTS = [
  { color: BRAND, soft: "#e8eaf5", border: "#d0d4e8" },
  { color: "#1a1a7a", soft: "#eceef8", border: "#d4d8eb" },
  { color: "#2d3a8c", soft: "#eef0fa", border: "#d8dcf0" },
  { color: "#003366", soft: "#e6edf5", border: "#cdd8e8" },
];

// ── Inline icons ──────────────────────────────────────────────────────────────

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  </svg>
);

const NpmIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M0 7.5h24v9h-12v1.5H6v-1.5H0v-9Zm1.5 7.5H3v-6h1.5v6H6V9h1.5v6H9V7.5H1.5V15Zm9-6v7.5H12V15h1.5v-1.5H15V9h-4.5Zm3 1.5H15v3h-1.5v-3ZM16.5 9v6H18V9h1.5v6H21V9h1.5v6H24V9h-7.5Z" />
  </svg>
);

// ── Attribute panel ───────────────────────────────────────────────────────────

interface AttributePanelProps {
  editorRef: React.RefObject<CDPEditorHandle | null>;
  customText: string;
  setCustomText: (v: string) => void;
  setAttrPanelOpen: (v: boolean) => void;
}

const AttributePanel: React.FC<AttributePanelProps> = ({ editorRef, customText, setCustomText, setAttrPanelOpen }) => (
  <>
    {/* Quick-insert */}
    <div className="rounded-2xl p-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>
        Insert attribute
      </p>
      <div className="space-y-1">
        {DEMO_ATTRIBUTES.map((attr) => (
          <button
            key={attr.value}
            onClick={() => {
              editorRef.current?.insert(attr.value);
              setAttrPanelOpen(false);
            }}
            className="w-full text-left text-xs px-3 py-2 rounded-lg transition-colors"
            style={{ background: "transparent", color: theme.text }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = theme.accentSoft;
              b.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "transparent";
              b.style.color = theme.text;
            }}
          >
            {attr.label}
          </button>
        ))}
      </div>
    </div>

    {/* Custom insert */}
    <div className="rounded-2xl p-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: theme.textMuted }}>
        Custom insert
      </p>
      <textarea
        rows={3}
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        placeholder="Type anything…"
        className="w-full text-xs rounded-lg px-2.5 py-2 resize-none focus:outline-none transition-colors"
        style={{
          background: theme.surfaceMuted,
          border: `1px solid ${theme.border}`,
          color: theme.text,
          caretColor: theme.accent,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = theme.accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = theme.border)}
      />
      <button
        onClick={() => {
          if (customText.trim()) {
            editorRef.current?.insert(customText);
            setCustomText("");
            setAttrPanelOpen(false);
          }
        }}
        className="mt-2 w-full text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
        style={{ background: theme.accent, color: "#fff" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = theme.accentHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = theme.accent)}
      >
        Insert at cursor
      </button>
    </div>
  </>
);

// ── Demo App ──────────────────────────────────────────────────────────────────

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

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => toast.success("Install command copied"));
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      {/* ── Page shell ───────────────────────────────────────────────────────── */}
      <div
        className="min-h-screen"
        style={{
          color: theme.text,
          background: `radial-gradient(1200px 600px at 50% -200px, rgba(0,1,68,0.07) 0%, rgba(0,1,68,0) 60%), radial-gradient(900px 500px at 100% 10%, rgba(0,1,68,0.05) 0%, rgba(0,1,68,0) 55%), ${theme.bg}`,
        }}
      >

        {/* ── Navbar ────────────────────────────────────────────────────────── */}
        <header
          className="flex items-center justify-between px-4 sm:px-8 py-3"
          style={{
            borderBottom: `1px solid ${theme.border}`,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: theme.brand, color: "#fff", boxShadow: "0 4px 12px rgba(0,1,68,0.35)" }}
            >
              C
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="font-semibold tracking-tight text-sm truncate" style={{ color: theme.text }}>
                cdp-editor
              </span>
              <span className="text-[11px] font-medium hidden sm:inline" style={{ color: theme.textMuted }}>
                v{__APP_VERSION__}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-2 rounded-lg transition-colors"
              style={{ color: theme.textMuted }}
              onMouseEnter={(e) => { e.currentTarget.style.background = theme.surfaceMuted; e.currentTarget.style.color = theme.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textMuted; }}
              title="View on npm"
            >
              <NpmIcon />
              <span className="hidden sm:inline">npm</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-2 rounded-lg transition-colors"
              style={{ color: theme.textMuted }}
              onMouseEnter={(e) => { e.currentTarget.style.background = theme.surfaceMuted; e.currentTarget.style.color = theme.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = theme.textMuted; }}
              title="View source on GitHub"
            >
              <GithubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <div className="w-px h-5 mx-1 hidden sm:block" style={{ background: theme.border }} />
            <button
              onClick={() => setShowOutput((v) => !v)}
              className="text-xs px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              style={
                showOutput
                  ? { background: theme.brand, color: "#fff" }
                  : { background: theme.surface, color: theme.text, border: `1px solid ${theme.border}` }
              }
            >
              <span className="hidden sm:inline">{showOutput ? "Hide" : "Show"} HTML</span>
              <span className="sm:hidden">HTML</span>
            </button>
            {/* Mobile: attributes drawer toggle */}
            <button
              className="lg:hidden text-xs px-3 py-2 rounded-lg font-medium transition-colors"
              style={{ background: theme.surface, color: theme.text, border: `1px solid ${theme.border}` }}
              onClick={() => setAttrPanelOpen((v) => !v)}
            >
              {attrPanelOpen ? "✕" : "+"}
            </button>
          </div>
        </header>

        {/* ── Mobile drawer (attributes) ──────────────────────────────────── */}
        {attrPanelOpen && (
          <div
            className="lg:hidden px-4 py-4 space-y-3"
            style={{ borderBottom: `1px solid ${theme.border}`, background: theme.surfaceMuted }}
          >
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none" style={{ color: theme.textMuted }}>
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
        <div className="text-center px-5 pt-14 sm:pt-20 pb-6">
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full mb-6 tracking-wide"
            style={{ background: theme.accentSoft, color: theme.accent, border: `1px solid ${ACCENTS[0].border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.brand }} />
            Open-source · MIT licensed
          </div>

          <h1
            className="font-semibold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.05, color: theme.text }}
          >
            The email editor
            <br />
            <span style={{ color: theme.brand }}>
              your users deserve.
            </span>
          </h1>

          <p className="max-w-lg mx-auto text-sm sm:text-base leading-relaxed px-2" style={{ color: theme.textMuted }}>
            A fully-featured rich text editor for crafting beautiful HTML emails —
            with dynamic attributes injected right at the cursor.
          </p>

          {/* Install command + CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={copyInstall}
              className="group flex items-center gap-3 text-sm font-mono px-4 py-2.5 rounded-xl transition-colors"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text }}
              title="Copy install command"
            >
              <span style={{ color: theme.textMuted }}>$</span>
              <span>{INSTALL_CMD}</span>
              <svg className="opacity-40 group-hover:opacity-80 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5"
              style={{ background: theme.brand, color: "#fff", boxShadow: "0 8px 24px rgba(0,1,68,0.3)" }}
            >
              <GithubIcon size={15} />
              Star on GitHub
            </a>
          </div>
        </div>

        {/* ── Feature list ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2.5 px-6 pb-12 sm:pb-16 max-w-3xl mx-auto">
          {FEATURES.map((f, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: a.soft, color: a.color, border: `1px solid ${a.border}` }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </span>
            );
          })}
        </div>

        {/* ── Main: sidebar + editor ────────────────────────────────────────── */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 pb-20 flex flex-col lg:flex-row gap-5">

          {/* Desktop sidebar */}
          <div className="hidden lg:flex w-56 flex-shrink-0 flex-col gap-3">
            <label className="flex items-center gap-2 text-xs cursor-pointer select-none px-1" style={{ color: theme.textMuted }}>
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

          {/* Editor + output */}
          <div className="flex-1 min-w-0">

            {/* HTML output */}
            {showOutput && (
              <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.textMuted }}>
                    HTML Output
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: theme.textMuted }}>
                      {html.length} chars
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(html).then(() => toast.success("Copied to clipboard"))}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
                      style={{ background: theme.surfaceMuted, color: theme.textMuted }}
                      title="Copy HTML"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
                <pre
                  className="text-xs p-4 overflow-auto max-h-56 font-mono whitespace-pre-wrap"
                  style={{ background: theme.codeBg, color: theme.codeText }}
                >
                  {html}
                </pre>
              </div>
            )}

            {/* Editor */}
            <div
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ boxShadow: `0 0 0 1px ${theme.border}, 0 20px 60px rgba(0,1,68,0.12)`, height: "fit-content" }}
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
                insertableAttributes={DEMO_ATTRIBUTES}
                enablePreview
                enableCodeEditor
              />
            </div>

            {/* How to use */}
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: theme.textMuted }}>
                How to use
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOW_TO_STEPS.map((s, i) => {
                  const a = ACCENTS[i % ACCENTS.length];
                  return (
                  <div
                    key={s.step}
                    className="rounded-2xl p-5 flex gap-4"
                    style={{ background: theme.surface, border: `1px solid ${a.border}`, boxShadow: `0 6px 20px ${a.soft}` }}
                  >
                    <span
                      className="text-sm font-bold flex-shrink-0 leading-none mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ color: a.color, background: a.soft, fontVariantNumeric: "tabular-nums" }}
                    >
                      {s.step}
                    </span>
                    <div>
                      <p className="font-semibold text-sm mb-1.5" style={{ color: theme.text }}>{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{s.desc}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer
          className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[1300px] mx-auto px-6 py-8 text-xs"
          style={{ borderTop: `1px solid ${theme.border}`, color: theme.textMuted }}
        >
          <span>
            © 2026 codematic.io · MIT License
          </span>
          <div className="flex items-center gap-5">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: theme.textMuted }}>
              <GithubIcon size={14} /> GitHub
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}
