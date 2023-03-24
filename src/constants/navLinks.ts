import SvgIcon from "@mui/material/SvgIcon/SvgIcon";
import HomeIcon from "@mui/icons-material/Home";
import strings from "./strings";
import * as urls from "../urls";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import { Role } from "../api/types/base";
import { SidebarListItemProps } from "../components/header/SidebarNavigation/SidebarNavLink";
import { FC } from "react";

export interface BaseNavLink {
	label: string;
	requiredRoles?: Role[];
}

export interface NavLink extends BaseNavLink {
	to: string;
	Icon?: typeof SvgIcon;
	CustomComponent?: FC<SidebarListItemProps>;
}

export interface LinkGroup extends BaseNavLink {
	Icon?: typeof SvgIcon;
	sublinks: NavLink[];
}

export const isLinkGroup = (obj: NavLink | LinkGroup): obj is LinkGroup => (obj as LinkGroup).sublinks !== undefined;

const adminNavLinks: (NavLink | LinkGroup)[] = [
	{
		label: strings.home_page,
		to: urls.HOME,
		Icon: HomeIcon,
	},
	{
		label: strings.accounts,
		to: urls.ACCOUNTS,
		Icon: PeopleIcon,
		requiredRoles: [Role.ADMIN],
	},
];

export const profileLinks: NavLink[] = [
	{
		label: strings.change_password,
		to: urls.PASSWORD_RESET,
		Icon: LockIcon,
	},
];

export default adminNavLinks;
