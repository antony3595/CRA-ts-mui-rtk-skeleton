import React from "react";
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import { PaginationProps } from "@mui/material/Pagination/Pagination";

const MyDataGridPagination: React.FC<PaginationProps> = (props) => {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			count={pageCount}
			page={page + 1}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
			{...props}
		/>
	);
};

export default MyDataGridPagination;
