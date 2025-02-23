import { Col, Empty, Flex, Row } from "antd";
import { ReactElement, useCallback, useRef, useState } from "react";
import SearchFilter from "../../../components/UI/SearchFilter";
import { useGetCoursesQuery } from "../../../redux/slices/course";
import CourseCard from "../../Courses/Shared/CourseCard";
import { Course } from "../../Courses/type";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../components/Loader/PageLoader";

const StudentCourses = (): ReactElement => {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 200,
		},
	});
	const navigate = useNavigate();
	const {
		data: courseData,
		isLoading,
		isFetching,
	} = useGetCoursesQuery({ tableOptions });
	console.log(courseData, "courseData");

	const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
		const timeoutRef = useRef<any>(null);

		return useCallback(
			(...args: any[]) => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}

				timeoutRef.current = setTimeout(() => {
					callback(...args);
				}, delay);
			},
			[callback, delay]
		);
	};

	const debouncedSetTableOptions = useDebounce((value: string) => {
		setTableOptions((prevOptions) => ({
			...prevOptions,
			filters: {
				...prevOptions.filters,
				name: value,
			},
		}));
	}, 300);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetTableOptions(e.target.value);
	};
	const categoryOrder = [
		"General Audience",
		"Freelancing",
		"Specialized Audience Crash Courses",
		"Soft Skills",
	];

	const sortedList = [...(courseData?.list || [])]?.sort((a: any, b: any) => {
		const categoryA = a?.categories?.[0];
		const categoryB = b?.categories?.[0];

		const indexA = categoryOrder?.indexOf(categoryA);
		const indexB = categoryOrder?.indexOf(categoryB);

		return (
			(indexA === -1 ? categoryOrder?.length : indexA) -
			(indexB === -1 ? categoryOrder?.length : indexB)
		);
	});

	return (
		<>
			{isLoading ? (
				<>
					<PageLoader />
				</>
			) : (
				<div>
					<Flex className="justify-between">
						<SearchFilter
							position="end"
							searchProps={{
								onChange: handleInputChange,
							}}
						/>
					</Flex>
					<Row>
						{sortedList && sortedList?.length > 0 ? (
							<Col span={24}>
								<Row gutter={[24, 24]}>
									{sortedList?.map((course: Course, index: number) => (
										<Col
											key={index}
											xs={24}
											sm={12}
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
									))}
								</Row>
								{/* <div className="my-5 justify-end flex">
									{courseData && courseData?.list?.length > 0 && (
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
								</div> */}
							</Col>
						) : (
							<div className=" flex justify-center items-center w-[100%] h-[100%] ">
								<Empty />
							</div>
						)}
					</Row>
				</div>
			)}
		</>
	);
};

export default StudentCourses;
