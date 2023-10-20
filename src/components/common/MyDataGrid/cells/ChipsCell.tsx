import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Chip, Stack } from "@mui/material";
import { thinHorizontalScrollbarSX } from "../../forms/Dropzone/styles";

export const ChipsCell = <T extends string[]>(params: GridRenderCellParams<T>) => (
	<Stack
		direction="row"
		spacing={1}
		sx={{
			overflowX: "auto",
			...thinHorizontalScrollbarSX,
		}}
	>
		{params.value?.map((item, index) => (
			<Chip sx={{ mb: 1 }} key={index} label={item} size={"small"} />
		))}
	</Stack>
);
