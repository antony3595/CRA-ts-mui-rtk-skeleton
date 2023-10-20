import strings from "../constants/strings";
import { AxiosResponse, isAxiosError } from "axios";
import { APIErrors, BaseResponse } from "../api/types/base";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

export const isError = function (e: any): e is Error {
	return e && e.stack && e.message;
};

export const getApiResponseErrorMessage = (response: AxiosResponse<BaseResponse<any>>): string => {
	return response.data?.error || strings.unknown_error;
};

export const getApiErrors = <E>(e: any, defaultMessage = strings.unknown_error): APIErrors<E> => {
	if (isAxiosError(e)) {
		return { error: e.response?.data.error || defaultMessage, errors: e.response?.data.errors || null };
	} else if (isError(e)) return { error: e.message, errors: null };
	return { error: "unknown error :(", errors: null };
};

export const toastApiErrorHandler =
	(snackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) => (e: any) => {
		snackbar(getApiErrors(e).error, { variant: "error" });
	};
