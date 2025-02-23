import { Avatar, Flex, Space, TableProps, Typography } from "antd";
import { ReactElement } from "react";
import useGenericAlert from "../../../../../components/Hooks/GenericAlert";
import IMAGES from "../../../../../assets/images";
import GenericTable from "../../../../../components/UI/GenericTable";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  age: number;
  emailAddress: string;
  cnic: string;
}

const New = (): ReactElement => {
  const { showAlert } = useGenericAlert();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Flex align="center" gap={6}>
          <Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
          {text}
        </Flex>
      ),
      width: 100,
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
      width: 100,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "address",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (obj) => (
        <Space className="gap-6">
        <Typography.Link
          style={{ color: "#51E186", display: "flex", alignItems: "center" }}
          onClick={() =>
            showAlert({
              type: "success",
              title: `Approve ${obj.name}`,
              message: `Are you sure you want to approve this user?`,
              confirmButtonText: "Approve",
              cancelButtonText: "Cancel",
              // Add your approval logic here
            })
          }
        >
          <CheckOutlined className="text-[#51E186] cursor-pointer text-[1.3rem]" />
          <span style={{ marginLeft: "0.5rem" }}>Approve</span>
        </Typography.Link>
      
        <Typography.Link
          style={{ color: "#BA2A2A", display: "flex", alignItems: "center" }}
          onClick={() =>
            showAlert({
              type: "warning",
              title: `Unapprove ${obj.name}`,
              message: `Are you sure you want to unapprove this user?`,
              confirmButtonText: "Unapprove",
              cancelButtonText: "Cancel",
              // Add your unapprove logic here
            })
          }
        >
          <CloseOutlined className="cursor-pointer text-[1.3rem] text-[#BA2A2A]" />
          <span style={{ marginLeft: "0.5rem" }}>Unapprove</span>
        </Typography.Link>
      </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      emailAddress: "test@gmail.com",
      cnic: "123456789",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      cnic: "123456789",
      emailAddress: "test@gmail.com",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      cnic: "123456789",
      emailAddress: "test@gmail.com",
    },
  ];
  return (
    <>
      <GenericTable columns={columns} data={data} />
    </>
  );
};

export default New;
