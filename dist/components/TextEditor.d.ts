import React from "react";
interface TextEditorProps {
    onChange?: (html: string) => void;
    className?: string;
    initialValue?: string;
    imageChildren?: React.ReactNode;
    exportFullHTML?: boolean;
}
declare function TextEditor({ onChange, className, initialValue, imageChildren, exportFullHTML }: TextEditorProps): import("react/jsx-runtime").JSX.Element;
export default TextEditor;
//# sourceMappingURL=TextEditor.d.ts.map