import React, { useEffect, useRef, useState } from "react";
import { Box, FormHelperText, MenuItem, Popover } from "@mui/material";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import MySelect from "../MySelect";
import strings from "../../../../constants/strings";
import { getDateRangeByPeriod, getDateRangeDisplay } from "../../../../utils/dateUtils";
import { isNumber } from "../../../../utils/tsUtils";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { DateRange as DateRangeComponent, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ru } from "date-fns/locale";
import "../../../../stylesheets/date_range_picker.scss";

export interface DateRange {
	startDate: Date | null;
	endDate: Date | null;
}

interface DateRangePickerProps {
	label?: string;
	startDate: Date | null;
	endDate: Date | null;
	onChange: (range: DateRange) => void;
	helperText?: string;
	error?: boolean;
	values?: number[] | null;
}

const MyDateRangePicker: React.FC<DateRangePickerProps> = ({
	startDate,
	endDate,
	onChange,
	helperText,
	error = false,
	label,
	values = [7, 14, 30],
}) => {
	const isMobile = useIsMobile();
	const [activePeriod, setActivePeriod] = useState<null | string>("custom");

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const inputRef = useRef(null);

	const handleOpen = () => {
		setAnchorEl(inputRef.current);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	useEffect(() => {
		if (!startDate && !endDate) {
			setActivePeriod(null);
		}
	}, [startDate, endDate]);

	const handleMenuClick: SelectInputProps["onChange"] = (e) => {
		const activePeriod = e.target?.value as string;
		setActivePeriod(activePeriod);
		if (isNumber(activePeriod)) {
			const range = getDateRangeByPeriod(Number(activePeriod));
			onChange(range);
		}
	};

	const handleDateRangeChange = (ranges: RangeKeyDict) => {
		const selectedRange = ranges["selection"];
		const range: DateRange = { startDate: selectedRange.startDate || null, endDate: selectedRange.endDate || null };
		setActivePeriod("custom");
		onChange(range);
	};

	const selectionRange = {
		startDate: startDate || undefined,
		endDate: endDate || undefined,
		key: "selection",
	};

	return (
		<>
			<Box sx={!isMobile ? { minWidth: 300, maxWidth: 300 } : {}}>
				<MySelect
					ref={inputRef}
					variant="outlined"
					label={label || strings.period}
					fullWidth
					autoComplete={"off"}
					value={activePeriod || ""}
					defaultValue={"custom"}
					onChange={handleMenuClick}
					renderValue={() => getDateRangeDisplay({ startDate, endDate })}
				>
					{values &&
						values.map((value) => (
							<MenuItem style={{ whiteSpace: "pre-wrap" }} key={value.toString()} value={value.toString()}>
								{value.toString()}
							</MenuItem>
						))}
					<MenuItem onClick={handleOpen} value={"custom"} style={{ whiteSpace: "pre-wrap" }}>
						{strings.select_period}
					</MenuItem>
				</MySelect>
				<FormHelperText error={error}>{helperText || " "}</FormHelperText>
				<Popover
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<DateRangeComponent
						locale={ru}
						scroll={{ enabled: true }}
						dateDisplayFormat={"dd.MM.yyyy"}
						ranges={[selectionRange]}
						onChange={handleDateRangeChange}
					/>
				</Popover>
			</Box>
		</>
	);
};

export default MyDateRangePicker;
