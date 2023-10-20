import { stringToBoolean } from "../../utils/qsUtils";
import useQueryState from "../useQueryState";
import { useMemo } from "react";
import { UsersFilterParams } from "../../api/types/users";
import { getValidPage, getValidPageSize } from "../../components/common/MyDataGrid/datagridUtils";

export const useUsersQueryParams = (): UsersFilterParams => {
	const [page] = useQueryState("page", "1");
	const [pageSize] = useQueryState("size", "100");
	const [searchQS] = useQueryState("search");
	const [ordering] = useQueryState("ordering");
	const [is_active] = useQueryState("is_active");
	const [is_superuser] = useQueryState("is_superuser");
	const [is_staff] = useQueryState("is_staff");
	const [groups] = useQueryState("groups");

	return useMemo<UsersFilterParams>(() => {
		return {
			page: getValidPage(page),
			size: getValidPageSize(pageSize),
			ordering: ordering || undefined,
			search: searchQS || undefined,
			is_active: stringToBoolean(is_active),
			is_superuser: stringToBoolean(is_superuser),
			is_staff: stringToBoolean(is_staff),
			groups: groups || undefined,
		};
	}, [page, pageSize, searchQS, is_active, ordering, is_superuser, is_staff, groups]);
};
