import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  RiTimeZoneFill } from "react-icons/ri";
import GenericButton from "../../components/UI/GenericButton";

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const ViewZone: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFleet = location.state;

    useEffect(() => {
        if (!selectedFleet) {
            navigate("/zone/list");
        }
    }, [selectedFleet, navigate]);

    const handleBack = () => {
        navigate("/zone/list");
    };

    if (!selectedFleet) return null;

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
                                    {selectedFleet.make} {selectedFleet.model}
                                </h1>
                                <div className="flex items-center mt-2">
                                    {/* <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        selectedFleet.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        selectedFleet.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        
                                        <BiCheckCircle className="h-4 w-4 mr-1" />
                                        {selectedFleet.status}
                                    </span> */}
                                    <span className="text-white/80 ml-3">{selectedFleet.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                           
                            <InfoItem
                                icon={<RiTimeZoneFill className="h-5 text-customGreen w-5" />}
                                label="Zone Name"
                                value={` ${selectedFleet.name}`}
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

export default ViewZone;