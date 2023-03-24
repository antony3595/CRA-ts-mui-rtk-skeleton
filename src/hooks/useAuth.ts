import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/auth/authSlice";

export const useAuth = () => {
	return useAppSelector(selectAuth);
};
