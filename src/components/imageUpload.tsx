import { Button } from "antd";
import ImageUploadIcon from "../components/icons/imageUpload.icon";
import ImageModal from "./ImageModal";
import React, { useState } from "react";


interface ImageUploadProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  linkUrl?: string;
  setLinkUrl?: (url: string) => void;
  insertLink?: () => void;
}



const ImageUpload: React.FC<ImageUploadProps> = () => {

    const [openImageModal, setOpenImageModal] = useState(false);

  return (
    <div>
      <Button icon={<ImageUploadIcon />} onClick={() => setOpenImageModal(true)} className="px-2 py-1 rounded bg-gray-100"/>

      {
        openImageModal && <ImageModal onClose={() => setOpenImageModal(false)}/>
      }

    </div>

  );
};

export default ImageUpload;
