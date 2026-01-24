import React from "react";
interface TextEditorProps {
    onChange?: (html: string) => void;
    className?: string;
    initialValue?: string;
    imageChildren?: React.ReactNode;
    exportFullHTML?: boolean;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    readOnly?: boolean;
}
declare function TextEditor({ onChange, className, initialValue, imageChildren, exportFullHTML, ...props }: TextEditorProps): import("react/jsx-runtime").JSX.Element;
export default TextEditor;
//# sourceMappingURL=TextEditor.d.ts.map