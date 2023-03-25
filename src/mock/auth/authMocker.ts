import MockAdapter from "axios-mock-adapter";
import { LOGIN, LOGOUT } from "../../api/endpoints";
import { BaseResponse } from "../../api/types/base";
import { TokenDTO } from "../../api/types/auth";
import loginResponseData from "./authData";

export const mockAuthApi = (mockAdapter: MockAdapter) => {
	mockAdapter.onPost(LOGIN).reply<BaseResponse<TokenDTO>>(200, loginResponseData);
	mockAdapter.onPost(LOGOUT).reply(200);
};
