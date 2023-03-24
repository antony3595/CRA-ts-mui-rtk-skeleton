import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "../../../urls";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";

export type ProtectedRouteProps = {
	outlet: JSX.Element;
};

const LoginRequired = ({ outlet }: ProtectedRouteProps) => {
	const location = useLocation();
	const { loggedIn } = useAppSelector(selectAuth);

	if (loggedIn) {
		return outlet;
	} else {
		return <Navigate to={{ pathname: LOGIN }} state={{ next: location.pathname }} />;
	}
};

export default LoginRequired;
