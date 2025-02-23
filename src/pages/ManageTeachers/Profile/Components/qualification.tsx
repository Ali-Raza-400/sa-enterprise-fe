import { FaPlus } from "react-icons/fa6";
import GenericButton from "../../../../components/UI/GenericButton";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";
import { Divider, Empty } from "antd";
import { CiEdit } from "react-icons/ci";
import { Qualification, TeacherData } from "./TeacherTypes";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import useNotification from "../../../../components/UI/Notification";
import { useDeleteQualificationMutation } from "../../../../redux/slices/teacher";
import PageLoader from "../../../../components/Loader/PageLoader";

interface QualificationProps {
  onAdd: () => void;
  onEdit: (qualification: Qualification) => void;
  hasEditAccess: boolean;
  data: TeacherData;
  isLoading: boolean;
}

const Qualifications: React.FC<QualificationProps> = ({
  onAdd,
  onEdit,
  hasEditAccess,
  data,
  isLoading,
}) => {
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();
  const [deleteQualification, { isLoading: deleteLoading }] =
    useDeleteQualificationMutation();
  const onDelete = async (id: string) => {
    console.log("id::::", id);
    showAlert({
      type: "question",
      title: `Delete Qualification Confirmation`,
      message: `Are you sure you want to delete this Qualification? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        await deleteQualification(id).then(() => {
          openNotification({
            type: "success",
            title: "The Qualification has been deleted successfully.",
          });
        });
      },
    });
  };
  return (
    <>
      {contextHolder}
      <div className="flex justify-between mt-5">
        <Typography variant="headingFour" className="">
          Qualifications
        </Typography>
        {hasEditAccess && (
          <GenericButton
            icon={<FaPlus />}
            label="Add"
            variant="outlined"
            color="default"
            onClick={onAdd}
          />
        )}
      </div>

      <GenericCard className="space-y-3">
        {isLoading || deleteLoading ? (
          <>
            <PageLoader />
          </>
        ) : (
          <>
            {" "}
            {data?.teacherQualifications.length > 0 ? (
              data.teacherQualifications.map(
                (qualification: Qualification, index: number) => (
                  <div key={index}>
                    <div className=" flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        Degree Title :{" "}
                        <span className="text-sm font-medium">
                          {qualification.Degree}
                        </span>{" "}
                        <span className="text-sm font-medium text-gray-500 pl-10">
                          ({qualification.startingDate} to{" "}
                          {qualification.endingDate || "Present"})
                        </span>
                        <p className="text-sm font-normal">
                          <span className="text-sm font-semibold">
                            Institute{" "}
                          </span>{" "}
                          :
                          <span className="text-sm font-medium">
                            {" "}
                            {qualification.Institute}
                          </span>
                        </p>
                      </span>
                      <div className="flex ">
                        {hasEditAccess && (
                          <CiEdit
                            size={25}
                            color="#8970D6"
                            cursor={"pointer"}
                            onClick={() => onEdit(qualification)}
                          />
                        )}
                        {hasEditAccess && (
                          <MdOutlineDeleteOutline
                            className="ml-2 danger-color"
                            size={25}
                            cursor={"pointer"}
                            onClick={() => onDelete(qualification.id)}
                          />
                        )}
                      </div>
                    </div>
                    {data?.teacherQualifications.length > 1 && <Divider />}
                  </div>
                )
              )
            ) : (
              <Empty />
            )}
          </>
        )}
      </GenericCard>
    </>
  );
};

export default Qualifications;
