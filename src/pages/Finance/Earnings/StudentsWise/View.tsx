import { Col, Divider, Empty, Pagination, Row, Skeleton } from "antd";
import GenericCard from "../../../../components/UI/GenericCard";
import IMAGES from "../../../../assets/images";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import Typography from "../../../../components/UI/Typography";
import { useGetTeacherStudentProfileQuery } from "../../../../redux/slices/teacher";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "../../../Courses/Shared/CourseCard";

const View = () => {
	const { id } = useParams();
	const [tableOptions, setTableOptions] = useState({
		filters: { studentId: id },
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
	const { data, isLoading, isFetching } = useGetTeacherStudentProfileQuery({
		tableOptions,
	});
	//   console.log(data, "TEACHER SEE PROFILE STUDENT");

	const studentData = data?.list?.[0]?.student;
	//   console.log(studentData);
	const profileData = [
		{
			label: "Name",
			value: studentData?.fullName || "N/A",
		},
		{
			label: "Phone Number",
			value: studentData?.phoneNumber || "N/A",
		},
		{
			label: "Cnic",
			value: studentData?.cnic || "N/A",
		},
		{
			label: "Age",
			value: studentData?.age || "N/A",
		},

		{
			label: "Email",
			value: studentData?.email || "N/A",
		},
	];
	return (
		<>
			{isLoading || isFetching ? (
				<Skeleton.Node active className="!w-full !h-[360px]" />
			) : (
				<GenericCard noMargin={true} className="!pb-8">
					<Row gutter={60} className="">
						<Col
							span={6}
							sm={10}
							md={10}
							lg={8}
							xl={6}
							xxl={4}
							className=" mt-5"
						>
							<div>
								<img
									src={studentData?.imageUrl || IMAGES.FAULT_IMG}
									alt="description"
									className="w-52 h-52 object-cover rounded-full border"
								/>
							</div>

							<div className="flex justify-evenly mt-8">
								{studentData?.linkedinProfileLink && (
									<a
										href={studentData?.linkedinProfileLink || "No page found"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaLinkedin size={30} fill="#0077B5" />
									</a>
								)}

								{studentData?.facebookProfileLink && (
									<a
										href={studentData?.facebookProfileLink || "No page found"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaFacebook size={30} fill="#0065F7" />
									</a>
								)}

								{studentData?.twitterProfileLink && (
									<a
										href={studentData?.twitterProfileLink || "No page found"}
										target="_blank"
										rel="noopener noreferrer"
										className=""
									>
										<FaSquareXTwitter size={30} fill="#000000" />
									</a>
								)}
							</div>
						</Col>

						<Col span={24} sm={24} md={14} lg={16} xl={18}>
							<Row>
								{profileData?.map((item: any, index: any) => (
									<Col
										key={index}
										span={24}
										md={12}
										lg={8}
										xl={8}
										className="mt-5"
									>
										<Typography
											variant="bodyLargeMedium"
											className="!text-[#666666]"
										>
											{item?.label}
										</Typography>
										<Typography
											variant="bodyXLargeRegular"
											className="!text-[#333333]"
										>
											{item?.value || "N/A"}
										</Typography>
									</Col>
								))}
							</Row>
							<Divider />

							<div className="mt-5">
								<Typography
									variant="bodyLargeMedium"
									className="!text-[#666666]"
								>
									Introduction
								</Typography>
								<Typography
									variant="bodyXLargeRegular"
									className="!text-[#333333]"
								>
									{studentData?.describeYourSelf || "N/A"}
								</Typography>
							</div>
						</Col>
					</Row>
				</GenericCard>
			)}

			<div className="mt-5">
				{isLoading || isFetching ? (
					<Skeleton.Node active className="!w-full !h-[500px]" />
				) : (
					<GenericCard>
						<div className="flex justify-between px-2 mb-5">
							<Typography variant="headingThreeLight">
								Enrolled Courses
							</Typography>
						</div>
						<Row gutter={[16, 16]}>
							{data?.list?.length > 0 ? (
								data.list.map((student: any, index: number) => {
									return (
										<Col key={index} xs={24} sm={24} md={12} lg={12} xl={6}>
											<CourseCard
												courseData={student}
												showStatus={true}
												status={student?.isCourseCompleted}
											/>
										</Col>
									);
								})
							) : (
								<Col span={24}>
									<GenericCard>
										<Empty description="No Courses Available" />
									</GenericCard>
								</Col>
							)}
						</Row>
					</GenericCard>
				)}
			</div>
			<div className="my-5 justify-end flex">
				<Pagination
					total={data?.pagination?.totalRecords}
					defaultCurrent={data?.pagination?.page || 1}
					defaultPageSize={data?.pagination?.pageSize || 10}
					showTotal={(total, range) =>
						`${range[0]}-${range[1]} of ${total} entries`
					}
					onChange={(page, pageSize) => {
						setTableOptions({
							...tableOptions,
							pagination: {
								page: page,
								pageSize: pageSize,
							},
						});
					}}
				/>
			</div>
		</>
	);
};

export default View;
