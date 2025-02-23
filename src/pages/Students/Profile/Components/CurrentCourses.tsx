import { Col, Empty, Pagination, Row, Spin } from "antd";
import Typography from "../../../../components/UI/Typography";
import CourseCard from "../../../Courses/Shared/CourseCard";
// import IMAGES from "../../../../assets/images";
import { useGetCompletedCoursesQuery } from "../../../../redux/slices/student";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../navigation/Path";
import GenericCard from "../../../../components/UI/GenericCard";
import { Course } from "../../../Courses/type";
import { useSelector } from "react-redux";
// import { Course } from "../../../Courses/type";
// import {EditOutlined } from "@ant-design/icons";

// type Course = {
// 	id: string;
// 	course: {
// 		id: string;
// 		name: string;
// 		categories: string[];
// 		courseThumbnail: string;
// 	};
// 	price: string;
// };

type CourseData = {
	price: string | number | undefined;
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	subscriptionPrice: number | null;
	isCourseCompleted: boolean;
	course: Course;
};

const CurrentCourses = () => {
	const navigate = useNavigate();
	const [tableOptions, setTableOptions] = useState({
		filters: {
			completed: false,
		},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading, isFetching } = useGetCompletedCoursesQuery({
		tableOptions,
	});
	console.log(data, "GetCompletedCourses", user);

	return user?.isApproved ? (
		<>
			{isLoading || isFetching ? (
				<Spin size="large" className="flex justify-center m-[250px]" />
			) : (
				<GenericCard noMargin={true}>
					<div className="flex justify-between mt-3 mb-5">
						<Typography variant="headingFour">Current Courses</Typography>
					</div>

					{data?.list?.length > 0 ? (
						<>
							<Row gutter={[24, 24]} className="mt-7">
								{data?.list
									?.filter((i: any) => i?.isApproved)
									?.map((course: CourseData, index: any) => (
										<Col
											key={index}
											xs={24}
											sm={24}
											md={24}
											lg={24}
											xl={12}
											xxl={8}
										>
											<CourseCard
												courseData={course}
												onCardClick={() =>
													navigate(
														PATH.STUDENT_COURSE_VIEW.replace(
															":id",
															course?.course?.id
														)
													)
												}
												loading={isLoading || isFetching}
											/>
										</Col>
									))}
							</Row>
							<div className="my-5 justify-end flex">
								<Pagination
									total={data.pagination?.totalRecords}
									defaultCurrent={data.pagination?.page || 1}
									defaultPageSize={data.pagination?.pageSize || 10}
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
					) : (
						<div className="h-[45vh] flex justify-center items-center">
							<Empty />
						</div>
					)}
				</GenericCard>
			)}
		</>
	) : (
		<div className="h-[45vh] flex justify-center items-center">
			<Empty />
		</div>
	);
};

export default CurrentCourses;
