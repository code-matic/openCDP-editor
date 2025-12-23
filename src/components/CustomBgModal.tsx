import React, { useState } from "react";
import { Modal, Input, message } from "antd";

interface CustomBgModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (color: string) => void;
}

const CustomBgModal: React.FC<CustomBgModalProps> = ({ visible, onClose, onApply }) => {

  const [color, setColor] = useState("#000000");

  const handleApply = () => {
    const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    if (!hexRegex.test(color)) {
      message.error("Invalid hex color code");
      return;
    }
    onApply(color);
    onClose();
  };

  return (
    <Modal
      title="Custom Background Color"
      visible={visible}
      onOk={handleApply}
      onCancel={onClose}>
      <Input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="#000000"
      />
    </Modal>
  );
};

export default CustomBgModal;