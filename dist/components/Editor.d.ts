import React from "react";
interface EditorProps {
    initialHtml?: string;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    contentEditable?: boolean;
}
declare const Editor: React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<HTMLDivElement>>;
export default Editor;
//# sourceMappingURL=Editor.d.ts.map