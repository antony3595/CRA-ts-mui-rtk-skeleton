import { useEffect } from "react";
import { FormikErrors, FormikProps, setNestedObjectValues } from "formik";

export const useFormikApiErrorsSetter = <E extends FormikErrors<Values> | undefined | null, Values>(
	errors: E,
	formik: FormikProps<Values>,
	setTouched = false
) => {
	useEffect(() => {
		if (errors) {
			formik.setErrors({ ...formik.errors, ...errors });

			if (setTouched) {
				formik.setTouched({ ...formik.touched, ...(errors ? setNestedObjectValues(errors, true) : {}) }, false);
			}
		}
	}, [errors]);
};
