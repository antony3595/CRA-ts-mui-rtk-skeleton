export const stringToBoolean = (str: string | null): boolean | undefined => {
	return str === "1" ? true : str === "0" ? false : undefined;
};
