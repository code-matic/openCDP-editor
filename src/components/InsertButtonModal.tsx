import React from "react";
import { Modal, Input, Form } from "antd";

interface InsertButtonModalProps {
  mode: "insertButton" | "customBg"; // Add mode prop to differentiate use cases
  open: boolean;
  buttonLabel?: string; // Optional for customBg mode
  buttonUrl?: string; // Optional for customBg mode
  buttonLabelError?: string; // Optional for customBg mode
  buttonUrlError?: string; // Optional for customBg mode
  onLabelChange?: (value: string) => void; // Optional for customBg mode
  onUrlChange?: (value: string) => void; // Optional for customBg mode
  onApply?: (value: string) => void; // For customBg mode
  onOk: () => void;
  onCancel: () => void;
}

const InsertButtonModal: React.FC<InsertButtonModalProps> = ({
  mode,
  open,
  buttonLabel,
  buttonUrl,
  buttonLabelError,
  buttonUrlError,
  onLabelChange,
  onUrlChange,
  onApply,
  onOk,
  onCancel,
}) => (
  <Modal
    title={mode === "insertButton" ? "Insert Button" : "Custom Background Color"}
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    okText={mode === "insertButton" ? "Insert" : "Apply"}
  >
    {mode === "insertButton" ? (
      <Form layout="vertical">
        <Form.Item
          label="Button Label"
          validateStatus={buttonLabelError ? "error" : ""}
          help={buttonLabelError}
        >
          <Input
            value={buttonLabel}
            onChange={e => onLabelChange?.(e.target.value)}
            placeholder="Enter button text"
          />
        </Form.Item>
        <Form.Item
          label="Button URL"
          validateStatus={buttonUrlError ? "error" : ""}
          help={buttonUrlError}
        >
          <Input
            value={buttonUrl}
            onChange={e => onUrlChange?.(e.target.value)}
            placeholder="Enter URL (e.g. https://...)"
          />
        </Form.Item>
      </Form>
    ) : (
      <Form layout="vertical">
        <Form.Item label="Background Color">
          <Input
            type="text"
            onChange={e => onApply?.(e.target.value)}
            placeholder="#000000"
          />
        </Form.Item>
      </Form>
    )}
  </Modal>
);

export default InsertButtonModal;
