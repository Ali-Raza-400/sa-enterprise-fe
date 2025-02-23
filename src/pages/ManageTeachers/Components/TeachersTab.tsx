import { ReactElement, useState } from "react";
import { Avatar, Flex, TableProps } from "antd";
import IMAGES from "../../../assets/images";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import GenericTable from "../../../components/UI/GenericTable";
import { useGetInstituteTeacherQuery } from "../../../redux/slices/institute";
import { useSelector } from "react-redux";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
// import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { Teacher } from "../type";
import { FaEye } from "react-icons/fa";

interface DataType {
  teacher: Teacher;
  imgUrl: string;
  key: string;
  name: string;
  age: number;
  emailAddress: string;
  cnic: string;
  showScroll?: boolean;
  showAction?: boolean;
}

const TeachersTab = ({
  selectionType,
  setSelectedKeys,
  selectedKeys,
  enableSelection = false,
  showScroll = false,
  showAction = true,
}: {
  showActions?: boolean;
  selectionType?: "checkbox" | "radio";
  setSelectedKeys?: any;
  selectedKeys?: any;
  enableSelection?: boolean;
  showScroll?: boolean;
  showAction?: boolean;
}): ReactElement => {
  const navigate = useNavigate();
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  // const { showAlert } = useGenericAlert();
  const { user } = useSelector((state: any) => state.auth);

  const {
    data: teacherData,
    isLoading: teacherDataLoading,
    isFetching: teacherDataFetching,
  } = useGetInstituteTeacherQuery({ id: user?.id, tableOptions });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: ["teacher", "fullName"],
      key: "name",
      render: (text, record) => (
        <Flex align="center" gap={6}>
          <Avatar
            shape="circle"
            size="large"
            src={record?.teacher?.imageUrl || IMAGES.FAULT_IMG}
          />
          {text}
        </Flex>
      ),
      width: 100,
    },
    {
      title: "CNIC",
      dataIndex: ["teacher", "cnic"],
      key: "cnic",
      width: 100,
    },
    {
      title: "Email Address",
      dataIndex: ["teacher", "email"],
      key: "address",
      width: 100,
    },
    ...(showAction
      ? [
          {
            title: "Action",
            key: "action",
            fixed: "right" as const,
            width: 100,
            render: (obj: any) => (
              <ActionDropdown
                viewProfileOnClick={() =>
                  navigate(
                    PATH.TEACHER_PROFILE.replace(":id", obj?.teacher?.id)
                  )
                }
              />
            ),
          },
        ]
      : [
          {
            title: "Action",
            key: "action",
            fixed: "right" as const,

            width: 100,
            render: (obj:any) => (
              <div className="flex ml-5 cursor-pointer">
                {" "}
                <FaEye
                  onClick={() =>
                    navigate(
                      PATH.TEACHER_PROFILE.replace(":id", obj?.teacher?.id)
                    )
                  }
                  fill="#8970D6"
                  size={16}
                />
              </div>
            ),
          },
        ]),
  ]; // Return an empty array if showAction is false

  const handleSelectionChange = (keys: React.Key[], row: any) => {
    setSelectedKeys({ keys: keys, teacherId: row?.[0]?.teacher?.id });
  };

  return (
    <>
      <GenericTable
        columns={columns}
        data={teacherData}
        enablePagination={true}
        updatePaginationFunc={(data: { page: number; pageSize: number }) =>
          setTableOptions({ ...tableOptions, pagination: data })
        }
        loading={teacherDataLoading || teacherDataFetching}
        selectedRowKeys={selectedKeys?.keys}
        onSelectionChange={handleSelectionChange}
        rowKey="id"
        selectionType={selectionType}
        enableSelection={enableSelection}
        showScroll={showScroll}
      />
    </>
  );
};

export default TeachersTab;
