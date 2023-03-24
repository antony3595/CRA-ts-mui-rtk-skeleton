import React from "react";

import HeaderUserDropdown from "./HeaderUserDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Avatar, Box, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const sxProps = {
	container: {
		height: "100%",
	},
	menuButton: {
		mr: 2,
	},
	sectionDesktop: {
		height: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
		position: "relative",
		display: "flex",
	},
	userIconButton: {
		fontSize: 2.3,
		color: "neutral.main",
		position: "relative",
	},
	userIcon: {
		width: 32,
		height: 32,
	},
	fabProgress: {
		position: "absolute",
		zIndex: 1,
	},
};

const HeaderUser: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const isLoading = false;
	const username = useSelector<RootState, string>((state) => state.auth.data.user.username);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuId = "primary-account-menu";

	return (
		<Box component={"div"} sx={sxProps.container}>
			<Box component={"div"} sx={sxProps.sectionDesktop}>
				<IconButton
					sx={sxProps.userIconButton}
					edge={"end"}
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
				>
					<Avatar sx={sxProps.userIcon}>{username?.charAt(0)?.toUpperCase()}</Avatar>
					{isLoading && <CircularProgress sx={sxProps.fabProgress} />}
				</IconButton>
			</Box>
			<HeaderUserDropdown anchorEl={anchorEl} isMenuOpen={isMenuOpen} menuId={menuId} handleMenuClose={handleMenuClose} />
		</Box>
	);
};

export default HeaderUser;
