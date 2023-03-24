import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import SidebarNavLink from "./SidebarNavLink";
import { LinkGroup, NavLink } from "../../../constants/navLinks";
import { darken } from "@mui/material";
import Divider from "@mui/material/Divider";

export interface SidebarNavLinkGroupProps {
	link: LinkGroup;
	onClick: (link: NavLink) => void;
}

const sxProps = {
	listItem: {},
	caret: {
		transition: "transform 450ms cubic-bezier(.23,1,.32,1) !important",
	},
	open: {
		transform: "rotate(180deg)",
	},
};

const SidebarNavLinkGroup: React.FC<SidebarNavLinkGroupProps> = ({ link, onClick }) => {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<ListItemButton
				divider
				onClick={() => setOpen(!open)}
				sx={(theme) => ({
					backgroundColor: darken(theme.palette.background.default, 0.1),
				})}
			>
				{link.Icon && (
					<ListItemIcon>
						<link.Icon />
					</ListItemIcon>
				)}
				<ListItemText primary={link?.label} />
				<ExpandMore sx={{ ...sxProps.caret, ...(open && sxProps.open) }} />
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{link?.sublinks?.map((link, index) => (
					<SidebarNavLink onClick={onClick} key={index} link={link} isNested />
				))}
				<Divider />
			</Collapse>
		</>
	);
};

export default SidebarNavLinkGroup;
