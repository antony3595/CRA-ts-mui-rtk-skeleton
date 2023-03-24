import React from "react";
import { Box, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as yup from "yup";
import strings from "../../../constants/strings";
import { formikInputProps } from "../../../utils/formik";
import { LoadingButton } from "@mui/lab";
import { ResetPasswordRequestDTO, User } from "../../../api/types/users";
import { getApiErrors, getApiResponseErrorMessage } from "../../../utils/errorsUtils";
import { AxiosResponse } from "axios";
import { BaseResponse, isSuccessResponse } from "../../../api/types/base";
import PasswordInput from "../../common/inputs/PasswordInput";
import { sxProps } from "../auth/LoginView";
import { resetPassword } from "../../../api/admin/users";

const initialValues: ResetPasswordRequestDTO = {
	new_password: "",
	re_new_password: "",
};

type ResetPasswordFormValues = ResetPasswordRequestDTO;

const validationSchema = yup.object().shape({
	new_password: yup
		.string()
		.typeError("Должно быть строкой")
		.min(3, "Минимальное количество символов 3")
		.max(20, "Максимальное количество символов 20")
		.required("Обязательное поле"),
	re_new_password: yup
		.string()
		.min(3, "Минимальное количество символов 3")
		.max(20, "Максимальное количество символов 20")
		.test("passwords-match", strings.passwords_do_not_match, function (value) {
			return this.parent.new_password === value;
		})
		.required("Обязательное поле"),
});

interface ResetPasswordFormProps {
	account: User;
	closeModal: () => void;
}

const ResetPasswordForm = ({ closeModal, account }: ResetPasswordFormProps) => {
	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = (values: ResetPasswordFormValues) => {
		const onSuccessResponse = (response: AxiosResponse<BaseResponse<any>>) => {
			if (isSuccessResponse(response)) {
				const successText = `Пароль пользователя ${account.username} успешно изменен`;
				enqueueSnackbar(successText, { variant: "success" });
				closeModal();
			} else {
				enqueueSnackbar(getApiResponseErrorMessage(response), { variant: "error" });
			}
		};
		const onErrorResponse = (e: any) => {
			const responseData = getApiErrors(e);
			if (responseData.errors) {
				formik.setErrors(responseData.errors);
			} else {
				enqueueSnackbar(responseData.error, { variant: "error" });
			}
		};
		resetPassword(account.id, values)
			.then(onSuccessResponse)
			.catch(onErrorResponse)
			.finally(() => formik.setSubmitting(false));
	};

	const formik = useFormik<ResetPasswordFormValues>({ initialValues, validationSchema, onSubmit });
	return (
		<Container component="main" maxWidth="sm">
			<Box component={"div"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Box
					component={"form"}
					sx={{
						width: "100%",
						mb: 1,
					}}
					onSubmit={formik.handleSubmit}
				>
					<PasswordInput
						{...formikInputProps<ResetPasswordFormValues>("new_password", formik)}
						margin={"dense"}
						FormControlProps={{ sx: { mt: "9px", mb: "9px" }, fullWidth: true }}
						label={strings.new_password}
					/>
					<PasswordInput
						{...formikInputProps<ResetPasswordFormValues>("re_new_password", formik)}
						margin={"dense"}
						FormControlProps={{ sx: { mt: "9px", mb: "12px" }, fullWidth: true }}
						label={strings.confirm_new_password}
					/>
					<LoadingButton
						loading={formik.isSubmitting}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={sxProps.submit}
					>
						{strings.reset_password}
					</LoadingButton>
				</Box>
			</Box>
		</Container>
	);
};

export default ResetPasswordForm;
