import { PaginatedBody } from "../api/types/base";

export const initialPageableState: PaginatedBody<any> = {
	count: 1,
	next: false,
	previous: false,
	total_pages: 0,
	results: [],
};
