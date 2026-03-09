# Changelog

All notable changes to `@codematic.io/cdp-editor` are documented here.

This project follows [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) format.

---

## [4.0.1] — 2026-03-06

### Fixed

- **Alignment** — applying alignment to a multi-block selection now correctly aligns all highlighted paragraphs, not just the one containing the cursor. Cursor is placed at the end of the last aligned block after applying; selection highlight is cleared.
- **Bullet & numbered lists** — Tailwind Preflight was stripping `list-style`, `padding`, and `display` from `ul`/`ol`/`li` elements, making list markers invisible. CSS rules added to `.rsw-ce` to restore them. State sync after list commands now uses an explicit `syncEditorContentToState` call to handle browsers that don't fire `input` events for `insertOrderedList`/`insertUnorderedList`.
- **Link insertion** — replaced `window.prompt` with a proper modal (URL + Link Text fields). New links default to sky-blue (`#0ea5e9`).
- **Link context menu** — clicking a plain `<a>` link in the editor now shows a dedicated link menu (Edit Link, Text Color, Delete) instead of the button menu.
- **Edit link modal** — pre-fills Link Text and URL from the existing anchor; updating either field is reflected immediately in the editor.
- **Button vs link detection** — improved heuristic now also detects externally crafted buttons (inline `background-color` + `padding` on `<a>`) in addition to editor-inserted ones (`data-editor-button-wrapper`). Fixed demo initial HTML to use proper button wrapper structure.
- **Insert at cursor after focus loss** — `insert()` ref method now restores the last known editor selection (`lastSelectionRef`) when the editor has lost focus (e.g. after typing in the custom insert textarea), falling back to end-of-editor if no saved selection exists.
- **Custom insert textarea focus** — `AttributePanel` was defined as a component inside `App`, causing React to unmount and remount it (and lose textarea focus) on every keystroke. Extracted as a stable top-level component.

---

## [4.0.0] — 2026-03-06

### Breaking Changes

- All runtime dependencies (`antd`, `@monaco-editor/react`, `liquidjs`, `juice`, `sonner`, `react-simple-wysiwyg`, `currency-codes`) are now **peer dependencies** and must be installed alongside the package. See the [Installation](./README.md#installation) section for the full install command.

### Improvements

- Bundle size reduced from **~1.1 MB** (1,699 kB minified) to **~56 kB** — a 96% reduction.
- Gzipped size reduced from **~461 kB** to **~14 kB**.
- Consumers who already have `antd` or `@monaco-editor/react` in their project no longer pay a double-bundle cost.

### Migration from v3

Install the required peer dependencies manually:

```bash
npm install @codematic.io/cdp-editor \
  react react-dom \
  @monaco-editor/react \
  antd \
  liquidjs \
  juice \
  sonner \
  react-simple-wysiwyg \
  currency-codes \
  --legacy-peer-deps
```

No changes to the component API, props, or ref handle are required.

---

## [3.2.1] — 2026-03-06

### Fixed

- Firebase hosting now serves the Vite demo app (`dist-app/`) instead of the default Firebase welcome page.
- App build output (`dist-app/`) and library build output (`dist/`) are now separate — running `build:lib` no longer wipes the demo app build.

### Added

- Copy button on the HTML output panel in the demo app — copies full HTML to clipboard with a toast confirmation.
- Version badge in the demo app header now reads automatically from `package.json` via `__APP_VERSION__`.
- `build:deploy` script shortcut: `npm run build:deploy` builds the demo app and deploys to Firebase in one command.

---

## [3.2.0] — 2026-03-05

### Added

- `onOpenImageModal` prop — delegate image insert/replace to your own modal instead of the built-in picker.
- `ref.insertImage(url)` and `ref.clearImageToReplace()` imperative methods on `CDPEditorHandle`.
- `hideViewToggles` prop — hide the built-in View HTML, Preview, and Inline CSS buttons when using external controls.
- Controlled `showCodeEditor` / `onShowCodeEditorChange` and `showPreview` / `onShowPreviewChange` props for driving view state from outside the component.
- `previewData` prop — pass sample data so Liquid variables render with real values in the preview iframe.
- `toolbarContent` prop — replace the default formatting toolbar with your own React node.

---

## [3.0.0] — 2026-03-04

### Initial public release

- WYSIWYG editing with bold, italic, underline, strikethrough, lists, headings, and alignment.
- Font family picker, text colour, and highlight colour via a full colour picker.
- Monaco Editor (VS Code-grade) raw HTML code view.
- CSS inlining via `juice` — one-click or programmatic via `ref.inlineCss()`.
- Mobile phone-frame preview.
- Image management — fetch library, upload, replace, resize, align, delete inline.
- Button builder — custom text, URL, colour, border radius, and padding.
- Liquid template variable support with `validateLiquidTemplate` and `liquidEngine` exports.
- Cursor insert API via `ref.insert(text)`.
- Full TypeScript definitions.
- Exported utilities: `handleInlineCSS`, `validateLiquidTemplate`, `validateCurrencyCodes`, `replaceBodyContent`, `wrapEmailBodyHtml`, and more.
