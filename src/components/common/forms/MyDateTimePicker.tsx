import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { ru } from "date-fns/locale";
import { DateTimePicker, DateTimePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface MyDateTimePickerProps<TInputDate, TDate> extends Omit<DateTimePickerProps<TInputDate, TDate>, "renderInput"> {
	textFieldProps?: TextFieldProps;
	helperText?: string;
	error?: boolean;
}

const MyDateTimePicker: React.FC<MyDateTimePickerProps<Date, Date>> = ({ helperText, textFieldProps, error, onChange, ...restProps }) => {
	return (
		<LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
			<DateTimePicker
				{...restProps}
				onChange={onChange}
				renderInput={(params: TextFieldProps) => (
					<TextField {...params} {...textFieldProps} error={error} helperText={helperText} />
				)}
			/>
		</LocalizationProvider>
	);
};

export default MyDateTimePicker;
