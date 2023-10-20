import { adminAPI } from "../adminAPI";
import * as ep from "../endpoints";
import { BaseGroup, CreateUpdateGroupDTO, Group } from "../types/groups";
import { BaseResponse, PageableParams, PaginatedBody } from "../types/base";

export const getAllGroups = () => {
	return adminAPI.get<BaseResponse<BaseGroup[]>>(ep.ALL_GROUPS);
};

export const getPaginatedGroups = (params: PageableParams) => {
	return adminAPI.get<BaseResponse<PaginatedBody<Group>>>(ep.GROUPS, { params });
};

export const postGroup = (data: CreateUpdateGroupDTO) => {
	return adminAPI.post(ep.GROUPS, data);
};

export const putGroup = (id: number | string, data: CreateUpdateGroupDTO) => {
	return adminAPI.put(`${ep.GROUPS + id.toString()}/`, data);
};

export const deleteGroup = (id: string | number) => {
	return adminAPI.delete(`${ep.GROUPS + id.toString()}/`);
};
