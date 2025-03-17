import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import { FaCar, FaIdCard, FaRegCalendarAlt, FaUserTie, FaUserAlt } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { RiCarLine } from "react-icons/ri";
import GenericButton from "../../components/UI/GenericButton";

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

const ViewFleet: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFleet = location.state;

    useEffect(() => {
        if (!selectedFleet) {
            navigate("/fleet/list");
        }
    }, [selectedFleet, navigate]);

    const handleBack = () => {
        navigate("/fleet/list");
    };

    if (!selectedFleet) return null;

    function InfoItem({ icon, label, value }: InfoItemProps) {
        return (
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">{icon}</div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="mt-1 text-sm text-gray-900">{value}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8">
                        <div className="flex items-center">
                            <div className="bg-white/10 rounded-full p-4">
                                <RiCarLine className="w-16 h-16 text-white" />
                            </div>
                            <div className="ml-6">
                                <h1 className="text-2xl font-bold text-white">
                                    {selectedFleet.make} {selectedFleet.model}
                                </h1>
                                <div className="flex items-center mt-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        selectedFleet.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        selectedFleet.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        <BiCheckCircle className="w-4 h-4 mr-1" />
                                        {selectedFleet.status}
                                    </span>
                                    <span className="ml-3 text-white/80">Fleet #{selectedFleet.fleet_number}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem
                                icon={<FaCar className="w-5 h-5 text-purple-600" />}
                                label="Vehicle"
                                value={`${selectedFleet.make} ${selectedFleet.model} (${selectedFleet.year})`}
                            />
                            <InfoItem
                                icon={<FaIdCard className="w-5 h-5 text-purple-600" />}
                                label="VIN"
                                value={selectedFleet.vin}
                            />
                            <InfoItem
                                icon={<TbLicense className="w-5 h-5 text-purple-600" />}
                                label="License Plate"
                                value={selectedFleet.license_plate}
                            />
                            <InfoItem
                                icon={<RiCarLine className="w-5 h-5 text-purple-600" />}
                                label="Fleet Type"
                                value={selectedFleet.fleet_type}
                            />
                            <InfoItem
                                icon={<FaRegCalendarAlt className="w-5 h-5 text-purple-600" />}
                                label="Year"
                                value={selectedFleet.year}
                            />
                            <InfoItem
                                icon={<BiCheckCircle className="w-5 h-5 text-purple-600" />}
                                label="Status"
                                value={selectedFleet.status}
                            />
                            <InfoItem
                                icon={<FaUserTie className="w-5 h-5 text-purple-600" />}
                                label="Supervisor"
                                value={selectedFleet.supervisor_name}
                            />
                            <InfoItem
                                icon={<FaUserAlt className="w-5 h-5 text-purple-600" />}
                                label="Driver"
                                value={selectedFleet.driver_name}
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
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

export default ViewFleet;