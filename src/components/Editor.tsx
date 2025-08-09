import { forwardRef, useEffect } from "react";
interface EditorProps {
  initialHtml?: string;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(({ initialHtml }, ref) => {
  useEffect(() => {
    if (ref && typeof ref !== 'function' && ref.current && initialHtml) {
      ref.current.innerHTML = initialHtml;
    }
  }, [ref, initialHtml]);
  return (
    <div
      ref={ref}
      className="w-full h-60 overflow-y-auto p-2 border border-gray-300 rounded-lg focus:outline-none scrollbar-thin scrollbar-thumb-gray-400"
      contentEditable
    ></div>
  );
});

export default Editor;
