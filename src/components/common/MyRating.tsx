import * as React from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { RatingProps } from "@mui/material/Rating/Rating";

const StyledRating = styled(Rating)(({ theme }) => ({
	"& .MuiRating-iconEmpty .MuiSvgIcon-root": {
		color: theme.palette.action.disabled,
	},
}));

export interface MyRatingProps extends RatingProps {
	iconSize?: number;
}

const ICON_SIZE = "inherit";

const customIcons: {
	[index: string]: {
		icon: React.ReactElement;
		label: string;
	};
} = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon fontSize={ICON_SIZE} color="error" />,
		label: "Very Dissatisfied",
	},
	2: {
		icon: <SentimentDissatisfiedIcon fontSize={ICON_SIZE} color="error" />,
		label: "Dissatisfied",
	},
	3: {
		icon: <SentimentSatisfiedIcon fontSize={ICON_SIZE} color="warning" />,
		label: "Neutral",
	},
	4: {
		icon: <SentimentSatisfiedAltIcon fontSize={ICON_SIZE} color="success" />,
		label: "Satisfied",
	},
	5: {
		icon: <SentimentVerySatisfiedIcon fontSize={ICON_SIZE} color="success" />,
		label: "Very Satisfied",
	},
};

function IconContainer(props: IconContainerProps) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

const MyRating = ({ iconSize = 48, ...props }: MyRatingProps) => (
	<StyledRating
		sx={{ fontSize: iconSize }}
		IconContainerComponent={IconContainer}
		getLabelText={(value: number) => customIcons[value].label}
		highlightSelectedOnly
		{...props}
	/>
);
export default MyRating;
