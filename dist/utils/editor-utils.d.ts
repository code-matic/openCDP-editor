export declare function validateCurrencyCodes(template: string): string | null;
export declare function validateLiquidTemplate(tpl: string): {
    valid: boolean;
    error?: Error;
};
export declare function replaceBodyContent(originalHtml: string, newHtml: string): string;
export declare function wrapEmailBodyHtml(body: string): string;
export declare function getEditorElement(): HTMLElement | null;
export declare function insertSelectionMarker(): HTMLElement | null;
export declare function restoreSelectionFromMarker(marker: HTMLElement | null): void;
export declare function applyAlignmentToSelection(alignment: "left" | "right" | "center", handleEditorChange: (html: string) => void): void;
export declare function syncEditorContentToState(setIframeContent: (value: string) => void): void;
export declare function deleteImageFromEditor(img: HTMLImageElement, setIframeContent: (value: string) => void, onClearSelection?: () => void): void;
export declare function updateImageWidthInEditor(img: HTMLImageElement, width: string, setIframeContent: (value: string) => void, onClearSelection?: () => void): void;
export declare function alignImageInEditor(img: HTMLImageElement, alignment: "left" | "center" | "right", setIframeContent: (value: string) => void, onClearSelection?: () => void): void;
export declare const changeHighlightColor: (color: string, handleEditorChange: (value: string) => void, setIframeContent: (value: string) => void, setHasChanges: (value: boolean) => void, savedRange?: Range | null) => void;
export declare const normalizeColor: (color: string) => string;
export declare const changeFontFamily: (fontName: string, handleEditorChange: (value: string) => void, setIframeContent: (value: string) => void, setHasChanges: (value: boolean) => void, savedRange?: Range | null) => void;
export declare function updateButtonStyleInEditor(button: HTMLAnchorElement, bgColor: string, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function updateButtonTextColorInEditor(button: HTMLAnchorElement, textColor: string, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function updateButtonBorderRadiusInEditor(button: HTMLAnchorElement, radius: string, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function alignButtonInEditor(button: HTMLAnchorElement, alignment: "left" | "center" | "right", setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function updateButtonPaddingInEditor(button: HTMLAnchorElement, padding: string, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function deleteButtonFromEditor(button: HTMLAnchorElement, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function removeButtonBackgroundInEditor(button: HTMLAnchorElement, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function removeButtonBorderInEditor(button: HTMLAnchorElement, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function removeButtonPaddingInEditor(button: HTMLAnchorElement, setIframeContent: (v: string) => void, onClearSelection?: () => void): void;
export declare function replaceImageInEditor(imageToReplace: HTMLImageElement, imageUrl: string, setIframeContent: (v: string) => void, onClearImageToReplace?: () => void): void;
export declare function insertImageAtCursorInEditor(imageUrl: string, setIframeContent: (v: string) => void, lastSelectionRef: {
    current: Range | null;
}, handleEditorChange?: (html: string) => void): void;
export declare function insertButtonAtCursorInEditor(buttonText: string, buttonUrl: string, setIframeContent: (v: string) => void, lastSelectionRef: {
    current: Range | null;
}, handleEditorChange?: (html: string) => void): void;
export declare function insertTextIntoEditorAtSelection(formattedText: string, setIframeContent: (v: string) => void, onAttributeAdded?: () => void): void;
