import React from "react";
interface EditorProps {
    initialHtml?: string;
    className?: string;
}
declare const Editor: React.ForwardRefExoticComponent<EditorProps & React.RefAttributes<HTMLDivElement>>;
export default Editor;
