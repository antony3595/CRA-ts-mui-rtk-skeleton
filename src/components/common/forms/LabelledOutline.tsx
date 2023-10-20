import React from "react";
import { Box, FormHelperText, InputLabel, useTheme } from "@mui/material";
import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import { SxProps, Theme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

interface LabelledOutlineProps {
	id?: string;
	label?: string;
	children: React.ReactElement | string;
	sx?: SxProps<Theme>;
	required?: boolean;
	error?: boolean;
	helperText?: string;
}

const LabelledOutline: React.FC<LabelledOutlineProps> = ({ id, label, children, sx, required, error, helperText }) => {
	const labelRef = React.useRef<HTMLLabelElement>(null);
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: "relative",
				marginTop: "8px",
				"& .MuiInputLabel-root": {
					position: "absolute",
				},
				...sx,
			}}
		>
			<InputLabel required={required} ref={labelRef} htmlFor={id} variant="outlined" error={error} shrink>
				{label}
			</InputLabel>
			<Box
				component={"div"}
				sx={{
					position: "relative",
				}}
			>
				<Box
					component={Paper}
					elevation={0}
					id={id}
					sx={{
						borderRadius: "4px",
						padding: "18.5px 14px",
					}}
				>
					<Box>{children}</Box>
					<NotchedOutline
						style={{ borderColor: error ? theme.palette.error.main : undefined }}
						error={error}
						notched
						label={label}
					/>
				</Box>
			</Box>
			<FormHelperText
				sx={{
					ml: "12px !important",
				}}
				error={error}
			>
				{helperText}
			</FormHelperText>
		</Box>
	);
};
export default LabelledOutline;
