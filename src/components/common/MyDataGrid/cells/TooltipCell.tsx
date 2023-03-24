import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { getBooleanIcon } from "../../../../utils/iconsUtils";

export const TooltipCell = <T extends string>(params: GridRenderCellParams<T>) => (
	<Tooltip title={params.value || ""} placement={"bottom-start"}>
		<span>{params.value || ""}</span>
	</Tooltip>
);

export const BooleanCell = (params: GridRenderCellParams<boolean | null>) => getBooleanIcon(params.value);

export const ThumbCell = (params: GridRenderCellParams<boolean | null>) =>
	params.value === true ? <ThumbUpIcon color={"success"} /> : params.value === false ? <ThumbDownIcon color={"error"} /> : null;
