import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionErrorKey, ActionsErrorsState, AsyncActions } from "./types";
import { actionErrorsInitialState, addAsyncActionsCases } from "./errorsUtils";
import { fetchAllUsers, fetchUsers } from "../content/users/usersSlice";
import { fetchAllGroups, fetchPaginatedGroups } from "../content/groups/groupsSlice";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { fetchCurrentUser, fetchToken } from "../auth/authSlice";
import { fetchAllPermissions } from "../content/permissions/permissionsSlice";

export const initialState: ActionsErrorsState = {
	token: actionErrorsInitialState,
	currentUserData: actionErrorsInitialState,
	users: actionErrorsInitialState,
	allUsers: actionErrorsInitialState,
	allGroups: actionErrorsInitialState,
	paginatedGroups: actionErrorsInitialState,
	allPermissions: actionErrorsInitialState,
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

const actionsErrorsSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		clearError: (state, action: PayloadAction<keyof ActionsErrorsState>) => {
			state[action.payload] = actionErrorsInitialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => initialState);
		Object.keys(asyncActions).forEach((key) => {
			addAsyncActionsCases(builder, key as keyof AsyncActions, asyncActions[key as keyof AsyncActions]);
		});
	},
});

export const { clearError } = actionsErrorsSlice.actions;

export const errorsSelector = (state: RootState) => state.errors;

export const createFormErrorsSelector =
	<K extends ActionErrorKey>(key: K) =>
	(state: RootState): ActionsErrorsState[K]["errors"] => {
		return state.errors[key as ActionErrorKey].errors;
	};

export default actionsErrorsSlice.reducer;
