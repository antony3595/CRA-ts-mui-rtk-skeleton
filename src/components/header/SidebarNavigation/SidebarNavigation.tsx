import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavLinkGroup from "./SidebarNavLinkGroup";
import adminNavLinks, { isLinkGroup, LinkGroup, NavLink } from "../../../constants/navLinks";
import { useAppSelector } from "../../../redux/hooks";
import { AuthState, selectAuth } from "../../../redux/auth/authSlice";
import { hasOneOfRoles } from "../../../utils/apiUtils";
import { Role } from "../../../api/types/base";
import strings from "../../../constants/strings";
import { ListSubheader } from "@mui/material";

interface SidebarNavigationProps {
	closeSidebar: () => void;
}

const getFilteredNavLinks = (links: (NavLink | LinkGroup)[], auth: AuthState, closeSidebar: () => void) =>
	links
		.filter((navlink) => (navlink.requiredRoles ? hasOneOfRoles(auth, navlink.requiredRoles) : true))
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

	return (
		<div>
			<div>
				<Divider />

				<List dense>
					{hasOneOfRoles(auth, [Role.ADMIN, Role.MANAGER]) && (
						<ListSubheader sx={{ backgroundColor: "secondary.main" }}>{strings.administration}</ListSubheader>
					)}
					{getFilteredNavLinks(adminNavLinks, auth, closeSidebar)}
				</List>
			</div>
		</div>
	);
};

export default SidebarNavigation;
