import { FaPlus } from "react-icons/fa6";
import GenericButton from "../../../../components/UI/GenericButton";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";
import { CiEdit } from "react-icons/ci";
import { Divider, Empty } from "antd";
import { Certification, TeacherData } from "./TeacherTypes";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import { useDeleteCertificationMutation } from "../../../../redux/slices/teacher";
import useNotification from "../../../../components/UI/Notification";
import { MdOutlineDeleteOutline } from "react-icons/md";
import PageLoader from "../../../../components/Loader/PageLoader";

interface CertificationProps {
  onAdd: () => void;
  onEdit: (certificate: Certification) => void;
  hasEditAccess: boolean;
  data: TeacherData;
  isLoading: boolean;
}

const Certifications: React.FC<CertificationProps> = ({
  onAdd,
  onEdit,
  hasEditAccess,
  data,
  isLoading,
}) => {
  console.log("data:::", data);
  const { showAlert } = useGenericAlert();
  const [deleteCertification, { isLoading: deleteLoading }] =
    useDeleteCertificationMutation();
  const { openNotification, contextHolder } = useNotification();
  //   const profile = {
  //     certifications: [
  //       {
  //         title: "Certified Data Scientist",
  //         issuer: "Xeven Solutions",
  //         issuedDate: "15-11-2018",
  //       },
  //       {
  //         title: "Certified Web Developer",
  //         issuer: "Xeven Solutions",
  //         issuedDate: "15-11-2018",
  //       },
  //     ],
  //   };

  const onDelete = async (id: string) => {
    console.log("id::::", id);
    showAlert({
      type: "question",
      title: `Delete Certification Confirmation`,
      message: `Are you sure you want to delete this Certification? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        await deleteCertification(id).then(() => {
          openNotification({
            type: "success",
            title: "The Certification has been deleted successfully.",
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
          Certificates
        </Typography>

        {hasEditAccess && (
          <GenericButton
            icon={<FaPlus />}
            label="Add"
            variant="outlined"
            color="default"
            onClick={onAdd}
          ></GenericButton>
        )}
      </div>

      <GenericCard className="space-y-3">
        {isLoading || deleteLoading ? (
          <PageLoader />
        ) : (
          <>
            {data?.teacherCertifications.length > 0 ? (
              data.teacherCertifications.map(
                (certificate: Certification, index: number) => (
                  <div key={index}>
                    <div className=" flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        Title :{" "}
                        <span className="text-sm font-medium">
                          {certificate.certificateTitle}
                        </span>
                        <p className="text-sm font-normal">
                          <span className="text-sm font-semibold">
                            Issued By{" "}
                          </span>{" "}
                          :
                          <span className="text-sm font-medium">
                            {" "}
                            {certificate.issuer}
                          </span>
                        </p>
                        <p className="text-sm font-normal">
                          <span className="text-sm font-semibold">
                            Issued Date{" "}
                          </span>{" "}
                          :
                          <span className="text-sm font-medium">
                            {" "}
                            {certificate.certificationDate}
                          </span>
                        </p>
                        {certificate?.uploadedDocument && (
                          <div className="flex items-center">
                            <span className="text-sm font-semibold">
                              Document :{" "}
                            </span>
                            <div className="relative ml-4 text-sm font-medium text-blue-600">
                              <p
                                className="underline"
                                style={{ cursor: "pointer", color: "inherit" }}
                              >
                                {certificate?.uploadedDocument &&
                                  certificate.uploadedDocument.substring(
                                    certificate.uploadedDocument.lastIndexOf(
                                      "/"
                                    ) + 1
                                  )}
                              </p>

                              <a
                                href={certificate?.uploadedDocument}
                                target="_blank"
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                  display: "block",
                                  backgroundColor: "rgba(0, 0, 0, 0)", // Transparent overlay
                                }}
                              ></a>
                            </div>
                          </div>
                        )}
                      </span>
                      <div className="flex ">
                        {hasEditAccess && (
                          <CiEdit
                            size={25}
                            color="#8970D6"
                            cursor={"pointer"}
                            onClick={() => onEdit(certificate)}
                          />
                        )}
                        {hasEditAccess && (
                          <MdOutlineDeleteOutline
                            className="ml-2 danger-color"
                            size={25}
                            cursor={"pointer"}
                            onClick={() => onDelete(certificate.id)}
                          />
                        )}
                      </div>
                    </div>
                    {data?.teacherCertifications.length > 1 && <Divider />}
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

export default Certifications;
