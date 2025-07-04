import { Spin, Image, TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteOprationMutation,
  useGetOprationsQuery,
} from "../../redux/slices/opration";
import GenericTable from "../../components/UI/GenericTable";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OprationsList = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  const options = {
    tableOptions: tableOptions,
    supervisor_id: user?.role === "supervisor" ? user?.id : null,
  };
  const {
    data: oprationData,
    isLoading: oprationLoading,
    isFetching,
  } = useGetOprationsQuery(options);
  useEffect(() => {
    document.title = "Manage Opration | SA Enterprise";

    const superUser = localStorage.getItem("super_user");
    if (superUser) {
      try {
        const parsedUser = JSON.parse(superUser);
        const projectId = parsedUser?.project_id;

        setTableOptions((prev) => ({
          ...prev,
          filters: { ...prev.filters, project_id: projectId }, // 👈 Inject project_id into filters or any key you expect in the API
        }));
      } catch (e) {
        console.error("Failed to parse super_user from localStorage", e);
      }
    }
  }, []);
  const navigate = useNavigate();
  const [deleteOpration, { isLoading: deleteUserLoading }] =
    useDeleteOprationMutation();
  const { showAlert } = useGenericAlert();
  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: `Delete Opration Confirmation`,
      message: `Are you sure you want to delete this Opration? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteOpration(id).unwrap(); // Ensures better error handling
          showAlert({
            type: "success",
            title: `Opration Deleted Successfully`,
            message: `The Opration has been deleted successfully.`,
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: `Deletion Failed`,
            message: `An error occurred while deleting the Opration. Please try again.`,
          });
        }
      },
    });
  };
  interface OprationType {
    id: string;
    location: string;
    photo_urls: string;
    driver_name: string;
    truck_plate: string;
    supervisor_id: string;
  }
  const columns: TableProps<OprationType>["columns"] = [
    {
      title: "Location",
      key: "location",
      render: (obj) => {
        return <div>{obj.location}</div>;
      },
      width: 150,
    },
    {
      title: "Photo",
      dataIndex: "photo_urls",
      key: "photo_urls",
      render: (obj) => {
        return (
          <div>
            {obj.map((url: any) => {
              return (
                <Image
                  width={40}
                  height={40}
                  src={url}
                  alt="opration_image"
                  style={{ marginRight: "5px", borderRadius: "50px" }}
                />
              );
            })}
          </div>
        );
      },
      width: 120,
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor_name",
      key: "supervisor_name",
      width: 200,
    },
    {
      title: "Driver",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 200,
    },
    {
      title: "Truck",
      dataIndex: "truck_plate",
      key: "truck_plate",
      width: 200,
    },
    {
      title: "Actions", // Updated title for actions
      key: "action",
      fixed: "right",
      width: 50,
      render: (obj: any) => (
        <div style={{ display: "flex", gap: "15px" }}>
          {/* View Icon (Blue) */}
          <Tooltip title="View">
            <EyeOutlined
              onClick={() =>
                navigate(PATH.MANAGE_OPRATION_VIEW, { state: obj })
              }
              style={{ color: "#007bff", cursor: "pointer", fontSize: "18px" }}
            />
          </Tooltip>

          {user?.role !== "supervisor" && (
            <>
              {/* Edit Icon (Orange) */}
              <Tooltip title="Edit">
                <EditOutlined
                  onClick={() =>
                    navigate(PATH.MANAGE_OPRATION_UPDATE, { state: obj })
                  }
                  style={{
                    color: "#ffa500",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                />
              </Tooltip>

              {/* Delete Icon (Red) */}
              <Tooltip title="Delete">
                <DeleteOutlined
                  onClick={() => onDelete(obj.id)}
                  style={{
                    color: "#dc3545",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
      // render: (obj: any) => (
      // 	<ActionDropdown
      // 		viewProfileOnClick={() => navigate(PATH.MANAGE_OPRATION_VIEW, {
      // 			state: obj
      // 		})}
      // 		{...(user?.role !== "supervisor" && {
      // 			editOnClick: () => navigate(PATH.MANAGE_OPRATION_UPDATE, {
      // 				state: obj
      // 			}),
      // 			deleteOnClick: () => onDelete(obj.id)
      // 		})}
      // 	/>
      // ),
    },
  ];
  return (
    <>
      {oprationLoading || isFetching ? (
        <Spin size="large" className="flex justify-center m-[250px]" />
      ) : (
        <div className="">
          <GenericTable
            loading={oprationLoading || deleteUserLoading}
            columns={columns}
            data={oprationData}
            enablePagination={true}
            updatePaginationFunc={(data: {
              page: number;
              pageSize: number;
            }) => {
              setTableOptions({ ...tableOptions, pagination: data });
            }}
          />
        </div>
      )}
    </>
  );
};

export default OprationsList;
