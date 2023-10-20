import { FormikProps } from "formik";
import * as React from "react";

interface FormikInputProps<Values> {
	id: keyof Values;
	name: keyof Values;
	value: Values[keyof Values] | string;
	error: boolean;
	helperText: string;
	onChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	fullWidth: boolean;
	autoComplete: string;
}

interface FormikErrorProps {
	error: boolean;
	helperText: string;
}

export const formikInputProps = <Values>(key: keyof Values, formik: FormikProps<Values>, defaultHelperText = " "): FormikInputProps<Values> => {
	const isError = formik.touched[key] && Boolean(formik.errors[key]);
	const helperText = formik.touched[key] && formik.errors[key] ? (formik.errors[key] as string) : defaultHelperText;
	return {
		error: isError,
		helperText: helperText,
		id: key,
		name: key,
		value: formik.values[key] || "",
		onChange: formik.handleChange,
		fullWidth: true,
		autoComplete: "off",
	};
};

export const formikErrorProps = <Values>(key: keyof Values, formik: FormikProps<Values>): FormikErrorProps => {
	const isError = formik.touched[key] && Boolean(formik.errors[key]);
	const error = formik.touched[key] && formik.errors[key] ? (formik.errors[key] as string) : " ";
	return {
		error: isError,
		helperText: error,
	};
};
