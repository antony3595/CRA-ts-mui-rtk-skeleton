import React, { PropsWithChildren } from "react";
import { Box, CircularProgress, IconButtonProps } from "@mui/material";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

interface LoadingFABButtonProps extends IconButtonProps {
	loading: boolean;
	success?: boolean;
	onClick: () => void;
}

const LoadingIconButton: React.FC<PropsWithChildren<LoadingFABButtonProps>> = ({ loading, success, onClick, children, ...fabProps }) => {
	const handleButtonClick = () => {
		if (!loading) {
			onClick();
		}
	};

	return (
		<Box sx={{ position: "relative" }}>
			<IconButton
				sx={
					success
						? {
								backgroundColor: green[500],
								"&:hover": {
									backgroundColor: green[700],
								},
						  }
						: {}
				}
				onClick={handleButtonClick}
				{...fabProps}
			>
				{children}
			</IconButton>
			{loading && (
				<CircularProgress
					size={"auto"}
					sx={{
						color: green[500],
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
			)}
		</Box>
	);
};

export default LoadingIconButton;
