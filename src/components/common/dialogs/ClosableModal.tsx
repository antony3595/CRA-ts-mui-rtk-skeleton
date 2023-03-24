import React, { PropsWithChildren, useCallback } from "react";
import { Box, Dialog, DialogContent, DialogProps, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DraggableDialogPaper from "./DraggableDialogPaper";
import { ModalProps } from "@mui/material/Modal";
import { SlideUpTransition } from "../Transitions";

interface ClosableModalProps extends DialogProps {
	closeModal?: () => void;
	title?: string;
	draggable?: boolean;
	disableBackdropClick?: boolean;
	disableCloseOnEscapeKeyDown?: boolean;
	getModalActions?: () => React.ReactNode[];
}

const ClosableModal: React.FC<PropsWithChildren<ClosableModalProps>> = ({
	children,
	closeModal,
	title,
	disableBackdropClick = false,
	disableCloseOnEscapeKeyDown = false,
	draggable = false,
	scroll = "paper",
	getModalActions,
	TransitionComponent,
	...dialogProps
}) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const handleClose: ModalProps["onClose"] = useCallback(
		(event: any, reason: string) => {
			if (disableCloseOnEscapeKeyDown && reason === "escapeKeyDown") return;
			else if (disableBackdropClick && reason === "backdropClick") return;
			else if (closeModal) closeModal();
		},
		[disableBackdropClick, disableCloseOnEscapeKeyDown, closeModal]
	);

	return (
		<Dialog
			PaperComponent={draggable && !matches ? DraggableDialogPaper : undefined}
			fullScreen={matches}
			onClose={handleClose}
			scroll={scroll}
			aria-labelledby="draggable-dialog-title"
			TransitionComponent={TransitionComponent || SlideUpTransition}
			{...dialogProps}
		>
			<DialogTitle sx={[draggable && { cursor: "move" }]}>
				{title || ""}
				<Box
					id={"modal_actions"}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					{getModalActions && getModalActions()}
					{closeModal ? (
						<IconButton id="close_modal" onClick={() => closeModal()}>
							<CloseIcon />
						</IconButton>
					) : null}
				</Box>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};

export default ClosableModal;
