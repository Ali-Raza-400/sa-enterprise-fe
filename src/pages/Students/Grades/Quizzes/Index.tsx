import { Avatar, Flex, TableProps } from "antd";
import { useState } from "react";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import IMAGES from "../../../../assets/images";
import ActionDropdown from "../../../../components/UI/ActionDropdown";
import GenericTable from "../../../../components/UI/GenericTable";

interface DataType {
  key: string;
  name: string;
  lectureName: string;
  courseName: string;
  submitted: boolean;
  totalMarks: string;
  marks: string;
}

const Index = () => {
  const { showAlert } = useGenericAlert();
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

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
      title: "Lecture Name",
      dataIndex: "lectureName",
      key: "lectureName",
      width: 150,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      width: 150,
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      width: 100,
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      key: "totalMarks",
      width: 100,
    },
    {
      title: "Submitted",
      dataIndex: "submitted",
      key: "submitted",
      width: 100,
      render: (submitted) => (submitted ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (obj) => (
        <ActionDropdown
          viewProfileOnClick={() => {}}
          suspendOnClick={() =>
            showAlert({
              type: "warning",
              title: `Suspend ${obj.name}`,
              message: `Are you sure you want to suspend this teacher?`,
              confirmButtonText: "Suspend",
              cancelButtonText: "Cancel",
            })
          }
          deleteOnClick={() =>
            showAlert({
              type: "warning",
              title: `Delete ${obj.name}`,
              message: `Are you sure you want to delete this teacher?`,
              confirmButtonText: "Delete",
              cancelButtonText: "Cancel",
            })
          }
        />
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      lectureName: "Introduction to Psychology",
      courseName: "Psychology 101",
      submitted: true,
      totalMarks: "100",
      marks: "85",
    },
    {
      key: "2",
      name: "Jim Green",
      lectureName: "Data Structures",
      courseName: "Computer Science Basics",
      submitted: false,
      totalMarks: "100",
      marks: "78",
    },
    {
      key: "3",
      name: "Joe Black",
      lectureName: "Organic Chemistry",
      courseName: "Chemistry Fundamentals",
      submitted: true,
      totalMarks: "100",
      marks: "92",
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={data}
      updatePaginationFunc={(data) =>
        setTableOptions({ ...tableOptions, pagination: data })
      }
    />
  );
};

export default Index;
