import strings from "./strings";

export interface BooleanFilter {
	title: () => string;
	value: "1" | "0";
}

export const booleanOptions: BooleanFilter[] = [
	{ title: () => strings.yes, value: "1" },
	{ title: () => strings.no, value: "0" },
];
