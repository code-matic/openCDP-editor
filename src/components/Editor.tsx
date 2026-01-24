import React, { forwardRef, useEffect } from "react";

interface EditorProps {
  initialHtml?: string;
  className?: string;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(({ initialHtml, className }, ref) => {
  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current && initialHtml) {
      ref.current.innerHTML = initialHtml;
    }
  }, [ref, initialHtml]);

  return (
    <div
      ref={ref}
      className={`open-cdp-editor ${className} w-fit min-w-[400px] mx-auto my-0 h-[400px] box-border border border-gray-300 overflow-y-auto p-2 rounded-lg focus:outline-none scrollbar-thin scrollbar-thumb-gray-400`}
      contentEditable
    ></div>
  );
});

export default Editor;
