import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { ru } from "date-fns/locale";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface MyDatePickerProps<TInputDate, TDate> extends Omit<DatePickerProps<TInputDate, TDate>, "renderInput"> {
	textFieldProps?: TextFieldProps;
	helperText?: string;
	error?: boolean;
}

const MyDatePicker: React.FC<MyDatePickerProps<Date, Date>> = ({ helperText, textFieldProps, error, onChange, ...restProps }) => {
	return (
		<LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
			<DatePicker
				{...restProps}
				onChange={onChange}
				renderInput={(params: TextFieldProps) => (
					<TextField {...params} {...textFieldProps} error={error} helperText={helperText} />
				)}
			/>
		</LocalizationProvider>
	);
};

export default MyDatePicker;
