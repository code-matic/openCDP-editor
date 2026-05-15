import { ReactNode } from 'react';
export interface ImageAsset {
    url: string;
    filename: string;
    path: string;
    size?: number;
    uploadedAt?: string;
    isFolder?: boolean;
    name?: string;
    contents?: ImageAsset[];
}
export interface VariableGroup {
    label: string;
    key: string;
    variables: Variable[];
}
export interface Variable {
    key: string;
    label?: string;
    type: "string" | "number" | "object";
}
/** Sidebar / @-mention insertable Liquid snippets (label for UI, value inserted at cursor). */
export interface InsertableAttribute {
    label: string;
    value: string;
}
export interface CDPEditorProps {
    /** The HTML string value of the editor */
    value?: string;
    /** Called whenever the HTML content changes */
    onChange?: (html: string) => void;
    /** Make the editor read-only */
    readOnly?: boolean;
    /** Placeholder text shown in empty editor */
    placeholder?: string;
    /** Provide images for the image picker */
    onFetchImages?: () => Promise<ImageAsset[]>;
    /** Upload a file and return its public URL */
    onUploadImage?: (file: File) => Promise<string>;
    /** Delete an image by its path */
    onDeleteImage?: (path: string) => Promise<void>;
    /** Show / hide the "Preview" toggle button (default: true) */
    enablePreview?: boolean;
    /** Show / hide the "HTML" code editor toggle button (default: true) */
    enableCodeEditor?: boolean;
    /**
     * Optional context for Liquid rendering in Preview mode (e.g. { customer: {}, event: {}, trigger: {} }).
     * When provided, the preview iframe shows the template rendered with this data so
     * {{ customer.x | json }} and similar tags display actual values.
     */
    previewData?: Record<string, unknown>;
    /** Height of the editor area (default: 500px) */
    height?: number | string;
    className?: string;
    /**
     * Custom toolbar content. When provided, the default formatting buttons
     * (undo/redo, bold/italic, lists, alignment, image, button, color, font, etc.)
     * are hidden and this content is shown instead.
     */
    toolbarContent?: ReactNode;
    /** Controlled "View HTML" / "View Editor". Use with onShowCodeEditorChange and external buttons. */
    showCodeEditor?: boolean;
    onShowCodeEditorChange?: (show: boolean) => void;
    /** Controlled "Preview" / "Hide Preview". Use with onShowPreviewChange and external buttons. */
    showPreview?: boolean;
    onShowPreviewChange?: (show: boolean) => void;
    /** When true, the package does not render View HTML, Preview, or Inline CSS buttons. Use ref.inlineCss() for your Inline CSS button. */
    hideViewToggles?: boolean;
    /**
     * Same entries you show in an external attribute picker. When set, typing `@customer` or `@event`
     * in the rich-text editor opens an inline list (filtered by `{{ customer.* }}` / `{{ event.* }}`).
     */
    insertableAttributes?: InsertableAttribute[];
    /**
     * When provided, the package does not show its own image picker modal.
     * Insert Image and Replace Image will call this instead; you open your own modal.
     * When the user selects an image, call ref.insertImage(url) to insert or replace.
     */
    onOpenImageModal?: () => void;
}
/**
 * Imperative handle exposed via React.forwardRef.
 * Grab a ref to the editor and call insert() to paste text at the cursor.
 *
 * @example
 * const editorRef = useRef<CDPEditorHandle>(null);
 * editorRef.current?.insert("{{ customer.first_name }}");
 */
export interface CDPEditorHandle {
    /**
     * Insert any string at the current cursor position (or replace the selection).
     * Works whether the user last clicked in the visual editor or the subject line.
     */
    insert: (text: string) => void;
    /**
     * Run CSS inlining on the current HTML (same as the built-in "Inline CSS" button).
     * Call this from your own button when hideViewToggles is true.
     */
    inlineCss: () => void;
    /**
     * Insert an image at the cursor, or replace the currently selected image if one was chosen for replace.
     * Use when you provide onOpenImageModal and the user selects an image in your modal.
     */
    insertImage: (url: string) => void;
    /**
     * Clear the "image to replace" state. Call this when your custom image modal closes without selecting,
     * so the next insert does not accidentally replace an image.
     */
    clearImageToReplace: () => void;
}
