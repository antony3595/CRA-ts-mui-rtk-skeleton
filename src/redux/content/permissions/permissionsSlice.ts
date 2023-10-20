import { APIErrors } from "../../../api/types/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiErrors } from "../../../utils/errorsUtils";
import { logout } from "../../commonActions";
import { RootState } from "../../store";
import strings from "../../../constants/strings";
import { Permission } from "../../../api/types/permissions";
import { getPermissions } from "../../../api/admin/permissions";

export interface PermissionsState {
	all: Permission[];
}

const initialState: PermissionsState = {
	all: [],
};

export const fetchAllPermissions = createAsyncThunk<Permission[], void, { rejectValue: APIErrors }>(
	"permissions/all/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getPermissions();
			return response.data.data;
		} catch (e) {
			return rejectWithValue(getApiErrors(e, strings.unable_to_fetch_ + "группы"));
		}
	}
);

const permissionsSlice = createSlice({
	name: "permissions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPermissions.fulfilled, (state, { payload }) => {
				state.all = payload;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectAllPermissions = (state: RootState): Permission[] => state.adminContent.permissions.all;

export default permissionsSlice.reducer;
