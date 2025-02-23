import { Course } from "../../Courses/type";

export type CourseData = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	subscriptionPrice: number | null;
	isCourseCompleted: boolean;
	course: Course;
};
