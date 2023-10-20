import { APIErrors, PageableParams, PaginatedBody } from "../../../api/types/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrors } from "../../../utils/errorsUtils";
import { logout } from "../../commonActions";
import { RootState } from "../../store";
import strings from "../../../constants/strings";
import { BaseGroup, Group } from "../../../api/types/groups";
import { getAllGroups, getPaginatedGroups } from "../../../api/admin/groups";
import { initialPageableState } from "../../../constants/api";

export interface GroupsState {
	all: BaseGroup[];
	paginated: PaginatedBody<Group>;
}

const initialState: GroupsState = {
	all: [],
	paginated: initialPageableState,
};

export const fetchPaginatedGroups = createAsyncThunk<PaginatedBody<Group>, PageableParams, { rejectValue: APIErrors }>(
	"groups/paginated/fetch",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getPaginatedGroups(params);
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "группы"));
		}
	}
);

export const fetchAllGroups = createAsyncThunk<BaseGroup[], void, { rejectValue: APIErrors }>(
	"groups/all/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getAllGroups();
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "группы"));
		}
	}
);

const groupsSlice = createSlice({
	name: "groups",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPaginatedGroups.fulfilled, (state, { payload }) => {
				state.paginated = payload;
			})
			.addCase(fetchAllGroups.fulfilled, (state, { payload }) => {
				state.all = payload;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectAllGroups = (state: RootState): BaseGroup[] => state.adminContent.groups.all;
export const selectPaginatedGroups = (state: RootState): PaginatedBody<Group> => state.adminContent.groups.paginated;

export default groupsSlice.reducer;
