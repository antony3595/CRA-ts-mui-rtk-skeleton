import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavLinkGroup from "./SidebarNavLinkGroup";
import adminNavLinks, { isLinkGroup, LinkGroup, NavLink } from "../../../constants/navLinks";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";
import strings from "../../../constants/strings";
import { ListSubheader } from "@mui/material";
import { AuthState } from "../../../redux/auth/types";
import { hasPermission, hasPermissions } from "../../../redux/utils/authUtils";

interface SidebarNavigationProps {
	closeSidebar: () => void;
}

const getFilteredNavLinks = (links: (NavLink | LinkGroup)[], auth: AuthState, closeSidebar: () => void) =>
	links
		.filter(
			(navlink) =>
				(navlink.requiredPermission ? hasPermission(auth.permissionsMap, navlink.requiredPermission) : true) &&
				(navlink.requiredPermissions ? hasPermissions(auth.permissionsMap, navlink.requiredPermissions) : true)
		)
		.map((link, index) =>
			isLinkGroup(link) ? (
				<SidebarNavLinkGroup onClick={() => closeSidebar()} key={index} link={link} />
			) : link.CustomComponent ? (
				<link.CustomComponent onClick={() => closeSidebar()} key={index} link={link} />
			) : (
				<SidebarNavLink onClick={() => closeSidebar()} key={index} link={link} />
			)
		);

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ closeSidebar }) => {
	const auth = useAppSelector(selectAuth);

	const filteredNavLinks = getFilteredNavLinks(adminNavLinks, auth, closeSidebar);
	return (
		<div>
			<div>
				<Divider />

				<List dense>
					{filteredNavLinks.length && (
						<ListSubheader sx={{ backgroundColor: "secondary.main" }}>{strings.administration}</ListSubheader>
					)}
					{filteredNavLinks}
				</List>
			</div>
		</div>
	);
};

export default SidebarNavigation;
