import { isString } from "formik";
import { KeysOfType } from "../types/global";

export const emptyArrayOrWithElement = <T>(condition: boolean, element: T): T[] => (condition ? [element] : []);

export const filterArrayBySearchValue = <T>(array: T[], searchValue: string, getLookupValue: (item: T) => string): T[] => {
	return array.filter((item) => {
		const lookupValue = getLookupValue(item);
		if (isString(lookupValue)) {
			return lookupValue.toLowerCase().includes(searchValue.toLowerCase());
		}
		return false;
	});
};

export function not<T>(a: readonly T[], b: readonly T[], key?: keyof T) {
	if (key) return a.filter((valueA) => !b.find((valueB) => valueA[key] == valueB[key]));
	else return a.filter((valueA) => !b.find((valueB) => valueA == valueB));
}

export function intersection<T>(a: readonly T[], b: readonly T[], key: keyof T) {
	return a.filter((valueA) => !!b.find((valueB) => valueA[key] == valueB[key]));
}

export const arrayToObject = <T extends object>(array: T[], keyField: KeysOfType<T, string>): { [K in string]: T } => {
	return array.reduce((obj, item) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		obj[item[keyField]] = item;
		return obj;
	}, {});
};

export const removeValueByIndex = <T,>(array: T[], elementIndex: number) => {
	return array.filter((value, index) => index !== elementIndex);
};
