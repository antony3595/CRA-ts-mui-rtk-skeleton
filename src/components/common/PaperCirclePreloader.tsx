import React from "react";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress } from "@mui/material";

const PaperCirclePreloader = () => {
	return (
		<Box
			component={Paper}
			sx={{
				display: "flex",
				justifyContent: "center",
				px: 1,
				py: 2,
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default PaperCirclePreloader;
