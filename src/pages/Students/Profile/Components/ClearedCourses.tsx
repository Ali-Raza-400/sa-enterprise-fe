import { Col, Pagination, Row, Spin } from "antd";
import Typography from "../../../../components/UI/Typography";
import CourseCard from "../../../Courses/Shared/CourseCard";
import { useGetCompletedCoursesQuery } from "../../../../redux/slices/student";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../navigation/Path";
import GenericCard from "../../../../components/UI/GenericCard";
import { CourseData } from "../type";

const CourseCleared = () => {
	const navigate = useNavigate();
	const [tableOptions, setTableOptions] = useState({
		filters: {
			completed: true,
		},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});

	const { data, isLoading, isFetching } = useGetCompletedCoursesQuery({
		tableOptions,
	});

	return (
		<>
			{isLoading || isFetching ? (
				<Spin size="large" className="flex justify-center m-[250px]" />
			) : (
				<GenericCard noMargin={true}>
					{data?.list?.length > 0 ? (
						<>
							<div className="flex justify-between mt-3 mb-5">
								<Typography variant="headingFour">Courses Cleared</Typography>
							</div>
							<Row gutter={[24, 24]} className="mt-7">
								{data.list.map((course: CourseData, index: number) => (
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
							{/* <Empty /> */}
							<Typography variant="headingThreeLight">
								Your cleared courses will be displayed here once completed
							</Typography>
						</div>
					)}
				</GenericCard>
			)}
		</>
	);
};

export default CourseCleared;
