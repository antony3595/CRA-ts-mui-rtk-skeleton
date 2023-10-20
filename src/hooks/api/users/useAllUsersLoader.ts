import { UserMin } from "../../../api/types/users";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { fetchAllUsers, selectAllUsers } from "../../../redux/content/users/usersSlice";
import { useEffect } from "react";

export const useAllUsersLoader = (): [boolean, UserMin[]] => {
	const dispatch = useAppDispatch();

	const isUsersFetching = useAppSelector(createLoadingSelector(["allUsers"]));
	const users = useAppSelector(selectAllUsers);
	useEffect(() => {
		if (!isUsersFetching) {
			dispatch(fetchAllUsers());
		}
	}, [dispatch]);

	return [isUsersFetching, users];
};
