import React from "react";
import { Box } from "@mui/material";

type TabPanelProps = {
	children?: React.ReactNode;
} & ({ index: number; tabKey?: never; value: number } | { index?: never; tabKey: string; value: string });

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, tabKey, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index && value !== tabKey}
			id={`simple-tabpanel-${index || tabKey}`}
			aria-labelledby={`simple-tab-${index || tabKey}`}
			{...other}
		>
			{(value === index || value === tabKey) && <Box>{children}</Box>}
		</div>
	);
};
export default TabPanel;
