export interface TableOptions {
	filters: Record<string, unknown>;
	pagination: {
		page: number;
		pageSize: number;
	};
}
