import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { generateUUID } from "../../../types/global";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";

interface ListTextFieldProps {
	initialValues: string[];
	onChange: (strings: string[]) => void;
}

interface ArrayValue {
	value: string;
	uuid: string;
}

interface StringsListFormValues {
	values: ArrayValue[];
}

const schema = yup.object().shape({
	values: yup.array().of(yup.string()),
});
// TODO обновление формы при изменении props.values, сейчас форма принимает только initial values, и сбросить ее нельзя

const generateInputValue = () => ({
	value: "",
	uuid: generateUUID(),
});

const ListTextField = ({ onChange, initialValues }: ListTextFieldProps) => {
	const transformedValues = useMemo(() => initialValues.map((string) => ({ value: string, uuid: generateUUID() })), []);

	const [freeValue, setFreeValue] = useState<ArrayValue>(generateInputValue());

	const initialFormikValues: StringsListFormValues = {
		values: transformedValues,
	};

	const onSubmit = () => {
		alert("No submit");
	};

	const formik = useFormik<StringsListFormValues>({ initialValues: initialFormikValues, validationSchema: schema, onSubmit });

	const removeEmptyValues = () => {
		const newArray = formik.values.values.filter((value) => Boolean(value.value));
		formik.setFieldValue("values", newArray);
	};

	const removeValueByIndex = (elementIndex: number) => {
		const newArray = formik.values.values.filter((value, index) => index !== elementIndex);
		formik.setFieldValue("values", newArray);
	};

	useEffect(() => {
		const withoutEmpty = formik.values.values.filter((value) => Boolean(value.value)).map((value) => value.value);
		onChange(withoutEmpty);
	}, [formik.values]);

	return (
		<Box>
			<TransitionGroup component={Box} sx={{ marginBottom: "16px", "&:empty": { marginBottom: 0 } }}>
				{[
					...formik.values.values.map((value, index) => {
						return (
							<Collapse sx={{ mb: 1, "&:last-child": { mb: 0 } }} key={value.uuid} in={true}>
								<TextField
									name={`values.${index}.value`}
									autoComplete={"off"}
									value={formik.values.values[index].value}
									onChange={formik.handleChange}
									margin="dense"
									fullWidth
									onBlur={() => removeEmptyValues()}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													tabIndex={-1}
													aria-label="delete input"
													onClick={() => {
														removeValueByIndex(index);
													}}
													edge="end"
												>
													<CloseIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Collapse>
						);
					}),
					<Collapse sx={{ mb: 1, "&:last-child": { mb: 0 } }} key={freeValue.uuid} in={true}>
						<TextField
							autoComplete={"off"}
							value={freeValue.value}
							onChange={(event) => {
								if (event.target.value) {
									formik.setFieldValue("values", [
										...formik.values.values,
										{
											value: event.target.value,
											uuid: freeValue.uuid,
										},
									]);

									setFreeValue(generateInputValue());
								}
							}}
							margin="dense"
							fullWidth
						/>
					</Collapse>,
				]}
			</TransitionGroup>
		</Box>
	);
};

export default ListTextField;
