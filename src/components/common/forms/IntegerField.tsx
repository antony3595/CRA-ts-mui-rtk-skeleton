import { TextFieldProps } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { NUMBERS } from "../../../constants/regularExpressions";

export type IntegerFieldProps = Omit<TextFieldProps, "onChange"> & {
	onChange: TextFieldProps["onChange"];
};

const IntegerField = ({ onChange, ...restProps }: IntegerFieldProps) => {
	const customChangeHandler: TextFieldProps["onChange"] = (event) => {
		event.target.value = event.target.value.replace(NUMBERS, "");
		if (onChange) {
			onChange(event);
		}
	};

	return <TextField {...restProps} onChange={customChangeHandler} />;
};

export default IntegerField;
