import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { Box, Button, MenuItem, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { formikInputProps } from "../../../utils/formik";
import { useSearchParams } from "react-router-dom";
import { Role } from "../../../api/types/base";
import strings from "../../../constants/strings";
import MySelect from "../../common/forms/MySelect";
import { LoadingButton } from "@mui/lab";
import { roleOptions } from "../../../constants/selectOptions";
import SearchIcon from "@mui/icons-material/Search";
import { booleanOptions } from "../../../constants/filters";

const schema = yup.object().shape({
	role: yup.mixed().oneOf([Role.ADMIN, Role.MANAGER, ""], "Невалидное значение").nullable(),

	is_active: yup.mixed().oneOf(["0", "1", ""], "Невалидное значение").nullable(),
});

export interface AccountFiltersProps {
	onSubmitCallback?: () => void;
}
export interface AccountsFilterValues {
	search?: string | null;
	role?: string | null;
	is_active?: string | null;
}

const AccountFilters: React.FC<AccountFiltersProps> = ({ onSubmitCallback }) => {
	const validationSchema = schema;
	const [params, setSearchParams] = useSearchParams();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const initialValues: AccountsFilterValues = {
		search: params.get("search") || "",
		role: params.get("role") || "",
		is_active: params.get("is_active") || "",
	};

	const onSubmit = (values: AccountsFilterValues, formikHelpers: FormikHelpers<AccountsFilterValues>) => {
		const searchParams = new URLSearchParams();
		Object.keys(values).forEach((key) => {
			const filterKey = key as keyof AccountsFilterValues;
			const value = values[filterKey];
			if (value) {
				searchParams.set(filterKey, value.toString());
			}
		});

		setSearchParams(searchParams);
		onSubmitCallback && onSubmitCallback();
		formikHelpers.setSubmitting(false);
	};

	const formik = useFormik<AccountsFilterValues>({ initialValues, validationSchema, onSubmit });
	return (
		<Stack
			flexWrap={"wrap"}
			spacing={1}
			direction={{ xs: "column", md: "row" }}
			justifyContent={"space-between"}
			component={"form"}
			onSubmit={formik.handleSubmit}
		>
			<Stack spacing={1} flexWrap={"wrap"} direction={{ xs: "column", md: "row" }}>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<TextField
						{...formikInputProps<AccountsFilterValues>("search", formik)}
						placeholder={strings.search}
						fullWidth
						InputProps={{ endAdornment: <SearchIcon /> }}
					/>
				</Box>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MySelect
						variant="outlined"
						{...formikInputProps<AccountsFilterValues>("role", formik)}
						label={strings.role}
						autoComplete={"off"}
					>
						<MenuItem style={{ whiteSpace: "pre-wrap" }} value={""}>
							---
						</MenuItem>
						{roleOptions.map((option) => (
							<MenuItem style={{ whiteSpace: "pre-wrap" }} value={option.value} key={option.value}>
								{option.title}
							</MenuItem>
						))}
					</MySelect>
				</Box>
				<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
					<MySelect
						variant="outlined"
						{...formikInputProps<AccountsFilterValues>("is_active", formik)}
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
					<LoadingButton sx={{ mb: 1 }} loading={formik.isSubmitting} type="submit" variant="contained" color="success">
						{strings.filter}
					</LoadingButton>
				</Box>
			</Stack>
		</Stack>
	);
};

export default AccountFilters;
