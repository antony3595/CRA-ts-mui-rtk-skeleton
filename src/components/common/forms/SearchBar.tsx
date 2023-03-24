import React, { FormEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

interface SearchBarProps {
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	onSubmit: () => void;
	value: string;
}
//TODO расширить интерфейс TextField и прокинуть его пропсы, в частности size
const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onChange, placeholder, value }) => {
	return (
		<Box
			component="form"
			onSubmit={(event: FormEvent<HTMLFormElement>) => {
				event.preventDefault();
				onSubmit();
			}}
		>
			<FormControl variant="outlined">
				<InputLabel>{placeholder}</InputLabel>
				<OutlinedInput
					value={value}
					onChange={onChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton color={"primary"} edge="end" type={"submit"}>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					}
					label={placeholder}
				/>
			</FormControl>
		</Box>
	);
};

export default SearchBar;
