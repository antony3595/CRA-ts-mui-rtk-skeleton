import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";

export const FileItemWrapper = styled(Paper)(({ theme }) => ({
	borderRadius: "4px",
	overflow: "hidden",
	width: "165px",
	"&:hover, &.Mui-focusVisible, &.Mui-backdropVisible": {
		zIndex: 2,
		"& .MuiImageBackdrop-root": {
			opacity: 0.6,
		},
		"& .MuiStack-root": {
			opacity: 1,
		},
	},
}));
export const FileImage = styled(Box)(() => ({
	position: "relative",
	height: 125,
	width: "100% !important", // Overrides inline-style]
}));

export const ImageSrc = styled("span")({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center 40%",
});
export const FileBackdrop = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0,
	transition: theme.transitions.create("opacity"),
}));
export const FileNameWrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2, 1),
	boxSizing: "border-box",
}));
export const ActionButtons = styled(Stack)(({ theme }) => ({
	position: "absolute",
	marginTop: "4px",
	marginRight: "4px",
	zIndex: 3,
	right: 0,
	color: "white",
	top: 0,
	opacity: 0,
	transition: theme.transitions.create("opacity"),
}));
