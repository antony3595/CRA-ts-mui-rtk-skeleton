import React from "react";
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";

export interface MyRadioGroupItem<T extends string> {
	label: string;
	value: T;
}

export interface MyRadioGroupProps<T extends string> {
	choices: MyRadioGroupItem<T>[];
	title: string;
	value?: T | null;
	onChange: (value: T) => void;
	error?: boolean;
	helperText?: string;
	fullWidth?: boolean;

	name?: string;
	id?: string;
}

const MyRadioGroup = <T extends string>({
	choices,
	value,
	onChange,
	title,
	error = false,
	helperText = "",
	fullWidth = false,
	name,
	id,
}: MyRadioGroupProps<T>) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange((event.target as HTMLInputElement).value as T);
	};
	return (
		<Box>
			<FormControl fullWidth={fullWidth}>
				<FormLabel error={error} sx={{ wordBreak: "break-word" }}>
					{title}
				</FormLabel>
				<RadioGroup name={name} id={id} sx={{ mt: 2 }} value={value} onChange={handleChange}>
					{choices.map((choice) => (
						<FormControlLabel key={choice.value} value={choice.value} control={<Radio />} label={choice.label} />
					))}
				</RadioGroup>
			</FormControl>
			<FormHelperText
				sx={{
					ml: "12px !important",
				}}
				error={error}
			>
				{helperText || " "}
			</FormHelperText>
		</Box>
	);
};

export default MyRadioGroup;
