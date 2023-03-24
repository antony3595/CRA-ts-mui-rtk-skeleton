import React, { PropsWithChildren } from "react";
import { responsiveFontSizes } from "@mui/material";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import { ruRU as gridRu } from "@mui/x-data-grid";
import { createStyled } from "@mui/system";

declare module "@mui/material/styles/createPalette" {
	interface Palette {
		neutral: Palette["primary"];
	}
	interface PaletteOptions {
		neutral: PaletteOptions["primary"];
	}
}

declare module "react" {
	interface CSSProperties {
		"--tree-view-color"?: string;
		"--tree-view-bg-color"?: string;
	}
}

let theme = createTheme(
	{
		palette: {
			primary: {
				main: "#006f91",
			},
			secondary: {
				main: "#f2f2f6",
			},
			background: {
				default: "#f2f2f6",
			},
			neutral: { main: "#282829" },
		},
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: {
						color: "#9f2121",
						"&$error": {
							color: "#9f2121",
						},
					},
				},
			},
		},
	},
	ruRU,
	gridRu
);
theme = responsiveFontSizes(theme);

const ThemeProvider = (props: PropsWithChildren) => {
	return <MUIThemeProvider theme={theme}>{props.children}</MUIThemeProvider>;
};

export const styled = createStyled({ defaultTheme: theme });

export default ThemeProvider;
