import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import Button from "@mui/material/Button";
import { Popover } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem";

export const PopoverListCellComponent = <T extends string[]>({ params }: { params: GridRenderCellParams<T> }) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<Button onClick={handleClick}>{params.value?.length}</Button>
			<Popover
				sx={{
					maxHeight: "200px",
				}}
				open={open && Boolean(params.value?.length)}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<List>
					{params.value?.map((item, index) => (
						<ListItem key={index}>
							<ListItemText primary={item}></ListItemText>
						</ListItem>
					))}
				</List>
			</Popover>
		</div>
	);
};

export const PopoverListCell = <T extends string[]>(params: GridRenderCellParams<T>) => {
	return <PopoverListCellComponent params={params} />;
};
