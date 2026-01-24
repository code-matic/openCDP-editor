import React, { forwardRef, useEffect } from "react";

interface EditorProps {
  initialHtml?: string;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  contentEditable?: boolean; // Add contentEditable to the props
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  (
    { initialHtml, className, onFocus, onBlur, contentEditable = true },
    ref
  ) => {
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current && initialHtml) {
        ref.current.innerHTML = initialHtml;
      }
    }, [ref, initialHtml]);

    return (
      <div
        ref={ref}
        className={`open-cdp-editor ${className} w-fit min-w-[400px] mx-auto my-0 h-[400px] box-border border border-gray-300 overflow-y-auto p-2 rounded-lg focus:outline-none scrollbar-thin scrollbar-thumb-gray-400`}
        contentEditable={contentEditable} // Forward contentEditable to the div
        onFocus={onFocus}
        onBlur={onBlur}
      ></div>
    );
  }
);

export default Editor;
