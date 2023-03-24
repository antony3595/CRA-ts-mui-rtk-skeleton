import React, { ComponentType, lazy } from "react";
import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";

type LoadingBackdropProps = BackdropProps;

const LoadingBackdrop: React.FC<LoadingBackdropProps> = (props) => {
	return (
		<Backdrop
			sx={(theme) => ({
				zIndex: theme.zIndex.appBar - 1,
				color: "#fff",
				"&.MuiBackdrop-root": {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				},
			})}
			{...props}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export const lazyMinLoadTime = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 2000) =>
	lazy(() =>
		Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports)
	);

export default LoadingBackdrop;
