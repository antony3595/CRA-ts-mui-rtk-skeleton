import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { SnackbarProvider } from "notistack";
import GlobalErrorsSnackbar from "./components/common/GlobalErrorsSnackbar";
import "@ckeditor/ckeditor5-build-classic/build/translations/ru";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<SnackbarProvider maxSnack={3}>
			<GlobalErrorsSnackbar />
			<App />
		</SnackbarProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
