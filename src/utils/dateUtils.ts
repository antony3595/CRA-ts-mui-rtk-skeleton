import { format, parse } from "date-fns";

export const BACKEND_DATE_FORMAT = "dd.MM.yyyy";
export const BACKEND_DATETIME_FORMAT = "dd.MM.yyyy HH:mm:ss";
export const BACKEND_TIME_FORMAT = "HH:mm:ss";

export const isDate = function (value: unknown): value is Date {
	return value instanceof Date || (typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]");
};

export const removeSecondsFromDatetimeString = (dateString?: string): string | undefined =>
	dateString ? dateString.slice(0, -3) : undefined;

export const removeTimeFromDatetimeString = (dateString: string | null): string | undefined =>
	dateString ? dateString.split(" ")[0] : undefined;

export const parseDateString = (originalValue: string | null, dateFormat: string = BACKEND_DATETIME_FORMAT): Date | null => {
	try {
		if (originalValue) {
			return parse(originalValue, dateFormat, new Date());
		}
		return null;
	} catch (e: any) {
		return null;
	}
};

export const stringifyDate = (date: Date, dateFormat: string = BACKEND_DATE_FORMAT): string | null => {
	try {
		return format(date, dateFormat);
	} catch (e: any) {
		return null;
	}
};

export const addDays = (date: Date, days: number) => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const addMonths = (date: Date, months: number) => {
	const result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
};
