import { TableOptions } from "../../components/UI/type";

export interface GetCoursesParams {
	id?: string;
	tableOptions: TableOptions;
}
import { FormInstance } from "antd";
import { ReactNode } from "react";
import { Dayjs } from "dayjs";
import { ApiResponse } from "../../redux/type";
export interface CourseTabsProps {
	lectureIndex: number;
	form: FormInstance;
}

export interface Lecture {
	filePath: any;
	id?: string | undefined;
	lectureName?: string;
	label?: string;
	key?: string;
	name: string;
	attachments: Attachment[];
	assignments: Assignment[];
	quizzes: Quiz[];
}

export interface Attachment {
	id?: string | undefined;
	name: ReactNode;
	progress: number | undefined;
	status: string;
	type: string | undefined;
	uid: string;
	filePath: string;
}

export interface Assignment {
	id?: string | undefined;
	dueDate?: Dayjs;
	name?: string;
	uid?: string;
	filePath: string;
	createdAt?: Dayjs;
	deletedAt?: Dayjs;
	updatedAt?: Dayjs;
	totalMarks?: number;
}

export interface Quiz {
	id?: string | undefined;
	createdAt?: string | undefined;
	updatedAt?: string | undefined;
	deletedAt?: string | null;
	videoUrl?: string;
	quizTime?: string | null;
	title: string;
	lectureId: string;
	questions: Question[];
}

export interface Question {
	questionText: string;
	id?: string;
	quizeQuestion?: string;
	options: Option[];
}

export interface Option {
	optionText: string;
	id?: string;
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
	subtitle?: string | null;
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
	courseSubtitle?: string | null;
	usedSeats: number | null;
	totalSeats: number | null;
	isMendatory: boolean | null;
}
export interface GetAllCoursesResponse {
	data: Course[];
}
