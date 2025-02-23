import { Course } from "../../Courses/type";

export interface UpcomingAssignments {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	name: string;
	filePath: string;
	dueDate: string;
	totalMarks: number | null;
	course: Course;
}

export interface TeacherDetail {
	id: string;
	name: string;
	email: string;
  }
