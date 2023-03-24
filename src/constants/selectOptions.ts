import strings from "./strings";
import { Role } from "../api/types/base";

export const roleDisplay = {
	[Role.ADMIN]: strings.admin,
	[Role.MANAGER]: strings.manager,
};

export const getRoleDisplay = (role: Role): string => roleDisplay[role];

export const roleOptions = [
	{ title: strings.admin, value: Role.ADMIN },
	{ title: strings.manager, value: Role.MANAGER },
];
