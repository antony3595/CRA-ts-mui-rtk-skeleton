import React, { useEffect } from "react";
import { DataGridProps, GridCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { LinearProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import useQueryState from "../../../hooks/useQueryState";
import MyDataGridPagination from "./MyDataGridPagination";
import copyStringToClipboard from "../../../utils/windowUtils";
import { isNumber } from "../../../utils/tsUtils";
import strings from "../../../constants/strings";

export interface MyDataGridProps extends DataGridProps {
	copyCellOnDoubleClick?: boolean;
}

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
		newSize = newSize > 1 ? newSize : 1; // page size cannot exceed 100 in DataGrid
		return newSize;
	}
	return 1; // default page
};

const MyDataGrid: React.FC<MyDataGridProps> = ({ copyCellOnDoubleClick = false, ...restProps }) => {
	const { enqueueSnackbar } = useSnackbar();

	const [page, setPage] = useQueryState("page", "0");
	const [size, setPageSize] = useQueryState("size", "100");

	useEffect(() => {
		if (isNumber(size) && parseInt(size) > 100) setPageSize("100");
	}, [size, setPageSize]);

	const copyCellValueToClipboard = (params: GridCellParams) => {
		if (params.value) {
			copyStringToClipboard(params.value).then(
				() => enqueueSnackbar(strings.value_copied, { variant: "info" }),
				(reason) => enqueueSnackbar(reason, { variant: "error" })
			);
		}
	};

	return (
		<div style={{ display: "flex", width: "100%", height: "100%" }}>
			<div style={{ height: "100%", width: "100%", overflowX: "auto" }}>
				<DataGrid
					{...restProps}
					onCellDoubleClick={copyCellOnDoubleClick ? copyCellValueToClipboard : restProps.onCellDoubleClick}
					sx={{ background: "white", minHeight: "400px" }}
					components={{
						Pagination: MyDataGridPagination,
						LoadingOverlay: LinearProgress,
						...restProps.components,
					}}
					pageSize={getValidPageSize(size)}
					onPageSizeChange={(newSize) => setPageSize(newSize.toString())}
					page={getValidPage(page) - 1}
					onPageChange={(newPage) => setPage((newPage + 1).toString())}
					componentsProps={{
						pagination: {
							disabled: restProps.loading,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default MyDataGrid;
