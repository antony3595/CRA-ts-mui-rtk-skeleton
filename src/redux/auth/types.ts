import { DjangoModelAction, PermissionStr } from "../../api/types/permissions";
import { CurrentUser } from "../../api/types/users";
import { TokenDTO } from "../../api/types/auth";

export type CurrentUserPermissions = { [K in PermissionStr]+?: boolean };

export type ModelPermissions = {
	[K in DjangoModelAction]: boolean;
};

export interface AuthState {
	loggedIn: boolean;
	user: CurrentUser;
	token: TokenDTO;
	permissionsMap: CurrentUserPermissions;
}
