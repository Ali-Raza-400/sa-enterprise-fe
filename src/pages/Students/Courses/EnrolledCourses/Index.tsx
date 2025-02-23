import { Col, Empty, Pagination, Result, Row, Spin } from "antd";
import CourseCard from "../../../Courses/Shared/CourseCard";
import { useGetCompletedCoursesQuery } from "../../../../redux/slices/student";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../navigation/Path";
import { CourseData } from "../../Profile/type";
import { FaRegSmile } from "react-icons/fa";
import GenericButton from "../../../../components/UI/GenericButton";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
	const navigate = useNavigate();
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 8,
		},
	});
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading, isFetching } = useGetCompletedCoursesQuery({
		tableOptions,
	});

	return user?.isApproved ? (
		<>
			{isLoading || isFetching ? (
				<Spin size="large" className="flex justify-center m-[250px]" />
			) : (
				<div>
					{data?.list?.filter((i: any) => i?.isApproved)?.length > 0 ? (
						<>
							<Row gutter={[24, 24]} className="">
								{data?.list
									?.filter((i: any) => i?.isApproved)
									?.map((course: CourseData, index: number) => (
										<Col
											key={index}
											xs={24}
											sm={24}
											md={12}
											lg={12}
											xl={8}
											xxl={6}
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
									defaultPageSize={data.pagination?.pageSize || 8}
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
						// <div className="h-[45vh] flex justify-center items-center">
						// 	<Empty />
						// </div>
						<Result 
							className="h-[65vh] flex justify-center items-center flex-col  mt-20 xs:mt-0 
             result-title-css"
							icon={<FaRegSmile size={100} fill="#8970D6" />}
							title="You currently have no courses enrolled. If you’ve submitted an enrollment request, it’s awaiting approval"
							extra={
								<div className="flex justify-center">
									<GenericButton
										label="Enroll Now"
										color="primary"
										onClick={() => navigate(PATH.STUDENT_COURSES_LIST)}
									/>
								</div>
							}
						/>
					)}
				</div>
			)}
		</>
	) : (
		<div className="h-[45vh] flex justify-center items-center">
			<Empty />
		</div>
	);
};

export default EnrolledCourses;
