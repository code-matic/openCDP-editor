/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, lazy } from "react";

// Lazy-load rsw to keep initial bundle small and avoid SSR issues
const ClientEditor = lazy(() => import("react-simple-wysiwyg"));

interface WysiwygEditorProps {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  placeholder,
  containerProps,
  disabled,
  onFocus,
  onBlur,
}) => {
  const loading = (
    <div className="h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm">
      Loading editor…
    </div>
  );

  return (
    <div {...containerProps}>
      <Suspense fallback={loading}>
        <ClientEditor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          spellCheck={false}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Suspense>
    </div>
  );
};

export default WysiwygEditor;
