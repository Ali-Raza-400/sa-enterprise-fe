import { Flex } from "antd";
import GenericButton from "../../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa";
import GenericTabs, { Tab } from "../../../components/UI/GenericTabs";
import PublishedContent from "./Published/Index";
import UnpublishedContent from "./Unpublished/Index";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
// import SearchFilter from "../../../components/UI/SearchFilter";
import { useDeleteCourseMutation } from "../../../redux/slices/course";
import PageLoader from "../../../components/Loader/PageLoader";
import Typography from "../../../components/UI/Typography";

const Index = () => {
	const navigate = useNavigate();
	const [deleteCourse, { isLoading }] = useDeleteCourseMutation();
	const published = PublishedContent(deleteCourse);
	const unpublished = UnpublishedContent(deleteCourse);

	const tabs: Tab[] = [
		{
			name: "Published",
			content: "content publish",
			listContent: published?.listContent,
			gridContent: published?.gridContent,
		},
		{
			name: "Unpublished",
			content: "content unpublish",

			listContent: unpublished?.listContent,
			gridContent: unpublished?.gridContent,
		},
	];
	return isLoading ? (
		<PageLoader />
	) : (
		<div>
			<Flex className="justify-between">
				{/* <SearchFilter position="end" /> */}
				<Typography variant="headingOne">All Courses</Typography>
				<GenericButton
					icon={<FaPlus size={20} />}
					label="Create New Course"
					onClick={() => navigate(PATH.NEW_COURSE)}
				/>
			</Flex>
			<GenericTabs tabs={tabs} showViewToggle />
		</div>
	);
};

export default Index;
