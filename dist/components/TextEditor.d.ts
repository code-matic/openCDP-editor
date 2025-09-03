import React from "react";
interface TextEditorProps {
    onChange?: (html: string) => void;
    className?: string;
    bodyHTML?: string;
    fullHTML?: string;
    imageChildren?: React.ReactNode;
}
declare function TextEditor({ onChange, bodyHTML, fullHTML, className, imageChildren }: TextEditorProps): import("react/jsx-runtime").JSX.Element;
export default TextEditor;
