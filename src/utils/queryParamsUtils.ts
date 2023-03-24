import { stringifyDate } from "./dateUtils";
import { KeysOfType } from "../types/global";

export const getUrlsSearchParamsOfObject = <T extends object>(obj: T): URLSearchParams => {
	const searchParams = new URLSearchParams();
	Object.keys(obj).forEach((key) => {
		const filterKey = key as KeysOfType<T, string | Date>;
		const value = obj[filterKey];
		if (value) {
			if (value instanceof Date) {
				const date = stringifyDate(value);
				if (date) {
					searchParams.set(filterKey, date);
				}
			} else {
				searchParams.set(filterKey, value.toString());
			}
		}
	});
	return searchParams;
};
