import axios, { AxiosInstance } from "axios";
import config from "../config";
import { BasicCredentials, TokenDTO } from "./types/auth";
import * as ep from "./endpoints";
import { BaseResponse } from "./types/base";
import { getStoredToken } from "../redux/utils/authUtils";
import { store } from "../redux/store";
import { logout } from "../redux/commonActions";

const baseURL = config.API_URL + "admin-api";

export const adminAPI: AxiosInstance = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json", accept: "application/json;charset=utf-8" },
});

adminAPI.defaults.headers.common["Authorization"] = `Token ${getStoredToken()}`;

adminAPI.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			store.dispatch(logout());
		}
		return Promise.reject(error);
	}
);

export const getToken = (credentials: BasicCredentials) => {
	return adminAPI.post<BaseResponse<TokenDTO>>(ep.LOGIN, null, { auth: credentials });
};
