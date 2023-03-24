import * as React from "react";
import { useMemo } from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { BaseFilePreviewProps } from "./FilePreviewItem";
import { ActionButtons, FileBackdrop, FileImage, FileItemWrapper, FileNameWrapper, ImageSrc } from "./StyledComponents";
import { getFilePreviewImage } from "./FilePreviewUtils";

export const FileItem = <T extends File>({
	file,
	getActions,
	hideDownloadButton,
	showActionsInMenu = true,
	onBackdropClick,
}: BaseFilePreviewProps & {
	file: T;
	getActions?: (item: T, closeMenu: () => void) => React.ReactNode[];
	onBackdropClick?: (item: T) => void;
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const actions = useMemo(() => (getActions ? getActions(file, handleClose) : null), [getActions]);

	const previewImage = useMemo(() => getFilePreviewImage(file), [file]);

	return (
		<FileItemWrapper className={clsx([{ "Mui-backdropVisible": open || isMobile }])}>
			<FileImage>
				<ImageSrc style={{ backgroundImage: `url(${previewImage})` }} />
				<FileBackdrop
					onClick={() => {
						onBackdropClick && onBackdropClick(file);
					}}
					className={"MuiImageBackdrop-root"}
				/>
				<ActionButtons className="MuiStack-root" direction={"row"}>
					{!hideDownloadButton && (
						<IconButton size={"small"} color={"inherit"}>
							<CloudDownloadIcon />
						</IconButton>
					)}
					{actions && !showActionsInMenu && actions.map((action, index) => <div key={index}>{action}</div>)}

					{actions && showActionsInMenu && (
						<IconButton onClick={handleClick} size={"small"} color={"inherit"}>
							<MoreVertIcon />
						</IconButton>
					)}
				</ActionButtons>
				{actions && showActionsInMenu && (
					<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
						{actions.map((action, index) => (
							<MenuItem key={index}>{action}</MenuItem>
						))}
					</Menu>
				)}
			</FileImage>
			<Divider />
			<FileNameWrapper>
				<Typography
					sx={{
						wordBreak: "break-all",
						width: "100%",
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
					}}
					variant={"caption"}
				>
					{file.name}
				</Typography>
			</FileNameWrapper>
		</FileItemWrapper>
	);
};
