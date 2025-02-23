import { Col, Empty, Row } from "antd";
import { Attachment, Lecture } from "../../type";
import ReactPlayer from "react-player";
import { useState } from "react";
import GenericAccordion from "../../../../components/UI/GenericAccordion";
import { LuVideo } from "react-icons/lu";
import { FaImage, FaRegFilePdf } from "react-icons/fa6";

type CurriculumTreeProps = {
  lectures: Lecture[];
};

const CurriculumTree = ({ lectures }: CurriculumTreeProps) => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const getFileName = (url: string): string => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return decodeURIComponent(
      fileName.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, "")
    );
  };
  const getIconForFileType = (filePath: string) => {
    if (/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(filePath)) {
      return <LuVideo size={20} color="#FCAB60" />;
    } else if (/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(filePath)) {
      return <FaImage size={20} color="#FCAB60" />;
    } else {
      return <FaRegFilePdf size={20} color="#FCAB60" />;
    }
  };

  const transformData = (data: Lecture[]) => {
    return data.map((item: Lecture) => ({
      key: item.id,
      label: item.name,
      content: (
        <div>
          {item.attachments.map((attachment: Attachment) => {
            return (
              <a
                key={attachment?.filePath}
                href={attachment?.filePath}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFile(attachment.filePath);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#1677ff",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                  {getIconForFileType(attachment.filePath)}
                </span>
                {getFileName(attachment.filePath)}
              </a>
            );
          })}
        </div>
      ),
    }));
  };

  const renderContent = () => {
    if (selectedFile) {
      return (
        <Col xl={14} xxl={14} lg={12} md={24} xs={24}>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>

          {/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(selectedFile) ? (
            <ReactPlayer
              url={selectedFile}
              className="!w-full"
              controls={true}
            />
          ) : /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(selectedFile) ? (
            <img
              src={selectedFile}
              alt="Preview"
              style={{ width: "100%", height: "auto", border: "none" }}
            />
          ) : (
            <iframe
              src={`${selectedFile}#toolbar=0&view=FitH`}
              style={{
                width: "100%",
                height: "70vh",
                border: "none",
                background: "transparent",
              }}
              title="Document Viewer"
            />
          )}
        </Col>
      );
    }

    return null;
  };

  return (
    <Row gutter={52} className="p-6 rounded-lg">
      <Col xl={10} xxl={10} lg={12} md={24} xs={24}>
        {lectures?.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Curriculum Content</h2>

            <GenericAccordion items={transformData(lectures)} />
          </>
        ) : (
          <div className="mt-10">
            <Empty />
          </div>
        )}
      </Col>
      {renderContent()}
    </Row>
  );
};

export default CurriculumTree;
