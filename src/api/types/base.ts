import { AxiosResponse } from "axios";

export type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

export enum ResponseStatus {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	FAIL = "FAIL",
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

export interface SearchParams {
	search?: string;
}

export interface OrderingParams {
	ordering?: string;
}

export interface PageableParams extends SearchParams, OrderingParams {
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

export interface APIErrors<E = object> {
	error?: string;
	errors?: E | null;
}

export interface APIFile {
	id: number;
	file: string;
	file_name: string;
}

export const isSuccessResponse = (response: AxiosResponse<BaseResponse<any>>): response is AxiosResponse<SuccessResponse<any>> =>
	response?.data.status === ResponseStatus.SUCCESS;
