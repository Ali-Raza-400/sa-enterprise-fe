import React, { useEffect } from "react";
import { Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../redux/slices/user";
// import GenericButton from "../../../components/UI/GenericButton";
import { BiCheckCircle, BiUserCircle } from "react-icons/bi";
import { PiMailboxDuotone, PiMailboxFill, PiUsersFill } from "react-icons/pi";
import { FaArrowLeft, FaCreditCard, FaMapPin } from "react-icons/fa";
import { FaPhoneFlip, FaRegCircleUser } from "react-icons/fa6";
import GenericButton from "../../../components/UI/GenericButton";


const ViewUser: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedUser = location.state;
    const [_updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (!selectedUser) {
            navigate("/user/list");
        }
    }, [selectedUser, navigate]);

    const handleBack = () => {
        navigate("/user/list");
    };

    if (!selectedUser) return null;

    interface InfoItemProps {
        icon: React.ReactNode;
        label: string;
        value: string;
    }
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
                                <BiUserCircle className="w-16 h-16 text-white" />
                            </div>
                            <div className="ml-6">
                                <h1 className="text-2xl font-bold text-white">
                                    {selectedUser?.first_name} {selectedUser.last_name}
                                </h1>
                                <div className="flex items-center mt-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <BiCheckCircle className="w-4 h-4 mr-1" />
                                        Active
                                    </span>
                                    <span className="ml-3 text-white/80">{selectedUser.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InfoItem
                                icon={<PiUsersFill className="w-5 h-5 text-purple-600" />}
                                label="Full Name"
                                value={`${selectedUser.first_name} ${selectedUser.last_name}`}
                            />
                            <InfoItem
                                icon={<PiMailboxDuotone className="w-5 h-5 text-purple-600" />}
                                label="Email"
                                value={selectedUser.email}
                            />
                            <InfoItem
                                icon={<FaMapPin className="w-5 h-5 text-purple-600" />}
                                label="Address"
                                value={selectedUser.address || "N/A"}
                            />
                            <InfoItem
                                icon={<FaPhoneFlip className="w-5 h-5 text-purple-600" />}
                                label="Phone Number"
                                value={selectedUser.phone_number}
                            />
                            <InfoItem
                                icon={<FaCreditCard className="w-5 h-5 text-purple-600" />}
                                label="CNIC Number"
                                value={selectedUser.cnic_number}
                            />
                            <InfoItem
                                icon={<FaRegCircleUser className="w-5 h-5 text-purple-600" />}
                                label="Role"
                                value={selectedUser.role}
                            />
                        </div>
                        <div className="mb-0">
                            <div style={{ textAlign: "center", marginTop: 20, display:"flex", justifyContent:"end" }}>
                                <GenericButton
                                    variant="solid"
                                   onClick={()=>handleBack()}
                                    label="Back"
                                    disabled={isLoading}
                                    loading={isLoading}
                                    style={{
                                        height: 44,
                                        minWidth: 120,
                                        background: "#722ED1",
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
        </div>
    );
};

export default ViewUser;

