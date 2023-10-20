import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Tooltip } from "@mui/material";

export const TooltipCell = <T extends string>(params: GridRenderCellParams<T>) => (
	<Tooltip title={params.value || ""} placement={"bottom-start"}>
		<span>{params.value || ""}</span>
	</Tooltip>
);
