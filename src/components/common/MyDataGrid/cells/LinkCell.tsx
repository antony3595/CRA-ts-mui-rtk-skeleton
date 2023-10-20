import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Link, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

export const LinkCell = <T,>(
	params: GridRenderCellParams<T>,
	linkGetter?: (params: GridRenderCellParams<T>) => string,
	titleGetter?: (params: GridRenderCellParams<T>) => string
) => {
	const link = (linkGetter ? linkGetter(params) : params.value?.toString()) || "";
	const title = (titleGetter ? titleGetter(params) : params.value?.toString()) || "";
	return (
		<Tooltip placement={"bottom-start"} title={title}>
			{title.startsWith("http") ? (
				<Link component={"a"} target={"_blank"} href={link}>
					{title}
				</Link>
			) : (
				<Typography variant={"caption"}>{title}</Typography>
			)}
		</Tooltip>
	);
};
