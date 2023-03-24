import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Copyright = () => (
	<Typography variant="body2" color="textSecondary" align="center">
		{"Copyright © "}
		<Link color="inherit" href="https://happy.kg/">
			Mobile Solutions
		</Link>{" "}
		{new Date().getFullYear()}
		{"."}
	</Typography>
);

export default Copyright;
