import { SelectProps } from "@mui/material/Select";
import React from "react";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface MySelectProps extends SelectProps {
	helperText?: string | string[];
}

const MySelect: React.FC<MySelectProps> = ({ label, error, helperText, variant, fullWidth, margin, size, ...restProps }) => {
	return (
		<FormControl variant={variant} fullWidth={fullWidth} margin={margin} error={error} size={size}>
			<InputLabel>{label}</InputLabel>
			<Select MenuProps={MenuProps} {...restProps} label={label} />
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default MySelect;
