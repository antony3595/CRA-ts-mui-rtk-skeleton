import React from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Checkbox, Container, FormControlLabel, FormHelperText, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AccountUpdateDTO, SimpleGroup, User } from "../../../api/types/users";
import strings from "../../../constants/strings";
import { AxiosResponse } from "axios";
import { getApiErrors, getApiResponseErrorMessage } from "../../../utils/errorsUtils";
import { formikInputProps } from "../../../utils/formik";
import MySelect from "../../common/forms/MySelect";
import { roleOptions } from "../../../constants/selectOptions";
import Divider from "@mui/material/Divider";
import { BaseResponse, isSuccessResponse, Role } from "../../../api/types/base";
import { LoadingButton } from "@mui/lab";
import { updateUser } from "../../../api/admin/users";

interface UpdateAccountFormProps {
	account: User;
	closeModal: () => void;
	onSuccess: () => void;
	groups: SimpleGroup[];
	isLoading: boolean;
}

interface UpdateAccountFormValues extends Omit<AccountUpdateDTO, "groups"> {
	groups: SimpleGroup[];
	id: number;
}

const schema = yup.object().shape({
	username: yup.string().required(strings.required_field),

	first_name: yup.string().nullable(),
	last_name: yup.string().nullable(),
	middle_name: yup.string().nullable(),
	phone: yup.string().required(strings.required_field),
	is_active: yup.boolean().required(strings.required_field),
	role: yup.mixed().oneOf([Role.ADMIN, Role.MANAGER], "Невалидное значение"),
	groups: yup.array().of(yup.object().shape({ id: yup.number(), name: yup.string() })),
});

// TODO удалить группы на бэке и тут, если не будут использоваться
const UpdateAccountForm = ({ closeModal, onSuccess, isLoading, account }: UpdateAccountFormProps) => {
	const validationSchema = schema;
	const { enqueueSnackbar } = useSnackbar();

	const initialValues: UpdateAccountFormValues = {
		id: account.id,
		first_name: account.first_name,
		groups: account.groups,
		is_active: account.is_active,
		last_name: account.last_name,
		middle_name: account.middle_name,
		phone: account.phone,
		role: account.role,
		username: account.username,
	};

	const onSubmit = (values: UpdateAccountFormValues) => {
		const onSuccessResponse = (response: AxiosResponse<BaseResponse<User>>) => {
			if (isSuccessResponse(response)) {
				const successText = `${values.username} успешно изменен`;
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
		const userId = values.id;
		const data: AccountUpdateDTO = { ...values, groups: values.groups.map((group) => group.id) };
		updateUser(userId, data)
			.then(onSuccessResponse)
			.catch(onErrorResponse)
			.finally(() => formik.setSubmitting(false));
	};

	const formik = useFormik<UpdateAccountFormValues>({ initialValues, validationSchema, onSubmit });
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
						{...formikInputProps<UpdateAccountFormValues>("username", formik)}
						label={strings.username}
						variant={"outlined"}
						margin="dense"
						autoFocus
						autoComplete={"off"}
					/>

					<TextField
						{...formikInputProps<UpdateAccountFormValues>("first_name", formik)}
						label={strings.first_name}
						margin="dense"
						autoComplete={"off"}
					/>

					<TextField
						{...formikInputProps<UpdateAccountFormValues>("last_name", formik)}
						label={strings.last_name}
						margin="dense"
						autoComplete={"off"}
					/>
					<TextField
						{...formikInputProps<UpdateAccountFormValues>("middle_name", formik)}
						label={strings.middle_name}
						margin="dense"
						autoComplete={"off"}
					/>
					<TextField
						{...formikInputProps<UpdateAccountFormValues>("phone", formik)}
						label={strings.phone}
						margin="dense"
						type={"tel"}
						autoComplete={"off"}
					/>

					<Box>
						<MySelect
							{...formikInputProps<UpdateAccountFormValues>("role", formik)}
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
							{strings.confirm}
						</LoadingButton>
					</div>
				</Box>
			</Box>
		</Container>
	);
};

export default UpdateAccountForm;
