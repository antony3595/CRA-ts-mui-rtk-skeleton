import { BaseResponse, ResponseStatus } from "../api/types/base";

export const wrapDataWithResponse = <T>(data: T): BaseResponse<T> => ({
	status: ResponseStatus.SUCCESS,
	data: data,
	error: null,
	errors: null,
});
