import { AsyncThunk } from "@reduxjs/toolkit";
import { APIErrors } from "../../api/types/base";
import { ActionStatusKey } from "../actionsStatuses/types";
import { BasicCredentialsErrors } from "../../api/types/auth";

export interface ActionsErrorsState {
	token: APIErrors<BasicCredentialsErrors>;
	currentUserData: APIErrors;
	users: APIErrors;
	allUsers: APIErrors;
	allGroups: APIErrors;
	paginatedGroups: APIErrors;
	allPermissions: APIErrors;
}

export type ActionErrorKey = ActionStatusKey;

export type AsyncActions = {
	[K in keyof ActionsErrorsState]: AsyncThunk<any, any, { rejectValue: ActionsErrorsState[K]; state?: any }>;
};
