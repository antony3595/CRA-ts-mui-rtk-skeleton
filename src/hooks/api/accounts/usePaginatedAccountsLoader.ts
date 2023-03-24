import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import { useEffect } from "react";
import { PaginatedBody } from "../../../api/types/base";
import { User } from "../../../api/types/users";
import { useAccountsQueryParams } from "../../queryParams/useAccountsQueryParams";
import { fetchAccounts, selectPaginatedAccounts } from "../../../redux/content/accounts/accountsSlice";

export const usePaginatedAccountsLoader = (): [boolean, PaginatedBody<User>, () => void] => {
	const dispatch = useAppDispatch();
	const params = useAccountsQueryParams();

	const isDataFetching = useAppSelector(createLoadingSelector(["accounts"]));
	const data = useAppSelector(selectPaginatedAccounts);

	const updateData = () => {
		dispatch(fetchAccounts(params));
	};

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch, params]);

	return [isDataFetching, data, updateData];
};
