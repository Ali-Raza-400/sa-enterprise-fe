import { ReactElement } from "react";
import IMAGES from "../../../assets/images";
import BasicInfoCard from "../Shared/BasicInfoCard";
import { Divider, Skeleton } from "antd";
import GenericTabs, { Tab } from "../../../components/UI/GenericTabs";
// import AboutTab from "./components/AboutTab";
// import OutComesTab from "./components/OutComesTab";
// import TestemonialsTab from "./components/TestemonialsTab";
// import RecommendationsTab from "./components/RecommendationsTab";
import { useGetCourseByIdQuery } from "../../../redux/slices/course";
import { useParams } from "react-router-dom";
import SkeletonImage from "antd/es/skeleton/Image";
import { FULL_DATE_TIME_FORMAT } from "../../../utils/constants";
import dayjs from "dayjs";
// import Typography from "../../../components/UI/Typography";

const View = (): ReactElement => {
	const { id } = useParams();
	const { data, isLoading, isFetching } = useGetCourseByIdQuery(id as string);

	const tabs: Tab[] = [
		{
			name: "Description",
			content: (
				<div
					className="ck-course-view"
					dangerouslySetInnerHTML={{ __html: data?.description }}
				/>
			),

			// content: (
			// 	<div className="relative ">
			// 		<img
			// 			src={IMAGES.COMING_SOON2}
			// 			className="w-full h-full object-cover blur-lg"
			// 			alt="Coming Soon"
			// 		/>
			// 		<div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-3xl font-bold">
			// 			COMING SOON
			// 		</div>
			// 	</div>
			// ),
		},

		{
			name: "Outcomes",
			content: (
				<div
					className="ck-course-view"
					dangerouslySetInnerHTML={{ __html: data?.outComes }}
				/>
			),
			// content: (
			// 	<div className="relative ">
			// 		<img
			// 			src={IMAGES.COMING_SOON2}
			// 			className="w-full h-full object-cover blur-lg"
			// 			alt="Coming Soon"
			// 		/>
			// 		<div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-3xl font-bold">
			// 			COMING SOON
			// 		</div>
			// 	</div>
			// ),
		},

		// {
		// 	name: "Testemonials",
		// 	content: <TestemonialsTab />,
		// },
		{
			name: "Curriculum",
			// name: "About",
			content: (
				<div
					dangerouslySetInnerHTML={{ __html: data?.aboutUs }}
					className="html-view ck-course-view"
				/>
			),
			// content: (
			// 	<div className="relative ">
			// 		<img
			// 			src={IMAGES.COMING_SOON2}
			// 			className="w-full h-full object-cover blur-lg"
			// 			alt="Coming Soon"
			// 		/>
			// 		<div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-3xl font-bold">
			// 			COMING SOON
			// 		</div>
			// 	</div>
			// ),
		},
		{
			name: "Course Content",
			// name: "Curriculum",
			content: (
				<div className="relative ">
					<img
						src={IMAGES.COMING_SOON}
						className="w-full h-full object-cover blur-lg"
						alt="Coming Soon"
					/>
					<div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-3xl font-bold">
						COMING SOON
					</div>
				</div>
			),
			// content: <CurriculumTree lectures={data?.lectures} />,
		},
		// {
		// 	name: "Recommendations",
		// 	content: <RecommendationsTab />,
		// },
	];
	return (
		<>
			<div className="banner-wrapper">
				{isLoading || isFetching ? (
					<SkeletonImage active className="!w-full !xs:h-[15.3rem] !h-[3rem]" />
				) : (
					<>
						<img
							src={data?.courseCover || IMAGES.EARNINGS_WEBFLOW}
							alt="Earnings"
							className="w-full relative h-auto max-h-[15.3rem]"
						/>
						{/* <div className="mt-2 xs:hidden justify-center w-[5rem] bg-[#CCCCCC] rounded-full xs:fixed absolute top-20 right-2">
							<Typography
								variant="bodySmallRegular"
								className="text-[#2F3237] p-1"
							>
								Hot Rating
							</Typography>
						</div> */}
					</>
				)}
			</div>
			{isLoading || isFetching ? (
				<Skeleton active />
			) : (
				<BasicInfoCard
					title={data?.name}
					description={data?.subtitle}
					creatorName={data?.creator?.fullName}
					creatorLogo={IMAGES.XEVEN_LOGO}
					lastUpdated={dayjs(data?.updatedAt).format(FULL_DATE_TIME_FORMAT)}
					duration="3"
					courseId={data?.id}
				/>
			)}
			<Divider />
			{isLoading || isFetching ? (
				<Skeleton active paragraph={{ rows: 7 }} />
			) : (
				<GenericTabs tabs={tabs} />
			)}
		</>
	);
};

export default View;
