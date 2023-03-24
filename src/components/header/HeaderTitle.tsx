import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderTitleProps {
	title: React.ReactChild;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
	if (typeof title === "string")
		return (
			<Typography variant="h6" sx={{ flexGrow: 1 }} noWrap component="div">
				{title}
			</Typography>
		);

	return <Box sx={{ flexGrow: 1, display: "flex" }}>{title}</Box>;
};

export default HeaderTitle;
