import { ApiLoaderHookValue } from "../../../types/hooks";
import { PaginatedBody } from "../../../api/types/base";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { Group } from "../../../api/types/groups";
import { usePageableQueryParams } from "../../queryParams/usePageableQueryParams";
import { fetchPaginatedGroups, selectPaginatedGroups } from "../../../redux/content/groups/groupsSlice";

export const usePaginatedGroupsLoader = (): ApiLoaderHookValue<PaginatedBody<Group>> => {
	const dispatch = useAppDispatch();
	const params = usePageableQueryParams();

	const isDataFetching = useAppSelector(createLoadingSelector(["paginatedGroups"]));
	const data = useAppSelector(selectPaginatedGroups);

	const updateData = () => {
		dispatch(fetchPaginatedGroups(params));
	};

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch, params]);

	return [isDataFetching, data, updateData];
};
