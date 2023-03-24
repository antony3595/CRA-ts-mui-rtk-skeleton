import React from "react";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { HOME } from "../../../urls";
import config from "../../../config";

const SidebarToolbar = () => {
	return (
		<Toolbar color={"secondary.main"}>
			<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
				<ListItemButton component={Link} to={HOME}>
					<ListItemText
						sx={{ my: 0 }}
						primary={config.SITE_NAME}
						primaryTypographyProps={{
							sx: {
								fontSize: 20,
								fontWeight: "medium",
								letterSpacing: 0,
								textAlign: "center",
							},
						}}
					/>
				</ListItemButton>
			</Box>
		</Toolbar>
	);
};

export default SidebarToolbar;
