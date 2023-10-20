import { adminAPI } from "../adminAPI";
import * as ep from "../endpoints";
import { BaseResponse } from "../types/base";
import { Permission } from "../types/permissions";

export const getPermissions = () => {
	return adminAPI.get<BaseResponse<Permission[]>>(ep.PERMISSIONS);
};
