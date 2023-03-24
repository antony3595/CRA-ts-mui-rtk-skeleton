import { StateStatus } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { ActionsStatusesState, ActionStatusKey, AsyncActions } from "./types";
import { addAsyncActionsCases } from "./loadingUtils";
import { fetchAccounts, fetchAllAccountsMin } from "../content/accounts/accountsSlice";
import { fetchAllGroups } from "../content/groups/groupsSlice";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { fetchToken } from "../auth/authSlice";

export const initialState: ActionsStatusesState = {
	auth: StateStatus.INITIAL,
	accounts: StateStatus.INITIAL,
	accountsAllMin: StateStatus.INITIAL,
	groups: StateStatus.INITIAL,
};

const asyncActions: AsyncActions = {
	auth: fetchToken,
	accounts: fetchAccounts,
	accountsAllMin: fetchAllAccountsMin,
	groups: fetchAllGroups,
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
