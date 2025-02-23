import { TableProps } from "antd";
import { useState } from "react";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
// import IMAGES from "../../../../assets/images";
import ActionDropdown from "../../../../components/UI/ActionDropdown";
import GenericTable from "../../../../components/UI/GenericTable";
import { useGetSubmittedAssignmentsQuery } from "../../../../redux/slices/student";
import { Assignment } from "../../../Courses/type";

interface DataType {
  assignment: Assignment;
  key: string;
  name: string;
  dueDate: string;
  totalMarks: string;
  marksObtain: boolean;
  fileUrl: string;
  filePath: string;
}

const Index = () => {

  const {data: assignmentsData}  = useGetSubmittedAssignmentsQuery();
  console.log(assignmentsData, "Submitted Assignments");


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
      title: "Assignment Name",
      dataIndex: ["assignment", "name"],
      key: "name",
      render: (text, record) => (
          <a href={record?.assignment?.filePath} target="_blank" className="hover:underline hover:text-[#8970D6]">{text}
          </a>
      ),
      width: 100,
    },
    {
      title: "Due Date",
      dataIndex: ["assignment", "dueDate"],
      key: "dueDate",
      width: 150,
    },
    {
      title: "Total Marks",
      dataIndex: ["assignment", "totalMarks"],
      key: "totalMarks",
      width: 150,
    },
    {
      title: "Marks Obtain",
      dataIndex: ["marksObtained"],
      key: "marksObtain",
      width: 100,
    },
    {
      title: "Submission Date",
      dataIndex: ["submitionDateTime"],
      key: "totalMarks",
      width: 100,
    },
    {
      title: "Submitted Assignment",
      dataIndex: ["fileUrl"],
      key: "fileUrl",
      width: 100,
      
      render: (text,record) => {
        const fileName = record?.fileUrl?.split('/').pop();
        return record.fileUrl ? (
          <a href={record?.fileUrl} target="_blank" className="hover:underline hover:text-[#8970D6]" rel="noopener noreferrer">
            {fileName}
          </a>
        ) : (
          text
        );
      }
      // render: (submitted) => (submitted ? "Yes" : "No"),
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

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     lectureName: "Introduction to Psychology",
  //     courseName: "Psychology 101",
  //     submitted: true,
  //     totalMarks: "100",
  //     marks: "85",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     lectureName: "Data Structures",
  //     courseName: "Computer Science Basics",
  //     submitted: false,
  //     totalMarks: "100",
  //     marks: "78",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     lectureName: "Organic Chemistry",
  //     courseName: "Chemistry Fundamentals",
  //     submitted: true,
  //     totalMarks: "100",
  //     marks: "92",
  //   },
  // ];

  return (
    <GenericTable
      columns={columns}
      data={assignmentsData}
      updatePaginationFunc={(data) =>
        setTableOptions({ ...tableOptions, pagination: data })
      }
    />
  );
};

export default Index;
