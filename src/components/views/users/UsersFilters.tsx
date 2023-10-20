import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { Box, Button, MenuItem, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { formikErrorProps, formikInputProps } from "../../../utils/formik";
import { useSearchParams } from "react-router-dom";
import strings from "../../../constants/strings";
import MySelect from "../../common/forms/MySelect";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { booleanOptions } from "../../../constants/filters";
import { getUrlsSearchParamsOfObject } from "../../../utils/queryParamsUtils";
import { BaseGroup } from "../../../api/types/groups";
import MyVirtualizedAutocomplete from "../../common/forms/MyVirtualizedAutocomplete";

const schema = yup.object().shape({
	is_active: yup.mixed().oneOf(["0", "1", ""], "Невалидное значение").nullable(),
	is_superuser: yup.mixed().oneOf(["0", "1", ""], "Невалидное значение").nullable(),
	is_staff: yup.mixed().oneOf(["0", "1", ""], "Невалидное значение").nullable(),
	groups: yup.string().nullable(),
});

export interface UsersFiltersProps {
	onSubmitCallback?: () => void;
	groups: BaseGroup[];
	isGroupsLoading: boolean;
}
export interface UsersFilterValues {
	search?: string | null;
	is_active?: string | null;
	is_superuser?: string | null;
	is_staff?: string | null;
	groups?: string | null;
}

const UsersFilters: React.FC<UsersFiltersProps> = ({ onSubmitCallback, groups, isGroupsLoading }) => {
	const validationSchema = schema;
	const [params, setSearchParams] = useSearchParams();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const initialValues: UsersFilterValues = {
		search: params.get("search") || "",
		is_active: params.get("is_active") || "",
		is_superuser: params.get("is_superuser") || "",
		is_staff: params.get("is_staff") || "",
		groups: params.get("groups") || "",
	};

	const onSubmit = (values: UsersFilterValues, formikHelpers: FormikHelpers<UsersFilterValues>) => {
		const searchParams = getUrlsSearchParamsOfObject(values);

		setSearchParams(searchParams);
		onSubmitCallback && onSubmitCallback();
		formikHelpers.setSubmitting(false);
	};

	const formik = useFormik<UsersFilterValues>({ initialValues, validationSchema, onSubmit });
	return (
		<Stack
			sx={{ flexWrap: "wrap", gap: 1, justifyContent: "space-between" }}
			direction={{ xs: "column", md: "row" }}
			component={"form"}
			onSubmit={formik.handleSubmit}
		>
			<Stack sx={{ flexWrap: "wrap", gap: 1 }} direction={{ xs: "column", md: "row" }}>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<TextField
						{...formikInputProps<UsersFilterValues>("search", formik)}
						placeholder={strings.search}
						fullWidth
						InputProps={{ endAdornment: <SearchIcon /> }}
					/>
				</Box>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MyVirtualizedAutocomplete
						{...formikErrorProps<UsersFilterValues>("groups", formik)}
						onChange={(event, value) => {
							formik.setFieldValue("groups", value?.id.toString() || null);
						}}
						isOptionEqualToValue={(option, value) => option?.id === value?.id}
						value={groups.find((group) => group.id.toString() === formik.values.groups?.toString()) || null}
						label={strings.role}
						loading={isGroupsLoading}
						options={isGroupsLoading ? [] : groups}
						getOptionLabel={(option) => option.name}
						getOptionDisplay={(option) => option.name}
					/>
				</Box>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MySelect
						variant="outlined"
						{...formikInputProps<UsersFilterValues>("is_active", formik)}
						label={strings.active}
						autoComplete={"off"}
					>
						<MenuItem style={{ whiteSpace: "pre-wrap" }} value={""}>
							---
						</MenuItem>
						{booleanOptions.map((option) => (
							<MenuItem style={{ whiteSpace: "pre-wrap" }} value={option.value} key={option.value}>
								{option.title()}
							</MenuItem>
						))}
					</MySelect>
				</Box>

				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MySelect
						variant="outlined"
						{...formikInputProps<UsersFilterValues>("is_superuser", formik)}
						label={strings.superuser}
						autoComplete={"off"}
					>
						<MenuItem style={{ whiteSpace: "pre-wrap" }} value={""}>
							---
						</MenuItem>
						{booleanOptions.map((option) => (
							<MenuItem style={{ whiteSpace: "pre-wrap" }} value={option.value} key={option.value}>
								{option.title()}
							</MenuItem>
						))}
					</MySelect>
				</Box>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MySelect
						variant="outlined"
						{...formikInputProps<UsersFilterValues>("is_staff", formik)}
						label={strings.is_staff}
						autoComplete={"off"}
					>
						<MenuItem style={{ whiteSpace: "pre-wrap" }} value={""}>
							---
						</MenuItem>
						{booleanOptions.map((option) => (
							<MenuItem style={{ whiteSpace: "pre-wrap" }} value={option.value} key={option.value}>
								{option.title()}
							</MenuItem>
						))}
					</MySelect>
				</Box>
			</Stack>
			<Stack
				spacing={1}
				direction={"row"}
				sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "flex-start", md: "flex-end" } }}
			>
				<Box>
					<Button
						sx={{ mb: 1 }}
						type="button"
						variant="outlined"
						color="primary"
						onClick={() => {
							setSearchParams(new URLSearchParams());
							formik.setValues({});
						}}
					>
						{strings.reset}
					</Button>
				</Box>

				<Box>
					<LoadingButton sx={{ mb: 1 }} loading={formik.isSubmitting} type="submit" variant="contained" color="primary">
						{strings.filter}
					</LoadingButton>
				</Box>
			</Stack>
		</Stack>
	);
};

export default UsersFilters;
