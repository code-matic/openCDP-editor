import { Button } from "antd";
import CancelIcon from "./icons/Cancel.icon";

interface ImageModalProps {
  onClose?: () => void;
}

const ImageModal = ({onClose}: ImageModalProps) => {

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000062]">
    <div className="bg-white rounded-2xl w-[55%] h-[500px] mx-auto p-6 relative">
      <Button onClick={onClose} icon={<CancelIcon />} className="absolute top-4 right-4 flex justify-center items-center" />

    </div>
  </div>
  );
};

export default ImageModal;