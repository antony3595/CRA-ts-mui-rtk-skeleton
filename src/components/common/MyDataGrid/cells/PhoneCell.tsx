import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Stack } from "@mui/material";
import { thinHorizontalScrollbarSX } from "../../forms/Dropzone/styles";

export const PhoneCell = (params: GridRenderCellParams<string>) => <a href={`tel:${params.value}`}>{params.value}</a>;

export const PhonesListCell = (params: GridRenderCellParams<string>) => {
	const phones = params.value?.split(",");

	return phones ? (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				overflowX: "auto",
				...thinHorizontalScrollbarSX,
			}}
		>
			{phones.map((item, index) => {
				const phone = item.trim();
				return (
					<a key={index} href={`tel:${phone}`}>
						{phone}
					</a>
				);
			})}
		</Stack>
	) : null;
};
