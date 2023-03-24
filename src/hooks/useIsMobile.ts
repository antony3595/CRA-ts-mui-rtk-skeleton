import { useMediaQuery, useTheme } from "@mui/material";
import { Breakpoint } from "@mui/system/createTheme/createBreakpoints";

export const useIsMobile = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return isMobile;
};

export const useIsBreakpoint = (breakpoint: Breakpoint | number) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down(breakpoint));
	return matches;
};
