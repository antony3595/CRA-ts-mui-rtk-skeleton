import React, { lazy } from "react";
import strings from "./strings";
import AppDrawer from "../components/header/AppDrawer";
import LoginRequired from "../components/common/wrappers/LoginRequired";
import * as u from "../urls";
import HomeView from "../components/views/Home/HomeView";
import ChangePasswordView from "../components/views/auth/ChangePasswordView";
import PermissionRequired from "../components/common/wrappers/PermissionRequired";
import { NonIndexRouteObject } from "react-router/dist/lib/context";
import PageNotFound from "../components/views/PageNotFound404/PageNotFound";
import LoginView from "../components/views/auth/LoginView";
import AnonymousRequired from "../components/common/wrappers/AnonymousRequired";

const UsersView = lazy(() => import("../components/views/users/UsersView"));
const GroupsView = lazy(() => import("../components/views/groups/GroupsView"));

export interface RoutePathDefinition extends Omit<NonIndexRouteObject, "children"> {
	title: string;
	children?: RoutePathDefinition[];
	path: string;
}

export const routes: RoutePathDefinition[] = [
	{
		title: strings.home_page,
		path: "/",
		element: <LoginRequired outlet={<AppDrawer />} />,
		children: [
			{
				title: strings.home_page,
				path: u.HOME,
				element: <HomeView />,
			},
			{
				title: strings.reset_password,
				path: u.PASSWORD_RESET,
				element: <ChangePasswordView />,
			},

			{
				title: strings.users,
				path: u.USERS,
				element: <PermissionRequired permission={"view_appuser"} outlet={<UsersView />} />,
			},
			{
				title: strings.roles,
				path: u.GROUPS,
				element: <PermissionRequired permission={"view_group"} outlet={<GroupsView />} />,
			},
			{
				title: strings.page_not_found,
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
	{
		title: strings.sign_in_,
		path: u.LOGIN,
		element: <AnonymousRequired outlet={<LoginView />} />,
	},
];
