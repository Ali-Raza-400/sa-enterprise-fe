import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiTimeZoneFill } from "react-icons/ri";
import GenericButton from "../../components/UI/GenericButton";
import PATH from "../../navigation/Path";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const Viewproject: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProject = location.state;

  useEffect(() => {
    if (!selectedProject) {
      navigate(PATH.MANAGE_PROJECT);
    }
  }, [selectedProject, navigate]);

  const handleBack = () => {
    navigate(PATH.MANAGE_PROJECT);
  };

  if (!selectedProject) return null;

  function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
      <div className="flex bg-gray-50 p-4 rounded-lg items-start space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-gray-900 text-sm mt-1">{value}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-customGreen px-6 py-8 to-customGreen">
            <div className="flex items-center">
              <div className="bg-white/10 p-4 rounded-full">
                <RiTimeZoneFill className="h-16 text-white w-16" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl text-white font-bold">
                  {selectedProject.city} {selectedProject.name}
                </h1>
                <div className="flex items-center mt-2">
                  <span className="text-white/80 ml-3">
                    {selectedProject.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoItem
                icon={<RiTimeZoneFill className="h-5 text-customGreen w-5" />}
                label="Zone Name"
                value={` ${selectedProject.name}`}
              />
            </div>
            <div className="flex justify-end mt-6">
              <GenericButton
                variant="solid"
                onClick={handleBack}
                label="Back"
                style={{
                  height: 44,
                  minWidth: 120,
                  background: "#1890ff",
                  color: "white",
                  borderRadius: 6,
                  fontWeight: 500,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewproject;
