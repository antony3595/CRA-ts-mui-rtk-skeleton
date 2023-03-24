import { AuthState } from "../redux/auth/authSlice";
import { Role } from "../api/types/base";
import { adminAPI } from "../api/adminAPI";

export const updateAllAPIsTokens = (token: string) => {
	adminAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
};

export const hasOneOfRoles = (auth: AuthState, roles: Array<Role>): boolean => {
	return roles.some((role) => role == auth.data.user.role);
};

export const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
