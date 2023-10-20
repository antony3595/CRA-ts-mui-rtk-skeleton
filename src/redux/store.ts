import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import authReducer from "./auth/authSlice";
import actionsStatusesReducer from "./actionsStatuses/actionsStatusesSlice";
import actionsErrorsReducer from "./actionsErrors/actionsErrorsSlice";
import { loadState, saveState } from "../utils/localStorageUtils";
import usersReducer from "./content/users/usersSlice";
import groupsReducer from "./content/groups/groupsSlice";
import permissionsReducer from "./content/permissions/permissionsSlice";

const persistedState = loadState();

const rootReducer = combineReducers({
	app: appReducer,
	statuses: actionsStatusesReducer,
	errors: actionsErrorsReducer,
	auth: authReducer,
	adminContent: combineReducers({
		users: usersReducer,
		groups: groupsReducer,
		permissions: permissionsReducer,
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
