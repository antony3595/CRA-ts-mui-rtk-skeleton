import { Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";
import React from "react";

const DraggableDialogPaper: React.FC<PaperProps & { disabled?: boolean }> = ({ disabled = false, ...props }) => (
	<Draggable handle="#draggable-dialog-title" disabled={disabled} cancel={'[class*="MuiDialogContent-root"],#close_modal'}>
		<Paper {...props} />
	</Draggable>
);

export default DraggableDialogPaper;
