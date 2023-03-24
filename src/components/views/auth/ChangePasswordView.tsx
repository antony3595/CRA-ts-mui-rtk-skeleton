import React, { useState } from "react";
import { Avatar, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as yup from "yup";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { sxProps } from "./LoginView";
import strings from "../../../constants/strings";
import { formikInputProps } from "../../../utils/formik";
import PasswordInput from "../../common/inputs/PasswordInput";
import { LoadingButton } from "@mui/lab";
import { ChangePasswordRequestDTO } from "../../../api/types/users";
import { toastApiErrorHandler } from "../../../utils/errorsUtils";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../urls";
import { changePassword } from "../../../api/admin/users";

const initialValues: ChangePasswordRequestDTO = {
	current_password: "",
	new_password: "",
	re_new_password: "",
};

const validationSchema = yup.object().shape({
	current_password: yup
		.string()
		.min(3, "Минимальное количество символов 3")
		.max(20, "Максимальное количество символов 20")
		.required("Обязательное поле"),
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

const ChangePasswordView = () => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [isLoading, setLoading] = useState<boolean>(false);

	const onSubmit = (values: ChangePasswordRequestDTO) => {
		setLoading(true);
		changePassword(values)
			.then(() => {
				enqueueSnackbar(strings.password_reset_successfully, { variant: "success" });
				navigate(HOME);
			})
			.catch(toastApiErrorHandler(enqueueSnackbar))
			.finally(() => setLoading(false));
	};

	const formik = useFormik<ChangePasswordRequestDTO>({ initialValues, validationSchema, onSubmit });
	return (
		<PageWrapper centrify>
			<Container maxWidth="xs">
				<Box sx={sxProps.paper}>
					<Avatar sx={sxProps.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{strings.change_password}
					</Typography>
					<Box component={"form"} sx={sxProps.form} onSubmit={formik.handleSubmit}>
						<PasswordInput
							{...formikInputProps<ChangePasswordRequestDTO>("current_password", formik)}
							margin={"dense"}
							fullWidth
							label={strings.old_password}
							autoFocus
						/>
						<PasswordInput
							{...formikInputProps<ChangePasswordRequestDTO>("new_password", formik)}
							margin={"dense"}
							FormControlProps={{ sx: { mt: "9px", mb: "9px" }, fullWidth: true }}
							label={strings.new_password}
						/>
						<PasswordInput
							{...formikInputProps<ChangePasswordRequestDTO>("re_new_password", formik)}
							margin={"dense"}
							FormControlProps={{ sx: { mt: "9px", mb: "12px" }, fullWidth: true }}
							label={strings.confirm_new_password}
						/>
						<LoadingButton loading={isLoading} type="submit" fullWidth variant="contained" color="primary" sx={sxProps.submit}>
							{strings.change_password}
						</LoadingButton>
					</Box>
				</Box>
			</Container>
		</PageWrapper>
	);
};

export default ChangePasswordView;
