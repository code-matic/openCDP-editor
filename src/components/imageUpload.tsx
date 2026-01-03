import { Button } from "antd";
import ImageUploadIcon from "../components/icons/imageUpload.icon";
import ImageModal from "./ImageModal";
import React, { useState } from "react";

interface ImageUploadProps {
    children?: React.ReactNode;
    onImageSelect: (src: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ children, onImageSelect }) => {

    const [openImageModal, setOpenImageModal] = useState(false);

    const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "IMG") {
            const imageElement = target as HTMLImageElement;
            onImageSelect(imageElement.src);
            setOpenImageModal(false);
        }
    };

    return (
        <div>
            <Button
                icon={<ImageUploadIcon />}
                onClick={() => setOpenImageModal(true)}
                className="px-2 py-1 rounded bg-gray-100"
            />
            {openImageModal && (
                <ImageModal onClose={() => setOpenImageModal(false)}>
                    <div onClick={handleImageClick}>
                        {children}
                    </div>
                </ImageModal>
            )}
        </div>
    );
};

export default ImageUpload;
