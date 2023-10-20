import { adminAPI } from "../../api/adminAPI";
import { CurrentUserPermissions, ModelPermissions } from "../auth/types";
import { DjangoModelAction, DjangoModelName, PermissionStr } from "../../api/types/permissions";
import { RootState } from "../store";
import { loadState } from "../../utils/localStorageUtils";

export const updateAllAPIsTokens = (token: string) => {
	adminAPI.defaults.headers.common["Authorization"] = `Token ${token}`;
};

export const hasPermissions = (userPermissions: CurrentUserPermissions, requiredPermissions: PermissionStr[]): boolean => {
	return requiredPermissions.every((permissionStr) => userPermissions[permissionStr]);
};

export const extractModelPermissions = (permissions: CurrentUserPermissions, modelName: DjangoModelName): ModelPermissions => {
	return Object.values(DjangoModelAction).reduce<ModelPermissions>(
		(previousValue, currentValue) => {
			const permKey: PermissionStr = `${currentValue}_${modelName}`;
			previousValue[currentValue] = Boolean(permissions[permKey]);
			return previousValue;
		},
		{
			[DjangoModelAction.VIEW]: false,
			[DjangoModelAction.ADD]: false,
			[DjangoModelAction.CHANGE]: false,
			[DjangoModelAction.DELETE]: false,
		}
	);
};

export const getStoredToken = (): string => {
	const state: RootState | undefined = loadState();
	return state?.auth.token.token || "";
};
export const hasPermission = (permissions: CurrentUserPermissions, permissionStr: PermissionStr): boolean => {
	return Boolean(permissions[permissionStr]);
};
