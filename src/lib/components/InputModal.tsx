import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";

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

const InputModal: React.FC<InputModalProps> = ({ show, title, fields, onConfirm, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (show) {
      const defaults: Record<string, string> = {};
      fields.forEach((f) => { if (f.defaultValue) defaults[f.name] = f.defaultValue; });
      form.setFieldsValue(defaults);
    }
  }, [show, fields, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onConfirm(values);
      form.resetFields();
    } catch {
      // Validation failed
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={title}
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
      cancelText="Cancel"
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="mt-4">
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[{ required: field.required !== false, message: `Please enter ${field.label.toLowerCase()}` }]}
          >
            <Input placeholder={field.placeholder} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default InputModal;
