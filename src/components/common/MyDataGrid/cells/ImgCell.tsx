import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { isString } from "formik";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { Popover, Tooltip } from "@mui/material";
import strings from "../../../../constants/strings";

export const ImageCellComponent = <T,>({ params }: { params: GridRenderCellParams<T> }) => {
	const [isError, setError] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	useEffect(() => {
		setError(false);
	}, [params.value]);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	if (!isString(params.value))
		return (
			<Tooltip placement={"bottom-start"} title={strings.unable_to_load_image}>
				<BrokenImageIcon />
			</Tooltip>
		);

	return !isError ? (
		<>
			<span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
				{params.value}
			</span>
			<Popover
				sx={{
					pointerEvents: "none",
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<img src={params.value} onError={() => setError(true)} alt="logo" width="200px" />
			</Popover>
		</>
	) : (
		<Tooltip placement={"bottom-start"} title={strings.unable_to_load_image}>
			<span>{params.value || ""}</span>
		</Tooltip>
	);
};

export const ImageCell = <T,>(params: GridRenderCellParams<T>) => {
	return <ImageCellComponent params={params} />;
};
