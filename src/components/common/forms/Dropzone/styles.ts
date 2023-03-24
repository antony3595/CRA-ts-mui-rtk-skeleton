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
