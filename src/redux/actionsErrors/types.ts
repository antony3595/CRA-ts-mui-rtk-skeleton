import { AsyncThunk } from "@reduxjs/toolkit";
import { APIErrors } from "../../api/types/base";
import { ActionStatusKey } from "../actionsStatuses/types";
import { BasicCredentials } from "../../api/types/auth";

export interface ActionsErrorsState {
	auth: APIErrors<keyof BasicCredentials>;
	accounts: APIErrors;
	accountsAllMin: APIErrors;
	groups: APIErrors;
}

export type ActionErrorKey = ActionStatusKey;

export type AsyncActions = {
	[K in keyof ActionsErrorsState]: AsyncThunk<any, any, { rejectValue: APIErrors<keyof any>; state?: any }>;
};
