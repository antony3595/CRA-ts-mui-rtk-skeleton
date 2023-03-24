import { AxiosResponse } from "axios";

export type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

export enum ResponseStatus {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	FAIL = "FAIL",
}

export enum Role {
	ADMIN = "admin",
	MANAGER = "manager",
}

export interface BaseResponse<Data> {
	status: ResponseStatus;
	error: string | null;
	data: Data;
	errors: PartialRecord<string, never> | null;
}

export interface SuccessResponse<Data> {
	status: ResponseStatus.SUCCESS;
	error: string | null;
	data: Data;
	errors: PartialRecord<string, never>;
}

export interface ErrorResponse<E extends keyof any = ""> {
	status: ResponseStatus.ERROR | ResponseStatus.FAIL;
	data: null;
	error: string;
	errors: PartialRecord<E, string> | null;
}

export interface SearchParams {
	search?: string;
}

export interface PageableParams extends SearchParams {
	page?: number;
	size?: number;
}

export interface PaginatedBody<T> {
	count: number;
	next?: boolean;
	current?: number;
	previous?: boolean;
	total_pages: number;
	results: T[];
}

export interface APIErrors<E extends keyof any = ""> {
	error?: string;
	errors?: PartialRecord<E, string> | null;
}

export const isSuccessResponse = (response: AxiosResponse<BaseResponse<any>>): response is AxiosResponse<SuccessResponse<any>> =>
	response?.data.status === ResponseStatus.SUCCESS;
