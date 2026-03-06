import React, { Suspense, lazy, useEffect, useState } from "react";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

interface MonacoEditorWrapperProps {
  height?: string;
  defaultLanguage?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  theme?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMount?: (editor: any) => void;
  className?: string;
}

function addFormatDocumentToContextMenu(editor: { getAction?: (id: string) => { run: () => void } }): void {
  if (typeof (editor as { addAction?: (config: unknown) => void }).addAction !== "function") return;
  (editor as { addAction: (config: unknown) => void }).addAction({
    id: "editor.action.formatDocument.menu",
    label: "Format Document",
    contextMenuOrder: 1.5,
    run: (ed: { getAction?: (id: string) => { run: () => void } }) => {
      const action = ed?.getAction?.("editor.action.formatDocument");
      if (action?.run) action.run();
    },
  });
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
  height = "100%",
  defaultLanguage = "html",
  defaultValue = "",
  onChange,
  theme = "vs-dark",
  options = {},
  className,
  onMount,
}) => {
  const [isClient, setIsClient] = useState(false);

  const handleMount = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editor: any) => {
      addFormatDocumentToContextMenu(editor);
      onMount?.(editor);
    },
    [onMount]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loading = (
    <div className="h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse">
      Loading code editor…
    </div>
  );

  if (!isClient) return loading;

  return (
    <div className={className}>
      <Suspense fallback={loading}>
        <MonacoEditor
          height={height}
          defaultLanguage={defaultLanguage}
          defaultValue={defaultValue}
          onChange={onChange}
          theme={theme}
          options={options}
          onMount={handleMount}
        />
      </Suspense>
    </div>
  );
};

export default MonacoEditorWrapper;
