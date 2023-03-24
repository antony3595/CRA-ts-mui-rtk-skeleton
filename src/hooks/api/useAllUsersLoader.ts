import { UserMin } from "../../api/types/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createLoadingSelector } from "../../redux/actionsStatuses/actionsStatusesSlice";
import { fetchAllAccountsMin, selectAllMinAccounts } from "../../redux/content/accounts/accountsSlice";
import { useEffect } from "react";

export const useAllUsersLoader = (): [boolean, UserMin[]] => {
	const dispatch = useAppDispatch();

	const isAccountsFetching = useAppSelector(createLoadingSelector(["accountsAllMin"]));
	const accounts = useAppSelector(selectAllMinAccounts);
	useEffect(() => {
		if (!isAccountsFetching) {
			dispatch(fetchAllAccountsMin());
		}
	}, [dispatch]);

	return [isAccountsFetching, accounts];
};
