import { KeysOfType } from "../types/global";
import { isString } from "formik";

export const emptyArrayOrWithElement = <T>(condition: boolean, element: T): T[] => (condition ? [element] : []);

export const filterArrayBySearchValue = <T>(array: T[], searchValue: string, labelField: KeysOfType<T, string>): T[] => {
	return array.filter((item) => {
		const itemValue = item[labelField];
		if (isString(itemValue)) {
			return itemValue.toLowerCase().includes(searchValue.toLowerCase());
		}
		return false;
	});
};
