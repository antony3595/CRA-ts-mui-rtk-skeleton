import { APIErrors } from "../../api/types/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../api/adminAPI";
import { RootState } from "../store";
import { logout } from "../commonActions";
import { getApiErrors } from "../../utils/errorsUtils";
import { CurrentUser } from "../../api/types/users";

import { PermissionStr } from "../../api/types/permissions";
import { AuthState, CurrentUserPermissions } from "./types";
import { getUserData } from "../../api/admin/users";
import { BasicCredentials, BasicCredentialsErrors, TokenDTO } from "../../api/types/auth";
import { updateAllAPIsTokens } from "../utils/authUtils";

const initialState: AuthState = {
	loggedIn: false,
	user: {
		id: 0,
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		is_staff: false,
		is_superuser: false,
		groups: [],
		permissions: [],
	},
	token: {
		expiry: "",
		token: "",
	},
	permissionsMap: {},
};

export const fetchToken = createAsyncThunk<TokenDTO, BasicCredentials, { rejectValue: APIErrors<BasicCredentialsErrors> }>(
	"auth/token/fetch",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await getToken(credentials);
			updateAllAPIsTokens(response.data.data.token);
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors<BasicCredentialsErrors>(e));
		}
	}
);

export const fetchCurrentUser = createAsyncThunk<CurrentUser, undefined, { rejectValue: APIErrors }>(
	"auth/current_user/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getUserData();
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e));
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchToken.fulfilled, (state, { payload }) => {
				state.token = payload;
				state.loggedIn = true;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
				state.user = payload;

				state.permissionsMap = payload.permissions.reduce<CurrentUserPermissions>((previousValue, currentValue) => {
					// app_label игнорируется, права используются без него
					const [, permission] = currentValue.split(".");
					previousValue[permission as PermissionStr] = true;
					return previousValue;
				}, {});

				state.loggedIn = true;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectCurrentUser = (state: RootState): CurrentUser => state.auth.user;
export const selectCurrentUserPermissions = (state: RootState): CurrentUserPermissions => state.auth.permissionsMap;

export default authSlice.reducer;
