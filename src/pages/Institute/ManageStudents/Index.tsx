import { ReactElement, useEffect, useState } from "react";
import { Button, Flex, TableProps } from "antd";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import GenericTable from "../../../components/UI/GenericTable";
import GenericButton from "../../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { useGetUsersQuery, useUpdateUserMutation } from "../../../redux/slices/user";
import { Modal, Form, Input, Select } from "antd";
import { useDeleteUserMutation, useRegisterMutation } from "../../../redux/slices/auth";
import PageLoader from "../../../components/Loader/PageLoader";

const { Option } = Select;
interface UserFormValues {
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  phone_number: string;
  cnic_number: string;
  role: "admin" | "superadmin" | "worker";
  password: string;
}

interface AddUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddUser: (user: UserFormValues) => void;
}
interface UpdateUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdateUser: (user: UserFormValues) => void;
  selectedUser: any
}
interface StudentType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone_number: string;
  cnic_number: string;
  role: string;
}

const Index = (): ReactElement => {
  const [selectedUser, setSelectedUser] = useState<any>()
  console.log("selectedUser", selectedUser);
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  const [form] = Form.useForm();
  const { data, isLoading: userLoading, isFetching, refetch } = useGetUsersQuery(tableOptions);
  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [registerFunc, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: update }] = useUpdateUserMutation();
  console.log(update);
  console.log("isLoading", isLoading, isFetching);
  const handleAddUser = async (userData: any) => {
    const payload = {
      ...userData,
    };
    console.log("payload::::",payload)
    try {
      await registerFunc(payload).unwrap();
      showAlert({
        type: "success",
        title: `User registered!`,
        message: `User Added Successfully. Welcome to the SA-Enterprize System`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
      form.resetFields();
    } catch (error: unknown) {
      // openNotification({
      // 	type: "error",
      // 	title: getErrorMessage(error),
      // });
    }
  };
  const onEdit = (user: any) => {
    setIsUpdateModalVisible(true)
    setSelectedUser(user)
  };
  const handleuPDATEUser = async (userData: any) => {
    const payload = {
      userId: selectedUser.id,
      payload: userData,
    };
    try {
      await updateUser(payload).unwrap();
      showAlert({
        type: "success",
        title: `User Updated!`,
        message: `You have successfully update the user`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
    } catch (error: unknown) {
    }
  };

  // const navigate = useNavigate();
  const { showAlert } = useGenericAlert();
  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: `Delete User Confirmation`,
      message: `Are you sure you want to delete this user? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteUser(id).unwrap(); // Ensures better error handling
          showAlert({
            type: "success",
            title: `User Deleted Successfully`,
            message: `The user has been deleted successfully.`,
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: `Deletion Failed`,
            message: `An error occurred while deleting the user. Please try again.`,
          });
        }
      },
    });
  };

  const columns: TableProps<StudentType>["columns"] = [
    {
      title: "Name",
      key: "first_name",
      render: (obj) => {
        return (
          <div>
            {obj.first_name} {obj.last_name}
          </div>
        )
      },
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 120,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 200,
    },
    {
      title: "Cnic Number",
      dataIndex: "cnic_number",
      key: "cnic_number",
      width: 200,

    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,

    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 200,

    },
    {
      title: "Actions", // Updated title for actions
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj) => (
        <ActionDropdown
          // viewProfileOnClick={() => {
          //   navigate(PATH.STUDENT_PROFILE);
          // }}

          editOnClick={() => onEdit(obj)}
          deleteOnClick={() => onDelete(obj?.id)}
        />
      ),
    },
  ];
  if (userLoading || update || deleteUserLoading) {
    return <><PageLoader /></>
  }

  return (
    <>
      {/* {contextHolder} */}
      <Flex className="justify-end mb-4">
        {/* <SearchFilter position="end" /> */}
        <GenericButton
          icon={<FaPlus size={20} />}
          label="Create New User"
          onClick={() => setIsModalVisible(true)}
        />


        <AddUserModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddUser={handleAddUser}
        />
        <UpdateUserModal
          isVisible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          onUpdateUser={handleuPDATEUser}
          selectedUser={selectedUser}
        />
      </Flex>
      <GenericTable
        loading={userLoading || update || deleteUserLoading}
        columns={columns}
        data={data}
        enablePagination={true}
        updatePaginationFunc={(data: { page: number; pageSize: number }) => {
          console.log("data::::", data)

          setTableOptions({ ...tableOptions, pagination: data })
        }
        }
      // updatePaginationFunc={(data: any) =>
      //   setTableOptions({ ...tableOptions, pagination: data.pagination?.metadata })
      // }
      />
    </>
  );
};

export default Index;
const AddUserModal: React.FC<AddUserModalProps> = ({ isVisible, onClose, onAddUser }) => {
  const [form] = Form.useForm<UserFormValues>();
  const handleSubmit = (values: UserFormValues) => {
    onAddUser(values);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Add New User"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add User
          </Button>,
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item<UserFormValues> name="first_name" label="First Name" rules={[{ required: true, message: "First name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="last_name" label="Last Name" rules={[{ required: true, message: "Last name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="phone_number" label="Phone Number" rules={[{ required: true, message: "Phone number is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="cnic_number" label="CNIC Number" rules={[{ required: true, message: "CNIC is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item<UserFormValues> name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
          <Select placeholder="Select Role">
            <Option value="super_admin">Superadmin</Option>
            <Option value="operations_manager">Operations Manager</Option>
            <Option value="supervisor">Supervisor</Option>
            <Option value="driver">Driver</Option>
          </Select>
        </Form.Item>
        <Form.Item<UserFormValues> name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isVisible,
  onClose,
  onUpdateUser,
  selectedUser
}) => {
  const [form] = Form.useForm<UserFormValues>();

  // Set initial values when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser);
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const handleSubmit = (values: UserFormValues) => {
    onUpdateUser(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={"Update User"}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div style={{ display: "flex", justifyContent: "flex-end" }} key="footer">
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update User
          </Button>,
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "First name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Last name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: "Phone number is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="cnic_number" label="CNIC Number" rules={[{ required: true, message: "CNIC is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
          <Select placeholder="Select Role">
            <Option value="super_admin">Superadmin</Option>
            <Option value="operations_manager">Operations Manager</Option>
            <Option value="supervisor">Supervisor</Option>
            <Option value="driver">Driver</Option>
          </Select>
        </Form.Item>
        {!selectedUser && (
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
