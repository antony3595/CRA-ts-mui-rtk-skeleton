import { StateStatus } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { ActionsStatusesState, ActionStatusKey, AsyncActions } from "./types";
import { addAsyncActionsCases } from "./loadingUtils";
import { fetchAllUsers, fetchUsers } from "../content/users/usersSlice";
import { fetchAllGroups, fetchPaginatedGroups } from "../content/groups/groupsSlice";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { fetchCurrentUser, fetchToken } from "../auth/authSlice";
import { fetchAllPermissions } from "../content/permissions/permissionsSlice";

export const initialState: ActionsStatusesState = {
	token: StateStatus.INITIAL,
	currentUserData: StateStatus.INITIAL,

	users: StateStatus.INITIAL,
	allUsers: StateStatus.INITIAL,
	allGroups: StateStatus.INITIAL,
	paginatedGroups: StateStatus.INITIAL,
	allPermissions: StateStatus.INITIAL,
};

const asyncActions: AsyncActions = {
	token: fetchToken,
	currentUserData: fetchCurrentUser,
	users: fetchUsers,
	allUsers: fetchAllUsers,
	allGroups: fetchAllGroups,
	paginatedGroups: fetchPaginatedGroups,
	allPermissions: fetchAllPermissions,
};

const actionsStatusesSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(logout, () => initialState);
		Object.keys(asyncActions).forEach((key) => {
			addAsyncActionsCases(builder, key as keyof AsyncActions, asyncActions[key as keyof AsyncActions]);
		});
	},
});

export const createLoadingSelector = (keys: ActionStatusKey[]) => (state: RootState) => {
	return keys.some((key) => state.statuses[key as ActionStatusKey] === StateStatus.LOADING);
};

export const createStatusSelector = (key: ActionStatusKey) => (state: RootState) => {
	return state.statuses[key as ActionStatusKey];
};

export default actionsStatusesSlice.reducer;
