import { Avatar, Box, Container, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import strings from "../../../constants/strings";
import { formikInputProps } from "../../../utils/formik";
import Copyright from "../../common/Copyright";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchToken } from "../../../redux/auth/authSlice";

export const sxProps = {
	paper: {
		mt: 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: 1,
		backgroundColor: "primary.main",
	},
	form: {
		width: "100%",
		mt: 1,
	},
	submit: {
		mt: 3,
		mx: 0,
		mb: 2,
	},
};

interface LoginValues {
	username: string;
	password: string;
}

const validationSchema = yup.object().shape({
	username: yup.string().required("Обязательное поле"),
	password: yup.string().required("Обязательное поле"),
});

const initialValues: LoginValues = {
	username: "",
	password: "",
};

const LoginView = () => {
	const dispatch = useAppDispatch();
	const onSubmit = (values: LoginValues, formikHelpers: FormikHelpers<LoginValues>) => {
		dispatch(fetchToken(values)).then(() => {
			formikHelpers.setSubmitting(false);
		});
	};

	const formik = useFormik<LoginValues>({ initialValues, validationSchema, onSubmit });

	return (
		<PageWrapper centrify>
			<Container component="main" maxWidth="xs">
				<Box sx={sxProps.paper}>
					<Avatar sx={sxProps.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{strings.sign_in}
					</Typography>
					<Box component={"form"} sx={sxProps.form} onSubmit={formik.handleSubmit}>
						<TextField
							{...formikInputProps<LoginValues>("username", formik)}
							variant="outlined"
							margin="dense"
							fullWidth
							label={strings.username}
							autoComplete="username"
							autoFocus
						/>
						<TextField
							{...formikInputProps<LoginValues>("password", formik)}
							variant="outlined"
							margin="dense"
							fullWidth
							label={strings.password}
							type="password"
							autoComplete="current-password"
						/>
						<LoadingButton
							loading={formik.isSubmitting}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							sx={sxProps.submit}
						>
							{strings.sign_in}
						</LoadingButton>
					</Box>
				</Box>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</PageWrapper>
	);
};

export default LoginView;
