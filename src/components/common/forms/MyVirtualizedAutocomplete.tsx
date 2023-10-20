import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { styled, useTheme } from "@mui/material/styles";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";
import { AutocompleteProps, AutocompleteRenderInputParams } from "@mui/material/Autocomplete/Autocomplete";
import { ChipTypeMap } from "@mui/material/Chip";

const LISTBOX_PADDING = 8; // px

const renderRow = (props: ListChildComponentProps) => {
	const { data, index, style } = props;
	const dataSet = data[index];
	const inlineStyle = {
		...style,
		top: (style.top as number) + LISTBOX_PADDING,
	};

	if (dataSet.group) {
		return (
			<ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		);
	}

	return (
		<Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
			{dataSet[1].label}
		</Typography>
	);
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
	const outerProps = React.useContext(OuterElementContext);
	return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
	const ref = React.useRef<VariableSizeList>(null);
	React.useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
}

const ListBoxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
	const { children, ...other } = props;
	const itemData: React.ReactChild[] = [];
	(children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
		itemData.push(item);
		itemData.push(...(item.children || []));
	});

	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: true,
	});
	const itemCount = itemData.length;
	const itemSize = smUp ? 36 : 48;

	const getChildSize = (child: React.ReactChild) => {
		// eslint-disable-next-line no-prototype-builtins
		if (child.hasOwnProperty("group")) {
			return 48;
		}

		return itemSize;
	};

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize;
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	};

	const gridRef = useResetCache(itemCount);

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width="100%"
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType="ul"
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}
				>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	);
});

const StyledPopper = styled(Popper)({
	[`& .${autocompleteClasses.listbox}`]: {
		boxSizing: "border-box",
		"& ul": {
			padding: 0,
			margin: 0,
		},
	},
});

type MyVirtualizedAutocompleteProps<
	T,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined,
	ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, "renderInput"> & {
	getOptionDisplay: (option: T) => string;
} & (
		| {
				renderInput?: never;
				label: React.ReactNode;
				helperText?: string | string[];
				error: boolean;
				required?: boolean;
		  }
		| {
				renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
				label?: never;
				helperText?: never;
				error?: never;
				required?: boolean;
		  }
	);

const MyVirtualizedAutocomplete = <
	T,
	Multiple extends boolean | undefined = undefined,
	DisableClearable extends boolean | undefined = undefined,
	FreeSolo extends boolean | undefined = undefined
>({
	label,
	getOptionDisplay,
	helperText,
	error,
	renderInput,
	required=false,
	...props
}: MyVirtualizedAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => (
	<Autocomplete
		disableListWrap
		PopperComponent={StyledPopper}
		ListboxComponent={ListBoxComponent}
		renderOption={(props, option) => [props, { ...option, label: getOptionDisplay(option) }] as React.ReactNode}
		renderGroup={(params) => params as unknown as React.ReactNode}
		renderInput={renderInput ? renderInput : (params) => <TextField required={required} helperText={helperText} error={error} {...params} label={label} />}
		{...props}
	/>
);
export default MyVirtualizedAutocomplete;
