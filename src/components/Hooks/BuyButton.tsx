import { useSubscribeCourseMutation } from "../../redux/slices/student";
import { getErrorMessage } from "../../utils/helper";
import GenericButton from "../UI/GenericButton";
import useGenericAlert from "./GenericAlert";

const useBuyCourse = (courseId: string, block?: boolean) => {
	const [subscribeCourse, { isLoading }] = useSubscribeCourseMutation();
	const { showAlert } = useGenericAlert();

	const buyCourse = async () => {
		await subscribeCourse(courseId).then((res: any) => {
			if (res?.data) {
				showAlert({
					title: "Course subscribed successfully",
					message: "You have successfully subscribed to the course",
					type: "success",
					confirmButtonText: "OK",
				});
			}
			if (res?.error) {
				showAlert({
					title: getErrorMessage(res?.error),
					message: "You’re already subscribed to this course. Enjoy learning!",
					type: "info",
					confirmButtonText: "OK",
				});
			}
		});
		// await subscribeCourse(courseId).then((res: any) => {
		// 	if (res?.data) {
		// 		showAlert({
		// 			title: "Subscription Pending Approval",
		// 			message:
		// 				"Your subscription has been submitted for approval. Final confirmation depends on available seats and course prerequisites.",
		// 			type: "success",
		// 			confirmButtonText: "OK",
		// 		});
		// 	} else if (res?.error) {
		// 		showAlert({
		// 			title: getErrorMessage(res?.error),
		// 			message:
		// 				"It seems you're already subscribed to this course. Enjoy learning!",
		// 			type: "info",
		// 			confirmButtonText: "OK",
		// 		});
		// 	}
		// });
	};

	return (
		<GenericButton
			label="Subscribe Now"
			block={block || false}
			onClick={buyCourse}
			disabled={isLoading}
			loading={isLoading}
		/>
	);
};

export default useBuyCourse;
