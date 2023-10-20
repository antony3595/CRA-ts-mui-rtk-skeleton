import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { PaginatedBody } from "../../../api/types/base";
import { User } from "../../../api/types/users";
import { useUsersQueryParams } from "../../queryParams/useUsersQueryParams";
import { fetchUsers, selectPaginatedUsers } from "../../../redux/content/users/usersSlice";

export const usePaginatedUsersLoader = (): [boolean, PaginatedBody<User>, () => void] => {
	const dispatch = useAppDispatch();
	const params = useUsersQueryParams();

	const isDataFetching = useAppSelector(createLoadingSelector(["users"]));
	const data = useAppSelector(selectPaginatedUsers);

	const updateData = () => {
		dispatch(fetchUsers(params));
	};

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch, params]);

	return [isDataFetching, data, updateData];
};
