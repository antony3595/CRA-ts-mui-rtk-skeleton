import SvgIcon from "@mui/material/SvgIcon/SvgIcon";
import HomeIcon from "@mui/icons-material/Home";
import strings from "./strings";
import * as urls from "../urls";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import { SidebarListItemProps } from "../components/header/SidebarNavigation/SidebarNavLink";
import { FC } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { PermissionStr } from "../api/types/permissions";

export type BaseNavLink = {
	label: string;
	requiredPermission?: PermissionStr;
	requiredPermissions?: PermissionStr[];
};

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
		label: strings.users,
		to: urls.USERS,
		Icon: PeopleIcon,
		requiredPermission: "view_appuser",
	},
	{
		label: strings.roles,
		to: urls.GROUPS,
		Icon: GroupsIcon,
		requiredPermission: "view_group",
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
