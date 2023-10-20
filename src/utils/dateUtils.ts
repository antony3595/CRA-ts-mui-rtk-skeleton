import { format, isValid, parse } from "date-fns";
import { DateRange } from "../components/common/forms/Datepicker/MyDateRangePicker";
import { isNumber } from "./tsUtils";

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

export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
	const date = new Date(startDate.getTime());
	const dates = [];

	while (date <= endDate) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return dates;
};

const TIME_AS_DAYS_COEFFICIENT = 1000 * 3600 * 24;

export const daysDiff = (startDate: Date, endDate: Date): number => {
	return (endDate.getTime() - startDate.getTime()) / TIME_AS_DAYS_COEFFICIENT;
};

export const getDateRangeDisplay = (range: DateRange): string => {
	const startDate = range.startDate ? stringifyDate(range.startDate) : "-";
	const endDate = range.endDate ? stringifyDate(range.endDate) : "-";

	return `${startDate} - ${endDate}`;
};

export const calculateAge = (birthDate: Date | null) => {
	if (birthDate) {
		const diffMs = Date.now() - birthDate.getTime();
		const ageDt = new Date(diffMs);
		return Math.abs(ageDt.getUTCFullYear() - 1970) || 0;
	}
	return "";
};

export const isDateStringValid = (dateStr: string): boolean => {
	try {
		const date = parseDateString(dateStr, BACKEND_DATE_FORMAT);
		return isValid(date);
	} catch (e) {
		return false;
	}
};

export const getDateRangeByPeriod = (period: number): DateRange => {
	if (isNumber(period)) {
		const periodNumber = period;
		const endDate = new Date();
		const startDate = addDays(endDate, -periodNumber);
		return { startDate: startDate, endDate: endDate };
	}
	return { startDate: null, endDate: null };
};
