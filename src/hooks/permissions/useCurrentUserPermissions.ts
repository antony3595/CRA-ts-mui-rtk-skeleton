import { selectCurrentUserPermissions } from "../../redux/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { CurrentUserPermissions } from "../../redux/auth/types";

export const useCurrentUserPermissions = (): CurrentUserPermissions => {
	return useAppSelector(selectCurrentUserPermissions);
};
