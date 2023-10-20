import useTitle from "../../../hooks/useTitle";
import strings from "../../../constants/strings";
import React, { useState } from "react";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import UsersTable from "./UsersTable";
import UsersFilters from "./UsersFilters";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import UserCreateForm from "./UserCreateForm";
import ClosableModal from "../../common/dialogs/ClosableModal";
import { SlideUpTransition } from "../../common/Transitions";
import { usePaginatedUsersLoader } from "../../../hooks/api/users/usePaginatedUsersLoader";
import { useCanAdd } from "../../../hooks/permissions/useCanAdd";
import { useAllGroupsLoader } from "../../../hooks/api/groups/useAllGroupsLoader";

const UsersView = () => {
	useTitle(strings.users);

	const [isUsersFetching, paginatedUsers, updateUsers] = usePaginatedUsersLoader();
	const { results: users, count: usersCount } = paginatedUsers;

	const canAdd = useCanAdd("appuser");

	const [isGroupsLoading, groups] = useAllGroupsLoader();
	const isLoading = isUsersFetching || isGroupsLoading;

	const [isCreateFormOpen, setCreateFormOpen] = useState<boolean>(false);

	return (
		<PageWrapper>
			<Box mb={2}>
				{canAdd && (
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
				<UsersFilters isGroupsLoading={isGroupsLoading} groups={groups} />
			</Box>
			<UsersTable users={users} groups={groups} totalElements={usersCount} isLoading={isLoading} updateList={updateUsers} />

			<ClosableModal
				maxWidth={"md"}
				draggable
				open={isCreateFormOpen}
				closeModal={() => setCreateFormOpen(false)}
				title={strings.create_user}
				disableBackdropClick
				TransitionComponent={SlideUpTransition}
			>
				<UserCreateForm groups={groups} closeModal={() => setCreateFormOpen(false)} isLoading={isLoading} onSuccess={updateUsers} />
			</ClosableModal>
		</PageWrapper>
	);
};

export default UsersView;
