export const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column" as const,
	alignItems: "center",
	justifyContent: "center" as const,
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	minHeight: "200px",
	boxSizing: "border-box" as const,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	outline: "none",
	transition: "border .24s ease-in-out",
};
export const focusedStyle = {
	borderColor: "#2196f3",
};
export const acceptStyle = {
	borderColor: "#00e676",
};
export const rejectStyle = {
	borderColor: "#ff1744",
};

export const thinHorizontalScrollbarSX = {
	"&::-webkit-scrollbar-track": {
		WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
		backgroundColor: "#F5F5F5",
	},

	"&::-webkit-scrollbar": {
		height: "3px",
		backgroundColor: "#F5F5F5",
	},

	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#000000",
	},
};
