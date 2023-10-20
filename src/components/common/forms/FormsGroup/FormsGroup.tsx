import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { generateUUID } from "../../../../types/global";
import AddIcon from "@mui/icons-material/Add";
import { removeValueByIndex } from "../../../../utils/arrayUtils";
import List from "@mui/material/List/List";
import Typography from "@mui/material/Typography";
import strings from "../../../../constants/strings";

interface FormsGroupItemParams<T> {
	value: T;
	uuid: string;
	index: number;
}

interface FormsGroupProps<T> {
	id?: string;
	children: (params: FormsGroupItemParams<T>) => React.ReactNode;
	itemName: string;
	getItemLabel: (item: T, index: number) => string;
	values: T[];
	valuesSetter: (values: T[]) => void;

	newItemInitialValue: T;
	cardColorGetter?: (item: T, index: number) => string | undefined;
	onDeleteClick?: (item: T, index: number, defaultHandler: () => void) => void;
}

const defaultCardColor = "rgb(2 136 209 / 50%)";

const FormsGroup = <T,>({
	id,
	children,
	newItemInitialValue,
	values,
	valuesSetter,
	itemName,
	getItemLabel,
	onDeleteClick,
	cardColorGetter = (item, index) => "rgb(2 136 209 / 50%)",
}: FormsGroupProps<T>) => {
	const [uuidList, setUuidList] = useState<string[]>(values.map(() => generateUUID()));

	const removeFormValueByIndex = (elementIndex: number) => {
		const newArray = removeValueByIndex(values, elementIndex);
		valuesSetter(newArray);
		removeUUIDByIndex(elementIndex);
	};

	const removeUUIDByIndex = (elementIndex: number) => {
		const newArray = removeValueByIndex(uuidList, elementIndex);
		setUuidList(newArray);
	};

	const createNewEmptyValue = () => {
		const newArray = [...values, newItemInitialValue];
		setUuidList([...uuidList, generateUUID()]);
		valuesSetter(newArray);
	};

	return (
		<Box id={id}>
			<List>
				<TransitionGroup component={Box} sx={{ marginBottom: "16px", "&:empty": { marginBottom: 0 } }}>
					{values.map((value, index) => {
						return (
							<Collapse sx={{ mb: 1, "&:last-child": { mb: 0 } }} key={uuidList[index]} in={true}>
								<Paper variant={"outlined"} sx={{ borderColor: cardColorGetter(value, index) || defaultCardColor }}>
									<Box
										display={"flex"}
										sx={{ background: cardColorGetter(value, index) || defaultCardColor, padding: 0.5 }}
										alignItems={"center"}
										justifyContent={"space-between"}
									>
										<Typography sx={{ ml: 1 }} variant={"caption"}>
											{getItemLabel(value, index)}
										</Typography>
										<IconButton
											onClick={() => {
												onDeleteClick
													? onDeleteClick(value, index, () => removeFormValueByIndex(index))
													: removeFormValueByIndex(index);
											}}
										>
											<CloseIcon />
										</IconButton>
									</Box>
									<Box>{children({ index, uuid: uuidList[index], value })}</Box>
								</Paper>
							</Collapse>
						);
					})}
				</TransitionGroup>
				<Paper variant={"outlined"} sx={{ borderColor: "rgb(2 136 209 / 50%)" }}>
					<Box
						display={"flex"}
						sx={{ background: "rgb(2 136 209 / 50%)", padding: 0.5 }}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Typography sx={{ ml: 1 }} variant={"caption"}>
							{`${strings.add_}"${itemName}"`}
						</Typography>
						<IconButton onClick={createNewEmptyValue}>
							<AddIcon />
						</IconButton>
					</Box>
				</Paper>
			</List>
		</Box>
	);
};

export default FormsGroup;
