import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector, createStatusSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { CurrentUser } from "../../../api/types/users";
import { fetchCurrentUser, selectAuth } from "../../../redux/auth/authSlice";
import { StateStatus } from "../../../redux/types";

export const useCurrentUserLoader = (): [boolean, CurrentUser, () => void] => {
	const dispatch = useAppDispatch();
	const { token, loggedIn, user } = useAppSelector(selectAuth);

	const dataStatus = useAppSelector(createStatusSelector("currentUserData"));
	const isDataFetching = useAppSelector(createLoadingSelector(["currentUserData"]));
	const data = user;

	const updateData = () => {
		dispatch(fetchCurrentUser());
	};

	useEffect(() => {
		if (!isDataFetching && loggedIn && (dataStatus === StateStatus.INITIAL || dataStatus === StateStatus.FAILED)) {
			updateData();
		}
	}, [dispatch, token, loggedIn]);

	return [isDataFetching, data, updateData];
};
