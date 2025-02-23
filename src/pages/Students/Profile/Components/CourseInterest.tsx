import { useState, useEffect } from "react";
import GenericCard from "../../../../components/UI/GenericCard";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Form, Tag, Button } from "antd";
import {
	useLazyGetStudentInterestQuery,
	useUpdateStudentInterestByIdMutation,
} from "../../../../redux/slices/student";
import PageLoader from "../../../../components/Loader/PageLoader";
import { COURSE_CATEGORIES } from "../../../../utils/constants";
import Typography from "../../../../components/UI/Typography";
import useNotification from "../../../../components/UI/Notification";
import { getUser, setUser } from "../../../../utils/helper";
import { setCredentials } from "../../../../redux/features/authSlice";
import { AuthResponseDTO } from "../../../Auth/type";
import { useDispatch } from "react-redux";

interface InterestModalState {
	selectedInterests: string[];
	interestId?: string;
}

const CourseInterest = () => {
	const [form] = Form.useForm();
	const [interestModal, setInterestModal] = useState<InterestModalState>({
		selectedInterests: [],
	});
	const dispatch = useDispatch();

	const [hasChanges, setHasChanges] = useState(false);
	const [getStudentInterest, { data, isLoading }] =
		useLazyGetStudentInterestQuery();
	const [updateStudentInterestById, { isLoading: isUpdating }] =
		useUpdateStudentInterestByIdMutation();
	const { openNotification, contextHolder } = useNotification();
	// Fetch user's selected interests from API
	useEffect(() => {
		getStudentInterest();
	}, [getStudentInterest]);

	// Update selected interests state when data is loaded
	useEffect(() => {
		if (data?.interest) {
			setInterestModal((prevState) => ({
				...prevState,
				selectedInterests: data.interest,
				interestId: data.id,
			}));
		}
	}, [data]);

	// Handle tag click to toggle interests
	const handleTagClick = (interestValue: string) => {
		setInterestModal((prevState) => {
			const isSelected = prevState.selectedInterests.includes(interestValue);
			const updatedInterests = isSelected
				? prevState.selectedInterests.filter((tag) => tag !== interestValue)
				: [...prevState.selectedInterests, interestValue];

			setHasChanges(true);

			return {
				...prevState,
				selectedInterests: updatedInterests,
			};
		});
	};

	// Handle the update action
	const handleUpdate = async () => {
		if (
			interestModal.interestId &&
			interestModal.selectedInterests.length > 0
		) {
			try {
				await updateStudentInterestById({
					id: interestModal.interestId,
					payload: interestModal.selectedInterests,
				})
					.unwrap()
					.then((res) => {
						const existingUserData = getUser();
						const updatedUserData = {
							...existingUserData,
							interest: res?.interest,
						};
						setUser(updatedUserData as AuthResponseDTO);
						dispatch(setCredentials(updatedUserData));
					});
				openNotification({
					type: "success",
					title: "Interests updated successfully!",
				});
				setHasChanges(false);
			} catch (error) {
				openNotification({
					type: "error",
					title: "Failed to update interests. Please try again.",
				});
			}
		} else {
			openNotification({
				type: "error",
				title: "Please select at least one interest.",
			});
		}
	};

	return (
		<GenericCard noMargin={true} className="min-h-[450px]">
			{isLoading ? (
				<PageLoader />
			) : (
				<>
					{contextHolder}
					<Form form={form} className="custom-interest-modal">
						<Typography  variant="bodyLargeBold" color="black" className="mb-4 ">
							Interests
						</Typography>

						{COURSE_CATEGORIES.map((interest) => (
							<Tag
								key={interest.value}
								className={` interest-tags-styles interest-tag ${interestModal.selectedInterests.includes(interest.value) ? "selected" : "default"} `}
								onClick={() => handleTagClick(interest.value)}
								icon={
									interestModal.selectedInterests.includes(interest.value) ? (
										<CheckCircleOutlined
											className="text-[#8970D6]"
											style={{ marginRight: 4 }}
										/>
									) : null
								}
								style={{
									fontSize: "clamp(8px, 2vw, 16px)", // Adjust min, preferred, and max font sizes
								}}
							>
								{interest.label}
							</Tag>
						))}

						<div className="flex justify-end items-end">
							{hasChanges && (
								<Button
									type="primary"
									onClick={handleUpdate}
									loading={isUpdating}
									className="mt-4"
								>
									Update
								</Button>
							)}
						</div>
					</Form>
				</>
			)}
		</GenericCard>
	);
};

export default CourseInterest;
