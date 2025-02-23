import { Col, Form, Row } from "antd";
import Typography from "../../../components/UI/Typography";
import GenericModal from "../../../components/UI/GenericModal";
import { useEffect, useState } from "react";
import FormFieldGroup, {
	FieldProps,
} from "../../../components/Form/FormFieldGroup";
import Introduction from "./Components/Introduction";
import { useDispatch, useSelector } from "react-redux";
import { LOOKUP_TYPES } from "../../../utils/lookup";
import GenericCard from "../../../components/UI/GenericCard";
import PageLoader from "../../../components/Loader/PageLoader";
import { useParams } from "react-router-dom";
import GenericUpload from "../../../components/UI/GenericRoundUploader";
import {
	useDeletePublicationMutation,
	useGetTeacherByIdQuery,
	useSaveCertificationMutation,
	useSavePublicationMutation,
	useSaveQualificationMutation,
	useUpdateCertificationMutation,
	useUpdatePublicationMutation,
	useUpdateQualificationMutation,
} from "../../../redux/slices/teacher";
import dayjs from "dayjs"; // Import dayjs
import Publication from "./Components/publication";
import { FULL_DATE_FORMAT, ItemType } from "../../../utils/constants";
import { getErrorMessage, getUser, setUser } from "../../../utils/helper";
import { AuthResponseDTO } from "../../Auth/type";
import { setCredentials } from "../../../redux/features/authSlice";
import useNotification from "../../../components/UI/Notification";
import {
	Certification as CertificationType,
	Publication as PublicationType,
	Qualification as QualificationType,
} from "./Components/TeacherTypes";
import { useUpdateUserProfileMutation } from "../../../redux/slices/user";
import Certifications from "./Components/certification";
import Qualifications from "./Components/qualification";
import PublishedContent from "../../Courses/List/Published/Index";

interface addModal {
	show: boolean;
	type: string;
	action: string;
	selectedData?: any;
}

const Index = () => {
	const { user } = useSelector((state: any) => state.auth);
	const { id }: any = useParams();
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [isPresent, setIsPresent] = useState<boolean>(false);
	const [formRerender, setFormRerender] = useState<boolean>(false);
	const { openNotification, contextHolder } = useNotification();
	const hasEditAccess =
		user &&
		(user.role === LOOKUP_TYPES.Role.TEACHER ||
			user.role === LOOKUP_TYPES.Role.TEACHING_ASSISTANT);

	const { data, isLoading, isFetching } = useGetTeacherByIdQuery(id);
	//save queries
	const [saveCertification] = useSaveCertificationMutation();
	const [savePublication] = useSavePublicationMutation();
	const [saveQualification] = useSaveQualificationMutation();

	//edit queries

	const [updateQualification] = useUpdateQualificationMutation();
	const [updateCertification] = useUpdateCertificationMutation();
	const [updatePublication] = useUpdatePublicationMutation();

	//update profile
	const [updateUserProfile] = useUpdateUserProfileMutation();

	//delete teacher profile

	useDeletePublicationMutation();
	const handleAdd = (type: string, action: string) => {
		setaddmodal({ show: true, type, action });
	};
	const handleEdit = (type: string, action: string, selectedData: any) => {
		setaddmodal({ show: true, type, action, selectedData }); // Store id in modal state if needed
	};

	const [addmodal, setaddmodal] = useState<addModal>({
		show: false,
		type: "",
		action: "",
		selectedData: null, // Add `id` field to store the certificate ID
	});

	const closeModal = () => {
		setaddmodal({ show: false, type: "", action: "", selectedData: null });
		form.resetFields();
	};
	//Publication Fields
	const PublicationFielldsConfig: FieldProps[] = [
		{
			type: "input",
			label: "Title",
			name: "Title",
			placeholder: "Enter Title",
			rules: [
				{ required: true, message: "Please enter Title", whitespace: true },
			],
		},
		{
			type: "input",
			label: "Journal",
			name: "Journal",
			placeholder: "Enter brief description",

			rules: [
				{ required: true, message: "Please enter Journal", whitespace: true },
			],
		},
		{
			type: "datepicker",
			label: "Publish Date",
			name: "publishDate",
			placeholder: "Enter Publish Date",

			rules: [
				{ required: true, message: "Enter Publish Date" },
				{ type: "date", message: "Please enter a valid date" },
			],
		},
		{
			type: "input",
			label: "URL",
			name: "URL",
			placeholder: "Enter link",

			rules: [
				{ required: true, message: "Please enter URL", whitespace: true },
			],
		},
	];

	const CertificationFielldsConfig: FieldProps[] = [
		{
			type: "input",
			label: "Certificate Title",
			name: "certificateTitle",
			placeholder: "Enter Certificate Title",
			rules: [
				{
					required: true,
					message: "Please enter certificate title",
					whitespace: true,
				},
			],
		},
		{
			type: "input",
			label: "Issued By",
			name: "issuer",
			placeholder: "Enter Issuer Name",
			rules: [{ required: true, message: "Enter Institute", whitespace: true }],
		},
		{
			type: "datepicker",
			label: "Certification Date",
			name: "certificationDate",
			placeholder: "Enter Certificate Issue Date",
			rules: [
				{ required: true, message: "Enter Issue Date" },
				{
					type: "date",
					message: "Please enter a valid date",
				},
			],
		},
		{
			type: "custom-component",
			label: "Certificate PDF",
			name: "uploadedDocument",
			placeholder: "Upload Certificate PDF",
			customComponent: (
				<GenericUpload form={form} name="uploadedDocument" uploadType="doc" />
			),
		},
	];

	const QualificationFielldsConfig: FieldProps[] = [
		{
			type: "input",
			label: "Enter Institute",
			name: "Institute",
			placeholder: "Enter Institute Name",
			rules: [
				{
					required: true,
					message: "Please enter Institute name",
					whitespace: true,
				},
			],
			colSpan: 24,
		},
		{
			type: "input",
			label: "Degree",
			name: "Degree",
			placeholder: "Enter Degree Name",
			colSpan: 24,
			rules: [{ required: true, message: "Enter Degree", whitespace: true }],
		},
		{
			type: "datepicker",
			label: "Starting Date (YYYY - MM)",
			picker: "month",
			name: "startingDate",
			colSpan: 12,
			placeholder: "Starting Date",
			rules: [
				{ required: true, message: "Enter Issue Starting Date" },
				{
					type: "date",
					message: "Please enter a valid Starting Date",
				},
			],
		},
		{
			type: "datepicker",
			label: "Ending Date (YYYY - MM)",
			colSpan: 12,
			picker: "month",
			name: "endingDate",
			placeholder: "Ending Date",
			rules: [
				{ required: !isPresent, message: "Please enter a valid date" },
				{
					type: "date",
					message: "Please enter a valid date",
				},
				{
					validator: (_rule, value, callback) => {
						const startingDate = form.getFieldValue("startingDate");
						if (
							value &&
							startingDate &&
							dayjs(value).isBefore(dayjs(startingDate))
						) {
							callback("Ending Date should be after Starting Date");
						} else {
							callback();
						}
					},
				},
			],
			disabled: isPresent, // Disable field if `isPresent` is true
		},
		{
			type: "checkbox",
			label: "Present",
			name: "isPresent",
			colSpan: 12,
			// @ts-ignore
			onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
				setIsPresent(e.target.checked), // Update `isPresent` state
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

			rules: [
				{ required: true, message: "Full name is required", whitespace: true },
			],
		},
		{
			type: "input",
			label: "Email",
			name: "email",
			disabled: true,
			placeholder: "Enter Email",
			colSpan: 12,
		},
		{
			type: "input",
			label: "Address",
			name: "address",
			placeholder: "Enter Address",
			colSpan: 12,
			rules: [
				{ required: true, message: "Address is required", whitespace: true },
			],
		},
		{
			type: "input",
			label: "CNIC",
			name: "cnic",
			placeholder: "Enter CNIC",
			colSpan: 12,

			rules: [
				{ required: true, message: "Cnic is rewuired", whitespace: true },
			],
		},

		{
			type: "input",
			label: "Mobile",
			name: "phoneNumber",
			placeholder: "Enter Contact Number",
			colSpan: 12,

			rules: [
				{
					pattern: /^https?:\/\/.+$/,
					message: "Enter a valid URL starting with http or https.",
				},
			],
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
			type: "input",
			label: "Twitter Profile Link",
			name: "twitterProfileLink",
			placeholder: "Enter Twitter Profile Link",
			colSpan: 12,
			rules: [
				{
					pattern:
						/^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/?$/,
					message: "Enter a valid Twitter profile link.",
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

	const SaveTeacherInfo = async (values: any) => {
		try {
			let response;
			if (addmodal.type === ItemType.CERTIFICATION) {
				if (values?.certificationDate) {
					values.certificationDate = dayjs(values.certificationDate).format(
						FULL_DATE_FORMAT
					);
				}
				response = await saveCertification(values);
				openNotification({
					type: "success",
					description: "Certification Saved Successfully",
				});
				closeModal();
			} else if (addmodal.type === ItemType.PUBLICATION) {
				if (values?.publishDate) {
					values.publishDate = dayjs(values.publishDate).format(
						FULL_DATE_FORMAT
					);
				}
				response = await savePublication(values);
				openNotification({
					type: "success",
					description: "Publication Saved Successfully",
				});
				closeModal();
			} else if (addmodal.type === ItemType.QUALIFICATION) {
				const payload = { ...values };
				delete payload.isPresent;
				if (payload?.startingDate) {
					payload.startingDate = dayjs(payload.startingDate).format(
						FULL_DATE_FORMAT
					);
				}
				if (payload?.endingDate) {
					payload.endingDate = dayjs(payload.endingDate).format(
						FULL_DATE_FORMAT
					);
				}
				response = await saveQualification(payload);
				openNotification({
					type: "success",
					description: "Qualification Saved Successfully",
				});
				closeModal();
			}

			console.log("response:::", response);
		} catch (error: unknown) {
			console.log("error:::", error);
		}
	};
	const UpdateTeacherInfo = async (values: any) => {
		const payload = { ...values };
		const id = addmodal?.selectedData?.id;

		try {
			let response;

			if (addmodal.type === ItemType.CERTIFICATION) {
				try {
					if (payload?.certificationDate) {
						payload.certificationDate = dayjs(payload.certificationDate).format(
							FULL_DATE_FORMAT
						);
					}
					response = await updateCertification({ payload, id });
					openNotification({
						type: "success",
						description: "Certification Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.PUBLICATION) {
				// Modify payload for publication type
				if (payload?.publishDate) {
					payload.publishDate = dayjs(payload.publishDate).format(
						FULL_DATE_FORMAT
					);
				}
				try {
					response = await updatePublication({ payload, id });
					openNotification({
						type: "success",
						description: "Publication Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.QUALIFICATION) {
				try {
					if (payload?.startingDate) {
						payload.startingDate = dayjs(payload.startingDate).format(
							FULL_DATE_FORMAT
						);
					}
					if (payload?.endingDate) {
						payload.endingDate = dayjs(payload.endingDate).format(
							FULL_DATE_FORMAT
						);
					}
					response = await updateQualification({ payload, id });
					openNotification({
						type: "success",
						description: "Qualification Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.PROFILE) {
				const userId = user?.id;
				delete payload.email;

				try {
					await updateUserProfile({ payload, userId })
						.unwrap()
						.then((response) => {
							const existingToken = getUser()?.access_token;
							const updatedUserData = {
								...response,
								access_token: existingToken,
							};
							delete updatedUserData.password;

							setUser(updatedUserData as AuthResponseDTO);
							dispatch(setCredentials(updatedUserData));
							openNotification({
								type: "success",
								description: "Teacher Profile Updated Successfully",
							});
							closeModal();
							form.resetFields();
						});
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			}

			console.log("response:::", response);
		} catch (error: unknown) {
			console.log("error:::", error);
		}
	};
	const deleteTeacherInfo = async (values: any) => {
		const payload = { ...values };
		const id = addmodal?.selectedData?.id;

		try {
			let response;

			if (addmodal.type === ItemType.CERTIFICATION) {
				try {
					response = await updateCertification({ payload, id });
					openNotification({
						type: "success",
						description: "Certification Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.PUBLICATION) {
				try {
					response = await updatePublication({ payload, id });
					openNotification({
						type: "success",
						description: "Publication Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.QUALIFICATION) {
				try {
					response = await updateQualification({ payload, id });
					openNotification({
						type: "success",
						description: "Qualification Updated Successfully",
					});
					closeModal();
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			} else if (addmodal.type === ItemType.PROFILE) {
				const userId = user?.id;

				try {
					await updateUserProfile({ payload, userId })
						.unwrap()
						.then((response) => {
							const existingToken = getUser()?.access_token;
							const updatedUserData = {
								...response,
								access_token: existingToken,
							};
							delete updatedUserData.password;
							setUser(updatedUserData as AuthResponseDTO);
							dispatch(setCredentials(updatedUserData));
							openNotification({
								type: "success",
								description: "Teacher Profile Updated Successfully",
							});
							closeModal();
						});
				} catch (error: any) {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			}

			console.log("response:::", response);
		} catch (error: unknown) {
			console.log("error:::", error);
		}
	};

	const handleFormFinish = async (values: any) => {
		if (addmodal.action === "save") {
			SaveTeacherInfo(values);
		} else if (addmodal.action === "edit") {
			UpdateTeacherInfo(values);
		} else {
			deleteTeacherInfo(values);
		}
	};
	console.log("Title::::", data);
	useEffect(() => {
		if (addmodal?.selectedData) {
			form.setFieldsValue({
				certificateTitle: addmodal?.selectedData?.certificateTitle,
				uploadedDocument: addmodal?.selectedData?.uploadedDocument,
				issuer: addmodal?.selectedData?.issuer,
				certificationDate: addmodal?.selectedData?.certificationDate
					? dayjs(addmodal.selectedData.certificationDate) // Convert to dayjs object
					: null,
				Title: addmodal?.selectedData?.Title,
				Journal: addmodal?.selectedData?.Journal,
				URL: addmodal?.selectedData?.URL,
				publishDate: addmodal?.selectedData?.publishDate
					? dayjs(addmodal.selectedData.publishDate) // Convert to dayjs object
					: null,
				Institute: addmodal?.selectedData?.Institute,
				Degree: addmodal?.selectedData?.Degree,
				startingDate: addmodal?.selectedData?.startingDate
					? dayjs(addmodal.selectedData.startingDate) // Convert to dayjs object
					: null,
				endingDate: addmodal?.selectedData?.endingDate
					? dayjs(addmodal.selectedData.endingDate) // Convert to dayjs object
					: null,
				fullName: data?.fullName,
				imageUrl: data?.imageUrl,
				email: data?.email,
				address: data?.address,
				cnic: data?.cnic,
				phoneNumber: data?.phoneNumber,
				age: data?.age,
				facebookProfileLink: data?.facebookProfileLink,
				linkedinProfileLink: data?.linkedinProfileLink,
				twitterProfileLink: data?.twitterProfileLink,
				describeYourSelf: data?.describeYourSelf,
			});
			setFormRerender(!formRerender);
		}
	}, [addmodal?.selectedData, form]);
	const published = PublishedContent();

	// const videoData = [
	//   {
	//     id: 1,
	//     title: "Web Development",
	//     views: "23456",
	//     likes: "12k",
	//     imageSrc: IMAGES.SAMPLE_WEB,
	//   },
	//   {
	//     id: 2,
	//     title: "Data Science",
	//     views: "15000",
	//     likes: "10k",
	//     imageSrc: IMAGES.SAMPLE_WEB,
	//   },
	//   {
	//     id: 3,
	//     title: "Machine Learning",
	//     views: "30000",
	//     likes: "20k",
	//     imageSrc: IMAGES.SAMPLE_WEB,
	//   },
	// ];

	// const courseData = Array.from({ length: 6 }, (_, index) => ({
	//   id: index,
	//   title: "Webflow 101 Crash Course",
	//   category: "DESIGNING",
	//   imageSrc: IMAGES.SAMPLE_WEB,
	//   videosCount: 33,
	//   rating: 4,
	//   reviewsCount: 8964,
	//   price: "$12.99",
	//   isHotRating: true,
	// }));

	return isLoading || isFetching ? (
		<PageLoader />
	) : (
		<>
			{contextHolder}
			<Row gutter={32}>
				<Introduction
					onAdd={() => handleAdd(ItemType.PROFILE, "save")}
					onEdit={(selectedData: any) =>
						handleEdit(ItemType.PROFILE, "edit", selectedData)
					}
					hasEditAccess={hasEditAccess}
					data={data}
				/>

				<Col span={24} sm={24} md={24} lg={14} xl={16} className="mt-4">
					<Publication
						onAdd={() => handleAdd(ItemType.PUBLICATION, "save")}
						onEdit={(selectedData: PublicationType) =>
							handleEdit(ItemType.PUBLICATION, "edit", selectedData)
						}
						hasEditAccess={hasEditAccess}
						data={data}
						isLoading={isLoading || isFetching}
					/>

					<Certifications
						onAdd={() => handleAdd(ItemType.CERTIFICATION, "save")}
						onEdit={(selectedData: CertificationType) =>
							handleEdit(ItemType.CERTIFICATION, "edit", selectedData)
						}
						hasEditAccess={hasEditAccess}
						isLoading={isLoading || isFetching}
						data={data}
					/>

					<Qualifications
						onAdd={() => handleAdd(ItemType.QUALIFICATION, "save")}
						onEdit={(selectedData: QualificationType) =>
							handleEdit(ItemType.QUALIFICATION, "edit", selectedData)
						}
						hasEditAccess={hasEditAccess}
						data={data}
						isLoading={isLoading || isFetching}
					/>
				</Col>
			</Row>

			<Row gutter={[24, 24]} className="mt-10">
				<Col span={18} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Typography variant="headingFour" className="mb-5">
						Courses
					</Typography>

					<GenericCard>
						<div className="mt-10">{published.gridContent}</div>
					</GenericCard>
				</Col>

				{/* <Col span={6} xs={24} sm={24} md={24} lg={24} xl={6} xxl={7}>
          <Typography variant="headingFour" className="">
            Most Viewed Videos
          </Typography>
          {data?.viewedVideos ? (
            data?.viewedVideos?.map((item: any) => (
              <Card
                key={item.id}
                imageSrc={item.imageSrc}
                views={item.views}
                likes={item.likes}
                title={item.title}
                className="mt-5"
              />
            ))
          ) : (
            <GenericCard>
              <Empty />
            </GenericCard>
          )}
        </Col> */}
			</Row>
			<Form
				// initialValues={{
				//   ...data,
				// }}
				form={form}
				onFinish={(values) => console.log(values, "values")}
			>
				<GenericModal
					onClose={closeModal}
					onOk={() => form.validateFields().then(handleFormFinish)}
					show={addmodal.show}
					title={
						addmodal.type === ItemType.PUBLICATION
							? addmodal.action === "save"
								? "Add Publication"
								: "Edit Publication"
							: addmodal.type === ItemType.CERTIFICATION
								? addmodal.action === "save"
									? "Add Certification"
									: "Edit Certification"
								: addmodal.type === ItemType.QUALIFICATION
									? addmodal.action === "save"
										? "Add Qualification"
										: "Edit Qualification"
									: addmodal.type === ItemType.PROFILE
										? addmodal.action === "save"
											? "Add Profile"
											: "Edit Profile"
										: ""
					}
					// width={600}
					width={addmodal.type === "profile" ? 750 : 600}
				>
					{addmodal.type === ItemType.PUBLICATION && (
						<div>
							<Row gutter={[24, 24]}>
								<Col span={24}>
									<FormFieldGroup
										fieldsConfig={PublicationFielldsConfig}
										fieldsColSpan={24}
									/>
								</Col>
							</Row>
						</div>
					)}
					{addmodal.type === ItemType.CERTIFICATION && (
						<div>
							<Row gutter={[24, 24]}>
								<Col span={24}>
									<FormFieldGroup
										fieldsConfig={CertificationFielldsConfig}
										fieldsColSpan={24}
									/>
								</Col>
							</Row>
						</div>
					)}
					{addmodal.type === ItemType.QUALIFICATION && (
						<div>
							<Row gutter={[24, 24]}>
								<Col span={24}>
									<FormFieldGroup fieldsConfig={QualificationFielldsConfig} />
								</Col>
							</Row>
						</div>
					)}
					{addmodal.type === ItemType.PROFILE && (
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
		</>
	);
};

export default Index;
