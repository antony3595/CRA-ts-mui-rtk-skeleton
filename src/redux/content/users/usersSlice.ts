import { APIErrors, PageableParams, PaginatedBody } from "../../../api/types/base";
import { User, UserMin } from "../../../api/types/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrors } from "../../../utils/errorsUtils";
import { logout } from "../../commonActions";
import strings from "../../../constants/strings";
import { RootState } from "../../store";
import { getAllUsers, getUsers } from "../../../api/admin/users";
import { initialPageableState } from "../../../constants/api";

export type UsersState = {
	all: UserMin[];
	paginated: PaginatedBody<User>;
};

const initialState: UsersState = {
	all: [],
	paginated: initialPageableState,
};

export const fetchUsers = createAsyncThunk<PaginatedBody<User>, PageableParams | undefined, { rejectValue: APIErrors }>(
	"users/fetch",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getUsers(params);
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "аккаунты"));
		}
	}
);

export const fetchAllUsers = createAsyncThunk<UserMin[], undefined, { rejectValue: APIErrors }>(
	"users/all/min/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getAllUsers();
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "аккаунты"));
		}
	}
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, { payload }) => {
				state.paginated = payload;
			})
			.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
				state.all = payload;
			})
			.addCase(logout, () => {
				return initialState;
			});
	},
});

export const selectPaginatedUsers = (state: RootState) => state.adminContent.users.paginated;
export const selectAllUsers = (state: RootState) => state.adminContent.users.all;

export default usersSlice.reducer;
