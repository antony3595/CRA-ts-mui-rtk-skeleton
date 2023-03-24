import { stripHtmlTags } from "../../../../utils/globalUtils";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const RichTextCell = <T extends string>(params: GridRenderCellParams<T>) => {
	return (
		<Tooltip
			componentsProps={{
				tooltip: {
					sx: {
						wordBreak: "break-word",
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 4,
						WebkitBoxOrient: "vertical",
						maxHeight: 4 * 24,
					},
				},
			}}
			title={stripHtmlTags(params.value || "")}
		>
			<Typography
				sx={{
					wordBreak: "break-word",
					overflow: "hidden",
					width: "100%",
					textOverflow: "ellipsis",
					display: "-webkit-box",
					WebkitLineClamp: 4,
					WebkitBoxOrient: "vertical",
					maxHeight: 4 * 25,
				}}
				variant={"caption"}
			>
				{stripHtmlTags(params.value || "")}
			</Typography>
		</Tooltip>
	);
};
