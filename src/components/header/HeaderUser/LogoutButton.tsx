import React from "react";
import { useSnackbar } from "notistack";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExitToApp } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import strings from "../../../constants/strings";
import ListItemButton from "@mui/material/ListItemButton";
import { useAppDispatch } from "../../../redux/hooks";
import { toastApiErrorHandler } from "../../../utils/errorsUtils";
import { logout } from "../../../redux/commonActions";
import { logoutUser } from "../../../api/admin/users";
import { updateAllAPIsTokens } from "../../../redux/utils/authUtils";

interface LogoutButtonProps {
	isLoading: boolean;
	setLoading: (isLoading: boolean) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ isLoading, setLoading }) => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		setLoading(true);
		logoutUser()
			.then(() => {
				updateAllAPIsTokens("");
				dispatch(logout());
			})
			.catch((e) => {
				dispatch(logout());
				toastApiErrorHandler(enqueueSnackbar)(e);
			})
			.finally(() => setLoading(false));
	};

	return (
		<ListItemButton disabled={isLoading} onClick={handleLogout}>
			<ListItemIcon>
				<ExitToApp />
			</ListItemIcon>
			<ListItemText primary={strings.logout} />
		</ListItemButton>
	);
};

export default LogoutButton;
