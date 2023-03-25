import { PageableParams, Role } from "./base";

export interface UserMin {
	id: number;
	username: string;
}

export interface CurrentUser extends UserMin {
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	phone: string | null;
	email: string;
	role: Role;
}

export interface User extends CurrentUser {
	is_active: boolean;
	last_login: string;
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

export interface AccountsFilterParams extends PageableParams {
	role?: string | null;
	is_active?: boolean | null;
}

export interface AccountUpdateDTO {
	username: string;
	first_name: string | null;
	last_name: string | null;
	middle_name: string | null;
	phone: string | null;
	is_active: boolean;
	role: Role;
}

export interface AccountCreateDTO {
	username: string;
	password: string;
	password2: string;
	email: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	phone: string;
	is_active: boolean;
	role: Role;
}

export interface SimpleGroup {
	id: number;
	name: string;
}
