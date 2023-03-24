import React, { useState } from "react";
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInputProps } from "@mui/material/OutlinedInput/OutlinedInput";
import { FormControlProps } from "@mui/material/FormControl/FormControl";

interface PasswordInputProps extends OutlinedInputProps {
	FormControlProps?: FormControlProps;
	label: string;
	helperText?: React.ReactNode;
}

const sxProps = {
	error: {
		"& .MuiInputLabel-root": {
			color: "error.main",
		},
		"& .MuiFormHelperText-root": {
			color: "error.main",
		},
	},
};

const PasswordInput = ({ label, FormControlProps, helperText, error, fullWidth, margin, ...restProps }: PasswordInputProps) => {
	const [isPassVisible, setPassVisible] = useState<boolean>(false);
	const handleClickTogglePassword = () => {
		setPassVisible(!isPassVisible);
	};

	return (
		<FormControl
			{...FormControlProps}
			sx={{ ...(error ? sxProps.error : {}), ...FormControlProps?.sx }}
			fullWidth={fullWidth}
			variant="outlined"
			margin={margin}
		>
			<InputLabel>{label}</InputLabel>
			<OutlinedInput
				{...restProps}
				margin={margin}
				label={label}
				error={error}
				type={isPassVisible ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton tabIndex={-1} aria-label="toggle password visibility" onClick={handleClickTogglePassword} edge="end">
							{isPassVisible ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default PasswordInput;
