import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { lighten, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { NavLink } from "../../../constants/navLinks";

export interface SidebarListItemProps {
	link: NavLink;
	onClick: (link: NavLink) => void;
	isNested?: boolean;
}

const SidebarNavLink: React.FC<SidebarListItemProps> = ({ link, onClick, isNested }) => {
	return (
		<ListItem
			divider={isNested}
			sx={(theme) => ({
				backgroundColor: isNested ? lighten(theme.palette.background.default, 0.5) : theme.palette.background.default,
			})}
			disablePadding
		>
			<ListItemButton component={Link} onClick={() => onClick(link)} to={link.to}>
				{link.Icon && !isNested && (
					<ListItemIcon>
						<link.Icon />
					</ListItemIcon>
				)}
				<ListItemText inset={!link.Icon && !isNested} primary={link.label} />
			</ListItemButton>
		</ListItem>
	);
};

export default SidebarNavLink;
