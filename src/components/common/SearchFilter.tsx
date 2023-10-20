import React from "react";
import * as yup from "yup";
import { useSearchParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { FormikHelpers } from "formik/dist/types";
import { getUrlsSearchParamsOfObject } from "../../utils/queryParamsUtils";
import { useFormik } from "formik";
import { Box, Button, Stack, TextField } from "@mui/material";
import { formikInputProps } from "../../utils/formik";
import strings from "../../constants/strings";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";

export interface SearchFilterProps {
	onSubmitCallback?: () => void;
}

const schema = yup.object().shape({
	search: yup.string().nullable(),
});

export interface SearchFilterValues {
	search?: string | null;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSubmitCallback }) => {
	const validationSchema = schema;
	const [params, setSearchParams] = useSearchParams();
	const isMobile = useIsMobile();

	const initialValues: SearchFilterValues = {
		search: params.get("search") || "",
	};

	const onSubmit = (values: SearchFilterValues, formikHelpers: FormikHelpers<SearchFilterValues>) => {
		const searchParams = getUrlsSearchParamsOfObject(values);
		setSearchParams(searchParams);
		onSubmitCallback && onSubmitCallback();
		formikHelpers.setSubmitting(false);
	};

	const formik = useFormik<SearchFilterValues>({ initialValues, validationSchema, onSubmit });
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
						{...formikInputProps<SearchFilterValues>("search", formik)}
						placeholder={strings.search}
						fullWidth
						InputProps={{ endAdornment: <SearchIcon /> }}
					/>
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
						{strings.search}
					</LoadingButton>
				</Box>
			</Stack>
		</Stack>
	);
};

export default SearchFilter;
