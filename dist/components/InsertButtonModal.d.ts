import React from "react";
interface InsertButtonModalProps {
    mode: "insertButton" | "customBg";
    open: boolean;
    selectedButton?: {
        element: HTMLAnchorElement;
    } | null;
    buttonLabel?: string;
    buttonUrl?: string;
    buttonLabelError?: string;
    buttonUrlError?: string;
    onLabelChange?: (value: string) => void;
    onUrlChange?: (value: string) => void;
    onApply?: (value: string) => void;
    onOk: () => void;
    onCancel: () => void;
}
declare const InsertButtonModal: React.FC<InsertButtonModalProps>;
export default InsertButtonModal;
//# sourceMappingURL=InsertButtonModal.d.ts.map