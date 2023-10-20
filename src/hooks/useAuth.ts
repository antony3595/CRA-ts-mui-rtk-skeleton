import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/auth/authSlice";
import { AuthState } from "../redux/auth/types";

export const useAuth = (): AuthState => {
	return useAppSelector(selectAuth);
};
