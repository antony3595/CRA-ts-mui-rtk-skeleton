import TreeItem, { treeItemClasses, TreeItemContentProps, TreeItemProps } from "@mui/lab/TreeItem";
import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "../../ThemeProvider";
import { ClickAwayListener, Slide, Theme, useMediaQuery, Zoom } from "@mui/material";
import { useTreeItem } from "@mui/lab";
import clsx from "clsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

type MyTreeItemProps<T> = TreeItemProps & {
	item: T;
	bgColor?: string;
	color?: string;
	labelIcon?: React.ElementType<SvgIconProps>;
	labelInfo?: string;
	labelText: string;
	getActions?: (item: T) => React.ReactNode[];
};

const CustomContent = React.forwardRef((props: TreeItemContentProps, ref) => {
	const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;

	const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);

	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		preventSelection(event);
	};

	const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleExpansion(event);
	};

	const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleSelection(event);
	};

	return (
		<div
			className={clsx(className, classes.root, {
				[classes.expanded]: expanded,
				[classes.selected]: selected,
				[classes.focused]: focused,
				[classes.disabled]: disabled,
			})}
			onMouseDown={handleMouseDown}
			ref={ref as React.Ref<HTMLDivElement>}
		>
			<div onClick={handleExpansionClick} className={classes.iconContainer}>
				{icon}
			</div>
			<Typography onClick={handleSelectionClick} onDoubleClick={handleExpansionClick} component="div" className={classes.label}>
				{label}
			</Typography>
		</div>
	);
});

const MyTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.secondary,
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightMedium,
		"&.Mui-expanded": {
			fontWeight: theme.typography.fontWeightRegular,
		},
		"&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: "var(--tree-view-color)",
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: "inherit",
			color: "inherit",
		},
	},
	[`& .${treeItemClasses.group}`]: {
		borderLeft: `1px solid ${theme.palette.divider}`,
		marginLeft: 0,
		[`& .${treeItemClasses.content}`]: {
			paddingLeft: theme.spacing(2),
		},
	},
}));

export const MyTreeItem = <T,>(props: MyTreeItemProps<T>) => {
	const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, getActions, item, ...other } = props;

	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
	const [mouseHover, setMouseHover] = useState<boolean>(false);
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	const actions = useMemo(() => (getActions ? getActions(item) : []), [getActions, item]);
	const selfRef = useRef();

	return (
		<MyTreeItemRoot
			ContentComponent={CustomContent}
			label={
				<Box
					ref={selfRef}
					sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}
					onMouseEnter={() => setMouseHover(true)}
					onMouseLeave={() => setMouseHover(false)}
				>
					{LabelIcon && <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />}
					<Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>

					{actions && !matches && (
						<Slide container={selfRef.current} in={mouseHover} direction={"left"} timeout={{ enter: 250, exit: 750 }}>
							<Box id={"parent"} display={"flex"}>
								{actions.map((action, index) => (
									<Box id={"button" + index} key={index}>
										{action}
									</Box>
								))}
							</Box>
						</Slide>
					)}
					{actions && matches && (
						<>
							<ClickAwayListener onClickAway={() => setMenuOpen(false)}>
								<Box display={"flex"} flexWrap={"nowrap"}>
									{actions.map((action, index) => (
										<Zoom in={isMenuOpen} key={index} unmountOnExit>
											<Box>{action}</Box>
										</Zoom>
									))}
									<IconButton onClick={() => setMenuOpen(!isMenuOpen)}>
										<MoreVertIcon />
									</IconButton>
								</Box>
							</ClickAwayListener>
						</>
					)}
				</Box>
			}
			style={{
				"--tree-view-color": color,
				"--tree-view-bg-color": bgColor,
			}}
			{...other}
		/>
	);
};
