// Main component
export { CDPEditor, default } from "./components/EmailEditor";

// Sub-components (for advanced usage / composition)
export { default as WysiwygEditor } from "./components/WysiwygEditor";
export { default as MonacoEditorWrapper } from "./components/MonacoEditorWrapper";
export { default as PhonePreview } from "./components/PhonePreview";
export { default as InputModal } from "./components/InputModal";
export { default as ImagePickerModal } from "./components/ImagePickerModal";
// Utilities
export {
  validateLiquidTemplate,
  validateCurrencyCodes,
  replaceBodyContent,
  wrapEmailBodyHtml,
  changeHighlightColor,
  changeFontFamily,
  normalizeColor,
  insertImageAtCursorInEditor,
  insertButtonAtCursorInEditor,
  insertTextIntoEditorAtSelection,
} from "./utils/editor-utils";

export { handleInlineCSS, needsInliningDetailed } from "./utils/inliner";
export { isValidCurrencyCode, VALID_CURRENCY_CODES, COMMON_CURRENCY_CODES } from "./utils/currency-codes";
export { default as liquidEngine } from "./utils/liquid-engine";

// Hooks
export { useOnlineStatus } from "./hooks/useOnlineStatus";

// Types
export type {
  CDPEditorProps,
  CDPEditorHandle,
  ImageAsset,
  VariableGroup,
  Variable,
} from "./types";
