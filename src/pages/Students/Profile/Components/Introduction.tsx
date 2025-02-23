import React, { useState } from "react";
import { Col, Divider, Form, Row, Skeleton } from "antd";
import IMAGES from "../../../../assets/images";
import Typography from "../../../../components/UI/Typography";
import { EditOutlined } from "@ant-design/icons";
import GenericModal from "../../../../components/UI/GenericModal";
import FormFieldGroup, {
	FieldProps,
} from "../../../../components/Form/FormFieldGroup";
import GenericUpload from "../../../../components/UI/GenericRoundUploader";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateStudentProfileMutation } from "../../../../redux/slices/student";
import { AuthResponseDTO } from "../../../Auth/type";
import useNotification from "../../../../components/UI/Notification";
import { setCredentials } from "../../../../redux/features/authSlice";
import {
	getUser,
	setUser,
	validatePhoneNumber,
} from "../../../../utils/helper";
import GenericCard from "../../../../components/UI/GenericCard";
import { FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import STRINGS from "../../../../utils/strings";
import { PhoneInput } from "react-international-phone";

interface AddModal {
	show: boolean;
	type: string;
}

const Introduction: React.FC = () => {
	const { openNotification, contextHolder } = useNotification();
	const [updateStudentProfile, { isLoading }] =
		useUpdateStudentProfileMutation();
	const { user } = useSelector((state: any) => state.auth);
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const handleFinish = async (values: AuthResponseDTO) => {
		const payload = {
			...values,
			role: user?.role,
		};
		const userId = user?.id;
		delete payload.email;

		try {
			await updateStudentProfile({ payload, userId })
				.unwrap()
				.then((response) => {
					const existingToken = getUser()?.access_token;
					const updatedUserData = { ...response, access_token: existingToken };
					setUser(updatedUserData as AuthResponseDTO);
					dispatch(setCredentials(updatedUserData));
				});
			openNotification({
				type: "success",
				description: "Updated Student Successfully",
			});
			// form.resetFields();
		} catch (error: unknown) {
			console.error("Error updating password:", error);
		}
		// };

		setAddModal({ show: false, type: "" });
	};

	const profileData = [
		{
			label: "Name",
			value: user?.fullName || "N/A",
		},
		{
			label: "Phone Number",
			value: user?.phoneNumber || "N/A",
		},
		{
			label: "Email",
			value: user?.email || "N/A",
		},
		{
			label: "Age",
			value: user?.age || "N/A",
		},
	];

	const ProfilefielldsConfig: FieldProps[] = [
		{
			type: "custom-component",
			label: "Profile Picture",
			name: "imageUrl",
			placeholder: "Upload Profile Picture",
			colSpan: 12,
			customComponent: <GenericUpload form={form} name="imageUrl" />,
		},
		{
			type: "input",
			label: "Name",
			name: "fullName",
			placeholder: "Enter Full Name",
			colSpan: 12,
			rules: [{ required: true, message: "Full name is required" }],
		},
		{
			type: "input",
			label: "Email",
			name: "email",
			disabled: true,
			placeholder: "Enter Email",
			colSpan: 12,
			rules: [{ required: true, message: "Please enter email" }],
		},
		// {
		// 	type: "input",
		// 	label: "CNIC",
		// 	name: "cnic",
		// 	placeholder: "Enter CNIC",
		// 	colSpan: 12,
		// 	rules: [{ required: true, message: "Cnic is required" }],
		// },
		{
			type: "custom-component",
			customComponent: (
				<Form.Item
					name="phoneNumber"
					rules={[
						{
							required: true,
							message: `${STRINGS.PHONE} is required`,
						},
						{ validator: validatePhoneNumber },
					]}
					// validateTrigger={["onBlur", "onSubmit", "onKeyPress"]}
					label="Mobile"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<PhoneInput
						defaultCountry="pk"
						// onChange={(phone) =>
						// 	form?.setFieldValue("phoneNumber", phone)
						// }
						className="custom-phone"
					/>
				</Form.Item>
			),
			label: "Mobile",
			name: "phoneNumber",
			// placeholder: "Enter Contact Number",
			colSpan: 12,
			// rules: [{ required: true, message: "Phone number is required" }],
		},
		{
			type: "number",
			label: "Age",
			name: "age",
			placeholder: "Enter Age",
			colSpan: 12,
		},
		{
			type: "input",
			label: "Facebook Profile Link",
			name: "facebookProfileLink",
			placeholder: "Enter Facebook Profile Link",
			colSpan: 12,
			rules: [
				{
					pattern: /^https?:\/\/.+$/,
					message: "Enter a valid URL starting with http or https.",
				},
			],
		},
		{
			type: "input",
			label: "Twitter Profile Link",
			name: "twitterProfileLink",
			placeholder: "Enter Twitter Profile Link",
			colSpan: 12,
			rules: [
				{
					pattern: /^https?:\/\/.+$/,
					message: "Enter a valid URL starting with http or https.",
				},
			],
		},
		{
			type: "input",
			label: "LinkedIn Profile Link",
			name: "linkedinProfileLink",
			placeholder: "Enter LinkedIn Profile Link",
			colSpan: 12,
			rules: [
				{
					pattern: /^https?:\/\/.+$/,
					message: "Enter a valid URL starting with http or https.",
				},
			],
		},
		{
			type: "textarea",
			label: "About",
			name: "describeYourSelf",
			placeholder: "Describe Yourself",
			colSpan: 24,
			colBreakPoints: { xs: 24, lg: 24, md: 24, sm: 24, xl: 24, xxl: 24 },
			rows: 4,
		},
	];

	const [addModal, setAddModal] = useState<AddModal>({ show: false, type: "" });

	const closeModal = () => {
		setAddModal({ show: false, type: "" });
	};

	const showModal = () => {
		setAddModal({ show: true, type: "Edit Profile" });
	};

	return (
		<>
			{contextHolder}
			<GenericCard noMargin={true}>
				<div className="flex justify-between mt-3 mb-5 ">
					<Typography variant="headingFour" className="">
						My Profile
					</Typography>
					<EditOutlined
						className="text-[1.5rem] text-[#8970D6] cursor-pointer"
						onClick={showModal}
					/>
				</div>

				{isLoading ? (
					<Skeleton
						avatar
						paragraph={{ rows: 4 }}
						active
						className="!w-full !h-[150px] custom-ant-skeleton"
					></Skeleton>
				) : (
					<Row gutter={[20, 0]} className="">
						<Col span={12} xs={24} sm={10} lg={12} xl={6} className="">
							<div className="flex justify-center items-center space-x-5">
								<img
									src={user?.imageUrl ? user?.imageUrl : IMAGES.FAULT_IMG}
									alt="Profile"
									className="w-32 h-32 sm:w-52  sm:h-52 object-cover rounded-full"
								/>
							</div>
							<div className="flex justify-center gap-5 mt-8">
								{user?.linkedinProfileLink && (
									<a
										href={user?.linkedinProfileLink || "#"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaLinkedin size={30} fill="#0077B5" />
									</a>
								)}

								{user?.facebookProfileLink && (
									<a
										href={user?.facebookProfileLink || "#"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaFacebook size={30} fill="#0065F7" />
									</a>
								)}

								{user?.twitterProfileLink && (
									<a
										href={user?.twitterProfileLink || "#"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaSquareXTwitter size={30} fill="#000000" />
									</a>
								)}
							</div>
						</Col>

						<Col span={12} sm={12} md={14} lg={12} xl={18}>
							<Row>
								{profileData?.map((item: any, index: any) => (
									<Col
										key={index}
										span={24}
										md={24}
										lg={24}
										xl={12}
										className="mt-5"
									>
										<Typography
											variant="bodyLargeMedium"
											className="!text-[#666666] text-xs sm:text-base"
										>
											{item?.label}
										</Typography>
										<Typography
											variant="bodyXLargeRegular"
											className="!text-[#333333] text-xs sm:text-base"
										>
											{item?.value || "N/A"}
										</Typography>
									</Col>
								))}
							</Row>
						</Col>
					</Row>
				)}

				<Divider />

				{isLoading ? (
					<Skeleton.Node active className="!w-full"></Skeleton.Node>
				) : (
					<div className="mt-5">
						<Typography variant="bodyLargeMedium" className="!text-[#666666]">
							Introduction
						</Typography>
						<Typography variant="bodyXLargeRegular" className="!text-[#333333]">
							{user?.describeYourSelf || "N/A"}
						</Typography>
					</div>
				)}

				<Form
					form={form}
					initialValues={{
						...user,
					}}
					onFinish={handleFinish}
				>
					<GenericModal
						onClose={closeModal}
						show={addModal.show}
						width={750}
						title={addModal.type === "Edit Profile" ? "Edit Profile" : ""}
						onOk={() => form.submit()}
					>
						{addModal.type === "Edit Profile" && (
							<div>
								<Row gutter={[24, 24]}>
									<Col span={24} className="mt-5">
										<FormFieldGroup fieldsConfig={ProfilefielldsConfig} />
									</Col>
								</Row>
							</div>
						)}
					</GenericModal>
				</Form>
			</GenericCard>
		</>
	);
};

export default Introduction;
