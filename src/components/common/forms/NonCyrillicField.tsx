import { TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import strings from "../../../constants/strings";
import { CYRILLIC_REGEXP } from "../../../constants/regularExpressions";

export type NonCyrillicFieldProps = Omit<TextFieldProps, "onChange"> & {
	onChange: TextFieldProps["onChange"];
};

const NonCyrillicField = ({ onChange, ...restProps }: NonCyrillicFieldProps) => {
	const [hasCyrillicError, setHasCyrillicError] = useState(false);
	const customHelperText = strings.latin_numbers_and_special_characters_allowed;

	const error = hasCyrillicError || restProps.error;
	const helperText = hasCyrillicError ? customHelperText : restProps.helperText;

	const customChangeHandler: TextFieldProps["onChange"] = (event) => {
		const value = event.target.value;

		if (value.match(CYRILLIC_REGEXP)) {
			setHasCyrillicError(true);
		} else {
			setHasCyrillicError(false);
		}

		event.target.value = event.target.value.replace(CYRILLIC_REGEXP, "");
		if (onChange) {
			onChange(event);
		}
	};

	return <TextField {...restProps} error={error} helperText={helperText} onChange={customChangeHandler} />;
};

export default NonCyrillicField;
