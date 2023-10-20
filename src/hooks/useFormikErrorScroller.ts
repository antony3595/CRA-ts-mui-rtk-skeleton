import { FormikProps, isString } from "formik";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import strings from "../constants/strings";

export const useFormikErrorScroller = <Values>(formik: FormikProps<Values>, withSnackbar = false) => {
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const firstErrorKey = (Object.keys(formik.errors) as (keyof typeof formik.errors)[]).find(
			(key) => formik.errors[key] && formik.touched[key]
		);
		if (firstErrorKey && isString(firstErrorKey) && formik.isSubmitting) {
			if (withSnackbar) {
				enqueueSnackbar(strings.fix_errors_above, { variant: "warning" });
			}

			const element: HTMLElement | null = document.getElementById(firstErrorKey);
			element?.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [formik.errors, formik.touched, formik.isSubmitting]);
};
