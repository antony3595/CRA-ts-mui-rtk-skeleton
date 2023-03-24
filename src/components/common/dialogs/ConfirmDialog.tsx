import React, { PropsWithChildren } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import DraggableDialogPaper from "./DraggableDialogPaper";
import Divider from "@mui/material/Divider";
import { LoadingButton } from "@mui/lab";
import { SlideUpTransition } from "../Transitions";

export interface ConfirmDialogProps extends DialogProps {
	title: string;
	message: string;
	positiveLabel: string;
	negativeLabel: string;
	isLoading?: boolean;
	onPositive: () => void;
	onNegative: () => void;
	draggable?: boolean;
	disableBackdropClick?: boolean;
}

const ConfirmDialog: React.FC<PropsWithChildren<ConfirmDialogProps>> = ({
	children,
	title,
	message,
	onClose,
	negativeLabel,
	positiveLabel,
	onNegative,
	onPositive,
	draggable = false,
	disableBackdropClick = false,
	isLoading,
	TransitionComponent,
	...restProps
}) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Dialog
			{...restProps}
			TransitionComponent={TransitionComponent || SlideUpTransition}
			PaperComponent={draggable && !matches ? DraggableDialogPaper : undefined}
			aria-labelledby="draggable-dialog-title"
			onClose={!disableBackdropClick ? onClose : undefined}
		>
			<DialogTitle sx={[draggable && { cursor: "move" }]}>{title}</DialogTitle>
			<Divider />
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onNegative()} color="primary" autoFocus>
					{negativeLabel}
				</Button>
				<LoadingButton onClick={() => onPositive()} color="primary" loading={Boolean(isLoading)}>
					{positiveLabel}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
