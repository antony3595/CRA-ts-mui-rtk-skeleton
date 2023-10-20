import { CssBaseline } from "@mui/material";
import React from "react";
import PageRouter from "./components/PageRouter";
import ThemeProvider from "./components/ThemeProvider";
import { useCurrentUserLoader } from "./hooks/api/auth/useCurrentUserLoader";

function App() {
	useCurrentUserLoader();

	return (
		<ThemeProvider>
			<CssBaseline />
			<PageRouter />
		</ThemeProvider>
	);
}

export default App;
