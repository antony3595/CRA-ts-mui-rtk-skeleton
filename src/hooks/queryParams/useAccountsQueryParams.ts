import { stringToBoolean } from "../../utils/qsUtils";
import useQueryState from "../useQueryState";
import { getValidPage, getValidPageSize } from "../../components/common/MyDataGrid/MyDataGrid";
import { useMemo } from "react";
import { AccountsFilterParams } from "../../api/types/users";

export const useAccountsQueryParams = (): AccountsFilterParams => {
	const [page] = useQueryState("page", "1");
	const [pageSize] = useQueryState("size", "100");
	const [searchQS] = useQueryState("search");
	const [is_active] = useQueryState("is_active");
	const [role] = useQueryState("role");
	const [department] = useQueryState("department");

	return useMemo<AccountsFilterParams>(() => {
		return {
			page: getValidPage(page),
			size: getValidPageSize(pageSize),
			search: searchQS || undefined,
			role: role || undefined,
			is_active: stringToBoolean(is_active),
			department: department || undefined,
		};
	}, [page, pageSize, searchQS, is_active, role, department]);
};
