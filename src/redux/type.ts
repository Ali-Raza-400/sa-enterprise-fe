import { Course } from "../pages/Courses/type";

export interface ApiResponse<T> {
	pagination: Metadata;
	statusCode: number;
	message: string;
	data: T;
	metadata?: Metadata;
	list: Course[];
}

export interface Metadata {
	page: number;
	pageSize: number;
	totalRecords: number;
	itemsPerPage: number;
	currentPage: number;
	nextPage: number | null;
	prevPage: number | null;
	totalPages: number;
}