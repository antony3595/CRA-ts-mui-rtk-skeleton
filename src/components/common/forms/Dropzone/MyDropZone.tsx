import React, { useEffect, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import strings from "../../../../constants/strings";
import LabelledOutline from "../LabelledOutline";
import FilePreviews from "../FilesPreview/FilesPreview";
import { acceptStyle, baseStyle, focusedStyle, rejectStyle } from "./styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface MyDropzoneProps {
	onFileChange: (file: File[] | null) => void;
	dropzoneOptions?: DropzoneOptions;
	label?: string;
	dropzoneText?: string;
	displayErrors?: boolean;
	error?: boolean;
	errors?: string[];
	helperText?: string;
	files?: File[];
}

const MAX_FILE_SIZE = 10000000; //10 mb;

const fileSizeValidator = (file: File) => {
	if (file.size > MAX_FILE_SIZE) {
		return {
			code: "size-too-large",
			message: `Размер файла не должен превышать ${MAX_FILE_SIZE / 1000} mb`,
		};
	}
	return null;
};

const MyDropzone: React.FC<MyDropzoneProps> = ({
	files,
	onFileChange,
	dropzoneOptions,
	label,
	error,
	errors,
	helperText,
	displayErrors = true,
	dropzoneText = strings.drag_n_drop_file_or_click_and_select,
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const onDrop = (acceptedFiles: File[]) => {
		onFileChange([...(files ? files : []), ...acceptedFiles]);
	};

	const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, fileRejections, isFocused } = useDropzone(
		{
			onDrop,
			validator: fileSizeValidator,
			...dropzoneOptions,
		}
	);

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	useEffect(() => {
		if (displayErrors) {
			fileRejections.forEach((fileRejection) => {
				fileRejection.errors.forEach((error) => {
					enqueueSnackbar(error.message, { variant: "error" });
				});
			});
		}
	}, [fileRejections, enqueueSnackbar]);

	const onDeleteClick = (selectedFile: File, closeMenu: () => void) => {
		const newFiles = files?.filter((fileItem) => fileItem !== selectedFile) || [];
		onFileChange(newFiles);
		closeMenu();
	};

	return (
		<LabelledOutline label={label} error={error} helperText={helperText}>
			<>
				<div {...getRootProps({ style })}>
					<input {...getInputProps()} />
					<Typography variant={"body2"} color={"textSecondary"}>
						{dropzoneText}
					</Typography>
				</div>
				{
					<Box my={2}>
						<FilePreviews
							errors={errors}
							isError={error}
							showActionsInMenu={false}
							getActions={(item, closeMenu) => [
								<IconButton onClick={() => onDeleteClick(item, closeMenu)} color={"inherit"} size={"small"}>
									<CloseIcon />
								</IconButton>,
							]}
							files={files || []}
						/>
					</Box>
				}
			</>
		</LabelledOutline>
	);
};

export default MyDropzone;
