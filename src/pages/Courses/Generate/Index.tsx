import { Form } from "antd";
import GenericStepper from "../../../components/UI/GenericStepper";
import CourseStep1 from "./CourseStep1/Index";
import CourseStep2 from "./CourseStep2/Index";
import CourseStep3 from "./CourseStep3/Index";
import CourseStep4 from "./CourseStep4/Index";
import CourseStep5 from "./CourseStep5/Index";
import CourseStep6 from "./CourseStep6/Index";
import { Assignment, Attachment, Lecture } from "./CourseStep3/type";
import { useCreateCourseMutation } from "../../../redux/slices/course";
import { getErrorMessage } from "../../../utils/helper";
import useNotification from "../../../components/UI/Notification";
import FullScreenLoader from "../../../components/Loader/FullScreenLoader";
import { FieldData } from "rc-field-form/es/interface";

const Index = () => {
	const [form] = Form.useForm();
	const [createCourse, { isLoading }] = useCreateCourseMutation();
	const { openNotification, contextHolder } = useNotification();

	const validateLectureNames = () => {
		const lectures = form.getFieldValue("lectures");
		if (!Array.isArray(lectures)) {
			return;
		}
		const errors:
			| FieldData<any>[]
			| { name: (string | number)[]; errors: string[] }[] = [];

		lectures.forEach((_, index) => {
			const lectureName = form.getFieldValue([
				"lectures",
				index,
				"lectureName",
			]);

			if (!lectureName) {
				errors.push({
					name: ["lectures", index, "lectureName"],
					errors: ["Lecture Name is required"],
				});
			}
		});

		form.setFields(errors);

		return errors.length === 0;
	};

	const handleValuesChange = (changedValues: any) => {
		const changedLecture = changedValues?.lectures;

		if (changedLecture) {
			const updatedErrors = changedLecture
				.map((lecture: Lecture, index: number) => {
					if (lecture?.lectureName) {
						return { name: ["lectures", index, "lectureName"], errors: [] };
					}
					return null;
				})
				.filter(Boolean);

			form.setFields(updatedErrors);
		}
	};

	const steps = [
		{
			title: "Course Name",
			content: <CourseStep1 form={form} />,
			onNext: (next: () => void) => {
				form
					.validateFields([
						"name",
						"courseThumbnail",
						"courseCover",
						"courseSubtitle",
						"categories",
					])
					.then(() => {
						next();
					});
			},
		},
		{
			title: "Price",
			content: <CourseStep2 form={form} />,
			onNext: (next: () => void) => {
				form
					.validateFields(["selectedType"])
					.then(() => {
						return form.validateFields(["price"]);
					})
					.then(() => {
						next();
					});
			},
		},
		{
			title: "Upload",
			content: <CourseStep3 form={form} />,
			onNext: (next: () => void) => {
				if (validateLectureNames()) {
					next();
				}
			},
		},
		{
			title: "About & Outcomes",
			content: <CourseStep4 form={form} />,
		},
		{
			title: "Date & Description",
			content: <CourseStep5 form={form} />,
			onNext: (next: () => void) => {
				handleSubmit().then((res) => {
					console.log(res, "ALMS)______________");

					if (res?.data) {
						next();
					}
					if (res?.error) {
						openNotification({
							type: "error",
							title: getErrorMessage(res?.error),
						});
					}
				});
			},
		},

		{
			title: "Success",
			content: <CourseStep6 />,
		},
	];

	const handleSubmit = async () => {
		const {
			name,
			courseSubtitle,
			courseThumbnail,
			courseCover,
			price,
			categories,
			aboutUs,
			outComes,
			description,
			lectures,
			selectedType,
			isMendatory,
			courseDifficulty,
		} = form.getFieldsValue([
			"name",
			"courseSubtitle",
			"courseThumbnail",
			"courseCover",
			"price",
			"categories",
			"aboutUs",
			"outComes",
			"description",
			"lectures",
			"selectedType",
			"isMendatory",
			"courseDifficulty",
		]);

		const finalLectures = lectures?.map((lecture: Lecture) => {
			const attachments = lecture?.attachments?.map(
				(attachment: Attachment) => ({
					filePath: attachment?.filePath,
				})
			);

			const assignments = lecture?.assignments?.map(
				(assignment: Assignment) => ({
					filePath: assignment?.filePath,
					name: assignment?.name,
					dueDate: assignment?.dueDate,
				})
			);

			const quizzes = lecture?.quizzes?.map((quiz: any) => {
				const quizTimeValue = Object?.values(quiz?.quizTime)[0];

				return {
					...quiz,
					quizTime: quizTimeValue || "",
				};
			});
			const name = lecture?.lectureName;

			if (attachments?.length || assignments?.length || quizzes || name) {
				return {
					attachments,
					assignments,
					quizzes,
					name,
				};
			}

			return undefined;
		});

		const filteredLectures = finalLectures?.filter(
			(lecture: Lecture) => lecture !== undefined
		);

		const final = {
			name,
			courseSubtitle,
			courseThumbnail: courseThumbnail?.url,
			courseCover: courseCover?.url,
			categories,
			aboutUs,
			outComes,
			description,
			isMendatory,
			courseDifficulty,
			lectures: filteredLectures,
			...(selectedType === "Paid" && {
				isFree: false,
				price: price,
			}),
			...(selectedType === "Free" && {
				isFree: true,
			}),
			isPublished: true,
		};

		// return final;
		return await createCourse(final);
	};
	return (
		<>
			{contextHolder}
			<Form form={form} onValuesChange={handleValuesChange}>
				<GenericStepper steps={steps} marginTop="xl" />
			</Form>
			{isLoading && <FullScreenLoader forRequest={true} />}
		</>
	);
};

export default Index;
