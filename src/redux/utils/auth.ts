import { RootState } from "../store";
import { loadState } from "../../utils/localStorageUtils";

export const getStoredToken = (): string => {
	const state: RootState | undefined = loadState();
	return state?.auth.data.token || "";
};
