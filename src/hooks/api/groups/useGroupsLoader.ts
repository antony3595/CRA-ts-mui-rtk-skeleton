import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { SimpleGroup } from "../../../api/types/users";
import { fetchAllGroups, selectAllGroups } from "../../../redux/content/groups/groupsSlice";

export const useGroupsLoader = (): [boolean, SimpleGroup[], () => void] => {
	const dispatch = useAppDispatch();

	const isDataFetching = useAppSelector(createLoadingSelector(["groups"]));
	const data = useAppSelector(selectAllGroups);

	const updateData = () => {
		dispatch(fetchAllGroups());
	};

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch]);

	return [isDataFetching, data, updateData];
};
