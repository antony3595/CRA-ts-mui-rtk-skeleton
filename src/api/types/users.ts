import { PageableParams } from "./base";
import { BaseGroup } from "./groups";

export interface UserMin {
	id: number;
	username: string;
}

export interface CurrentUser extends UserMin {
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	email: string;
	is_superuser: boolean;
	is_staff: boolean;
	groups: BaseGroup[];
	permissions: string[];
}

export interface User extends Omit<CurrentUser, "permissions"> {
	last_login: string | null;
	is_active: true;
}

export interface ResetPasswordRequestDTO {
	new_password: string;
	re_new_password: string;
}

export interface ChangePasswordRequestDTO {
	current_password: string;
	new_password: string;
	re_new_password: string;
}

export interface UsersFilterParams extends PageableParams {
	is_active?: boolean | null;
	is_superuser?: boolean | null;
	is_staff?: boolean | null;
	groups?: string;
}

export interface UserUpdateDTO {
	username: string;
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	is_active: boolean;

	is_staff: boolean;
	is_superuser: boolean;
	groups: number[];
}

export interface UserCreateDTO {
	username: string;
	password: string;
	password2: string;
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	is_active: boolean;

	is_staff: boolean;
	is_superuser: boolean;
	groups: number[];
}
