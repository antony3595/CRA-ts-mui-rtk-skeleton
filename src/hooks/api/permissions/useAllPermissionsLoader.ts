import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { Permission } from "../../../api/types/permissions";
import { fetchAllPermissions, selectAllPermissions } from "../../../redux/content/permissions/permissionsSlice";
import { ApiLoaderHookValue } from "../../../types/hooks";

export const useAllPermissionsLoader = (): ApiLoaderHookValue<Permission[]> => {
	const dispatch = useAppDispatch();

	const isDataFetching = useAppSelector(createLoadingSelector(["allPermissions"]));
	const data = useAppSelector(selectAllPermissions);

	const updateData = () => {
		dispatch(fetchAllPermissions());
	};

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch]);

	return [isDataFetching, data, updateData];
};
