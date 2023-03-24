import React from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Checkbox, Container, FormControlLabel, FormHelperText, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AccountCreateDTO, SimpleGroup, User } from "../../../api/types/users";
import strings from "../../../constants/strings";
import { AxiosResponse } from "axios";
import { getApiErrors, getApiResponseErrorMessage } from "../../../utils/errorsUtils";
import { formikInputProps } from "../../../utils/formik";
import PasswordInput from "../../common/inputs/PasswordInput";
import MySelect from "../../common/forms/MySelect";
import { roleOptions } from "../../../constants/selectOptions";
import Divider from "@mui/material/Divider";
import { BaseResponse, isSuccessResponse, Role } from "../../../api/types/base";
import { LoadingButton } from "@mui/lab";
import { createUser } from "../../../api/admin/users";

interface CreateAccountFormProps {
	closeModal: () => void;
	onSuccess: () => void;
	groups: SimpleGroup[];
	isLoading: boolean;
}

interface AccountCreateFormValues extends Omit<AccountCreateDTO, "groups"> {
	groups: SimpleGroup[];
}

const schema = yup.object().shape({
	username: yup.string().required(strings.required_field),
	email: yup.string().email(strings.email_not_valid).required(strings.required_field),

	password: yup.string().required(strings.required_field),
	password2: yup.string().required(strings.required_field),
	first_name: yup.string().nullable(),
	last_name: yup.string().nullable(),
	middle_name: yup.string().nullable(),
	phone: yup.string().required(strings.required_field),
	is_active: yup.boolean().required(strings.required_field),
	role: yup.mixed().oneOf(Object.values(Role), "Невалидное значение"),
	groups: yup.array().of(yup.object().shape({ id: yup.number(), name: yup.string() })),
});

const emptyFormValues: AccountCreateFormValues = {
	email: "",
	first_name: "",
	groups: [],
	is_active: true,
	last_name: "",
	middle_name: "",
	password: "",
	password2: "",
	phone: "",
	role: Role.MANAGER,
	username: "",
};

const CreateAccountForm = ({ closeModal, onSuccess, groups, isLoading }: CreateAccountFormProps) => {
	const validationSchema = schema;
	const { enqueueSnackbar } = useSnackbar();

	const initialValues: AccountCreateFormValues = emptyFormValues;

	const onSubmit = (values: AccountCreateFormValues) => {
		const onSuccessResponse = (response: AxiosResponse<BaseResponse<User>>) => {
			if (isSuccessResponse(response)) {
				const successText = `${values.username} успешно добавлен`;
				enqueueSnackbar(successText, { variant: "success" });
				onSuccess();
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

		const data = { ...values, groups: values.groups.map((group) => group.id) };
		createUser(data)
			.then(onSuccessResponse)
			.catch(onErrorResponse)
			.finally(() => formik.setSubmitting(false));
	};

	const formik = useFormik<AccountCreateFormValues>({ initialValues, validationSchema, onSubmit });
	return (
		<Container component="main" maxWidth="md">
			<Box component={"div"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Box
					component={"form"}
					sx={{
						width: "100%",
						mb: 1,
					}}
					onSubmit={formik.handleSubmit}
				>
					<TextField
						{...formikInputProps<AccountCreateFormValues>("username", formik)}
						label={strings.username}
						variant={"outlined"}
						margin="dense"
						autoFocus
						autoComplete={"off"}
					/>
					<PasswordInput
						{...formikInputProps<AccountCreateFormValues>("password", formik)}
						autoComplete={"off"}
						label={strings.password}
						margin="dense"
					/>
					<PasswordInput
						{...formikInputProps<AccountCreateFormValues>("password2", formik)}
						label={strings.confirm_password}
						autoComplete={"off"}
						margin="dense"
					/>
					<TextField {...formikInputProps<AccountCreateFormValues>("email", formik)} label={strings.email} margin="dense" />

					<TextField
						{...formikInputProps<AccountCreateFormValues>("first_name", formik)}
						label={strings.first_name}
						margin="dense"
						autoComplete={"off"}
					/>

					<TextField
						{...formikInputProps<AccountCreateFormValues>("last_name", formik)}
						label={strings.last_name}
						margin="dense"
						autoComplete={"off"}
					/>
					<TextField
						{...formikInputProps<AccountCreateFormValues>("middle_name", formik)}
						label={strings.middle_name}
						margin="dense"
						autoComplete={"off"}
					/>
					<TextField
						{...formikInputProps<AccountCreateFormValues>("phone", formik)}
						label={strings.phone}
						margin="dense"
						type={"tel"}
						autoComplete={"off"}
					/>

					<Box>
						<MySelect
							{...formikInputProps<AccountCreateFormValues>("role", formik)}
							label={strings.role}
							autoComplete={"off"}
							fullWidth
						>
							{roleOptions.map((option) => (
								<MenuItem style={{ whiteSpace: "pre-wrap" }} value={option.value} key={option.value}>
									{option.title}
								</MenuItem>
							))}
						</MySelect>
					</Box>

					<Divider sx={{ mb: 2 }} />
					<Box>
						<FormControlLabel
							labelPlacement="end"
							control={
								<Checkbox
									checked={formik.values.is_active}
									onChange={(e) => formik.setFieldValue("is_active", e.target.checked)}
									name="is_active"
									id="is_active"
									color="primary"
								/>
							}
							label={strings.active}
						/>
						<FormHelperText>
							{formik.touched.is_active && formik.errors.is_active ? formik.errors.is_active : " "}
						</FormHelperText>
					</Box>
					<div>
						<LoadingButton
							loading={formik.isSubmitting || isLoading}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							{strings.create}
						</LoadingButton>
					</div>
				</Box>
			</Box>
		</Container>
	);
};

export default CreateAccountForm;
