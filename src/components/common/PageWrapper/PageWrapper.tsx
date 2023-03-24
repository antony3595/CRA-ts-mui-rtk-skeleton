import { Box, CircularProgress } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { ScrollTopButton } from "../../ScrollTopButton";

interface PageWrapperProps {
	centrify?: boolean;
	fixed?: boolean;
	loading?: boolean;
}

const sxProps = {
	wrapper: {
		px: { sm: 3, xs: 2 },
		pt: { sm: 3, xs: 2 },
		pb: 10,
		position: "relative",
		top: 0,
		left: 0,
		zIndex: 1,
		flexGrow: 1,
		width: "100vw",
		overflowX: "auto",
	},
	centrifyContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		margin: "auto",
	},
	absoluteContent: { position: "absolute", height: "inherit", width: "100%", left: 0, right: 0, top: 0, bottom: 0 },
};

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({ children, centrify = false, fixed = false, loading = false }) => {
	const content = loading ? <CircularProgress /> : children;
	return (
		<>
			<ScrollTopButton />
			<Box
				id={"page-wrapper"}
				sx={{
					...sxProps.wrapper,
					...((centrify || loading) && sxProps.centrifyContent),
					...(fixed && { pb: { sm: 3, xs: 2 }, overflowY: "auto" }),
				}}
				maxWidth={"100%"}
			>
				<Box
					id={"page-content"}
					sx={{
						display: "flex",
						flexDirection: "column",
						boxSizing: "border-box",
						margin: "0 auto",
						position: "relative",
						...(!centrify && !loading && { height: "100%" }),
					}}
				>
					{fixed ? (
						<Box sx={sxProps.absoluteContent}>
							<>{content}</>
						</Box>
					) : (
						<>{content}</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default PageWrapper;
