import { forwardRef } from "react";

const Editor = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-60 overflow-y-auto p-2 border border-gray-300 rounded-lg focus:outline-none scrollbar-thin scrollbar-thumb-gray-400"
      contentEditable
    ></div>
  );
});

export default Editor;
