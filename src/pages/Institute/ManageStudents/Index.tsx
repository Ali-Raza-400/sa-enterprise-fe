import { ReactElement } from "react";
import { Avatar, Flex, TableProps } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
import IMAGES from "../../../assets/images";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import GenericTable from "../../../components/UI/GenericTable";
import TagWithShowMore from "../../../components/UI/TagWithShowMore"; // Import your component
import { useNavigate } from "react-router-dom";
import PATH from "../../../navigation/Path";

interface StudentType {
  key: string;
  studentName: string;
  studentId: string;
  grade: string;
  totalCredits: number; // Add total credits field
  assignedTeachers: string[]; // Add assigned teachers field
  courses: string[]; // Keep this field for displaying enrolled courses
}

const Index = (): ReactElement => {
  const navigate = useNavigate();
  const { showAlert } = useGenericAlert();

  const columns: TableProps<StudentType>["columns"] = [
    {
      title: "Student Name", // Updated title
      dataIndex: "studentName",
      key: "studentName",
      render: (text) => (
        <Flex align="center" gap={6}>
          <Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
          {text}
        </Flex>
      ),
      width: 150,
    },
    {
      title: "Student ID", // Updated title
      dataIndex: "studentId",
      key: "studentId",
      width: 120,
    },
    {
      title: "Total Credits", // New title for total credits
      dataIndex: "totalCredits", // New data index for total credits
      key: "totalCredits",
      width: 120,
    },
    {
      title: "Courses Enrolled In", // New title for enrolled courses
      dataIndex: "courses", // Use the courses array here
      key: "courses",
      width: 200,
      render: (courses: string[]) => (
        <div className="custom-avatar-group">
          <TagWithShowMore maxCount={1} list={courses} isLinkAble={false} />
        </div>
        // Use TagWithShowMore component to display the enrolled courses
      ),
    },
    {
      title: "Assigned Teachers", // New title for assigned teachers
      dataIndex: "assignedTeachers", // New data index for assigned teachers
      key: "assignedTeachers",
      width: 200,
      render: (teachers: string[]) => (
        // Use TagWithShowMore component to display assigned teachers
        <div className="custom-avatar-group">
          <TagWithShowMore maxCount={1} list={teachers} isLinkAble={false} />
        </div>
      ),
    },
    {
      title: "Actions", // Updated title for actions
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj) => (
        <ActionDropdown
          viewProfileOnClick={() => {
            navigate(PATH.STUDENT_PROFILE);
          }}
          suspendOnClick={() =>
            showAlert({
              type: "warning",
              title: `Suspend ${obj.studentName}`,
              message: `Are you sure you want to suspend this student?`,
              confirmButtonText: "Suspend",
              cancelButtonText: "Cancel",
            })
          }
          deleteOnClick={() =>
            showAlert({
              type: "warning",
              title: `Delete ${obj.studentName}`,
              message: `Are you sure you want to delete this student?`,
              confirmButtonText: "Delete",
              cancelButtonText: "Cancel",
            })
          }
        />
      ),
    },
  ];

  const data: StudentType[] = [
    {
      key: "1",
      studentName: "John Brown",
      studentId: "123456",
      courses: ["Mathematics", "Physics", "Chemistry"], // Multiple courses
      grade: "A",
      totalCredits: 15, // Add total credits for each student
      assignedTeachers: ["Mr. Smith", "Ms. Johnson"], // Add assigned teachers for each student
    },
    {
      key: "2",
      studentName: "Jim Green",
      studentId: "654321",
      courses: ["Physics"], // Single course
      grade: "B+",
      totalCredits: 10, // Add total credits for each student
      assignedTeachers: ["Ms. Davis"], // Add assigned teachers for each student
    },
    {
      key: "3",
      studentName: "Joe Black",
      studentId: "789012",
      courses: ["Chemistry", "Biology"], // Multiple courses
      grade: "A-",
      totalCredits: 12, // Add total credits for each student
      assignedTeachers: ["Mr. Brown", "Ms. Wilson"], // Add assigned teachers for each student
    },
  ];

  return (
    <>
      <Flex className="justify-between">
        <SearchFilter position="end" />
      </Flex>
      <GenericTable columns={columns} data={data} />
    </>
  );
};

export default Index;
