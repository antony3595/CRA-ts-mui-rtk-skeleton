import React from "react";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const sxProps = {
	root: {
		position: "fixed",
		bottom: 16,
		right: 16,
		zIndex: 100,
	},
};

export const ScrollTopButton: React.FC = () => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = () => {
		window.scroll({
			behavior: "smooth",
			top: 0,
		});
	};

	return (
		<Zoom in={trigger}>
			<Box onClick={handleClick} role="presentation" sx={sxProps.root}>
				<Fab color="primary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</Box>
		</Zoom>
	);
};
