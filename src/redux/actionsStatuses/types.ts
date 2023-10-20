import { StateStatus } from "../types";
import { AsyncThunk } from "@reduxjs/toolkit";
import { APIErrors } from "../../api/types/base";

export interface ActionsStatusesState {
	token: StateStatus;
	currentUserData: StateStatus;
	users: StateStatus;
	allUsers: StateStatus;
	allGroups: StateStatus;
	paginatedGroups: StateStatus;
	allPermissions: StateStatus;


}

export type ActionStatusKey = keyof ActionsStatusesState;

export type AsyncActions = {
	[K in keyof ActionsStatusesState]: AsyncThunk<any, any, { rejectValue: APIErrors; state?: any }>;
};
