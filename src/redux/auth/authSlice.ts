import { BasicCredentials, TokenDTO } from "../../api/types/auth";
import { APIErrors, BaseResponse, Role } from "../../api/types/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseState } from "../types";
import { getToken } from "../../api/adminAPI";
import { RootState } from "../store";
import { logout } from "../commonActions";
import { getApiErrors } from "../../utils/errorsUtils";
import { updateAllAPIsTokens } from "../../utils/apiUtils";

export interface AuthState extends BaseState<TokenDTO> {
	loggedIn: boolean;
}

const initialState: AuthState = {
	loggedIn: false,
	data: {
		expiry: "",
		token: "",
		user: {
			id: 0,
			username: "",
			first_name: "",
			last_name: "",
			middle_name: "",
			phone: "",
			email: "",
			role: Role.MANAGER,
			groups: [],
		},
	},
};

export const fetchToken = createAsyncThunk<BaseResponse<TokenDTO>, BasicCredentials, { rejectValue: APIErrors<keyof BasicCredentials> }>(
	"auth/fetchToken",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await getToken(credentials);
			updateAllAPIsTokens(response.data.data.token);
			return response.data as BaseResponse<TokenDTO>;
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
				state.data = { ...state.data, ...payload.data };
				state.loggedIn = true;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
