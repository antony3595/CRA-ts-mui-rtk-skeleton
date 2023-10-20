import React, { useState } from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Box, InputAdornment, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import { LoadingButton } from "@mui/lab";
import { FilesUploadDTO, FilesUploadResponse } from "../../../../api/types/filesRepository";
import { DOCUMENT_EXTENSIONS, DOCUMENT_TYPES } from "../../../../utils/fileUtils";
import strings from "../../../../constants/strings";
import { getApiErrors } from "../../../../utils/errorsUtils";
import { MuiFileInput } from "mui-file-input";
import { BaseResponse } from "../../../../api/types/base";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copyStringToClipboard from "../../../../utils/windowUtils";
import { uploadFile } from "../../../../api/admin/filesRepository";

interface UploadFileFormProps {
	onSuccess?: (data: FilesUploadResponse) => void;
}

export interface UploadFileFormValues {
	upload: File | null;
}

const schema = yup.object().shape({
	upload: yup
		.mixed()
		.test("fileFormat", strings.unsupported_format, (value) => {
			return value ? DOCUMENT_TYPES.includes(value.type) : true;
		})
		.required(strings.required_field),
});

const UploadFileForm = ({ onSuccess }: UploadFileFormProps) => {
	const validationSchema = schema;
	const { enqueueSnackbar } = useSnackbar();

	const [fileLink, setFileLink] = useState("");

	const initialValues: UploadFileFormValues = {
		upload: null,
	};

	const handleCopyLink = () => {
		copyStringToClipboard(fileLink).then(
			() => enqueueSnackbar(strings.link_copied, { variant: "info" }),
			(reason) => enqueueSnackbar(reason, { variant: "error" })
		);
	};

	const onSubmit = (values: UploadFileFormValues) => {
		const successResponseMessage = strings.success;

		const onSuccessResponse = (response: AxiosResponse<BaseResponse<FilesUploadResponse>>) => {
			enqueueSnackbar(successResponseMessage, { variant: "success" });
			setFileLink(response.data.data.url);
			onSuccess && onSuccess(response.data.data);
		};

		const onErrorResponse = (e: any) => {
			const responseData = getApiErrors(e);
			if (responseData.errors) {
				formik.setErrors(responseData.errors);
			} else {
				enqueueSnackbar(responseData.error, { variant: "error" });
			}
		};

		if (values.upload) {
			const data: FilesUploadDTO = { upload: values.upload };

			uploadFile(data)
				.then(onSuccessResponse)
				.catch(onErrorResponse)
				.finally(() => formik.setSubmitting(false));
		}
	};

	const formik = useFormik<UploadFileFormValues>({ initialValues, validationSchema, onSubmit });

	const hasFileError = Boolean(formik.touched.upload && formik.errors.upload);

	const helperText = hasFileError ? formik.touched.upload && formik.errors.upload : DOCUMENT_EXTENSIONS.join(", ");

	return (
		<Box maxWidth="md">
			<Box component={"div"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Box
					component={"form"}
					sx={{
						width: "100%",
						mb: 1,
					}}
					onSubmit={formik.handleSubmit}
				>
					<MuiFileInput
						error={hasFileError}
						helperText={helperText}
						label={strings.file}
						fullWidth
						margin={"dense"}
						name={`upload`}
						value={formik.values.upload}
						multiple={false}
						onChange={(value) => formik.setFieldValue(`upload`, value)}
						inputProps={{ accept: ".pdf,.txt,.doc,.docx" }}
					/>

					<Collapse sx={{ mb: 1 }} in={Boolean(fileLink)}>
						<TextField
							InputProps={{
								readOnly: true,
								endAdornment: (
									<InputAdornment position="end">
										<Tooltip title={strings.copy_link}>
											<IconButton tabIndex={-1} aria-label="copy link" onClick={handleCopyLink} edge="end">
												<ContentCopyIcon />
											</IconButton>
										</Tooltip>
									</InputAdornment>
								),
							}}
							color={"success"}
							focused
							helperText={strings.close_form_and_paste_link}
							autoComplete={"off"}
							value={fileLink}
							margin="dense"
							fullWidth
						/>
					</Collapse>
					<div>
						<LoadingButton loading={formik.isSubmitting} type="submit" variant="contained" color="primary">
							{strings.upload_file}
						</LoadingButton>
					</div>
				</Box>
			</Box>
		</Box>
	);
};

export default UploadFileForm;
