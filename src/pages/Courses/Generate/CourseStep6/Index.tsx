import React from "react";
import { Result } from "antd";
import GenericButton from "../../../../components/UI/GenericButton";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../navigation/Path";
import { GrStatusGood } from "react-icons/gr";

const CourseStep7: React.FC = () => {
	const navigate = useNavigate();

	const RedirectCourseList = () => {
		navigate(PATH.COURSES);
	};

	return (
		<Result
			// status="success"
			icon={<GrStatusGood color="#22C55E" fontSize={200} />}
			title="Course Created Successfully!"
			// subTitle="Course creation may take 1-5 minutes, please wait."
			extra={
				<div className="flex justify-center">
					<GenericButton
						label="Go to Course List"
						color="primary"
						variant="solid"
						onClick={RedirectCourseList}
					/>
				</div>
			}
		/>
	);
};

export default CourseStep7;
