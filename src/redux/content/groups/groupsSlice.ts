import { APIErrors, BaseResponse } from "../../../api/types/base";
import { SimpleGroup } from "../../../api/types/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrors } from "../../../utils/errorsUtils";
import { logout } from "../../commonActions";
import { RootState } from "../../store";
import strings from "../../../constants/strings";
import { getGroups } from "../../../api/admin/users";

export interface GroupsState {
	allGroups: SimpleGroup[];
}

const initialState: GroupsState = {
	allGroups: [],
};

export const fetchAllGroups = createAsyncThunk<BaseResponse<SimpleGroup[]>, void, { rejectValue: APIErrors }>(
	"groups/all/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getGroups();
			return response.data;
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
			.addCase(fetchAllGroups.fulfilled, (state, { payload }) => {
				state.allGroups = payload.data;
			})
			.addCase(logout, () => {
				return initialState;
			});
	},
});

export const selectAllGroups = (state: RootState): SimpleGroup[] => state.adminContent.groups.allGroups;

export default groupsSlice.reducer;
