import { Navigate, useLocation } from "react-router-dom";
import { HOME } from "../../../urls";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";
import { hasOneOfRoles } from "../../../utils/apiUtils";
import { Role } from "../../../api/types/base";

export type RolesRequiredProps = {
	outlet: JSX.Element;
	requiredRoles: Role[];
};

const RolesRequired = ({ outlet, requiredRoles }: RolesRequiredProps) => {
	const location = useLocation();
	const auth = useAppSelector(selectAuth);
	const { loggedIn } = auth;

	if (loggedIn && hasOneOfRoles(auth, requiredRoles)) {
		return outlet;
	} else {
		return <Navigate to={{ pathname: HOME }} replace state={{ next: location.pathname }} />;
	}
};

export default RolesRequired;
