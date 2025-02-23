import { Modal, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { ItemDetailProps } from "../type";

export default function ItemDetails({ show, onClose }: ItemDetailProps) {
  const [activeKey, setActiveKey] = useState<string>("1");

  useEffect(() => {
    if (show) {
      setActiveKey("1");
    }
  }, [show]);

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Info",
      children: "ABCD",
    },
    {
      key: "2",
      label: "Graph",
      children: "ABCD",
    },
  ];

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Modal
      title="Item Details"
      open={show}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        onChange={onChange}
        activeKey={activeKey}
      />
    </Modal>
  );
}
