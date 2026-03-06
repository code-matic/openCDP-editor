import { default as React } from 'react';
interface WysiwygEditorProps {
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    disabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const WysiwygEditor: React.FC<WysiwygEditorProps>;
export default WysiwygEditor;
