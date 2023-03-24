import React from "react";
import { Backdrop, Modal } from "@mui/material";
import { ModalProps } from "@mui/material/Modal/Modal";
import { SlideUpTransition } from "../Transitions";

interface ImageModalProps {
	ModalProps?: ModalProps;
	closeModal: () => void;
	imgLink: string | null;
	open: boolean;
}

const ImageModal = ({ closeModal, imgLink, open, ModalProps }: ImageModalProps) => {
	return (
		<Modal
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				"&:hover": {
					backgroundcolor: "red",
				},
			}}
			onClose={closeModal}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
			{...ModalProps}
			open={open}
		>
			<SlideUpTransition
				in={open}
				timeout={250}
				style={{
					outline: "none",
					zIndex: 2,
				}}
			>
				<img src={imgLink || ""} alt="preview" style={{ maxHeight: "90%", maxWidth: "90%" }} />
			</SlideUpTransition>
		</Modal>
	);
};

export default ImageModal;
