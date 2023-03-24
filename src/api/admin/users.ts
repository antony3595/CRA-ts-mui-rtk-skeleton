import * as ep from "../endpoints";
import { AccountCreateDTO, AccountUpdateDTO, ChangePasswordRequestDTO, ResetPasswordRequestDTO, User, UserMin } from "../types/users";
import { BaseResponse, PageableParams, PaginatedBody } from "../types/base";
import { adminAPI } from "../adminAPI";

export const changePassword = (data: ChangePasswordRequestDTO) => {
	return adminAPI.post<BaseResponse<null>>(ep.CHANGE_PASSWORD, data);
};
export const resetPassword = (userId: number, data: ResetPasswordRequestDTO) => {
	return adminAPI.post<BaseResponse<null>>(`/users/${userId}/reset_password/`, data);
};
export const getUsers = (params?: PageableParams) => {
	return adminAPI.get<BaseResponse<PaginatedBody<User>>>(ep.USERS, { params });
};
export const getAllUsers = () => {
	return adminAPI.get<BaseResponse<UserMin[]>>(ep.USERS_ALL_MIN);
};
export const blockUser = (userId: number) => {
	return adminAPI.post<BaseResponse<null>>(`/users/${userId}/block/`);
};
export const unblockUser = (userId: number) => {
	return adminAPI.post<BaseResponse<null>>(`/users/${userId}/unblock/`);
};
export const logoutUser = () => {
	return adminAPI.post(ep.LOGOUT, null);
};
export const createUser = (data: AccountCreateDTO) => {
	return adminAPI.post(ep.USERS, data);
};
export const updateUser = (userId: number, data: AccountUpdateDTO) => {
	return adminAPI.put(`/users/${userId}/`, data);
};
export const getGroups = () => {
	return adminAPI.get(`/groups/`);
};
