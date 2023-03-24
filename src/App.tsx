import { CssBaseline } from "@mui/material";
import React from "react";
import PageRouter from "./components/PageRouter";
import ThemeProvider from "./components/ThemeProvider";

function App() {
	return (
		<ThemeProvider>
			<CssBaseline />
			<PageRouter />
		</ThemeProvider>
	);
}

export default App;
