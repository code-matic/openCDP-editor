/// <reference types="react" />
export declare const useTextEditorFunctions: () => {
    align: string;
    boldActive: boolean;
    italicActive: boolean;
    underlineActive: boolean;
    formatBlock: string;
    orderedListActive: boolean;
    unorderedListActive: boolean;
    linkDropdownOpen: boolean;
    linkUrl: string;
    savedSelection: import("react").RefObject<Range | null>;
    handleSelectionChange: () => void;
    setLinkDropdownOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setLinkUrl: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export declare const handleBackgroundColorChange: (btn: HTMLElement, color: string) => void;
export declare const handleTextColorChange: (btn: HTMLElement, color: string) => void;
export declare const handlePaddingChange: (btn: HTMLElement, padding: string) => void;
export declare const handleBorderRadiusChange: (btn: HTMLElement, radius: string) => void;
export declare const removeBackground: (btn: HTMLElement) => void;
export declare const removeBorder: (btn: HTMLElement) => void;
export declare const removePadding: (btn: HTMLElement) => void;
//# sourceMappingURL=TextEditorFunctions.d.ts.map