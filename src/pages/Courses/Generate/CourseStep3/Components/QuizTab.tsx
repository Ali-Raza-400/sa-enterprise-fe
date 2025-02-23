import { Form, Input, Checkbox, Card, Collapse, Flex, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LuMinusCircle } from "react-icons/lu";
import GenericButton from "../../../../../components/UI/GenericButton";
import Typography from "../../../../../components/UI/Typography";
import GenericModal from "../../../../../components/UI/GenericModal";
import GenericTable from "../../../../../components/UI/GenericTable";
import { CourseTabsProps, Attachment } from "../type";
import { TimeInput } from "./quizTimeInput";

const { Panel } = Collapse;

const QuizForm: React.FC<CourseTabsProps> = ({ form, lectureIndex }) => {
	const [show, setShow] = useState(false);
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
	const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(
		null
	);
	console.log(selectedKeys, "SELECTEDs");

	Form.useWatch("quizzes", form);
	Form.useWatch("lectures", form);

	const handleSaveQuiz = (quizIndex: number) => {
		setSelectedQuizIndex(quizIndex);
		setShow(true);
	};

	const handleModalSave = () => {
		if (selectedQuizIndex !== null) {
			const quizzes = form.getFieldValue(["lectures", lectureIndex, "quizzes"]);
			quizzes[selectedQuizIndex].videoUrl = selectedKeys?.[0];
			form.setFieldsValue({
				lectures: {
					[lectureIndex]: { quizzes },
				},
			});
		}
		setShow(false);
	};

	return (
		<Card>
			<Form form={form} autoComplete="off" className="quiz-builder">
				<Form.List name={["lectures", lectureIndex, "quizzes"]}>
					{(fields, { add, remove }) => (
						<>
							<div className="flex justify-between my-4 items-baseline">
								<Typography variant="headingTwo">Quizzes</Typography>
								<Form.Item className="!mb-0">
									<GenericButton
										label="Add Quiz"
										icon={<PlusOutlined />}
										onClick={() => add()}
										variant="outlined"
									/>
								</Form.Item>
							</div>

							<Collapse accordion>
								{fields.map((field, index) => (
									<Panel
										key={field.key}
										header={`Quiz ${index + 1}`}
										extra={
											<LuMinusCircle
												onClick={() => remove(field.name)}
												className="text-[#BA2A2A]"
												size={25}
											/>
										}
									>
										<Form.Item
											label="Quiz Title"
											name={[field.name, "title"]}
											rules={[
												{
													required: true,
													message: "Please enter the quiz title",
												},
											]}
										>
											<Input placeholder="Enter quiz title" />
										</Form.Item>

										<Form.List name={[field.name, "questions"]}>
											{(
												questionFields,
												{ add: addQuestion, remove: removeQuestion }
											) => (
												<>
													<div className="flex justify-between my-4 items-center">
														<Typography variant="headingTwo">
															Questions
														</Typography>
														<Form.Item>
															<GenericButton
																label="Add Question"
																icon={<PlusOutlined />}
																onClick={() => addQuestion()}
																variant="outlined"
															/>
														</Form.Item>
													</div>

													{questionFields.map(
														(questionField, questionIndex) => (
															<Card
																key={questionField.key}
																style={{ marginBottom: 16 }}
															>
																<div className="flex gap-5 items-center mb-5">
																	<Form.Item
																		{...questionField}
																		label={`Question ${questionIndex + 1}`}
																		name={[questionField.name, "questionText"]}
																		rules={[
																			{
																				required: true,
																				message: "Please enter the question",
																			},
																		]}
																		className="!mb-0 w-[50rem]"
																	>
																		<Input className="custom-input" />
																	</Form.Item>

																	<LuMinusCircle
																		onClick={() =>
																			removeQuestion(questionField.name)
																		}
																		className="text-[#BA2A2A]"
																		size={25}
																	/>
																</div>

																<Form.List
																	name={[questionField.name, "options"]}
																>
																	{(
																		optionFields,
																		{ add: addOption, remove: removeOption }
																	) => (
																		<>
																			<div className="flex justify-between items-center mb-4">
																				<Typography variant="bodyXLargeSemibold">
																					Add Answer Options
																					<small className="font-normal text-blue-600">
																						(Check the correct one!)
																					</small>
																				</Typography>
																				<GenericButton
																					label={`Add Option ${
																						optionFields.length < 4
																							? ""
																							: "(Max 4)"
																					}`}
																					icon={<PlusOutlined />}
																					onClick={() => addOption()}
																					variant="link"
																					disabled={optionFields.length >= 4}
																				/>
																			</div>

																			{optionFields.map((optionField) => (
																				<div
																					key={optionField.key}
																					className="flex items-center gap-4 mb-5"
																				>
																					<Form.Item
																						{...optionField}
																						name={[
																							optionField.name,
																							"optionText",
																						]}
																						className="w-1/2 !mb-0"
																						rules={[
																							{
																								required: true,
																								message: "Option required",
																							},
																						]}
																					>
																						<Input
																							addonBefore={
																								<Form.Item
																									{...optionField}
																									name={[
																										optionField.name,
																										"isCorrect",
																									]}
																									valuePropName="checked"
																									noStyle
																								>
																									<Checkbox />
																								</Form.Item>
																							}
																						/>
																					</Form.Item>

																					<LuMinusCircle
																						onClick={() =>
																							removeOption(optionField.name)
																						}
																						className="text-[#BA2A2A]"
																						size={25}
																					/>
																				</div>
																			))}
																		</>
																	)}
																</Form.List>
															</Card>
														)
													)}
												</>
											)}
										</Form.List>

										<Form.Item className="flex justify-end">
											<GenericButton
												label="Save Quiz"
												color="primary"
												onClick={() => handleSaveQuiz(index)}
											/>
										</Form.Item>
									</Panel>
								))}
							</Collapse>
						</>
					)}
				</Form.List>
			</Form>

			<GenericModal
				onClose={() => setShow(false)}
				show={show}
				title="Link Quiz with Video"
				width={800}
				onOk={handleModalSave}
				maskClosable={false}
			>
				<Alert
					message="Set Quiz Timing for Video Interaction"
					type="info"
					className="my-6 shadow-sm"
					showIcon
					description={
						<div className="space-y-2">
							<p>Link this quiz with your video content:</p>
							<ul className="list-disc pl-4">
								<li>Enter the exact timestamp when the quiz should appear</li>
								<li>Video will automatically pause at the specified time</li>
								<li>Students must complete the quiz to continue watching</li>
							</ul>
						</div>
					}
				/>
				<GenericTable
					columns={[
						{
							title: "Lecture",
							dataIndex: "name",
							key: "name",
							width: 300,
							render: (text, record) => (
								<Flex align="center" gap={6}>
									<video
										src={record?.filePath}
										style={{
											width: "60px",
											height: "60px",
											objectFit: "cover",
										}}
									/>
									{text}
								</Flex>
							),
						},
						{
							title: "Duration",
							dataIndex: "duration",
							key: "duration",
							width: 300,
						},
						{
							title: "Quiz Time (minutes)",
							dataIndex: "quizTime",
							width: 300,
							key: "quizTime",
							render: (_: any, record: any) => (
								console.log(record, "reccc"),
								(
									<TimeInput
										maxTime={record?.duration}
										name={
											[
												"lectures",
												lectureIndex,
												"quizzes",
												selectedQuizIndex,
												"quizTime",
												record?.uid,
											] as unknown
										}
										disabled={
											selectedKeys?.includes(record?.filePath) ? false : true
										}
									/>
								)
							),
						},
					]}
					data={form
						.getFieldValue(["lectures", lectureIndex, "attachments"])
						?.filter((item: Attachment) => item.type?.startsWith("video/"))}
					selectedRowKeys={selectedKeys}
					onSelectionChange={(keys) => setSelectedKeys(keys)}
					rowKey="filePath"
					selectionType="radio"
					enableSelection
				/>
			</GenericModal>
		</Card>
	);
};

export default QuizForm;
