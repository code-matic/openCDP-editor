import { default as React } from 'react';
interface MonacoEditorWrapperProps {
    height?: string;
    defaultLanguage?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
    theme?: string;
    options?: any;
    onMount?: (editor: any) => void;
    className?: string;
}
declare const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps>;
export default MonacoEditorWrapper;
