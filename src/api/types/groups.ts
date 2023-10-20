import { Permission } from "./permissions";

export interface BaseGroup {
	id: number;
	name: string;
}

export interface Group extends BaseGroup {
	permissions: Permission[];
}

export interface CreateUpdateGroupDTO {
	name: string;
	permissions: number[];
}
