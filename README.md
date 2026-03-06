# @codematic.io/cdp-editor

A powerful, fully-featured rich text editor built for HTML emails. Drop it into any React app and get WYSIWYG editing, a raw HTML/Monaco code view, image management, CSS inlining, mobile preview, and a flexible cursor-insert API — all in one self-contained component.

---

## Features

- **WYSIWYG editing** — bold, italic, underline, strikethrough, ordered/unordered lists, headings, and text alignment
- **Font & colour controls** — font family picker, text colour, and highlight colour via a full colour picker
- **Image management** — insert images from your own library, upload new files, replace, resize, align, or delete images inline
- **Button builder** — insert styled call-to-action buttons with custom text, URL, colour, border radius, and padding
- **Raw HTML editor** — toggle to a Monaco Editor (VS Code-grade) code view; pass full HTML as `value` to view and edit the complete document (DOCTYPE, head, body)
- **CSS inlining** — one-click inlining of `<style>` blocks into inline styles for maximum email client compatibility
- **Mobile preview** — render a phone-frame preview of the final email; optional **sample data** (`previewData`) so Liquid variables render with real values in preview
- **Cursor insert API** — inject any text, Liquid variable, or HTML snippet at the exact cursor position via a `ref`; ref also exposes **`inlineCss()`** to run CSS inlining from your own button
- **Custom toolbar** — pass `toolbarContent` to replace the default formatting buttons with your own
- **External view controls** — use controlled `showCodeEditor` / `showPreview` and `hideViewToggles` so your own buttons drive View HTML, Preview, and Inline CSS
- **Custom image modal** — pass `onOpenImageModal` and use `ref.insertImage(url)` / `ref.clearImageToReplace()` so your own modal handles insert and replace image
- **Read-only mode** — lock the editor for display or review purposes
- **Fully typed** — complete TypeScript definitions included

---

## Installation

```bash
npm install @codematic.io/cdp-editor
```

> **Peer dependencies** — your project must already have `react` and `react-dom` (≥ 18) installed.

---

## Setup

Import the stylesheet once in your application root (e.g. `_app.tsx`, `layout.tsx`, or `main.tsx`):

```tsx
import "@codematic.io/cdp-editor/style.css";
```

---

## Basic usage

```tsx
import { useState } from "react";
import { CDPEditor } from "@codematic.io/cdp-editor";

export default function MyPage() {
  const [html, setHtml] = useState("<p>Start writing…</p>");

  return (
    <CDPEditor
      value={html}
      onChange={setHtml}
    />
  );
}
```

The editor expects **full HTML** in `value` (e.g. `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, etc.). The **code view (Monaco)** shows this full document so you can edit the entire template. Every change is reported via `onChange` with the full HTML string — use that value for save, drafts, and sending.

---

## With image management

Provide three callbacks to enable the image picker, file uploads, and image deletion.

```tsx
import { useState } from "react";
import { CDPEditor } from "@codematic.io/cdp-editor";
import type { ImageAsset } from "@codematic.io/cdp-editor";

export default function MyPage() {
  const [html, setHtml] = useState("");

  const fetchImages = async (): Promise<ImageAsset[]> => {
    const res = await fetch("/api/images");
    return res.json();
  };

  const uploadImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/images/upload", { method: "POST", body: form });
    const { url } = await res.json();
    return url; // must return the public URL of the uploaded file
  };

  const deleteImage = async (path: string): Promise<void> => {
    await fetch(`/api/images/${encodeURIComponent(path)}`, { method: "DELETE" });
  };

  return (
    <CDPEditor
      value={html}
      onChange={setHtml}
      onFetchImages={fetchImages}
      onUploadImage={uploadImage}
      onDeleteImage={deleteImage}
    />
  );
}
```

---

## Inserting text / variables at the cursor

Use a `ref` to inject any content at the user's current cursor position. This is the intended pattern for custom attribute pickers, variable selectors, merge tags, or any external trigger.

```tsx
import { useRef, useState } from "react";
import { CDPEditor } from "@codematic.io/cdp-editor";
import type { CDPEditorHandle } from "@codematic.io/cdp-editor";

export default function MyPage() {
  const editorRef = useRef<CDPEditorHandle>(null);
  const [html, setHtml] = useState("");

  return (
    <div>
      {/* Your own variable/attribute picker */}
      <button onClick={() => editorRef.current?.insert("{{ customer.first_name }}")}>
        First Name
      </button>
      <button onClick={() => editorRef.current?.insert("{{ event.order_id }}")}>
        Order ID
      </button>
      <button onClick={() => editorRef.current?.insert("{{ unsubscribe_url }}")}>
        Unsubscribe URL
      </button>

      <CDPEditor
        ref={editorRef}
        value={html}
        onChange={setHtml}
      />
    </div>
  );
}
```

`insert()` places the string exactly where the cursor is (or replaces the current selection). It works with plain text, Liquid / Handlebars / Mustache expressions, or raw HTML fragments.

---

## Preview with sample data (Liquid)

When your template uses Liquid variables (e.g. `{{ customer.first_name }}`, `{{ event.order_id | json }}`), the built-in **Preview** shows them as raw tags unless you pass sample data. Use the `previewData` prop so the preview iframe renders the template with real values.

```tsx
const [html, setHtml] = useState("");
const previewData = {
  customer: { first_name: "Jane", email: "jane@example.com" },
  event: { order_id: "ORD-123", amount: 99.99 },
  trigger: { data: { name: "Welcome flow" } },
};

return (
  <CDPEditor
    value={html}
    onChange={setHtml}
    previewData={previewData}
  />
);
```

When the user switches to Preview, the editor renders the HTML through Liquid with `previewData` as the context, so `{{ customer.first_name }}` appears as “Jane” and `{{ event.order_id | json }}` as `"ORD-123"`. Updating `previewData` (e.g. from a sample-data editor) updates the preview in real time.

---

## Custom toolbar and external view buttons

You can replace the default formatting toolbar and/or move the “View HTML”, “Preview”, and “Inline CSS” actions to your own buttons outside the package.

### Custom toolbar only

Pass `toolbarContent` to show your own buttons instead of the default (bold, italic, lists, alignment, image, button, colour, font). The package still shows its own View HTML, Preview, and Inline CSS toggles.

```tsx
<CDPEditor
  value={html}
  onChange={setHtml}
  toolbarContent={
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => editorRef.current?.insert("{{ customer.name }}")}>
        Insert name
      </button>
      {/* your other toolbar buttons */}
    </div>
  }
/>
```

### External View HTML, Preview, and Inline CSS buttons

To use **your own** buttons for “View HTML”, “Preview”, and “Inline CSS” (and hide the package’s), use controlled state and the ref:

1. Pass **controlled** props: `showCodeEditor`, `onShowCodeEditorChange`, `showPreview`, `onShowPreviewChange`.
2. Set **`hideViewToggles={true}`** so the package does not render its View HTML, Preview, or Inline CSS buttons.
3. For **Inline CSS**, call **`editorRef.current?.inlineCss()`** from your button’s `onClick`.

```tsx
const [showCodeEditor, setShowCodeEditor] = useState(false);
const [showPreview, setShowPreview] = useState(false);
const editorRef = useRef<CDPEditorHandle>(null);

return (
  <div>
    {/* Your own buttons */}
    <button
      onClick={() => {
        setShowCodeEditor((v) => !v);
        if (!showCodeEditor) setShowPreview(false);
      }}
    >
      {showCodeEditor ? "View Editor" : "View HTML"}
    </button>
    <button
      onClick={() => {
        setShowPreview((v) => !v);
        if (!showPreview) setShowCodeEditor(false);
      }}
    >
      {showPreview ? "Hide Preview" : "Preview"}
    </button>
    <button onClick={() => editorRef.current?.inlineCss()}>
      Inline CSS
    </button>

    <CDPEditor
      ref={editorRef}
      value={html}
      onChange={setHtml}
      showCodeEditor={showCodeEditor}
      onShowCodeEditorChange={(show) => {
        setShowCodeEditor(show);
        if (show) setShowPreview(false);
      }}
      showPreview={showPreview}
      onShowPreviewChange={(show) => {
        setShowPreview(show);
        if (show) setShowCodeEditor(false);
      }}
      hideViewToggles={true}
    />
  </div>
);
```

Keeping “View HTML” and “Preview” mutually exclusive (only one active at a time) is your responsibility when using external buttons; the snippet above does that by closing preview when opening code view and vice versa.

---

## Custom image modal (insert / replace image)

You can use your own image picker or upload modal instead of the built-in one. When the user clicks **Insert Image** in the toolbar or **Replace image** in the image context menu, the editor will call your callback; you open your modal and, when the user selects an image, call the ref to insert or replace.

1. Pass **`onOpenImageModal`** — the editor calls this instead of opening its image picker.
2. When the user selects an image in your modal, call **`editorRef.current.insertImage(url)`** — the editor inserts at the cursor or replaces the image that was chosen for replace.
3. When your modal closes **without** a selection, call **`editorRef.current.clearImageToReplace()`** so the next insert does not replace an image.

```tsx
const [showImageModal, setShowImageModal] = useState(false);
const editorRef = useRef<CDPEditorHandle>(null);

return (
  <>
    <CDPEditor
      ref={editorRef}
      value={html}
      onChange={setHtml}
      onOpenImageModal={() => setShowImageModal(true)}
    />
    <YourImageModal
      show={showImageModal}
      onClose={() => {
        setShowImageModal(false);
        editorRef.current?.clearImageToReplace();
      }}
      onSelectImage={(url) => {
        editorRef.current?.insertImage(url);
        setShowImageModal(false);
      }}
    />
  </>
);
```

When **Replace image** is used, the editor remembers the image to replace; the next `insertImage(url)` replaces it. When **Insert Image** is used, `insertImage(url)` inserts at the cursor.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | The controlled HTML content. Use the **full document** (DOCTYPE, html, head, body) so the code view (Monaco) shows and edits the complete template. |
| `onChange` | `(html: string) => void` | — | Called on every change with the **full HTML document**. Persist this value for save/drafts and pass it back as `value` on the next render. |
| `readOnly` | `boolean` | `false` | Disables all editing interactions |
| `placeholder` | `string` | — | Text shown when the editor is empty |
| `height` | `number \| string` | `500` | Height of the editor area (px or any CSS value) |
| `enablePreview` | `boolean` | `true` | Show or hide the mobile phone preview toggle |
| `enableCodeEditor` | `boolean` | `true` | Show or hide the raw HTML / Monaco editor toggle |
| `onFetchImages` | `() => Promise<ImageAsset[]>` | — | Return your image library for the image picker |
| `onUploadImage` | `(file: File) => Promise<string>` | — | Upload a file and return its public URL |
| `onDeleteImage` | `(path: string) => Promise<void>` | — | Delete an image by its path |
| `className` | `string` | — | Additional CSS class applied to the root element |
| `previewData` | `Record<string, unknown>` | — | Sample data for **Preview** mode: the template is rendered with Liquid using this object (e.g. `{ customer: {}, event: {}, trigger: {} }`) so Liquid variables and filters show real values in the preview iframe |
| `toolbarContent` | `ReactNode` | — | When provided, the default formatting toolbar (bold, italic, lists, alignment, image, button, colour, font) is **hidden** and this content is shown instead. The Inline CSS and View HTML / Preview toggles are unaffected unless you use `hideViewToggles` |
| `showCodeEditor` | `boolean` | — | **Controlled** “View HTML” state. Use with `onShowCodeEditorChange` to drive the code-view toggle from your own buttons |
| `onShowCodeEditorChange` | `(show: boolean) => void` | — | Called when the code-editor view should toggle (e.g. when the user clicks your “View HTML” button) |
| `showPreview` | `boolean` | — | **Controlled** “Preview” state. Use with `onShowPreviewChange` to drive the preview toggle from your own buttons |
| `onShowPreviewChange` | `(show: boolean) => void` | — | Called when the preview should toggle (e.g. when the user clicks your “Preview” button) |
| `hideViewToggles` | `boolean` | `false` | When `true`, the package does **not** render its own View HTML, Preview, or Inline CSS buttons. Use with the controlled props above and `ref.inlineCss()` so your external buttons are the only controls |
| `onOpenImageModal` | `() => void` | — | When provided, the package does **not** show its image picker. Insert Image and Replace Image call this instead; open your own modal and call `ref.insertImage(url)` when the user selects, and `ref.clearImageToReplace()` when the modal closes without selecting |

---

## Ref handle

Attach a `ref` typed as `React.RefObject<CDPEditorHandle>` to access the imperative API.

| Method | Signature | Description |
|---|---|---|
| `insert` | `(text: string) => void` | Insert a string at the current cursor position (or replace the selection) |
| `inlineCss` | `() => void` | Run CSS inlining on the current HTML (same as the built-in “Inline CSS” button). Use this when you provide your own Inline CSS button and pass `hideViewToggles={true}` |
| `insertImage` | `(url: string) => void` | Insert an image at the cursor, or replace the image chosen for replace. Use when you provide `onOpenImageModal` and the user selects an image in your modal |
| `clearImageToReplace` | `() => void` | Clear the “image to replace” state. Call when your custom image modal closes without a selection |

---

## TypeScript types

All types are exported from the package root.

```ts
import type {
  CDPEditorProps,  // Props accepted by <CDPEditor />
  CDPEditorHandle, // Ref handle shape
  ImageAsset,            // Shape of an image in the image library
  VariableGroup,         // Utility type for grouping variables
  Variable,              // Individual variable definition
} from "@codematic.io/cdp-editor";
```

### `ImageAsset`

```ts
interface ImageAsset {
  url: string;
  filename: string;
  path: string;
  size?: number;
  uploadedAt?: string;
  isFolder?: boolean;
  name?: string;
  contents?: ImageAsset[]; // for folder-structured libraries
}
```

---

## Advanced: value and onChange (full HTML)

- **`value`** — Pass the **full HTML document** (DOCTYPE, `<html>`, `<head>`, `<body>`). The code view (Monaco) displays this entire document; the WYSIWYG and preview use the same content.
- **`onChange`** — The editor calls this with the **full HTML document** on every change (WYSIWYG or code view). Use this string for saving, draft autosave, and sending; pass it back as `value` so the editor and Monaco stay in sync.

```tsx
const [html, setHtml] = useState("");

const handleSave = () => {
  await myApi.saveTemplate({ html });
};

<CDPEditor value={html} onChange={setHtml} />
```

---

## Advanced: CSS inlining

The toolbar exposes a one-click “Inline CSS” button (unless you pass `hideViewToggles={true}`). When clicked it moves all rules from `<style>` tags into inline `style` attributes, which is required by many email clients (Gmail, Outlook).

- **From your own button:** call `editorRef.current?.inlineCss()` (see [Custom toolbar and external view buttons](#custom-toolbar-and-external-view-buttons)).
- **Programmatically (no editor instance):** use the exported utility:

```ts
import { handleInlineCSS } from "@codematic.io/cdp-editor";

const inlinedHtml = await handleInlineCSS(rawHtml);
```

---

## Advanced: Liquid template validation

```ts
import { validateLiquidTemplate } from "@codematic.io/cdp-editor";

const errors = await validateLiquidTemplate(html);
if (errors.length > 0) {
  console.warn("Template errors:", errors);
}
```

---

## Contributing & local development

```bash
# Clone the repo
git clone https://github.com/code-matic/openCDP-editor

# Install dependencies
npm install

# Start the interactive demo
npm run dev

# Build the library output
npm run build:lib

# Build the demo app
npm run build

# Type-check without emitting
npm run type-check
```

---

## License

MIT © Codematic
