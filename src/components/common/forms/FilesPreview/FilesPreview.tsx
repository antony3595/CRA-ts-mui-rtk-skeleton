import React, { useState } from "react";
import FilePreviewItem from "./FilePreviewItem";
import { Grid } from "@mui/material";
import { WithAttachedFileLink } from "../../../../types/global";
import { getUrlExtension, isImageExtension } from "../../../../utils/fileUtils";
import ImageModal from "../../ImageModal/ImageModal";
import Box from "@mui/material/Box";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

type FilesPreviewProps<T extends File, L extends WithAttachedFileLink> = {
	disableImageModal?: boolean;
	showActionsInMenu?: boolean;
} & (
	| {
			files: T[];
			fileLinks?: never;
			getActions?: (item: T, closeMenu: () => void) => React.ReactNode[];
			getLinkActions?: never;
			onBackdropClick?: (item: T) => void;
			isError?: boolean;
			errors?: string[];
	  }
	| {
			files?: never;
			fileLinks?: L[];
			getActions?: never;
			onBackdropClick?: (item: L) => void;

			getLinkActions?: (item: L, closeMenu: () => void) => React.ReactNode[];
			isError?: never;
			errors?: never[];
	  }
);

const FilePreviews = <T extends File, L extends WithAttachedFileLink>({
	files = [],
	fileLinks,
	getActions,
	getLinkActions,
	disableImageModal = false,
	showActionsInMenu = true,
	isError,
	errors,
}: FilesPreviewProps<T, L>) => {
	const [selectedFileLink, setSelectedFileLink] = useState<string | null>(null);
	const [isImageModalOpen, setImageModalOpen] = useState<boolean>(false);

	const openLinkImageModal = (item: L) => {
		const extension = getUrlExtension(item.file);
		if (isImageExtension(extension)) {
			setSelectedFileLink(item.file);
			setImageModalOpen(true);
		}
	};

	const openFileImageModal = (item: T) => {
		const fileLink = URL.createObjectURL(item);
		const extension = getUrlExtension(item.name);
		if (isImageExtension(extension)) {
			setSelectedFileLink(fileLink);
			setImageModalOpen(true);
		}
	};

	const closeImageModal = () => {
		setImageModalOpen(false);
	};

	return (
		<Box>
			<Grid component={TransitionGroup} container flexWrap={"wrap"} direction={"row"}>
				{files.map((file, index) => (
					<Grid component={Collapse} orientation={"horizontal"} in={true} key={file.name} item>
						<Box sx={{ pl: 2, pt: 2, boxSizing: "border-box" }}>
							<FilePreviewItem
								showActionsInMenu={showActionsInMenu}
								onFileBackdropClick={openFileImageModal}
								hideDownloadButton
								file={file}
								getActions={getActions}
								error={isError}
								helperText={(Array.isArray(errors) && errors.at(index)) || undefined}
							/>
						</Box>
					</Grid>
				))}
			</Grid>
			<Grid spacing={2} container flexWrap={"wrap"} direction={"row"}>
				{fileLinks?.map((fileLink, index) => (
					<Grid key={index} item>
						<FilePreviewItem
							showActionsInMenu={showActionsInMenu}
							onLinkBackdropClick={!disableImageModal ? openLinkImageModal : undefined}
							fileLink={fileLink}
							getLinkActions={getLinkActions}
						/>
					</Grid>
				))}
			</Grid>
			<ImageModal open={isImageModalOpen} closeModal={closeImageModal} imgLink={selectedFileLink || null} />
		</Box>
	);
};

export default FilePreviews;
