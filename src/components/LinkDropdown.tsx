import React from "react";
import { Dropdown, Button, Input } from "antd";
import { LinkOutlined } from "@ant-design/icons";

interface LinkDropdownProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  insertLink: () => void;
}

const LinkDropdown: React.FC<LinkDropdownProps> = ({
  open,
  setOpen,
  linkUrl,
  setLinkUrl,
  insertLink,
}) => {
  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={["click"]}
      overlay={() => (
        <div className="p-2 bg-white border rounded shadow-md w-64">
          <Input
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkUrl(e.target.value)}
            onPressEnter={insertLink}
          />
          <div className="flex justify-end mt-2">
            <Button size="small" type="primary" onClick={insertLink} title="Insert Link">
              Insert
            </Button>
          </div>
        </div>
      )}
    >
      <Button icon={<LinkOutlined />} className="px-2 py-1 rounded bg-gray-100"/>
    </Dropdown>
  );
};

export default LinkDropdown;
