import React from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Checkbox, Container, FormControlLabel, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import { User, UserUpdateDTO } from "../../../api/types/users";
import strings from "../../../constants/strings";
import { AxiosResponse } from "axios";
import { getApiErrors, getApiResponseErrorMessage } from "../../../utils/errorsUtils";
import { formikInputProps } from "../../../utils/formik";
import Divider from "@mui/material/Divider";
import { BaseResponse, isSuccessResponse } from "../../../api/types/base";
import { LoadingButton } from "@mui/lab";
import { updateUser } from "../../../api/admin/users";
import { BaseGroup } from "../../../api/types/groups";
import TransferList from "../../common/forms/TransferList/TransferList";
import { useFormikErrorScroller } from "../../../hooks/useFormikErrorScroller";
import NonCyrillicField from "../../common/forms/NonCyrillicField";

interface UserUpdateFormProps {
	user: User;
	groups: BaseGroup[];
	closeModal: () => void;
	onSuccess: () => void;
	isLoading: boolean;
}

interface UpdateUserFormValues extends Omit<UserUpdateDTO, "groups"> {
	groups: BaseGroup[];
}

const schema = yup.object().shape({
	username: yup.string().required(strings.required_field),

	first_name: yup.string().nullable(),
	last_name: yup.string().nullable(),
	middle_name: yup.string().nullable(),
	is_active: yup.boolean().required(strings.required_field),
	is_staff: yup.boolean().required(strings.required_field),
	is_superuser: yup.boolean().required(strings.required_field),
	groups: yup.array().of(yup.object().shape({ id: yup.number(), name: yup.string() })),
});

const UserUpdateForm = ({ closeModal, onSuccess, isLoading, user, groups }: UserUpdateFormProps) => {
	const validationSchema = schema;
	const { enqueueSnackbar } = useSnackbar();

	const initialValues: UpdateUserFormValues = {
		username: user.username,
		first_name: user.first_name,
		is_active: user.is_active,
		last_name: user.last_name,
		middle_name: user.middle_name,

		is_staff: user.is_staff,
		is_superuser: user.is_superuser,
		groups: user.groups,
	};

	const onSubmit = (values: UpdateUserFormValues) => {
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
		const userId = user.id;
		const data: UserUpdateDTO = { ...values, groups: values.groups.map((group) => group.id) };
		updateUser(userId, data)
			.then(onSuccessResponse)
			.catch(onErrorResponse)
			.finally(() => formik.setSubmitting(false));
	};

	const formik = useFormik<UpdateUserFormValues>({ initialValues, validationSchema, onSubmit });
	useFormikErrorScroller(formik);

	return (
		<Container component="main" maxWidth="md">
			<Box component={"div"} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Box
					component={"form"}
					sx={{
						width: "100%",
						mb: 1,
					}}
					noValidate
					onSubmit={formik.handleSubmit}
				>
					<NonCyrillicField
						{...formikInputProps<UpdateUserFormValues>("username", formik)}
						required
						label={strings.username}
						variant={"outlined"}
						margin="dense"
						autoFocus
						autoComplete={"off"}
					/>

					<TextField
						{...formikInputProps<UpdateUserFormValues>("first_name", formik)}
						label={strings.first_name}
						margin="dense"
						autoComplete={"off"}
					/>

					<TextField
						{...formikInputProps<UpdateUserFormValues>("last_name", formik)}
						label={strings.last_name}
						margin="dense"
						autoComplete={"off"}
					/>
					<TextField
						{...formikInputProps<UpdateUserFormValues>("middle_name", formik)}
						label={strings.middle_name}
						margin="dense"
						autoComplete={"off"}
					/>

					<Box>
						<Divider sx={{ mb: 2 }} variant={"middle"}>
							{strings.roles}
						</Divider>
						<Box sx={{ mb: 2 }}>
							<TransferList
								elements={groups}
								values={formik.values.groups}
								onChange={({ right }) => {
									formik.setFieldValue("groups", right);
								}}
								getKeyField={() => "id"}
								getOptionDisplay={(group) => group.name}
							></TransferList>
						</Box>
						<Divider sx={{ mb: 2 }} />
					</Box>

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
					<Box>
						<FormControlLabel
							labelPlacement="end"
							control={
								<Checkbox
									checked={formik.values.is_superuser}
									onChange={(e) => formik.setFieldValue("is_superuser", e.target.checked)}
									name="is_superuser"
									id="is_superuser"
									color="primary"
								/>
							}
							label={strings.superuser}
						/>
						<FormHelperText>
							{formik.touched.is_superuser && formik.errors.is_superuser ? formik.errors.is_superuser : " "}
						</FormHelperText>
					</Box>
					<Box>
						<FormControlLabel
							labelPlacement="end"
							control={
								<Checkbox
									checked={formik.values.is_staff}
									onChange={(e) => formik.setFieldValue("is_staff", e.target.checked)}
									name="is_staff"
									id="is_staff"
									color="primary"
								/>
							}
							label={strings.is_staff}
						/>
						<FormHelperText>{formik.touched.is_staff && formik.errors.is_staff ? formik.errors.is_staff : " "}</FormHelperText>
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

export default UserUpdateForm;
