import { FaPlus } from "react-icons/fa6";
import GenericButton from "../../../../components/UI/GenericButton";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";
import { CiEdit } from "react-icons/ci";
import { Divider, Empty } from "antd";
import { Publication as PublicationType, TeacherData } from "./TeacherTypes";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import { useDeletePublicationMutation } from "../../../../redux/slices/teacher";
import useNotification from "../../../../components/UI/Notification";
import PageLoader from "../../../../components/Loader/PageLoader";
interface PublicationProps {
  onAdd: () => void;
  onEdit: (certificate: PublicationType) => void;
  hasEditAccess: boolean;
  data: TeacherData;
  isLoading: boolean;
}
const Publication: React.FC<PublicationProps> = ({
  onAdd,
  onEdit,
  hasEditAccess,
  data,
  isLoading,
}) => {
  const [deletePublication, { isLoading: deleteLoading }] =
    useDeletePublicationMutation();
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();
  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: `Delete Publication Confirmation`,
      message: `Are you sure you want to delete this Publication? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        await deletePublication(id).then(() => {
          openNotification({
            type: "success",
            title: "The Publication has been deleted successfully.",
          });
        });
      },
    });
  };
  return (
    <>
      {contextHolder}
      <div className="flex justify-between">
        <Typography variant="headingFour">Publications</Typography>
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
          <PageLoader />
        ) : (
          <>
            {data?.teacherPublications.length > 0 ? (
              data.teacherPublications.map(
                (publication: PublicationType, index: number) => (
                  <div key={index}>
                    <div className=" flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        Title :{" "}
                        <span className="text-sm font-medium">
                          {publication.Title}
                        </span>
                        <p className="text-sm font-normal">
                          <span className="text-sm font-semibold">
                            Journal Name{" "}
                          </span>{" "}
                          :
                          <span className="text-sm font-medium">
                            {" "}
                            {publication.Journal}
                          </span>
                        </p>
                        <p className="text-sm font-medium">
                          <span className="text-sm font-semibold">
                            {" "}
                            Publication Date{" "}
                          </span>
                          : {publication.publishDate}
                        </p>
                        <p className="text-sm font-medium">
                          <span className="text-sm font-semibold "> URL</span> :{" "}
                          <a
                            href={
                              publication.URL.startsWith("http")
                                ? publication.URL
                                : `https://${publication.URL}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            {publication.URL}
                          </a>
                        </p>
                      </span>
                      <div className="flex ">
                        {hasEditAccess && (
                          <CiEdit
                            size={25}
                            color="#8970D6"
                            cursor={"pointer"}
                            onClick={() => onEdit(publication)}
                          />
                        )}
                        {hasEditAccess && (
                          <MdOutlineDeleteOutline
                            className="ml-2 danger-color"
                            size={25}
                            cursor={"pointer"}
                            onClick={() => onDelete(publication.id)}
                          />
                        )}
                      </div>
                    </div>
                    {data?.teacherPublications.length > 1 && <Divider />}
                  </div>
                )
              )
            ) : (
              <GenericCard>
                <Empty />
              </GenericCard>
            )}
          </>
        )}
      </GenericCard>
    </>
  );
};

export default Publication;
