import { Button, Divider, Modal } from "antd";
import { Quiz } from "../../../../Courses/type";

type QuizModalProps = {
	quizOpen: boolean;
	onClose: () => void;
	handleQuizLinkClick: () => void;
	quizData: Quiz[];
};

const QuizModal = ({
	quizOpen,
	onClose,
	handleQuizLinkClick,
	quizData,
}: QuizModalProps) => {
	console.log(quizData, "QUIZ");

	return (
		<div>
			<Modal
				title="Quiz Required"
				open={quizOpen}
				footer={null}
				closable={false}
				onCancel={onClose}
				centered
				width={700}
				maskClosable={false}
			>
				<p>Please complete the quiz to continue watching the video.</p>
				{quizData?.map((quiz: Quiz) => {
					return (
						<div>
							<QuizForm
								quizData={quiz}
								handleQuizLinkClick={handleQuizLinkClick}
								onClose={onClose}
							/>
						</div>
					);
				})}
			</Modal>
		</div>
	);
};

export default QuizModal;

import { Form, Radio } from "antd";
import { useSubmitQuizMutation } from "../../../../../redux/slices/student";
import useGenericAlert from "../../../../../components/Hooks/GenericAlert";

export const QuizForm: React.FC<{
	quizData: Quiz;
	handleQuizLinkClick: () => void;
	onClose: () => void;
}> = ({ quizData, handleQuizLinkClick, onClose }) => {
	const [form] = Form.useForm();
	const [submitQuiz] = useSubmitQuizMutation();
	const { showAlert } = useGenericAlert();

	const handleFinish = async (values: Record<string, string>) => {
		const formattedData = {
			quizId: quizData?.id,
			quizQuestions: Object.entries(values).map(([questionId, answerId]) => ({
				questionId,
				quizOptionId: answerId,
			})),
		};
		console.log("Submitted Data:", formattedData);
		// await submitQuiz(formattedData)
		// 	.unwrap()
		// 	.then((res) => {
		// 		console.log(res, "RES");

		// 		if (res?.data) {
		// 			showAlert({
		// 				type: "success",
		// 				title: `Password Sent Successful!`,
		// 				message: `A new password has been sent to your email. Please check your inbox
		// 				and use the new password to log in`,
		// 				confirmButtonText: "OK",
		// 				// onConfirm: () => navigate(PATH.LOGIN),
		// 			});
		// 		}
		// 		if (res?.error) {
		// 			showAlert({
		// 				type: "error",
		// 				title: "Error",
		// 				message: res?.error?.data?.message,
		// 				confirmButtonText: "OK",
		// 			});
		// 		}
		// 	});
		try {
			const res = await submitQuiz(formattedData).unwrap();
			console.log(res, "RES");

			if (res) {
				showAlert({
					type: "success",
					title: `Quiz Submitted Successfully!`,
					message: `Your quiz has been submitted. You scored ${res?.score} out of ${res?.totalScore}.`,
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			showAlert({
				type: "error",
				title: "Error",
				message: "An unexpected error occurred.",
				confirmButtonText: "OK",
			});
		}

		handleQuizLinkClick();
		onClose();
	};

	return (
		<Form form={form} onFinish={handleFinish}>
			<Divider />
			{quizData?.title && (
				<h2 className="text-center">{`Quiz Title: ${quizData?.title}`}</h2>
			)}
			<Divider />

			{quizData?.questions?.map((question, index) => (
				<Form.Item
					key={question.id}
					name={question.id}
					label={
						<div className="font-bold text-xl">{`Question #${index + 1} : ${question.quizeQuestion}`}</div>
					}
					rules={[{ required: true, message: "Please select an answer" }]}
					wrapperCol={{ span: 24 }}
					labelCol={{ span: 24 }}
				>
					<Radio.Group className="flex gap-10 flex-wrap quiz-options">
						{question.options.map((option) => (
							<Radio key={option.id} value={option.id}>
								{option.optionText}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>
			))}
			<Form.Item className="!mb-0 flex justify-end">
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
