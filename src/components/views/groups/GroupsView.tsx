import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { Box, Tooltip } from "@mui/material";
import GroupsTable from "./GroupsTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GroupForm from "./GroupForm";
import useTitle from "../../../hooks/useTitle";
import strings from "../../../constants/strings";
import { usePaginatedGroupsLoader } from "../../../hooks/api/groups/usePaginatedGroupsLoader";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import { useCanAdd } from "../../../hooks/permissions/useCanAdd";
import SearchFilter from "../../common/SearchFilter";
import ClosableModal from "../../common/dialogs/ClosableModal";
import { useAllPermissionsLoader } from "../../../hooks/api/permissions/useAllPermissionsLoader";
import { FullHeightBox } from "../../common/StyledComponents";

const GroupsView = () => {
	useTitle(strings.roles);

	const [isGroupsLoading, groups, updateGroups] = usePaginatedGroupsLoader();
	const [isPermissionsLoading, permissions] = useAllPermissionsLoader();
	const canAdd = useCanAdd("group");
	const [isCreateFormOpen, setCreateFormOpen] = useState<boolean>(false);

	const isLoading = isGroupsLoading || isPermissionsLoading;

	return (
		<PageWrapper>
			<Box mb={2}>
				{canAdd && (
					<>
						<Divider>{strings.operations}</Divider>

						<Tooltip title={strings.create_role}>
							<Button
								variant={"contained"}
								onClick={() => {
									setCreateFormOpen(true);
								}}
								color={"success"}
							>
								<AddIcon />
							</Button>
						</Tooltip>
					</>
				)}
			</Box>
			<Box mb={2}>
				<Divider>{strings.filters}</Divider>
				<SearchFilter />
			</Box>
			<FullHeightBox>
				<Box mb={2}>
					<Divider>{strings.roles}</Divider>
				</Box>
				<GroupsTable
					groups={groups.results}
					permissions={permissions}
					isLoading={isGroupsLoading || isPermissionsLoading}
					totalElements={groups.count}
					updateList={updateGroups}
				/>
			</FullHeightBox>
			<ClosableModal
				fullWidth
				maxWidth={"md"}
				open={isCreateFormOpen}
				draggable
				closeModal={() => setCreateFormOpen(false)}
				title={strings.create_role}
				disableBackdropClick
			>
				<GroupForm
					permissions={permissions}
					closeModal={() => setCreateFormOpen(false)}
					onSuccess={updateGroups}
					isLoading={isLoading}
				/>
			</ClosableModal>
		</PageWrapper>
	);
};

export default GroupsView;
