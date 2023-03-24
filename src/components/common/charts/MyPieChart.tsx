import React, { useMemo, useState } from "react";
import { PieChart, pieChartDefaultProps, PieChartProps } from "react-minimal-pie-chart";
import { BaseDataEntry } from "react-minimal-pie-chart/types/commonTypes";
import { getColorIndex, pieChartColors } from "../../../constants/colors";
import { Box, Grid, useTheme } from "@mui/material";
import List from "@mui/material/List/List";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface LegendData {
	legendPrimaryText?: string;
	legendSecondaryText?: string;
}

export interface MyPieChartProps<V> extends Omit<PieChartProps, "data"> {
	values: V[];
	labelGetter: (value: V) => string;
	valueGetter: (value: V) => number;
	onItemClick?: (value: V | null) => void;
	withLegend?: boolean;
	legendValueGetter?: (value: V) => LegendData;
	title?: string;
	percentage?: boolean;
	lineWidth?: number;
	gridContainerSXProps?: SxProps<Theme>;
}

type ExtendedDataEntry = BaseDataEntry & LegendData;

const LINE_WIDTH = 60;
const RADIUS = pieChartDefaultProps.radius - 6;
const FONT_SIZE_PX = 5;

const defaultLabelStyle = { fill: "#fff", opacity: 0.75, fontSize: `${FONT_SIZE_PX}px` };

const MyPieChart = <V extends object>({
	values,
	valueGetter,
	labelGetter,
	onItemClick,
	legendValueGetter,
	title,
	gridContainerSXProps,
	labelStyle,
	percentage = false,
	withLegend = false,
	radius = RADIUS,
	lineWidth = LINE_WIDTH,
	...restProps
}: MyPieChartProps<V>) => {
	const theme = useTheme();

	const [selected, setSelected] = useState<number | undefined>(0);
	const [hovered, setHovered] = useState<number | undefined>(undefined);
	const [legendHovered, setLegendHovered] = useState<number | undefined>(undefined);

	const getData = (): ExtendedDataEntry[] => {
		return values.map((item, index) => {
			const data: ExtendedDataEntry = {
				title: labelGetter(item),
				value: valueGetter(item),
				key: index,
				color: pieChartColors[getColorIndex(index)],
				legendPrimaryText: legendValueGetter && legendValueGetter(item).legendPrimaryText,
				legendSecondaryText: legendValueGetter && legendValueGetter(item).legendSecondaryText,
			};
			if (hovered === index || legendHovered === index) {
				return { ...data, color: theme.palette.primary.main };
			}
			return data;
		});
	};

	const preparedData = useMemo(getData, [values, selected, hovered, legendHovered]);

	const getPieChart = () => {
		return (
			<PieChart
				className={"my-pie-chart"}
				label={({ dataEntry }) =>
					dataEntry.percentage > 5 ? dataEntry.value + (percentage ? `(${Math.round(dataEntry.percentage)}%)` : "") : undefined
				}
				data={preparedData}
				radius={radius}
				segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
				lineWidth={lineWidth}
				animate
				onMouseOver={(_, dataIndex) => {
					setHovered(dataIndex);
				}}
				segmentsShift={(index) => (index === selected || index === legendHovered ? 6 : 1)}
				onMouseOut={() => {
					setHovered(undefined);
				}}
				onClick={(_, dataIndex) => {
					setSelected(dataIndex);
					setLegendHovered(dataIndex);
					onItemClick && onItemClick(values[dataIndex]);
				}}
				labelPosition={100 - lineWidth / 2}
				labelStyle={{ ...defaultLabelStyle, ...labelStyle }}
				{...restProps}
			/>
		);
	};

	if (!withLegend)
		return (
			<Box maxWidth={"300px"}>
				{title && <Typography variant={"h6"}>{title}</Typography>}
				<Box>{getPieChart()}</Box>
			</Box>
		);

	return (
		<Box width={"100%"}>
			{title && <Typography variant={"h6"}>{title}</Typography>}
			<Grid container spacing={2} sx={{ justifyContent: "flex-start", ...gridContainerSXProps }}>
				<Grid item>
					<Box>{getPieChart()}</Box>
				</Grid>
				<Grid item display={"flex"} alignItems={"center"}>
					<List>
						{preparedData.map((item, index) => (
							<ListItemButton
								key={index}
								disableTouchRipple
								disableRipple
								sx={(theme) => (index === hovered ? { backgroundColor: theme.palette.action.hover } : {})}
								onMouseOver={() => {
									setLegendHovered(index);
									setSelected(undefined);
								}}
								onMouseOut={() => {
									setLegendHovered(undefined);
								}}
							>
								<ListItemIcon>
									<CircleIcon style={{ fill: item.color }} />
								</ListItemIcon>
								<ListItemText
									primary={item.legendPrimaryText || item.title}
									secondary={item.legendSecondaryText || ""}
								></ListItemText>
							</ListItemButton>
						))}
					</List>
				</Grid>
			</Grid>
		</Box>
	);
};

export default MyPieChart;
