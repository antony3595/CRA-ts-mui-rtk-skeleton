import React from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import { Box, Container, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CreateUpdateGroupDTO, Group } from "../../../api/types/groups";
import strings from "../../../constants/strings";
import { Permission } from "../../../api/types/permissions";
import { BaseResponse, isSuccessResponse } from "../../../api/types/base";
import { getApiErrors, getApiResponseErrorMessage } from "../../../utils/errorsUtils";
import { postGroup, putGroup } from "../../../api/admin/groups";
import { formikInputProps } from "../../../utils/formik";
import Divider from "@mui/material/Divider";
import TransferList from "../../common/forms/TransferList/TransferList";

interface GroupFormProps {
	group?: Group | null;
	permissions: Permission[];
	closeModal: () => void;
	onSuccess: () => void;
	isLoading: boolean;
}

interface GroupFormValues {
	name: string;
	permissions: Permission[];
}

const schema = yup.object().shape({
	name: yup.string().required(strings.required_field),
	permissions: yup
		.array()
		.of(yup.object().shape({ id: yup.number(), name: yup.string() }))
		.min(1, strings.required_field),
});

const GroupForm = ({ closeModal, onSuccess, isLoading, group, permissions }: GroupFormProps) => {
	const validationSchema = schema;
	const { enqueueSnackbar } = useSnackbar();
	const isEditing = Boolean(group);

	const initialValues: GroupFormValues = {
		name: group?.name || "",
		permissions: group?.permissions || [],
	};

	const onSubmit = (values: GroupFormValues) => {
		const onSuccessResponse = (response: AxiosResponse<BaseResponse<Group>>) => {
			if (isSuccessResponse(response)) {
				const successText = isEditing ? strings.role_successfully_updated : strings.role_successfully_created;
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

		const data: CreateUpdateGroupDTO = {
			...values,
			permissions: values.permissions.map((permission) => permission.id),
		};

		if (isEditing && group) {
			putGroup(group.id, data)
				.then(onSuccessResponse)
				.catch(onErrorResponse)
				.finally(() => formik.setSubmitting(false));
		} else {
			postGroup(data)
				.then(onSuccessResponse)
				.catch(onErrorResponse)
				.finally(() => formik.setSubmitting(false));
		}
	};
	const formik = useFormik<GroupFormValues>({ initialValues, validationSchema, onSubmit });
	return (
		<Container component="main">
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
						{...formikInputProps<GroupFormValues>("name", formik)}
						label={strings.name}
						variant={"outlined"}
						fullWidth
						margin="dense"
						autoFocus
						autoComplete={"off"}
					/>
					<Box mb={8}>
						<Divider sx={{ mb: 2 }} variant={"middle"}>
							{strings.permissions}
						</Divider>
						<TransferList
							elements={permissions}
							values={formik.values.permissions}
							onChange={({ right }) => {
								formik.setFieldValue("permissions", right);
							}}
							getKeyField={() => "id"}
							getOptionDisplay={(permission) => permission.name}
						/>
					</Box>

					<LoadingButton loading={formik.isSubmitting || isLoading} type="submit" fullWidth variant="contained" color="primary">
						{strings.confirm}
					</LoadingButton>
				</Box>
			</Box>
		</Container>
	);
};
export default GroupForm;
