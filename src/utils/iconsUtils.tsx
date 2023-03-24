import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

export const getBooleanIcon = (value: boolean | null | undefined) =>
	value === true ? <CheckCircleOutlineIcon color={"success"} /> : value === false ? <DoNotDisturbAltIcon color={"error"} /> : null;
