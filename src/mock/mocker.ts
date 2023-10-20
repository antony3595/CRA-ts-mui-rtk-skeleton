import MockAdapter from "axios-mock-adapter";
import { adminAPI } from "../api/adminAPI";
import { mockAuthApi } from "./auth/authMocker";
import { mockUsersApi } from "./users/usersMocker";

export const enableMockAPI = () => {
	const coreApiMock = new MockAdapter(adminAPI, { delayResponse: 1000 });

	mockAuthApi(coreApiMock);
	mockUsersApi(coreApiMock);
};
