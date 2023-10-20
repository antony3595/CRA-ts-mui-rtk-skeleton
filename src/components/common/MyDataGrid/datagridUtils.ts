import { isNumber } from "../../../utils/tsUtils";
import { GridSortItem, GridSortModel } from "@mui/x-data-grid/models/gridSortModel";

export const getValidPageSize = (pageSize: string): number => {
	if (isNumber(pageSize)) {
		let size = parseInt(pageSize);
		size = size <= 100 ? size : 100; // page size cannot exceed 100 in DataGrid
		return size;
	}
	return 100; // default page size
};
export const getValidPage = (page: string): number => {
	if (isNumber(page)) {
		let newSize = parseInt(page);
		newSize = newSize > 1 ? newSize : 1;
		return newSize;
	}
	return 1; // default page
};

export const qsValueToGridOrdering = (ordering: string): GridSortModel => {
	const matches = /^(-?)(.*)$/.exec(ordering);
	if (!matches) return [];

	const [, filterPrefix, fieldName] = matches;

	const sortModel: GridSortItem = {
		field: fieldName,
		sort: filterPrefix === "-" ? "desc" : "asc",
	};

	return [sortModel];
};

export const gridOrderingToQSValue = (sortModel: GridSortModel): string | undefined => {
	if (sortModel.length) {
		const modelItem = sortModel[0];
		return (modelItem.sort === "desc" ? "-" : "") + modelItem.field;
	}
	return undefined;
};

export const getOperationsColumnWidth = (operationsCount: number): number => 50 + 50 * operationsCount;
