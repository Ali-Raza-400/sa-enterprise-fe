import { FormInstance } from "antd";
import { ApiResponse, Metadata } from "../../../../redux/type";
import { Dayjs } from "dayjs";
export interface CourseTabsProps {
	lectureIndex: number;
	form: FormInstance;
}

export interface Lecture {
	lectureName?: string;
	label?: string;
	key?: string;
	name: string;
	attachments: Attachment[];
	assignments: Assignment[];
	quizzes: Quiz[];
}

export interface Attachment {
	name: string;
	progress: number | undefined;
	status: string;
	type: string | undefined;
	uid: string;
	filePath: string;
}

export interface Assignment {
	dueDate: Dayjs;
	name: string;
	uid: string;
	filePath: string;
}

export interface Quiz {
	quizTime?: string;
	title: string;
	lectureId: string;
	questions: Question[];
}

export interface Question {
	questionText: string;
	options: Option[];
}

export interface Option {
	optionText: string;
	isCorrect: boolean;
}

export interface AssignmentFile {
	dueDate: Dayjs;
	filePath: string;
	name: string;
	uid: string;
}
export interface LectureFile {
	filePath: string;
	name: string;
	uid: string;
}

export interface CreateCourseDTO {
	name: string;
	courseSubtitle: string;
	courseThumbnail: string;
	courseCover: string;
	isFree?: boolean | undefined;
	isPublished: boolean;
	price?: string;
	categories: string[];
	aboutUs: string;
	outComes: string;
	description: string;
	lectures: Lecture[];
}
export interface Creator {
	id: string;
	fullName?: string;
	email?: string;
}
export interface CreateCourseResponseDTO
	extends ApiResponse<{
		name: string;
		categories: string[];
		courseThumbnail: string;
		courseCover: string;
		isFree: boolean;
		price: number;
		aboutUs: string;
		outComes: string;
		isPublished: boolean;
		courseCreatedAt: Dayjs;
		description: string;
		creator: Creator;
		lectures: Lecture[];
		subtitle: string | null;
		id: string;
		createdAt: Dayjs;
		updatedAt: Dayjs;
		deletedAt: Dayjs | null;
	}> {}

export interface Course {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	name: string;
	subtitle: string | null;
	categories: string[];
	courseThumbnail: string;
	courseCover: string;
	isFree: boolean;
	price: string | number;
	aboutUs: string;
	outComes: string;
	isPublished: boolean;
	courseCreatedAt: string;
	description: string;
	creator: Creator;
	lectures: Lecture[];
}
export interface GetAllCoursesResponse {
	data: Course[];
}
export interface GetInstituteCoursesResponse<Course> {
	list: Course[];
	pagination: Metadata;
}
