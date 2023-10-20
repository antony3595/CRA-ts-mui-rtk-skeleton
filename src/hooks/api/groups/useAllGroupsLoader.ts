import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { fetchAllGroups, selectAllGroups } from "../../../redux/content/groups/groupsSlice";
import { BaseGroup } from "../../../api/types/groups";

export const useAllGroupsLoader = (): [boolean, BaseGroup[], () => void] => {
	const dispatch = useAppDispatch();

	const isDataFetching = useAppSelector(createLoadingSelector(["allGroups"]));
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
