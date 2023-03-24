import React, { useEffect, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import LabelledOutline from "./LabelledOutline";
import { encodeImageFileAsURL } from "../../../utils/globalUtils";
import strings from "../../../constants/strings";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface ImageFieldProps {
	onChange: (file: File | null) => void;
	previewImageUrl?: string | null;
	label?: string;
	sx?: SxProps<Theme>;
	required?: boolean;
	error?: boolean;
	helperText?: string;
	hideDeleteImageButton?: boolean;
	selectImageText?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({
	onChange,
	label,
	sx,
	required,
	error,
	helperText,
	previewImageUrl = null,
	hideDeleteImageButton = false,
	selectImageText = strings.upload_image,
}) => {
	const [fileUrl, setFileUrl] = useState<string | null>(previewImageUrl);
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (file: File) => {
		encodeImageFileAsURL(file, (result) => {
			setFileUrl(result);
		});
		setFile(file || null);
		onChange(file || null);
	};

	const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files?.[0]) {
			handleFileChange(e.currentTarget.files?.[0]);
		}
	};

	useEffect(() => {
		if (previewImageUrl) {
			setFileUrl(previewImageUrl);
		}
	}, []);

	return (
		<LabelledOutline label={label} id={"LabelledOutline"} sx={sx} required={required} error={error} helperText={helperText}>
			<Grid container direction={{ xs: "column", sm: "row" }} justifyContent="space-evenly" spacing={2}>
				<Grid item xs={12} md={6}>
					<Stack sx={{ display: "flex", alignItems: "center" }}>
						{file && fileUrl ? (
							<Stack flexDirection="column" alignItems="center">
								<img alt="icon" width="100px" src={fileUrl} />
								<Typography sx={{ wordBreak: "break-all" }} variant={"body2"}>
									{file.name}
								</Typography>
							</Stack>
						) : !file && fileUrl ? (
							<Stack flexDirection="column" alignItems="center">
								<img alt="icon" width="100px" src={fileUrl} />
								<Typography
									component={"a"}
									sx={{ wordBreak: "break-all" }}
									href={fileUrl}
									target={"_blank"}
									variant={"body2"}
								>
									{fileUrl}
								</Typography>
							</Stack>
						) : (
							<Stack flexDirection="column" alignItems="center">
								<NoPhotographyIcon />
								{strings.no_image}
							</Stack>
						)}
					</Stack>
				</Grid>

				<Grid item xs={12} md={6}>
					<Stack spacing={1} justifyContent="center" display={"flex"} height={"100%"}>
						<Button variant="outlined" component="label">
							{selectImageText}
							<input type="file" hidden accept={"image/png"} onChange={(e) => onImageUpload(e)} />
						</Button>

						{fileUrl && !hideDeleteImageButton && (
							<Button
								onClick={() => {
									onChange(null);
									setFile(null);
									setFileUrl(null);
								}}
								variant="contained"
								color="error"
							>
								{strings.delete_image}
							</Button>
						)}
					</Stack>
				</Grid>
			</Grid>
		</LabelledOutline>
	);
};

export default ImageField;
