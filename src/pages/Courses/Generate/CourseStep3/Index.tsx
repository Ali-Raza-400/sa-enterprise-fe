import { useEffect, useState } from "react";
import GenericButton from "../../../../components/UI/GenericButton";
import GenericAccordion from "../../../../components/UI/GenericAccordion";
import { v4 as uuidv4 } from "uuid";
import GenericTabs, { Tab } from "../../../../components/UI/GenericTabs";
import { Col, FormInstance, Row } from "antd";
import AssignmentTab from "./Components/AssignmentTab";
import QuizForm from "./Components/QuizTab";
import InputField from "../../../../components/Form/InputField";
import { Lecture } from "./type";
import { LuMinusCircle } from "react-icons/lu";
import ContentTab from "./Components/LectureTab";

const generateTabs = (index: number, form: FormInstance): Tab[] => [
	{
		name: "Content",
		content: <ContentTab form={form} lectureIndex={index} />,
	},
	{
		name: "Assignment",
		content: <AssignmentTab form={form} lectureIndex={index} />,
	},
	{
		name: "Quiz",
		content: <QuizForm form={form} lectureIndex={index} />,
	},
];

const createNewLectureItem = (
	label: string,
	index: number,
	form: FormInstance
) => {
	const tabs = generateTabs(index, form);

	return {
		key: uuidv4(),
		label,
		content: (
			<Row>
				<Col span={11}>
					<InputField
						label="Lecture Name"
						name={["lectures", index, "lectureName"]}
						rules={[
							{
								required: true,
								message: `Name is required`,
							},
						]}
						autoComplete="off"
						placeholder="Lecture Name"
						inputType="input"
						margin="medium"
						size="large"
					/>
				</Col>
				<GenericTabs tabs={tabs} />
			</Row>
		),
		name: ["lectures", index],
	};
};

const CourseStep3 = ({ form }: { form: FormInstance }) => {
	const [formRender, setFormRerender] = useState(false);
	const [activeKey, setActiveKey] = useState<string[]>([]);

	useEffect(() => {
		const lectures = form.getFieldValue("lectures") || [];
		if (lectures.length === 0) {
			const newLecture = createNewLectureItem("Lecture 1", 0, form);
			form.setFieldsValue({
				lectures: [newLecture],
			});
			setActiveKey([newLecture.key]);
		} else {
			const updatedLectures = lectures.map((lecture: Lecture) => ({
				...lecture,
				key: lecture.key || uuidv4(),
			}));
			form.setFieldsValue({ lectures: updatedLectures });
			setActiveKey([updatedLectures[0].key]);
		}
	}, [form]);

	const handleAddLecture = () => {
		const lectures = form.getFieldValue("lectures") || [];
		const newLectureIndex = lectures.length;

		const newLecture = createNewLectureItem(
			`Lecture ${newLectureIndex + 1}`,
			newLectureIndex,
			form
		);

		const updatedLectures = [...lectures, newLecture];
		form.setFieldsValue({
			lectures: updatedLectures,
		});
		setActiveKey([newLecture.key]);
		setFormRerender(!formRender);
	};
	const handleDeleteLecture = (index: number) => {
		const lectures = form.getFieldValue("lectures") || [];
		const updatedLectures = lectures.filter(
			(_: Lecture, lectureIndex: number) => lectureIndex !== index
		);

		form.setFieldsValue({
			lectures: updatedLectures,
		});

		// Update active key, set it to the first remaining lecture if the active one is deleted
		if (updatedLectures.length > 0) {
			setActiveKey([updatedLectures[0].key]);
		} else {
			setActiveKey([]); // Clear if no lectures remain
		}

		setFormRerender(!formRender);
	};
	const lectureItems = (form.getFieldValue("lectures") || []).map(
		(lecture: Lecture, index: number) => ({
			...lecture,
			key: lecture.key || uuidv4(),
			label: (
				<div className="flex justify-between items-center">
					<span>{lecture.label || `Lecture ${index + 1}`}</span>
					<LuMinusCircle
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteLecture(index);
						}}
						className="text-[#BA2A2A]"
						size={25}
					/>
				</div>
			),
			content: createNewLectureItem(
				lecture.label || `Lecture ${index + 1}`,
				index,
				form
			).content,
		})
	);
	const handleAccordionChange = (key: string[]) => {
		setActiveKey(key);
	};
	return (
		<>
			<div className="flex justify-end mb-4">
				<GenericButton
					label="Add New Lecture"
					color="default"
					variant="solid"
					onClick={handleAddLecture}
				/>
			</div>

			<Row className="flex justify-center">
				<Col span={24} lg={18} xl={18}>
					<GenericAccordion
						items={lectureItems}
						activeKey={activeKey}
						defaultActiveKey={activeKey}
						onChange={handleAccordionChange}
					/>
				</Col>
			</Row>
		</>
	);
};

export default CourseStep3;
