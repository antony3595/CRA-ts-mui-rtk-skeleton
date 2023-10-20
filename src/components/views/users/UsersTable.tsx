import React, { useMemo, useState } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { GridActionsColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "../../../api/types/users";
import strings from "../../../constants/strings";
import MyDataGrid from "../../common/MyDataGrid/MyDataGrid";
import { TooltipCell } from "../../common/MyDataGrid/cells/TooltipCell";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import { useSnackbar } from "notistack";
import { toastApiErrorHandler } from "../../../utils/errorsUtils";
import ClosableModal from "../../common/dialogs/ClosableModal";
import UserUpdateForm from "./UserUpdateForm";
import PasswordIcon from "@mui/icons-material/Password";
import ResetPasswordForm from "./ResetPasswordForm";
import { SlideUpTransition } from "../../common/Transitions";
import { blockUser, unblockUser } from "../../../api/admin/users";
import { BaseGroup } from "../../../api/types/groups";
import { useCanDelete } from "../../../hooks/permissions/useCanDelete";
import { useCanChange } from "../../../hooks/permissions/useCanChange";
import { emptyArrayOrWithElement } from "../../../utils/arrayUtils";
import { EmailCell } from "../../common/MyDataGrid/cells/EmailCell";
import { BooleanCell } from "../../common/MyDataGrid/cells/BooleanCell";
import { ChipsCell } from "../../common/MyDataGrid/cells/ChipsCell";

interface UsersTableProps {
	users: User[];
	groups: BaseGroup[];
	isLoading: boolean;
	totalElements: number;
	updateList: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading, totalElements, updateList, groups }) => {
	const { enqueueSnackbar } = useSnackbar();

	const canChange = useCanChange("appuser");
	const canDelete = useCanDelete("appuser");

	const [blockFormOpen, setBlockFormOpen] = useState<boolean>(false);
	const [resetPasswordFormOpen, setResetPasswordFormOpen] = useState<boolean>(false);
	const [isBlockLoading, setBlockLoading] = useState<boolean>(false);

	const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);

	const [activeRowValue, setActiveRowValue] = useState<User | null>(null);

	const handleBlock = () => {
		if (activeRowValue) {
			setBlockLoading(true);
			blockUser(activeRowValue.id)
				.then(() => {
					enqueueSnackbar(strings.user_successfully_blocked, { variant: "success" });
					setBlockFormOpen(false);
					updateList();
				})
				.catch(toastApiErrorHandler(enqueueSnackbar))
				.finally(() => setBlockLoading(false));
		}
	};

	const handleUnblock = () => {
		if (activeRowValue) {
			setBlockLoading(true);

			unblockUser(activeRowValue.id)
				.then(() => {
					enqueueSnackbar(strings.user_successfully_unblocked);
					setBlockFormOpen(false);
					updateList();
				})
				.catch(toastApiErrorHandler(enqueueSnackbar))
				.finally(() => setBlockLoading(false));
		}
	};

	const columns: Array<GridColDef | GridActionsColDef> = useMemo(
		() => [
			{
				field: "actions",
				headerName: strings.operations,
				width: 50 + 50 * (Number(canChange) + Number(canDelete)),
				type: "actions",
				getActions: (params) => [
					...emptyArrayOrWithElement(
						canDelete,
						<GridActionsCellItem
							icon={
								<Tooltip title={params.row.is_active ? strings.block : strings.unblock}>
									<BlockIcon color={!params.row.is_active ? "error" : "inherit"} />
								</Tooltip>
							}
							onClick={() => {
								setActiveRowValue(params.row);
								setBlockFormOpen(true);
							}}
							label="block"
						/>
					),

					...emptyArrayOrWithElement(
						canChange,
						<GridActionsCellItem
							icon={
								<Tooltip title={strings.reset_password}>
									<PasswordIcon />
								</Tooltip>
							}
							onClick={() => {
								setActiveRowValue(params.row);
								setResetPasswordFormOpen(true);
							}}
							label="reset password"
						/>
					),
					...emptyArrayOrWithElement(
						canChange,
						<GridActionsCellItem
							icon={
								<Tooltip title={strings.update_user}>
									<EditIcon />
								</Tooltip>
							}
							onClick={() => {
								setActiveRowValue(params.row);
								setUpdateFormOpen(true);
							}}
							label="edit"
						/>
					),
				],
			},
			{ field: "id", headerName: "id", width: 100, disableColumnMenu: true },
			{
				field: "username",
				headerName: strings.username,
				minWidth: 200,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "email",
				headerName: strings.email,
				disableColumnMenu: true,
				minWidth: 200,
				flex: 2,
				renderCell: EmailCell,
			},
			{
				field: "full_name",
				headerName: strings.full_name,
				flex: 1,
				minWidth: 200,
				disableColumnMenu: true,
				sortable: false,
				valueGetter: (params) => `${params.row.last_name} ${params.row.first_name} ${params.row.middle_name}`,
				renderCell: TooltipCell,
			},
			{
				field: "first_name",
				headerName: strings.first_name,
				width: 150,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "last_name",
				headerName: strings.last_name,
				width: 150,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "middle_name",
				headerName: strings.middle_name,
				width: 150,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "last_login",
				headerName: strings.last_login,
				width: 150,
				sortable: false,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "is_active",
				headerName: strings.active,
				sortable: false,
				width: 150,
				disableColumnMenu: true,
				renderCell: BooleanCell,
			},
			{
				field: "is_superuser",
				sortable: false,
				headerName: strings.superuser,
				width: 150,
				disableColumnMenu: true,
				renderCell: BooleanCell,
			},
			{
				field: "is_staff",
				headerName: strings.is_staff,
				width: 150,
				sortable: false,
				disableColumnMenu: true,
				renderCell: BooleanCell,
			},

			{
				field: "groups",
				headerName: strings.roles,
				minWidth: 150,
				sortable: false,

				valueGetter: (params) => params.value?.map((group: BaseGroup) => group.name) || [],
				renderCell: ChipsCell,
				disableColumnMenu: true,
			},
		],
		[]
	);

	return (
		<>
			<ConfirmDialog
				fullWidth
				open={blockFormOpen}
				onClose={() => setBlockFormOpen(false)}
				onNegative={() => setBlockFormOpen(false)}
				onPositive={activeRowValue?.is_active ? handleBlock : handleUnblock}
				isLoading={isBlockLoading}
				title={activeRowValue?.is_active ? strings.blocking : strings.unblocking}
				message={
					(activeRowValue?.is_active ? strings.do_you_really_want_to_block_user_ : strings.do_you_really_want_to_unblock_user_) +
					activeRowValue?.username
				}
				positiveLabel={activeRowValue?.is_active ? strings.block : strings.unblock}
				negativeLabel={strings.cancel}
				TransitionComponent={SlideUpTransition}
			/>
			<ClosableModal
				maxWidth={"md"}
				draggable
				open={updateFormOpen}
				closeModal={() => setUpdateFormOpen(false)}
				title={strings.update_user}
				disableBackdropClick
				TransitionComponent={SlideUpTransition}
			>
				{activeRowValue && (
					<UserUpdateForm
						groups={groups}
						closeModal={() => setUpdateFormOpen(false)}
						isLoading={isLoading}
						onSuccess={updateList}
						user={activeRowValue}
					/>
				)}
			</ClosableModal>
			<ClosableModal
				maxWidth={"md"}
				draggable
				open={resetPasswordFormOpen}
				closeModal={() => setResetPasswordFormOpen(false)}
				title={strings.reset_password + ' "' + activeRowValue?.username + '"'}
				disableBackdropClick
				TransitionComponent={SlideUpTransition}
			>
				{activeRowValue && <ResetPasswordForm closeModal={() => setResetPasswordFormOpen(false)} user={activeRowValue} />}
			</ClosableModal>
			<MyDataGrid
				paginationMode={"server"}
				sortingMode={"server"}
				loading={isLoading}
				rowCount={totalElements}
				columns={columns}
				rows={users}
				copyCellOnDoubleClick
			/>
		</>
	);
};

export default UsersTable;
