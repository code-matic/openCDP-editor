import { default as React } from 'react';
import { MenuProps } from 'antd';
/** Full color picker with Apply — for use inside Ant Design dropdown menus. */
export declare const InlineColorPicker: React.FC<{
    defaultColor: string;
    onApply: (color: string) => void;
    buttonLabel?: string;
}>;
export declare const colorOptions: {
    label: string;
    color: string;
}[];
export declare const createColorMenu: (applyHighlightColor: (color: string) => void) => MenuProps;
export declare const createMenuConfig: (handleReplaceImage: () => void, handleDeleteImage: () => void, handleAlignImage: (alignment: "left" | "center" | "right") => void, handleResizeImage: (width: string) => void) => MenuProps;
export declare const createButtonMenuConfig: (handleDelete: () => void, handleRemoveBg: () => void, handleRemoveBorder: () => void, handleRemovePadding: () => void, handleBgColorChange: (color: string) => void, handleTextColorChange: (color: string) => void, handleBorderRadiusChange: (radius: string) => void, handlePaddingChange: (padding: string) => void, handleAlign: (alignment: "left" | "center" | "right") => void, currentColors?: {
    background?: string;
    text?: string;
}) => MenuProps;
export declare const createLinkMenuConfig: (handleEdit: () => void, handleDelete: () => void, handleTextColorChange: (color: string) => void) => MenuProps;
export declare const fontOptions: {
    label: string;
    value: string;
}[];
export declare const createFontMenu: (onSelect: (font: string) => void) => MenuProps;
export declare const fontSizeOptions: readonly [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
export declare const createFontSizeMenu: (onSelect: (size: string) => void) => MenuProps;
export declare const lineSpacingOptions: {
    label: string;
    value: string;
}[];
export declare const createLineSpacingMenu: (onSelect: (lineHeight: string) => void) => MenuProps;
