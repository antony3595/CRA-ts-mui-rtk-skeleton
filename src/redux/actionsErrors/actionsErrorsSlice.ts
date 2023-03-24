import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionErrorKey, ActionsErrorsState, AsyncActions } from "./types";
import { actionErrorsInitialState, addAsyncActionsCases } from "./errorsUtils";
import { fetchAccounts, fetchAllAccountsMin } from "../content/accounts/accountsSlice";
import { fetchAllGroups } from "../content/groups/groupsSlice";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { fetchToken } from "../auth/authSlice";

export const initialState: ActionsErrorsState = {
	auth: actionErrorsInitialState,
	accounts: actionErrorsInitialState,
	accountsAllMin: actionErrorsInitialState,
	groups: actionErrorsInitialState,
};

const asyncActions: AsyncActions = {
	auth: fetchToken,
	accounts: fetchAccounts,
	accountsAllMin: fetchAllAccountsMin,
	groups: fetchAllGroups,
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

export const createErrorsSelector = (keys: ActionErrorKey[]) => (state: RootState) => {
	return keys.map((key) => state.errors[key as ActionErrorKey]);
};

export const createErrorSelector = (key: ActionErrorKey) => (state: RootState) => state.errors[key];

export default actionsErrorsSlice.reducer;
