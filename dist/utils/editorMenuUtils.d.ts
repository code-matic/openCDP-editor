import { MenuProps } from 'antd';
export declare const colorOptions: {
    label: string;
    color: string;
}[];
export declare const createColorMenu: (applyHighlightColor: (color: string) => void) => MenuProps;
export declare const createMenuConfig: (handleReplaceImage: () => void, handleDeleteImage: () => void, handleAlignImage: (alignment: "left" | "center" | "right") => void, handleResizeImage: (width: string) => void) => MenuProps;
export declare const createButtonMenuConfig: (handleDelete: () => void, handleRemoveBg: () => void, handleRemoveBorder: () => void, handleRemovePadding: () => void, handleBgColorChange: (color: string) => void, handleTextColorChange: (color: string) => void, handleBorderRadiusChange: (radius: string) => void, handlePaddingChange: (padding: string) => void, handleAlign: (alignment: "left" | "center" | "right") => void) => MenuProps;
export declare const fontOptions: {
    label: string;
    value: string;
}[];
export declare const createFontMenu: (onSelect: (font: string) => void) => MenuProps;
