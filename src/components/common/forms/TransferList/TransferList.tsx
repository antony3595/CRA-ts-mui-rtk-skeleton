import * as React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ArrayElement } from "../../../../utils/tsUtils";
import VirtualizedChecklist from "./VirtualizedChecklist";
import { KeysOfType } from "../../../../types/global";
import { intersection, not } from "../../../../utils/arrayUtils";

interface TransferListProps<T> {
	elements: T[];
	values: T[];
	getKeyField: () => KeysOfType<T, string | number>;
	getOptionDisplay: (element: T) => string;
	onChange: (result: { left: T[]; right: T[] }) => void;
	title?: string;
}

const TransferList: <T extends object>(props: TransferListProps<T>) => React.ReactElement<TransferListProps<T>> = ({
	elements,
	values,
	onChange,
	getKeyField,
	getOptionDisplay,
	title,
}) => {
	const [checked, setChecked] = React.useState<typeof elements>([]);
	const [left, setLeft] = React.useState<typeof elements>(not(elements, values, getKeyField()));
	const [right, setRight] = React.useState<typeof elements>(values);

	const leftChecked = intersection(checked, left, getKeyField());
	const rightChecked = intersection(checked, right, getKeyField());

	const handleToggle = (value: ArrayElement<typeof elements>) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked, getKeyField()));
		setChecked(not(checked, leftChecked, getKeyField()));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked, getKeyField()));
		setChecked(not(checked, rightChecked, getKeyField()));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	useEffect(() => {
		onChange({ left, right });
	}, [left, right]);

	return (
		<>
			{title && (
				<Typography sx={{ mb: 2 }} variant={"body1"}>
					{title}
				</Typography>
			)}
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				<Grid item>
					<VirtualizedChecklist
						items={left}
						checked={leftChecked}
						handleToggle={(value) => handleToggle(value)}
						getOptionDisplay={getOptionDisplay}
					/>
				</Grid>
				<Grid item sx={{ alignSelf: "center" }}>
					<Grid container direction="column" alignItems="center">
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleAllRight}
							disabled={left.length === 0}
							aria-label="move all right"
						>
							≫
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							disabled={leftChecked.length === 0}
							onClick={handleCheckedRight}
							aria-label="move selected right"
						>
							&gt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label="move selected left"
						>
							&lt;
						</Button>
						<Button
							sx={{ my: 0.5 }}
							variant="outlined"
							size="small"
							onClick={handleAllLeft}
							disabled={right.length === 0}
							aria-label="move all left"
						>
							≪
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<VirtualizedChecklist
						items={right}
						checked={rightChecked}
						handleToggle={(value) => handleToggle(value)}
						getOptionDisplay={getOptionDisplay}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default TransferList;
