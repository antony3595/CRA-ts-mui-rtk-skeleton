import useTitle from "../../../hooks/useTitle";
import strings from "../../../constants/strings";
import React, { useState } from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import AccountsTable from "./AccountsTable";
import AccountFilters from "./AccountFilters";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import CreateAccountForm from "./AccountCreateForm";
import ClosableModal from "../../common/dialogs/ClosableModal";
import { hasOneOfRoles } from "../../../utils/apiUtils";
import { Role } from "../../../api/types/base";
import { SlideUpTransition } from "../../common/Transitions";
import { useAuth } from "../../../hooks/useAuth";
import { usePaginatedAccountsLoader } from "../../../hooks/api/accounts/usePaginatedAccountsLoader";

const AccountsView = () => {
	useTitle(strings.accounts);

	const auth = useAuth();

	const [isAccountsFetching, paginatedAccounts, updateAccounts] = usePaginatedAccountsLoader();
	const { results: accounts, count: accountsCount } = paginatedAccounts;

	const isLoading = isAccountsFetching;

	const [isCreateFormOpen, setCreateFormOpen] = useState<boolean>(false);

	return (
		<PageWrapper>
			<Box mb={2}>
				{hasOneOfRoles(auth, [Role.ADMIN]) && (
					<>
						<Box mb={2}>
							<Divider>{strings.operations}</Divider>
						</Box>
						<Stack direction="row" spacing={1} mb={3}>
							<Tooltip title={strings.create_user}>
								<Button variant={"contained"} onClick={() => setCreateFormOpen(true)} color={"success"}>
									<AddIcon />
								</Button>
							</Tooltip>
						</Stack>
					</>
				)}
			</Box>
			<Box mb={2}>
				<Divider>{strings.filters}</Divider>
			</Box>
			<Box mb={2}>
				<AccountFilters />
			</Box>
			<AccountsTable accounts={accounts} totalElements={accountsCount} isLoading={isLoading} updateList={updateAccounts} />

			<ClosableModal
				maxWidth={"md"}
				draggable
				open={isCreateFormOpen}
				closeModal={() => setCreateFormOpen(false)}
				title={strings.create_user}
				disableBackdropClick
				TransitionComponent={SlideUpTransition}
			>
				<CreateAccountForm closeModal={() => setCreateFormOpen(false)} isLoading={isAccountsFetching} onSuccess={updateAccounts} />
			</ClosableModal>
		</PageWrapper>
	);
};

export default AccountsView;
