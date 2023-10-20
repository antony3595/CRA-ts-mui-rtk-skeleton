import * as React from "react";
import { WithAttachedFileLink } from "../../../../types/global";
import { FileItem } from "./FileItem";
import { FileLinkItem } from "./FileLinkItem";

export interface BaseFilePreviewProps {
	hideDownloadButton?: boolean;
	showActionsInMenu?: boolean;
}

type FilePreviewProps<T extends File, L extends WithAttachedFileLink> = BaseFilePreviewProps &
	(
		| {
				file: T;
				fileLink?: never;
				getLinkActions?: never;
				getActions?: (item: T, closeMenu: () => void) => React.ReactNode[];
				onLinkBackdropClick?: never;
				onFileBackdropClick?: (item: T) => void;
				error?: boolean;
				helperText?: string;
		  }
		| {
				file?: never;
				fileLink: L;
				getLinkActions?: (item: L, closeMenu: () => void) => React.ReactNode[];
				getActions?: never;
				onLinkBackdropClick?: (item: L) => void;
				onFileBackdropClick?: never;
				error?: never;
				helperText?: never;
		  }
	);

const FilePreviewItem = <T extends File, L extends WithAttachedFileLink>({
	file,
	fileLink,
	getActions,
	getLinkActions,
	onLinkBackdropClick,
	onFileBackdropClick,
	showActionsInMenu = true,
	hideDownloadButton = false,
	error,
	helperText,
}: FilePreviewProps<T, L>) => {
	return (
		<>
			{file && (
				<FileItem
					showActionsInMenu={showActionsInMenu}
					onBackdropClick={onFileBackdropClick}
					file={file}
					getActions={getActions}
					hideDownloadButton={hideDownloadButton}
					error={error}
					helperText={helperText}
				/>
			)}
			{fileLink && (
				<FileLinkItem
					showActionsInMenu={showActionsInMenu}
					file={fileLink}
					getActions={getLinkActions}
					onBackdropClick={onLinkBackdropClick}
					hideDownloadButton={hideDownloadButton}
				/>
			)}
		</>
	);
};

export default FilePreviewItem;
