import React, { useMemo, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Paper from "@mui/material/Paper";
import { Box, ListItemButton, TextField } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import strings from "../../../../constants/strings";
import SearchIcon from "@mui/icons-material/Search";
import { filterArrayBySearchValue } from "../../../../utils/arrayUtils";

export interface TransferListItemProps<T> {
	items: T[];
	checked: T[];
	disableSearchBar?: boolean;
	handleToggle: (value: T) => void;
	getOptionDisplay: (value: T) => string;
}

const LIST_HEIGHT = 230;
const LIST_WIDTH = 270;
const SEARCHBAR_HEIGHT = 45;

const VirtualizedChecklist = <T,>({
	items,
	handleToggle,
	checked,
	getOptionDisplay,
	disableSearchBar = false,
}: TransferListItemProps<T>) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const filteredSearchValues = useMemo(() => filterArrayBySearchValue(items, searchValue, getOptionDisplay), [searchValue, items]);

	const renderRow = (props: ListChildComponentProps) => {
		const { index, data, style } = props;
		const item = data[index];
		const labelId = `check-list-item-${item}-label`;
		return (
			<ListItemButton key={index} style={style} onClick={() => handleToggle(item)} sx={{ width: "100%" }}>
				<ListItemIcon>
					<Checkbox
						size={"small"}
						checked={checked.indexOf(item) !== -1}
						tabIndex={-1}
						disableRipple
						inputProps={{
							"aria-labelledby": labelId,
						}}
					/>
				</ListItemIcon>
				<ListItemText id={labelId} primary={getOptionDisplay(item)} sx={{ whiteSpace: "nowrap" }} />
			</ListItemButton>
		);
	};

	return (
		<Paper>
			{!disableSearchBar && (
				<Box p={1} boxSizing={"border-box"} width={LIST_WIDTH} height={SEARCHBAR_HEIGHT}>
					<Box>
						<TextField
							fullWidth
							size={"small"}
							value={searchValue}
							variant={"standard"}
							onChange={(event) => setSearchValue(event.target.value)}
							placeholder={strings.search}
							InputProps={{ endAdornment: <SearchIcon />, autoComplete: "off" }}
						/>
					</Box>
				</Box>
			)}
			<FixedSizeList
				itemData={filteredSearchValues}
				height={disableSearchBar ? LIST_HEIGHT : LIST_HEIGHT - SEARCHBAR_HEIGHT}
				width={LIST_WIDTH}
				itemSize={54}
				itemCount={filteredSearchValues.length}
				overscanCount={5}
			>
				{renderRow}
			</FixedSizeList>
		</Paper>
	);
};

export default VirtualizedChecklist;
