import { Navigate, useLocation } from "react-router-dom";
import { HOME } from "../../../urls";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";

export type AnonymousRouteProps = {
	outlet: JSX.Element;
};

const AnonymousRequired = ({ outlet }: AnonymousRouteProps) => {
	const location = useLocation();
	const { loggedIn } = useAppSelector(selectAuth);

	if (!loggedIn) {
		return outlet;
	} else {
		return <Navigate to={{ pathname: location.state?.next || HOME }} replace />;
	}
};

export default AnonymousRequired;
