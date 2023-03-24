import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import authReducer from "./auth/authSlice";
import actionsStatusesReducer from "./actionsStatuses/actionsStatusesSlice";
import actionsErrorsReducer from "./actionsErrors/actionsErrorsSlice";
import { loadState, saveState } from "../utils/localStorageUtils";
import accountsReducer from "./content/accounts/accountsSlice";
import groupsReducer from "./content/groups/groupsSlice";

const persistedState = loadState();

const rootReducer = combineReducers({
	app: appReducer,
	statuses: actionsStatusesReducer,
	errors: actionsErrorsReducer,
	auth: authReducer,
	adminContent: combineReducers({
		accounts: accountsReducer,
		groups: groupsReducer,
	}),
});

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

store.subscribe(() => {
	saveState(store.getState());
});
