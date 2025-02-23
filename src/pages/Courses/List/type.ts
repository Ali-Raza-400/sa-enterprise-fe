export interface PublishedContentReturn {
	listContent: JSX.Element;
	gridContent: JSX.Element;
}

export interface PublishedColumnType {
	key: string;
	courseName: string;
	category: string;
	price: number;
	rating: number;
	isMendatory?: boolean | null;
}
export type ShowAvailableTeachersState = {
	visibility: boolean;
	courseId: string;
};
export interface SelectedKeysType {
	key: string;
	teacherId: string;
}
