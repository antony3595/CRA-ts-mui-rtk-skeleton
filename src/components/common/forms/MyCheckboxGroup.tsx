import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export interface MyCheckboxGroupItem<T extends string> {
	label: string;
	value: T;
}

export interface MyCheckboxGroupProps<T extends string> {
	choices: MyCheckboxGroupItem<T>[];
	title: string;
	values: T[];
	onChange: (values: T[]) => void;
	error?: boolean;
	helperText?: string;
	fullWidth?: boolean;
}

const CheckboxesGroup = <T extends string>({
	choices,
	values,
	onChange,
	title,
	error = false,
	helperText = "",
	fullWidth = false,
}: MyCheckboxGroupProps<T>) => {
	const handleChange = (value: T) => {
		let newValues: T[];

		if (values.includes(value)) {
			newValues = values.filter((item) => item !== value);
		} else {
			newValues = [...values, value];
		}

		onChange(newValues);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<FormControl fullWidth={fullWidth} required error={error} component="fieldset" sx={{ m: 3, width: "100%" }} variant="standard">
				<FormLabel sx={{ wordBreak: "break-word" }}>{title}</FormLabel>
				<FormGroup>
					{choices.map((choice) => (
						<FormControlLabel
							key={choice.value}
							control={<Checkbox checked={values.includes(choice.value)} onChange={() => handleChange(choice.value)} />}
							label={choice.label}
						/>
					))}
				</FormGroup>
				<FormHelperText
					sx={{
						ml: "12px !important",
					}}
					error={error}
				>
					{helperText || " "}
				</FormHelperText>
			</FormControl>
		</Box>
	);
};
export default CheckboxesGroup;
