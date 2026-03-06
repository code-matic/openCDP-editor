import { default as React } from 'react';
import { ImageAsset } from '../types';
interface ImagePickerModalProps {
    show: boolean;
    onClose: () => void;
    onSelectImage: (url: string) => void;
    onFetchImages?: () => Promise<ImageAsset[]>;
    onUploadImage?: (file: File) => Promise<string>;
    onDeleteImage?: (path: string) => Promise<void>;
}
declare const ImagePickerModal: React.FC<ImagePickerModalProps>;
export default ImagePickerModal;
