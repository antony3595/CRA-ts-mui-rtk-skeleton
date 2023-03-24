import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { profileLinks } from "../../../constants/navLinks";
import { Avatar, CardHeader, LinearProgress, Popover } from "@mui/material";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LogoutButton from "./LogoutButton";
import ListItemButton from "@mui/material/ListItemButton";
import { hasOneOfRoles } from "../../../utils/apiUtils";

interface HeaderUserDropdownProps {
	anchorEl: null | HTMLElement;
	isMenuOpen: boolean;
	menuId: string;

	handleMenuClose(): void;
}

const sxProps = {
	container: {
		width: "270px",
	},
};

const HeaderUserDropdown = ({ anchorEl, isMenuOpen, handleMenuClose, menuId }: HeaderUserDropdownProps) => {
	const auth = useAppSelector((state) => state.auth);
	const username = auth.data.user.username;
	const location = useLocation();

	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<Popover
			PaperProps={{
				sx: sxProps.container,
			}}
			id={menuId}
			open={isMenuOpen}
			anchorEl={anchorEl}
			onClose={handleMenuClose}
			keepMounted
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
		>
			<CardHeader avatar={<Avatar>{username && username.charAt(0).toUpperCase()}</Avatar>} title={username} />
			{isLoading && <LinearProgress />}
			<Divider />
			<List>
				{profileLinks
					.filter((profileLink) => (profileLink.requiredRoles ? hasOneOfRoles(auth, profileLink.requiredRoles) : true))
					.map((profileLink, index) => {
						const isActive = location.pathname.indexOf(profileLink.to) !== -1;
						return (
							<ListItemButton
								key={index}
								component={Link}
								to={profileLink.to}
								onClick={() => handleMenuClose()}
								selected={isActive}
								className="link_reset"
							>
								<ListItemIcon>
									{profileLink.Icon && <profileLink.Icon color={isActive ? "primary" : undefined} />}
								</ListItemIcon>
								<ListItemText primary={profileLink.label} />
							</ListItemButton>
						);
					})}
				<LogoutButton isLoading={isLoading} setLoading={setLoading} />
			</List>
		</Popover>
	);
};

export default HeaderUserDropdown;
