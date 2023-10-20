import MockAdapter from "axios-mock-adapter";
import { BaseResponse, PaginatedBody } from "../../api/types/base";
import { usersResponseData, allUsersResponseData } from "./usersData";
import { User } from "../../api/types/users";
import { CHANGE_PASSWORD, USERS, USERS_ALL_MIN } from "../../api/endpoints";
import { wrapDataWithResponse } from "../mockUtils";

export const mockUsersApi = (mockAdapter: MockAdapter) => {
	mockAdapter.onGet(USERS).reply<BaseResponse<PaginatedBody<User>>>(200, wrapDataWithResponse(usersResponseData));
	mockAdapter.onPost(USERS).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));
	mockAdapter.onPut(/\/users\/\d+\/$/).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));

	mockAdapter.onGet(USERS_ALL_MIN).reply<BaseResponse<User[]>>(200, wrapDataWithResponse(allUsersResponseData));
	mockAdapter.onPost(/\/users\/\d+\/reset_password\//).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));
	mockAdapter.onPost(/\/users\/\d+\/block\//).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));
	mockAdapter.onPost(/\/users\/\d+\/unblock\//).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));
	mockAdapter.onPost(CHANGE_PASSWORD).reply<BaseResponse<null>>(200, wrapDataWithResponse(null));
};
