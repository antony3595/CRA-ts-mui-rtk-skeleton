import { StateStatus } from "../types";
import { AsyncThunk } from "@reduxjs/toolkit";
import { APIErrors } from "../../api/types/base";

export interface ActionsStatusesState {
	auth: StateStatus;
	accounts: StateStatus;
	accountsAllMin: StateStatus;
	groups: StateStatus;
}

export type ActionStatusKey = keyof ActionsStatusesState;

export type AsyncActions = {
	[K in keyof ActionsStatusesState]: AsyncThunk<any, any, { rejectValue: APIErrors<keyof any>; state?: any }>;
};
