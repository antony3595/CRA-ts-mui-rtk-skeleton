import React, { useMemo, useState } from "react";
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridActionsColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { User } from "../../../api/types/users";
import strings from "../../../constants/strings";
import MyDataGrid from "../../common/MyDataGrid/MyDataGrid";
import { TooltipCell } from "../../common/MyDataGrid/cells/TooltipCell";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import { useSnackbar } from "notistack";
import { toastApiErrorHandler } from "../../../utils/errorsUtils";
import ClosableModal from "../../common/dialogs/ClosableModal";
import UpdateAccountForm from "./AccountUpdateForm";
import PasswordIcon from "@mui/icons-material/Password";
import ResetPasswordForm from "./ResetPasswordForm";
import { SlideUpTransition } from "../../common/Transitions";
import { getRoleDisplay } from "../../../constants/selectOptions";
import { blockUser, unblockUser } from "../../../api/admin/users";

interface AccountsTableProps {
	accounts: User[];
	isLoading: boolean;
	totalElements: number;
	updateList: () => void;
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, isLoading, totalElements, updateList }) => {
	const { enqueueSnackbar } = useSnackbar();

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
					enqueueSnackbar(strings.user_successfully_blocked);
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
				width: 150,
				type: "actions",
				getActions: (params) => [
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
					/>,
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
					/>,
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
					/>,
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
				field: "role",
				headerName: strings.role,
				disableColumnMenu: true,
				width: 120,
				renderCell: TooltipCell,
				valueGetter: (params) => getRoleDisplay(params.value),
			},
			{
				field: "email",
				headerName: strings.email,
				disableColumnMenu: true,
				minWidth: 200,
				flex: 2,
				renderCell: TooltipCell,
			},
			{
				field: "full_name",
				headerName: strings.full_name,
				flex: 1,
				minWidth: 200,
				disableColumnMenu: true,
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
				field: "department",
				headerName: strings.department,
				minWidth: 150,
				valueGetter: (params) => params.value?.name || "---",
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{ field: "phone", headerName: strings.phone, width: 150, disableColumnMenu: true, renderCell: TooltipCell },
			{
				field: "last_login",
				headerName: strings.last_login,
				width: 150,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},
			{
				field: "is_active",
				headerName: strings.active,
				width: 150,
				disableColumnMenu: true,
				renderCell: (params: GridRenderCellParams<boolean>) =>
					params.value ? <CheckCircleOutlineIcon color={"success"} /> : <DoNotDisturbAltIcon color={"error"} />,
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
					<UpdateAccountForm
						closeModal={() => setUpdateFormOpen(false)}
						isLoading={isLoading}
						onSuccess={updateList}
						account={activeRowValue}
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
				{activeRowValue && <ResetPasswordForm closeModal={() => setResetPasswordFormOpen(false)} account={activeRowValue} />}
			</ClosableModal>
			<MyDataGrid
				paginationMode={"server"}
				loading={isLoading}
				rowCount={totalElements}
				columns={columns}
				rows={accounts}
				copyCellOnDoubleClick
			/>
		</>
	);
};

export default AccountsTable;
