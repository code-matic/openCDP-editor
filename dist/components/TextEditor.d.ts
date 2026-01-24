import React from "react";
interface TextEditorProps {
    value?: string;
    onChange?: (html: string) => void;
    className?: string;
    initialValue?: string;
    imageChildren?: React.ReactNode;
    exportFullHTML?: boolean;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    readOnly?: boolean;
    onInsertText?: (insertFn: (text: string) => void) => void;
}
declare function TextEditor({ value, onChange, className, initialValue, imageChildren, exportFullHTML, onInsertText, ...props }: TextEditorProps): import("react/jsx-runtime").JSX.Element;
export default TextEditor;
//# sourceMappingURL=TextEditor.d.ts.map