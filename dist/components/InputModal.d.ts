import { default as React } from 'react';
export interface InputModalField {
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    required?: boolean;
}
export interface InputModalProps {
    show: boolean;
    title: string;
    fields: InputModalField[];
    onConfirm: (values: Record<string, string>) => void;
    onClose: () => void;
}
declare const InputModal: React.FC<InputModalProps>;
export default InputModal;
