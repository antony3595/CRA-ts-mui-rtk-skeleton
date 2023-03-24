import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { isString } from "formik";
import { Link, Tooltip } from "@mui/material";

export const LinkCell = <T,>(params: GridRenderCellParams<T>) => {
	return (
		isString(params.value) && (
			<Tooltip placement={"bottom-start"} title={params.value || ""}>
				<Link component={"a"} target={"_blank"} href={params.value || ""}>
					{params.value || ""}
				</Link>
			</Tooltip>
		)
	);
};
