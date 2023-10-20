import { Navigate, useLocation } from "react-router-dom";
import { HOME } from "../../../urls";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";

import { PermissionStr } from "../../../api/types/permissions";
import { hasPermission } from "../../../redux/utils/authUtils";

export type BasePermissionRequiredProps = {
	outlet: JSX.Element;
};

type PermissionRequiredProps = BasePermissionRequiredProps &
	({ permission: PermissionStr; permissions?: never } | { permission?: never; permissions: PermissionStr[] });

const PermissionRequired = ({ outlet, permission, permissions }: PermissionRequiredProps) => {
	const location = useLocation();
	const { loggedIn, permissionsMap } = useAppSelector(selectAuth);

	const hasPermissions = permission
		? hasPermission(permissionsMap, permission)
		: permissions?.every((perm) => hasPermission(permissionsMap, perm));

	if (loggedIn && hasPermissions) {
		return outlet;
	} else {
		return <Navigate to={{ pathname: HOME }} replace state={{ next: location.pathname }} />;
	}
};

export default PermissionRequired;
