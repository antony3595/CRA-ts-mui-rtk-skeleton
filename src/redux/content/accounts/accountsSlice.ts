import { APIErrors, PageableParams, PaginatedBody } from "../../../api/types/base";
import { User, UserMin } from "../../../api/types/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrors } from "../../../utils/errorsUtils";
import { logout } from "../../commonActions";
import strings from "../../../constants/strings";
import { RootState } from "../../store";
import { getAllUsers, getUsers } from "../../../api/admin/users";
import { initialPageableState } from "../../../constants/api";

export type AccountsState = {
	all: UserMin[];
	paginated: PaginatedBody<User>;
};

const initialState: AccountsState = {
	all: [],
	paginated: initialPageableState,
};

export const fetchAccounts = createAsyncThunk<PaginatedBody<User>, PageableParams | undefined, { rejectValue: APIErrors<""> }>(
	"accounts/fetch",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getUsers(params);
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "аккаунты"));
		}
	}
);

export const fetchAllAccountsMin = createAsyncThunk<UserMin[], undefined, { rejectValue: APIErrors<""> }>(
	"accounts/all/min/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getAllUsers();
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "аккаунты"));
		}
	}
);

const accountsSlice = createSlice({
	name: "accounts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
				state.paginated = payload;
			})
			.addCase(fetchAllAccountsMin.fulfilled, (state, { payload }) => {
				state.all = payload;
			})
			.addCase(logout, () => {
				return initialState;
			});
	},
});

export const selectPaginatedAccounts = (state: RootState) => state.adminContent.accounts.paginated;
export const selectAllMinAccounts = (state: RootState) => state.adminContent.accounts.all;

export default accountsSlice.reducer;
