import React from "react";
interface TextEditorProps {
    onChange?: (html: string) => void;
    className?: string;
    value?: string;
    imageChildren?: React.ReactNode;
    exportFullHTML?: boolean;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    readOnly?: boolean;
    pasteText?: {
        text: string;
        key: number;
    };
}
declare function TextEditor({ onChange, className, value, imageChildren, exportFullHTML, ...props }: TextEditorProps): import("react/jsx-runtime").JSX.Element;
export default TextEditor;
//# sourceMappingURL=TextEditor.d.ts.map