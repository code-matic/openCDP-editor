import React from "react";
import { Modal, Input, Form } from "antd";

interface InsertButtonModalProps {
  open: boolean;
  buttonLabel: string;
  buttonUrl: string;
  buttonLabelError: string;
  buttonUrlError: string;
  onLabelChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

const InsertButtonModal: React.FC<InsertButtonModalProps> = ({
  open,
  buttonLabel,
  buttonUrl,
  buttonLabelError,
  buttonUrlError,
  onLabelChange,
  onUrlChange,
  onOk,
  onCancel,
}) => (
  <Modal
    title="Insert Button"
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    okText="Insert"
  >
    <Form layout="vertical">
      <Form.Item
        label="Button Label"
        validateStatus={buttonLabelError ? "error" : ""}
        help={buttonLabelError}
      >
        <Input
          value={buttonLabel}
          onChange={e => onLabelChange(e.target.value)}
          placeholder="Enter button text"
        />
      </Form.Item>
      <Form.Item
        label="Button URL"
        validateStatus={buttonUrlError ? "error" : ""}
        help={buttonUrlError}>

        <Input
          value={buttonUrl}
          onChange={e => onUrlChange(e.target.value)}
          placeholder="Enter URL (e.g. https://...)"
        />
      </Form.Item>
    </Form>
  </Modal>
);

export default InsertButtonModal;
