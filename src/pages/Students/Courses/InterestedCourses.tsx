import { useState } from "react";
import { useGetInterestedCoursesQuery } from "../../../redux/slices/student";
import { Col, Empty, Flex, Pagination, Row } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
import CourseCard from "../../Courses/Shared/CourseCard";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/Loader/PageLoader";
import { Course } from "../../Courses/type";

const Recommendations = () => {
	const navigate = useNavigate();
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 8,
		},
	});
	const {
		data: courseData,
		isLoading,
		isFetching,
	} = useGetInterestedCoursesQuery({ tableOptions });

	return (
		<>
			{isLoading ? (
				<>
					<PageLoader />
				</>
			) : (
				<div>
					<Flex className="justify-between">
						<SearchFilter position="end" />
					</Flex>
					<Row>
						<Col span={24}>
							<Row gutter={[24, 24]}>
								{courseData?.list?.length > 0 ? (
									courseData?.list?.map((course: Course, index: number) => (
										<Col
											key={index}
											xs={24}
											sm={24}
											md={12}
											lg={12}
											xl={6}
											xxl={6}
										>
											<CourseCard
												courseData={course}
												onCardClick={() =>
													navigate(
														PATH.COURSE_VIEW_STUDENT.replace(":id", course?.id)
													)
												}
												loading={isLoading || isFetching}
											/>
										</Col>
									))
								) : (
									<div className=" flex justify-center items-center w-[100%] h-[100%] ">
										<Empty />
									</div>
								)}
							</Row>
							<div className="my-5 justify-end flex">
								{courseData && (
									<Pagination
										total={courseData?.pagination?.totalRecords}
										defaultCurrent={courseData?.pagination?.page || 1}
										defaultPageSize={courseData?.pagination?.pageSize || 8}
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
								)}
							</div>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default Recommendations;
